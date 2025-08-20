import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
  container?: boolean;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({
  children,
  className,
  id,
  as: Component = 'section',
  container = true,
  spacing = 'lg',
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };

  return (
    <Component id={id} className={cn(spacingClasses[spacing], className)}>
      {container ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}
