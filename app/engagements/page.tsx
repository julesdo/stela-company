// app/engagements/page.tsx
import Image from "next/image"
import Link from "next/link"
import EngagementChecklist from "@/components/blocks/engagement-checklist"
import MagneticButton from "@/components/ui/magnetic-button"
import ContactRoutes from "@/components/blocks/contact-routes"

export const metadata = {
  title: "Engagements — La Stela Company",
  description:
    "Inclusion, écologie, transmission : une pratique artistique sobre et exigeante, attentive au vivant et aux publics.",
}

export default function EngagementsPage() {
  const checklist = [
    {
      title: "Accessibilité & hospitalité",
      text:
        "Accueil soigné, informations claires, salles accessibles PMR lorsque possible. Médiations adaptées (introduction, lexique, temps d’échange).",
    },
    {
      title: "Prix solidaires",
      text:
        "Tarifs modulés en fonction des revenus, invitations partenaires, séances gratuites en milieu scolaire ou associatif.",
    },
    {
      title: "Sobriété des moyens",
      text:
        "Scénographies légères, réemploi, éclairages optimisés. Priorité à l’essentiel : corps, voix, espace.",
    },
    {
      title: "Mobilité raisonnée",
      text:
        "Privilège du train, mutualisation des trajets, tournées regroupées pour limiter l’empreinte carbone.",
    },
    {
      title: "Diversité linguistique",
      text:
        "Traductions sobres (surtitres, versions bilingues), ateliers de langage scénique, respect des accents et des voix.",
    },
    {
      title: "Espace sûr",
      text:
        "Cadre de travail clair, consentement au plateau, dispositifs de prévention (contact référent) et écoute active.",
    },
    {
      title: "Partage des processus",
      text:
        "Sorties de résidence, répétitions ouvertes, documentation simple. La recherche se partage autant que la pièce.",
    },
    {
      title: "Rémunérations justes",
      text:
        "Grilles transparentes, temps de préparation reconnu, attention aux conditions de répétition.",
    },
  ]

  return (
    <main className="bg-white">
      {/* HERO plein cadre (vidéo si dispo) */}
      <section className="px-0">
        <div className="relative w-full h-[60vh] md:h-[74vh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/theatre.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/60 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:pr-20 pb-10 md:pb-16">
            <p className="text-sm tracking-wider uppercase text-black/55">La Stela Company</p>
            <h1 className="mt-2 text-4xl md:text-6xl lg:text-7xl font-light text-black leading-[1.05]">
              Engagements
            </h1>
          </div>
        </div>
      </section>

      {/* Prose — vision & posture */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
        <div className="max-w-5xl mx-auto">
          <article
            className="
              prose prose-neutral prose-lg md:prose-xl max-w-none
              prose-p:font-light prose-headings:font-light
              prose-a:underline prose-a:underline-offset-4 prose-a:decoration-black/20 hover:prose-a:text-black
            "
          >
            <p>
              Créer sobrement : garder l’essentiel, le vivant, l’attention portée aux publics. Nos pièces
              naissent de la rencontre entre danse, théâtre et langues ; elles cherchent la précision plus que
              l’effet, la clarté plus que l’ornement.
            </p>
            <p>
              Cette exigence est indissociable d’une responsabilité : conditions de travail, accessibilité, écologie
              de production, médiations justes. L’atelier, la répétition, la représentation — même soin, même
              écoute.
            </p>
          </article>
        </div>
      </section>

      {/* Trois piliers (ultra sobres, sans boîtes) */}
      <section className="pb-10 md:pb-14 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 md:gap-12">
          {[
            {
              t: "Inclusion",
              d: "Hospitalité des lieux, diversité des voix, outils de traduction sobres. La scène comme espace commun.",
              img: "/language.jpg",
            },
            {
              t: "Écologie",
              d: "Sobriété des moyens, réemploi, tournées et résidences pensées au plus juste. Le geste compte.",
              img: "/dance.jpg",
            },
            {
              t: "Transmission",
              d: "Ateliers, rencontres, documentation simple. Partager des outils : souffle, adresse, présence.",
              img: "/theatre.jpg",
            },
          ].map((p, i) => (
            <article key={i} className="group relative overflow-hidden">
              <div className="relative w-full aspect-[3/4] md:aspect-[4/5]">
                <Image
                  src={p.img}
                  alt={p.t}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover grayscale transition-all duration-[900ms] ease-out group-hover:grayscale-0 group-hover:scale-[1.015]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <h3 className="text-white text-2xl md:text-3xl font-light leading-tight">{p.t}</h3>
                  <p className="mt-2 text-white/85 text-sm md:text-base max-w-sm">{p.d}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Checklist verticale — pratiques concrètes */}
      <section className="pt-6 pb-20 md:pb-24 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto">
          <EngagementChecklist items={checklist} />
        </div>
      </section>

      {/* Partenaires / chartes — logos sobres */}
      <section className="py-10 md:py-14 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold tracking-wider uppercase text-black">Chartes & partenaires</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 items-center">
            {[
              { name: "Théâtre partenaire", logo: "/logos/tdlv.png", url: "https://theatredelaville-paris.com" },
              { name: "Institut culturel", logo: "/logos/institut.webp" },
              { name: "Fondation X", logo: "/logos/fondationx.png", url: "https://exemple.com" },
            ].map((p, i) => {
              const Logo = (
                <div className="group relative w-full h-10 md:h-16">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1024px) 25vw, 200px"
                    className="object-contain grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
              )
              return p.url ? (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                  {Logo}
                </a>
              ) : (
                <div key={i}>{Logo}</div>
              )
            })}
          </div>
        </div>
      </section>

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
    </main>
  )
}
