"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, lerp: 0.1, autoRaf: false })  // basic init :contentReference[oaicite:4]{index=4}

    function raf(time: number) {
      lenis.raf(time * 1000)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on("scroll", ScrollTrigger.update)  // sync Lenis → ScrollTrigger :contentReference[oaicite:5]{index=5}

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
}
