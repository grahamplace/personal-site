import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tag } from '../ui/tag';

interface BlogCardProps {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  slug: string;
  readingTime?: string;
  className?: string;
}

export function BlogCard({
  title,
  summary,
  date,
  tags,
  slug,
  readingTime,
  className,
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn('group', className)}
    >
      <Link href={`/blog/${slug}`}>
        <article className="bg-white/8 hover:bg-white/12 h-full rounded-lg border border-white/15 p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:shadow-md">
          <div className="space-y-4">
            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-white/70">
              <time dateTime={date}>{formatDate(date)}</time>
              {readingTime && <span>{readingTime}</span>}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-cyan-300">
              {title}
            </h3>

            {/* Summary */}
            <p className="line-clamp-3 leading-relaxed text-white/80">
              {summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <Tag key={tag} variant="secondary" size="sm">
                  {tag}
                </Tag>
              ))}
              {tags.length > 3 && (
                <span className="text-sm text-white/60">
                  +{tags.length - 3} more
                </span>
              )}
            </div>

            {/* Read More */}
            <div className="flex items-center text-sm font-medium text-cyan-300 group-hover:underline">
              Read more
              <svg
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
