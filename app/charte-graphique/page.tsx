import React from "react"
import { Metadata } from "next"
import CharteHero from "@/components/blocks/charte-hero"
import CharteElements from "@/components/blocks/charte-elements"
import CharteComponents from "@/components/blocks/charte-components"
import SectionScroller from "@/components/section-scroller"

export const metadata: Metadata = {
  title: "Charte Graphique | La Stela Company",
  description: "Découvrez l'univers visuel et les principes de design de La Stela Company",
}

export default function CharteGraphiquePage() {
  return (
    <SectionScroller>
      <section className="section">
        <CharteHero />
      </section>
      <section className="section">
        <CharteElements />
      </section>
      <section className="section">
        <CharteComponents />
      </section>
    </SectionScroller>
  )
}