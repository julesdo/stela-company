// components/blocks/ateliers-list.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export type AtelierListItem = {
  slug: string
  theme: string     // "Cours pour les enfants" | "Cours pour adulte 1" | "Cours pour adulte 2"
  title: string
  excerpt: string
  details?: string  // créneau / ville (très discret)
  image: string
}

export default function AteliersList({ items }: { items: AtelierListItem[] }) {
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.10, delayChildren: 0.04 } } }
  const row = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.40, ease: "easeOut" } } }

  return (
    <motion.ul
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {items.map((it, i) => (
        <motion.li
          key={it.slug}
          variants={row as any}
          className="group border-t border-black/10 first:border-none"
        >
          <Link href={`/ateliers/${it.slug}`} className="block focus:outline-none">
            <div className="grid lg:grid-cols-12 gap-6 md:gap-10 items-end py-12 md:py-16">
              {/* Texte — toujours à gauche pour le scan */}
              <div className="lg:col-span-5">
                <div className="max-w-xl">
                  {/* thématique minuscule (pas un tag) */}
                  <div className="text-[12px] tracking-wider uppercase text-black/45">
                    {it.theme}
                  </div>

                  <h2
                    className="
                      mt-2 text-[22px] md:text-[30px] font-light text-black leading-[1.12]
                      transition-transform duration-300 group-hover:translate-x-[2px]
                    "
                  >
                    {it.title}
                  </h2>

                  <p className="mt-4 text-[17px] md:text-[18px] leading-relaxed text-black/80">
                    {it.excerpt}
                  </p>

                  {it.details && (
                    <p className="mt-3 text-[14px] md:text-[15px] text-black/55">
                      {it.details}
                    </p>
                  )}

                  {/* Indice cliquable très discret */}
                  <span className="mt-5 inline-flex items-center text-[11px] tracking-wider uppercase text-black/50">
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
              </div>

              {/* Image — toujours à droite, grande et lisible */}
              <div className="lg:col-span-7">
                <div className="relative w-full h-64 md:h-[26rem] overflow-hidden">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="
                      object-cover
                      grayscale
                      transition-transform duration-[700ms] ease-out
                      group-hover:grayscale-0 group-hover:scale-[1.012]
                    "
                  />
                  {/* voile doux au hover (aucune card) */}
                  <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}
