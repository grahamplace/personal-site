import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function ResumeSection({
  title,
  children,
  className,
  id,
}: ResumeSectionProps) {
  return (
    <section id={id} className={cn('mb-8', className)}>
      <h2 className="mb-6 border-b border-white/20 pb-2 text-2xl font-bold text-white">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
