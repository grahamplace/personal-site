'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GradientHero } from './gradient-hero';
import { GradientExperience } from './gradient-experience';
import { GradientBlog } from './gradient-blog';
import { GradientContact } from './gradient-contact';
import { Gradient } from '@/lib/gradient.js';
import clsx from 'clsx';

type Section = 'hero' | 'experience' | 'blog' | 'contact';

// Ultra-dark cohesive palette; subtle differences between hues
const sectionColorSets = [
  ['#0b0f14', '#0e1623', '#111b2a', '#152234'], // hero
  ['#0e1623', '#111b2a', '#152234', '#0b0f14'], // experience
  ['#111b2a', '#152234', '#0b0f14', '#0e1623'], // blog
  ['#152234', '#0b0f14', '#0e1623', '#111b2a'], // contact
];

function GradientContainerInner() {
  const [gradient, setGradient] = useState<Gradient | null>(null);
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const newGradient = new Gradient();
    (newGradient as any).initGradient('#gradient-canvas');
    setGradient(newGradient);
    setIsInitialized(true);
  }, []);

  const handleNavigate = (section: string) => {
    const sectionIndex = ['hero', 'experience', 'blog', 'contact'].indexOf(
      section
    );
    if (sectionIndex !== -1 && gradient) {
      const newColors = sectionColorSets[sectionIndex].map((color) =>
        parseInt(color.replace('#', ''), 16)
      );
      (gradient as any).updateColors(newColors);
      setCurrentSection(section as Section);
    }
  };

  const handleBack = () => {
    if (gradient) {
      const heroColors = sectionColorSets[0].map((color) =>
        parseInt(color.replace('#', ''), 16)
      );
      (gradient as any).updateColors(heroColors);
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
