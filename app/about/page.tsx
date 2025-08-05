import React from "react"
import { Metadata } from "next"
import AboutHeroSimple from "@/components/blocks/about-hero-simple"
import AboutEssence from "@/components/blocks/about-essence"
import AboutContact from "@/components/blocks/about-contact"

export const metadata: Metadata = {
  title: "À propos | La Stela Company",
  description: "Découvrez l'histoire de Stela Elena Stankovic et de La Stela Company, laboratoire artistique entre danse, théâtre et langues",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero épuré */}
      <AboutHeroSimple />
      
      {/* Essence de la compagnie */}
      <AboutEssence />
      
      {/* Contact simple */}
      <AboutContact />
    </>
  )
}