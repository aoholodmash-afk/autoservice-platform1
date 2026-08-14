// Golden Ratio constants
export const PHI = 1.618

// Spacing scale (base 8px, golden ratio)
export const SPACE = {
  xs: 5,    // 8 / φ
  sm: 8,    // 1 module
  md: 13,   // 8 × φ
  lg: 21,   // 13 × φ
  xl: 34,   // 21 × φ
  xxl: 55,  // 34 × φ
} as const

// Border radius
export const RADIUS = {
  sm: 8,
  md: 13,  // 8 × φ
  lg: 21,  // 13 × φ
  full: 9999,
} as const

// Font sizes (iOS scale)
export const FONT = {
  xs: 11,
  sm: 13,
  base: 17,
  lg: 20,
  xl: 22,
  xxl: 28,
  xxxl: 34,
} as const

// iOS colors (for JS usage)
export const COLORS = {
  light: {
    bg: '#F2F2F7',
    card: '#FFFFFF',
    ink: '#1C1C1E',
    inkSecondary: '#8E8E93',
    accent: '#007AFF',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
    separator: '#C6C6C8',
    fill: '#E5E5EA',
  },
  dark: {
    bg: '#000000',
    card: '#1C1C1E',
    ink: '#FFFFFF',
    inkSecondary: '#8E8E93',
    accent: '#0A84FF',
    success: '#30D158',
    warning: '#FF9F0A',
    danger: '#FF453A',
    separator: '#38383A',
    fill: '#2C2C2E',
  },
} as const

// Animation durations
export const DURATION = {
  fast: 200,
  normal: 350,
  slow: 500,
} as const

// Easing functions
export const EASING = {
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  ios: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const

// Haptic feedback
export function haptic(style: 'light' | 'medium' | 'heavy' = 'light') {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    const durations = { light: 10, medium: 20, heavy: 30 }
    navigator.vibrate(durations[style])
  }
}
