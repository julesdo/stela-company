"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

type Session = { start?: string; end?: string; city?: string; venue?: string; address?: string }
type Instructor = { name?: string; role?: string; photo?: string }
type Lieu = {
  nom?: string
  city?: string
  venue?: string
  address?: string
  dayTime?: string
  duration?: string
  capacity?: string
  priceInfo?: string
  email?: string
  phone?: string
  note?: string
  sessions?: Session[]
  registerUrl?: string
}

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
  const lieux: Lieu[] = data?.lieux ?? []
  
  // Si des lieux sont définis, on utilise les lieux, sinon on utilise les champs globaux
  const hasLieux = lieux.length > 0

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
            {hasLieux ? (
              <p className="mt-3 text-white/80 text-sm md:text-base">
                {cadence && `${cadence} • `}
                {lieux.map(l => l.city || l.venue).filter(Boolean).join(" & ")}
              </p>
            ) : (
              (cadence || dayTime || duration || capacity) && (
                <p className="mt-3 text-white/80 text-sm md:text-base">
                  {[cadence, dayTime, duration, capacity].filter(Boolean).join(" • ")}
                </p>
              )
            )}
          </div>
        </div>
      </Section>

      {/* BODY */}
      <Section className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* article */}
          <div className="lg:col-span-7">
            <article className="prose prose-neutral prose-lg max-w-none prose-p:font-light prose-headings:font-light prose-a:underline prose-a:underline-offset-4 prose-a:decoration-black/20 hover:prose-a:text-black prose-h3:text-3xl prose-h3:md:text-4xl prose-h3:lg:text-5xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-5 prose-h3:leading-tight">
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
                  <h3>Séance</h3>
                  <ul>
                    {data.program.map((p: string, i: number) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
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

            {/* Section Lieux - Affichage en cartes dans le contenu principal */}
            {hasLieux && (
              <div className="mt-16 pt-16 border-t border-black/5 relative">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12">Où nous retrouver</h2>
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 relative">
                  {lieux.map((lieu, lieuIndex) => (
                    <div 
                      key={lieuIndex} 
                      className="space-y-5"
                      data-tina-field={tinaField(data, `lieux.${lieuIndex}`)}
                    >
                      <h3 className="text-2xl md:text-3xl font-semibold">
                        {lieu.nom || lieu.venue || lieu.city}
                      </h3>
                      
                      <div className="space-y-5 text-[15px]">
                        {lieu.venue && (
                          <div>
                            <div className="text-xs uppercase tracking-wider text-black/50 mb-1.5">Lieu</div>
                            <div className="font-medium">{lieu.venue}</div>
                          </div>
                        )}
                        
                        {lieu.address && (
                          <div>
                            <div className="text-xs uppercase tracking-wider text-black/50 mb-1.5">Adresse</div>
                            <div>{lieu.address}</div>
                          </div>
                        )}
                        
                        {(lieu.dayTime || lieu.duration) && (
                          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-black/5">
                            {lieu.dayTime && (
                              <div>
                                <div className="text-xs uppercase tracking-wider text-black/50 mb-1.5">Horaires</div>
                                <div className="font-medium">{lieu.dayTime}</div>
                              </div>
                            )}
                            
                            {lieu.duration && (
                              <div>
                                <div className="text-xs uppercase tracking-wider text-black/50 mb-1.5">Durée</div>
                                <div className="font-medium">{lieu.duration}</div>
                              </div>
                            )}
                          </div>
                        )}

                        {lieu.capacity && (
                          <div>
                            <div className="text-xs uppercase tracking-wider text-black/50 mb-1.5">Capacité</div>
                            <div className="font-medium">{lieu.capacity}</div>
                          </div>
                        )}
                        
                        {lieu.note && (
                          <div className="pt-2 border-t border-black/5">
                            <div className="text-sm text-black/70 italic">{lieu.note}</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Séparateur entre les lieux (sauf le dernier) */}
                      {lieuIndex < lieux.length - 1 && (
                        <div className="md:hidden h-px bg-black/5 mt-8" />
                      )}
                    </div>
                  ))}
                  {/* Séparateur vertical entre les deux lieux sur desktop */}
                  {lieux.length === 2 && (
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/5 -translate-x-1/2" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar simplifiée */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="space-y-6">
                {/* Informations générales communes */}
                <div className="space-y-4 text-[15px]">
                  {cadence && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Cadence</div>
                      <div className="font-medium">{cadence}</div>
                    </div>
                  )}
                  
                  {level && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Niveau</div>
                      <div className="font-medium">{level}</div>
                    </div>
                  )}
                  
                  {language && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Langue</div>
                      <div className="font-medium">{language}</div>
                    </div>
                  )}

                  {/* Informations globales (si pas de lieux) */}
                  {!hasLieux && (
                    <>
                      {duration && (
                        <div>
                          <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Durée</div>
                          <div className="font-medium">{duration}</div>
                        </div>
                      )}
                      {dayTime && (
                        <div>
                          <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Créneau</div>
                          <div className="font-medium">{dayTime}</div>
                        </div>
                      )}
                      {capacity && (
                        <div>
                          <div className="text-xs uppercase tracking-wider text-black/50 mb-1">Capacité</div>
                          <div className="font-medium">{capacity}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Sessions globales (si pas de lieux) */}
                {!hasLieux && sessions?.length > 0 && (
                  <div className="pt-6 border-t border-black/5">
                    <div className="text-xs uppercase tracking-wider text-black/50 mb-3">Prochaines séances</div>
                    <ul className="space-y-2">
                      {sessions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-black/60 flex-shrink-0" />
                          <div className="text-sm">
                            <div>
                              {fmtDate(s.start)}
                              {s.end
                                ? ` – ${new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date(s.end))}`
                                : ""}
                            </div>
                            {(s.city || s.venue) && (
                              <div className="text-black/60 text-xs mt-0.5">{[s.venue, s.city].filter(Boolean).join(" • ")}</div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Intervenants */}
                {instructors?.length > 0 && (
                  <div className="pt-6 border-t border-black/5">
                    <div className="text-xs uppercase tracking-wider text-black/50 mb-3">Intervenant·e·s</div>
                    <ul className="space-y-2 text-sm">
                      {instructors.map((t, i) => (
                        <li key={i} className="flex flex-wrap gap-2">
                          <span className="font-medium">{t.name}</span>
                          {t.role && (
                            <>
                              <span className="text-black/40">—</span>
                              <span className="text-black/60">{t.role}</span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Contact global (prend le premier contact trouvé dans les lieux) */}
                {hasLieux && (() => {
                  const contactLieu = lieux.find(l => l.email || l.phone);
                  if (!contactLieu) return null;
                  return (
                    <div className="pt-6 border-t border-black/5">
                      <div className="text-xs uppercase tracking-wider text-black/50 mb-3">Contact</div>
                      <div className="space-y-2 text-sm">
                        {contactLieu.email && (
                          <div>
                            <a href={`mailto:${contactLieu.email}`} className="hover:underline text-black/80 hover:text-black">
                              {contactLieu.email}
                            </a>
                          </div>
                        )}
                        {contactLieu.phone && (
                          <div>
                            <a href={`tel:${contactLieu.phone.replace(/\s/g, '')}`} className="hover:underline text-black/80 hover:text-black">
                              {contactLieu.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
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
    {
      type: 'object',
      name: 'lieux',
      label: 'Lieux',
      list: true,
      ui: {
        itemProps: (item: any) => {
          return { label: item?.nom || 'Nouveau lieu' };
        },
      },
      fields: [
        { type: 'string', name: 'nom', label: 'Nom du lieu', required: true },
        { type: 'string', name: 'city', label: 'Ville', required: true },
        { type: 'string', name: 'venue', label: 'Lieu/Salle', required: true },
        { type: 'string', name: 'address', label: 'Adresse' },
        { type: 'string', name: 'dayTime', label: 'Jour/Horaire' },
        { type: 'string', name: 'duration', label: 'Durée' },
        { type: 'string', name: 'capacity', label: 'Capacité' },
        { type: 'string', name: 'priceInfo', label: 'Infos tarif' },
        { type: 'string', name: 'email', label: 'Email de contact' },
        { type: 'string', name: 'phone', label: 'Téléphone de contact' },
        { type: 'string', name: 'note', label: 'Note/Information complémentaire', ui: { component: 'textarea' } },
        {
          type: 'object',
          name: 'sessions',
          label: 'Sessions',
          list: true,
          fields: [
            { type: 'datetime', name: 'start', label: 'Début' },
            { type: 'datetime', name: 'end', label: 'Fin' },
          ],
        },
        { type: 'string', name: 'registerUrl', label: 'URL d\'inscription' },
      ],
    },
  ],
}

export default AtelierDetail


