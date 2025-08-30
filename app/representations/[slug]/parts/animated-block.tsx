"use client"

import { motion, useReducedMotion } from "framer-motion"
import React from "react"

export function AnimatedBlock({
  children,
  delay = 0,
  enter = false,     // NEW: force l’animation dès le montage (au premier chargement)
}: {
  children: React.ReactNode
  delay?: number
  enter?: boolean
}) {
  const reduced = useReducedMotion()
  if (reduced) return <>{children}</>

  const initial = { opacity: 0, y: 18 }
  const animate = { opacity: 1, y: 0 }
  const transition = { duration: 0.55, ease: "easeOut", delay }

  return enter ? (
    <motion.div initial={initial} animate={animate} transition={transition as any}>
      {children}
    </motion.div>
  ) : (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition as any}
    >
      {children}
    </motion.div>
  )
}
