import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ThemeAccentProps {
  children: ReactNode;
  className?: string;
  variant?:
    | 'cactusGreen'
    | 'sandstone'
    | 'sunsetOrange'
    | 'fogBlue'
    | 'skylineInk';
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeAccent({
  children,
  className,
  variant = 'cactusGreen',
  size = 'md',
}: ThemeAccentProps) {
  const variantClasses = {
    cactusGreen: 'text-cactusGreen bg-cactusGreen/10 border-cactusGreen/20',
    sandstone: 'text-sandstone bg-sandstone/10 border-sandstone/20',
    sunsetOrange: 'text-sunsetOrange bg-sunsetOrange/10 border-sunsetOrange/20',
    fogBlue: 'text-fogBlue bg-fogBlue/10 border-fogBlue/20',
    skylineInk: 'text-skylineInk bg-skylineInk/10 border-skylineInk/20',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
