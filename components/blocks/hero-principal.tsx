"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function HeroPrincipal() {
  // Animation variants
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.4 } }
  }
  
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 150, 
        damping: 25,
        duration: 1.2 
      } 
    }
  }
  
  const baselineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: 'easeOut' } 
    }
  }
  
  const buttonVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    }
  }



  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden lg:pr-20">
      {/* Arrière-plan vidéo/image */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster="/dance.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <motion.div
        className="relative z-10 text-center"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Logo centré */}
        <motion.div
          className="mb-8"
          variants={logoVariants as any}
        >
          <Image 
            src="/logo.svg" 
            alt="La Stela Company"
            width={200}
            height={200}
            className="mx-auto"
            priority
          />
        </motion.div>

        {/* Baseline */}
        <motion.div
          variants={baselineVariants as any}
          className="mb-12"
        >
          <h1 className="text-2xl md:text-3xl font-light text-gray-800 tracking-wide">
            L'art sous toutes ses formes
          </h1>
          <p className="text-lg text-gray-600 mt-4 font-light">
            Danse • Théâtre • Langue
          </p>
        </motion.div>
      </motion.div>


    </section>
  )
}