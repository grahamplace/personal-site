'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
        <motion.h1
          layout
          initial={false}
          animate={{
            opacity: isCompact ? 0 : 1,
            y: isCompact ? -6 : 0,
            height: isCompact ? 0 : 'auto',
            marginBottom: isCompact ? 0 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="font-raleway overflow-hidden text-3xl font-black text-white sm:text-4xl"
          aria-hidden={isCompact}
        >
          Graham Place
        </motion.h1>
      </motion.div>
    </motion.header>
  );
}
