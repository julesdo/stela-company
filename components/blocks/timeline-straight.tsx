// components/blocks/timeline-straight.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

export type RepresentationItem = {
  slug: string
  title: string
  excerpt?: string
  image: string
  date: string   // ISO
  city?: string
  venue?: string
}

export default function TimelineStraight({ items }: { items: RepresentationItem[] }) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null)
  const prefersReduce = useReducedMotion()

  // Progression de la ligne (dessin vertical)
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.85", "end 0.15"],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.06, 1])

  const df = (iso: string) =>
    new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso))

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } }
  const row = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }

  return (
    <div ref={wrapRef} className="relative">
      {/* Ligne verticale centrée : fond + progression */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-px h-full">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          className="absolute inset-0 bg-black/50 origin-top"
          style={{ scaleY }}
        />
      </div>

      {/* Grille centrée : [col gauche | ligne | col droite] */}
      <motion.ul
        className="grid grid-cols-[1fr,48px,1fr] gap-x-8 md:gap-x-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
      >
        {items.map((it, i) => {
          const left = i % 2 === 0
          return (
            <motion.li
              key={it.slug}
              variants={row as any}
              className="relative group py-12 md:py-16"
            >
              <div className="grid grid-cols-subgrid col-span-3 items-center">
                {/* Texte */}
                <div className={left ? "col-start-1" : "col-start-3"}>
                  <Link href={`/representations/${it.slug}`} className="block">
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
                      <span className="mt-5 inline-flex items-center text-xs tracking-wider uppercase text-black/50">
                        Découvrir
                        <svg
                          className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-[3px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.25}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Point + segment local éclairci au hover (très simple) */}
                <div className="col-start-2 relative flex items-stretch justify-center">
                  {/* Segment local qui s’éclaire au hover (sur la hauteur de l’item) */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-transparent transition-colors duration-300 group-hover:bg-black/30"
                  />
                  {/* Point minimaliste */}
                  <span aria-hidden className="relative z-[1] self-center">
                    <span
                      className="
                        block w-2.5 h-2.5 rounded-full bg-black/70
                        transition-transform duration-300
                        group-hover:scale-110
                      "
                    />
                    {/* halo très léger (pas d’anneau “œil”) */}
                    <span
                      className="
                        pointer-events-none absolute inset-0 rounded-full
                        bg-black/10 opacity-0 scale-100
                        transition-all duration-300
                        group-hover:opacity-100 group-hover:scale-125
                      "
                    />
                  </span>
                </div>

                {/* Image */}
                <div className={left ? "col-start-3" : "col-start-1"}>
                  <Link href={`/representations/${it.slug}`} className="block">
                    <div className="relative w-full h-72 md:h-[26rem] overflow-hidden">
                      <Image
                        src={it.image}
                        alt={it.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={`
                          object-cover
                          grayscale
                          ${prefersReduce ? "" : "transition-transform duration-[700ms] ease-out"}
                          group-hover:grayscale-0 group-hover:scale-[1.012]
                        `}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}
