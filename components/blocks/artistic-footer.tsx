// components/ArtisticFooter.tsx
'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'ACCUEIL', href: '/' },
  { label: 'COURS', href: '/cours' },
  { label: 'REPRÉSENTATIONS', href: '/rep' },
  { label: 'CONTACT', href: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/stela_arts/' },
  { label: 'Facebook',  href: 'https://www.facebook.com/stela.arts' },
  { label: 'X',   href: 'https://x.com/stela_arts' },
];

export default function ArtisticFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const links = footerRef.current!.querySelectorAll<HTMLElement>('.footer-item');

    gsap.from(links, {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
    });

    links.forEach((el) => {
      const link = el.querySelector('a')!;
      const tl = gsap.timeline({ paused: true });
      tl.to(el, { backgroundColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
      tl.to(link, { color: 'var(--color-accent)', duration: 0.3 }, 0);
      el.addEventListener('mouseenter', () => tl.play());
      el.addEventListener('mouseleave', () => tl.reverse());
    });
  }, []);

  return (
    <footer ref={footerRef} className="bg-background text-foreground py-24 px-8 overflow-hidden">
      {/* Logo */}
      <div className="flex w-full justify-center mb-16">

        <div className='flex flex-col gap-6'>
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        <Image src="/logo-stela.svg" alt="Logo" width={100} height={100} />
        </div>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {NAV_LINKS.map((link) => (
          <div key={link.href} className="footer-item p-4 rounded-lg transition-colors">
            <Link className='text-4xl font-cinzel uppercase tracking-wide' href={link.href}>
            <h2>{link.label}</h2>
            </Link>
          </div>
        ))}
      </div>

      {/* Socials */}
      <div className="flex justify-center mt-12 space-x-6">
        {SOCIAL_LINKS.map((soc) => (
          <motion.a
            key={soc.href}
            href={soc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl uppercase tracking-wide"
            whileHover={{ color: 'var(--color-accent)', scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {soc.label}
          </motion.a>
        ))}
      </div>

      {/* Copyright */}
      <motion.div
        className="mt-12 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        © {new Date().getFullYear()} Stela Arts — Tous droits réservés.
      </motion.div>
    </footer>
  );
}
