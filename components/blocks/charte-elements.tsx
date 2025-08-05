"use client"

import React from "react"
import { motion } from "framer-motion"

const colorPalette = [
  {
    name: "Primary",
    description: "Terracotta élégante",
    variable: "--primary",
    value: "oklch(0.55 0.08 35)",
    class: "bg-primary"
  },
  {
    name: "Secondary", 
    description: "Anthracite bleuté",
    variable: "--secondary",
    value: "oklch(0.35 0.01 240)",
    class: "bg-secondary"
  },
  {
    name: "Accent",
    description: "Bleu nuit sophistiqué", 
    variable: "--accent",
    value: "oklch(0.45 0.06 220)",
    class: "bg-accent"
  },
  {
    name: "Background",
    description: "Blanc cassé subtil",
    variable: "--background", 
    value: "oklch(98% 0.002 80)",
    class: "bg-background border"
  },
  {
    name: "Foreground",
    description: "Charbon profond",
    variable: "--foreground",
    value: "oklch(0.15 0.005 45)",
    class: "bg-foreground"
  },
  {
    name: "Muted",
    description: "Gris pierre clair",
    variable: "--muted",
    value: "oklch(0.88 0.008 60)", 
    class: "bg-muted"
  }
]

export default function CharteElements() {
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
    <section className="py-32 px-6 md:px-12 lg:pr-20 bg-muted/5">
      <motion.div
        className="max-w-7xl mx-auto"
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
            Couleurs & Typographie
          </h2>
          
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
          
          <p className="text-xl md:text-2xl font-playfair font-light text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Une palette sophistiquée et des typographies choisies 
            pour leur élégance intemporelle.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Palette de couleurs */}
          <motion.div
            variants={itemVariants}
          >
            <h3 className="text-3xl font-corinthia text-foreground mb-8">
              Palette Chromatique
            </h3>
            
            <div className="grid gap-4">
              {colorPalette.map((color, index) => (
                <motion.div
                  key={color.name}
                  className="flex items-center gap-4 p-4 bg-background rounded-sm border border-border/30"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-16 h-16 rounded-sm ${color.class} shadow-sm`} />
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-corinthia text-foreground">
                      {color.name}
                    </h4>
                    <p className="text-sm font-playfair text-muted-foreground mb-1">
                      {color.description}
                    </p>
                    <code className="text-xs font-mono text-foreground/70 bg-muted/50 px-2 py-1 rounded">
                      {color.value}
                    </code>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Typographie */}
          <motion.div
            variants={itemVariants}
          >
            <h3 className="text-3xl font-corinthia text-foreground mb-8">
              Hiérarchie Typographique
            </h3>
            
            <div className="space-y-8">
              {/* Corinthia - Titres */}
              <div className="p-6 bg-background rounded-sm border border-border/30">
                <h4 className="text-lg font-playfair text-muted-foreground mb-4">
                  Corinthia • Titres & Headers
                </h4>
                
                <div className="space-y-4">
                  <h2 className="text-4xl font-corinthia text-foreground mb-2">
                    Titre Principal
                  </h2>
                  <h3 className="text-2xl font-corinthia text-foreground mb-2">
                    Sous-titre Élégant
                  </h3>
                  <h4 className="text-xl font-corinthia text-foreground">
                    Section Header
                  </h4>
                </div>
                
                <p className="text-sm font-playfair text-muted-foreground mt-4">
                  Police script manuscrite apportant une touche artistique 
                  et personnelle aux titres.
                </p>
              </div>

              {/* Playfair Display - Corps */}
              <div className="p-6 bg-background rounded-sm border border-border/30">
                <h4 className="text-lg font-playfair text-muted-foreground mb-4">
                  Playfair Display • Corps de Texte
                </h4>
                
                <div className="space-y-3">
                  <p className="text-lg font-playfair text-foreground font-medium">
                    Texte principal medium
                  </p>
                  <p className="text-base font-playfair text-foreground">
                    Texte courant régulier pour une lecture confortable
                  </p>
                  <p className="text-sm font-playfair text-muted-foreground">
                    Texte secondaire en version atténuée
                  </p>
                </div>
                
                <p className="text-sm font-playfair text-muted-foreground mt-4">
                  Serif élégante offrant une excellente lisibilité 
                  et une esthétique raffinée.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}