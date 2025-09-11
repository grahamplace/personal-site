'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@/components/theme/global-navigation';
import { Hero } from './hero';
import { Experience } from './experience';
import { Blog } from './blog';
import { Contact } from './contact';

function useFakeScroll(): ['up' | 'down' | null, () => void] {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [isSwallowing, setIsSwallowing] = useState(false);

  const triggerSwallowing = () => {
    setIsSwallowing(true);
    setTimeout(() => setIsSwallowing(false), 5000);
  };

  useEffect(() => {
    let upCount = 0;
    let downCount = 0;
    let lastResetTime = Date.now();
    const THRESHOLD = 3; // Number of scroll events needed
    const TIME_WINDOW = 300; // Time window in ms

    const resetCounts = () => {
      upCount = 0;
      downCount = 0;
      lastResetTime = Date.now();
    };

    const handleWheel = (e: WheelEvent) => {
      // Swallow scroll events for 1000ms after navigation
      if (isSwallowing) {
        console.log('Swallowing wheel event');
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const now = Date.now();

      // Reset counts if too much time has passed
      if (now - lastResetTime > TIME_WINDOW) {
        resetCounts();
      }

      const newDirection = e.deltaY < 0 ? 'up' : 'down';

      if (newDirection === 'up') {
        upCount++;
        downCount = 0; // Reset opposite direction
      } else {
        downCount++;
        upCount = 0; // Reset opposite direction
      }

      // Set direction only if threshold is met
      if (upCount >= THRESHOLD) {
        setDirection('up');
        setTimeout(() => setDirection(null), 100);
        resetCounts();
      } else if (downCount >= THRESHOLD) {
        setDirection('down');
        setTimeout(() => setDirection(null), 100);
        resetCounts();
      }
    };

    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      // Swallow touch events for 1000ms after navigation
      if (isSwallowing) {
        return;
      }
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Swallow touch events for 1000ms after navigation
      if (isSwallowing) {
        return;
      }

      const currentY = e.touches[0].clientY;
      const dir = currentY > startY ? 'down' : 'up';
      const now = Date.now();

      // Reset counts if too much time has passed
      if (now - lastResetTime > TIME_WINDOW) {
        resetCounts();
      }

      if (dir === 'up') {
        upCount++;
        downCount = 0; // Reset opposite direction
      } else {
        downCount++;
        upCount = 0; // Reset opposite direction
      }

      // Set direction only if threshold is met
      if (upCount >= THRESHOLD) {
        setDirection('up');
        setTimeout(() => setDirection(null), 100);
        resetCounts();
      } else if (downCount >= THRESHOLD) {
        setDirection('down');
        setTimeout(() => setDirection(null), 100);
        resetCounts();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isSwallowing]);

  return [direction, triggerSwallowing];
}

export function Container() {
  const { navigateToSection, isHeroMode } = useNavigation();
  // const [scrollDirection, triggerSwallowing] = useFakeScroll();

  // useEffect(() => {
  //   if (scrollDirection && isHeroMode && scrollDirection === 'down') {
  //     navigateToSection('experience');
  //     // Swallow scroll events for 200ms after navigation
  //     triggerSwallowing();
  //   }
  // }, [scrollDirection, isHeroMode]);

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
        <Experience id="experience" onBack={() => navigateToSection('hero')} />
        <Blog id="blog" onBack={() => navigateToSection('hero')} />
        <Contact id="contact" onBack={() => navigateToSection('hero')} />
      </motion.div>
    </div>
  );
}
