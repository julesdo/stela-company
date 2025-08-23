import React from "react"
import { Metadata } from "next"
import TheatreHero from "@/components/blocks/theatre-hero"
import TheatreExpression from "@/components/blocks/theatre-expression"
import TheatreGallery from "@/components/blocks/theatre-gallery"
import SectionScroller from "@/components/section-scroller"

export const metadata: Metadata = {
  title: "Théâtre | La Stela Company",
  description: "Découvrez l'univers théâtral de La Stela Company, où texte, émotion et performance se rencontrent",
}

export default function TheatrePage() {
  return (
    <SectionScroller>
      <section className="section">
        <TheatreHero />
      </section>
      <section className="section">
        <TheatreExpression />
      </section>
      <section className="section">
        <TheatreGallery />
      </section>
    </SectionScroller>
  )
}