export type Section = keyof typeof GRADIENT_COLORS;

export const GRADIENT_COLORS = {
  hero: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
  experience: ['#1a2e2a', '#0f3d3a', '#1b5e4b', '#2d6e5e'],
  contact: ['#2e1a2e', '#3d1f3d', '#5c2d5c', '#4a2040'],
} as const;

export const SECTION_ACCENT_COLORS = {
  hero: '#60515C',
  experience: '#597D7C',
  contact: '#20504E',
} as const;

function hexToGradientFormat(hexColors: readonly string[]): number[] {
  return hexColors.map((color) => parseInt(color.replace('#', ''), 16));
}

export function getSectionGradientColorsForLibrary(section: Section): number[] {
  return hexToGradientFormat(GRADIENT_COLORS[section]);
}

export function getSectionAccentColor(
  section: keyof typeof SECTION_ACCENT_COLORS
): string {
  return SECTION_ACCENT_COLORS[section];
}

const GRADIENT_CSS_VARS = [
  '--gradient-color-1',
  '--gradient-color-2',
  '--gradient-color-3',
  '--gradient-color-4',
] as const;

export function updateCssGradientColors(section: Section): void {
  const colors = GRADIENT_COLORS[section];
  const root = document.documentElement;

  colors.forEach((color, index) => {
    root.style.setProperty(`--gradient-color-${index + 1}`, color);
  });
}

export function ensureCssVariablesSync(): void {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    const colors = GRADIENT_COLORS.hero;

    GRADIENT_CSS_VARS.forEach((cssVar, index) => {
      const currentValue = root.style.getPropertyValue(cssVar);
      if (!currentValue || currentValue !== colors[index]) {
        root.style.setProperty(cssVar, colors[index]);
      }
    });
  }
}
