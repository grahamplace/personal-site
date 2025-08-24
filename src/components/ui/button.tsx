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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'w-40 rounded-lg border px-8 py-4 text-lg font-medium shadow-lg backdrop-blur-sm transition-all duration-300',
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
      // Disable for now
      //   onMouseEnter={(e) => {
      //     if (accentColor && !isActive) {
      //       e.currentTarget.style.borderColor = accentColor;
      //       e.currentTarget.style.boxShadow = `0 10px 25px -3px ${accentColor}40`;
      //     }
      //   }}
      //   onMouseLeave={(e) => {
      //     if (accentColor && !isActive) {
      //       e.currentTarget.style.borderColor = '';
      //       e.currentTarget.style.boxShadow = '';
      //     }
      //   }}
    >
      {children}
    </motion.button>
  );
}
