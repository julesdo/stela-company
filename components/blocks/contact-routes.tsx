// components/blocks/contact-routes.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

type Side = {
  title: string
  subtitle?: string
  bullets?: string[]
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  bg: { src: string; alt?: string } // ← image de fond
}

export default function ContactRoutes({ left, right }: { left: Side; right: Side }) {
  const Panel = ({ data }: { data: Side }) => (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative h-[46vh] md:h-[56vh] overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={data.bg.src}
        alt={data.bg.alt || data.title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover grayscale transition-[filter,transform] duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:grayscale-0 group-hover:scale-[1.015]"
        priority={false}
      />

      {/* Overlays (sobres) */}
      <div className="absolute inset-0 bg-white/10 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

      {/* Contenu */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <h2 className="text-white text-2xl md:text-5xl font-light leading-[1.12]">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="mt-1.5 text-white/85 text-sm md:text-base max-w-xl">
            {data.subtitle}
          </p>
        )}

        {data.bullets?.length ? (
          <ul className="mt-3 space-y-1.5 text-white/80 text-[12.5px] md:text-[13.5px] max-w-xl">
            {data.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-4 text-[12px] tracking-wider uppercase">
          {data.primary && (
            <Link
              href={data.primary.href}
              className="inline-flex items-center text-white/90 hover:text-white transition"
            >
              {data.primary.label}
              <svg
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-[3px]"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6"/>
              </svg>
            </Link>
          )}
          {data.secondary && (
            <Link
              href={data.secondary.href}
              className="inline-flex items-center text-white/70 hover:text-white transition"
            >
              {data.secondary.label}
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  )

  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
      <Panel data={left} />
      <Panel data={right} />
    </div>
  )
}
