'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassPane } from '@/components/ui/glass-pane';

interface ContactProps {
  className?: string;
  id?: string;
}

const contactMethods = [
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
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
      className={cn('relative scroll-mt-48', className)}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8 md:pb-12 ">
        {/* Contact Methods */}
        <GlassPane variant="default" className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-4 sm:grid-cols-2 md:gap-6"
          >
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
      </div>
    </motion.section>
  );
}
