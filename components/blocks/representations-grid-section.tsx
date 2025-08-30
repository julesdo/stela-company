"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import MagneticButton from "@/components/ui/magnetic-button"

type RepresentationCard = {
  slug: string
  title: string
  excerpt?: string
  image: string
  date?: string
  city?: string
}

interface RepresentationsGridSectionProps {
  items?: RepresentationCard[]
  heading?: string
  ctaHref?: string
}

export default function RepresentationsGridSection({
  items,
  heading = "Prochaine représentation",
  ctaHref = "/representations",
}: RepresentationsGridSectionProps) {
  const sample: RepresentationCard[] = [
    {
      slug: "medee-acte-1",
      title: "Médée — Acte I",
      excerpt:
        "Création chorégraphique & vocale. Une traversée où langue, geste et souffle s’entrelacent.",
      image: "/about1.jpg",
    },
    {
      slug: "langues-en-scene",
      title: "Langues en scène",
      excerpt:
        "Performance bilingue FR/DE : le texte se danse, les corps prennent la parole.",
      image: "/about2.jpg",
    },
  ]

  const data = items?.length ? items : sample

  // on prend uniquement la première (mise en avant)
  const featured = data[0]
  if (!featured) return null

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } } }
  const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

  return (
    <section className="py-24 md:py-28 px-6 md:px-12 lg:pr-20 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
      >
        {/* Titre sobre */}
        <motion.div variants={fadeUp as any} className="mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-light text-black tracking-wide">{heading}</h2>
          <div className="w-12 h-px bg-black mt-4 opacity-30" />
        </motion.div>

        {/* Ligne unique : image massive + bouton magnétique à droite */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* VISUEL WOW (aucun arrondi / aucune card) */}
          <motion.article variants={fadeUp as any} className="lg:col-span-10 relative group">
            <Link href={`/representations/${featured.slug}`} aria-label={featured.title} className="block">
              <div className="relative w-full h-[60vh] md:h-[68vh] overflow-hidden">
                {/* Image N&B -> Couleur + micro-zoom au hover */}
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="
                    object-cover
                    grayscale
                    transition-all duration-[900ms] ease-out
                    group-hover:grayscale-0 group-hover:scale-[1.02]
                  "
                  priority
                />

                {/* Dégradé de base pour la lisibilité du titre */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                {/* Survol : on renforce le dégradé (pas de 'card'), + on révèle l'extrait */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                </div>

                {/* Bloc texte bas-gauche : titre toujours visible, extrait apparaît au hover */}
                <div className="absolute bottom-0 left-0 p-6 md:p-9">
                  <h3
                    className="
                      text-white font-light leading-[1.05]
                      text-3xl md:text-5xl lg:text-6xl
                      drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]
                    "
                  >
                    {featured.title}
                  </h3>

                  {featured.excerpt && (
                    <p
                      className="
                        max-w-2xl text-white/0 group-hover:text-white/85
                        transition-[color,transform,opacity] duration-500
                        translate-y-0 group-hover:translate-y-0
                        text-sm md:text-base mt-3 md:mt-4
                      "
                    >
                      {featured.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Bouton flèche magnétique — centré verticalement à droite (desktop) */}
          <motion.div variants={fadeUp as any} className="lg:col-span-2">
            <div className="hidden lg:flex items-center justify-center h-full">
              <MagneticButton href={ctaHref} variant="outline" label="Voir les représentations" />
            </div>

            {/* Mobile : lien discret sous l’image */}
            <div className="lg:hidden pt-4 text-right">
              <Link
                href={ctaHref}
                className="inline-flex items-center text-sm tracking-wider uppercase text-black/60 hover:text-black transition"
              >
                Voir plus
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
