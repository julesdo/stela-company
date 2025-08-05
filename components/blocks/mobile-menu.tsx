"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const MENU_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Danse", href: "/danse" },
  { label: "Théâtre", href: "/theatre" },
  { label: "Langue", href: "/langue" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" }
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  }

  return (
    <>
      {/* Bouton hamburger pour mobile */}
      <button
        className="fixed top-8 right-8 z-50 lg:hidden bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} />
          <span className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`} />
        </div>
      </button>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 lg:hidden flex flex-col justify-center items-center"
            variants={menuVariants as any}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="text-center space-y-8">
              {MENU_ITEMS.map((item, index) => {
                const isActive = pathname === item.href
                
                return (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block text-3xl font-light transition-colors duration-300 ${
                        isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}