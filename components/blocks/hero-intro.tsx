"use client"

import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import MagneticButton from "@/components/ui/magnetic-button"

export default function HomeIntroSection() {
  // Scroll-based parallax for decorative shapes
  const { scrollYProgress } = useScroll()
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 200])

  // Animation variants
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } }
  }
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 130, damping: 20 } }
  }
  const underline = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' as const, delay: 0.5 } }
  }

  return (
    <section className="relative w-full bg-background overflow-hidden py-20 px-6 md:px-12">

      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={container}
      >
        <motion.h1
          className="text-4xl md:text-6xl text-gray-900 leading-tight"
          variants={fadeInUp}
        >
          Découvrez notre univers
        </motion.h1>

        <motion.div
          className="h-[0.5px] bg-gray-900 origin-left my-6"
          variants={underline}
          style={{ transformOrigin: 'left center' }}
        />

        <motion.p
          className="text-lg md:text-xl text-gray-700 mb-8"
          variants={fadeInUp}
        >
          Plongez dans l’art sous toutes ses formes : danse, théâtre et langue se conjuguent pour vous offrir une expérience immersive et unique.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row justify-center gap-6" variants={fadeInUp}>
          <MagneticButton href="/cours" variant="link">
            Nos Cours
          </MagneticButton>
          <MagneticButton href="/studio" variant="link">
            En savoir plus
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
