// app/equipe/[slug]/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AnimatedBlock } from "./parts/animated-block"
import { JSX } from "react"

// --- Types minimalistes ---
type Fact = { label: string; value: string | JSX.Element }
type Socials = { website?: string; instagram?: string; linkedin?: string; x?: string; email?: string }
type GalleryItem = {
  src: string
  alt: string
  ratio?: "portrait" | "square" | "landscape" // contrôle visuel sobre
}

export type TeamMemberArticle = {
  slug: string
  name: string
  role: string
  portrait: string
  article: string[]     // paragraphes HTML (liens inline autorisés)
  facts?: Fact[]        // quelques éléments de bio pour la colonne
  socials?: Socials     // signature en bas de la colonne
  gallery?: GalleryItem[] // NOUVEAU — galerie finale
}

// --- Data (remplace par ton fetch CMS) ---
async function getMemberBySlug(slug: string): Promise<TeamMemberArticle | null> {
  const mock: TeamMemberArticle[] = [
    {
      slug: "stela-elena-stankovic",
      name: "Stela Elena Stankovic",
      role: "Fondatrice & direction artistique",
      portrait: "/stela.webp",
      article: [
        `Artiste pluridisciplinaire, Stela développe une pratique qui relie théâtre, danse, musique et langues. Sa recherche porte sur le souffle, l’adresse et la présence, dans une écriture scénique qui cherche l’évidence plutôt que l’effet.`,
        `Formée entre la France et l’Allemagne, elle conçoit des pièces où le texte devient mouvement et le geste, matière de pensée. Une partie de son travail est visible dans <a href="/representations" class="underline underline-offset-4 decoration-black/20 hover:text-black">les représentations</a> et les <a href="/ateliers" class="underline underline-offset-4 decoration-black/20 hover:text-black">ateliers</a>.`,
        `Elle collabore régulièrement avec des musicien·ne·s et des chercheur·se·s, attentive aux liens entre voix, rythme et adresse. Les projets en cours sont annoncés sur l’<a href="/agenda" class="underline underline-offset-4 decoration-black/20 hover:text-black">agenda</a>.`,
        `Parallèlement, elle transmet une pédagogie où la langue se “met en scène” : diction, respiration, écoute, silence — avec une attention particulière portée à la qualité de présence du groupe.`,
      ],
      facts: [
        { label: "Ville", value: "Paris" },
        { label: "Langues", value: "FR · DE · EN" },
        { label: "Axes", value: "Souffle, adresse, présence" },
        { label: "Découvrir", value: <Link href="/representations" className="underline underline-offset-4 decoration-black/20 hover:text-black">Représentations</Link> },
      ],
      socials: { website: "https://exemple.com", instagram: "https://instagram.com/" },
      gallery: [
        { src: "/about1.jpg", alt: "Répétitions", ratio: "portrait" },
        { src: "/about2.jpg", alt: "Sur scène", ratio: "landscape" },
        { src: "/about3.jpg", alt: "Étude de mouvement", ratio: "square" },
        { src: "/about2.jpg", alt: "Travail voix & souffle", ratio: "portrait" },
        { src: "/about1.jpg", alt: "Avant-scène", ratio: "landscape" },
        { src: "/about3.jpg", alt: "Studio", ratio: "square" },
      ],
    },
  ]
  return mock.find(m => m.slug === slug) ?? null
}

// --- SEO ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const m = await getMemberBySlug(params.slug)
  if (!m) return {}
  const description = m.article.join(" ").slice(0, 160)
  return {
    title: `${m.name} — Équipe`,
    description,
    openGraph: { title: `${m.name} — Équipe`, description, images: m.portrait ? [{ url: m.portrait }] : undefined },
    alternates: { canonical: `/equipe/${m.slug}` },
  }
}

// helper ratio → aspect class
function ratioClass(r?: GalleryItem["ratio"]) {
  switch (r) {
    case "portrait":
      return "aspect-[3/4]"
    case "square":
      return "aspect-square"
    case "landscape":
    default:
      return "aspect-[4/3]"
  }
}

// --- Page article épurée + galerie finale ---
export default async function MemberPage({ params }: { params: { slug: string } }) {
  const m = await getMemberBySlug(params.slug)
  if (!m) return notFound()

  // JSON-LD minimal
  const sameAs = [m.socials?.website, m.socials?.instagram, m.socials?.linkedin, m.socials?.x].filter(Boolean) as string[]
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: m.name, jobTitle: m.role, image: m.portrait, sameAs }

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

{/* HERO portrait plein cadre (même ADN que la page représentation) */}
<section className="px-0 pb-12">
  <div className="relative w-full h-[58vh] md:h-[68vh]">
    <Image
      src={m.portrait}
      alt={m.name}
      fill
      sizes="100vw"
      className="object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:grayscale-0"
      priority
    />
    {/* voile pour la lisibilité du texte */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

    {/* Nom + rôle en overlay bas-gauche */}
    <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:pr-20 pb-8 md:pb-10">
      <AnimatedBlock>
        <p className="text-white/80 text-sm md:text-base">{m.role}</p>
        <h1 className="mt-1 text-white font-light leading-[1.05] text-3xl md:text-5xl lg:text-6xl">
          {m.name}
        </h1>
      </AnimatedBlock>
    </div>
  </div>
</section>




      {/* Layout article + colonne de faits (sans boîtes) */}
      <section className="px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Article (prose) */}
          <div className="lg:col-span-7">
            <AnimatedBlock delay={0.06}>
              <article
                className="
                  prose prose-neutral prose-lg max-w-none
                  prose-a:underline prose-a:underline-offset-4 prose-a:decoration-black/20 hover:prose-a:text-black
                  prose-p:font-light prose-headings:font-light
                "
              >
                {m.article.map((html, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
                ))}
              </article>
            </AnimatedBlock>
          </div>

          {/* Colonne bio simple, sticky, sans cadres/bordures */}
          <div className="lg:col-span-5">
            <AnimatedBlock delay={0.08}>
              <div className="lg:sticky lg:top-28 space-y-4 text-[15px] md:text-base leading-relaxed text-black/75">
                {m.facts?.map((f, i) => (
                  <div key={i}>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">{f.label}</div>
                    <div className="mt-1 text-black/80">{f.value}</div>
                  </div>
                ))}

                {(m.socials?.website || m.socials?.instagram || m.socials?.linkedin || m.socials?.x || m.socials?.email) && (
                  <div className="pt-2 text-[12px] text-black/55">
                    {m.socials?.website && <Link href={m.socials.website} className="underline underline-offset-4 decoration-black/20 hover:text-black">site</Link>}
                    {m.socials?.instagram && <> · <Link href={m.socials.instagram} className="underline underline-offset-4 decoration-black/20 hover:text-black">instagram</Link></>}
                    {m.socials?.linkedin && <> · <Link href={m.socials.linkedin} className="underline underline-offset-4 decoration-black/20 hover:text-black">linkedin</Link></>}
                    {m.socials?.x && <> · <Link href={m.socials.x} className="underline underline-offset-4 decoration-black/20 hover:text-black">x</Link></>}
                    {m.socials?.email && <> · <a href={`mailto:${m.socials.email}`} className="underline underline-offset-4 decoration-black/20 hover:text-black">email</a></>}
                  </div>
                )}
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </section>

    {/* ——— GALERIE ULTRA SIMPLE (sans fioriture) ——— */}
{m.gallery?.length ? (
  <section className="px-6 md:px-12 lg:pr-20">
    <div className="max-w-7xl mx-auto mt-12">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {m.gallery.map((g, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={g.src}
              alt={g.alt || m.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-all hover:scale-110 duration-500"
              priority={i < 3}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
) : null}


      {/* Retour minimal */}
      <section className="pb-24 px-6 md:px-12 lg:pr-20">
        <div className="max-w-5xl mx-auto">
          <Link href="/equipe" className="text-xs text-black/50 hover:text-black transition">retour à l’équipe →</Link>
        </div>
      </section>
    </main>
  )
}

// (Optionnel) SSG
export async function generateStaticParams() {
  return [{ slug: "stela-elena-stankovic" }]
}
