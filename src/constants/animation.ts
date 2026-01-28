/**
 * Animation timing constants for consistent motion design across the application.
 * Using a centralized config improves maintainability and ensures visual consistency.
 */

export const ANIMATION_DURATION = {
  /** Fast micro-interactions */
  FAST: 0.3,
  /** Standard transitions */
  NORMAL: 0.5,
  /** Slower, more dramatic animations */
  SLOW: 0.8,
  /** Extended animations for emphasis */
  EXTENDED: 1.2,
} as const;

export const ANIMATION_EASE = {
  /** For natural deceleration */
  OUT: 'power3.out',
  /** For accelerating animations */
  IN: 'power3.in',
  /** Smooth bi-directional */
  INOUT: 'power2.inOut',
  /** Dramatic entry/exit animations */
  EXPO_OUT: 'expo.out',
  EXPO_INOUT: 'expo.inOut',
  /** Linear for scroll-based animations */
  NONE: 'none',
} as const;

export const SCROLL_TRIGGER = {
  /** Default scroll scrub smoothness */
  SCRUB_DEFAULT: 1,
  /** Tighter scrub for responsive feel */
  SCRUB_TIGHT: 0.5,
  /** Smoother scrub for parallax effects */
  SCRUB_SMOOTH: 2,
} as const;

export const STAGGER = {
  /** Minimal stagger for grouped items */
  MINIMAL: 0.05,
  /** Standard stagger */
  NORMAL: 0.1,
  /** Pronounced stagger for emphasis */
  DRAMATIC: 0.15,
} as const;

/**
 * Common breakpoints for responsive animations
 */
export const BREAKPOINTS = {
  MOBILE: '(max-width: 767px)',
  TABLET: '(min-width: 768px) and (max-width: 1023px)',
  DESKTOP: '(min-width: 1024px)',
} as const;

/**
 * Theme colors for programmatic use in animations
 */
export const THEME = {
  BG_PRIMARY: '#e7d7c1',
  BG_DARK: '#201e1f',
  TEXT_LIGHT: '#ffffff',
  TEXT_DARK: '#232527',
  ACCENT: '#c0392b',
} as const;
