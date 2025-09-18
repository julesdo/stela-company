"use client"

import React from "react"
import { motion } from "framer-motion"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"
import { PageBlocksContactHero } from "@/tina/__generated__/types"

export const ContactHero = ({ data }: { data: PageBlocksContactHero }) => {
  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.4,
        delayChildren: 0.2 
      } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        ease: 'easeOut' as const
      } 
    }
  }

  return (
    <Section data={data as any} className="min-h-screen flex items-center py-24 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-6xl mx-auto w-full text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Titre */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-corinthia text-foreground leading-none mb-8"
            data-tina-field={tinaField(data, 'title')}
          >
            {data.title}
          </h1>
        </motion.div>

        {/* Texte principal */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto"
        >
          <p 
            className="text-2xl md:text-3xl leading-relaxed font-playfair font-light text-muted-foreground"
            data-tina-field={tinaField(data, 'subtitle')}
          >
            {data.subtitle}
          </p>
        </motion.div>
      </motion.div>
    </Section>
  )
}

export const contactHeroBlockSchema: Template = {
  name: "contactHero",
  label: "Contact Hero",
  ui: {
    previewSrc: "/blocks/contact-hero.png",
    defaultItem: {
      title: "Contact",
      subtitle: "Partageons nos visions artistiques. Chaque conversation est le début d'une possible création."
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: "string", label: "Title", name: "title" },
    { type: "string", label: "Subtitle", name: "subtitle", ui: { component: "textarea" } },
  ],
}

export default ContactHero