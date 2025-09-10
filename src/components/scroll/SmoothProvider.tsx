'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import { useReducedMotionPref } from './useReducedMotionPref';

interface Props {
  children: ReactNode;
}

export function SmoothProvider({ children }: Props) {
  const reduced = useReducedMotionPref();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ smoothWheel: true, smoothTouch: false });
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      // @ts-expect-error types may not include destroy depending on version
      lenis.destroy?.();
    };
  }, [reduced]);

  return <>{children}</>;
}
