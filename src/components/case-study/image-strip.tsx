import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageStripProps {
  images: string[];
  className?: string;
  layout?: 'grid' | 'carousel' | 'stacked';
}

export function ImageStrip({
  images,
  className,
  layout = 'grid',
}: ImageStripProps) {
  if (layout === 'carousel') {
    return (
      <div className={cn('relative overflow-hidden rounded-lg', className)}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-48 w-80 flex-shrink-0 overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={image}
                alt={`Screenshot ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === 'stacked') {
    return (
      <div className={cn('space-y-4', className)}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={image}
              alt={`Screenshot ${index + 1}`}
              className="h-auto w-full"
            />
          </motion.div>
        ))}
      </div>
    );
  }

  // Default grid layout
  return (
    <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', className)}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src={image}
            alt={`Screenshot ${index + 1}`}
            className="h-auto w-full"
          />
        </motion.div>
      ))}
    </div>
  );
}
