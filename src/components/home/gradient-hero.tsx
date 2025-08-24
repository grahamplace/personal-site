'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVerbIndex((prev) => (prev + 1) % verbs.length);
    }, 1800);
    return () => clearInterval(intervalId);
  }, [verbs.length]);

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className={cn(
        'relative flex min-h-screen items-center justify-center',
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10 space-y-8 text-center">
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
            <span className="relative inline-flex h-[1.2em] overflow-hidden align-baseline leading-none">
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

        <motion.button
          aria-label="Scroll to next section"
          onClick={() => onNavigate('experience')}
          className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/30 bg-white/10 p-3.5 text-white shadow-md backdrop-blur-sm transition hover:bg-white/20"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, 24, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 1.2 },
            y: {
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.8,
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v12.19l3.72-3.72a.75.75 0 111.06 1.06l-5 5a.75.75 0 01-1.06 0l-5-5a.75.75 0 111.06-1.06l3.72 3.72V4.5A.75.75 0 0112 3.75z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </div>
    </motion.section>
  );
}
