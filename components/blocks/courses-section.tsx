'use client';

import { ReactLenis } from 'lenis/react';
import { useScroll, MotionValue } from 'framer-motion';
import { JSX, useRef } from 'react';
import { useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

export interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-md p-10 origin-top"
      >
        <h2 className="text-4xl text-center font-semibold uppercase">{title}</h2>
        <div className="flex h-full mt-5 gap-10">
          <div className="w-[40%] relative top-[10%]">
            <p className="text-xl">{description}</p>
            <Button 
              variant="link"
              size="lg"
              className="text-white underline mt-5"
              asChild
            >
              <Link href={url}>
              En savoir plus
              </Link>
            </Button>
          </div>

          <div className="relative w-[60%] h-full rounded-lg overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image fill src={url} alt={title} className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
// primary #5196fd
// secondary #FFD8D4
// tertiary #D4F0FF


const projects = [
  {
    title: 'Danse Classique',
    description:
      'Apprenez la technique classique avec des exercices progressifs et des éléments de base pour développer votre grâce et votre posture.',
    src: '/about1.jpg',
    link: '/about1.jpg',
    color: 'var(--primary)',
  },
  {
    title: 'Théâtre Corporel',
    description:
      'Découvrez le théâtre corporel avec des exercices de mouvement et de gestes pour exprimer vos émotions et créer des performances.',
    src: '/about2.jpg',
    link: '/about2.jpg',
    color: 'var(--secondary)',
  },
  {
    title: 'Langues Vivantes',
    description:
      'Apprenez à parler en espagnol, italien ou serbe avec des exercices de conversation et de vocabulaire.',
    src: '/about3.jpg',
    link: '/about3.jpg',
    color: 'var(--accent)',
  },
  
];

export default function Page(): JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className="bg-b" ref={container}>
        <section className="text-white w-full grid place-content-center relative h-[20vh]">
          <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%] pt-10">
            Nos cours
          </h1>
        </section>

        <section className="text-white w-full">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={i}
                i={i}
                url={project.link}
                src={project.src}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress as MotionValue<number>}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}
