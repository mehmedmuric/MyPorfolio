"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "../Container";
import { getMotionVariants, viewportOnce } from "@/lib/motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const TrustSignals = () => {
  const t = useTranslations().trustSignals;
  const reducedMotion = useReducedMotion();
  const { container, item } = getMotionVariants(reducedMotion);

  const signals = [
    { label: t.experienceLabel, value: t.experienceValue },
    { label: t.focusLabel, value: t.focusValue },
    { label: t.locationLabel, value: t.locationValue },
    { label: t.availabilityLabel, value: t.availabilityValue },
  ];

  return (
    <section
      aria-label={t.ariaLabel}
      className="relative border-y border-white/[0.05] bg-background/80 py-8 sm:py-10"
    >
      <Container>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={container}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
        >
          {signals.map((signal) => (
            <motion.li
              key={signal.label}
              variants={item}
              className="text-center md:text-left"
            >
              <p className="eyebrow mb-1.5">{signal.label}</p>
              <p className="text-sm font-medium tracking-tight text-foreground sm:text-[15px]">
                {signal.value}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
};

export default TrustSignals;
