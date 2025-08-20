'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Resume } from '@/components/resume/resume';
import { GlassPane } from '@/components/ui/glass-pane';

interface GradientExperienceProps {
  className?: string;
  onBack: () => void;
}

export function GradientExperience({
  className,
  onBack,
}: GradientExperienceProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('relative min-h-screen', className)}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 space-y-6 text-center"
        >
          <GlassPane variant="strong" className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-bold text-white sm:text-6xl">
              Experience
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-white/85">
              Building products and teams across data, infrastructure, and
              fintech.
            </p>
          </GlassPane>
        </motion.div>

        {/* Experience Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-12"
        >
          <GlassPane variant="default" className="mx-auto max-w-4xl">
            <Resume />
          </GlassPane>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="rounded-lg border border-white/30 bg-white/20 px-8 py-4 text-lg font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:shadow-xl"
          >
            ← Back to Home
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
