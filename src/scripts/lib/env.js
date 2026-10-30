// Small shared checks about the visitor's device and preferences.
export const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const hasFinePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
