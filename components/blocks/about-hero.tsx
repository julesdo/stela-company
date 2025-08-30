// components/blocks/about-hero.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import React from "react"

export default function AboutHero({
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
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]) // léger parallax
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  return (
    <section ref={ref} className="px-0">
      <div className="relative w-full h-[70vh] md:h-[78vh] overflow-hidden">
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
            <div className="text-sm tracking-wider uppercase text-black/55">{kicker}</div>
          )}
          <h1 className="mt-2 text-4xl md:text-6xl lg:text-7xl font-light text-black leading-[1.05]">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  )
}
