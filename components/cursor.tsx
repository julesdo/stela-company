// components/UltraInteractiveCursor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
} from 'framer-motion';
import { gsap } from 'gsap';


export default function UltraInteractiveCursor() {
  // Motion values for position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const scrollDelta = useRef(0);

  // Springs for smooth follow
  const dotX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const scrollSpring = useSpring(0, { stiffness: 200, damping: 20 });

  // Interaction states
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const trailRef = useRef<HTMLDivElement>(null);

  // Colors based on underlying element contrast
  const [pointColor, setPointColor] = useState('var(--color-foreground)');
  const [ringColor, setRingColor] = useState('var(--color-accent)');

  // Update cursor colors by sampling background at cursor
  const updateColors = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y) as HTMLElement;
    if (!el) return;
    const bg = getComputedStyle(el).backgroundColor;
    const rgb = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgb) {
      const [, r, g, b] = rgb.map(Number) as [any, number, number, number];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (lum > 200) {
        setPointColor('var(--color-foreground)');
        setRingColor('var(--color-secondary)');
      } else {
        setPointColor('var(--color-accent)');
        setRingColor('var(--color-foreground)');
      }
    }
  };

  // Mouse move: update position, colors, trail
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      updateColors(e.clientX, e.clientY);

      // Particle effect
      const p = document.createElement('div');
      p.className = 'cursor-particle';
      p.style.left = `${e.clientX}px`;
      p.style.top = `${e.clientY}px`;
      trailRef.current?.appendChild(p);
      gsap.to(p, {
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => p.remove(),
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Click ripple effect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setClicked(true);
      const r = document.createElement('div');
      r.className = 'cursor-ripple';
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      r.style.borderColor = ringColor;
      trailRef.current?.appendChild(r);
      gsap.to(r, {
        scale: 5,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => r.remove(),
      });
      setTimeout(() => setClicked(false), 200);
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [ringColor]);

  // Scroll velocity bar
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      scrollDelta.current = Math.min(200, Math.abs(e.deltaY));
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Animate scrollSpring
  useAnimationFrame(() => {
    scrollSpring.set(scrollDelta.current);
    scrollDelta.current *= 0.9;
  });

  // Hover detection on interactive elements
  useEffect(() => {
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const els = document.querySelectorAll('a, button, input, textarea, select, .interactive');
    els.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => els.forEach(el => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    });
  }, []);

  // Map scroll velocity to bar width
  const barWidth = useTransform(scrollSpring, [0, 200], ['0%', '100%']);

  return (
    <div ref={trailRef} className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Scroll velocity indicator */}
      <motion.div
        style={{ width: barWidth }}
        className="fixed top-0 left-0 h-1 bg-[var(--color-secondary)]"
      />

      {/* Animated ring */}
      <AnimatePresence>
        <motion.div
          style={{ x: ringX, y: ringY }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: clicked ? 4 : hovered ? 3 : 2.2,
            opacity: clicked ? 0.5 : hovered ? 0.25 : 0.12,
            borderColor: ringColor,
          }}
          transition={{ type: 'spring', stiffness: 160, damping: 16 }}
          className="absolute size-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        />
      </AnimatePresence>

      {/* Central dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: clicked ? 1.8 : hovered ? 1.4 : 1,
          rotate: clicked ? 45 : hovered ? 20 : 0,
          backgroundColor: pointColor,
          boxShadow: clicked
            ? `0 0 16px ${pointColor}`
            : hovered
            ? `0 0 12px ${pointColor}`
            : '0 0 6px rgba(0,0,0,0.2)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      {/* Global styles for particles and ripples */}
      <style jsx global>{`
        .cursor-particle {
          position: fixed;
          width: 6px;
          height: 6px;
          background: var(--color-muted-foreground);
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: difference;
          transform: translate(-50%, -50%);
        }
        .cursor-ripple {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
}
