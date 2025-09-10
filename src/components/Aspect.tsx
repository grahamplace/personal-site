import * as React from 'react';

interface AspectProps {
  ratio?: number;
  className?: string;
  children: React.ReactNode;
}

export default function Aspect({
  ratio = 3 / 2,
  className,
  children,
}: AspectProps) {
  return (
    <div className={className} style={{ aspectRatio: String(ratio) }}>
      {children}
    </div>
  );
}
