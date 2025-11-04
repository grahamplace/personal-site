'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassPane } from '@/components/ui/glass-pane';
import { useNavigation } from '@/components/theme/global-navigation';

interface ContactProps {
  className?: string;
  id?: string;
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

export function Contact({ className, id }: ContactProps) {
  const { isHeroMode } = useNavigation();
  return (
    <section id={id} className={cn('relative scroll-mt-48', className)}>
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8 pt-16 md:pb-12 md:pt-24">
        {/* Contact Pane (slide entire frosted pane) */}
        <motion.div
          initial={false}
          animate={isHeroMode ? { y: '110vh' } : { y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ willChange: 'transform' }}
        >
          <GlassPane variant="default" className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
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
            </div>
          </GlassPane>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={false}
          animate={isHeroMode ? { y: '110vh' } : { y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt: 10 text-center md:mt-14"
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
      </div>
    </section>
  );
}
