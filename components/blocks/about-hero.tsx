"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutHero() {
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
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        ease: 'easeOut' as const
      } 
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: 'easeOut' as const,
        delay: 0.4
      } 
    }
  }

  return (
    <section className="relative min-h-screen flex items-center py-24 px-6 md:px-12 lg:pr-20 overflow-hidden">
      {/* Arrière-plan artistique */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full bg-gradient-to-br from-background via-muted/10 to-primary/5">
          {/* Éléments décoratifs géométriques */}
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-primary rounded-full opacity-60" />
          <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-secondary/30 rounded-full" />
          <div className="absolute top-1/2 right-1/3 w-px h-20 bg-accent/20" />
        </div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Contenu textuel */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 space-y-8"
          >
            {/* Titre principal */}
            <div className="space-y-6">
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-corinthia text-foreground leading-none"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                À propos
              </motion.h1>
              
              <div className="w-20 h-px bg-primary" />
            </div>

            {/* Introduction poétique */}
            <motion.div
              className="space-y-6 text-xl md:text-2xl leading-relaxed text-foreground/90 font-playfair font-light"
              variants={itemVariants}
            >
              <p>
                <strong className="text-foreground font-medium">Stela Elena Stankovic</strong> 
                <span className="italic"> sculpte des ponts entre les âmes</span>, 
                tissant ensemble les fils invisibles qui unissent 
                <span className="text-primary"> théâtre, danse et langues</span>.
              </p>
              
              <p className="text-muted-foreground">
                Dans l'élan créatif de La Stela Company naît un laboratoire artistique 
                où chaque discipline nourrit les autres, créant une symphonie 
                d'expressions qui transcende les frontières.
              </p>
            </motion.div>

            {/* Citation signature */}
            <motion.blockquote 
              className="border-l-2 border-primary/30 pl-8 py-6 font-playfair italic text-lg"
              variants={itemVariants}
              whileHover={{ 
                borderColor: 'var(--primary)',
                paddingLeft: '2.5rem'
              }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-muted-foreground mb-4">
                "L'art véritable ne connaît pas de frontières. Il unit les cœurs 
                par-delà les mots, les gestes par-delà les cultures."
              </p>
              <footer className="text-sm text-foreground/70 tracking-wider">
                — Stela Elena Stankovic
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* Image artistique */}
          <motion.div
            variants={imageVariants}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Image principale */}
              <motion.div 
                className="relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className="aspect-[3/4] relative bg-gradient-to-br from-muted to-muted/30">
                  <Image
                    src="/stela.png"
                    alt="Stela Elena Stankovic"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  
                  {/* Overlay artistique */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-40 hover:opacity-0 transition-all duration-500" />
                </div>
              </motion.div>
              
              {/* Éléments décoratifs minimalistes */}
              <motion.div 
                className="absolute -bottom-6 -right-6 w-24 h-24 border border-primary/20"
                whileHover={{ 
                  scale: 1.1,
                  borderColor: 'var(--primary)'
                }}
                transition={{ duration: 0.4 }}
              />
              
              <motion.div 
                className="absolute -top-4 -left-4 w-4 h-4 bg-secondary/40"
                whileHover={{ 
                  scale: 1.3,
                  backgroundColor: 'var(--secondary)'
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}