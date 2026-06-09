import type { Variants } from 'framer-motion';

export const easeOutSoft = [0.22, 1, 0.36, 1] as const;
export const easeInOutSoft = [0.65, 0, 0.35, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutSoft },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, ease: easeOutSoft } },
};

export const blurUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: easeOutSoft },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

export const slideRight: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutSoft },
  },
  exit: { x: 60, opacity: 0, transition: { duration: 0.35, ease: easeInOutSoft } },
};

export const slideUpSheet: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { duration: 0.55, ease: easeOutSoft } },
  exit: { y: '100%', transition: { duration: 0.4, ease: easeInOutSoft } },
};

export const scaleSoft: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeOutSoft } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.35, ease: easeInOutSoft } },
};
