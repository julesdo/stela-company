// hooks/useSectionTransitions.ts
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenisScroll } from "./useLenisScroll";

gsap.registerPlugin(ScrollTrigger);

export function useSectionTransitions() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Démarre Lenis
  useLenisScroll();

  useEffect(() => {
    const sections = Array.from(
      containerRef.current!.querySelectorAll<HTMLElement>(".section")
    );

    // Fixe minHeight et opacité initiale
    sections.forEach((sec) => {
      sec.style.minHeight = "100vh";
      sec.style.opacity = "1";
    });

    // On ignore la première
    sections.slice(1).forEach((sec) => {
      gsap.set(sec, { autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: sec,
        start: "top 60%",    // quand le top de la section atteint 60% de la hauteur viewport
        end: "bottom 40%",   // quand le bottom atteint 40% 
        scrub: true,
        onEnter:    () => gsap.to(sec, { autoAlpha: 1, duration: 0.5 }),
        onEnterBack:() => gsap.to(sec, { autoAlpha: 1, duration: 0.5 }),
        onLeave:    () => gsap.to(sec, { autoAlpha: 0, duration: 0.5 }),
        onLeaveBack:() => gsap.to(sec, { autoAlpha: 0, duration: 0.5 }),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return containerRef;
}
