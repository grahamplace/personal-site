'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
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

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero section with exit animation */}
      <AnimatePresence mode="wait">
        {isHeroMode && (
          <Hero key="hero" id="hero" onNavigate={navigateToSection} />
        )}
      </AnimatePresence>

      {/* Other sections with entrance animation */}
      <AnimatePresence mode="wait">
        {!isHeroMode && (
          <>
            <Experience
              key="experience"
              id="experience"
              onBack={() => navigateToSection('hero')}
            />
            <Blog
              key="blog"
              id="blog"
              onBack={() => navigateToSection('hero')}
            />
            <Contact
              key="contact"
              id="contact"
              onBack={() => navigateToSection('hero')}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
