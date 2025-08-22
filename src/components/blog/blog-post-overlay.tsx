'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/components/theme/global-navigation';
import { GlassPane } from '@/components/ui/glass-pane';
import { BlogPostClient } from '@/components/blog/blog-post-client';

export function BlogPostOverlay() {
  const { currentBlogSlug, closeBlogPost } = useNavigation();

  if (!currentBlogSlug) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={closeBlogPost}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative m-6 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassPane variant="strong" className="p-6 sm:p-8">
            <div className="relative">
              <button
                onClick={closeBlogPost}
                className="absolute -right-4 -top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <BlogPostClient slug={currentBlogSlug} />
            </div>
          </GlassPane>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
