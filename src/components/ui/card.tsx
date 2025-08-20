import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className,
  href,
  onClick,
  hover = true,
  padding = 'md',
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = cn(
    'rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200',
    paddingClasses[padding],
    hover && 'hover:shadow-md hover:border-gray-300',
    className
  );

  const Component = href ? 'a' : onClick ? 'button' : 'div';

  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <Component
        href={href}
        onClick={onClick}
        className={baseClasses}
        {...(href && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </Component>
    </motion.div>
  );
}
