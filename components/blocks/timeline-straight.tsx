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
        className="grid grid-cols-[1fr,80px,1fr] gap-x-8 md:gap-x-16"
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
              className="relative group py-16 md:py-20"
            >
              <div className="grid grid-cols-subgrid col-span-3 items-center gap-8">
                {/* Texte */}
                <div className={`${left ? "col-start-1" : "col-start-3"} flex items-center`}>
                  <Link href={`/representations/${it.slug}`} className="block group/link w-full">
                    <div className="max-w-lg">
                      <p className="text-sm text-black/60 mb-3">
                        <time dateTime={it.date}>{df(it.date)}</time>
                        {it.city ? <> — <span className="font-medium">{it.city}</span></> : null}
                        {it.venue ? <> • <span className="font-light">{it.venue}</span></> : null}
                      </p>
                      <h3 className="text-2xl md:text-4xl font-light text-black leading-[1.1] mb-4 group-hover/link:text-black/80 transition-colors">
                        {it.title}
                      </h3>
                      {it.excerpt && (
                        <p className="text-[16px] md:text-[18px] text-black/75 leading-relaxed mb-6">
                          {it.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center text-xs tracking-wider uppercase text-black/60 group-hover/link:text-black transition-colors">
                        Découvrir
                        <svg
                          className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Point + segment local éclairci au hover */}
                <div className="col-start-2 relative flex items-center justify-center">
                  {/* Segment local qui s'éclaire au hover */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 -translate-x-1/2 w-px h-16 bg-transparent transition-all duration-500 group-hover:bg-black/40 group-hover:h-24"
                  />
                  {/* Point amélioré */}
                  <span aria-hidden className="relative z-[1]">
                    <span
                      className="
                        block w-3 h-3 rounded-full bg-black/80
                        transition-all duration-500
                        group-hover:scale-125 group-hover:bg-black
                        shadow-sm
                      "
                    />
                    {/* Halo plus visible */}
                    <span
                      className="
                        pointer-events-none absolute inset-0 rounded-full
                        bg-black/20 opacity-0 scale-100
                        transition-all duration-500
                        group-hover:opacity-100 group-hover:scale-150
                      "
                    />
                    {/* Anneau externe */}
                    <span
                      className="
                        pointer-events-none absolute inset-0 rounded-full
                        border border-black/20 opacity-0 scale-100
                        transition-all duration-500
                        group-hover:opacity-100 group-hover:scale-200
                      "
                    />
                  </span>
                </div>

                {/* Image - centrée avec le point */}
                <div className={`${left ? "col-start-3" : "col-start-1"} flex items-center`}>
                  <Link href={`/representations/${it.slug}`} className="block group/image w-full">
                    <div className="relative w-full h-80 md:h-96 overflow-hidden">
                      <Image
                        src={it.image}
                        alt={it.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={`
                          object-cover
                          grayscale
                          ${prefersReduce ? "" : "transition-all duration-700 ease-out"}
                          group-hover/image:grayscale-0 group-hover/image:scale-105
                        `}
                      />
                      {/* Overlay subtil */}
                      <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-700" />
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
