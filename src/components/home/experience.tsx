'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Resume } from '@/components/resume/resume';
import { GlassPane } from '@/components/ui/glass-pane';
import { useNavigation } from '@/components/theme/global-navigation';

interface ExperienceProps {
  className?: string;
  id?: string;
}

export function Experience({ className, id }: ExperienceProps) {
  const { isHeroMode, currentSection } = useNavigation();
  const shouldReveal = !isHeroMode || currentSection !== 'hero';
  return (
    <section
      id={id}
      className={cn('relative mt-32 scroll-mt-48 md:mt-40', className)}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8 pt-12 md:pb-12 md:pt-12">
        {/* Experience Pane (slide entire frosted pane) */}
        <motion.div
          initial={false}
          animate={shouldReveal ? { y: 0 } : { y: '110vh' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ willChange: 'transform' }}
        >
          <GlassPane variant="default" className="mx-auto max-w-4xl">
            <Resume />
          </GlassPane>
        </motion.div>
      </div>
    </section>
  );
}
