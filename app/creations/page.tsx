// app/creations/page.tsx
import Image from "next/image"
import Link from "next/link"
import CreationProcess, { ProcessStep } from "@/components/blocks/creation-process"
import MagneticButton from "@/components/ui/magnetic-button"
import RepresentationsGridSection from "@/components/blocks/representations-grid-section"

export const metadata = {
  title: "Créations — La Stela Company",
  description:
    "Comment naissent nos pièces : souffle, adresse, présence. De la recherche à la scène, un processus sobre et exigeant.",
}

export default function CreationsPage() {
  const steps: ProcessStep[] = [
    {
      title: "Écoute & Récolte",
      text:
        "Rencontres, lectures, archives. On collecte des matières : voix, gestes, situations. L’objectif : une intuition claire plus qu’un thème large.",
    },
    {
      title: "Laboratoire",
      text:
        "En studio : souffle, adresse, présence. On teste des états, des partitions courtes. La forme reste ouverte, on garde la simplicité.",
    },
    {
      title: "Écriture scénique",
      text:
        "Mise en relation des fragments. Le texte se dépose dans le corps, le geste se pense comme phrase. On cherche la bonne distance au public.",
    },
    {
      title: "Partage public",
      text:
        "Sorties de résidence, rencontres. L’écoute se déplace, on ajuste rythmes et silences. Pas d’effet : de la justesse.",
    },
    {
      title: "Affinage",
      text:
        "On taille dans la masse. Couper, déplacer, respirer. Ne garder que ce qui tient debout par sa nécessité.",
    },
    {
      title: "Tournée & Transmission",
      text:
        "La pièce vit et se transforme. Ateliers liés à la création : corps, voix, langues — une même grammaire, partagée.",
    },
  ]

  return (
    <main className="bg-white">
      {/* HERO — vidéo si dispo, sinon image */}
      <section className="px-0">
        <div className="relative w-full h-[64vh] md:h-[76vh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/dance.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/60 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:pr-20 pb-10 md:pb-16">
            <p className="text-sm tracking-wider uppercase text-black/55">La Stela Company</p>
            <h1 className="mt-2 text-4xl md:text-6xl lg:text-7xl font-light text-black leading-[1.05]">Créations</h1>
          </div>
        </div>
      </section>

      {/* Prose — vision */}
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
              Nos pièces naissent d’un travail d’<em>écoute</em> : matières, voix, gestes. La grammaire est simple —
              souffle, adresse, présence — pour atteindre une émotion nette, sans effets superflus.
            </p>
            <p>
              Entre danse, théâtre et langues, nous cherchons une précision vivante : le texte se met en mouvement, le
              geste devient pensée. Un laboratoire, puis une écriture scénique, ajustée au contact du public.
            </p>
            <p>
              Ici, l’épure n’est pas un style : c’est une éthique. Ne garder que ce qui est nécessaire. Le reste glisse.
              Une partie de ces recherches se prolonge dans nos{" "}
              <Link href="/ateliers">ateliers</Link> et se partage lors des{" "}
              <Link href="/agenda">sorties publiques</Link>.
            </p>
          </article>
        </div>
      </section>

      {/* Frise verticale — processus de création (droite, fine, élégante) */}
      <section className="pb-8 md:pb-10 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto">
          <CreationProcess steps={steps} />
        </div>
      </section>

      {/* Principes (3 points) */}
      <section className="pt-8 pb-20 md:pb-24 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 md:gap-12">
          {[
            { t: "Souffle", d: "Le rythme du corps comme structure musicale : appuis, silences, reprises." },
            { t: "Adresse", d: "Parler au regard, ajuster la distance, laisser le sens apparaître." },
            { t: "Présence", d: "Économie de moyens, densité du geste : tenir l’espace sans l’encombrer." },
          ].map((it, i) => (
            <div key={i}>
              <h3 className="text-2xl md:text-3xl font-light text-black leading-tight">{it.t}</h3>
              <p className="mt-3 text-[16px] md:text-[17px] text-black/80 leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA discrets */}
      <RepresentationsGridSection/>
    </main>
  )
}
