import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tag } from '../ui/tag';
import { useNavigation } from '@/components/theme/global-navigation';

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
  const { openBlogPost } = useNavigation();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={cn('group', className)}
    >
      <button onClick={() => openBlogPost(slug)} className="w-full text-left">
        <article
          className={cn(
            'relative h-full rounded-xl border border-white/15 p-6 shadow-md backdrop-blur-md transition-all duration-300',
            'bg-white/8 hover:bg-white/12 hover:border-white/25 hover:shadow-xl',
            'before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-300',
            'before:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)] group-hover:before:opacity-100'
          )}
        >
          <div className="space-y-4">
            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-white/70">
              <time dateTime={date}>{formatDate(date)}</time>
              {readingTime && <span>{readingTime}</span>}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white/95 transition-colors group-hover:text-white">
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
            <div className="flex items-center text-sm font-medium text-white/85 transition-colors group-hover:text-white">
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
      </button>
    </motion.div>
  );
}
