'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  accentColor?: string;
}

export function Button({
  children,
  onClick,
  className,
  isActive = false,
  accentColor,
}: ButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'w-30 rounded-lg border px-6 py-3 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-300 lg:w-36 lg:text-base',
        isActive
          ? 'border-white/50 bg-white/40 text-white shadow-xl'
          : 'border-white/30 bg-white/20 text-white hover:bg-white/30 hover:shadow-xl',
        className
      )}
      style={
        {
          '--accent-color': accentColor,
        } as React.CSSProperties
      }
    >
      {children}
    </motion.button>
  );
}
