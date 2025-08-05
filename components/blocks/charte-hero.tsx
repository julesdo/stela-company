"use client"

import React from "react"
import { motion } from "framer-motion"

export default function CharteHero() {
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
    <section className="grid items-center py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-6xl mx-auto text-center"
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
            Charte Graphique
          </h1>
        </motion.div>

        {/* Sous-titre poétique */}
        <motion.div
          variants={itemVariants}
          className="space-y-8 mb-16"
        >
          <p className="text-2xl md:text-3xl leading-relaxed font-playfair font-light text-muted-foreground max-w-4xl mx-auto">
            L'identité visuelle de La Stela Company révèle 
            l'essence épurée de l'art contemporain.
          </p>
          
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        {/* Principes de design */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-corinthia text-foreground">
              Épuré
            </h3>
            <p className="text-lg font-playfair text-muted-foreground leading-relaxed">
              Design minimaliste où chaque élément a sa raison d'être, 
              privilégiant l'essence à l'ornement.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-corinthia text-foreground">
              Artistique
            </h3>
            <p className="text-lg font-playfair text-muted-foreground leading-relaxed">
              Esthétique sophistiquée qui reflète l'univers créatif 
              et l'excellence artistique de la compagnie.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-corinthia text-foreground">
              Poétique
            </h3>
            <p className="text-lg font-playfair text-muted-foreground leading-relaxed">
              Communication visuelle qui évoque l'émotion 
              et transcende le simple message informatif.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}