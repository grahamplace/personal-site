// Centralized color configuration for the gradient system
// This prevents color drift between CSS variables and JavaScript color sets

export type Section = 'hero' | 'experience' | 'blog' | 'contact';

// Ultra-dark cohesive palette with subtle differences between hues
export const GRADIENT_COLORS = {
  hero: ['#0b0f14', '#0e1623', '#111b2a', '#152234'],
  experience: ['#0e1623', '#111b2a', '#152234', '#0b0f14'],
  blog: ['#111b2a', '#152234', '#0b0f14', '#0e1623'],
  contact: ['#152234', '#0b0f14', '#0e1623', '#111b2a'],
} as const;

// Default colors (hero section)
export const DEFAULT_GRADIENT_COLORS = GRADIENT_COLORS.hero;

// Convert hex colors to the format expected by the gradient system
export function hexToGradientFormat(hexColors: readonly string[]): number[] {
  return hexColors.map((color) => parseInt(color.replace('#', ''), 16));
}

// Get colors for a specific section
export function getSectionColors(section: Section): string[] {
  return [...GRADIENT_COLORS[section]];
}

// Get gradient format colors for a specific section
export function getSectionGradientColors(section: Section): number[] {
  return hexToGradientFormat(GRADIENT_COLORS[section]);
}

// CSS variable names for the gradient system
export const GRADIENT_CSS_VARS = [
  '--gradient-color-1',
  '--gradient-color-2',
  '--gradient-color-3',
  '--gradient-color-4',
] as const;

// Update CSS variables for a section
export function updateCssGradientColors(section: Section): void {
  const colors = getSectionColors(section);
  const root = document.documentElement;

  GRADIENT_CSS_VARS.forEach((cssVar, index) => {
    root.style.setProperty(cssVar, colors[index]);
  });
}

// Initialize default CSS variables
export function initializeCssGradientColors(): void {
  updateCssGradientColors('hero');
}
