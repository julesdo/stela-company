// components/sections/team-grid-section.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export type TeamMemberCard = {
  slug: string
  name: string
  role: string
  portrait: string
  description?: string
}

interface TeamGridSectionProps {
  items?: TeamMemberCard[]
  heading?: string
}

export default function TeamGridSection({
  items,
  heading = "Équipe",
}: TeamGridSectionProps) {
  const sample: TeamMemberCard[] = [
    {
      slug: "stela-elena-stankovic",
      name: "Stela Elena Stankovic",
      role: "Fondatrice & Direction artistique",
      portrait: "/team/stela.jpg",
      description:
        "Artiste pluridisciplinaire. Recherche du souffle, de l’adresse et de la présence. Pièces créées entre France et Allemagne.",
    },
    {
      slug: "marie-dubois",
      name: "Marie Dubois",
      role: "Chorégraphe associée",
      portrait: "/team/ava.png",
      description:
        "Écriture du mouvement, écoute du groupe, travail sur la fluidité et la précision du geste.",
    },
    {
      slug: "alex-muller",
      name: "Alex Müller",
      role: "Création lumière",
      portrait: "/team/jbb.jfif",
      description:
        "Lumières fines, justesse atmosphérique. Accompagne le rythme et l’espace des pièces.",
    },
  ]

  const data = items?.length ? items : sample

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } } }
  const row = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }

  return (
    <section className="py-24 px-6 md:px-12 lg:pr-20 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {/* En-tête simple */}
        <motion.div variants={row as any} className="mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl font-light text-black tracking-wide">{heading}</h1>
          <div className="w-12 h-px bg-black mt-4 opacity-30" />
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {data.map((m, idx) => (
            <motion.article key={m.slug} variants={row as any}>
              <Link
                href={`/equipe/${m.slug}`}
                aria-label={m.name}
                className="group block cursor-pointer"
              >
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
                  {/* Image haute, sobre — micro-zoom + léger brighten au hover */}
                  <div className="lg:col-span-6 order-1">
                    <div className="relative w-full h-80 md:h-[34rem] overflow-hidden">
                      <Image
                        src={m.portrait}
                        alt={m.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="
                          object-cover
                          grayscale
                          transition-transform duration-[700ms] ease-out
                          group-hover:grayscale-0 group-hover:scale-[1.012]
                        "
                        priority={idx < 2}
                      />
                    </div>
                  </div>

                  {/* Texte sobre + petit indicateur de clic */}
                  <div className="lg:col-span-6 order-2">
                    <div className="max-w-2xl">
                      <p className="text-sm text-black/55">{m.role}</p>
                      <h3 className="mt-1 text-3xl md:text-4xl font-light text-black leading-[1.1]">
                        {m.name}
                      </h3>
                      {m.description && (
                        <p className="mt-4 text-[16px] md:text-[17px] text-black/80 leading-relaxed">
                          {m.description}
                        </p>
                      )}

                      {/* Indicateur de clic discret */}
                      <span className="mt-6 inline-flex items-center text-xs tracking-wider uppercase text-black/50">
                        Découvrir
                        <svg
                          className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.25}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
