"use client"

import React from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/ui/magnetic-button"

export default function AboutContact() {
  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.1 
      } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: 'easeOut' as const
      } 
    }
  }

  return (
    <section className="py-32 px-6 md:px-12 lg:pr-20 bg-muted/5">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Citation finale */}
        <motion.blockquote
          variants={itemVariants}
          className="mb-16"
        >
          <p className="text-3xl md:text-4xl font-playfair font-light text-foreground leading-relaxed mb-8">
            "L'art n'a pas de frontières, 
            il unit les âmes par-delà les mots."
          </p>
          <footer className="text-lg font-playfair text-muted-foreground">
            — Stela Elena Stankovic
          </footer>
        </motion.blockquote>

        {/* CTA simple */}
        <motion.div
          variants={itemVariants}
        >
          <div className="mb-8">
            <p className="text-xl font-playfair text-muted-foreground mb-8">
              Découvrez nos prochaines créations
            </p>
            
            <MagneticButton 
              href="/agenda" 
              variant="outline"
              label="Voir l'agenda"
            />
          </div>
        </motion.div>

        {/* Signature */}
        <motion.div
          variants={itemVariants}
          className="mt-20"
        >
          <p className="text-2xl font-corinthia text-primary mb-2">
            Stela Elena Stankovic
          </p>
          <p className="text-sm font-playfair text-muted-foreground tracking-wider">
            Fondatrice & Directrice Artistique
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}