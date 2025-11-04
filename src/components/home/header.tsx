'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { getSectionAccentColor } from '@/lib/colors';
import { useEffect, useRef, useState } from 'react';

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
  { id: 'contact' as const, label: 'Contact' },
];

export function Header({ className, onNavigate, currentSection }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false);
  const compactTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (compactTimerRef.current != null) {
        clearTimeout(compactTimerRef.current);
        compactTimerRef.current = null;
      }
    };

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const pastThreshold = y > 24;

      if (pastThreshold) {
        // Delay shrink by 200ms; ignore if already compact or timer exists
        if (!isCompact && compactTimerRef.current == null) {
          compactTimerRef.current = window.setTimeout(() => {
            setIsCompact(true);
            compactTimerRef.current = null;
          }, 200);
        }
      } else {
        // Cancel pending shrink and expand immediately
        clearTimer();
        if (isCompact) setIsCompact(false);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimer();
    };
  }, [isCompact]);

  return (
    <motion.header
      id="site-header"
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
          // paddingTop: isCompact ? 8 : 16,
          // paddingBottom: isCompact ? 8 : 16,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        {/* Name */}
        <motion.div
          layout
          initial={false}
          animate={{
            opacity: isCompact ? 0 : 1,
            y: isCompact ? -8 : 0,
            height: isCompact ? 0 : 'auto',
            marginBottom: isCompact ? 0 : 16,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="overflow-hidden text-center"
          aria-hidden={isCompact}
        >
          <h1 className="font-raleway text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Graham Place
          </h1>
        </motion.div>

        {/* Navigation */}
        <motion.div
          layout
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-1 px-4 sm:flex-row sm:gap-3"
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
