// components/blocks/engagements-grid.tsx
"use client"

import React from "react"
import Link from "next/link"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

export const EngagementsGrid = ({
  data,
}: {
  data: any
}) => {
  const heading = data?.heading as string | undefined
  const description = data?.description as string | undefined
  const ctaLabel = data?.ctaLabel as string | undefined
  const ctaHref = data?.ctaHref as string | undefined
  const items = Array.isArray(data?.items) ? data.items : []

  return (
    <Section background={data?.background} className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6 md:mb-8" data-tina-field={tinaField(data, 'heading')}>
            {heading}
          </h2>
        )}
        
        {description && (
          <p className="text-lg md:text-xl text-black/70 max-w-3xl mb-12 md:mb-16 leading-relaxed" data-tina-field={tinaField(data, 'description')}>
            {description}
          </p>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className="space-y-4"
              data-tina-field={tinaField(data, `items.${index}`)}
            >
              {item.title && (
                <h3 className="text-xl md:text-2xl font-light text-black" data-tina-field={tinaField(item, 'title')}>
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-base text-black/70 leading-relaxed" data-tina-field={tinaField(item, 'description')}>
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {ctaLabel && ctaHref && (
          <div className="text-center" data-tina-field={tinaField(data, 'ctaLabel')}>
            <Link 
              href={ctaHref}
              className="inline-flex items-center text-sm tracking-wider uppercase text-black/60 hover:text-black transition-colors border-b border-black/20 hover:border-black pb-1"
            >
              {ctaLabel}
              <svg
                className="ml-2 w-4 h-4 transition-transform duration-300 hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </Section>
  )
}

export const engagementsGridBlockSchema: Template = {
  name: 'engagementsGrid',
  label: 'Engagements Grid',
  ui: {
    previewSrc: '/blocks/features.png',
    defaultItem: {
      heading: 'Nos Projets EAC',
      items: [
        {
          title: 'Ateliers scolaires',
          description: 'Interventions régulières dans les établissements',
          iconType: 'school',
        },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Heading',
      name: 'heading',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: { component: 'textarea' },
    },
    {
      type: 'string',
      label: 'CTA Label',
      name: 'ctaLabel',
    },
    {
      type: 'string',
      label: 'CTA Href',
      name: 'ctaHref',
    },
    {
      type: 'object',
      label: 'Items',
      name: 'items',
      list: true,
      ui: {
        itemProps: (item: any) => {
          return { label: item?.title || 'Nouveau projet' };
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Description',
          name: 'description',
          ui: { component: 'textarea' },
        },
        {
          type: 'string',
          label: 'Type d\'icône',
          name: 'iconType',
          options: [
            { label: 'École', value: 'school' },
            { label: 'Rencontre', value: 'meeting' },
            { label: 'Palette', value: 'palette' },
            { label: 'Résidence', value: 'residency' },
          ],
        },
      ],
    },
  ],
}

export default EngagementsGrid

