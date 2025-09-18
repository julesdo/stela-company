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
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Ateliers', href: '/ateliers' },
  { label: 'Représentations', href: '/representations' },
  { label: 'Équipe', href: '/equipe' },
  { label: 'Contact', href: '/contact' },
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
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom-=50',
        toggleActions: 'play none none none',
      },
    });

    links.forEach((el) => {
      const link = el.querySelector('a')!;
      const tl = gsap.timeline({ paused: true });
      tl.to(el, { backgroundColor: 'rgba(249, 250, 251, 1)', duration: 0.2 });
      tl.to(link, { color: '#000000', duration: 0.2 }, 0);
      el.addEventListener('mouseenter', () => tl.play());
      el.addEventListener('mouseleave', () => tl.reverse());
    });
  }, []);

  return (
    <footer ref={footerRef} className="bg-white border-t border-gray-100 py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex w-full justify-center mb-16">
          <div className='flex flex-col items-center gap-4'>
            <Image src="/logo.svg" alt="La Stela Company" width={80} height={80} className="opacity-80" />
            <Image src="/logo-stela.svg" alt="Stela Elena Stankovic" width={120} height={40} className="opacity-70" />
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center mb-16">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="footer-item p-3 rounded-lg transition-all duration-300 hover:bg-gray-50">
              <Link 
                className='text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 block' 
                href={link.href}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-12"></div>

        {/* Socials & Contact */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Social Links */}
          <div className="flex justify-center space-x-8">
            {SOCIAL_LINKS.map((soc) => (
              <motion.a
                key={soc.href}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {soc.label}
              </motion.a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 mb-1">La Stela Company</p>
            <p className="text-sm text-gray-500">Directrice artistique : Stela Elena Stankovic</p>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center text-xs text-gray-500 border-t border-gray-100 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          © {new Date().getFullYear()} La Stela Company — Tous droits réservés.
        </motion.div>
      </div>
    </footer>
  );
}
