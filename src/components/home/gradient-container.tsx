'use client';

import { AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/components/theme/global-navigation';
import { GradientHero } from './gradient-hero';
import { GradientExperience } from './gradient-experience';
import { GradientBlog } from './gradient-blog';
import { GradientContact } from './gradient-contact';

export function GradientContainer() {
  const { navigateToSection, isHeroMode } = useNavigation();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero section with exit animation */}
      <AnimatePresence mode="wait">
        {isHeroMode && (
          <GradientHero key="hero" id="hero" onNavigate={navigateToSection} />
        )}
      </AnimatePresence>

      {/* Spacer to allow scroll-driven hero transition when in hero mode */}
      {isHeroMode && <div aria-hidden className="h-[400px] w-full" />}

      {/* Other sections with entrance animation */}
      <AnimatePresence mode="wait">
        {!isHeroMode && (
          <>
            <GradientExperience
              key="experience"
              id="experience"
              onBack={() => navigateToSection('hero')}
            />
            <GradientBlog
              key="blog"
              id="blog"
              onBack={() => navigateToSection('hero')}
            />
            <GradientContact
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
