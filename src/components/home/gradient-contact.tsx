'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassPane } from '@/components/ui/glass-pane';

interface GradientContactProps {
  className?: string;
  onBack: () => void;
}

const contactMethods = [
  {
    label: 'Email',
    value: 'graham@example.com',
    href: 'mailto:graham@example.com',
    icon: '📧',
  },
  {
    label: 'Twitter',
    value: '@grahamplace',
    href: 'https://twitter.com/grahamplace',
    icon: '🐦',
  },
  {
    label: 'LinkedIn',
    value: 'in/grahamplace',
    href: 'https://linkedin.com/in/grahamplace',
    icon: '💼',
  },
  {
    label: 'GitHub',
    value: 'grahamplace',
    href: 'https://github.com/grahamplace',
    icon: '🛠️',
  },
];

export function GradientContact({ className, onBack }: GradientContactProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('relative min-h-screen', className)}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 space-y-6 text-center"
        >
          <GlassPane variant="strong" className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-bold text-white sm:text-6xl">
              Contact
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-white/85">
              Let&apos;s build something together. Reach out for collaborations,
              opportunities, or just to chat.
            </p>
          </GlassPane>
        </motion.div>

        {/* Contact Methods */}
        <GlassPane variant="default" className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/8 hover:bg-white/12 group rounded-lg border border-white/15 p-6 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{method.icon}</div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-white/70">
                      {method.label}
                    </div>
                    <div className="text-lg font-semibold text-white transition-colors group-hover:text-white/90">
                      {method.value}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </GlassPane>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <GlassPane variant="default" className="mx-auto max-w-3xl">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Open to new opportunities
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-white/85">
              I&apos;m always interested in hearing about new projects,
              especially those involving data systems, product development, or
              early-stage startups.
            </p>
            <motion.a
              href="mailto:graham@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block rounded-lg bg-white/20 px-8 py-4 text-lg font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:shadow-xl"
            >
              Get in touch
            </motion.a>
          </GlassPane>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="rounded-lg border border-white/30 bg-white/20 px-8 py-4 text-lg font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:shadow-xl"
          >
            ← Back to Home
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
