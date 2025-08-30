// app/ateliers/[slug]/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AnimatedBlock } from "./parts/animated-block"

// ---------------- Types ----------------
type Session = { start: string; end?: string; city?: string; venue?: string; address?: string }
type Instructor = { name: string; role?: string; photo?: string }

export type AtelierDetail = {
  slug: string
  title: string
  discipline: "Danse" | "Théâtre" | "Langues"
  level?: "Débutant" | "Intermédiaire" | "Avancé" | "Tous niveaux"
  duration?: string
  cadence?: string
  dayTime?: string
  language?: string
  capacity?: string
  priceInfo?: string
  image: string            // utilisé comme HERO plein cadre
  description: string
  objectives?: string[]
  program?: string[]
  prerequisites?: string[]
  materials?: string[]
  instructors?: Instructor[]
  sessions?: Session[]
  registerUrl?: string
}

// ------------- Fetch (remplace par ton CMS) -------------
async function getAtelierBySlug(slug: string): Promise<AtelierDetail | null> {
  const mock: AtelierDetail[] = [
    {
      slug: "adultes-barre-asymetrique",
      title: "Barre de danse — Force & fluidité",
      discipline: "Danse",
      level: "Tous niveaux",
      duration: "2h",
      cadence: "Hebdomadaire",
      dayTime: "Jeudi 20:00–22:00",
      language: "FR",
      capacity: "14 pers.",
      priceInfo: "Séance d’essai possible",
      image: "/adult1.webp",
      description:
        "Travail technique et placement : appuis, coordination, amplitude. À partir d’une barre au sol et d’exercices en centre, on consolide l’alignement, on affine le dessin du mouvement et on installe une présence sûre, précise et élégante. Progression claire, écoute du souffle et musicalité du geste.",
      objectives: [
        "Renforcer appuis, gainage et stabilité",
        "Affiner coordination, amplitude et qualité de ligne",
        "Installer une respiration fluide au service du mouvement",
        "Développer une présence scénique sobre et précise"
      ],
      program: [
        "Barre au sol : ancrage, respiration, placement bassin/colonne",
        "Barre debout : pliés, dégagés, adages, équilibres",
        "Centre : enchaînements progressifs, tours simples, déplacements",
        "Étirements & retour au calme (soin des appuis, souffle)"
      ],
      prerequisites: ["Aucun prérequis indispensable — curiosité et régularité recommandées"],
      materials: ["Tenue souple, chaussettes/chaussons, bouteille d’eau"],
      instructors: [
        { name: "Stela Elena Stankovic", role: "Encadrement & conception", photo: "/stela.png" }
      ],
      sessions: [
        {
          start: "2025-10-02T20:00:00.000+02:00",
          end: "2025-10-02T22:00:00.000+02:00",
          city: "Paris",
          venue: "Studio B",
          address: "Rue Exemple, 75011 Paris"
        },
        {
          start: "2025-10-09T20:00:00.000+02:00",
          end: "2025-10-09T22:00:00.000+02:00",
          city: "Paris",
          venue: "Studio B",
          address: "Rue Exemple, 75011 Paris"
        }
      ],
      registerUrl: "/inscription/adultes-barre-asymetrique"
    }
    
  ]
  return mock.find(a => a.slug === slug) ?? null
}

// ------------- Helpers -------------
const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso))

// ------------- Metadata -------------
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = await getAtelierBySlug(params.slug)
  if (!a) return {}
  const title = `${a.title} — Ateliers`
  const description = a.description.slice(0, 160)
  return {
    title,
    description,
    openGraph: { title, description, images: a.image ? [{ url: a.image }] : undefined },
    alternates: { canonical: `/ateliers/${a.slug}` },
  }
}

// ------------- Page -------------
export default async function Page({ params }: { params: { slug: string } }) {
  const a = await getAtelierBySlug(params.slug)
  if (!a) return notFound()

  // JSON-LD (Course + instances si planning fourni)
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: a.title,
    description: a.description,
    provider: { "@type": "Organization", name: "La Stela Company" },
    inLanguage: a.language ?? "fr",
    audience: a.level ? { "@type": "Audience", audienceType: a.level } : undefined,
    hasCourseInstance: a.sessions?.map(s => ({
      "@type": "CourseInstance",
      courseMode: a.cadence ?? "InPerson",
      startDate: s.start,
      endDate: s.end,
      location: {
        "@type": "Place",
        name: s.venue ?? s.city ?? "Studio",
        address: s.address ?? s.city ?? "Paris",
      },
    })),
  }

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO plein cadre — même grammaire visuelle que les représentations */}
      <section className="px-0">
        <div className="relative w-full h-[58vh] md:h-[68vh]">
          <Image
            src={a.image}
            alt={a.title}
            fill
            sizes="100vw"
            className="object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:grayscale-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:pr-20 pb-8 md:pb-10">
            <AnimatedBlock>
              <h1 className="text-white font-light leading-[1.05] text-3xl md:text-5xl lg:text-6xl">
                {a.title}
              </h1>
              {(a.cadence || a.dayTime || a.duration || a.capacity) && (
                <p className="mt-3 text-white/80 text-sm md:text-base">
                  {[a.cadence, a.dayTime, a.duration, a.capacity].filter(Boolean).join(" • ")}
                </p>
              )}
            </AnimatedBlock>
          </div>
        </div>
      </section>

      {/* ARTICLE + COLONNE INFOS (prose, sans boîtes) */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Article en prose */}
          <div className="lg:col-span-7">
            <AnimatedBlock>
              <article className="
                prose prose-neutral prose-lg max-w-none
                prose-p:font-light prose-headings:font-light
                prose-a:underline prose-a:underline-offset-4 prose-a:decoration-black/20 hover:prose-a:text-black
              ">
                <p>{a.description}</p>

                {a.objectives?.length ? (
                  <>
                    <h3>Ce que nous travaillons</h3>
                    <ul>
                      {a.objectives.map((o, i) => <li key={i}>{o}</li>)}
                    </ul>
                  </>
                ) : null}

                {a.program?.length ? (
                  <>
                    <h3>Déroulé</h3>
                    <ol>
                      {a.program.map((p, i) => <li key={i}>{p}</li>)}
                    </ol>
                  </>
                ) : null}

                {a.prerequisites?.length ? (
                  <>
                    <h3>Prérequis</h3>
                    <ul>
                      {a.prerequisites.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </>
                ) : null}

                {a.materials?.length ? (
                  <>
                    <h3>Matériel</h3>
                    <ul>
                      {a.materials.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </>
                ) : null}
              </article>
            </AnimatedBlock>
          </div>

          {/* Colonne “infos pratiques” sticky — sans cadres */}
          <div className="lg:col-span-5">
            <AnimatedBlock>
              <div className="lg:sticky lg:top-28 space-y-4 text-[15px] md:text-base leading-relaxed text-black/80">
                {a.duration && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Durée</div>
                    <div className="mt-1">{a.duration}</div>
                  </div>
                )}
                {a.cadence && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Cadence</div>
                    <div className="mt-1">{a.cadence}</div>
                  </div>
                )}
                {a.dayTime && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Créneau</div>
                    <div className="mt-1">{a.dayTime}</div>
                  </div>
                )}
                {a.level && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Niveau</div>
                    <div className="mt-1">{a.level}</div>
                  </div>
                )}
                {a.language && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Langue</div>
                    <div className="mt-1">{a.language}</div>
                  </div>
                )}
                {a.capacity && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Capacité</div>
                    <div className="mt-1">{a.capacity}</div>
                  </div>
                )}
                {a.priceInfo && (
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Infos tarif</div>
                    <div className="mt-1">{a.priceInfo}</div>
                  </div>
                )}

                {/* Planning (sessions) */}
                {a.sessions?.length ? (
                  <div className="pt-2">
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Prochaines séances</div>
                    <ul className="mt-2 space-y-2">
                      {a.sessions.map((s, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-black/60" />
                          <div>
                            <div>{fmtDate(s.start)}{s.end ? ` – ${new Intl.DateTimeFormat("fr-FR",{hour:"2-digit",minute:"2-digit"}).format(new Date(s.end))}`:""}</div>
                            {(s.city || s.venue) && (
                              <div className="text-black/60">{[s.venue, s.city].filter(Boolean).join(" • ")}</div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Intervenant·e·s (texte nu) */}
                {a.instructors?.length ? (
                  <div className="pt-2">
                    <div className="text-[12px] uppercase tracking-wider text-black/45">Intervenant·e·s</div>
                    <ul className="mt-2 space-y-1.5 text-black/85">
                      {a.instructors.map((t, i) => (
                        <li key={i} className="flex flex-wrap gap-2">
                          <span className="font-light">{t.name}</span>
                          {t.role && (<><span>—</span><span className="text-black/60">{t.role}</span></>)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Lien discret d’inscription */}
                {a.registerUrl && (
                  <div className="pt-2 text-[12px]">
                    <Link href={a.registerUrl} className="underline underline-offset-4 decoration-black/20 text-black/60 hover:text-black">
                      Demander une place
                    </Link>
                  </div>
                )}
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </section>

      {/* Retour minimal */}
      <section className="pb-24 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto text-right">
          <Link href="/ateliers" className="text-xs text-black/50 hover:text-black transition">
            retour aux ateliers →
          </Link>
        </div>
      </section>
    </main>
  )
}

// (Optionnel) SSG
export async function generateStaticParams() {
  return [{ slug: "atelier-danse-contemporaine" }]
}
