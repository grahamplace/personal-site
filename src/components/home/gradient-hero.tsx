'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientHeroProps {
  className?: string;
  onNavigate: (section: string) => void;
}

const navigationItems = [
  { id: 'experience', label: 'Experience', color: 'cactusGreen' },
  { id: 'blog', label: 'Blog', color: 'sandstone' },
  { id: 'contact', label: 'Contact', color: 'sunsetOrange' },
];

export function GradientHero({ className, onNavigate }: GradientHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'relative flex min-h-screen items-center justify-center',
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10 space-y-12 text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-6xl font-bold text-white sm:text-7xl lg:text-8xl">
            Graham Place
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
            Software engineer & builder focused on data systems and product
            impact.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col justify-center gap-6 sm:flex-row"
        >
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.id)}
              className="w-40 rounded-lg border border-white/30 bg-white/20 px-8 py-4 text-lg font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:shadow-xl"
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
