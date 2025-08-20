import { cn } from '@/lib/utils';
import { Stat } from './stat';

interface KPI {
  label: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface KPIListProps {
  kpis: KPI[];
  columns?: 2 | 3 | 4;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function KPIList({
  kpis,
  columns = 3,
  className,
  title,
  subtitle,
}: KPIListProps) {
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('space-y-6', className)}>
      {(title || subtitle) && (
        <div className="text-center">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      <div className={cn('grid gap-6', gridClasses[columns])}>
        {kpis.map((kpi, index) => (
          <Stat
            key={index}
            label={kpi.label}
            value={kpi.value}
            description={kpi.description}
            trend={kpi.trend}
          />
        ))}
      </div>
    </div>
  );
}
