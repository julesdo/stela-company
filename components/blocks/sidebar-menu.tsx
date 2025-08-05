"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const MENU_ITEMS = [
  { label: "Agenda", href: "/agenda" },
  { label: "Equipe", href: "/equipe" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export default function SidebarMenu() {
  const pathname = usePathname()

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
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link href="/">
          <img 
            src="/logo-stela.svg" 
            alt="La Stela Company"
            className="h-16 w-auto hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </motion.div>

      {/* Sidebar fine à droite */}
      <motion.aside
        className="fixed right-0 top-0 h-screen w-20 bg-white/90 backdrop-blur-sm border-l border-gray-200/50 z-40 lg:flex flex-col justify-center items-center hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <nav className="flex flex-col space-y-6">
          {MENU_ITEMS.map((item, index) => {
            const isActive = pathname === item.href
            
            return (
              <motion.div
                key={item.href}
                variants={itemVariants}
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