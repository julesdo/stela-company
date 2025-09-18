// components/blocks/about-hero.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import React from "react"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

export const AboutHero = ({
  data,
}: {
  data: any
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -40])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  const title = data?.title as string | undefined
  const kicker = data?.kicker as string | undefined
  const videoSrc = data?.videoSrc as string | undefined
  const poster = data?.poster as string | undefined

  return (
    <Section background={data?.background} className="px-0">
      <section ref={ref} className="px-0">
        <div className="relative w-full h-[70vh] md:h-[78vh] overflow-hidden" data-tina-field={tinaField(data)}>
          {videoSrc ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            poster && <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          )}
          <div className="absolute inset-0 bg-white/60 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />

          <motion.div
            style={{ y, opacity }}
            className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:pr-20 pb-10 md:pb-16"
          >
            {kicker && (
              <div className="text-sm tracking-wider uppercase text-black/55" data-tina-field={tinaField(data, 'kicker')}>{kicker}</div>
            )}
            {title && (
              <h1 className="mt-2 text-4xl md:text-6xl lg:text-7xl font-light text-black leading-[1.05]" data-tina-field={tinaField(data, 'title')}>
                {title}
              </h1>
            )}
          </motion.div>
        </div>
      </section>
    </Section>
  )
}

export const aboutHeroBlockSchema: Template = {
  name: 'aboutHero',
  label: 'About Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      kicker: 'À PROPOS',
      title: 'La Stela Company',
      poster: '/dance.jpg',
      videoSrc: '/hero-video.mp4'
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Kicker',
      name: 'kicker',
    },
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'image',
      label: 'Poster Image',
      name: 'poster',
    },
    {
      type: 'string',
      label: 'Video Src (mp4)',
      name: 'videoSrc',
      ui: { 
        description: 'Chemin relatif public/ ou URL complète',
      },
    },
  ],
}

export default function AboutHeroLegacy({
  title,
  kicker,
  videoSrc,
  poster,
}: {
  title: string
  kicker?: string
  videoSrc?: string
  poster?: string
}) {
  return <AboutHero data={{ title, kicker, videoSrc, poster }} />
}
