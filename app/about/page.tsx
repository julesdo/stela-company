// app/a-propos/page.tsx
import Image from "next/image"
import Link from "next/link"
import AboutHero from "@/components/blocks/about-hero"
import AboutTriptych from "@/components/blocks/about-triptych"
import MagneticButton from "@/components/ui/magnetic-button"
import RepresentationsSection from "@/components/blocks/representations-section"
import RepresentationsGridSection from "@/components/blocks/representations-grid-section"

export const metadata = {
  title: "À propos — La Stela Company",
  description:
    "La Stela Company, laboratoire artistique à la croisée du théâtre, de la danse et des langues. Une écriture scénique épurée, sensible et exigeante.",
}

export default function AboutPage() {
  const founder = {
    name: "Stela Elena Stankovic",
    role: "Fondatrice & Directrice Artistique",
    portrait: "/stela.png",
  }

  return (
    <main className="bg-white">
      {/* HERO – plein cadre (vidéo si dispo, sinon image) */}
      <AboutHero
        title="La Stela Company"
        kicker="À PROPOS"
        videoSrc="/hero-video.mp4"
        poster="/dance.jpg"
      />

      {/* Article éditorial (prose) */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
        <div className="max-w-5xl mx-auto">
          <article
            className="
              prose prose-neutral prose-lg md:prose-xl max-w-none
              prose-p:font-light prose-headings:font-light
              prose-a:underline prose-a:underline-offset-4 prose-a:decoration-black/20 hover:prose-a:text-black
            "
          >
            <h2>À propos</h2>
            <p>
              <strong>Stela Elena Stankovic</strong> crée des ponts entre théâtre, danse et langues. Née entre la France,
              l&rsquo;Allemagne et la Serbie, elle puise dans cette richesse multiculturelle l&rsquo;essence de son art.
            </p>
            <p>
              La Stela Company est un laboratoire artistique où chaque discipline nourrit les autres, créant des expériences
              qui transcendent les frontières traditionnelles. L&rsquo;écriture scénique se construit à partir du souffle,
              de l&rsquo;adresse et de la présence : un art de la précision au service d&rsquo;une émotion juste.
            </p>

            <h3>Notre Essence</h3>
            <p className="italic">
              «&nbsp;L&rsquo;art véritable naît dans l&rsquo;espace où se rencontrent la technique et l&rsquo;émotion
              pure.&nbsp;»
            </p>
            <p>
              Chaque création naît d&rsquo;une collaboration authentique entre artistes de différents horizons.
              Nous explorons des formes qui brouillent les habitudes : la parole devient geste, le geste devient pensée,
              la musique devient respiration. Une partie de notre travail est visible dans{" "}
              <Link href="/representations">les représentations</Link> et au sein de{" "}
              <Link href="/ateliers">nos ateliers</Link>.
            </p>
            <p>
              Notre mission : concevoir des expériences transformatrices, sobres et exigeantes, qui révèlent
              la beauté de notre humanité commune. «&nbsp;L&rsquo;art n&rsquo;a pas de frontières, il unit les âmes
              par-delà les mots.&nbsp;»
            </p>
          </article>
        </div>
      </section>

      {/* Triptyque Danse / Théâtre / Langues (ultra sobre) */}
      <AboutTriptych
        items={[
          {
            title: "Danse",
            text: "Le corps comme langage universel, exprimant ce que les mots ne peuvent dire.",
            image: "/dance.jpg",
          },
          {
            title: "Théâtre",
            text: "L’art de l’incarnation, donnant vie aux émotions et aux récits humains.",
            image: "/theatre.jpg",
          },
          {
            title: "Langues",
            text: "Des ponts sonores entre les cultures, révélant la beauté de la diversité.",
            image: "/language.jpg",
          },
        ]}
      />
      <RepresentationsGridSection/>
    </main>
  )
}
