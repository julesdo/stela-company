// components/ScrollBaseAnimation.tsx
'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from 'motion/react';
import { wrap } from '@motionone/utils';
import { cn } from '@/lib/utils';

export interface ParallaxItem {
  type: 'text' | 'image';
  content: string;
  alt?: string;
}

interface ParallaxProps {
  items: ParallaxItem[];
  baseVelocity?: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
}

export default function ScrollBaseAnimation({
  items,
  baseVelocity = -5,
  className,
  scrollDependent = false,
  delay = 0,
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], { clamp: false });

  const x = useTransform(baseX, v => `${wrap(-100, 0, v)}%`);
  const directionFactor = useRef(1);
  const hasStarted = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => { hasStarted.current = true; }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useAnimationFrame((t, delta) => {
    if (!hasStarted.current) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (scrollDependent) {
      const vf = velocityFactor.get();
      directionFactor.current = vf < 0 ? -1 : vf > 0 ? 1 : directionFactor.current;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn('overflow-hidden whitespace-nowrap flex w-screen', className)}>
      <motion.div className="flex gap-10" style={{ x }}>
      {Array.from({ length: 6 }).flatMap(() => items).map((item, idx) => (
          <span key={idx} className="flex-shrink-0" style={{ fontSize: '8vw' }}>
            {item.type === 'text' ? (
              <span className={cn('font-bold uppercase', className)}>
                {item.content}
              </span>
            ) : (
              <img
                src={item.content}
                alt={item.alt}
                className={cn('h-[8vw] object-cover inline-block', className)}
              />
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
