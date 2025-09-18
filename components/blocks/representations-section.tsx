"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

// Types
type Representation = {
  id: string
  title: string
  subtitle?: string
  date: string // ISO
  city: string
  venue?: string
  href?: string
  image?: string // optionnel si tu veux un visuel d’arrière-plan léger
}

interface RepresentationsSectionProps {
  events?: Representation[]
  limitUpcoming?: number
  limitPast?: number
}

export const RepresentationsSection = ({ data }: { data: any }) => {
  // --- Demo data (supprime si tu passes des props) ---
  const sample: Representation[] = [
    {
      id: "e1",
      title: "Médée — Acte I",
      subtitle: "Création chorégraphique & vocale",
      date: "2025-09-18T20:00:00.000Z",
      city: "Paris",
      venue: "Théâtre de la Ville",
      href: "/agenda/medee-acte-1",
    },
    {
      id: "e2",
      title: "Langues en scène",
      subtitle: "Performance bilingue FR/DE",
      date: "2025-10-05T19:30:00.000Z",
      city: "Berlin",
      venue: "Sophiensaele",
    },
    {
      id: "e3",
      title: "Cartographie des corps",
      subtitle: "Laboratoire public",
      date: "2025-07-02T18:00:00.000Z",
      city: "Bordeaux",
      venue: "TNBA",
      href: "/agenda/cartographie-des-corps",
    },
    {
      id: "e4",
      title: "Mosaïques",
      subtitle: "Danse & langues",
      date: "2025-06-11T20:30:00.000Z",
      city: "Lyon",
      venue: "Maison de la Danse",
    },
  ]

  const source: Representation[] = (data?.events && data.events.length ? (data.events as Representation[]) : sample)
    .slice()
    .sort((a: Representation, b: Representation) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    return da - db
  })

  const now = new Date().getTime()
  const upcoming = source.filter((d: Representation) => new Date(d.date).getTime() >= now)
  const past = source.filter((d: Representation) => new Date(d.date).getTime() < now).reverse()

  // Limites d’affichage
  const limitUpcoming: number = data?.limitUpcoming ?? 5
  const limitPast: number = data?.limitPast ?? 4
  const upcomingLimited = upcoming.slice(0, limitUpcoming)
  const pastLimited = past.slice(0, limitPast)

  // UI state (onglet)
  const [tab, setTab] = React.useState<"upcoming" | "past">("upcoming")

  // Animations
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 8, transition: { duration: 0.25, ease: "easeIn" } },
  }

  // Formatage
  const df = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const shortDate = (iso: string) =>
    new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(new Date(iso))

  const weekday = (iso: string) =>
    new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(new Date(iso))

  // Composant “puce calendrier” minimaliste (pas d’autre dépendance)
  const CalendarChip = ({ iso }: { iso: string }) => (
    <div className="relative w-16 h-16 rounded-lg border border-black/10 bg-white shadow-sm overflow-hidden">
      <div className="h-5 w-full bg-black/80 text-white text-[10px] tracking-wider uppercase flex items-center justify-center">
        {weekday(iso)}
      </div>
      <div className="flex-1 h-[calc(100%-20px)] flex items-center justify-center">
        <span className="text-lg font-light text-black">{shortDate(iso)}</span>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-lg" />
    </div>
  )

  const Row = ({ e }: { e: Representation }) => {
    const full = df.format(new Date(e.date))

    const Content = (
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">
        {/* Timeline / Chip */}
        <div className="col-span-3 sm:col-span-2 md:col-span-2 flex items-center gap-4">
          <div className="relative w-2 h-2 rounded-full bg-black/50" />
          <CalendarChip iso={e.date} />
        </div>

        {/* Titre + méta */}
        <div className="col-span-9 sm:col-span-10 md:col-span-7 space-y-1">
          <h4 className="text-xl md:text-2xl font-light text-black leading-tight">
            {e.title}
          </h4>
          {e.subtitle && (
            <p className="text-sm md:text-base text-black/60">{e.subtitle}</p>
          )}
          <p className="text-sm text-black/50">
            <time dateTime={e.date} title={full} className="mr-2">
              {full}
            </time>
            — {e.city}
            {e.venue ? ` • ${e.venue}` : ""}
          </p>
        </div>

        {/* Lien discret (pas “bouton d’achat”) */}
        <div className="col-span-12 md:col-span-3 md:justify-self-end">
          {e.href ? (
            <span className="inline-flex items-center text-sm tracking-wider uppercase text-black/60 hover:text-black transition">
              <span className="mr-2">Détails</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.25}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6"/>
              </svg>
            </span>
          ) : null}
        </div>
      </div>
    )

    return (
      <motion.li
        variants={item as any}
        className="relative group px-4 py-5 md:px-6 md:py-6 rounded-2xl bg-white/60 border border-black/10 hover:border-black/20 transition"
      >
        {/* Ligne de timeline à gauche (subtile) */}
        <div className="pointer-events-none absolute left-2 top-0 bottom-0 w-px bg-black/10 md:left-3" />
        {e.href ? <Link href={e.href}>{Content}</Link> : Content}
      </motion.li>
    )
  }

  const title = data?.title ?? "Notre agenda"

  return (
    <Section background={data?.background} className="py-28 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
      >
        {/* En-tête épuré */}
        <motion.div variants={item as any} className="mb-10 md:mb-14 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide" data-tina-field={tinaField(data, 'title')}>{title}</h2>
            <div className="w-12 h-px bg-black mt-4 opacity-30" />
          </div>

          {/* Tabs minimalistes */}
          <div className="inline-flex rounded-full border border-black/10 overflow-hidden">
            <button
              onClick={() => setTab("upcoming")}
              className={`px-4 md:px-5 py-2 text-sm transition ${
                tab === "upcoming"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black/5"
              }`}
            >
              À venir
            </button>
            <button
              onClick={() => setTab("past")}
              className={`px-4 md:px-5 py-2 text-sm transition ${
                tab === "past"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black/5"
              }`}
            >
              Passées
            </button>
          </div>
        </motion.div>

        {/* Liste */}
        <motion.ul
          className="space-y-4 md:space-y-5"
          initial={false}
        >
          <AnimatePresence mode="wait">
            {tab === "upcoming" ? (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                className="space-y-4 md:space-y-5"
              >
                {upcomingLimited.length === 0 ? (
                  <motion.div variants={item as any} className="text-black/60 text-sm md:text-base">
                    Prochaines dates bientôt annoncées.
                  </motion.div>
                ) : (
                  upcomingLimited.map((e: Representation) => <Row key={e.id} e={e} />)
                )}
              </motion.div>
            ) : (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                className="space-y-4 md:space-y-5"
              >
                {pastLimited.length === 0 ? (
                  <motion.div variants={item as any} className="text-black/60 text-sm md:text-base">
                    Aucune représentation passée pour le moment.
                  </motion.div>
                ) : (
                  pastLimited.map((e: Representation) => <Row key={e.id} e={e} />)
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
    </Section>
  )
}

export const representationsSectionBlockSchema: Template = {
  name: 'representationsSection',
  label: 'Representations Section',
  ui: {
    previewSrc: '/blocks/agenda.png',
    defaultItem: {
      title: 'Notre agenda',
      limitUpcoming: 5,
      limitPast: 4,
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: 'string', label: 'Title', name: 'title' },
    { type: 'number', label: 'Limit Upcoming', name: 'limitUpcoming' },
    { type: 'number', label: 'Limit Past', name: 'limitPast' },
    {
      type: 'object',
      label: 'Events',
      name: 'events',
      list: true,
      fields: [
        { type: 'string', name: 'id', label: 'ID' },
        { type: 'string', name: 'title', label: 'Title', required: true },
        { type: 'string', name: 'subtitle', label: 'Subtitle' },
        { type: 'datetime', name: 'date', label: 'Date' },
        { type: 'string', name: 'city', label: 'City' },
        { type: 'string', name: 'venue', label: 'Venue' },
        { type: 'string', name: 'href', label: 'Link' },
        { type: 'image', name: 'image', label: 'Background Image' },
      ],
    },
  ],
}

export default function RepresentationsSectionLegacy({
  events,
  limitUpcoming,
  limitPast,
}: {
  events?: Representation[]
  limitUpcoming?: number
  limitPast?: number
}) {
  return <RepresentationsSection data={{ events, limitUpcoming, limitPast }} />
}
