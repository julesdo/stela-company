// components/TeamSection.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Member {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

const team: Member[] = [
    {
      name: 'Stela Elena Stankovic',
      role: 'Directrice Artistique',
      bio: `Danseuse et metteuse en scène serbo-allemande, 
  fondatrice de La Stela Company. 
  Son travail tisse théâtre, danse, musique et langues 
  pour explorer l’intime et le collectif.`,
      photo: '/stela.png',
    },
    {
      name: 'Jean-Baptiste Braud',
      role: 'Danseur Interprète',
      bio: `Danseur contemporain formé en classique, 
  acteur à la scène et à l’écran (Jeunet, TV), 
  il allie improvisation et danse-théâtre avec fougue.`,
      photo: '/team/jbb.jfif',
    },
    {
      name: 'Jean Guizerix',
      role: 'Co-Chorégraphe',
      bio: `Ancienne Étoile de l’Opéra de Paris, 
  collaborateur de Cunningham, Noureev, 
  Grand Prix national de la Danse 1984.`,
      photo: '/team/jg.jfif',
    },
    {
      name: 'Jean-Jacques Lemêtre',
      role: 'Compositeur & Musicien',
      bio: `Maître luthier et complice sonore du Théâtre du Soleil, 
  sa musique organique dialogue avec la création scénique.`,
      photo: '/team/jjl.jfif',
    },
    {
      name: 'Ava de Ardis',
      role: 'Costumière',
      bio: `Tisseuse d’univers sensuels, 
  elle façonne des textures et des costumes 
  qui deviennent langage tactile.`,
      photo: '/team/ava.png',
    },
  ];

export default function TeamSection() {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);

  const cols = 3;
  const rows = Math.ceil(team.length / cols);
  const total = team.length;

  function getTemplateSizes(isRow: boolean) {
    if (!hovered) return isRow ? `repeat(${rows}, 1fr)` : `repeat(${cols}, 1fr)`;
    // enlarge hovered cell row or column
    const index = hovered.row * cols + hovered.col;
    const sizes: string[] = [];
    const count = isRow ? rows : cols;
    const big = 2;
    const small = (count * 1 - big) / (count - 1);
    for (let i = 0; i < count; i++) {
      if ((isRow && i === hovered.row) || (!isRow && i === hovered.col)) {
        sizes.push(`${big}fr`);
      } else {
        sizes.push(`${small}fr`);
      }
    }
    return sizes.join(' ');
  }

  function getOrigin(idx: number) {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    const v = r === 0 ? 'top' : r === rows - 1 ? 'bottom' : 'center';
    const h = c === 0 ? 'left' : c === cols - 1 ? 'right' : 'center';
    return `${v} ${h}`;
  }

  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-heading font-bold text-primary text-center mb-12">Notre Équipe</h2>
        <div
          className="grid w-full h-[70vh] gap-4"
          style={{
            gridTemplateRows: getTemplateSizes(true),
            gridTemplateColumns: getTemplateSizes(false),
            transition: 'grid-template-rows 0.4s ease, grid-template-columns 0.4s ease',
          }}
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden shadow-2xl cursor-pointer group"
              style={{ transformOrigin: getOrigin(idx) }}
              onMouseEnter={() => setHovered({ row: Math.floor(idx / cols), col: idx % cols })}
              onMouseLeave={() => setHovered(null)}
              animate={{ scale: hovered && hovered.row === Math.floor(idx / cols) && hovered.col === idx % cols ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 group-hover:bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="absolute bottom-4 left-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: hovered && hovered.row === Math.floor(idx / cols) && hovered.col === idx % cols ? 1 : 0, y: hovered && hovered.row === Math.floor(idx / cols) && hovered.col === idx % cols ? 0 : 20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm uppercase tracking-wide">{member.role}</p>
                <p className="mt-2 text-xs text-foreground/80 max-w-xs">{member.bio}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
