// components/blocks/creation-process.tsx
"use client"

import * as React from "react"
import { motion } from "framer-motion"

export type ProcessStep = { title: string; text: string }

export default function CreationProcess({ steps }: { steps: ProcessStep[] }) {
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.10, delayChildren: 0.04 } } }
  const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }

  return (
    <div className="relative">
      {/* ligne verticale fine et droite */}
      <div className="pointer-events-none absolute left-6 md:left-8 top-0 bottom-0 w-px bg-black/10" />

      <motion.ol
        className="space-y-10 md:space-y-14 pl-12 md:pl-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {steps.map((s, i) => (
          <motion.li key={i} variants={item as any} className="relative group">
            {/* point élégant */}
            <span
              aria-hidden
              className="
                absolute -left-10 md:-left-12 top-1.5
                w-2.5 h-2.5 rounded-full bg-black/70
                transition-transform duration-300 group-hover:scale-110
              "
            />
            {/* contenu */}
            <div className="max-w-3xl">
              <div className="text-[12px] tracking-wider uppercase text-black/45">Étape {String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-1.5 text-2xl md:text-3xl font-light text-black leading-[1.12]">{s.title}</h3>
              <p className="mt-3 text-[16px] md:text-[17px] text-black/80 leading-relaxed">{s.text}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  )
}
