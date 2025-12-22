// components/blocks/timeline-straight.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { type Locale } from "@/lib/i18n"

export type RepresentationItem = {
  slug: string
  title: string
  excerpt?: string
  image: string
  date: string   // ISO
  city?: string
  venue?: string
}

export default function TimelineStraight({ items, locale = 'fr' }: { items: RepresentationItem[]; locale?: Locale }) {
  const localeMap: Record<Locale, string> = {
    fr: 'fr-FR',
    de: 'de-DE',
    en: 'en-US',
    sr: 'sr-RS',
  };
  
  const discoverText: Record<Locale, string> = {
    fr: 'Découvrir',
    de: 'Entdecken',
    en: 'Discover',
    sr: 'Откриј',
  };
  
  const df = (iso: string) =>
    new Intl.DateTimeFormat(localeMap[locale], {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso))

  return (
    <div className="relative">
      {/* Ligne verticale simple au centre */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 -translate-x-1/2" />

      {/* Liste simple */}
      <ul className="space-y-16 md:space-y-24">
        {items.map((it, i) => {
          const left = i % 2 === 0
          return (
            <li key={it.slug} className="relative">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Colonne gauche : Texte ou Image selon l'alternance */}
                <div className={`${left ? "order-1" : "order-2 md:order-1"}`}>
                  {left ? (
                    // Texte à gauche
                    <Link href={it.slug} className="block group">
                      <div className="max-w-lg">
                        <p className="text-sm text-black/60 mb-3">
                          <time dateTime={it.date}>{df(it.date)}</time>
                          {it.city ? <> — <span className="font-medium">{it.city}</span></> : null}
                          {it.venue ? <> • <span className="font-light">{it.venue}</span></> : null}
                        </p>
                        <h3 className="text-2xl md:text-4xl font-light text-black leading-[1.1] mb-4 group-hover:text-black/80 transition-colors">
                          {it.title}
                        </h3>
                        {it.excerpt && (
                          <p className="text-[16px] md:text-[18px] text-black/75 leading-relaxed mb-6">
                            {it.excerpt}
                          </p>
                        )}
                        <span className="inline-flex items-center text-xs tracking-wider uppercase text-black/60 group-hover:text-black transition-colors">
                          {discoverText[locale]}
                          <svg
                            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                  ) : (
                    // Image à gauche
                    <Link href={it.slug} className="block group">
                      <div className="relative w-full h-80 md:h-96 overflow-hidden">
                        <Image
                          src={it.image}
                          alt={it.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  )}
                </div>

                {/* Point sur la ligne centrale */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black/80 z-10" />

                {/* Colonne droite : Image ou Texte selon l'alternance */}
                <div className={`${left ? "order-2" : "order-1 md:order-2"}`}>
                  {left ? (
                    // Image à droite
                    <Link href={it.slug} className="block group">
                      <div className="relative w-full h-80 md:h-96 overflow-hidden">
                        <Image
                          src={it.image}
                          alt={it.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  ) : (
                    // Texte à droite
                    <Link href={it.slug} className="block group">
                      <div className="max-w-lg ml-auto">
                        <p className="text-sm text-black/60 mb-3">
                          <time dateTime={it.date}>{df(it.date)}</time>
                          {it.city ? <> — <span className="font-medium">{it.city}</span></> : null}
                          {it.venue ? <> • <span className="font-light">{it.venue}</span></> : null}
                        </p>
                        <h3 className="text-2xl md:text-4xl font-light text-black leading-[1.1] mb-4 group-hover:text-black/80 transition-colors">
                          {it.title}
                        </h3>
                        {it.excerpt && (
                          <p className="text-[16px] md:text-[18px] text-black/75 leading-relaxed mb-6">
                            {it.excerpt}
                          </p>
                        )}
                        <span className="inline-flex items-center text-xs tracking-wider uppercase text-black/60 group-hover:text-black transition-colors">
                          {discoverText[locale]}
                          <svg
                            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
