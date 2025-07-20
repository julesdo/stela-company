// components/ArtisticHeroFull.tsx
"use client"

import dynamic from "next/dynamic"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import SplitText from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "../ui/button"
import Link from "next/link"

// 1) Dynamically import client-only modules
const ShaderGradientCanvas = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradientCanvas),
  { ssr: false }
)
const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false }
)


gsap.registerPlugin(SplitText, ScrollTrigger)

export default function ArtisticHeroFull() {
  // Refs
  const videoRef  = useRef<HTMLVideoElement>(null)
  const titleRef  = useRef<HTMLHeadingElement>(null)
  const ctaLeft   = useRef<HTMLAnchorElement>(null)
  const ctaCenter = useRef<HTMLAnchorElement>(null)
  const ctaRight  = useRef<HTMLAnchorElement>(null)
  const blobRef   = useRef<SVGPathElement>(null)
  const cutImgRef = useRef<HTMLImageElement>(null)

  // Parallax video — only in effect, no server/client branching
  useEffect(() => {
    if (!videoRef.current) return
    gsap.to(videoRef.current, {
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
  }, [])

  // SplitText for heading
  useEffect(() => {
    if (!titleRef.current) return
    const split = new SplitText(titleRef.current, { type: "lines" })
    gsap.from(split.lines, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
    })
  }, [])

  // CTA hover effects
  useEffect(() => {
    const buttons = [ctaLeft.current, ctaCenter.current, ctaRight.current].filter(Boolean)
    buttons.forEach((btn) => {
      const tl = gsap.timeline({ paused: true })
      tl.to(btn, {
        scale: 1.05,
        backgroundColor: "var(--color-secondary)",
        color: "var(--color-secondary-foreground)",
        boxShadow: "0 0 12px var(--color-accent)",
        duration: 0.3,
        ease: "power2.out",
      })
      btn?.addEventListener("mouseenter", () => tl.play())
      btn?.addEventListener("mouseleave", () => tl.reverse())
    })
    return () => {
      buttons.forEach((btn) => {
        btn?.removeEventListener("mouseenter", () => {})
        btn?.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  // Image clip-diagonal variants
  const imgVariants = {
    hidden: { x: 200, rotate: 5, opacity: 0 },
    visible: {
      x: 0,
      rotate: 0,
      opacity: 0.7,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  }

  // Framer Motion container
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, when: "beforeChildren" } },
  }
  const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 160, damping: 20 } },
  }

  return (
    <>
      {/* 0) Cursor */}

      <section className="relative h-screen w-screen overflow-hidden">

        {/* 3) Video clipped */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full"
          style={{ clipPath: "url(#clip-squiggle)" }}
        >
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
          />
        </div>
        <div
          className="absolute top-0 right-0 w-1/3 h-full"
          style={{ clipPath: "url(#clip-squiggle-reverse)" }}
        >
          <video
            ref={videoRef}
            src="/spectacle.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
          />
        </div>

        {/* 4) Image clipped */}
        <motion.img
          ref={cutImgRef}
          src="/dance.png"
          alt="Danseuse"
          className="absolute top-0 left-1/3 w-1/3 h-full object-cover"
          initial="hidden"
          animate="visible"
          variants={imgVariants as any}
        />

        {/* 6) Title & CTAs */}
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6"
          initial="hidden"
          animate="visible"
          variants={container as any}
        >
          <motion.h1
            ref={titleRef}
            className="text-7xl uppercase text-foreground leading-tight mb-4"
            variants={fadeUp as any}
          >
            <span className="block">Danse</span>
            <span className="block">Artistique</span>
          </motion.h1>

          <div className="relative w-full flex justify-between px-12 mt-8">
            <Button ref={ctaLeft as any} size="lg">
              <Link href="/cours">
                Cours
              </Link>
            </Button>

            <Button ref={ctaCenter as any} size="lg">
              <Link href="/studio">
                Studio
              </Link>
            </Button>

            <Button ref={ctaRight as any} size="lg">
              <Link href="/spectacles">
                Spectacles
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* 7) ClipPath definitions */}
        <svg className="absolute -top-[999px] -left-[999px] w-0 h-0">
          <defs>
            <clipPath id="clip-squiggle" clipPathUnits="objectBoundingBox">
              <path d="M0.434,0.005 C0.563,-0.002 0.715,-0.001 0.814,0.003 L0.803,0.164 C0.814,0.167 0.825,0.172 0.835,0.177 C0.869,0.194 0.909,0.226 0.908,0.273 C0.907,0.325 0.859,0.355 0.823,0.369 C0.857,0.377 0.895,0.388 0.926,0.404 C0.968,0.427 1.006,0.465 0.999,0.516 C0.993,0.565 0.951,0.598 0.904,0.616 C0.882,0.624 0.858,0.630 0.835,0.634 C0.858,0.639 0.882,0.647 0.903,0.657 C0.946,0.678 0.987,0.715 0.979,0.768 C0.972,0.812 0.936,0.843 0.895,0.862 C0.858,0.879 0.815,0.888 0.779,0.892 C0.705,0.902 0.614,0.901 0.535,0.899 C0.508,0.899 0.482,0.898 0.458,0.897 C0.405,0.896 0.358,0.894 0.317,0.895 C0.302,0.895 0.289,0.895 0.280,0.896 C0.252,0.937 0.226,0.981 0.216,1.000 L0,0.941 C0.014,0.916 0.051,0.852 0.090,0.798 C0.118,0.759 0.172,0.745 0.200,0.740 C0.168,0.734 0.134,0.724 0.105,0.708 C0.061,0.685 0.026,0.647 0.033,0.597 C0.039,0.548 0.080,0.515 0.127,0.497 C0.147,0.489 0.168,0.484 0.189,0.480 C0.164,0.476 0.138,0.471 0.115,0.464 C0.087,0.455 0.009,0.425 0.017,0.358 C0.023,0.303 0.084,0.276 0.116,0.266 C0.150,0.256 0.188,0.251 0.222,0.247 C0.209,0.244 0.196,0.239 0.184,0.234 C0.153,0.221 0.102,0.190 0.105,0.136 C0.108,0.095 0.144,0.068 0.171,0.054 C0.198,0.041 0.228,0.032 0.253,0.027 C0.306,0.015 0.371,0.009 0.434,0.005 Z" />
            </clipPath>
            <clipPath id="clip-squiggle-reverse" clipPathUnits="objectBoundingBox">
              <path d="M0.434,0.005 C0.563,-0.002 0.715,-0.001 0.814,0.003 L0.803,0.164 C0.814,0.167 0.825,0.172 0.835,0.177 C0.869,0.194 0.909,0.226 0.908,0.273 C0.907,0.325 0.859,0.355 0.823,0.369 C0.857,0.377 0.895,0.388 0.926,0.404 C0.968,0.427 1.006,0.465 0.999,0.516 C0.993,0.565 0.951,0.598 0.904,0.616 C0.882,0.624 0.858,0.630 0.835,0.634 C0.858,0.639 0.882,0.647 0.903,0.657 C0.946,0.678 0.987,0.715 0.979,0.768 C0.972,0.812 0.936,0.843 0.895,0.862 C0.858,0.879 0.815,0.888 0.779,0.892 C0.705,0.902 0.614,0.901 0.535,0.899 C0.508,0.899 0.482,0.898 0.458,0.897 C0.405,0.896 0.358,0.894 0.317,0.895 C0.302,0.895 0.289,0.895 0.280,0.896 C0.252,0.937 0.226,0.981 0.216,1.000 L0,0.941 C0.014,0.916 0.051,0.852 0.090,0.798 C0.118,0.759 0.172,0.745 0.200,0.740 C0.168,0.734 0.134,0.724 0.105,0.708 C0.061,0.685 0.026,0.647 0.033,0.597 C0.039,0.548 0.080,0.515 0.127,0.497 C0.147,0.489 0.168,0.484 0.189,0.480 C0.164,0.476 0.138,0.471 0.115,0.464 C0.087,0.455 0.009,0.425 0.017,0.358 C0.023,0.303 0.084,0.276 0.116,0.266 C0.150,0.256 0.188,0.251 0.222,0.247 C0.209,0.244 0.196,0.239 0.184,0.234 C0.153,0.221 0.102,0.190 0.105,0.136 C0.108,0.095 0.144,0.068 0.171,0.054 C0.198,0.041 0.228,0.032 0.253,0.027 C0.306,0.015 0.371,0.009 0.434,0.005 Z" />
            </clipPath>
          </defs>
        </svg>
      </section>
    </>
  )
}
