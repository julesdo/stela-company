"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface MagneticButtonProps {
  children?: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: "outline" | "link"
  label?: string // Pour le texte sous le bouton outline
}

export default function MagneticButton({ 
  children, 
  href, 
  onClick, 
  className = "",
  variant = "outline",
  label
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.25
    const deltaY = (e.clientY - centerY) * 0.25
    
    buttonRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = 'translate(0px, 0px)'
  }

  // Bouton outline circulaire avec flèche rotative
  if (variant === "outline") {
    const content = (
      <motion.div
        className="flex flex-col items-center space-y-3"
        initial="idle"
        whileHover="hover"
      >
        {/* Cercle outline magnétique */}
        <motion.div
          ref={buttonRef}
          className={`
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
            rounded-full border border-black 
            flex items-center justify-center 
            cursor-pointer transition-all duration-500 ease-out
            ${className}
          `}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          variants={{
            idle: { 
              scale: 1,
              borderWidth: "1px"
            },
            hover: { 
              scale: 1.05,
              borderWidth: "2px",
              transition: { 
                duration: 0.4, 
                ease: "easeOut" 
              }
            }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Flèche avec rotation 40° */}
          <motion.svg 
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            variants={{
              idle: { 
                rotate: 0,
                strokeWidth: 1.5
              },
              hover: { 
                rotate: -40,
                strokeWidth: 1,
                transition: { 
                  duration: 0.6, 
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }
              }
            }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </motion.svg>
        </motion.div>

        {/* Label en dessous */}
        {label && (
          <motion.span
            className="text-xs sm:text-sm font-light text-black tracking-wide"
            variants={{
              idle: { 
                opacity: 0.7,
                y: 0,
                letterSpacing: "0.05em"
              },
              hover: { 
                opacity: 1,
                y: -2,
                letterSpacing: "0.1em",
                transition: { 
                  duration: 0.3, 
                  delay: 0.1 
                }
              }
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    )

    if (href) {
      return (
        <Link href={href} className="inline-block">
          {content}
        </Link>
      )
    }
    return content
  }

  // Bouton link hyper épuré avec micro-interactions
  const linkContent = (
    <motion.div
      ref={buttonRef}
      className={`
        inline-flex items-center space-x-2 sm:space-x-3
        text-black cursor-pointer group
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Texte avec effet subtil */}
      <motion.span 
        className="text-sm sm:text-base md:text-lg font-light relative"
        variants={{
          idle: { 
            letterSpacing: "0.02em",
            x: 0
          },
          hover: { 
            letterSpacing: "0.05em",
            x: 2,
            transition: { duration: 0.3 }
          },
          tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
          }
        }}
      >
        {children}
        
        {/* Ligne de soulignement animée */}
        <motion.div
          className="absolute -bottom-1 left-0 h-px bg-black origin-left"
          variants={{
            idle: { 
              scaleX: 0,
              opacity: 0
            },
            hover: { 
              scaleX: 1,
              opacity: 1,
              transition: { 
                duration: 0.4, 
                ease: "easeOut" 
              }
            }
          }}
        />
      </motion.span>

      {/* Flèche avec micro-animation */}
      <motion.svg
        className="w-3 h-3 sm:w-4 sm:h-4 text-black"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        variants={{
          idle: { 
            x: 0,
            opacity: 0.6,
            strokeWidth: 1.5
          },
          hover: { 
            x: 3,
            opacity: 1,
            strokeWidth: 1,
            transition: { 
              duration: 0.3,
              ease: "easeOut",
              delay: 0.1
            }
          },
          tap: {
            x: 1,
            transition: { duration: 0.1 }
          }
        }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M17 8l4 4m0 0l-4 4m4-4H3" 
        />
      </motion.svg>
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {linkContent}
      </Link>
    )
  }

  return linkContent
}