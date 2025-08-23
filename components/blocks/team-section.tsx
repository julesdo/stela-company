// components/TeamSection.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Descriptions plus étoffées sans modifier l'interface Member
const moreDetails: Record<string, string> = {
  'Stela Elena Stankovic':
    `Formée entre Belgrade et Berlin, Stela développe une écriture scénique hybride où le geste,
la voix et le texte s’entrelacent. Elle dirige des laboratoires de création collective et mène
des projets transdisciplinaires mêlant artistes et publics. Ses influences : Pina Bausch,
le théâtre documentaire et les langues comme matière chorégraphique.`,
  'Jean-Baptiste Braud':
    `Interprète caméléon, Jean-Baptiste navigue entre plateau de cinéma et scènes contemporaines.
Son approche privilégie l’instantanéité, l’improvisation physique et un rapport sensible au partenaire.
Il transmet régulièrement auprès de jeunes interprètes un travail sur la présence et l’écoute.`,
  'Jean Guizerix':
    `Danseur étoile et pédagogue, Jean a marqué l’histoire de la danse française par son exigence
artistique et sa curiosité pour de nouvelles écritures. Son regard chorégraphique accompagne la
compagnie dans l’affinement du vocabulaire, l’articulation des dynamiques et la musicalité du geste.`,
  'Jean-Jacques Lemêtre':
    `Compositeur, luthier et collecteur de timbres, Jean-Jacques construit ses propres instruments.
Ses compositions naissent au plateau, au contact des corps et de l’espace. Il imagine des paysages
sonores organiques qui prolongent la dramaturgie, entre souffle, cordes et résonances archaïques.`,
  'Ava de Ardis':
    `Costumière et plasticienne textile, Ava explore la matière comme mémoire. Elle teinte, découpe,
assemble et patine pour faire surgir des peaux scéniques singulières. Son travail dialogue avec la
lumière et accompagne la métamorphose des interprètes au fil de la pièce.`,
};

export default function TeamSection() {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);
  const [selected, setSelected] = useState<Member | null>(null);

  // Fermeture au clavier (Échap)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const cols = 3;
  const rows = Math.ceil(team.length / cols);
  const total = team.length;

  function getTemplateSizes(isRow: boolean) {
    if (!hovered) return isRow ? `repeat(${rows}, 1fr)` : `repeat(${cols}, 1fr)`;
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
              onClick={() => setSelected(member)}
              animate={{
                scale:
                  hovered &&
                  hovered.row === Math.floor(idx / cols) &&
                  hovered.col === idx % cols
                    ? 1.1
                    : 1,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 group-hover:bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="absolute bottom-4 left-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity:
                    hovered &&
                    hovered.row === Math.floor(idx / cols) &&
                    hovered.col === idx % cols
                      ? 1
                      : 0,
                  y:
                    hovered &&
                    hovered.row === Math.floor(idx / cols) &&
                    hovered.col === idx % cols
                      ? 0
                      : 20,
                }}
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

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              className="fixed z-50 inset-0 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-3xl rounded-2xl bg-background shadow-xl overflow-hidden">
                <button
                  aria-label="Fermer"
                  onClick={() => setSelected(null)}
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 hover:bg-muted transition"
                >
                  ✕
                </button>

                <div className="grid md:grid-cols-2">
                  <div className="relative h-56 md:h-full">
                    <img
                      src={selected.photo}
                      alt={selected.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold">{selected.name}</h3>
                    <p className="text-primary/90 font-medium mt-1">{selected.role}</p>

                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/90">
                      <p>{selected.bio}</p>
                      <p>{moreDetails[selected.name] ?? ''}</p>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setSelected(null)}
                        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
                      >
                        Fermer
                      </button>
                      {/* CTA optionnel (ex: lien bio complète / presse) */}
                      {/* <a href="#" className="px-4 py-2 rounded-xl border border-border hover:bg-muted transition">En savoir plus</a> */}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
