"use client"

import React from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/ui/magnetic-button"

export default function EquipeCollaboration() {
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
        className="max-w-5xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Vision collaborative */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground mb-12 leading-none">
            Une Création Collective
          </h2>
          
          <blockquote className="text-2xl md:text-3xl font-playfair font-light text-foreground leading-relaxed max-w-4xl mx-auto">
            "Chaque création naît de la rencontre entre des univers artistiques différents, 
            créant ensemble quelque chose de plus grand que la somme de nos talents individuels."
          </blockquote>
        </motion.div>

        {/* Collaborateurs */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto space-y-8 text-lg font-playfair text-muted-foreground leading-relaxed">
            <p>
              Au-delà de notre équipe permanente, nous collaborons régulièrement 
              avec des musiciens, des plasticiens, des écrivains et des artistes 
              de toutes disciplines pour enrichir nos créations.
            </p>
            
            <p className="text-foreground">
              Cette approche collaborative nous permet d'explorer 
              constamment de nouveaux territoires artistiques 
              et de repousser les limites de nos expressions.
            </p>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={itemVariants}
        >
          <div className="mb-8">
            <p className="text-xl font-playfair text-muted-foreground mb-8">
              Rejoignez l'aventure créative
            </p>
            
            <MagneticButton 
              href="/contact" 
              variant="outline"
              label="Nous contacter"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}