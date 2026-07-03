"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const upcomingEvents = [
  {
    id: 1,
    title: "Médée MEDEA — Extrait",
    type: "Danse · Théâtre · Musique",
    date: "2025-09-20",
    time: "à préciser",
    venue: "Festival du Saule",
    description: "Première présentation publique d'un extrait de 30 minutes de Médée MEDEA.",
    image: "",
    category: "danse"
  },
  {
    id: 2,
    title: "Médée MEDEA — Extrait",
    type: "Danse · Théâtre · Musique",
    date: "2026-01-29",
    time: "à préciser",
    venue: "Théâtre Douze, Paris",
    description: "Présentation d'un extrait de 20 minutes de Médée MEDEA au Théâtre Douze.",
    image: "",
    category: "danse"
  },
  {
    id: 3,
    title: "Médée MEDEA — Première",
    type: "Danse · Théâtre · Musique",
    date: "2026-11-13",
    time: "à préciser",
    venue: "Centre Culturel Daniel Sorano, Vincennes",
    description: "Première du spectacle complet Médée MEDEA.",
    image: "",
    category: "danse"
  }
]

export default function AgendaUpcoming() {
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
    hidden: { opacity: 0, y: 40 },
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
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-background">
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
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground mb-4">
            Prochains Événements
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground font-playfair max-w-2xl mx-auto">
            Ne manquez aucune de nos créations et participez à l'aventure artistique
          </p>
        </motion.div>

        {/* Liste des événements */}
        <div className="space-y-8">
          {upcomingEvents.map((event, index) => (
            <motion.article
              key={event.id}
              variants={itemVariants}
              className="group"
            >
              <div className={`
                grid lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 md:p-8
                border border-border/50 hover:border-primary/30 
                transition-all duration-500
                ${index % 2 === 1 ? 'lg:text-right' : ''}
              `}>
                
                {/* Image */}
                <motion.div
                  className={`
                    lg:col-span-5 relative overflow-hidden
                    ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="aspect-[4/3] relative bg-gradient-to-br from-muted to-muted/50">
                    {/* Badge catégorie épuré */}
                    <div className="absolute top-4 left-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Contenu */}
                <div className={`
                  lg:col-span-7 space-y-4
                  ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}
                `}>
                  
                  {/* Date */}
                  <div className={`${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                    <time className="text-primary font-playfair font-medium">
                      {new Date(event.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })} • {event.time}
                    </time>
                  </div>

                  {/* Titre */}
                  <motion.h3 
                    className="text-3xl md:text-4xl font-corinthia text-foreground leading-tight"
                    whileHover={{ 
                      x: index % 2 === 1 ? -5 : 5 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {event.title}
                  </motion.h3>

                  {/* Description */}
                  <p className="text-muted-foreground font-playfair leading-relaxed">
                    {event.description}
                  </p>

                  {/* Lieu */}
                  <div className={`${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                    <p className="text-sm text-foreground/70 font-playfair ${index % 2 === 1 ? 'lg:justify-end lg:flex lg:items-center lg:gap-2' : 'flex items-center gap-2'}">
                      <span className="text-primary">📍</span>
                      {event.venue}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>


      </motion.div>
    </section>
  )
}