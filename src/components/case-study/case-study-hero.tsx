import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tag } from '../ui/tag';
import Aspect from '@/components/Aspect';
import { KPIList } from '../ui/kpi-list';

interface CaseStudyHeroProps {
  title: string;
  subtitle?: string;
  problem: string;
  solution: string;
  impact: string[];
  metrics: Record<string, string | number>;
  tech: string[];
  image?: string;
  className?: string;
}

export function CaseStudyHero({
  title,
  subtitle,
  problem,
  solution,
  impact,
  metrics,
  tech,
  image,
  className,
}: CaseStudyHeroProps) {
  const kpis = Object.entries(metrics).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('space-y-8', className)}
    >
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-3xl text-xl text-gray-600">{subtitle}</p>
        )}
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap justify-center gap-2">
        {tech.map((technology) => (
          <Tag key={technology} variant="primary" size="md">
            {technology}
          </Tag>
        ))}
      </div>

      {/* Problem & Solution */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">The Problem</h3>
          <p className="leading-relaxed text-gray-600">{problem}</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">The Solution</h3>
          <p className="leading-relaxed text-gray-600">{solution}</p>
        </div>
      </div>

      {/* Impact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Impact</h3>
        <ul className="space-y-2">
          {impact.map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cactusGreen" />
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics */}
      <KPIList kpis={kpis} columns={3} title="Key Metrics" />

      {/* Hero Image */}
      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden rounded-lg shadow-lg"
        >
          <Aspect ratio={16 / 9}>
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </Aspect>
        </motion.div>
      )}
    </motion.div>
  );
}
