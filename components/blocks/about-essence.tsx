"use client"

import React from "react"
import { motion } from "framer-motion"

export default function AboutEssence() {
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
    <section className="py-32 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Vision */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-corinthia text-foreground mb-12 leading-none">
            Notre Essence
          </h2>
          
          <blockquote className="text-2xl md:text-3xl font-playfair font-light text-foreground leading-relaxed">
            "L'art véritable naît dans l'espace où se rencontrent 
            la technique et l'émotion pure."
          </blockquote>
        </motion.div>

        {/* Disciplines */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-16 text-center mb-24"
        >
          <div>
            <h3 className="text-3xl font-corinthia text-foreground mb-4">
              Danse
            </h3>
            <p className="font-playfair text-muted-foreground leading-relaxed">
              Le corps comme langage universel, 
              exprimant ce que les mots ne peuvent dire.
            </p>
          </div>
          
          <div>
            <h3 className="text-3xl font-corinthia text-foreground mb-4">
              Théâtre
            </h3>
            <p className="font-playfair text-muted-foreground leading-relaxed">
              L'art de l'incarnation, 
              donnant vie aux émotions et aux récits humains.
            </p>
          </div>
          
          <div>
            <h3 className="text-3xl font-corinthia text-foreground mb-4">
              Langues
            </h3>
            <p className="font-playfair text-muted-foreground leading-relaxed">
              Les ponts sonores entre les cultures, 
              révélant la beauté de la diversité.
            </p>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto space-y-8 text-lg font-playfair text-muted-foreground leading-relaxed">
            <p>
              Chaque création de La Stela Company naît d'une collaboration 
              authentique entre artistes de différents horizons. 
              Nous explorons de nouvelles formes d'expression, 
              mélangeant traditions et innovations.
            </p>
            
            <p className="text-foreground">
              Notre mission est de créer des expériences artistiques 
              transformatrices qui révèlent la beauté 
              de notre humanité commune.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}