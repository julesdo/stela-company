"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import MagneticButton from "@/components/ui/magnetic-button"

export default function ArtisticHeroFullModern() {
  const columns = [
    {
      key: 'Danse',
      img: '/dance.jpg',
      desc: 'Libérez votre expression corporelle',
      href: '/cours',
      color: 'from-gray-100/0 to-gray-300/0 group-hover:from-primary/20 group-hover:to-primary',
    },
    {
      key: 'Théâtre',
      img: '/theatre.jpg',
      desc: 'Incarnez des rôles fascinants',
      href: '/studio',
      color: 'from-gray-100/0 to-gray-300/0 group-hover:from-primary/20 group-hover:to-primary',
    },
    {
      key: 'Langue',
      img: '/language.jpg',
      desc: 'Communiquez avec aisance',
      href: '/spectacles',
      color: 'from-gray-100/0 to-gray-300/0 group-hover:from-primary/20 group-hover:to-primary',
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'tween' as const, duration: 0.8 } },
  }
  const overlayVariants = {
    hidden: { height: 0 },
    hover: { height: '100%', transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
  }
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0, transition: { delay: 0.2 } },
  }

  return (
    <section className="w-full h-screen">
      <motion.div
        className="flex flex-col md:grid md:grid-cols-3 w-full mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {columns.map((col, i) => (
          <motion.div
            key={col.key}
            className="relative group w-full h-full overflow-hidden cursor-pointer bg-gradient-to-b"
            variants={cardVariants as any}
            whileHover="hover"
          >
            {/* gradient frame */}
            <div className={`absolute inset-0 h-full bg-gradient-to-b transition-colors ${col.color}`} />
            {/* inner card */}
            <motion.div
              className="relative w-full h-[80vh] bg-white overflow-hidden"
              initial="hidden"
              whileHover="hover"
            >
              {/* overlay slide-up */}
              <motion.div
                className="absolute z-50 bottom-0 left-0 w-full h-[80vh] bg-white/90 flex flex-col items-center justify-center"
                variants={overlayVariants}
                style={{ originY: 1 }}
              >
                <motion.h3 className="text-3xl font-bold text-gray-800 mb-2" variants={textVariants}>
                  {col.key}
                </motion.h3>
                <motion.p className="text-gray-600 mb-4 text-center" variants={textVariants}>
                  {col.desc}
                </motion.p>
                <motion.div variants={textVariants}>
                  <MagneticButton 
                    href={col.href} 
                    variant="outline"
                    label="Découvrir"
                  />
                </motion.div>
              </motion.div>
              {/* background image covers full width */}
              <Image src={col.img} alt={col.key} fill className="object-cover h-full" sizes="100vw" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
