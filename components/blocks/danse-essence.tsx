"use client"

import React from "react"
import { motion } from "framer-motion"

const danceElements = [
  {
    title: "Mouvement",
    description: "Exploration de la fluidité corporelle et de l'expression gestuelle, où chaque mouvement devient une phrase dans le langage universel du corps."
  },
  {
    title: "Émotion",
    description: "Transformation des sentiments en chorégraphie vivante, créant des ponts invisibles entre l'artiste et le spectateur."
  },
  {
    title: "Espace", 
    description: "Dialogue constant avec l'environnement, sculptant l'air et habitant chaque centimètre de la scène avec intention."
  }
]

export default function DanseEssence() {
  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.3,
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
        duration: 0.8, 
        ease: 'easeOut' as const
      } 
    }
  }

  return (
    <section className="py-32 px-6 md:px-12 lg:pr-20 bg-muted/5">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* En-tête */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground mb-12 leading-none">
            L'Art du Mouvement
          </h2>
          
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
          
          <p className="text-xl md:text-2xl font-playfair font-light text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Dans l'univers de la danse contemporaine, Stela explore les territoires 
            où le corps devient instrument de poésie pure.
          </p>
        </motion.div>

        {/* Éléments de la danse */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-16"
        >
          {danceElements.map((element, index) => (
            <motion.div
              key={element.title}
              className="text-center space-y-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-corinthia text-foreground">
                {element.title}
              </h3>
              
              <p className="text-lg font-playfair text-muted-foreground leading-relaxed">
                {element.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Citation inspirante */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-20"
        >
          <blockquote className="text-2xl md:text-3xl font-playfair font-light text-foreground leading-relaxed max-w-4xl mx-auto">
            "Danser, c'est écrire avec son corps des mots 
            que l'âme seule peut comprendre."
          </blockquote>
          <footer className="text-lg font-playfair text-muted-foreground mt-8">
            — Stela Elena Stankovic
          </footer>
        </motion.div>
      </motion.div>
    </section>
  )
}