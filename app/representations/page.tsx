import TimelineStraight, { RepresentationItem } from "@/components/blocks/timeline-straight"

// Remplace par ton fetch CMS
async function getAllRepresentations(): Promise<RepresentationItem[]> {
  return [
    {
      slug: "medee-acte-1",
      title: "Médée — Acte I",
      excerpt: "Création chorégraphique & vocale : souffle, adresse, présence.",
      image: "/about1.jpg",
      date: "2025-09-18T20:00:00.000+02:00",
      city: "Paris",
      venue: "Théâtre de la Ville",
    },
    {
      slug: "langues-en-scene",
      title: "Langues en scène",
      excerpt: "Performance bilingue FR/DE — le texte se danse, les corps parlent.",
      image: "/about2.jpg",
      date: "2025-10-05T19:30:00.000+02:00",
      city: "Berlin",
      venue: "Sophiensaele",
    },
    {
      slug: "cartographie-des-corps",
      title: "Cartographie des corps",
      excerpt: "Laboratoire public : écrire l’espace par le mouvement.",
      image: "/about3.jpg",
      date: "2025-07-02T18:00:00.000+02:00",
      city: "Bordeaux",
      venue: "TNBA",
    },
    // …
  ]
}

export const metadata = {
  title: "Représentations — La Stela Company",
  description: "Créations, performances et laboratoires — frise chronologique verticale épurée.",
}

export default async function Page() {
  const items = (await getAllRepresentations())
    .slice()
    .sort((a, b) => +new Date(a.date) - +new Date(b.date)) // ordre chronologique

  return (
    <main className="bg-white">
      {/* En-tête sobre centré */}
      <section className="pt-28 pb-8 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light text-black tracking-wide">Représentations</h1>
          <div className="mx-auto w-12 h-px bg-black mt-4 opacity-30" />
        </div>
      </section>

      {/* Timeline droite & centrée */}
      <section className="pb-28 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto">
          <TimelineStraight items={items} />
        </div>
      </section>
    </main>
  )
}
