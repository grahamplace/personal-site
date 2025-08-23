'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Resume } from '@/components/resume/resume';
import { GlassPane } from '@/components/ui/glass-pane';

interface GradientExperienceProps {
  className?: string;
  id?: string;
  onBack: () => void;
}

export function GradientExperience({
  className,
  id,
  onBack,
}: GradientExperienceProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className={cn('relative', className)}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-80">
        {/* Experience Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
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
