// app/ateliers/page.tsx
import AteliersList, { AtelierListItem } from "@/components/blocks/ateliers-list"

export const metadata = {
  title: "Ateliers — La Stela Company",
  description:
    "Ateliers sobres et exigeants : enfants, adultes — Corps, voix, adresse. Une écriture scénique qui relie danse, théâtre et langues.",
}

// Mock (remplace par ton CMS)
async function getAteliers(): Promise<AtelierListItem[]> {
  return [
    {
      slug: "enfants-danse-theatre",
      theme: "Cours pour les enfants",
      title: "Éveil — Danse & Théâtre",
      excerpt:
        "Jeu, rythme, écoute : un espace sensible pour découvrir le mouvement et la parole. Le corps devient langage, la scène un terrain d’exploration.",
      details: "Mercredi 15:00–16:30 • Paris 11e",
      image: "/kids.jpg",
    },
    {
      slug: "adultes-barre-asymetrique",
      theme: "Cours pour adulte 2",
      title: "Barre de danse — Force & fluidité",
      excerpt:
        "Travail technique et placement : appuis, coordination et amplitude. Enchaînements progressifs pour une présence sûre, précise et élégante.",
      details: "Jeudi 20:00–22:00 • Paris",
      image: "/adult1.webp",
    },
    {
      slug: "adultes-corps-voix",
      theme: "Cours pour adulte 1",
      title: "Corps & Voix — Présence scénique",
      excerpt:
        "Respiration, adresse, précision du geste. Le texte se met en mouvement, la voix se pose : travail de souffle, rythme et écoute du groupe.",
      details: "Lundi 19:00–20:30 • Paris",
      image: "/about2.jpg",
    },
  ]
}

export default async function Page() {
  const items = await getAteliers()

  return (
    <main className="bg-white">
      {/* En-tête sobre centré */}
      <section className="pt-28 pb-8 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light text-black tracking-wide">Ateliers</h1>
          <div className="mx-auto w-12 h-px bg-black mt-4 opacity-30" />
        </div>
      </section>

      {/* Liste : une ligne par atelier, pleine largeur */}
      <section className="pb-28 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto">
          <AteliersList items={items} />
        </div>
      </section>
    </main>
  )
}
