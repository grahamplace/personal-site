import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AutoHeaderGraphicProps {
  tags: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AutoHeaderGraphic({
  tags,
  className,
  size = 'md',
}: AutoHeaderGraphicProps) {
  const { shapes } = useMemo(() => {
    // Create a deterministic hash from tags
    const tagString = tags.sort().join(',');
    let hash = 0;
    for (let i = 0; i < tagString.length; i++) {
      const char = tagString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Generate colors from hash
    const colorPalette = [
      'cactusGreen',
      'sandstone',
      'sunsetOrange',
      'fogBlue',
      'skylineInk',
    ];

    const colors = [
      colorPalette[Math.abs(hash) % colorPalette.length],
      colorPalette[Math.abs(hash >> 8) % colorPalette.length],
      colorPalette[Math.abs(hash >> 16) % colorPalette.length],
    ];

    // Generate shapes from hash
    const shapeTypes = ['circle', 'square', 'triangle', 'diamond'];
    const shapes = [
      {
        type: shapeTypes[Math.abs(hash) % shapeTypes.length],
        color: colors[0],
        x: (Math.abs(hash) % 80) + 10,
        y: (Math.abs(hash >> 4) % 60) + 20,
        size: (Math.abs(hash >> 8) % 20) + 10,
      },
      {
        type: shapeTypes[Math.abs(hash >> 12) % shapeTypes.length],
        color: colors[1],
        x: (Math.abs(hash >> 16) % 80) + 10,
        y: (Math.abs(hash >> 20) % 60) + 20,
        size: (Math.abs(hash >> 24) % 20) + 10,
      },
      {
        type: shapeTypes[Math.abs(hash >> 28) % shapeTypes.length],
        color: colors[2],
        x: (Math.abs(hash >> 32) % 80) + 10,
        y: (Math.abs(hash >> 36) % 60) + 20,
        size: (Math.abs(hash >> 40) % 20) + 10,
      },
    ];

    return { shapes, colors };
  }, [tags]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const renderShape = (shape: {
    type: string;
    color: string;
    x: number;
    y: number;
    size: number;
  }) => {
    const colorClass = `bg-${shape.color}`;

    switch (shape.type) {
      case 'circle':
        return (
          <motion.div
            key={`${shape.type}-${shape.x}-${shape.y}`}
            className={cn('absolute rounded-full', colorClass)}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.6, delay: Math.random() * 0.5 }}
          />
        );
      case 'square':
        return (
          <motion.div
            key={`${shape.type}-${shape.x}-${shape.y}`}
            className={cn('absolute', colorClass)}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.6, delay: Math.random() * 0.5 }}
          />
        );
      case 'triangle':
        return (
          <motion.div
            key={`${shape.type}-${shape.x}-${shape.y}`}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid var(--color)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.6, delay: Math.random() * 0.5 }}
          />
        );
      case 'diamond':
        return (
          <motion.div
            key={`${shape.type}-${shape.x}-${shape.y}`}
            className={cn('absolute rotate-45', colorClass)}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.6, delay: Math.random() * 0.5 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100',
        sizeClasses[size],
        className
      )}
    >
      {shapes.map(renderShape)}
    </div>
  );
}
