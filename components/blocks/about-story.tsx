"use client"

import React from "react"
import { motion } from "framer-motion"

export default function AboutStory() {
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
    <section className="py-32 px-6 md:px-12 lg:pr-20 bg-muted/10">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* En-tête de section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground mb-6">
            Notre Histoire
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        {/* Timeline narrative */}
        <div className="space-y-16">
          
          {/* Origines */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-6">
                <h3 className="text-3xl font-corinthia text-foreground">
                  Les Racines
                </h3>
                <div className="space-y-4 text-lg font-playfair leading-relaxed text-muted-foreground">
                  <p>
                    Née entre <strong className="text-foreground">France, Allemagne et Serbie</strong>, 
                    Stela Elena Stankovic puise dans cette richesse multiculturelle 
                    l'essence même de son art. Chaque langue portée en elle devient 
                    un instrument, chaque territoire un terrain d'exploration.
                  </p>
                  <p>
                    Cette multiplicité identitaire forge une artiste unique, 
                    capable de <span className="text-primary italic">transcender les barrières linguistiques</span> 
                    pour créer un langage universel fait de corps, de voix et d'émotions.
                  </p>
                </div>
              </div>
              <div className="md:col-span-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/30 rounded-full" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-2 border-secondary/40 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ligne décorative */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <div className="w-px h-16 bg-gradient-to-b from-primary/30 via-primary to-primary/30" />
          </motion.div>

          {/* Formation */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 md:order-2">
                <div className="relative">
                  <div className="w-24 h-24 bg-secondary/10 flex items-center justify-center">
                    <div className="w-10 h-10 bg-secondary/30" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 border border-accent/40" />
                </div>
              </div>
              <div className="md:col-span-8 md:order-1 md:text-right space-y-6">
                <h3 className="text-3xl font-corinthia text-foreground">
                  La Formation
                </h3>
                <div className="space-y-4 text-lg font-playfair leading-relaxed text-muted-foreground">
                  <p>
                    Des conservatoires européens aux studios underground, 
                    Stela forge sa technique dans la <strong className="text-foreground">discipline</strong> 
                    et nourrit sa créativité dans l'<span className="text-accent italic">expérimentation</span>.
                  </p>
                  <p>
                    Chaque rencontre, chaque maître, chaque collaboration 
                    devient une pierre supplémentaire dans l'édifice 
                    de sa vision artistique pluridisciplinaire.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ligne décorative */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <div className="w-px h-16 bg-gradient-to-b from-primary/30 via-primary to-primary/30" />
          </motion.div>

          {/* Naissance de la compagnie */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-6">
                <h3 className="text-3xl font-corinthia text-foreground">
                  La Stela Company
                </h3>
                <div className="space-y-4 text-lg font-playfair leading-relaxed text-muted-foreground">
                  <p>
                    En 2020, au cœur d'un monde en quête de connexion, 
                    naît <strong className="text-primary">La Stela Company</strong>. 
                    Plus qu'une compagnie, c'est un laboratoire vivant où 
                    <span className="italic">théâtre, danse et langues</span> se rencontrent 
                    et se réinventent.
                  </p>
                  <p>
                    Chaque création devient une invitation au voyage, 
                    chaque représentation un pont jeté entre les cultures, 
                    chaque atelier une exploration des <span className="text-accent">possibles artistiques</span>.
                  </p>
                </div>
              </div>
              <div className="md:col-span-4">
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-1 bg-secondary/40" />
                  <div className="absolute -bottom-3 -left-3 w-1 h-8 bg-secondary/40" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}