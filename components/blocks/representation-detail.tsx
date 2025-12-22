"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { tinaField } from "tinacms/dist/react"
import { Section } from "../layout/section"
import { locales, defaultLocale, type Locale } from "@/lib/i18n"

export const RepresentationDetail = ({ data }: { data: any }) => {
  const pathname = usePathname();
  
  // Détecter la locale depuis l'URL
  const pathSegments = pathname.split('/').filter(Boolean);
  const detectedLocale = pathSegments[0] as Locale;
  const currentLocale = locales.includes(detectedLocale) ? detectedLocale : defaultLocale;
  
  const localeMap: Record<Locale, string> = {
    fr: 'fr-FR',
    de: 'de-DE',
    en: 'en-US',
    sr: 'sr-RS',
  };
  
  const translations: Record<Locale, Record<string, string>> = {
    fr: {
      date: 'Date',
      lieu: 'Lieu',
      adresse: 'Adresse',
      duree: 'Durée',
      langues: 'Langues',
      age: 'Âge conseillé',
      accessibilite: 'Accessibilité',
      billetterie: 'Billetterie',
      partenaires: 'Partenaires',
      retour: 'retour aux représentations →',
    },
    de: {
      date: 'Datum',
      lieu: 'Ort',
      adresse: 'Adresse',
      duree: 'Dauer',
      langues: 'Sprachen',
      age: 'Empfohlenes Alter',
      accessibilite: 'Barrierefreiheit',
      billetterie: 'Kartenverkauf',
      partenaires: 'Partner',
      retour: 'zurück zu den Aufführungen →',
    },
    en: {
      date: 'Date',
      lieu: 'Venue',
      adresse: 'Address',
      duree: 'Duration',
      langues: 'Languages',
      age: 'Recommended age',
      accessibilite: 'Accessibility',
      billetterie: 'Booking',
      partenaires: 'Partners',
      retour: 'back to performances →',
    },
    sr: {
      date: 'Датум',
      lieu: 'Место',
      adresse: 'Адреса',
      duree: 'Трајање',
      langues: 'Језици',
      age: 'Препоручено доба',
      accessibilite: 'Приступачност',
      billetterie: 'Карте',
      partenaires: 'Партнери',
      retour: 'назад на извођења →',
    },
  };
  
  const t = translations[currentLocale];
  
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
    ? new Intl.DateTimeFormat(localeMap[currentLocale], {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(date))
    : undefined
    
  const backUrl = currentLocale === defaultLocale ? '/representations' : `/${currentLocale}/representations`;

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
            <div className="prose prose-lg mt-8 prose-p:font-light max-w-none prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:lg:text-5xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-5 prose-h2:leading-tight prose-h3:text-3xl prose-h3:md:text-4xl prose-h3:lg:text-5xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-5 prose-h3:leading-tight prose-headings:font-light">
              {article.map((p, i) => {
                // Nettoyer les espaces autour des astérisques markdown
                const cleanedMarkdown = p
                  .replace(/\*\*\s+/g, '**')
                  .replace(/\s+\*\*/g, '**')
                // Conversion markdown basique en HTML
                let html = cleanedMarkdown
                  .replace(/###\s+(.+)/g, '<h3>$1</h3>')
                  .replace(/##\s+(.+)/g, '<h2>$1</h2>')
                  .replace(/#\s+(.+)/g, '<h1>$1</h1>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                  .split(/\n\n+/)
                  .map(para => para.trim())
                  .filter(para => para.length > 0)
                  .map(para => {
                    if (para.startsWith('<h')) return para
                    return `<p>${para.replace(/\n/g, '<br />')}</p>`
                  })
                  .join('')
                return (
                  <div 
                    key={i} 
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-4 text-[15px] md:text-base leading-relaxed text-black/80">
              {fmtLong && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">{t.date}</div>
                  <div className="mt-1">{fmtLong}</div>
                </div>
              )}
              {(city || venue) && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">{t.lieu}</div>
                  <div className="mt-1">{city}{venue ? ` • ${venue}` : ''}</div>
                </div>
              )}
              {address && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">{t.adresse}</div>
                  <div className="mt-1">{address}</div>
                </div>
              )}
              {duration && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">{t.duree}</div>
                  <div className="mt-1">{duration}</div>
                </div>
              )}
              {languages && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">{t.langues}</div>
                  <div className="mt-1">{languages}</div>
                </div>
              )}
              {age && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">{t.age}</div>
                  <div className="mt-1">{age}</div>
                </div>
              )}
              {accessibility && (
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-black/45">{t.accessibilite}</div>
                  <div className="mt-1">{accessibility}</div>
                </div>
              )}
              {bookingUrl && (
                <div className="pt-2 text-[12px]">
                  <Link href={bookingUrl} className="underline underline-offset-4 decoration-black/20 text-black/60 hover:text-black">{t.billetterie}</Link>
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
            <h2 className="text-sm tracking-wider uppercase text-black/50">{t.partenaires}</h2>
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
          <Link href={backUrl} className="text-xs text-black/50 hover:text-black transition">{t.retour}</Link>
        </div>
      </Section>
    </main>
  )
}

export default RepresentationDetail


