// app/agenda/page.tsx
import React from "react"
import Link from "next/link"
import AgendaList, { Representation } from "@/components/blocks/agenda-list"

// Remplace par ton fetch CMS (Ghost/Notion/Airtable…)
async function getAllEvents(): Promise<Representation[]> {
  // Exemple Ghost (pseudo) :
  // const posts = await ghostAPI.posts.browse({ filter: "tag:agenda", limit: "all" })
  // return posts.map(p => ({
  //   id: p.id, title: p.title, subtitle: p.custom_excerpt,
  //   date: p.published_at, city: p.primary_tag?.name ?? "—",
  //   venue: p.meta_title, href: `/agenda/${p.slug}`
  // }))

  return [
    { id: "e1", title: "Médée — Acte I", subtitle: "Création chorégraphique & vocale", date: "2025-09-18T20:00:00.000Z", city: "Paris", venue: "Théâtre de la Ville", href: "/agenda/medee-acte-1" },
    { id: "e2", title: "Langues en scène", subtitle: "Performance bilingue FR/DE", date: "2025-10-05T19:30:00.000Z", city: "Berlin", venue: "Sophiensaele", href: "/agenda/langues-en-scene" },
    { id: "e3", title: "Cartographie des corps", subtitle: "Laboratoire public", date: "2025-07-02T18:00:00.000Z", city: "Bordeaux", venue: "TNBA", href: "/agenda/cartographie-des-corps" },
    { id: "e4", title: "Mosaïques", subtitle: "Danse & langues", date: "2025-06-11T20:30:00.000Z", city: "Lyon", venue: "Maison de la Danse", href: "/agenda/mosaiques" },
  ]
}

export const metadata = {
  title: "Agenda — La Stela Company",
  description: "Toutes les dates : créations, performances, laboratoires, rencontres.",
}

export default async function AgendaPage() {
  const events = await getAllEvents()

  return (
    <main className="bg-white">
      {/* Fil d’Ariane + Titre de page */}
      <section className="pt-28 pb-8 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-black/60 mb-4">
            <Link href="/" className="hover:text-black">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-black/80">Agenda</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-light text-black tracking-wide">Agenda</h1>
          <div className="w-12 h-px bg-black mt-4 opacity-30" />
        </div>
      </section>

      {/* Liste Agenda (même style que la section) */}
      <AgendaList events={events} />
    </main>
  )
}
