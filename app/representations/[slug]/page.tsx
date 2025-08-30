// app/representations/[slug]/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AnimatedBlock } from "./parts/animated-block"

// ---------- Types ----------
type Credit = { role: string; name: string }
type GalleryItem = { src: string; alt: string }
type Partner = { name: string; logo: string; url?: string }

export type RepresentationDetail = {
  slug: string
  title: string
  subtitle?: string
  article: string[]          // paragraphes HTML autorisés pour liens inline
  hero: string
  city: string
  venue?: string
  address?: string
  date: string               // ISO
  endDate?: string
  duration?: string
  languages?: string
  age?: string
  accessibility?: string
  bookingUrl?: string
  credits?: Credit[]
  gallery?: GalleryItem[]
  partners?: Partner[]
}

// ---------- Mock data (remplace par ton CMS) ----------
async function getRepresentationBySlug(slug: string): Promise<RepresentationDetail | null> {
  const all = await getAllRepresentations()
  return all.find(r => r.slug === slug) ?? null
}

async function getAllRepresentations(): Promise<RepresentationDetail[]> {
  return [
    {
      slug: "medee-acte-1",
      title: "Médée — Acte I",
      subtitle: "Création chorégraphique & vocale",
      article: [
        `Entre souffle et geste, la langue s’incarne. Le corps devient partition, le silence un contre-chant. Une traversée sensible où l’on marche à rebours des évidences pour retrouver l’émotion première.`,
        `Formée entre plusieurs scènes européennes, l’équipe explore la friction du texte et du mouvement : la parole se plie, se suspend, s’adresse. Certaines étapes ont été partagées en studio ; la version actuelle est présentée au <a href="/agenda" class="underline underline-offset-4 decoration-black/20 hover:text-black">calendrier</a>.`,
        `La musique, pensée comme respiration, sculpte l’espace et laisse apparaître des seuils. Les interprètes déplacent l’écoute, ouvrent des interstices d’attention. On peut prolonger l’expérience lors des <a href="/ateliers" class="underline underline-offset-4 decoration-black/20 hover:text-black">ateliers</a> publics.`,
        `Le projet se déploie avec des partenaires fidèles, en dialogue avec des musées, des théâtres et des lieux de recherche. Les prochaines étapes seront annoncées sur l’<a href="/agenda" class="underline underline-offset-4 decoration-black/20 hover:text-black">agenda</a>.`,
      ],
      hero: "/about1.jpg",
      city: "Paris",
      venue: "Théâtre de la Ville",
      address: "2 Pl. du Châtelet, 75004 Paris",
      date: "2025-09-18T20:00:00.000Z",
      duration: "1h15",
      languages: "FR / DE",
      age: "Dès 12 ans",
      accessibility: "Accessible PMR",
      bookingUrl: "/agenda/medee-acte-1",
      credits: [
        { role: "Conception & mise en scène", name: "Stela Elena Stankovic" },
        { role: "Interprétation", name: "Collectif La Stela Company" },
        { role: "Création sonore", name: "N. Dupont" },
        { role: "Lumières", name: "A. Müller" },
      ],
      gallery: [
        { src: "/about1.jpg", alt: "Médée — répétitions" },
        { src: "/about2.jpg", alt: "Médée — représentation" },
        { src: "/about3.jpg", alt: "Médée — coulisses" },
      ],
      partners: [
        { name: "Théâtre de la Ville", logo: "/logos/tdlv.png", url: "https://theatredelaville-paris.com" },
        { name: "Institut culturel", logo: "/logos/institut.webp" },
        { name: "Fondation X", logo: "/logos/fondationx.png", url: "https://exemple.com" },
      ],
    },
    {
      slug: "langues-en-scene",
      title: "Langues en scène",
      subtitle: "Performance bilingue FR/DE",
      article: [
        `Le texte se danse, les corps prennent la parole. Une recherche sur l’adresse et la traduction “en scène”.`,
      ],
      hero: "/about2.jpg",
      city: "Berlin",
      venue: "Sophiensaele",
      date: "2025-10-05T19:30:00.000Z",
    },
    {
      slug: "cartographie-des-corps",
      title: "Cartographie des corps",
      subtitle: "Laboratoire public",
      article: [
        `Écrire l’espace par le mouvement, tracer des ponts sensibles entre voix et geste.`,
      ],
      hero: "/about3.jpg",
      city: "Bordeaux",
      venue: "TNBA",
      date: "2025-07-02T18:00:00.000Z",
    },
  ]
}

// ---------- Metadata ----------
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getRepresentationBySlug(params.slug)
  if (!data) return {}
  const description = data.article.join(" ").slice(0, 160)
  return {
    title: `${data.title} — Représentations`,
    description,
    openGraph: { title: `${data.title} — Représentations`, description, images: data.hero ? [{ url: data.hero }] : undefined },
    alternates: { canonical: `/representations/${data.slug}` },
  }
}

// ---------- Page ----------
export default async function RepresentationPage({ params }: { params: { slug: string } }) {
  const data = await getRepresentationBySlug(params.slug)
  if (!data) return notFound()
  const all = await getAllRepresentations()
  const suggestions = all.filter(r => r.slug !== data.slug).slice(0, 3)

  const start = new Date(data.date)
  const fmtLong = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(start)

  // JSON-LD Event (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: data.title,
    description: data.article.join(" "),
    startDate: data.date,
    endDate: data.endDate || undefined,
    image: data.hero ? [data.hero] : undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: data.venue || data.city, address: data.address || data.city },
    organizer: { "@type": "Organization", name: "La Stela Company" },
  }

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO plein cadre (aucune box) */}
      <section className="px-0">
        <div className="relative w-full h-[58vh] md:h-[68vh]">
          <Image
            src={data.hero}
            alt={data.title}
            fill
            sizes="100vw"
            className="object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:grayscale-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:pr-20 pb-8 md:pb-10">
            <AnimatedBlock enter>
              <h1 className="text-white font-light leading-[1.05] text-3xl md:text-5xl lg:text-6xl">{data.title}</h1>
              {data.subtitle && <p className="mt-2 text-white/85 text-lg md:text-xl font-light">{data.subtitle}</p>}
              <p className="mt-4 text-white/80 text-sm md:text-base">
                <time dateTime={data.date}>{fmtLong}</time>{" — "}{data.city}{data.venue ? ` • ${data.venue}` : ""}
              </p>
            </AnimatedBlock>
          </div>
        </div>
      </section>

      {/* ARTICLE + COLONNE FAITS (prose, sans boîtes) */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Article long */}
          <div className="lg:col-span-7">
            <AnimatedBlock enter delay={0.05}>
              <article className="
                prose prose-neutral prose-lg max-w-none
                prose-p:font-light prose-headings:font-light
                prose-a:underline prose-a:underline-offset-4 prose-a:decoration-black/20 hover:prose-a:text-black
              ">
                {data.article.map((html, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
                ))}
              </article>
            </AnimatedBlock>
          </div>

          {/* Faits discrets, sticky */}
          <div className="lg:col-span-5">
            <AnimatedBlock enter delay={0.08}>
              <div className="lg:sticky lg:top-28 space-y-4 text-[15px] md:text-base leading-relaxed text-black/75">
                {data.duration && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Durée</div>
                    <div className="mt-1 text-black/85">{data.duration}</div>
                  </div>
                )}
                {data.languages && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Langues</div>
                    <div className="mt-1 text-black/85">{data.languages}</div>
                  </div>
                )}
                {data.age && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Âge conseillé</div>
                    <div className="mt-1 text-black/85">{data.age}</div>
                  </div>
                )}
                {data.accessibility && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Accessibilité</div>
                    <div className="mt-1 text-black/85">{data.accessibility}</div>
                  </div>
                )}
                {data.address && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Adresse</div>
                    <div className="mt-1 text-black/85">{data.address}</div>
                  </div>
                )}

                {data.bookingUrl && (
                  <div className="pt-2 text-[12px]">
                    <Link href={data.bookingUrl} className="underline underline-offset-4 decoration-black/20 text-black/60 hover:text-black">
                      Billetterie
                    </Link>
                  </div>
                )}
              </div>
            </AnimatedBlock>

            {/* Crédits (texte nu) */}
            {data.credits?.length ? (
              <AnimatedBlock enter delay={0.1}>
                <ul className="mt-8 space-y-2 text-sm text-black/80">
                  {data.credits.map((c, i) => (
                    <li key={i} className="flex flex-wrap gap-2">
                      <span className="text-black/55">{c.role}</span>
                      <span>—</span>
                      <span className="font-light">{c.name}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedBlock>
            ) : null}
          </div>
        </div>
      </section>

      {/* Galerie ultra simple (facultative) */}
      {data.gallery?.length ? (
        <section className="px-6 md:px-12 lg:pr-20">
          <div className="max-w-7xl mx-auto mt-6 md:mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {data.gallery.map((g, i) => (
                <div key={i} className="relative aspect-[4/3]">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    priority={i < 3}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Suggestions (autres représentations) — sans “cards” */}
      {suggestions.length ? (
        <section className="pt-20 px-6 md:px-12 lg:pr-20">
          <div className="max-w-7xl mx-auto">
            <AnimatedBlock enter>
              <h2 className="text-sm tracking-wider uppercase text-black/50">À découvrir</h2>
            </AnimatedBlock>
            <AnimatedBlock enter delay={0.04}>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {suggestions.map(s => (
                  <Link key={s.slug} href={`/representations/${s.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={s.hero}
                        alt={s.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.01]"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/45 via-black/10 to-transparent">
                        <div className="text-white font-light leading-tight">{s.title}</div>
                        {s.subtitle && <div className="text-white/80 text-sm mt-1">{s.subtitle}</div>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedBlock>
          </div>
        </section>
      ) : null}

      {/* Partenaires — logos sobres, sans cadres */}
      {data.partners?.length ? (
        <section className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
          <div className="max-w-7xl mx-auto">
            <AnimatedBlock enter>
              <h2 className="text-sm tracking-wider uppercase text-black/50">Partenaires</h2>
            </AnimatedBlock>
            <AnimatedBlock enter delay={0.04}>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 items-center">
                {data.partners.map((p, i) => {
                  const Logo = (
                    <div className="relative w-full h-10 md:h-12">
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
                    <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                      {Logo}
                    </a>
                  ) : (
                    <div key={i} className="group">{Logo}</div>
                  )
                })}
              </div>
            </AnimatedBlock>
          </div>
        </section>
      ) : null}

      {/* Retour minimal */}
      <section className="pb-24 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto text-right">
          <Link href="/representations" className="text-xs text-black/50 hover:text-black transition">
            retour aux représentations →
          </Link>
        </div>
      </section>
    </main>
  )
}

// (Optionnel) SSG
export async function generateStaticParams() {
  const all = await getAllRepresentations()
  return all.map(r => ({ slug: r.slug }))
}
