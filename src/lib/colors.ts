// Centralized color configuration for the gradient system
// This prevents color drift between CSS variables and JavaScript color sets

export type Section = 'hero' | 'experience' | 'blog' | 'contact';

// https://coolors.co/palette/0d0e14-252933-404556-60515c-777076-597d7c-386775-20504e-193d31-17292b
const baseColor1 = '#252933'; // Raisin Black
const baseColor2 = '#404556'; // Charcoal
const baseColor3 = '#17292B'; // Gunmetal
const accentColor1 = '#60515C'; // Wenge
const accentColor2 = '#597D7C'; // Hooker's Green
const accentColor3 = '#386775'; // Payne's Gray
const accentColor4 = '#20504E'; // Dark Slate Gray
const accentColor5 = '#20504E'; // Dark Green

export const GRADIENT_COLORS = {
  hero: [baseColor1, baseColor2, baseColor3, accentColor1],
  experience: [baseColor1, baseColor2, baseColor3, accentColor2],
  blog: [baseColor1, baseColor2, baseColor3, accentColor3],
  contact: [baseColor1, baseColor2, baseColor3, accentColor4],
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

// Ensure CSS variables are always in sync with the current configuration
export function ensureCssVariablesSync(): void {
  // Check if we're in a browser environment
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    const currentColors = getSectionColors('hero');

    // Verify that CSS variables match the current configuration
    GRADIENT_CSS_VARS.forEach((cssVar, index) => {
      const currentValue = root.style.getPropertyValue(cssVar);
      const expectedValue = currentColors[index];

      // If CSS variable is not set or doesn't match, update it
      if (!currentValue || currentValue !== expectedValue) {
        root.style.setProperty(cssVar, expectedValue);
      }
    });
  }
}
