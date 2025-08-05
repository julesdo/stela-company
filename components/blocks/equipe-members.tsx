"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const teamMembers = [
  {
    name: "Stela Elena Stankovic",
    role: "Fondatrice & Directrice Artistique",
    description: "Artiste pluridisciplinaire franco-germano-serbe, elle orchestre la vision créative de la compagnie entre danse, théâtre et langues.",
    image: "/team/stela.jpg"
  },
  {
    name: "Marie Dubois",
    role: "Chorégraphe Associée",
    description: "Spécialiste de la danse contemporaine, elle apporte sa sensibilité poétique aux créations de la compagnie.",
    image: "/team/marie.jpg"
  },
  {
    name: "Thomas Müller",
    role: "Metteur en Scène",
    description: "Dramaturge et metteur en scène, il explore les territoires narratifs entre les langues et les cultures.",
    image: "/team/thomas.jpg"
  }
]

export default function EquipeMembers() {
  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.4,
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
    <section className="py-32 px-6 md:px-12 lg:pr-20">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="space-y-24">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="group"
            >
              <div className={`
                grid lg:grid-cols-12 gap-16 lg:gap-20 items-center
                ${index % 2 === 1 ? 'lg:text-right' : ''}
              `}>
                
                {/* Image */}
                <motion.div
                  className={`
                    lg:col-span-4 
                    ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="aspect-[3/4] relative bg-muted">
                    {/* Placeholder pour les vraies photos */}
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <span className="text-muted-foreground font-playfair text-lg">
                        {member.name.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Contenu */}
                <div className={`
                  lg:col-span-8 space-y-6
                  ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}
                `}>
                  
                  {/* Nom */}
                  <motion.h3 
                    className="text-4xl md:text-5xl lg:text-6xl font-corinthia text-foreground leading-tight"
                    whileHover={{ 
                      x: index % 2 === 1 ? -5 : 5 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.name}
                  </motion.h3>

                  {/* Rôle */}
                  <p className="text-xl md:text-2xl font-playfair text-primary font-light">
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-lg md:text-xl font-playfair text-muted-foreground leading-relaxed max-w-2xl">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}