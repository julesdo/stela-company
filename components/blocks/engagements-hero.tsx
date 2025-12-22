// components/blocks/engagements-hero.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import React from "react"
import type { Template } from "tinacms"
import { tinaField } from "tinacms/dist/react"
import { Section, sectionBlockSchemaField } from "../layout/section"

export const EngagementsHero = ({
  data,
}: {
  data: any
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -40])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.1])

  const title = data?.title as string | undefined
  const kicker = data?.kicker as string | undefined
  const subtitle = data?.subtitle as string | undefined
  const backgroundImage = data?.backgroundImage as string | undefined

  return (
    <Section background={data?.background} className="px-0">
      <section ref={ref} className="px-0">
        <div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden" data-tina-field={tinaField(data)}>
          {backgroundImage && (
            <motion.div
              style={{ opacity: imageOpacity }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={backgroundImage}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/70" />
            </motion.div>
          )}
          {!backgroundImage && (
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/30" />
          )}

          <motion.div
            style={{ y, opacity }}
            className="relative z-10 px-6 md:px-12 lg:pr-20 py-16 md:py-24 w-full"
          >
            {kicker && (
              <div className="text-sm tracking-wider uppercase text-black/55 mb-4" data-tina-field={tinaField(data, 'kicker')}>{kicker}</div>
            )}
            {title && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-black leading-[1.05]" data-tina-field={tinaField(data, 'title')}>
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-4 text-lg md:text-xl text-black/70 max-w-2xl" data-tina-field={tinaField(data, 'subtitle')}>
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </Section>
  )
}

export const engagementsHeroBlockSchema: Template = {
  name: 'engagementsHero',
  label: 'Engagements Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      kicker: 'ENGAGEMENTS',
      title: 'Nos Engagements',
      subtitle: 'Éducation Artistique et Culturelle (EAC)',
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
      type: 'string',
      label: 'Subtitle',
      name: 'subtitle',
    },
    {
      type: 'image',
      label: 'Background Image',
      name: 'backgroundImage',
    },
  ],
}

export default EngagementsHero

