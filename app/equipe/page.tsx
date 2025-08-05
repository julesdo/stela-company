import React from "react"
import { Metadata } from "next"
import EquipeHero from "@/components/blocks/equipe-hero"
import EquipeMembers from "@/components/blocks/equipe-members"
import EquipeCollaboration from "@/components/blocks/equipe-collaboration"

export const metadata: Metadata = {
  title: "Équipe | La Stela Company",
  description: "Rencontrez l'équipe artistique de La Stela Company et ses collaborateurs créatifs",
}

export default function EquipePage() {
  return (
    <>
      {/* Hero épuré */}
      <EquipeHero />
      
      {/* Membres de l'équipe */}
      <EquipeMembers />
      
      {/* Collaboration */}
      <EquipeCollaboration />
    </>
  )
}