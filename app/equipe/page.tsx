// app/equipe/page.tsx
import TeamGridSection, { TeamMemberCard } from "@/components/blocks/team-grid-section"
import React from "react"


async function getAllTeamMembers(): Promise<TeamMemberCard[]> {
  // TODO: remplace par ton fetch CMS
  return [
    {
      slug: "stela-elena-stankovic",
      name: "Stela Elena Stankovic",
      role: "Fondatrice & Direction artistique",
      portrait: "/stela.webp",
      description:
        "Artiste pluridisciplinaire. Recherche du souffle, de l’adresse et de la présence. Pièces créées entre France et Allemagne.",
    },
    {
      slug: "marie-dubois",
      name: "Marie Dubois",
      role: "Chorégraphe associée",
      portrait: "/team/ava.png",
      description:
        "Écriture du mouvement, écoute du groupe, travail sur la fluidité et la précision du geste.",
    },
    {
      slug: "alex-muller",
      name: "Alex Müller",
      role: "Création lumière",
      portrait: "/team/jbb.jfif",
      description:
        "Lumières fines, justesse atmosphérique. Accompagne le rythme et l’espace des pièces.",
    },
  ]
}

export const metadata = {
  title: "Équipe — La Stela Company",
  description: "Celles et ceux qui font vivre nos créations : direction, interprètes, collaborations.",
}

export default async function EquipePage() {
  const items = await getAllTeamMembers()
  return (
    <main className="bg-white">
      <TeamGridSection items={items} heading="Équipe" />
    </main>
  )
}
