'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function BlogRouteHeader() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setIsCompact(y > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-md"
    >
      <motion.div
        layout
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-6 text-center"
        style={{
          paddingTop: isCompact ? 8 : 16,
          paddingBottom: isCompact ? 8 : 16,
        }}
      >
        <AnimatePresence initial={false}>
          {!isCompact && (
            <motion.h1
              key="blog-title"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="font-raleway text-3xl font-black text-white sm:text-4xl"
            >
              Graham Place
            </motion.h1>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
