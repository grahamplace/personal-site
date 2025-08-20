import { cn } from '@/lib/utils';

interface StatProps {
  label: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Stat({
  label,
  value,
  description,
  trend,
  className,
  size = 'md',
}: StatProps) {
  const sizeClasses = {
    sm: {
      container: 'space-y-1',
      value: 'text-2xl font-bold',
      label: 'text-sm font-medium',
      description: 'text-xs',
    },
    md: {
      container: 'space-y-2',
      value: 'text-3xl font-bold',
      label: 'text-sm font-medium',
      description: 'text-sm',
    },
    lg: {
      container: 'space-y-3',
      value: 'text-4xl font-bold',
      label: 'text-base font-medium',
      description: 'text-sm',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={cn('flex flex-col', classes.container, className)}>
      <dt className={cn('text-gray-600', classes.label)}>{label}</dt>
      <dd className={cn('text-gray-900', classes.value)}>{value}</dd>
      {description && (
        <p className={cn('text-gray-500', classes.description)}>
          {description}
        </p>
      )}
      {trend && (
        <div className="flex items-center space-x-1">
          <span
            className={cn(
              'text-xs font-medium',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            {trend.isPositive ? '+' : ''}
            {trend.value}%
          </span>
          <svg
            className={cn(
              'h-3 w-3',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {trend.isPositive ? (
              <path
                fillRule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </div>
      )}
    </div>
  );
}
