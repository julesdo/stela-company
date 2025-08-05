"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function TheatreHero() {
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
    <section className="grid lg:grid-cols-2 items-center py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="space-y-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Titre */}
        <motion.div
          variants={itemVariants}
        >
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-corinthia text-foreground leading-none">
            Théâtre
          </h1>
        </motion.div>

        {/* Sous-titre poétique */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          <p className="text-2xl md:text-3xl leading-relaxed font-playfair font-light text-muted-foreground">
            Où les mots prennent vie, 
            où l'âme se révèle.
          </p>
          
          <div className="w-16 h-px bg-primary" />
        </motion.div>

        {/* Description essence */}
        <motion.div
          variants={itemVariants}
          className="max-w-lg"
        >
          <p className="text-lg font-playfair text-muted-foreground leading-relaxed">
            Le théâtre selon Stela explore les profondeurs de l'être humain. 
            Chaque personnage porte une vérité universelle, chaque réplique 
            résonne avec l'expérience collective de l'humanité.
          </p>
        </motion.div>
      </motion.div>

      {/* Image artistique */}
      <motion.div
        className="relative lg:ml-12"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
      >
        <div className="aspect-[3/4] relative overflow-hidden max-w-sm mx-auto lg:mx-0">
          <Image
            src="https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=600&h=800&fit=crop&crop=center"
            alt="Théâtre et expression"
            fill
            className="object-cover transition-all duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Overlay artistique */}
          <div className="absolute inset-0 bg-foreground/20 hover:bg-transparent transition-all duration-500" />
        </div>
        
        {/* Éléments décoratifs minimalistes */}
        <motion.div 
          className="absolute -bottom-6 -right-6 w-24 h-24 border border-primary/30"
          whileHover={{ 
            scale: 1.1,
            borderColor: 'var(--primary)'
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </section>
  )
}