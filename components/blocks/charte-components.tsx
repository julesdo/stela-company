"use client"

import React from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/ui/magnetic-button"

export default function CharteComponents() {
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
            Composants & Interactions
          </h2>
          
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
          
          <p className="text-xl md:text-2xl font-playfair font-light text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Éléments interactifs pensés pour une expérience utilisateur 
            fluide et poétique.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Boutons Magnétiques */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <h3 className="text-3xl font-corinthia text-foreground">
              Boutons Magnétiques
            </h3>
            
            <div className="space-y-6">
              <div className="p-6 bg-muted/5 rounded-sm">
                <h4 className="text-lg font-playfair text-foreground mb-4">
                  Bouton Outline
                </h4>
                <p className="text-sm font-playfair text-muted-foreground mb-6">
                  Cercle fin avec flèche, rotation 40° au hover, effet magnétique
                </p>
                <MagneticButton 
                  href="#" 
                  variant="outline"
                  label="Découvrir"
                />
              </div>

              <div className="p-6 bg-muted/5 rounded-sm">
                <h4 className="text-lg font-playfair text-foreground mb-4">
                  Bouton Link
                </h4>
                <p className="text-sm font-playfair text-muted-foreground mb-6">
                  Hyper épuré, soulignement animé, micro-interactions subtiles
                </p>
                <MagneticButton 
                  href="#" 
                  variant="link"
                  label="En savoir plus"
                />
              </div>
            </div>
          </motion.div>

          {/* Principes d'Animation */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <h3 className="text-3xl font-corinthia text-foreground">
              Animations & Transitions
            </h3>
            
            <div className="space-y-6">
              <motion.div 
                className="p-6 bg-muted/5 rounded-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-playfair text-foreground mb-3">
                  Hover Effects
                </h4>
                <p className="text-sm font-playfair text-muted-foreground">
                  Élévation subtile (-2px) et légère mise à l'échelle (1.02) 
                  pour un feedback visuel délicat.
                </p>
              </motion.div>

              <motion.div 
                className="p-6 bg-muted/5 rounded-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="text-lg font-playfair text-foreground mb-3">
                  Scroll Animations
                </h4>
                <p className="text-sm font-playfair text-muted-foreground">
                  Apparitions progressives (stagger) avec easing naturel 
                  et déclenchement optimisé.
                </p>
              </motion.div>

              <div className="p-6 bg-muted/5 rounded-sm">
                <h4 className="text-lg font-playfair text-foreground mb-3">
                  Image Transitions
                </h4>
                <div className="w-full h-20 bg-gradient-to-r from-muted via-primary/20 to-muted rounded-sm mb-3 
                              hover:from-primary/30 hover:via-accent/30 hover:to-primary/30 
                              transition-all duration-700"></div>
                <p className="text-sm font-playfair text-muted-foreground">
                  Transitions colorées fluides (700ms) pour les galeries 
                  et éléments visuels.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Guidelines de Design */}
        <motion.div
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-corinthia text-foreground mb-8">
            Principes Fondamentaux
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="space-y-3">
              <div className="text-2xl font-corinthia text-primary">
                3
              </div>
              <h4 className="text-lg font-playfair text-foreground">
                Sections Maximum
              </h4>
              <p className="text-sm font-playfair text-muted-foreground">
                Par page pour maintenir la clarté
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-2xl font-corinthia text-primary">
                0
              </div>
              <h4 className="text-lg font-playfair text-foreground">
                Formes Décoratives
              </h4>
              <p className="text-sm font-playfair text-muted-foreground">
                Épuré sans ornements superflus
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-2xl font-corinthia text-primary">
                1
              </div>
              <h4 className="text-lg font-playfair text-foreground">
                Bouton Maximum
              </h4>
              <p className="text-sm font-playfair text-muted-foreground">
                Si nécessaire, toujours magnétique
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-2xl font-corinthia text-primary">
                ∞
              </div>
              <h4 className="text-lg font-playfair text-foreground">
                Élégance
              </h4>
              <p className="text-sm font-playfair text-muted-foreground">
                Sophistication sans limite
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}