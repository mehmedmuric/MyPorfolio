"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import { getMotionVariants, viewportOnce } from "@/lib/motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const HowIWork = () => {
  const t = useTranslations().howIWork;
  const reducedMotion = useReducedMotion();
  const { container, item } = getMotionVariants(reducedMotion);

  return (
    <section id="process" className="section-y relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="ambient-orb left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 bg-primary/[0.05] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={container}
        >
          <motion.div variants={item} className="mb-14 sm:mb-16">
            <SectionTitle
              title={t.title}
              paragraph={t.paragraph}
              align="center"
              mb="0"
            />
          </motion.div>

          <div className="relative mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div
              className="pointer-events-none absolute left-[12%] right-[12%] top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent lg:block"
              aria-hidden="true"
            />

            {t.steps.map((step) => (
              <motion.article
                key={step.number}
                variants={item}
                className="group relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-5 transition-all duration-500 hover:border-primary/25 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.65),0_0_0_1px_hsla(var(--primary),0.08)] active:border-primary/25 active:bg-white/[0.03] sm:p-7 md:hover:-translate-y-1"
              >
                <p className="mb-5 font-mono text-xs font-semibold tracking-[0.2em] text-primary/80 transition-colors duration-300 group-hover:text-primary">
                  {step.number}
                </p>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HowIWork;
