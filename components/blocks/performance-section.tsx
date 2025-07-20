// components/HorizontalGallery.tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";                             // Lenis pour smooth scroll :contentReference[oaicite:5]{index=5}

interface Performance {
  date: string;
  title: string;
  img: string;
}

const performances: Performance[] = [
  { date: "12 Sept. 2025", title: "Spectacle d'ouverture",   img: "/about1.jpg" },
  { date: "03 Oct. 2025",  title: "Soirée contemporaine",    img: "/about2.jpg" },
  { date: "21 Nov. 2025",  title: "Gala international",      img: "/about3.jpg" },
  { date: "15 Déc. 2025",  title: "Performance de rue",      img: "/about1.jpg" },
];

export default function HorizontalGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1) Instanciation de Lenis pour tout le scroll vertical
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease custom :contentReference[oaicite:6]{index=6}
      wheelMultiplier: 1,
      touchMultiplier: 1,
      lerp: 0.1,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2) Horizontal scroll on wheel
    const gallery = galleryRef.current!;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      gallery.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
    };
    gallery.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      lenis.destroy();
      gallery.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section className="py-16 bg-background">
      <h2 className="text-3xl font-heading uppercase text-center mb-8 text-foreground">
        Nos Dernières Représentations
      </h2>

      <div
        ref={galleryRef}
        className="
          horizontal-snap 
          overflow-x-auto overflow-y-hidden 
          scroll-snap-type-x-mandatory 
          snap-x 
          snap-mandatory 
          flex gap-6 px-6
          scrollbar-hide
        "
      >
        {performances.map(({ date, title, img }, i) => (
          <div
            key={i}
            className="
              snap-center 
              flex-shrink-0 
              w-[80vw] md:w-[50vw] lg:w-[30vw] 
              bg-neutral-900 
              rounded-xl 
              overflow-hidden 
              relative 
            "
          >
            <img
              src={img}
              alt={title}
              className="w-full h-[60vh] object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="p-4 bg-background/70 absolute bottom-0 w-full">
              <h3 className="text-xl font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted">{date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
