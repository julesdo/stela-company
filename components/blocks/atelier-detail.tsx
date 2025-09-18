"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

type Session = { start?: string; end?: string; city?: string; venue?: string; address?: string }
type Instructor = { name?: string; role?: string; photo?: string }

export const AtelierDetail = ({ data }: { data: any }) => {
  const coverImage: string | undefined = data?.coverImage
  const title: string | undefined = data?.title
  const cadence = data?.cadence
  const dayTime = data?.dayTime
  const duration = data?.duration
  const capacity = data?.capacity
  const description = data?.description
  const language = data?.language
  const level = data?.level
  const priceInfo = data?.priceInfo
  const sessions: Session[] = data?.sessions ?? []
  const instructors: Instructor[] = data?.instructors ?? []
  const registerUrl: string | undefined = data?.registerUrl

  const fmtDate = (iso?: string) =>
    iso
      ? new Intl.DateTimeFormat("fr-FR", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(iso))
      : ""

  return (
    <main className="bg-white">
      {/* HERO */}
      <Section className="px-0">
        <div className="relative w-full h-[58vh] md:h-[68vh]" data-tina-field={tinaField(data, 'coverImage')}>
          {coverImage && (
            <Image
              src={coverImage}
              alt={title || ''}
              fill
              sizes="100vw"
              className="object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:grayscale-0"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:pr-20 pb-8 md:pb-10">
            <h1 className="text-white font-light leading-[1.05] text-3xl md:text-5xl lg:text-6xl" data-tina-field={tinaField(data, 'title')}>
              {title}
            </h1>
            {(cadence || dayTime || duration || capacity) && (
              <p className="mt-3 text-white/80 text-sm md:text-base">
                {[cadence, dayTime, duration, capacity].filter(Boolean).join(" • ")}
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* BODY */}
      <Section className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* article */}
          <div className="lg:col-span-7">
            <article className="prose prose-neutral prose-lg max-w-none prose-p:font-light prose-headings:font-light prose-a:underline prose-a:underline-offset-4 prose-a:decoration-black/20 hover:prose-a:text-black">
              {description && <p data-tina-field={tinaField(data, 'description')}>{description}</p>}

              {Array.isArray(data?.objectives) && data.objectives.length > 0 && (
                <>
                  <h3>Ce que nous travaillons</h3>
                  <ul>
                    {data.objectives.map((o: string, i: number) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </>
              )}

              {Array.isArray(data?.program) && data.program.length > 0 && (
                <>
                  <h3>Déroulé</h3>
                  <ol>
                    {data.program.map((p: string, i: number) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ol>
                </>
              )}

              {Array.isArray(data?.prerequisites) && data.prerequisites.length > 0 && (
                <>
                  <h3>Prérequis</h3>
                  <ul>
                    {data.prerequisites.map((r: string, i: number) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </>
              )}

              {Array.isArray(data?.materials) && data.materials.length > 0 && (
                <>
                  <h3>Matériel</h3>
                  <ul>
                    {data.materials.map((m: string, i: number) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-4 text-[15px] md:text-base leading-relaxed text-black/80">
              {duration && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Durée</div>
                  <div className="mt-1">{duration}</div>
                </div>
              )}
              {cadence && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Cadence</div>
                  <div className="mt-1">{cadence}</div>
                </div>
              )}
              {dayTime && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Créneau</div>
                  <div className="mt-1">{dayTime}</div>
                </div>
              )}
              {level && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Niveau</div>
                  <div className="mt-1">{level}</div>
                </div>
              )}
              {language && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Langue</div>
                  <div className="mt-1">{language}</div>
                </div>
              )}
              {capacity && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Capacité</div>
                  <div className="mt-1">{capacity}</div>
                </div>
              )}
              {priceInfo && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Infos tarif</div>
                  <div className="mt-1">{priceInfo}</div>
                </div>
              )}

              {sessions?.length > 0 && (
                <div className="pt-2">
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Prochaines séances</div>
                  <ul className="mt-2 space-y-2">
                    {sessions.map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-black/60" />
                        <div>
                          <div>
                            {fmtDate(s.start)}
                            {s.end
                              ? ` – ${new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date(s.end))}`
                              : ""}
                          </div>
                          {(s.city || s.venue) && (
                            <div className="text-black/60">{[s.venue, s.city].filter(Boolean).join(" • ")}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {instructors?.length > 0 && (
                <div className="pt-2">
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Intervenant·e·s</div>
                  <ul className="mt-2 space-y-1.5 text-black/85">
                    {instructors.map((t, i) => (
                      <li key={i} className="flex flex-wrap gap-2">
                        <span className="font-light">{t.name}</span>
                        {t.role && (
                          <>
                            <span>—</span>
                            <span className="text-black/60">{t.role}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {registerUrl && (
                <div className="pt-2 text-[12px]">
                  <Link href={registerUrl} className="underline underline-offset-4 decoration-black/20 text-black/60 hover:text-black">
                    Demander une place
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-24 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto text-right">
          <Link href="/ateliers" className="text-xs text-black/50 hover:text-black transition">
            retour aux ateliers →
          </Link>
        </div>
      </Section>
    </main>
  )}

export const atelierDetailBlockSchema: Template = {
  name: 'atelierDetail',
  label: 'Atelier Detail',
  ui: {
    previewSrc: '/blocks/features.png',
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: 'string', name: 'title', label: 'Title' },
    { type: 'image', name: 'coverImage', label: 'Cover Image' },
    { type: 'string', name: 'discipline', label: 'Discipline' },
    { type: 'string', name: 'level', label: 'Level' },
    { type: 'string', name: 'duration', label: 'Duration' },
    { type: 'string', name: 'cadence', label: 'Cadence' },
    { type: 'string', name: 'dayTime', label: 'Day/Time' },
    { type: 'string', name: 'language', label: 'Language' },
    { type: 'string', name: 'capacity', label: 'Capacity' },
    { type: 'string', name: 'priceInfo', label: 'Price Info' },
    { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
    { type: 'string', list: true, name: 'objectives', label: 'Objectives' },
    { type: 'string', list: true, name: 'program', label: 'Program' },
    { type: 'string', list: true, name: 'prerequisites', label: 'Prerequisites' },
    { type: 'string', list: true, name: 'materials', label: 'Materials' },
    {
      type: 'object',
      list: true,
      name: 'instructors',
      label: 'Instructors',
      fields: [
        { type: 'string', name: 'name', label: 'Name' },
        { type: 'string', name: 'role', label: 'Role' },
        { type: 'image', name: 'photo', label: 'Photo' },
      ],
    },
    {
      type: 'object',
      list: true,
      name: 'sessions',
      label: 'Sessions',
      fields: [
        { type: 'datetime', name: 'start', label: 'Start' },
        { type: 'datetime', name: 'end', label: 'End' },
        { type: 'string', name: 'city', label: 'City' },
        { type: 'string', name: 'venue', label: 'Venue' },
        { type: 'string', name: 'address', label: 'Address' },
      ],
    },
    { type: 'string', name: 'registerUrl', label: 'Register URL' },
  ],
}

export default AtelierDetail


