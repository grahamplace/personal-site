'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Resume } from '@/components/resume/resume';
import { GlassPane } from '@/components/ui/glass-pane';

interface ExperienceProps {
  className?: string;
  id?: string;
  onBack?: () => void;
}

export function Experience({ className, id, onBack }: ExperienceProps) {
  return (
    <motion.section
      id={id}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('relative mt-40 scroll-mt-56 md:mt-56', className)}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8 pt-12 md:pb-12 md:pt-12">
        {/* Experience Content */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
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
