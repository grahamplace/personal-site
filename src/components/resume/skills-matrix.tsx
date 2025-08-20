import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tag } from '../ui/tag';

interface SkillCategory {
  name: string;
  skills: string[];
  color?: 'primary' | 'secondary' | 'success' | 'warning';
}

interface SkillsMatrixProps {
  categories: SkillCategory[];
  className?: string;
  title?: string;
}

export function SkillsMatrix({
  categories,
  className,
  title = 'Skills',
}: SkillsMatrixProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="space-y-3"
          >
            <h4 className="text-lg font-medium text-gray-900">
              {category.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Tag
                  key={skill}
                  variant={category.color || 'default'}
                  size="sm"
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
