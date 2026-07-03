"use client"

import React from "react"
import { motion } from "framer-motion"

export default function AboutVision() {
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

  const disciplines = [
    {
      title: "Danse",
      description: "Le corps comme langage universel, exprimant ce que les mots ne peuvent dire",
      icon: "💃",
      color: "primary"
    },
    {
      title: "Théâtre", 
      description: "L'art de l'incarnation, donnant vie aux émotions et aux récits humains",
      icon: "🎭",
      color: "secondary"
    },
    {
      title: "Langues",
      description: "Les ponts sonores entre les cultures, révélant la beauté de la diversité",
      icon: "🗣️",
      color: "accent"
    }
  ]

  return (
    <section className="py-32 px-6 md:px-12 lg:px-20 bg-background">
      <motion.div
        className="max-w-7xl mx-auto"
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
            Notre Vision
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
          <p className="text-xl font-playfair text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ce projet est né du besoin vital de rassembler différentes pratiques —
            le théâtre, la danse, la musique et les langues — au sein d'un espace commun de créativité.
          </p>
        </motion.div>

        {/* Manifeste central */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-24"
        >
          <div className="max-w-4xl mx-auto">
            <motion.blockquote 
              className="text-2xl md:text-3xl font-playfair font-light text-foreground leading-relaxed"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-8">
                « La compagnie défend une vision de l'art qui permet de rassembler
                la <span className="text-primary italic">diversité des langues étrangères</span>
                afin de créer une œuvre commune. »
              </p>
            </motion.blockquote>
          </div>
        </motion.div>

        {/* Les trois piliers */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {disciplines.map((discipline, index) => (
            <motion.div
              key={discipline.title}
              variants={itemVariants}
              className="text-center group"
            >
              <motion.div
                className="mb-8"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">
                  {discipline.icon}
                </div>
                <h3 className="text-3xl font-corinthia text-foreground mb-4">
                  {discipline.title}
                </h3>
                <div className={`w-12 h-px bg-${discipline.color} mx-auto mb-6`} />
              </motion.div>
              
              <p className="text-lg font-playfair text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                {discipline.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Approche collaborative */}
        <motion.div
          variants={itemVariants}
          className="bg-muted/20 p-12 md:p-16 text-center"
        >
          <h3 className="text-4xl font-corinthia text-foreground mb-8">
            Une Approche Collaborative
          </h3>
          
          <div className="max-w-4xl mx-auto space-y-6 text-lg font-playfair text-muted-foreground leading-relaxed">
            <p>
              La Stela Company réunit des artistes venus de la danse, du théâtre et de la musique
              pour créer ensemble <strong className="text-foreground">Médée MEDEA</strong>,
              une œuvre qui place le corps, la voix et la mémoire émotionnelle au cœur du geste.
            </p>

            <p>
              Portée par les origines franco-serbo-allemandes de sa fondatrice, la compagnie
              crée des œuvres où les <span className="text-primary italic">langues étrangères</span>
              deviennent un matériau artistique à part entière.
            </p>
          </div>

          {/* Éléments décoratifs */}
          <div className="flex justify-center mt-12 space-x-8">
            <motion.div 
              className="w-3 h-3 bg-primary rounded-full"
              whileHover={{ scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="w-3 h-3 bg-secondary rounded-full"
              whileHover={{ scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="w-3 h-3 bg-accent rounded-full"
              whileHover={{ scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}