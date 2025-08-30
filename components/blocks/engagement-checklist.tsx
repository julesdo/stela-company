// components/blocks/engagement-checklist.tsx
"use client"

import * as React from "react"
import { motion } from "framer-motion"

export type EngagementItem = { title: string; text: string }

export default function EngagementChecklist({ items }: { items: EngagementItem[] }) {
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.10, delayChildren: 0.04 } } }
  const row = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }

  return (
    <div className="relative">
      {/* ligne verticale fine centrée à gauche du texte */}
      <div className="pointer-events-none absolute left-6 md:left-8 top-0 bottom-0 w-px bg-black/10" />
      <motion.ul
        className="space-y-10 md:space-y-14 pl-12 md:pl-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {items.map((it, i) => (
          <motion.li key={i} variants={row as any} className="relative group">
            {/* point minimaliste */}
            <span
              aria-hidden
              className="absolute -left-10 md:-left-12 top-[10px] w-2.5 h-2.5 rounded-full bg-black/70 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="max-w-3xl">
              <h3 className="text-2xl md:text-3xl font-light text-black leading-[1.12]">{it.title}</h3>
              <p className="mt-3 text-[16px] md:text-[17px] text-black/80 leading-relaxed">
                {it.text}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
