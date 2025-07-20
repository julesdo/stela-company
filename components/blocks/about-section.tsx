// components/AboutSectionScrollSync.tsx
"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import logoUrl from "@/public/logo.svg"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

export default function AboutSectionScrollSync() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const meshRef    = useRef<SVGPathElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const imagesRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sec = sectionRef.current!
    const split = new SplitType(titleRef.current!, { types: "lines" }) // split du titre :contentReference[oaicite:3]{index=3}

    // Timeline unique liée au scroll
    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=200%",    // 2× la hauteur
          scrub: 1,         // 1s smoothing
          pin: true,
          invalidateOnRefresh: true,
        }
      })
      .timeScale(0.6)      // slow global speed
      
      // Logo (2s) et mesh (3s) en simultané
      tl.from(logoRef.current, { scale:0, autoAlpha:0, duration:2, ease:"back.out(1.7)" }, 0)
        .to(meshRef.current, { attr:{d:"M0,60 …"}, duration:3, ease:"sine.inOut" }, 0)
      
      // Titre (1.2s) après 1s de pause
        .from(split.lines, { y:40, opacity:0, stagger:0.1, duration:1.2, ease:"power2.out" }, 1)
      
      // Paragraphes (1s) après encore 1s
        .from(textRef.current?.children as any, { y:20, opacity:0, stagger:0.3, duration:1, ease:"power3.out" }, 2.2)
      
      // Images (1.5s) après 2.5s
        .from(imagesRef.current?.children as any, { y:100, opacity:0, stagger:0.3, duration:1.5, ease:"power1.out",
          onUpdate() { gsap.to(imagesRef.current?.children as any, { y:this.progress()*-50 }) }
        }, 3.7);


    return () => {
      split.revert()
      ScrollTrigger.getAll().forEach(st => st.kill())
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-primary overflow-hidden py-16 px-6 md:px-12 lg:px-24 text-center">
      {/* Logo animé */}
      <div ref={logoRef} className=" inline-block">
        <Image src={logoUrl} alt="Logo" width={128} height={128} priority />
      </div>



      {/* Contenu textuel */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-16">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-heading uppercase text-foreground">
          À propos de La Stela Company
        </h2>
        <div ref={textRef} className="text-lg text-foreground/80 space-y-6">
          <p>Stela Elena Stankovic tisse des ponts entre théâtre, danse, musique et langues.</p>
          <p>L’art devient un vecteur de connexion, de liberté et d’émotion partagée.</p>
          <p>Un laboratoire créatif en ébullition, reliant France, Allemagne et Serbie.</p>
        </div>

        {/* Images animées en parallax */}
        <div ref={imagesRef} className="grid grid-cols-3 gap-4">
          {["/about1.jpg","/about2.jpg","/about3.jpg"].map((src,i) => (
            <div key={i} className="overflow-hidden rounded-lg">
              <img src={src} alt="" className="w-full h-full object-cover"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
