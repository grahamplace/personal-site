'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useNavigation } from '@/components/theme/global-navigation';
import { Hero } from './hero';
import { Experience } from './experience';
import { Contact } from './contact';

export function Container() {
  const { navigateToSection, isHeroMode } = useNavigation();

  // Intercept any downward scroll while hero is visible and trigger the same
  // navigation as the down-arrow button.
  const hasInterceptedRef = useRef(false);

  useEffect(() => {
    if (!isHeroMode) {
      hasInterceptedRef.current = false;
      return;
    }

    const onWheel = (e: WheelEvent) => {
      if (hasInterceptedRef.current) {
        e.preventDefault();
        return;
      }
      if (e.deltaY > 0) {
        e.preventDefault();
        e.stopPropagation();
        hasInterceptedRef.current = true;
        navigateToSection('experience');
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (hasInterceptedRef.current) {
        e.preventDefault();
        return;
      }
      const currentY = e.touches[0]?.clientY ?? 0;
      const movedUp = touchStartY - currentY > 8; // up swipe implies downward scroll intent
      if (movedUp) {
        e.preventDefault();
        e.stopPropagation();
        hasInterceptedRef.current = true;
        navigateToSection('experience');
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isHeroMode, navigateToSection]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Fixed hero overlay that fades out instead of unmounting content */}
      <AnimatePresence initial={false}>
        {isHeroMode && (
          <motion.div
            key="hero-overlay"
            className="fixed inset-0 z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Hero id="hero" onNavigate={navigateToSection} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always-mounted sections to avoid layout reflow/CLS */}
      <motion.div
        initial={false}
        animate={{ opacity: isHeroMode ? 0 : 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          delay: isHeroMode ? 0 : 0.25,
        }}
        className={cn(
          'relative z-10',
          isHeroMode ? 'pointer-events-none select-none' : ''
        )}
        aria-hidden={isHeroMode}
      >
        <Experience id="experience" />
        <Contact id="contact" />
      </motion.div>
    </div>
  );
}
