'use client';

import { useEffect } from 'react';
import { ensureCssVariablesSync } from '@/lib/colors';

export function ThemeAccent() {
  useEffect(() => {
    // Ensure CSS variables are properly synchronized with colors.ts configuration
    ensureCssVariablesSync();
  }, []);

  return null; // This component doesn't render anything
}
