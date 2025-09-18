// components/blocks/ateliers-list.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"
import client from "@/tina/__generated__/client"

export type AtelierListItem = {
  slug: string
  theme: string     // "Cours pour les enfants" | "Cours pour adulte 1" | "Cours pour adulte 2"
  title: string
  excerpt: string
  details?: string  // créneau / ville (très discret)
  image: string
}

export const AteliersList = ({ data }: { data: any }) => {
  const heading: string | undefined = data?.heading
  const [items, setItems] = React.useState<AtelierListItem[]>([])

  React.useEffect(() => {
    let cancelled = false
    async function fetchAteliersIfNeeded() {
      if (items && items.length > 0) return
      try {
        // fetch first 50 ateliers
        const res: any = await client.queries.atelierConnection({ first: 50 })
        const derived: AtelierListItem[] =
          res?.data?.atelierConnection?.edges
            ?.map((e: any) => e?.node)
            .filter(Boolean)
            .map((n: any) => ({
              slug: n?._sys?.filename,
              theme: n?.theme || n?.discipline || '',
              title: n?.title || '',
              excerpt: n?.description ? String(n.description).slice(0, 180) : '',
              details: n?.dayTime || '',
              image: n?.coverImage || '/about2.jpg',
            })) || []
        if (!cancelled) setItems(derived)
      } catch (err) {
        // silent fail; leave list empty
      }
    }
    fetchAteliersIfNeeded()
    return () => {
      cancelled = true
    }
  }, [])
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.10, delayChildren: 0.04 } } }
  const row = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.40, ease: "easeOut" } } }

  return (
    <Section background={data?.background} className="pb-28 px-6 md:px-12 lg:pr-20">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <div className="text-center pt-28 pb-8" data-tina-field={tinaField(data, 'heading')}>
            <h1 className="text-3xl md:text-5xl font-light tracking-wide">{heading}</h1>
            <div className="mx-auto w-12 h-px bg-black mt-4 opacity-30" />
          </div>
        )}
        <motion.ul
          className="w-full"
          initial="hidden"
          animate="visible"
          variants={container}
          data-tina-field={tinaField(data)}
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
      </div>
    </Section>
  )
}

export const ateliersListBlockSchema: Template = {
  name: 'ateliersList',
  label: 'Ateliers List',
  ui: {
    previewSrc: '/blocks/features.png',
    defaultItem: {
      heading: 'Ateliers',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: 'string', name: 'heading', label: 'Heading' },
  ],
}

export default function AteliersListLegacy({ items }: { items: AtelierListItem[] }) {
  return <AteliersList data={{ items, heading: 'Ateliers' }} />
}
