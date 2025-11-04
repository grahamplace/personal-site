'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/home/header';
import { useNavigation, type Section } from './global-navigation';

export function GlobalHeader() {
  const { currentSection, navigateToSection, isHeroMode } = useNavigation();

  return (
    <>
      {/* Keep header mounted to avoid reflow; toggle only opacity/transform */}
      <motion.div
        key="header"
        initial={false}
        animate={{ y: isHeroMode ? -100 : 0, opacity: isHeroMode ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <Header
          onNavigate={(s) => navigateToSection(s as Section)}
          currentSection={currentSection}
        />
      </motion.div>
    </>
  );
}
