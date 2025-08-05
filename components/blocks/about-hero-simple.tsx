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
    <section className="min-h-screen flex items-center py-24 px-6 md:px-12 lg:pr-20">
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
                <strong className="text-foreground font-medium">Stela Elena Stankovic</strong> 
                crée des ponts entre théâtre, danse et langues. 
                Née entre la France, l'Allemagne et la Serbie, 
                elle puise dans cette richesse multiculturelle 
                l'essence de son art.
              </p>
              
              <p>
                La Stela Company est un laboratoire artistique 
                où chaque discipline nourrit les autres, 
                créant des expériences qui transcendent 
                les frontières traditionnelles.
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