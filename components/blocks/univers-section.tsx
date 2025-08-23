"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function UniversSection() {
  const univers = [
    {
      title: 'Créations',
      subtitle: 'Expression corporelle',
      image: '/dance.jpg',
      href: '/creations',
      number: '01'
    },
    {
      title: 'Ateliers',
      subtitle: 'Art dramatique',
      image: '/theatre.jpg',
      href: '/ateliers',
      number: '02'
    },
    {
      title: 'Engagements',
      subtitle: 'Communication',
      image: '/language.jpg',
      href: '/engagements',
      number: '03'
    }
  ]

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
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      } 
    }
  }

  return (
    <section className="py-32 px-6 md:px-12 lg:pr-20 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Titre épuré */}
        <motion.div 
          className="mb-24"
          variants={itemVariants as any}
        >
          <h2 className="text-3xl md:text-4xl font-light text-black tracking-wide">
            Nos Univers
          </h2>
          <div className="w-12 h-px bg-black mt-4 opacity-30" />
        </motion.div>

        {/* Layout vertical épuré */}
        <div className="space-y-24 md:space-y-32">
          {univers.map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants as any}
              className="group"
            >
              <Link href={item.href}>
                <div className={`
                  grid md:grid-cols-12 gap-8 md:gap-12 items-center
                  ${index % 2 === 1 ? 'md:direction-reverse' : ''}
                `}>
                  
                  {/* Image */}
                  <motion.div 
                    className={`
                      md:col-span-7 relative overflow-hidden
                      ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}
                    `}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                      
                      {/* Overlay noir subtil */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                      
                      {/* Numéro en overlay */}
                      <div className="absolute top-6 left-6">
                        <span className="text-white/70 text-sm font-light tracking-wider">
                          {item.number}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Contenu textuel */}
                  <div className={`
                    md:col-span-5 space-y-6
                    ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}
                  `}>
                    
                    {/* Titre principal */}
                    <motion.div
                      whileHover={{ x: index % 2 === 1 ? -5 : 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-black">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl font-light text-black/60 mt-2 tracking-wide">
                        {item.subtitle}
                      </p>
                    </motion.div>

                    {/* Ligne décorative */}
                    <motion.div
                      className="w-16 h-px bg-black/20"
                      whileHover={{ 
                        scaleX: 1.5,
                        backgroundColor: '#000000'
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Action */}
                    <motion.div
                      className="pt-4"
                      whileHover={{ x: index % 2 === 1 ? -3 : 3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-sm font-light text-black/70 tracking-wider uppercase">
                        Découvrir
                      </span>
                      <motion.svg
                        className="w-4 h-4 ml-2 inline-block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        whileHover={{ 
                          x: 3,
                          strokeWidth: 0.5
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}