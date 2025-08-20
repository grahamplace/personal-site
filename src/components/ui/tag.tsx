import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: ReactNode;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Tag({
  children,
  variant = 'default',
  size = 'md',
  className,
}: TagProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-cactusGreen/10 text-cactusGreen',
    secondary: 'bg-fogBlue/10 text-fogBlue',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-sandstone/10 text-sandstone',
    error: 'bg-sunsetOrange/10 text-sunsetOrange',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
