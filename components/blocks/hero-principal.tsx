"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

export const HeroPrincipal = ({ data }: { data: any }) => {
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



  const videoSrc = data?.videoSrc ?? "/hero-video.mov"
  const poster = data?.poster ?? "/dance.jpg"
  const headline = data?.headline ?? "L'art sous toutes ses formes"
  const subline = data?.subline ?? "Danse • Théâtre • Langues"

  return (
    <Section background={data?.background} className="relative w-full h-screen flex items-center justify-center overflow-hidden lg:pr-20">
      {/* Arrière-plan vidéo/image */}
      <div className="absolute inset-0 w-full h-full" data-tina-field={tinaField(data)}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster={poster}
          onError={(e) => {
            console.warn('Erreur de chargement vidéo:', e);
            // Fallback vers l'image poster si la vidéo ne charge pas
            const videoElement = e.target as HTMLVideoElement;
            videoElement.style.display = 'none';
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc} type="video/quicktime" />
          <source src={videoSrc} type="video/webm" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        {/* Fallback image si la vidéo ne charge pas */}
        <Image
          src={poster}
          alt="Arrière-plan"
          fill
          className="w-full h-full object-cover opacity-30"
          style={{ display: 'none' }}
          onLoad={(e) => {
            const videoElement = document.querySelector('video');
            if (videoElement && videoElement.style.display === 'none') {
              (e.target as HTMLImageElement).style.display = 'block';
            }
          }}
        />
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
          <h1 className="text-2xl md:text-8xl font-light text-gray-800 tracking-wide" data-tina-field={tinaField(data, 'headline')}>
            {headline}
          </h1>
          <p className="text-lg text-gray-600 mt-4 font-light" data-tina-field={tinaField(data, 'subline')}>
            {subline}
          </p>
        </motion.div>
      </motion.div>


    </Section>
  )
}

export const heroPrincipalBlockSchema: Template = {
  name: 'heroPrincipal',
  label: 'Hero Principal',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      headline: "L'art sous toutes ses formes",
      subline: 'Danse • Théâtre • Langues',
      videoSrc: '/hero-video.mov',
      poster: '/dance.jpg',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: 'string', name: 'headline', label: 'Headline' },
    { type: 'string', name: 'subline', label: 'Subline' },
    { type: 'string', name: 'videoSrc', label: 'Video Src' },
    { type: 'image', name: 'poster', label: 'Poster Image' },
  ],
}

export default function HeroPrincipalLegacy() {
  return <HeroPrincipal data={{}} />
}