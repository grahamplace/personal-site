'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BlogCard } from '@/components/blog/blog-card';
import { GlassPane } from '@/components/ui/glass-pane';

interface GradientBlogProps {
  className?: string;
  onBack: () => void;
}

// Sample blog posts data
const blogPosts = [
  {
    title: 'Lessons from Scaling Data Infrastructure',
    summary:
      'Notes on contracts, SLAs, and cost control from scaling data services at Opendoor.',
    date: '2024-08-19',
    tags: ['data', 'infra', 'reliability'],
    slug: 'lessons-from-scaling-data-infra',
    readingTime: '8 min read',
  },
  {
    title: 'Building for Product-Market Fit',
    summary:
      'What I learned about user research, iteration speed, and metrics while building Foundation.',
    date: '2024-07-15',
    tags: ['product', 'startup', 'pmf'],
    slug: 'building-for-product-market-fit',
    readingTime: '6 min read',
  },
  {
    title: 'The Indie Developer Playbook',
    summary:
      'How to validate, build, and monetize micro-products as a solo developer.',
    date: '2024-06-28',
    tags: ['indie', 'monetization', 'solo'],
    slug: 'indie-developer-playbook',
    readingTime: '10 min read',
  },
];

export function GradientBlog({ className, onBack }: GradientBlogProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('relative min-h-screen', className)}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-64">
        {/* Blog Posts Grid */}
        <GlassPane variant="default" className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <BlogCard
                  {...post}
                  className="border border-gray-200/50 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 hover:shadow-lg"
                />
              </motion.div>
            ))}
          </motion.div>
        </GlassPane>
      </div>
    </motion.section>
  );
}
