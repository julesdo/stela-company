// app/contact/page.tsx
import Link from "next/link"
import ContactRoutes from "@/components/blocks/contact-routes"

export const metadata = {
  title: "Contact — La Stela Company",
  description:
    "Partageons nos visions artistiques. Écrivez-nous pour un projet de représentation, nos cours et ateliers, ou une collaboration.",
}

export default function ContactPage() {
  const email = "hello@lastelacompany.com"
  const phone = "+33123456789"

  // JSON-LD (contact)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "La Stela Company",
    url: "https://lastelacompany.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "general",
        email,
        telephone: "+33 1 23 45 67 89",
        areaServed: ["FR", "DE", "RS"],
        availableLanguage: ["fr", "de", "en"],
      },
    ],
  }

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* En-tête simple */}
      <section className="pt-28 pb-8 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-light text-black tracking-wide">Contact</h1>
          <div className="w-12 h-px bg-black mt-4 opacity-30" />
          <p className="mt-6 text-[17px] md:text-[18px] text-black/75 max-w-2xl leading-relaxed">
            Partageons nos visions artistiques. Chaque conversation est le début d&apos;une possible création.
          </p>
        </div>
      </section>

      {/* Coordonnées très sobres (sans boîtes) */}
      <section className="pb-10 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h2 className="text-sm tracking-wider uppercase text-black/50">Email</h2>
            <p className="mt-2">
              <a
                href={`mailto:${email}`}
                className="underline underline-offset-4 decoration-black/20 hover:text-black"
              >
                {email}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-sm tracking-wider uppercase text-black/50">Téléphone</h2>
            <p className="mt-2">
              <a
                href={`tel:${phone}`}
                className="underline underline-offset-4 decoration-black/20 hover:text-black"
              >
                +33&nbsp;1&nbsp;23&nbsp;45&nbsp;67&nbsp;89
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-sm tracking-wider uppercase text-black/50">Adresse</h2>
            <p className="mt-2 text-black/80">Paris • Berlin • Belgrade</p>
          </div>
        </div>
      </section>

      {/* SECTION RÉUTILISABLE : split gauche/droite (cours / programmation) */}
      <section className="pb-28 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm tracking-wider uppercase text-black/50 mb-4">
            Choisissez votre voie
          </p>

          <ContactRoutes
            left={{
              title: "Rejoindre la Compagnie",
              subtitle: "Cours, ateliers, entraînements et laboratoires artistiques.",
              bullets: [
                "Parcours : initiation → avancé",
                "Axes : danse contemporaine, théâtre physique, voix & langues",
                "Formats : workshops, régulier, intensifs",
                "Villes : Paris, Berlin, Belgrade",
              ],
              primary: { label: "Demander à rejoindre", href: "mailto:hello@lastelacompany.com?subject=Rejoindre%20la%20Compagnie" },
              secondary: { label: "En savoir plus", href: "/ateliers" },
              bg: { src: "/dance.jpg", alt: "Cours & ateliers" },
            }}
            right={{
              title: "Programmer une Représentation",
              subtitle: "Institutions, théâtres, festivals, associations.",
              bullets: [
                "Dossier artistique & fiche technique sur demande",
                "Tournées France/Europe — FR/DE/EN",
                "Actions culturelles liées aux pièces",
              ],
              primary: { label: "Proposer une date", href: "mailto:hello@lastelacompany.com?subject=Programmation" },
              secondary: { label: "Informations techniques", href: "/representations" },
              bg: { src: "/theatre.jpg", alt: "Programmation & tournée" },
            }}
          />
        </div>
      </section>
    </main>
  )
}
