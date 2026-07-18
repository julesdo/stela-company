"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

export const HeroPrincipal = ({ data }: { data: any }) => {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } }
  }

  const kickerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: 'easeOut' } }
  }

  const lineVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  const scrollVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' } }
  }



  const videoSrc = data?.videoSrc ?? "/hero-video.mov"
  const poster = data?.poster ?? "/dance.jpg"
  const headline = data?.headline ?? "L'art sous toutes ses formes"
  const subline = data?.subline ?? "Danse • Théâtre • Langues"

  return (
    <Section background={data?.background} className="relative w-full h-screen flex items-center justify-center overflow-hidden -mt-20" data-hero-section>
      {/* Arrière-plan vidéo/image */}
      <div className="absolute inset-0 w-full h-full" data-tina-field={tinaField(data)}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={poster}
          onCanPlay={(e) => {
            const v = e.target as HTMLVideoElement;
            if (v.currentTime < 2) v.currentTime = 2;
          }}
          onError={(e) => {
            const videoElement = e.target as HTMLVideoElement;
            videoElement.style.display = 'none';
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc} type="video/quicktime" />
          <source src={videoSrc} type="video/webm" />
        </video>
        {/* Fallback image */}
        <Image
          src={poster}
          alt="Arrière-plan"
          fill
          className="w-full h-full object-cover"
          style={{ display: 'none' }}
          onLoad={(e) => {
            const videoElement = document.querySelector('video');
            if (videoElement && videoElement.style.display === 'none') {
              (e.target as HTMLImageElement).style.display = 'block';
            }
          }}
        />
        {/* Voile sombre minimal pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      </div>

      <motion.div
        className="relative z-10 text-center px-8 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Kicker */}
        <motion.p
          variants={kickerVariants as any}
          className="text-[10px] tracking-[0.55em] uppercase text-white/50 mb-8 font-light"
          data-tina-field={tinaField(data, 'subline')}
        >
          {subline}
        </motion.p>

        {/* Titre principal */}
        <motion.h1
          variants={titleVariants as any}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] mb-10"
          style={{ fontFamily: "var(--font-tan-aegean)" }}
          data-tina-field={tinaField(data, 'headline')}
        >
          {headline}
        </motion.h1>

        {/* Ligne fine */}
        <motion.div
          variants={lineVariants as any}
          className="w-10 h-px bg-white/35 mx-auto mb-14 origin-center"
        />

        {/* Scroll indicator */}
        <motion.div
          variants={scrollVariants as any}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[9px] tracking-[0.45em] uppercase text-white/35 font-light">
            Défiler
          </span>
          <motion.div
            className="w-px h-10 bg-white/25"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
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