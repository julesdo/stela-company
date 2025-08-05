"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AgendaHero() {
  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.2,
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
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden lg:pr-20">
      {/* Arrière-plan artistique */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full bg-gradient-to-br from-background via-muted/20 to-primary/5">
        </div>
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Titre principal manuscrit */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl text-foreground font-corinthia leading-none">
            Agenda
          </h1>
          <div className="w-16 h-px bg-primary mx-auto mt-4" />
        </motion.div>

        {/* Sous-titre élégant */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-muted-foreground font-playfair font-light leading-relaxed">
            Découvrez nos prochaines représentations,<br />
            ateliers et événements artistiques
          </p>
        </motion.div>

        {/* Navigation rapide */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {['Spectacles', 'Ateliers', 'Événements'].map((category, index) => (
            <motion.button
              key={category}
              className="text-foreground/70 hover:text-primary transition-colors duration-300 font-playfair tracking-wide"
              whileHover={{ 
                y: -2,
                scale: 1.05
              }}
              transition={{ duration: 0.3 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}