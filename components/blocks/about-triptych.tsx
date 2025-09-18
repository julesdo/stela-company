// components/blocks/about-triptych.tsx
"use client"

import Image from "next/image"
import React from "react"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

type Item = { title: string; desc: string; image: string }

export const AboutTriptych = ({ data }: { data: any }) => {
  const items: Item[] = (data?.items ?? []).map((it: any) => ({
    title: it.title,
    desc: it.desc ?? it.text ?? '',
    image: it.image,
  }))
  return (
    <Section background={data?.background} className="py-16 md:py-24 px-6 md:px-12 lg:pr-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" data-tina-field={tinaField(data)}>
        {items.map((it, i) => (
          <article key={i} className="group relative overflow-hidden">
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5]">
              <Image
                src={it.image}
                alt={it.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="
                  object-cover grayscale
                  transition-all duration-[900ms] ease-out
                  group-hover:grayscale-0 group-hover:scale-[1.015]
                "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <h3 className="text-white text-2xl md:text-3xl font-light leading-tight" data-tina-field={tinaField({ ...it }, 'title')}>{it.title}</h3>
                <p className="mt-2 text-white/85 text-sm md:text-base max-w-sm" data-tina-field={tinaField({ ...it }, 'desc')}>{it.desc}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export const aboutTriptychBlockSchema: Template = {
  name: 'aboutTriptych',
  label: 'About Triptych',
  ui: {
    previewSrc: '/blocks/features.png',
    defaultItem: {
      items: [
        { title: 'Danse', desc: 'Le corps comme langage universel, exprimant ce que les mots ne peuvent dire.', image: '/dance.jpg' },
        { title: 'Théâtre', desc: "L’art de l’incarnation, donnant vie aux émotions et aux récits humains.", image: '/theatre.jpg' },
        { title: 'Langues', desc: 'Des ponts sonores entre les cultures, révélant la beauté de la diversité.', image: '/language.jpg' },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'object',
      name: 'items',
      label: 'Items',
      list: true,
      fields: [
        { type: 'string', name: 'title', label: 'Title' },
        { type: 'string', name: 'desc', label: 'Description', ui: { component: 'textarea' } },
        { type: 'image', name: 'image', label: 'Image' },
      ],
    },
  ],
}

export default function AboutTriptychLegacy({ items }: { items: Item[] }) {
  return <AboutTriptych data={{ items }} />
}
