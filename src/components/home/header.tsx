'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { getSectionAccentColor } from '@/lib/colors';

interface HeaderProps {
  className?: string;
  onNavigate: (section: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
  currentSection?: string;
}

const navigationItems = [
  { id: 'hero' as const, label: '← Home' },
  { id: 'experience' as const, label: 'Experience' },
  { id: 'blog' as const, label: 'Blog' },
  { id: 'contact' as const, label: 'Contact' },
];

export function Header({ className, onNavigate, currentSection }: HeaderProps) {
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
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Button
                onClick={() => onNavigate(item.id)}
                isActive={currentSection === item.id}
                accentColor={getSectionAccentColor(item.id)}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.header>
  );
}
