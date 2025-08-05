"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface MagneticLinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

export default function MagneticLink({ children, href, className = "" }: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!linkRef.current) return
    
    const rect = linkRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15
    
    linkRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    if (!linkRef.current) return
    linkRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.div className="inline-block">
      <Link
        ref={linkRef}
        href={href}
        className={`inline-block transition-all duration-300 ease-out ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          whileHover="hover"
          initial="idle"
          className="relative"
        >
          {/* Effet de fond subtil */}
          <motion.div
            className="absolute inset-0 rounded-lg bg-gray-100"
            variants={{
              idle: { opacity: 0, scale: 0.8 },
              hover: { 
                opacity: 0.3, 
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeOut" }
              }
            }}
          />
          
          {/* Contenu */}
          <motion.span
            className="relative block"
            variants={{
              idle: { letterSpacing: "0.05em" },
              hover: { 
                letterSpacing: "0.1em",
                transition: { duration: 0.3 }
              }
            }}
          >
            {children}
          </motion.span>
        </motion.div>
      </Link>
    </motion.div>
  )
}