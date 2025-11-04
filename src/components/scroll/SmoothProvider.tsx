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

    // @ts-expect-error smoothTouch may not exist in all Lenis versions
    const lenis = new Lenis({ smoothWheel: true, smoothTouch: false });
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy?.();
    };
  }, [reduced]);

  return <>{children}</>;
}
