import React from "react"
import { Metadata } from "next"
import DanseHero from "@/components/blocks/danse-hero"
import DanseEssence from "@/components/blocks/danse-essence"
import DanseGallery from "@/components/blocks/danse-gallery"
import SectionScroller from "@/components/section-scroller"

export const metadata: Metadata = {
  title: "Danse | La Stela Company",
  description: "Explorez l'univers de la danse contemporaine de La Stela Company, entre mouvement, émotion et poésie corporelle",
}

export default function DansePage() {
  return (
    <SectionScroller>
      <section className="section">
        <DanseHero />
      </section>
      <section className="section">
        <DanseEssence />
      </section>
      <section className="section">
        <DanseGallery />
      </section>
    </SectionScroller>
  )
}