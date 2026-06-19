export const motionEase = {
  entry: 'power3.out',
  exit: 'power2.inOut',
  scroll: 'none',
} as const

export const motionScrub = {
  cinematic: 1,
  text: 0.9,
  parallax: 1.1,
} as const

export const lenisConfig = {
  duration: 1.5,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
} as const
