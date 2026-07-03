"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutHeroSimple() {
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
    <section className="min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-20">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          
          {/* Contenu textuel */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 space-y-12"
          >
            {/* Titre */}
            <div>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-corinthia text-foreground leading-none mb-6">
                À propos
              </h1>
            </div>

            {/* Texte principal */}
            <div className="space-y-8 text-xl md:text-2xl leading-relaxed font-playfair font-light text-muted-foreground">
              <p>
                Danseuse et comédienne serbe-allemande née à Munich,
                <strong className="text-foreground font-medium"> Stela Elena Stankovic</strong>
                enchaîne les concours de danse en Allemagne, intègre la
                California Ballet Company de San Diego, étudie la sociologie
                et la philosophie à Paris, puis travaille à Los Angeles
                autour des méthodes de l'Actors Studio.
              </p>

              <p>
                La Stela Company, association née en mars 2024 et basée à Paris V,
                est née du besoin vital de rassembler théâtre, danse, musique
                et langues au sein d'un espace commun de créativité.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4"
          >
            <div className="aspect-[3/4] relative">
              <Image
                src="/stela.png"
                alt="Stela Elena Stankovic"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}