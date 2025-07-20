/* hooks/useLenisScroll.ts */
"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // 1) Init Lenis with correct options
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      lerp: 0.1,
    })
    lenisRef.current = lenis

    // 2) Sync Lenis → ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    // 3) Add Lenis.raf to GSAP ticker
    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // 4) Clean up on unmount
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return lenisRef
}
