'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GradientHero } from './gradient-hero';
import { GradientHeader } from './gradient-header';
import { GradientExperience } from './gradient-experience';
import { GradientBlog } from './gradient-blog';
import { GradientContact } from './gradient-contact';
import { Gradient } from '@/lib/gradient.js';
import clsx from 'clsx';
import {
  type Section,
  getSectionGradientColors,
  getSectionGradientColorsForLibrary,
  updateCssGradientColors,
  initializeCssGradientColors,
} from '@/lib/colors';

function GradientContainerInner() {
  const [gradient, setGradient] = useState<Gradient | null>(null);
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize CSS gradient colors with hero section colors
    initializeCssGradientColors();

    const newGradient = new Gradient();
    (newGradient as any).initGradient('#gradient-canvas');
    setGradient(newGradient);
    setIsInitialized(true);
  }, []);

  const handleNavigate = (section: string) => {
    if (
      gradient &&
      (section === 'hero' ||
        section === 'experience' ||
        section === 'blog' ||
        section === 'contact')
    ) {
      const sectionKey = section as Section;
      const gradientColors = getSectionGradientColorsForLibrary(sectionKey);

      // Update both the gradient and CSS variables
      (gradient as any).updateColors(gradientColors);
      updateCssGradientColors(sectionKey);
      setCurrentSection(sectionKey);
    }
  };

  const handleBack = () => {
    if (gradient) {
      const gradientColors = getSectionGradientColorsForLibrary('hero');

      // Update both the gradient and CSS variables
      (gradient as any).updateColors(gradientColors);
      updateCssGradientColors('hero');
      setCurrentSection('hero');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {!isInitialized && (
        <div className="flex h-screen items-center justify-center">
          <div className="text-xl text-white">Loading...</div>
        </div>
      )}
      <div className={isInitialized ? '' : 'hidden'}>
        <canvas
          className={clsx('fixed right-0 top-0 -z-10 h-full w-full')}
          id="gradient-canvas"
          data-transition-in
        />
        {/* Vignette overlay for subtle edge shading without altering gradient */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_40%,rgba(0,0,0,0.06)_70%,rgba(0,0,0,0.16)_100%)]"
        />

        {/* Header - only show when not on hero page */}
        <AnimatePresence>
          {currentSection !== 'hero' && (
            <GradientHeader
              key="header"
              onNavigate={handleNavigate}
              onBack={handleBack}
              showBackButton={true}
              currentSection={currentSection}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          {currentSection === 'hero' && (
            <GradientHero key="hero" onNavigate={handleNavigate} />
          )}
          {currentSection === 'experience' && (
            <GradientExperience key="experience" onBack={handleBack} />
          )}
          {currentSection === 'blog' && (
            <GradientBlog key="blog" onBack={handleBack} />
          )}
          {currentSection === 'contact' && (
            <GradientContact key="contact" onBack={handleBack} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function GradientContainer() {
  return <GradientContainerInner />;
}
