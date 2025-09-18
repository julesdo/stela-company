"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"
export const PartnersCarousel = ({ data }: { data: any }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  // Vérifier que les données existent
  if (!data || !data.partners || data.partners.length === 0) {
    return null
  }


  return (
    <Section data={data} className="py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:pr-20">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2 
            className="text-sm tracking-wider uppercase text-black/50 mb-4"
            data-tina-field={tinaField(data, 'title')}
          >
            {data.title || "Nos Partenaires"}
          </h2>
          {data.subtitle && (
            <p 
              className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto"
              data-tina-field={tinaField(data, 'subtitle')}
            >
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Carousel statique */}
        <div className="relative overflow-hidden">
          <div className="flex gap-8 md:gap-12 items-center justify-center flex-wrap">
            {data.partners.map((partner: any, index: number) => (
              <motion.div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 relative w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24"
                whileHover={{ 
                  scale: 1.05,
                  filter: "grayscale(0) opacity(1)"
                }}
                transition={{ duration: 0.3 }}
                data-tina-field={tinaField(data, `partners.${index}`)}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
                  className="object-contain grayscale opacity-60 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export const partnersCarouselBlockSchema: Template = {
  name: "partnersCarousel",
  label: "Partners Carousel",
  ui: {
    previewSrc: "/blocks/partners-carousel.png",
    defaultItem: {
      title: "Nos Partenaires",
      subtitle: "Ils nous font confiance et nous accompagnent dans nos projets artistiques",
      speed: 20,
      showIndicator: true,
      partners: [
        {
          name: "La Fabrique de la Danse",
          logo: "/uploads/LFD-logo.jpg"
        },
        {
          name: "Paris Marais Dance School",
          logo: "/uploads/images.jfif"
        },
        {
          name: "Espace Sorano",
          logo: "/uploads/Logo-rond-rouge.png"
        }
      ]
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: "string", label: "Title", name: "title" },
    { type: "string", label: "Subtitle", name: "subtitle", required: false, ui: { component: "textarea" } },
    { type: "number", label: "Speed (seconds)", name: "speed", required: false },
    { type: "boolean", label: "Show Indicator", name: "showIndicator", required: false },
    {
      type: "object",
      list: true,
      name: "partners",
      label: "Partners",
      fields: [
        { type: "string", name: "name", label: "Name" },
        { type: "image", name: "logo", label: "Logo" },
        { type: "string", name: "url", label: "URL", required: false },
      ],
    },
  ],
}

export default PartnersCarousel
