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
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-64">
        {/* Experience Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          <GlassPane variant="default" className="mx-auto max-w-4xl">
            <Resume />
          </GlassPane>
        </motion.div>
      </div>
    </motion.section>
  );
}
