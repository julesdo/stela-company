"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { locales, localeNames, localeFlags, defaultLocale, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const menuTranslations: Record<Locale, Record<string, string>> = {
  fr: {
    about: "À propos",
    ateliers: "Ateliers",
    equipe: "Équipe",
    engagements: "Engagements",
    contact: "Contact",
  },
  de: {
    about: "Über uns",
    ateliers: "Workshops",
    equipe: "Team",
    engagements: "Engagement",
    contact: "Kontakt",
  },
  en: {
    about: "About",
    ateliers: "Workshops",
    equipe: "Team",
    engagements: "Commitments",
    contact: "Contact",
  },
  sr: {
    about: "О нама",
    ateliers: "Радионице",
    equipe: "Тим",
    engagements: "Ангажовање",
    contact: "Контакт",
  },
}

const MENU_ITEMS = [
  { key: "about", href: "/about" },
  { key: "ateliers", href: "/ateliers" },
  { key: "equipe", href: "/equipe" },
  { key: "engagements", href: "/engagements" },
  { key: "contact", href: "/contact" },
]

export default function TopNavbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  // Locale detection
  const pathSegments = pathname.split("/").filter(Boolean)
  const firstSegment = pathSegments[0]
  const isValidLocale = firstSegment && locales.includes(firstSegment as Locale)
  const currentLocale: Locale = isValidLocale ? (firstSegment as Locale) : defaultLocale
  const homeHref = currentLocale === defaultLocale ? "/" : `/${currentLocale}`

  const getLocalizedHref = (href: string): string => {
    if (currentLocale === defaultLocale) return href
    return `/${currentLocale}${href}`
  }

  const getTranslatedLabel = (key: string): string => {
    return menuTranslations[currentLocale][key] || menuTranslations[defaultLocale][key]
  }

  // Language switcher helpers
  const pathWithoutLocale = isValidLocale
    ? pathname.split("/").slice(2).join("/")
    : pathname.slice(1)

  const getLocaleHref = (loc: Locale): string => {
    return loc === "fr"
      ? pathWithoutLocale ? `/${pathWithoutLocale}` : "/"
      : pathWithoutLocale ? `/${loc}/${pathWithoutLocale}` : `/${loc}`
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navLinkVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.07, duration: 0.4, ease: "easeOut" },
    }),
  }

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-gray-100/80 shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-8 h-20">

          {/* Logo */}
          <Link href={homeHref} className="flex-shrink-0">
            <img
              src="/logo-stela.svg"
              alt="La Stela Company"
              className="h-12 w-auto hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {MENU_ITEMS.map((item, i) => {
              const localizedHref = getLocalizedHref(item.href)
              const isActive =
                pathname === item.href ||
                pathname === localizedHref ||
                (isValidLocale && pathname === `/${currentLocale}${item.href}`)

              return (
                <motion.div
                  key={item.href}
                  custom={i}
                  variants={navLinkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={localizedHref}
                    className={cn(
                      "relative text-xs tracking-[0.18em] uppercase font-light transition-colors duration-300 group",
                      isActive ? "text-black" : "text-black/50 hover:text-black"
                    )}
                  >
                    {getTranslatedLabel(item.key)}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px bg-black transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Right side: language + hamburger */}
          <div className="flex items-center gap-4">

            {/* Language switcher */}
            <div
              className="relative"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 text-xs tracking-wider uppercase font-light text-black/60 hover:text-black transition-colors duration-300"
              >
                <span>{localeFlags[currentLocale]}</span>
                <span>{currentLocale.toUpperCase()}</span>
                <motion.svg
                  className="w-2.5 h-2.5 opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-3 bg-white/97 backdrop-blur-md border border-black/8 rounded-2xl shadow-lg overflow-hidden min-w-[140px]"
                  >
                    {locales.map((loc) => {
                      const isActive = loc === currentLocale
                      return (
                        <Link
                          key={loc}
                          href={getLocaleHref(loc)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 text-xs tracking-wide transition-all duration-200",
                            isActive
                              ? "bg-black/5 text-black font-medium"
                              : "text-black/60 hover:bg-black/5 hover:text-black"
                          )}
                        >
                          <span className="text-sm">{localeFlags[loc]}</span>
                          <span className="font-light">{localeNames[loc]}</span>
                          {isActive && (
                            <motion.div
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-black"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            />
                          )}
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger mobile */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <span className="block w-6 h-px bg-black transition-all duration-300" />
              <span className="block w-4 h-px bg-black transition-all duration-300 self-end" />
              <span className="block w-6 h-px bg-black transition-all duration-300" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col h-full px-8 py-8">
              {/* Header overlay */}
              <div className="flex items-center justify-between mb-16">
                <Link href={homeHref} onClick={() => setMobileOpen(false)}>
                  <img src="/logo-stela.svg" alt="La Stela Company" className="h-10 w-auto" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-black/60 hover:text-black transition-colors"
                  aria-label="Fermer le menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile nav links */}
              <nav className="flex flex-col gap-6 flex-1">
                {MENU_ITEMS.map((item, i) => {
                  const localizedHref = getLocalizedHref(item.href)
                  const isActive =
                    pathname === item.href ||
                    pathname === localizedHref ||
                    (isValidLocale && pathname === `/${currentLocale}${item.href}`)

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
                    >
                      <Link
                        href={localizedHref}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "text-3xl font-light tracking-wide transition-colors duration-200",
                          isActive ? "text-black" : "text-black/40 hover:text-black"
                        )}
                        style={{ fontFamily: "var(--font-dancing-script)" }}
                      >
                        {getTranslatedLabel(item.key)}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Language switcher mobile */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100">
                {locales.map((loc) => {
                  const isActive = loc === currentLocale
                  return (
                    <Link
                      key={loc}
                      href={getLocaleHref(loc)}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-1.5 text-xs tracking-widest uppercase transition-colors duration-200",
                        isActive ? "text-black font-medium" : "text-black/40 hover:text-black"
                      )}
                    >
                      <span>{localeFlags[loc]}</span>
                      <span>{loc.toUpperCase()}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
