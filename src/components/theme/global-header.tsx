'use client';

import { GradientHeader } from '@/components/home/gradient-header';
import { useNavigation, type Section } from './global-navigation';

export function GlobalHeader() {
  const { currentSection, isHomePage, navigateToSection } = useNavigation();

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 transition-opacity duration-300 ${
        isHomePage ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <GradientHeader
        onNavigate={(s) => navigateToSection(s as Section)}
        currentSection={currentSection}
      />
    </div>
  );
}
