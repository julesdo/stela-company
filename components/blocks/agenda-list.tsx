// components/agenda/agenda-list.tsx
"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export type Representation = {
  id: string
  title: string
  subtitle?: string
  date: string // ISO
  city: string
  venue?: string
  href?: string
  image?: string
}

export default function AgendaList({ events }: { events: Representation[] }) {
  const data = (events && events.length ? events : []).slice().sort((a, b) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    return da - db
  })

  const now = new Date().getTime()
  const upcoming = data.filter(d => new Date(d.date).getTime() >= now)
  const past = data.filter(d => new Date(d.date).getTime() < now).reverse()

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

        {/* Lien discret */}
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
        variants={item}
        className="relative group px-4 py-5 md:px-6 md:py-6 rounded-2xl bg-white/60 border border-black/10 hover:border-black/20 transition"
      >
        <div className="pointer-events-none absolute left-2 top-0 bottom-0 w-px bg-black/10 md:left-3" />
        {e.href ? <Link href={e.href}>{Content}</Link> : Content}
      </motion.li>
    )
  }

  return (
    <section className="py-10 md:py-12 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Tabs */}
        <motion.div variants={item} className="mb-8 md:mb-10 flex items-end justify-between px-6 md:px-12 lg:pr-20">
          <div className="inline-flex rounded-full border border-black/10 overflow-hidden">
            <button
              onClick={() => setTab("upcoming")}
              className={`px-4 md:px-5 py-2 text-sm transition ${
                tab === "upcoming" ? "bg-black text-white" : "bg-white text-black hover:bg-black/5"
              }`}
            >
              À venir
            </button>
            <button
              onClick={() => setTab("past")}
              className={`px-4 md:px-5 py-2 text-sm transition ${
                tab === "past" ? "bg-black text-white" : "bg-white text-black hover:bg-black/5"
              }`}
            >
              Passées
            </button>
          </div>
        </motion.div>

        {/* Liste */}
        <motion.ul className="space-y-4 md:space-y-5 px-6 md:px-12 lg:pr-20" initial={false}>
          <AnimatePresence mode="wait">
            {tab === "upcoming" ? (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                className="space-y-4 md:space-y-5"
              >
                {upcoming.length === 0 ? (
                  <motion.div variants={item} className="text-black/60 text-sm md:text-base">
                    Prochaines dates bientôt annoncées.
                  </motion.div>
                ) : (
                  upcoming.map(e => <Row key={e.id} e={e} />)
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
                {past.length === 0 ? (
                  <motion.div variants={item} className="text-black/60 text-sm md:text-base">
                    Aucune représentation passée pour le moment.
                  </motion.div>
                ) : (
                  past.map(e => <Row key={e.id} e={e} />)
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
    </section>
  )
}
