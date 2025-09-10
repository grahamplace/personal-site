'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { getSectionAccentColor } from '@/lib/colors';
import { useEffect, useState } from 'react';

interface HeaderProps {
  className?: string;
  onNavigate: (section: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
  currentSection?: string;
}

const navigationItems = [
  { id: 'hero' as const, label: '← Home' },
  { id: 'experience' as const, label: 'Experience' },
  { id: 'blog' as const, label: 'Blog' },
  { id: 'contact' as const, label: 'Contact' },
];

export function Header({ className, onNavigate, currentSection }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setIsCompact(y > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md',
        className
      )}
    >
      <motion.div
        layout
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6"
        style={{
          paddingTop: isCompact ? 8 : 16,
          paddingBottom: isCompact ? 8 : 16,
        }}
      >
        {/* Name */}
        <AnimatePresence initial={false}>
          {!isCompact && (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mb-4 text-center"
            >
              <h1 className="font-raleway text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Graham Place
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center gap-3 sm:flex-row"
        >
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
            >
              <Button
                onClick={() => onNavigate(item.id)}
                isActive={currentSection === item.id}
                accentColor={getSectionAccentColor(item.id)}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
