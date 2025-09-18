"use client"

import React from "react"
import { motion } from "framer-motion"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"
import { PageBlocksContactInfo } from "../../lib/tina-types"

export const ContactInfo = ({ data }: { data: PageBlocksContactInfo }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
  }

  return (
    <Section data={data as any} className="py-32 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Introduction */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 
            className="text-5xl md:text-6xl font-corinthia text-foreground mb-12 leading-none"
            data-tina-field={tinaField(data, 'heading')}
          >
            {data.heading}
          </h2>
          <p 
            className="text-xl md:text-2xl font-playfair font-light text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            data-tina-field={tinaField(data, 'description')}
          >
            {data.description}
          </p>
        </motion.div>

        {/* Informations de contact */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-16">
          {/* Informations principales */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 
                className="text-2xl font-corinthia text-foreground"
                data-tina-field={tinaField(data, 'name')}
              >
                {data.name}
              </h3>
              <p 
                className="text-lg md:text-xl font-playfair text-muted-foreground"
                data-tina-field={tinaField(data, 'role')}
              >
                {data.role}
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Téléphone</h4>
                <a
                  href={`tel:${data.phone?.replace(/\s/g, '')}`}
                  className="text-lg md:text-xl font-playfair text-foreground hover:text-muted-foreground transition-colors duration-300 block"
                  data-tina-field={tinaField(data, 'phone')}
                >
                  {data.phone}
                </a>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Email</h4>
                <a
                  href={`mailto:${data.email}`}
                  className="text-lg md:text-xl font-playfair text-foreground hover:text-muted-foreground transition-colors duration-300 block"
                  data-tina-field={tinaField(data, 'email')}
                >
                  {data.email}
                </a>
              </div>

              {data.address && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Adresse</h4>
                  <p 
                    className="text-lg md:text-xl font-playfair text-muted-foreground"
                    data-tina-field={tinaField(data, 'address')}
                  >
                    {data.address}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="space-y-8">
            {data.socials && data.socials.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Réseaux sociaux</h4>
                <div className="space-y-3">
                  {data.socials.map((social, index) => (
                    <a
                      key={index}
                      href={social?.url ?? ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-playfair text-foreground hover:text-muted-foreground transition-colors duration-300 block"
                      data-tina-field={social ? tinaField(social, 'label') : ''}
                    >
                      {social?.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {data.hours && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Disponibilités</h4>
                <p 
                  className="text-lg font-playfair text-muted-foreground leading-relaxed"
                  data-tina-field={tinaField(data, 'hours')}
                >
                  {data.hours}
                </p>
              </div>
            )}

            {data.note && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Note</h4>
                <p 
                  className="text-lg font-playfair text-muted-foreground leading-relaxed"
                  data-tina-field={tinaField(data, 'note')}
                >
                  {data.note}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
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