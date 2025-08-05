"use client"

import React from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/ui/magnetic-button"

export default function AboutPhilosophy() {
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

  const values = [
    {
      title: "Authenticité",
      description: "Rester fidèle à notre essence tout en évoluant constamment"
    },
    {
      title: "Ouverture", 
      description: "Accueillir toutes les cultures et toutes les expressions artistiques"
    },
    {
      title: "Excellence",
      description: "Poursuivre sans relâche la qualité artistique et l'innovation"
    },
    {
      title: "Partage",
      description: "Transmettre notre passion et créer des liens durables"
    }
  ]

  return (
    <section className="py-32 px-6 md:px-12 lg:pr-20 bg-gradient-to-b from-muted/10 to-background">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* En-tête de section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground mb-6">
            Notre Philosophie
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        {/* Citation philosophique */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-24"
        >
          <blockquote className="text-2xl md:text-3xl font-playfair font-light text-foreground leading-relaxed max-w-4xl mx-auto">
            <p className="mb-8">
              "L'art véritable naît dans l'espace sacré où se rencontrent 
              <span className="text-primary italic"> la technique rigoureuse</span> 
              et <span className="text-accent italic">l'émotion pure</span>."
            </p>
          </blockquote>
        </motion.div>

        {/* Valeurs fondamentales */}
        <motion.div
          variants={itemVariants}
          className="mb-20"
        >
          <h3 className="text-3xl font-corinthia text-foreground text-center mb-16">
            Nos Valeurs Fondamentales
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="group"
              >
                <div className="p-8 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 mt-2">
                      <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-corinthia text-foreground">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground font-playfair leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission statement */}
        <motion.div
          variants={itemVariants}
          className="bg-muted/20 p-12 md:p-16 text-center"
        >
          <h3 className="text-4xl font-corinthia text-foreground mb-8">
            Notre Mission
          </h3>
          
          <div className="max-w-4xl mx-auto space-y-6 text-lg font-playfair text-muted-foreground leading-relaxed mb-12">
            <p>
              <strong className="text-foreground">Créer des expériences artistiques transformatrices</strong> 
              qui révèlent la beauté de notre humanité commune. 
              Nous explorons les territoires inexplorés de l'expression artistique 
              pour offrir au public des moments de <span className="text-primary italic">révélation et d'émotion pure</span>.
            </p>
            
            <p>
              À travers nos créations, nous aspirons à bâtir des ponts entre les communautés, 
              à célébrer la diversité culturelle et à nourrir l'âme humaine 
              par la <span className="text-accent">puissance transformatrice de l'art</span>.
            </p>
          </div>

          {/* Call to action */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <MagneticButton 
              href="/agenda" 
              variant="outline"
              label="Découvrir nos créations"
            />
            <MagneticButton 
              href="/contact" 
              variant="link"
            >
              Nous rencontrer
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Signature artistique */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-20"
        >
          <div className="relative inline-block">
            <p className="text-3xl font-corinthia text-primary">
              Stela Elena Stankovic
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-primary/30" />
          </div>
          <p className="text-sm font-playfair text-muted-foreground mt-4 tracking-wider">
            Fondatrice & Directrice Artistique
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}