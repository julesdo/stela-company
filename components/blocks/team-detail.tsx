"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

// Types
type Fact = { label: string; value: string }
type Socials = { 
  website?: string; 
  instagram?: string; 
  linkedin?: string; 
  x?: string; 
  email?: string 
}
type GalleryItem = {
  src: string
  alt: string
  ratio?: "portrait" | "square" | "landscape"
}

export interface TeamDetailData {
  name: string
  role: string
  portrait: string
  article: string[]
  facts?: Fact[]
  socials?: Socials
  gallery?: GalleryItem[]
  [key: string]: any
}

// Helper ratio → aspect class
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

export const TeamDetail = ({ data }: { data: TeamDetailData }) => {
  if (!data) return null

  // JSON-LD minimal
  const sameAs = [
    data.socials?.website, 
    data.socials?.instagram, 
    data.socials?.linkedin, 
    data.socials?.x
  ].filter(Boolean) as string[]
  
  const jsonLd = { 
    "@context": "https://schema.org", 
    "@type": "Person", 
    name: data.name, 
    jobTitle: data.role, 
    image: data.portrait, 
    sameAs 
  }

  return (
    <Section background="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO portrait plein cadre */}
      <section className="px-0 pb-12">
        <div className="relative w-full h-[58vh] md:h-[68vh]">
          <Image
            src={data.portrait}
            alt={data.name}
            fill
            sizes="100vw"
            className="object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:grayscale-0"
            priority
          />
          {/* voile pour la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          {/* Nom + rôle en overlay bas-gauche */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:pr-20 pb-8 md:pb-10">
            <div>
              <p className="text-white/80 text-sm md:text-base" data-tina-field={tinaField(data, 'role')}>
                {data.role}
              </p>
              <h1 className="mt-1 text-white font-light leading-[1.05] text-3xl md:text-5xl lg:text-6xl" data-tina-field={tinaField(data, 'name')}>
                {data.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Layout article + colonne de faits */}
      <section className="px-6 md:px-12 lg:pr-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Article (prose) */}
          <div className="lg:col-span-7">
            <article
              className="
                prose prose-neutral prose-lg max-w-none
                prose-a:underline prose-a:underline-offset-4 prose-a:decoration-black/20 hover:prose-a:text-black
                prose-p:font-light prose-headings:font-light
              "
              data-tina-field={tinaField(data, 'article')}
            >
              {Array.isArray(data.article) ? (
                data.article.map((paragraph: string, i: number) => {
                  // Nettoyer les espaces autour des astérisques markdown
                  const cleanedMarkdown = paragraph
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
                })
              ) : (
                (() => {
                  const cleanedMarkdown = (data.article || '')
                    .replace(/\*\*\s+/g, '**')
                    .replace(/\s+\*\*/g, '**')
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
                  return <div dangerouslySetInnerHTML={{ __html: html }} />
                })()
              )}
            </article>
          </div>

          {/* Colonne bio simple, sticky, sans cadres/bordures */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-4 text-[15px] md:text-base leading-relaxed text-black/75">
              {data.facts?.map((fact, i) => (
                <div key={i} data-tina-field={tinaField(data, `facts.${i}`)}>
                  <div className="text-[12px] uppercase tracking-wider text-black/45" data-tina-field={tinaField(data, `facts.${i}.label`)}>
                    {fact.label}
                  </div>
                  <div className="mt-1 text-black/80" data-tina-field={tinaField(data, `facts.${i}.value`)}>
                    {fact.value}
                  </div>
                </div>
              ))}

              {(data.socials?.website || data.socials?.instagram || data.socials?.linkedin || data.socials?.x || data.socials?.email) && (
                <div className="pt-2 text-[12px] text-black/55" data-tina-field={tinaField(data, 'socials')}>
                  {data.socials?.website && <Link href={data.socials.website} className="underline underline-offset-4 decoration-black/20 hover:text-black">site</Link>}
                  {data.socials?.instagram && <> · <Link href={data.socials.instagram} className="underline underline-offset-4 decoration-black/20 hover:text-black">instagram</Link></>}
                  {data.socials?.linkedin && <> · <Link href={data.socials.linkedin} className="underline underline-offset-4 decoration-black/20 hover:text-black">linkedin</Link></>}
                  {data.socials?.x && <> · <Link href={data.socials.x} className="underline underline-offset-4 decoration-black/20 hover:text-black">x</Link></>}
                  {data.socials?.email && <> · <a href={`mailto:${data.socials.email}`} className="underline underline-offset-4 decoration-black/20 hover:text-black">email</a></>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      {data.gallery?.length ? (
        <section className="px-6 md:px-12 lg:pr-20">
          <div className="max-w-7xl mx-auto mt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" data-tina-field={tinaField(data, 'gallery')}>
              {data.gallery.map((g, i) => (
                <div key={i} className={`relative ${ratioClass(g.ratio)} overflow-hidden`} data-tina-field={tinaField(data, `gallery.${i}`)}>
                  <Image
                    src={g.src}
                    alt={g.alt || data.name}
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
          <Link href="/equipe" className="text-xs text-black/50 hover:text-black transition">retour à l'équipe →</Link>
        </div>
      </section>
    </Section>
  )
}

export const teamDetailBlockSchema: Template = {
  name: 'teamDetail',
  label: 'Team Detail',
  ui: {
    defaultItem: {
      background: 'bg-white',
    },
    previewSrc: '/blocks/team-detail.png',
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: 'string', name: 'name', label: 'Nom' },
    { type: 'string', name: 'role', label: 'Rôle' },
    { type: 'image', name: 'portrait', label: 'Portrait' },
    { type: 'string', list: true, name: 'article', label: 'Article' },
    {
      type: 'object',
      list: true,
      name: 'facts',
      label: 'Informations',
      fields: [
        { type: 'string', name: 'label', label: 'Label' },
        { type: 'string', name: 'value', label: 'Valeur' },
      ],
    },
    {
      type: 'object',
      name: 'socials',
      label: 'Réseaux sociaux',
      fields: [
        { type: 'string', name: 'website', label: 'Site web' },
        { type: 'string', name: 'instagram', label: 'Instagram' },
        { type: 'string', name: 'linkedin', label: 'LinkedIn' },
        { type: 'string', name: 'x', label: 'X (Twitter)' },
        { type: 'string', name: 'email', label: 'Email' },
      ],
    },
    {
      type: 'object',
      list: true,
      name: 'gallery',
      label: 'Galerie',
      fields: [
        { type: 'image', name: 'src', label: 'Image' },
        { type: 'string', name: 'alt', label: 'Texte alternatif' },
        { 
          type: 'string', 
          name: 'ratio', 
          label: 'Ratio', 
          options: [
            { value: 'portrait', label: 'Portrait' },
            { value: 'square', label: 'Carré' },
            { value: 'landscape', label: 'Paysage' },
          ]
        },
      ],
    },
  ],
}

export default TeamDetail
