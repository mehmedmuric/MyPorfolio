"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const Timeline = () => {
  const t = useTranslations().aboutPage.timeline;
  const timelineData = t.items;

  return (
    <section className="mx-auto w-full max-w-4xl py-8 sm:py-12">
      <div className="mb-10 flex flex-col sm:mb-14">
        <h2 className="text-display mb-3 text-[1.75rem] text-foreground sm:text-4xl">
          {t.title}
        </h2>
        <p className="max-w-lg text-body text-[15px] sm:text-base">
          {t.paragraph}
        </p>
      </div>

      <div className="relative">
        <div
          className="absolute bottom-0 left-3 top-2 w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent sm:left-[15px] md:left-[27px]"
          aria-hidden="true"
        />

        <ol className="space-y-5 sm:space-y-6 md:space-y-8">
          {timelineData.map((item, index) => {
            const isLatest = index === timelineData.length - 1;

            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex gap-4 sm:gap-5 md:gap-8"
              >
                <div className="relative z-10 flex w-6 shrink-0 justify-center sm:w-8 md:w-14">
                  <div
                    className={`mt-5 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-background transition-transform duration-300 sm:mt-6 sm:h-3.5 sm:w-3.5 ${
                      isLatest
                        ? "bg-primary shadow-[0_0_16px_hsla(var(--primary),0.45)]"
                        : "bg-white/40 group-hover:bg-primary/80 group-active:bg-primary/80"
                    }`}
                  >
                    {isLatest && (
                      <span className="absolute h-3 w-3 animate-ping rounded-full bg-primary/40 sm:h-3.5 sm:w-3.5" />
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1 rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.045] to-transparent p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.03] active:border-primary/20 sm:p-5 md:p-7">
                  <div className="mb-3 flex flex-col gap-2.5 sm:mb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg md:text-xl">
                      {item.title}
                    </h3>
                    <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1.5 font-mono text-[11px] tracking-wide text-primary">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
