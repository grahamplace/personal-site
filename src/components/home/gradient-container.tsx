'use client';

import { useNavigation } from '@/components/theme/global-navigation';
import { GradientHero } from './gradient-hero';
import { GradientExperience } from './gradient-experience';
import { GradientBlog } from './gradient-blog';
import { GradientContact } from './gradient-contact';

export function GradientContainer() {
  const { navigateToSection } = useNavigation();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Stacked single-page sections with anchors */}
      <GradientHero id="hero" onNavigate={navigateToSection} />
      <GradientExperience
        id="experience"
        onBack={() => navigateToSection('hero')}
      />
      <GradientBlog id="blog" onBack={() => navigateToSection('hero')} />
      <GradientContact id="contact" onBack={() => navigateToSection('hero')} />
    </div>
  );
}
