import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Tag } from '@/components/ui/tag';

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
    <div className={cn('border-l-3 relative border-black/30 pl-6', className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-cactusGreen/60"
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {company && (
              <p className="text-base font-medium text-cyan-300/90">
                {company}
              </p>
            )}
          </div>
          <div className="text-sm text-white/70">
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

        {location && <p className="text-sm text-white/70">{location}</p>}

        {description && (
          <p className="leading-relaxed text-white/80">{description}</p>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="list-inside list-disc space-y-1 text-sm text-white/80">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        )}

        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tech.map((technology) => (
              <Tag key={technology} variant="glass" size="sm">
                {technology}
              </Tag>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
