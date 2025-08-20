import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Tag } from '../ui/tag';

interface ResumeItemProps {
  title: string;
  company?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  highlights?: string[];
  tech?: string[];
  children?: ReactNode;
  className?: string;
}

export function ResumeItem({
  title,
  company,
  location,
  startDate,
  endDate,
  description,
  highlights,
  tech,
  children,
  className,
}: ResumeItemProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div
      className={cn('border-l-4 border-cactusGreen/70 pb-6 pl-6', className)}
    >
      <div className="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {company && (
            <p className="text-base font-medium text-cyan-300/90">{company}</p>
          )}
        </div>
        <div className="mt-1 text-sm text-white/70 sm:mt-0">
          <span>{formatDate(startDate)}</span>
          {endDate && (
            <>
              <span> - </span>
              <span>{formatDate(endDate)}</span>
            </>
          )}
          {!endDate && <span> - Present</span>}
        </div>
      </div>

      {location && <p className="mb-3 text-sm text-white/70">{location}</p>}

      {description && (
        <p className="mb-3 leading-relaxed text-white/80">{description}</p>
      )}

      {highlights && highlights.length > 0 && (
        <ul className="mb-3 list-inside list-disc space-y-1">
          {highlights.map((highlight, index) => (
            <li key={index} className="text-sm text-white/80">
              {highlight}
            </li>
          ))}
        </ul>
      )}

      {tech && tech.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tech.map((technology) => (
            <Tag key={technology} variant="secondary" size="sm">
              {technology}
            </Tag>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}
