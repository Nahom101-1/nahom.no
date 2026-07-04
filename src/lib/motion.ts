import type { Variants } from 'motion/react';

export const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export const rv: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const rvViewport = { once: true, margin: '-7% 0px' } as const;
