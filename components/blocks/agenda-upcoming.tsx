"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// Données d'exemple des événements
const upcomingEvents = [
  {
    id: 1,
    title: "Corps en Mouvement",
    type: "Danse Contemporaine",
    date: "2024-02-15",
    time: "20h30",
    venue: "Théâtre de la Renaissance, Paris",
    description: "Une exploration poétique du corps et de l'espace, où la danse contemporaine rencontre la musique live.",
    image: "/events/dance-1.jpg",
    category: "danse"
  },
  {
    id: 2,
    title: "Fragments de Mémoire",
    type: "Théâtre",
    date: "2024-02-22",
    time: "19h00",
    venue: "Studio Théâtral, Berlin",
    description: "Un monologue introspectif sur l'identité et les racines, mêlant français, allemand et serbe.",
    image: "/events/theatre-1.jpg",
    category: "theatre"
  },
  {
    id: 3,
    title: "Atelier Voix & Mouvement",
    type: "Atelier",
    date: "2024-03-05",
    time: "14h00 - 17h00",
    venue: "Centre Culturel Belgrade",
    description: "Découvrez l'harmonie entre voix, mouvement et langues dans un atelier immersif.",
    image: "/events/workshop-1.jpg",
    category: "atelier"
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
    <section className="py-24 px-6 md:px-12 lg:pr-20 bg-background">
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