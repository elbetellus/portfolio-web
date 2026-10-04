/**
 * Motion tokens shared by every framer-motion animation.
 * They mirror the CSS tokens in globals.css (--ease-*, --dur-*), so CSS and JS motion keep one rhythm.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const EASE_IN = [0.55, 0, 1, 0.45] as const;

export const DUR = {
  micro: 0.15,
  short: 0.24,
  medium: 0.4,
  long: 0.7,
  draw: 1.4,
} as const;

/** Stagger between siblings in a list or grid reveal. */
export const STAGGER = 0.06;

/** Viewport settings for scroll reveals: play once, a little before the element is fully in view. */
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -12% 0px" } as const;
