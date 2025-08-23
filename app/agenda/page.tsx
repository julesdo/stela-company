import React from "react"
import { Metadata } from "next"
import AgendaHero from "@/components/blocks/agenda-hero"
import AgendaCalendar from "@/components/blocks/agenda-calendar"
import AgendaUpcoming from "@/components/blocks/agenda-upcoming"
import AgendaGallery from "@/components/blocks/agenda-gallery"

export const metadata: Metadata = {
  title: "Agenda | La Stela Company",
  description: "Découvrez toutes nos représentations, ateliers et événements artistiques",
}

export default function AgendaPage() {
  return (
    <>
      {/* Hero Section */}
      <AgendaHero />
      
      {/* Événements à venir */}
      <AgendaGallery />
      
      {/* Calendrier interactif */}
      <AgendaCalendar />
    </>
  )
}