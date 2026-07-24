import type { Transition, Variants } from "framer-motion";

export const easeOutSoft: Transition["ease"] = [0.22, 1, 0.36, 1];

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: easeOutSoft,
};

export const viewportOnce = {
  once: true,
  margin: "-80px" as const,
  amount: 0.2 as const,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeOutSoft },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

/** Instant variants when user prefers reduced motion */
export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export function getMotionVariants(reduced: boolean | null): {
  container: Variants;
  item: Variants;
} {
  if (reduced) {
    return { container: reducedFade, item: reducedFade };
  }
  return { container: staggerContainer, item: staggerItem };
}
