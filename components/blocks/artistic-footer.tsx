'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayout } from '../layout/layout-context';

gsap.registerPlugin(ScrollTrigger);

export default function ArtisticFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const { globalSettings } = useLayout();

  const navLinks = (globalSettings?.header?.nav ?? []) as { href: string; label: string }[];
  const footer = (globalSettings?.footer as any) ?? {};
  const tagline = footer.tagline || 'Danse · Théâtre · Langues';
  const email = footer.email || 'lastelacompany@gmail.com';
  const instagramUrl = footer.instagramUrl || 'https://www.instagram.com/la_stela_company/';
  const instagramHandle = footer.instagramHandle || '@stelacompany';

  useEffect(() => {
    if (!footerRef.current) return;

    const items = footerRef.current.querySelectorAll<HTMLElement>('.footer-item');

    items.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));

    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    const animation = gsap.from(items, {
      y: 20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom-=50',
        toggleActions: 'play none none none',
        onRefresh: () => {
          if (window.scrollY + window.innerHeight > footerRef.current!.offsetTop) {
            items.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
          }
        },
      },
    });

    return () => {
      clearTimeout(timer);
      animation?.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === footerRef.current) st.kill();
      });
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-white border-t border-gray-100 overflow-hidden">

      {/* Zone brand */}
      <div className="footer-item flex flex-col items-center gap-5 pt-20 pb-14 px-8">
        <Image
          src="/logo.svg"
          alt="La Stela Company"
          width={64}
          height={64}
          className="opacity-75"
        />
        <p className="text-sm tracking-[0.35em] uppercase text-black/40 font-light">
          {tagline}
        </p>
      </div>

      {/* Séparateur */}
      <div className="footer-item border-t border-gray-100 mx-8 md:mx-20" />

      {/* Navigation */}
      {navLinks.length > 0 && (
        <nav className="footer-item flex flex-wrap justify-center gap-x-8 gap-y-3 py-10 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.22em] uppercase font-light text-black/45 hover:text-black transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      {/* Séparateur */}
      <div className="footer-item border-t border-gray-100 mx-8 md:mx-20" />

      {/* Bas de page */}
      <div className="footer-item flex flex-col md:flex-row items-center justify-between gap-4 px-8 md:px-20 py-8">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-[0.22em] uppercase font-light text-black/40 hover:text-black transition-colors duration-300"
        >
          {instagramHandle}
        </a>

        <a
          href={`mailto:${email}`}
          className="text-[11px] tracking-[0.15em] font-light text-black/40 hover:text-black transition-colors duration-300"
        >
          {email}
        </a>

        <span className="text-[11px] tracking-[0.1em] font-light text-black/30">
          © {new Date().getFullYear()} La Stela Company
        </span>
      </div>

    </footer>
  );
}
