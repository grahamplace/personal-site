'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GradientButton } from '@/components/ui/gradient-button';
import { getSectionAccentColor } from '@/lib/colors';

interface GradientHeaderProps {
  className?: string;
  onNavigate: (section: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
  currentSection?: string;
}

const navigationItems = [
  { id: 'experience' as const, label: 'Experience' },
  { id: 'blog' as const, label: 'Blog' },
  { id: 'contact' as const, label: 'Contact' },
];

export function GradientHeader({
  className,
  onNavigate,
  onBack,
  showBackButton = false,
  currentSection,
}: GradientHeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-center"
        >
          <h1 className="font-raleway text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Graham Place
          </h1>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          {showBackButton && onBack && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="w-40 rounded-lg border border-white/30 bg-white/20 px-8 py-4 text-lg font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:shadow-xl"
            >
              ← Home
            </motion.button>
          )}

          {navigationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <GradientButton
                onClick={() => onNavigate(item.id)}
                isActive={currentSection === item.id}
                accentColor={getSectionAccentColor(item.id)}
              >
                {item.label}
              </GradientButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.header>
  );
}
