// components/blocks/about-triptych.tsx
"use client"

import Image from "next/image"
import React from "react"

type Item = { title: string; text: string; image: string }

export default function AboutTriptych({ items }: { items: Item[] }) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:pr-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {items.map((it, i) => (
          <article key={i} className="group relative overflow-hidden">
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5]">
              <Image
                src={it.image}
                alt={it.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="
                  object-cover grayscale
                  transition-all duration-[900ms] ease-out
                  group-hover:grayscale-0 group-hover:scale-[1.015]
                "
              />
              {/* voile et texte minimal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <h3 className="text-white text-2xl md:text-3xl font-light leading-tight">{it.title}</h3>
                <p className="mt-2 text-white/85 text-sm md:text-base max-w-sm">{it.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
