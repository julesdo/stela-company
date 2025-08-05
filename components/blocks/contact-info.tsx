"use client"

import React from "react"
import { motion } from "framer-motion"

const contactDetails = [
  {
    label: "Email",
    value: "hello@lastelacompany.com",
    type: "email"
  },
  {
    label: "Téléphone",
    value: "+33 1 23 45 67 89",
    type: "tel"
  },
  {
    label: "Adresse",
    value: "Paris • Berlin • Belgrade",
    type: "address"
  }
]

export default function ContactInfo() {
  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.3,
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
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Introduction */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-corinthia text-foreground mb-12 leading-none">
            Restons Connectés
          </h2>
          
          <p className="text-xl md:text-2xl font-playfair font-light text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Que ce soit pour une collaboration artistique, 
            un projet créatif ou simplement échanger sur l'art, 
            nous serions ravis de vous entendre.
          </p>
        </motion.div>

        {/* Informations de contact */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-16 text-center"
        >
          {contactDetails.map((detail, index) => (
            <div key={detail.label} className="space-y-4">
              <h3 className="text-2xl font-corinthia text-foreground">
                {detail.label}
              </h3>
              
              {detail.type === "email" ? (
                <a 
                  href={`mailto:${detail.value}`}
                  className="text-lg md:text-xl font-playfair text-primary hover:text-accent transition-colors duration-300 block"
                >
                  {detail.value}
                </a>
              ) : detail.type === "tel" ? (
                <a 
                  href={`tel:${detail.value.replace(/\s/g, '')}`}
                  className="text-lg md:text-xl font-playfair text-primary hover:text-accent transition-colors duration-300 block"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="text-lg md:text-xl font-playfair text-muted-foreground">
                  {detail.value}
                </p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Note personnelle */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-20"
        >
          <blockquote className="text-xl md:text-2xl font-playfair font-light text-foreground leading-relaxed max-w-3xl mx-auto">
            "Chaque rencontre artistique est une invitation à explorer 
            de nouveaux territoires créatifs ensemble."
          </blockquote>
          <footer className="text-lg font-playfair text-muted-foreground mt-6">
            — Stela Elena Stankovic
          </footer>
        </motion.div>
      </motion.div>
    </section>
  )
}