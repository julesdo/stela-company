"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const MENU_ITEMS = [
  { label: "À propos", href: "/about" },
  { label: "Ateliers", href: "/ateliers" },
  { label: "Equipe", href: "/equipe" },
  { label: "Contact", href: "/contact" },
]

export default function SidebarMenu() {
  const pathname = usePathname()
  const [isInverted, setIsInverted] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  // Fonction pour détecter automatiquement le contraste du contenu derrière le logo
  const checkContrast = async () => {
    if (!logoRef.current) return

    try {
      // Créer un canvas pour analyser les pixels
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Définir la taille du canvas (plus grande pour une meilleure précision)
      canvas.width = 100
      canvas.height = 100

      // Obtenir la position du logo
      const logoRect = logoRef.current.getBoundingClientRect()
      const x = logoRect.left + logoRect.width / 2 - 50
      const y = logoRect.top + logoRect.height / 2 - 50

      // Capturer le contenu derrière le logo avec html2canvas si disponible, sinon fallback
      if (typeof (window as any).html2canvas !== 'undefined') {
        const canvas2 = await (window as any).html2canvas(document.body, {
          x: x,
          y: y,
          width: 100,
          height: 100,
          useCORS: true,
          allowTaint: true,
          scale: 1
        })
        ctx.drawImage(canvas2, 0, 0)
      } else {
        // Fallback : analyser les éléments DOM à la position du logo
        const elementAtPosition = document.elementFromPoint(x + 50, y + 50)
        if (elementAtPosition) {
          const computedStyle = window.getComputedStyle(elementAtPosition)
          const backgroundColor = computedStyle.backgroundColor
          const backgroundImage = computedStyle.backgroundImage
          
          // Analyser la couleur de fond
          if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
            const rgb = backgroundColor.match(/\d+/g)
            if (rgb && rgb.length >= 3) {
              const r = parseInt(rgb[0])
              const g = parseInt(rgb[1])
              const b = parseInt(rgb[2])
              const brightness = (r * 299 + g * 587 + b * 114) / 1000
              setIsInverted(brightness < 128)
              return
            }
          }
          
          // Analyser les classes CSS pour détecter les arrière-plans sombres
          const element = elementAtPosition.closest('[class*="bg-"]')
          if (element) {
            const className = element.className
            const isDark = /bg-(black|gray-900|gray-800|slate-900|slate-800|zinc-900|zinc-800|neutral-900|neutral-800|stone-900|stone-800)/.test(className)
            setIsInverted(isDark)
            return
          }
        }
      }

      // Analyser les pixels capturés
      const imageData = ctx.getImageData(0, 0, 100, 100)
      const data = imageData.data
      
      let totalBrightness = 0
      let pixelCount = 0
      let darkPixelCount = 0

      // Calculer la luminosité moyenne et compter les pixels sombres
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const alpha = data[i + 3]
        
        // Ignorer les pixels transparents
        if (alpha > 50) { // Seuil d'opacité plus strict
          const brightness = (r * 299 + g * 587 + b * 114) / 1000
          totalBrightness += brightness
          pixelCount++
          
          // Compter les pixels sombres
          if (brightness < 100) { // Seuil plus strict pour les pixels sombres
            darkPixelCount++
          }
        }
      }

      if (pixelCount > 0) {
        const averageBrightness = totalBrightness / pixelCount
        const darkPixelRatio = darkPixelCount / pixelCount
        
        // Inverser le logo si :
        // 1. Luminosité moyenne < 140 (seuil plus sensible)
        // 2. OU plus de 60% de pixels sombres
        const shouldInvert = averageBrightness < 140 || darkPixelRatio > 0.6
        setIsInverted(shouldInvert)
      }

    } catch (error) {
      console.warn('Erreur lors de la détection du contraste:', error)
      // Fallback basé sur la position de scroll
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      setIsInverted(scrollY < viewportHeight * 0.4)
    }
  }

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkContrast()
          ticking = false
        })
        ticking = true
      }
    }

    // Intersection Observer pour détecter les sections sombres
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const className = element.className
            
            // Détecter les sections sombres (critères étendus)
            const isDark = /bg-(black|gray-900|gray-800|gray-700|slate-900|slate-800|slate-700|zinc-900|zinc-800|zinc-700|neutral-900|neutral-800|neutral-700|stone-900|stone-800|stone-700)/.test(className) ||
                          className.includes('hero') ||
                          className.includes('video') ||
                          element.querySelector('video') !== null ||
                          element.querySelector('img[src*="dark"], img[src*="black"]') !== null
            
            if (isDark) {
              setIsInverted(true)
            } else {
              // Vérifier le contraste réel
              checkContrast()
            }
          }
        })
      },
      {
        rootMargin: '-80px 0px -80px 0px', // Zone plus précise autour du logo
        threshold: 0.05 // Seuil plus sensible
      }
    )

    // Observer toutes les sections
    const sections = document.querySelectorAll('section, div[class*="bg-"], [class*="hero"]')
    sections.forEach(section => observer.observe(section))

    window.addEventListener('scroll', handleScroll, { passive: true })
    checkContrast() // Vérifier au chargement initial

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  }

  return (
    <>
      {/* Logo fixe en haut à gauche */}
      <motion.div
        ref={logoRef}
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link href="/">
          <motion.img 
            src="/logo-stela.svg" 
            alt="La Stela Company"
            className="h-16 w-auto hover:scale-105 transition-transform duration-300"
            animate={{
              filter: isInverted ? 'invert(1) brightness(0.9) contrast(1.1)' : 'invert(0) brightness(1) contrast(1)',
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          />
        </Link>
      </motion.div>

      {/* Sidebar fine à droite */}
      <motion.aside
        className="fixed right-0 top-0 h-screen w-20 bg-white/90 backdrop-blur-sm border-l border-gray-200/50 z-40 lg:flex flex-col justify-center items-center hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants as any}
      >
        <nav className="flex flex-col space-y-6">
          {MENU_ITEMS.map((item, index) => {
            const isActive = pathname === item.href
            
            return (
              <motion.div
                key={item.href}
                variants={itemVariants as any}
                className="group relative"
                whileHover="hover"
                animate={isActive ? "active" : "idle"}
              >
                <Link
                  href={item.href}
                  className="block relative"
                >
                  <div className="relative flex flex-col items-center py-2">
                    {/* Texte vraiment vertical avec animations */}
                    <motion.span 
                      className="text-xs font-light whitespace-nowrap cursor-pointer"
                      style={{ 
                        writingMode: 'vertical-rl', 
                        textOrientation: 'upright'
                      }}
                      variants={{
                        idle: { 
                          color: '#6B7280',
                          letterSpacing: '0.1em',
                          scale: 1
                        },
                        hover: { 
                          color: '#111827',
                          letterSpacing: '0.15em',
                          scale: 1.03,
                          transition: { duration: 0.3, ease: "easeOut" }
                        },
                        active: { 
                          color: '#000000',
                          letterSpacing: '0.2em',
                          scale: 1.05,
                          fontWeight: 500
                        }
                      }}
                    >
                      {item.label.toUpperCase()}
                    </motion.span>
                    
                    {/* Barre gauche animée */}
                    <motion.div
                      className="absolute -left-6 top-0 bottom-0 w-0.5 bg-gray-900 origin-top"
                      variants={{
                        idle: { 
                          scaleY: 0,
                          opacity: 0
                        },
                        hover: { 
                          scaleY: 0.7,
                          opacity: 0.6,
                          transition: { duration: 0.4, ease: "easeOut" }
                        },
                        active: { 
                          scaleY: 1,
                          opacity: 1
                        }
                      }}
                    />
                    
                    {/* Effet de fond sophistiqué */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent rounded-lg -mx-3"
                      variants={{
                        idle: { 
                          opacity: 0,
                          scaleX: 0
                        },
                        hover: { 
                          opacity: 0.4,
                          scaleX: 1,
                          transition: { duration: 0.3, ease: "easeOut" }
                        },
                        active: { 
                          opacity: 0.6,
                          scaleX: 1
                        }
                      }}
                    />
                    
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

      </motion.aside>
    </>
  )
}