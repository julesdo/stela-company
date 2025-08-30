// components/blocks/timeline-zigzag.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

type RepresentationItem = {
  slug: string
  title: string
  excerpt?: string
  image: string
  date: string   // ISO
  city?: string
  venue?: string
}

export default function TimelineZigzag({ items }: { items: RepresentationItem[] }) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  // Hauteur d’un rang (responsive) — garantit l’alignement
  const [rowH, setRowH] = React.useState(560)
  React.useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w < 640) setRowH(360)
      else if (w < 1024) setRowH(460)
      else setRowH(560)
    }
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  // Couloir central & tracé
  const W = 120       // largeur de la colonne centrale (doit matcher la grille)
  const AMP = 28      // amplitude du zigzag (léger)
  const total = Math.max(items.length, 1) * rowH

  // points: centre de chaque rang (y = rowH/2 + i*rowH)
  const d = React.useMemo(() => {
    if (!items.length) return ""
    const cx = W / 2
    const parts: string[] = []
    for (let i = 0; i < items.length; i++) {
      const y = rowH / 2 + i * rowH
      const mod = i % 3 // gauche -> droite -> droit -> ...
      const x = mod === 2 ? cx : cx + (mod === 0 ? -AMP : AMP)
      parts.push(`${i === 0 ? "M" : "L"} ${x} ${y}`)
    }
    // petite sortie au centre en bas pour finir droit
    parts.push(`L ${W / 2} ${total}`)
    return parts.join(" ")
  }, [items.length, rowH])

  // Progression du tracé (dessin au scroll)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.25"] })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.05, 1])

  // Anim
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } } }
  const row = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }

  const df = (iso: string) =>
    new Intl.DateTimeFormat("fr-FR", {
      weekday: "long", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
    }).format(new Date(iso))

  return (
    <div ref={ref} className="relative">
      {/* GRILLE MÈRE : 3 colonnes centrées, N lignes fixes */}
      <div
        className="grid grid-cols-[1fr,120px,1fr] gap-8 md:gap-12"
        style={{ gridTemplateRows: `repeat(${Math.max(items.length, 1)}, ${rowH}px)` }}
      >
        {/* Colonne centrale : SVG sticky + pastilles */}
        <div
          className="col-start-2 col-end-3 row-start-1"
          style={{ gridRowEnd: items.length + 1 }}
        >
          <div className="sticky top-24">
            <svg
              viewBox={`0 0 ${W} ${total}`}
              width={W}
              height={total}
              className="block"
              aria-hidden
            >
              <path d={d} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              <motion.path
                d={d}
                fill="none"
                stroke="rgba(0,0,0,0.55)"
                strokeWidth={1.25}
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* pastilles pile au centre de chaque rang */}
          <ul className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-2" style={{ height: total }}>
            {items.map((_, i) => (
              <li key={i} className="absolute left-1/2 -translate-x-1/2" style={{ top: rowH / 2 + i * rowH }}>
                <span className="block w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-black/70 rounded-full" />
              </li>
            ))}
          </ul>
        </div>

        {/* ITEMS : rendus directement dans la grille mère
           → on fixe gridRow pour chaque bloc texte / image */}
        <motion.div
          className="contents"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {items.map((it, i) => {
            const even = i % 2 === 0
            return (
              <React.Fragment key={it.slug}>
                {/* Texte */}
                <motion.div
                  variants={row as any}
                  className={`${even ? "col-start-1 col-end-2" : "col-start-3 col-end-4"} flex items-end`}
                  style={{ gridRow: String(i + 1) }}
                >
                  <Link href={`/representations/${it.slug}`} className="block group w-full">
                    <div className="max-w-xl">
                      <p className="text-sm text-black/55">
                        <time dateTime={it.date}>{df(it.date)}</time>
                        {it.city ? <> — <span>{it.city}</span></> : null}
                        {it.venue ? <> • <span className="font-light">{it.venue}</span></> : null}
                      </p>
                      <h3 className="mt-2 text-2xl md:text-3xl font-light text-black leading-[1.1]">
                        {it.title}
                      </h3>
                      {it.excerpt && (
                        <p className="mt-4 text-[16px] md:text-[17px] text-black/80 leading-relaxed">
                          {it.excerpt}
                        </p>
                      )}
                      <span className="mt-5 inline-block text-xs tracking-wider uppercase text-black/50 group-hover:text-black transition">
                        Découvrir →
                      </span>
                    </div>
                  </Link>
                </motion.div>

                {/* Image : pleine hauteur de rang */}
                <motion.div
                  variants={row as any}
                  className={`${even ? "col-start-3 col-end-4" : "col-start-1 col-end-2"} relative overflow-hidden`}
                  style={{ gridRow: String(i + 1) }}
                >
                  <Link href={`/representations/${it.slug}`} className="block group h-full">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={it.image}
                        alt={it.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="
                          object-cover
                          grayscale
                          transition-all duration-[900ms] ease-out
                          group-hover:grayscale-0 group-hover:scale-[1.015]
                        "
                        priority={false}
                      />
                    </div>
                  </Link>
                </motion.div>
              </React.Fragment>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
