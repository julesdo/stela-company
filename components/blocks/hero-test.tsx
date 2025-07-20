'use client';
import ScrollBaseAnimation, { ParallaxItem } from '../ui/text-marquee';

const heroItems: ParallaxItem[] = [
  { type: 'text', content: 'Danse' },
  { type: 'image', content: '/about1.jpg', alt: 'Clip Art 1' },
  { type: 'text', content: 'Théâtre' },
  { type: 'image', content: '/about2.jpg', alt: 'Clip Art 2' },
  { type: 'text', content: 'Langues' },
  { type: 'image', content: '/about3.jpg', alt: 'Clip Art 3' },
];

export default function HeroParallaxSection() {
  return (
    <section className="relative h-screen w-screen flex flex-col items-center justify-center ">
      <ScrollBaseAnimation
        items={heroItems}
        baseVelocity={-10}
        scrollDependent={true}
        delay={500}
        className="text-gray-800 dark:text-gray-200"
      />
    </section>
  );
}