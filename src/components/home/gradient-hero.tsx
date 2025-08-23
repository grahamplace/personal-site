'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Section } from '@/components/theme/global-navigation';

interface GradientHeroProps {
  className?: string;
  id?: string;
  onNavigate: (section: Section) => void;
}

const navigationItems: { id: Section; label: string; color: string }[] = [
  { id: 'experience', label: 'Experience', color: 'cactusGreen' },
  { id: 'blog', label: 'Blog', color: 'sandstone' },
  { id: 'contact', label: 'Contact', color: 'sunsetOrange' },
];

export function GradientHero({ className, id, onNavigate }: GradientHeroProps) {
  const verbs = ['build', 'code', 'learn', 'ship', 'sell'];
  const [verbIndex, setVerbIndex] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const [verbWidthPx, setVerbWidthPx] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVerbIndex((prev) => (prev + 1) % verbs.length);
    }, 1800);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (!el) return;
      let max = 0;
      Array.from(el.children).forEach((child) => {
        const width = (child as HTMLElement).offsetWidth;
        if (width > max) max = width;
      });
      setVerbWidthPx(max);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'relative flex min-h-screen items-center justify-center',
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10 space-y-12 text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="font-raleway text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Graham Place
          </h1>
          <p className="font-raleway relative mx-auto max-w-3xl text-xl leading-relaxed text-white/90 sm:text-3xl">
            Software engineer & leader. Let&apos;s{' '}
            <span
              className="relative inline-flex h-[1.2em] overflow-hidden align-baseline leading-none"
              style={{ width: verbWidthPx ? `${verbWidthPx}px` : undefined }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={verbs[verbIndex]}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="inline-block w-[90px] text-left leading-none"
                >
                  {verbs[verbIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col justify-center gap-6 sm:flex-row"
        >
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.id)}
              className="w-40 rounded-lg border border-white/30 bg-white/20 px-8 py-4 text-lg font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:shadow-xl"
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Down arrow prompt */}
      <motion.button
        aria-label="Scroll to next section"
        onClick={() => onNavigate('experience')}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white shadow-md backdrop-blur-sm transition hover:bg-white/20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v12.19l3.72-3.72a.75.75 0 111.06 1.06l-5 5a.75.75 0 01-1.06 0l-5-5a.75.75 0 111.06-1.06l3.72 3.72V4.5A.75.75 0 0112 3.75z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </motion.section>
  );
}
