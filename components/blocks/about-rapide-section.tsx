"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import MagneticButton from "@/components/ui/magnetic-button"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

export const AboutRapideSection = ({ data }: { data: any }) => {
  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2 
      } 
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: 'easeOut' as const
      } 
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: 'easeOut' as const
      } 
    }
  }

  const heading = data?.heading ?? 'La Stela Company'
  const p1 = data?.p1 ?? "Stela Elena Stankovic tisse des ponts entre théâtre, danse, musique et langues. L'art devient un vecteur de connexion, de liberté et d'émotion partagée."
  const p2 = data?.p2 ?? "Un laboratoire créatif en ébullition, reliant la France, l'Allemagne et la Serbie. Chaque discipline se nourrit des autres pour créer une expérience artistique unique."
  const quote = data?.quote ?? "L'art n'a pas de frontières, il unit les âmes par-delà les mots."
  const buttonHref = data?.buttonHref ?? '/about'
  const buttonLabel = data?.buttonLabel ?? 'Notre histoire'
  const portrait = data?.portrait ?? '/stela.png'

  return (
    <Section background={data?.background} className="py-32 px-6 md:px-12 lg:pr-20">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Contenu textuel */}
            <motion.div
              variants={fadeInLeft as any}
              className="lg:col-span-6 space-y-8"
            >
              {/* Titre artistique */}
              <div className="space-y-4">
                <motion.h2 
                  className="text-5xl md:text-6xl lg:text-7xl leading-none font-caveat"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <span data-tina-field={tinaField(data, 'heading')}>{heading}</span>
                </motion.h2>
                
                {/* Ligne artistique */}
                <motion.div 
                  className="w-24 h-px bg-primary/30"
                  whileHover={{ 
                    scaleX: 1.5,
                    backgroundColor: 'var(--primary)'
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              
              {/* Texte artistique */}
              <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/90 font-playfair font-light">
                <p data-tina-field={tinaField(data, 'p1')}>
                  {p1}
                </p>
                <p data-tina-field={tinaField(data, 'p2')}>
                  {p2}
                </p>
                
                {/* Citation élégante */}
                <motion.blockquote 
                  className="border-l-2 border-primary/30 pl-6 py-4 font-playfair italic"
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-muted-foreground text-xl" data-tina-field={tinaField(data, 'quote')}>
                    "{quote}"
                  </p>
                </motion.blockquote>
              </div>

              {/* Bouton magnétique */}
              <motion.div
                className="pt-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <MagneticButton href={buttonHref} variant="outline" label={buttonLabel} />
              </motion.div>
            </motion.div>

            {/* Section image artistique */}
            <motion.div
              variants={fadeInRight as any}
              className="lg:col-span-6"
            >
              <div className="relative">
                {/* Image principale épurée */}
                <motion.div 
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={portrait}
                      alt={heading}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Overlay artistique */}
                    <div className="absolute inset-0 bg-foreground/10 hover:bg-transparent transition-all duration-500" />
                  </div>
                </motion.div>
                
                {/* Éléments décoratifs minimalistes */}
                <motion.div 
                  className="absolute -bottom-8 -right-8 w-32 h-32 border border-primary/20"
                  whileHover={{ 
                    scale: 1.1,
                    borderColor: 'var(--primary)'
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <motion.div 
                  className="absolute -top-6 -left-6 w-6 h-6 bg-secondary/30"
                  whileHover={{ 
                    scale: 1.5,
                    backgroundColor: 'var(--secondary)'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Section>
  )
}

export const aboutRapideSectionBlockSchema: Template = {
  name: 'aboutRapideSection',
  label: 'About Rapide Section',
  ui: {
    previewSrc: '/blocks/features.png',
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: 'string', name: 'heading', label: 'Heading' },
    { type: 'string', name: 'p1', label: 'Paragraph 1', ui: { component: 'textarea' } },
    { type: 'string', name: 'p2', label: 'Paragraph 2', ui: { component: 'textarea' } },
    { type: 'string', name: 'quote', label: 'Quote', ui: { component: 'textarea' } },
    { type: 'string', name: 'buttonLabel', label: 'Button Label' },
    { type: 'string', name: 'buttonHref', label: 'Button Link' },
    { type: 'image', name: 'portrait', label: 'Portrait Image' },
  ],
}

export default function AboutRapideSectionLegacy() {
  return <AboutRapideSection data={{}} />
}