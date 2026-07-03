"use client"

import React from "react"
import { motion } from "framer-motion"

export default function EquipeHero() {
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
    <section className="min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-20">
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
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-corinthia text-foreground leading-none mb-8">
            Équipe
          </h1>
        </motion.div>

        {/* Texte principal */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto"
        >
          <p className="text-2xl md:text-3xl leading-relaxed font-playfair font-light text-muted-foreground">
            La Stela Company réunit danse, théâtre, musique et langues au sein d'un espace commun de créativité — portés par la première création Médée MEDEA.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}