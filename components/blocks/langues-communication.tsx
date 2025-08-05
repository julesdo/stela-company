"use client"

import React from "react"
import { motion } from "framer-motion"

const languageElements = [
  {
    title: "Expression",
    description: "Découvrir les nuances infinies de chaque idiome, où chaque mot porte l'histoire d'un peuple et révèle une vision unique du monde."
  },
  {
    title: "Culture",
    description: "Plonger dans l'âme des civilisations à travers leurs langues, comprendre les codes et les subtilités qui façonnent les mentalités."
  },
  {
    title: "Connexion", 
    description: "Tisser des liens authentiques au-delà des frontières, créer des ponts humains où la communication devient art de vivre."
  }
]

export default function LanguesCommunication() {
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
            L'Art de la Communication
          </h2>
          
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
          
          <p className="text-xl md:text-2xl font-playfair font-light text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Dans l'apprentissage des langues, Stela révèle les trésors cachés 
            de chaque culture à travers ses mots.
          </p>
        </motion.div>

        {/* Éléments des langues */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-16"
        >
          {languageElements.map((element, index) => (
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
            "Apprendre une langue, c'est gagner une nouvelle âme 
            et découvrir mille façons d'être humain."
          </blockquote>
          <footer className="text-lg font-playfair text-muted-foreground mt-8">
            — Stela Elena Stankovic
          </footer>
        </motion.div>
      </motion.div>
    </section>
  )
}