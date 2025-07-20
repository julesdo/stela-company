// components/PhotoGallerySection.tsx
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const photos = [
  {
    src: '/about1.jpg',
    title: 'Nouvelle Création',
    description: `Deux corps. Une surface. Une tension douce.
Notre prochaine pièce émerge du contact, de la friction et de l’abandon.
Ici, le poids devient langage, et l’étreinte un territoire partagé.
Danseurs : @jb_braud @stelaelena.stankovic`,
  },
  {
    src: '/about2.jpg',
    title: 'Musique & Studio',
    description: `La musique comme alliée.
Rencontre en studio avec Jean-Jacques Lemêtre (Théâtre du Soleil) : souffle, tension, mystère.
Une écriture sonore qui dialogue avec les corps.`,
  },
  {
    src: '/about3.jpg',
    title: 'Identité & Métissage',
    description: `Stela est serbo-allemande : un métissage vivant.
Des racines multiples, des langues en dialogue, des récits tissés.
Bienvenue dans une compagnie sans frontières.`,
  },
  {
    src: '/about2.jpg',
    title: 'Rencontre Coture',
    description: `🧵 Rencontre avec Ava de Ardis, costumière.
Elle façonne des textures sensibles : silhouettes qui racontent et incarnent l’âme de chaque création.`,
  },
];

export default function PhotoGallerySection() {
  const sectionRefs = photos.map(() => useRef<HTMLDivElement>(null));

  const scrollProgress = sectionRefs.map((ref) =>
    useScroll({
      target: ref,
      offset: ['start end', 'end start'],
    }).scrollYProgress
  );

  const clipPaths = scrollProgress.map((p) =>
    useTransform(p, [0, 0.7], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  );
  const translateYs = scrollProgress.map((p) =>
    useTransform(p, [0, 1], ['20vh', '0vh'])
  );

  return (
    <div className="overflow-hidden">
      {photos.map((photo, i) => (
        <section
          key={i}
          ref={sectionRefs[i]}
          className="relative h-screen w-screen flex items-center justify-center bg-background"
        >
          {/* Image qui se dévoile */}
          <motion.div
            style={{ clipPath: clipPaths[i] }}
            className="absolute inset-0"
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover"
              quality={80}
            />
          </motion.div>

          {/* Texte qui fade & remonte */}
          <motion.div
            style={{ opacity: scrollProgress[i], y: translateYs[i] }}
            className="relative z-10 max-w-xl p-8 bg-background/60 backdrop-blur-lg rounded-lg text-center"
          >
            <h3 className="text-4xl font-heading font-bold text-primary mb-4">
              {photo.title}
            </h3>
            <p className="text-lg text-white whitespace-pre-line leading-relaxed">
              {photo.description}
            </p>
          </motion.div>
        </section>
      ))}
    </div>
  );
}
