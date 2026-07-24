"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const HeroSection = () => {
  const t = useTranslations().aboutPage.hero;

  return (
    <section className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-0 pb-10 pt-8 text-center sm:pb-20 sm:pt-20">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 opacity-50 blur-[100px] sm:h-[420px] sm:w-[420px]"
        aria-hidden="true"
      />

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="text-display mb-5 text-[1.85rem] leading-tight text-foreground xs:text-[2.15rem] sm:text-5xl md:text-6xl"
      >
        {t.title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md space-y-4 text-body sm:max-w-2xl"
      >
        {t.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
