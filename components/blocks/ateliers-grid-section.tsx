// components/sections/ateliers-grid-section.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export type AtelierCard = {
  slug: string
  title: string
  excerpt?: string
  image: string
  discipline: "Danse" | "Théâtre" | "Langues"
  level?: "Débutant" | "Intermédiaire" | "Avancé" | "Tous niveaux"
  duration?: string // ex: "1h30"
  dayTime?: string  // ex: "Lundi 19:00"
}

interface AteliersGridSectionProps {
  items?: AtelierCard[]
  heading?: string
  showFilters?: boolean
}

export default function AteliersGridSection({
  items,
  heading = "Ateliers",
  showFilters = true,
}: AteliersGridSectionProps) {
  const sample: AtelierCard[] = [
    {
      slug: "atelier-danse-contemporaine",
      title: "Danse contemporaine — Corps & souffle",
      excerpt: "Explorer l’ancrage, la fluidité, la musicalité du geste dans un cadre bienveillant.",
      image: "/dance.jpg",
      discipline: "Danse",
      level: "Tous niveaux",
      duration: "1h30",
      dayTime: "Lundi 19:00",
    },
    {
      slug: "atelier-theatre-impro",
      title: "Théâtre — Improvisation & présence",
      excerpt: "Apprivoiser la scène : écoute, réponse, création avec l’autre.",
      image: "/dance1.jpg",
      discipline: "Théâtre",
      level: "Débutant",
      duration: "2h",
      dayTime: "Mercredi 18:30",
    },
    {
      slug: "atelier-langues-en-scene",
      title: "Langues en scène — FR/DE",
      excerpt: "Diction, rythme, adresse : la langue qui se joue et se met en mouvement.",
      image: "/dance2.jpg",
      discipline: "Langues",
      level: "Intermédiaire",
      duration: "1h30",
      dayTime: "Jeudi 19:30",
    },
  ]

  const data = items?.length ? items : sample

  const [filter, setFilter] = React.useState<"Tous" | "Danse" | "Théâtre" | "Langues">("Tous")
  const filtered = filter === "Tous" ? data : data.filter(i => i.discipline === filter)

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } }
  const card = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }

  // Accent par discipline (sobres mais distinctifs)
  const accent = (d: AtelierCard["discipline"]) =>
    d === "Danse" ? "bg-black" : d === "Théâtre" ? "bg-neutral-800" : "bg-neutral-600"

  const chipTone = (d: AtelierCard["discipline"]) =>
    d === "Danse" ? "bg-black text-white" : d === "Théâtre" ? "bg-neutral-800 text-white" : "bg-neutral-700 text-white"

  return (
    <section className="py-28 px-6 md:px-12 lg:pr-20 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
      >
        {/* En-tête */}
        <motion.div variants={card} className="mb-8 md:mb-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-light text-black tracking-wide">{heading}</h1>
            <div className="w-12 h-px bg-black mt-4 opacity-30" />
          </div>

          {/* Filtres minimalistes */}
          {showFilters && (
            <div className="inline-flex rounded-full border border-black/10 overflow-hidden">
              {(["Tous","Danse","Théâtre","Langues"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 md:px-5 py-2 text-sm transition ${
                    filter === f ? "bg-black text-white" : "bg-white text-black hover:bg-black/5"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Grid (style différent des Représentations) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((it) => (
            <motion.article
              key={it.slug}
              variants={card}
              className="group relative rounded-2xl border border-black/10 bg-white/80 hover:bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition pb-20"
            >
              {/* Barre d’accent à gauche (s’élargit au hover) */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent(it.discipline)} rounded-l-2xl group-hover:w-2 transition-all`} />

              <Link
                href={`/ateliers/${it.slug}`}
                aria-label={it.title}
                className="block p-5 md:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-2xl"
              >
                {/* En-tête : chips + méta */}
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] tracking-wide uppercase ${chipTone(it.discipline)}`}>
                    {it.discipline}
                  </span>
                  {it.level && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] tracking-wide uppercase bg-black/5 text-black/70">
                      {it.level}
                    </span>
                  )}
                  {it.dayTime && (
                    <span className="ml-auto text-[12px] text-black/60">
                      {it.dayTime}
                    </span>
                  )}
                </div>

                {/* Corps : titre + meta + thumb ronde */}
                <div className="mt-4 grid grid-cols-[1fr_auto] items-start gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-light text-black leading-snug">{it.title}</h3>
                    <p className="mt-1 text-sm text-black/60">
                      {(it.duration ? it.duration : "")}
                      {it.duration && it.level ? " • " : ""}
                      {it.level ? it.level : ""}
                    </p>
                  </div>

                  {/* Miniature ronde distincte */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-1 ring-black/10 translate-y-1 group-hover:translate-y-0 transition-transform">
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Extrait : slide-up au hover (différent du panneau blanc des Représentations) */}
                {it.excerpt && (
                  <div className="mt-4">
                    <div className="relative h-[0px] overflow-visible">
                      <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                        <p className="text-[15px] leading-relaxed text-black/75 font-light">
                          {it.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
