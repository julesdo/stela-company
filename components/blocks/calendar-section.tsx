// components/CalendarAgendaSection.tsx
'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO, compareAsc } from "date-fns";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

interface Event {
  date: string;
  title: string;
  image: string;
  description: string;
  link: string;
}

const events: Event[] = [
  { date:"2025-09-12", title:"Ouverture Saison", image:"/about1.jpg", description:"Cérémonie d'ouverture", link:"/inscription/1" },
  { date:"2025-10-05", title:"Masterclass Contemp.", image:"/about2.jpg", description:"Atelier intensif", link:"/inscription/2" },
  { date:"2025-11-21", title:"Gala International", image:"/about3.jpg", description:"Clôture de saison", link:"/inscription/3" },
  { date:"2026-01-15", title:"Stage d'Hiver", image:"/about2.jpg", description:"Stage intensif interdisciplinaire", link:"/inscription/4" },
];

function groupByMonth(evts: Event[]) {
  const map = new Map<string, Event[]>();
  evts.sort((a,b)=> compareAsc(parseISO(a.date), parseISO(b.date)));
  evts.forEach(e => {
    const m = format(parseISO(e.date), "MMMM yyyy");
    if (!map.has(m)) map.set(m, []);
    map.get(m)!.push(e);
  });
  return Array.from(map.entries());
}

export default function CalendarAgendaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Event|null>(null);
  const [groups, setGroups] = useState<[string,Event[]][]>([]);
  // Pour l'effet hover
  const [hoverImage, setHoverImage] = useState<string|null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef<NodeJS.Timeout|null>(null);
  const rafRef = useRef<number|null>(null);
  const prevPos = useRef({ x: 0, y: 0 });

  // init Lenis + GSAP + grouping + scroll anim
  useEffect(() => {
    const lenis = new Lenis({ duration:1.2, easing: t=>Math.min(1,1.001-Math.pow(2,-10*t)), lerp:0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time=> lenis.raf(time*1000));

    setGroups(groupByMonth(events));

    ScrollTrigger.batch(".month-header", {
      onEnter: batch => gsap.from(batch, { y:50, opacity:0, stagger:0.1, duration:0.8, ease:"power3.out" })
    });
    ScrollTrigger.batch(".event-item", {
      onEnter: batch => gsap.from(batch, { x:-30, opacity:0, stagger:0.1, duration:0.6, ease:"power2.out" })
    });

    return () => lenis.destroy();
  }, []);

  // suivi du curseur avec easing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX:x, clientY:y } = e;
    const dx = x - prevPos.current.x;
    const dy = y - prevPos.current.y;
    const ease = 0.2;
    const nx = prevPos.current.x + dx * ease;
    const ny = prevPos.current.y + dy * ease;
    prevPos.current = { x: nx, y: ny };
    setCursorPos({ x: nx, y: ny });
  }, []);

  useEffect(() => {
    const loop = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        rafRef.current = null;
      });
    };
    window.addEventListener('mousemove', loop);
    return () => {
      window.removeEventListener('mousemove', loop);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  const onItemHover = useCallback((img: string) => {
    if (hoverImage !== img) {
      setHoverImage(img);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setOpacity(1);
        setScale(1);
      }, 50);
    } else {
      setOpacity(1);
      setScale(1);
    }
  }, [hoverImage]);

  const onItemLeave = useCallback(() => {
    setOpacity(0);
    setScale(0.5);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setHoverImage(null), 300);
  }, []);

  const scrollToMonth = (idx:number) => {
    const target = document.getElementById(`month-${idx}`);
    if (target) gsap.to(window, { scrollTo: target, duration:1, ease:"power2.inOut" });
  };

  return (
    <section ref={sectionRef} className="py-16 px-6 lg:px-24 bg-background relative">
      {/* barre de mois */}
      <div className="flex overflow-x-auto gap-4 mb-8 sticky top-24 bg-background/80 backdrop-blur-sm z-20">
        {groups.map(([mois],i) => (
          <Button
            key={mois}
            onClick={()=>scrollToMonth(i)}
            className="px-4 py-2 bg-primary/50 text-primary rounded-full whitespace-nowrap hover:bg-primary/20 transition"
          >
            {mois}
          </Button>
        ))}
      </div>

      {/* agenda */}
      {groups.map(([mois, evts], i) => (
        <div key={mois} id={`month-${i}`} className="mb-12 bg-primary/10 p-4 rounded-lg">
          <h2 className="month-header text-2xl font-heading mb-4 text-foreground">{mois}</h2>
          <ul className="space-y-4">
            {evts.map(e => (
              <li
                key={e.date}
                className="event-item p-4 bg-secondary/10 rounded-lg flex items-center justify-between"
                onMouseEnter={()=>onItemHover(e.image)}
                onMouseLeave={onItemLeave}
              >
                <div>
                  <p className="font-semibold">{format(parseISO(e.date),"dd MMM yyyy")}</p>
                  <p className="text-lg">{e.title}</p>
                </div>
                <button
                  onClick={()=>setSelected(e)}
                  className="px-4 py-2 bg-accent text-background rounded-full hover:bg-accent/90 transition"
                >
                  Détails
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* modal détail */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center p-4"
              initial={{ scale:0.8, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              exit={{ scale:0.8, opacity:0 }}
              transition={{ type:"spring", stiffness:300, damping:25 }}
            >
              <div className="bg-background rounded-xl shadow-xl max-w-md w-full overflow-hidden relative">
                <img src={selected.image} alt={selected.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{selected.title}</h3>
                  <p className="text-sm text-foreground/80 mb-4">
                    {format(parseISO(selected.date),"EEEE d MMMM yyyy")}
                  </p>
                  <p className="mb-6 text-foreground/90">{selected.description}</p>
                  <a href={selected.link} className="inline-block px-6 py-2 bg-accent text-background rounded-full uppercase">
                    S'inscrire
                  </a>
                </div>
                <button
                  className="absolute top-3 right-3 text-foreground text-2xl"
                  onClick={()=>setSelected(null)}
                >×</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* preview image qui suit le curseur */}
      {hoverImage && (
        <img
          src={hoverImage}
          alt="preview"
          className="pointer-events-none fixed z-30 w-[250px] h-[350px] rounded-lg object-cover"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity,
            transition: 'opacity 0.2s ease, transform 0.2s ease'
          }}
        />
      )}
    </section>
  );
}
