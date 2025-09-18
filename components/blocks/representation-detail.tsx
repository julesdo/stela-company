"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { tinaField } from "tinacms/dist/react"
import { Section } from "../layout/section"

export const RepresentationDetail = ({ data }: { data: any }) => {
  if (!data) return null
  const title = data.title as string | undefined
  const subtitle = data.subtitle as string | undefined
  const hero = data.hero as string | undefined
  const date = data.date as string | undefined
  const endDate = data.endDate as string | undefined
  const city = data.city as string | undefined
  const venue = data.venue as string | undefined
  const address = data.address as string | undefined
  const duration = data.duration as string | undefined
  const languages = data.languages as string | undefined
  const age = data.age as string | undefined
  const accessibility = data.accessibility as string | undefined
  const bookingUrl = data.bookingUrl as string | undefined
  const article: string[] = Array.isArray(data.article) ? data.article : []
  const gallery: Array<{ src: string; alt: string }> = data.gallery || []
  const partners: Array<{ name: string; logo: string; url?: string }> = data.partners || []

  const fmtLong = date
    ? new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(date))
    : undefined

  return (
    <main className="bg-white">
      {hero && (
        <section className="px-0">
          <div className="relative w-full h-[58vh] md:h-[68vh]" data-tina-field={tinaField(data, 'hero')}>
            <Image src={hero} alt={title || ''} fill sizes="100vw" className="object-cover" />
          </div>
        </section>
      )}

      <Section className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="text-3xl md:text-5xl font-light" data-tina-field={tinaField(data, 'title')}>{title}</h1>
            {subtitle && (
              <p className="mt-2 text-black/70" data-tina-field={tinaField(data, 'subtitle')}>{subtitle}</p>
            )}
            <div className="prose mt-8">
              {article.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-4 text-[15px] md:text-base leading-relaxed text-black/80">
              {fmtLong && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Date</div>
                  <div className="mt-1">{fmtLong}</div>
                </div>
              )}
              {(city || venue) && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Lieu</div>
                  <div className="mt-1">{city}{venue ? ` • ${venue}` : ''}</div>
                </div>
              )}
              {address && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Adresse</div>
                  <div className="mt-1">{address}</div>
                </div>
              )}
              {duration && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Durée</div>
                  <div className="mt-1">{duration}</div>
                </div>
              )}
              {languages && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Langues</div>
                  <div className="mt-1">{languages}</div>
                </div>
              )}
              {age && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Âge conseillé</div>
                  <div className="mt-1">{age}</div>
                </div>
              )}
              {accessibility && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">Accessibilité</div>
                  <div className="mt-1">{accessibility}</div>
                </div>
              )}
              {bookingUrl && (
                <div className="pt-2 text-[12px]">
                  <Link href={bookingUrl} className="underline underline-offset-4 decoration-black/20 text-black/60 hover:text-black">Billetterie</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {Array.isArray(gallery) && gallery.length > 0 && (
        <Section className="px-6 md:px-12 lg:pr-20">
          <div className="max-w-7xl mx-auto mt-6 md:mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {gallery.map((g, i) => (
                <div key={i} className="relative aspect-[4/3]">
                  <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {Array.isArray(partners) && partners.length > 0 && (
        <Section className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm tracking-wider uppercase text-black/50">Partenaires</h2>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 items-center">
              {partners.map((p, i) => (
                <div key={i} className="relative w-full h-16 md:h-20 lg:h-24">
                  <Image 
                    src={p.logo} 
                    alt={p.name} 
                    fill 
                    sizes="(max-width: 1024px) 25vw, 300px" 
                    className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300" 
                  />
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section className="pb-24 px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto text-right">
          <Link href="/representations" className="text-xs text-black/50 hover:text-black transition">retour aux représentations →</Link>
        </div>
      </Section>
    </main>
  )
}

export default RepresentationDetail


