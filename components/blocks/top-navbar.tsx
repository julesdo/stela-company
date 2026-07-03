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
    creations: "Créations",
    ateliers: "Ateliers",
    equipe: "Équipe",
    engagements: "Engagements",
    contact: "Contact",
  },
  de: {
    about: "Über uns",
    creations: "Kreationen",
    ateliers: "Workshops",
    equipe: "Team",
    engagements: "Engagement",
    contact: "Kontakt",
  },
  en: {
    about: "About",
    creations: "Creations",
    ateliers: "Workshops",
    equipe: "Team",
    engagements: "Commitments",
    contact: "Contact",
  },
  sr: {
    about: "О нама",
    creations: "Креације",
    ateliers: "Радионице",
    equipe: "Тим",
    engagements: "Ангажовање",
    contact: "Контакт",
  },
}

// Liens principaux (centre)
const MENU_ITEMS = [
  { key: "about", href: "/about" },
  { key: "creations", href: "/representations" },
  { key: "ateliers", href: "/ateliers" },
  { key: "equipe", href: "/equipe" },
  { key: "engagements", href: "/engagements" },
]

// Tous les items pour le menu mobile
const ALL_ITEMS = [
  ...MENU_ITEMS,
  { key: "contact", href: "/contact" },
]

export default function TopNavbar() {
  const pathname = usePathname()
  const [pastHero, setPastHero] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  // Locale detection
  const pathSegments = pathname.split("/").filter(Boolean)
  const firstSegment = pathSegments[0]
  const isValidLocale = !!(firstSegment && locales.includes(firstSegment as Locale))
  const currentLocale: Locale = isValidLocale ? (firstSegment as Locale) : defaultLocale
  const homeHref = currentLocale === defaultLocale ? "/" : `/${currentLocale}`

  // Transparent uniquement sur la homepage, au-dessus du hero
  const isHome =
    pathSegments.length === 0 ||
    (pathSegments.length === 1 && locales.includes(pathSegments[0] as Locale))
  const isTransparent = isHome && !pastHero

  const getLocalizedHref = (href: string): string => {
    if (currentLocale === defaultLocale) return href
    return `/${currentLocale}${href}`
  }

  const getTranslatedLabel = (key: string): string => {
    return menuTranslations[currentLocale][key] || menuTranslations[defaultLocale][key]
  }

  const isLinkActive = (href: string): boolean => {
    const localizedHref = getLocalizedHref(href)
    return (
      pathname === href ||
      pathname === localizedHref ||
      (isValidLocale && pathname === `/${currentLocale}${href}`)
    )
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
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight - 80)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navLinkVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 + i * 0.06, duration: 0.4, ease: "easeOut" },
    }),
  }

  const linkColor = isTransparent
    ? "text-white/75 hover:text-white"
    : "text-black/50 hover:text-black"
  const linkActiveColor = isTransparent ? "text-white" : "text-black"
  const underlineColor = isTransparent ? "bg-white" : "bg-black"

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500",
          isTransparent
            ? "bg-transparent border-transparent shadow-none"
            : "bg-white/95 backdrop-blur-sm border-gray-100/80 shadow-sm"
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-8 h-20">

          {/* Logo */}
          <Link href={homeHref} className="flex-shrink-0">
            <motion.img
              src="/logo-stela.svg"
              alt="La Stela Company"
              className="h-10 w-auto hover:opacity-80 transition-opacity duration-300"
              animate={{
                filter: isTransparent ? "invert(1) brightness(2)" : "invert(0) brightness(1)",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </Link>

          {/* Nav desktop — centre */}
          <nav className="hidden lg:flex items-center gap-7">
            {MENU_ITEMS.map((item, i) => (
              <motion.div key={item.href} custom={i} variants={navLinkVariants} initial="hidden" animate="visible">
                <Link
                  href={getLocalizedHref(item.href)}
                  className={cn(
                    "relative text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-300 group",
                    isLinkActive(item.href) ? linkActiveColor : linkColor
                  )}
                >
                  {getTranslatedLabel(item.key)}
                  <span className={cn(
                    "absolute -bottom-0.5 left-0 h-px transition-all duration-300",
                    underlineColor,
                    isLinkActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Droite : Contact · Lang · Burger */}
          <div className="flex items-center gap-5">

            {/* Contact — desktop only */}
            <Link
              href={getLocalizedHref("/contact")}
              className={cn(
                "hidden lg:inline-block text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-300",
                isLinkActive("/contact") ? linkActiveColor : linkColor
              )}
            >
              {getTranslatedLabel("contact")}
            </Link>

            {/* Séparateur vertical */}
            <span className={cn(
              "hidden lg:block w-px h-4 transition-colors duration-500",
              isTransparent ? "bg-white/30" : "bg-black/15"
            )} />

            {/* Language switcher */}
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase font-light transition-colors duration-300",
                  isTransparent ? "text-white/75 hover:text-white" : "text-black/50 hover:text-black"
                )}
              >
                <span className="text-xs">{localeFlags[currentLocale]}</span>
                <span>{currentLocale.toUpperCase()}</span>
                <motion.svg
                  className="w-2 h-2 opacity-50"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
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
                    className="absolute top-full right-0 mt-4 bg-white/98 backdrop-blur-md border border-black/8 rounded-2xl shadow-lg overflow-hidden min-w-[140px]"
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
                              : "text-black/55 hover:bg-black/4 hover:text-black"
                          )}
                        >
                          <span className="text-sm">{localeFlags[loc]}</span>
                          <span className="font-light">{localeNames[loc]}</span>
                          {isActive && (
                            <motion.div
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-black"
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
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
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <span className={cn("block w-5 h-px transition-all duration-300", isTransparent ? "bg-white" : "bg-black")} />
              <span className={cn("block w-5 h-px transition-all duration-300", isTransparent ? "bg-white" : "bg-black")} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white lg:hidden flex flex-col"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 h-20 border-b border-gray-100/60 flex-shrink-0">
              <Link href={homeHref} onClick={() => setMobileOpen(false)}>
                <img src="/logo-stela.svg" alt="La Stela Company" className="h-9 w-auto" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors"
                aria-label="Fermer le menu"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col justify-center flex-1 px-8 gap-2">
              {ALL_ITEMS.map((item, i) => {
                const isActive = isLinkActive(item.href)
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: "easeOut" }}
                  >
                    <Link
                      href={getLocalizedHref(item.href)}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block text-4xl font-light py-2 transition-colors duration-200",
                        isActive ? "text-black" : "text-black/30 hover:text-black"
                      )}
                      style={{ fontFamily: "var(--font-dancing-script)" }}
                    >
                      {getTranslatedLabel(item.key)}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Bottom: lang switcher */}
            <div className="px-8 py-8 border-t border-gray-100/60 flex items-center gap-6">
              {locales.map((loc) => {
                const isActive = loc === currentLocale
                return (
                  <Link
                    key={loc}
                    href={getLocaleHref(loc)}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-1.5 text-xs tracking-widest uppercase transition-colors duration-200",
                      isActive ? "text-black font-medium" : "text-black/35 hover:text-black"
                    )}
                  >
                    <span>{localeFlags[loc]}</span>
                    <span>{loc.toUpperCase()}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
