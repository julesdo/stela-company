"use client"

import React from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/ui/magnetic-button"

export default function ContactConnect() {
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
        {/* Invitation */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground mb-12 leading-none">
            Créons Ensemble
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8 text-lg font-playfair text-muted-foreground leading-relaxed">
            <p>
              Que vous soyez artiste, producteur, institution culturelle 
              ou simplement passionné d'art, nous sommes toujours ouverts 
              aux nouvelles collaborations et projets créatifs.
            </p>
            
            <p className="text-foreground text-xl">
              Écrivons ensemble le prochain chapitre 
              de cette aventure artistique.
            </p>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          variants={itemVariants}
        >
          <div className="mb-12">
            <p className="text-xl font-playfair text-muted-foreground mb-8">
              Commençons la conversation
            </p>
            
            <MagneticButton 
              href="mailto:hello@lastelacompany.com" 
              variant="outline"
              label="Nous écrire"
            />
          </div>
        </motion.div>

        {/* Réponse garantie */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <p className="text-sm font-playfair text-muted-foreground">
            Nous répondons personnellement à chaque message sous 48h
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}