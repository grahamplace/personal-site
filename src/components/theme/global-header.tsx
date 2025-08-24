'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/home/header';
import { useNavigation, type Section } from './global-navigation';

export function GlobalHeader() {
  const { currentSection, navigateToSection, isHeroMode } = useNavigation();

  return (
    <AnimatePresence mode="wait">
      {!isHeroMode && (
        <motion.div
          key="header"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed left-0 right-0 top-0 z-50"
        >
          <Header
            onNavigate={(s) => navigateToSection(s as Section)}
            currentSection={currentSection}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
