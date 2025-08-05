import React from "react"
import { Metadata } from "next"
import LanguesHero from "@/components/blocks/langues-hero"
import LanguesCommunication from "@/components/blocks/langues-communication"
import LanguesGallery from "@/components/blocks/langues-gallery"
import SectionScroller from "@/components/section-scroller"

export const metadata: Metadata = {
  title: "Langues | La Stela Company",
  description: "Explorez l'apprentissage des langues avec La Stela Company, où communication et culture se rencontrent",
}

export default function LanguesPage() {
  return (
    <SectionScroller>
      <section className="section">
        <LanguesHero />
      </section>
      <section className="section">
        <LanguesCommunication />
      </section>
      <section className="section">
        <LanguesGallery />
      </section>
    </SectionScroller>
  )
}