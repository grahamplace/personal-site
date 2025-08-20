import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CaseStudyBodyProps {
  children: ReactNode;
  className?: string;
}

export function CaseStudyBody({ children, className }: CaseStudyBodyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={cn('prose prose-lg max-w-none', className)}
    >
      {children}
    </motion.div>
  );
}
