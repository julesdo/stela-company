"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: "ACCUEIL", href: "/" },
  { label: "COURS", href: "/cours" },
  { label: "REPRÉSENTATIONS", href: "/rep" },
  { label: "CONTACT", href: "/contact" },
]

export default function ArtisticNavbar() {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // 1. ScrollTrigger : fond opaque + blur
  useEffect(() => {
    const nav = navRef.current!
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 60,
      onToggle: self => {
        gsap.to(nav, {
          backgroundColor: self.isActive
            ? ""
            : "transparent",
          backdropFilter: self.isActive ? "blur(10px)" : "blur(0px)",
          duration: 0.3,
        })
      },
    })
  }, [])

  // 2. Curseur custom
  useEffect(() => {
    const cur = cursorRef.current!
    const move = (e: MouseEvent) => {
      gsap.to(cur, { x: e.clientX, y: e.clientY, duration: 0.1 })
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  // 3. GSAP Hover pour glow + skew 3D
  useEffect(() => {
    if (!open) return
    const items = gsap.utils.toArray<HTMLElement>(".grand-nav-item")
    items.forEach(el => {
      const tl = gsap.timeline({ paused: true })
      tl.to(el, {
        scale: 1.1,
        skewX: 8,
        textShadow: "0 0 16px var(--color-secondary)",
        color: "white",
        opacity: 0.5,
        duration: 0.25,
        ease: "power3.out",
      })
      el.addEventListener("mouseenter", () => tl.play())
      el.addEventListener("mouseleave", () => tl.reverse())
    })
    return () => items.forEach(el => el.replaceWith(el.cloneNode(true)))
  }, [open])

  // 4. Framer Motion Variants
  const overlayVar = {
    hidden: { clipPath: "circle(0% at 95% 5%)" },
    visible: {
      clipPath: "circle(150% at 95% 5%)",
      transition: { duration: 0.6, ease: "expo.out" },
    },
  }

  const menuVar = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  }

  const linkVar = {
    hidden: { opacity: 0, y: 50, rotate: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  }

    // Variants communes pour les lignes
    const common = {
      stroke: "currentColor",
      strokeWidth: 2,
      vectorEffect: "non-scaling-stroke" as const,
    }
    const topVariants = {
      closed: { d: "M4 6h16", rotate: 0, translateY: 0 },
      open:   { d: "M4 4l16 16", rotate: 45, translateY: 0, translateX: 0 },
    }
    const middleVariants = {
      closed: { opacity: 1 },
      open:   { opacity: 0 },
    }
    const bottomVariants = {
      closed: { d: "M4 18h16", rotate: 0, translateY: 0 },
      open:   { d: "M4 20l16-16", rotate: -45, translateY: -10 , translateX: 0},
    }

  return (
    <>

      {/* Navbar */}
      <nav
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[9999] px-8 py-4 flex justify-between items-center font-body"
      >
        <Link href="/">
          <Image src="/logo-stela.svg" alt="logo" width={100} height={100} />
        </Link>
        <button
      className="relative flex items-center size-12 justify-center rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-white"
      onClick={() => setOpen(!open)}
    >
      <span
        className={`absolute h-0.5 w-8 bg-foreground transition-all ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-3 -translate-y-0 rotate-0"
        }`}
      />
      <span
        className={`absolute h-0.5 w-8 bg-foreground transition-all ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-6 -translate-y-1/2 rotate-0"
        }`}
      />
      <span
        className={`absolute h-0.5 w-8 bg-foreground transition-all ${
          open ? "opacity-0" : "top-9 -translate-y-full opacity-100"
        }`}
      />
    </button>
      </nav>

      {/* Overlay Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[50] bg-secondary flex flex-col items-center justify-center pt-20"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVar as any}
          >
            <motion.div variants={menuVar}>
              {LINKS.map((link, idx) => (
                <motion.h1
                  key={link.href}
                  className="grand-nav-item my-6 uppercase text-7xl tracking-widest text-white cursor-none z-[9999] font-cinzel"
                  variants={linkVar as any}
                >
                  <Link href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </motion.h1>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
