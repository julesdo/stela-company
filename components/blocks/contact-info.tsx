"use client"

import React from "react"
import { motion } from "framer-motion"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { usePathname } from "next/navigation"
import { Section, sectionBlockSchemaField } from "../layout/section"
import { PageBlocksContactInfo } from "@/tina/__generated__/types"
import { locales, defaultLocale, type Locale } from "@/lib/i18n"

// Traductions
const translations: Record<Locale, { phone: string; email: string; socials: string }> = {
  fr: {
    phone: 'Téléphone',
    email: 'Email',
    socials: 'Réseaux sociaux',
  },
  de: {
    phone: 'Telefon',
    email: 'E-Mail',
    socials: 'Soziale Netzwerke',
  },
  en: {
    phone: 'Phone',
    email: 'Email',
    socials: 'Social Networks',
  },
  sr: {
    phone: 'Телефон',
    email: 'Е-пошта',
    socials: 'Друштвене мреже',
  },
}

export const ContactInfo = ({ data }: { data: PageBlocksContactInfo }) => {
  const pathname = usePathname()
  
  // Détecter la locale actuelle
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  const isValidLocale = firstSegment && locales.includes(firstSegment as Locale)
  const currentLocale: Locale = isValidLocale ? (firstSegment as Locale) : defaultLocale
  
  const t = translations[currentLocale]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
  }

  return (
    <Section data={data as any} className="py-16 md:py-20 px-6 md:px-12 lg:pr-20">
      <div className="max-w-4xl mx-auto">
        {/* Titre simple */}
        <h2 
          className="text-4xl md:text-5xl font-light text-black mb-12"
          data-tina-field={tinaField(data, 'heading')}
        >
          {data.heading || 'Contact'}
        </h2>

        {/* Informations essentielles en colonnes */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact direct */}
          <div className="space-y-6">
            {data.phone && (
              <div>
                <div className="text-xs uppercase tracking-wider text-black/50 mb-2">{t.phone}</div>
                <a
                  href={`tel:${data.phone?.replace(/\s/g, '').replace(/\+/g, '')}`}
                  className="text-lg text-black/80 hover:text-black transition-colors"
                  data-tina-field={tinaField(data, 'phone')}
                >
                  {data.phone}
                </a>
              </div>
            )}

            {data.email && (
              <div>
                <div className="text-xs uppercase tracking-wider text-black/50 mb-2">{t.email}</div>
                <a
                  href={`mailto:${data.email}`}
                  className="text-lg text-black/80 hover:text-black transition-colors"
                  data-tina-field={tinaField(data, 'email')}
                >
                  {data.email}
                </a>
              </div>
            )}
          </div>

          {/* Réseaux sociaux */}
          {data.socials && data.socials.length > 0 && (
            <div className="space-y-6">
              <div className="text-xs uppercase tracking-wider text-black/50 mb-2">{t.socials}</div>
              <div className="space-y-3">
                {data.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social?.url ?? ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-black/80 hover:text-black transition-colors block"
                    data-tina-field={social ? tinaField(social, 'label') : ''}
                  >
                    {social?.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

export const contactInfoBlockSchema: Template = {
  name: "contactInfo",
  label: "Contact Info",
  ui: {
    previewSrc: "/blocks/contact-info.png",
    defaultItem: {
      heading: "Restons Connectés",
      description: "Un projet de représentation, une question sur nos cours, ou une envie de collaboration ? Écrivez-nous, nous revenons vers vous rapidement.",
      name: "STELA ELENA STANKOVIC",
      role: "Directrice artistique",
      phone: "06 05 58 25 71",
      email: "lastelacompany@gmail.com",
      address: "Paris • Berlin • Belgrade",
      hours: "Disponible du lundi au vendredi de 9h à 18h",
      note: "Pour les projets artistiques et collaborations, n'hésitez pas à nous contacter directement."
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: "string", label: "Heading", name: "heading" },
    { type: "string", label: "Description", name: "description", ui: { component: "textarea" } },
    { type: "string", label: "Name", name: "name" },
    { type: "string", label: "Role", name: "role" },
    { type: "string", label: "Phone", name: "phone" },
    { type: "string", label: "Email", name: "email" },
    { type: "string", label: "Address", name: "address", required: false },
    { type: "string", label: "Hours", name: "hours", required: false },
    { type: "string", label: "Note", name: "note", required: false, ui: { component: "textarea" } },
    {
      type: "object",
      list: true,
      name: "socials",
      label: "Social Links",
      required: false,
      fields: [
        { type: "string", name: "label", label: "Label" },
        { type: "string", name: "url", label: "URL" },
      ],
    },
  ],
}

export default ContactInfo