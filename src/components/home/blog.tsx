'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BlogCard } from '@/components/blog/blog-card';
import { GlassPane } from '@/components/ui/glass-pane';

interface BlogProps {
  className?: string;
  id?: string;
  onBack?: () => void;
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

export function Blog({ className, id }: BlogProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
      className={cn('relative scroll-mt-48', className)}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8 pt-16 md:pb-12 md:pt-24">
        {/* Blog Posts Grid */}
        <GlassPane variant="default" className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-4 sm:grid-cols-1 md:gap-6 lg:grid-cols-2"
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        </GlassPane>
      </div>
    </motion.section>
  );
}
