"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Extraire la locale actuelle du pathname
  const currentLocale = pathname.split('/')[1] as Locale;
  const isValidLocale = locales.includes(currentLocale);
  const locale = isValidLocale ? currentLocale : 'fr';
  
  // Obtenir le chemin sans la locale
  const pathWithoutLocale = isValidLocale 
    ? pathname.split('/').slice(2).join('/') 
    : pathname.slice(1);
  
  return (
    <motion.div
      className="fixed top-8 right-24 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="relative">
        {/* Bouton principal - affiche la langue actuelle */}
        <motion.button
          className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md border border-black/10 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg">{localeFlags[locale]}</span>
          <span className="text-xs font-light tracking-wider uppercase text-black/70 group-hover:text-black transition-colors">
            {locale.toUpperCase()}
          </span>
          <motion.svg
            className="w-3 h-3 text-black/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>

        {/* Menu déroulant */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-md border border-black/10 rounded-2xl shadow-lg overflow-hidden min-w-[140px]"
            >
              {locales.map((loc) => {
                const isActive = loc === locale;
                // Pour la page d'accueil (path vide), FR = /, autres langues = /de, /en, /sr
                // Pour les autres pages, FR = /page, autres = /de/page, /en/page, etc.
                const href = loc === 'fr' 
                  ? (pathWithoutLocale ? `/${pathWithoutLocale}` : '/')
                  : (pathWithoutLocale ? `/${loc}/${pathWithoutLocale}` : `/${loc}`);
                
                return (
                  <Link
                    key={loc}
                    href={href}
                    className={`
                      flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200
                      ${isActive 
                        ? 'bg-black/5 text-black font-medium' 
                        : 'text-black/60 hover:bg-black/5 hover:text-black'
                      }
                    `}
                    aria-label={`Switch to ${localeNames[loc]}`}
                  >
                    <span className="text-base">{localeFlags[loc]}</span>
                    <span className="font-light tracking-wide">{localeNames[loc]}</span>
                    {isActive && (
                      <motion.div
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-black"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      />
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

