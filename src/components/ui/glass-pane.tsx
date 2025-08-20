import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassPaneProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'strong';
}

export function GlassPane({
  children,
  className,
  variant = 'default',
}: GlassPaneProps) {
  const variants = {
    default:
      'bg-white/12 backdrop-blur-md backdrop-saturate-150 border border-white/20 ring-1 ring-white/10 shadow-xl',
    subtle:
      'bg-white/6 backdrop-blur-sm backdrop-saturate-125 border border-white/10 ring-1 ring-white/5 shadow-lg',
    strong:
      'bg-white/24 backdrop-blur-lg backdrop-saturate-150 border border-white/30 ring-1 ring-white/10 shadow-2xl',
  } as const;

  return (
    <div
      className={cn(
        'rounded-3xl p-6 transition-colors sm:p-8 lg:p-10',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
