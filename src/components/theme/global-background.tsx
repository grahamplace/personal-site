'use client';

import { useEffect, useRef } from 'react';
import { Gradient } from '@/lib/gradient.js';
import {
  type Section,
  getSectionGradientColorsForLibrary,
  updateCssGradientColors,
} from '@/lib/colors';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    __setGradientSection?: (section: Section) => void;
  }
}

function inferSectionFromPath(pathname: string): Section {
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/experience')) return 'experience';
  return 'hero';
}

export function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = document.getElementById(
      'global-gradient-canvas'
    ) as HTMLCanvasElement | null;
    canvasRef.current = canvas;
    const gradient = new Gradient() as unknown as {
      initGradient: (selector: string) => void;
      updateColors: (colors: number[]) => void;
    };
    gradient.initGradient('#global-gradient-canvas');

    const setSection = (section: Section) => {
      const colors = getSectionGradientColorsForLibrary(section);
      updateCssGradientColors(section);
      requestAnimationFrame(() => {
        gradient.updateColors(colors);
      });
    };

    // Expose imperative setter for in-app transitions
    window.__setGradientSection = setSection;

    // Initial color based on path (avoid missing dep warning by reading location once)
    const initialPath =
      typeof window !== 'undefined' ? window.location.pathname : pathname;
    setSection(inferSectionFromPath(initialPath));

    return () => {
      // leave canvas as is; gradient library handles its own loops
      if (window.__setGradientSection === setSection) {
        window.__setGradientSection = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Sync on route change
    if (window.__setGradientSection) {
      window.__setGradientSection(inferSectionFromPath(pathname));
    }
  }, [pathname]);

  return (
    <>
      <canvas
        id="global-gradient-canvas"
        className="fixed right-0 top-0 -z-10 h-full w-full"
        data-transition-in
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_40%,rgba(0,0,0,0.06)_70%,rgba(0,0,0,0.16)_100%)]"
      />
    </>
  );
}
