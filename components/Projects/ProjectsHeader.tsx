"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const ProjectsHeader = memo(() => {
  const t = useTranslations().projects;

  return (
    <header className="relative w-full overflow-hidden pb-6 pt-4 sm:pb-10 sm:pt-8 md:pb-14 md:pt-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 hidden h-[360px] w-[520px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[72px] sm:block" />
        <div className="absolute bottom-0 right-[-10%] hidden h-[260px] w-[260px] rounded-full bg-emerald-500/[0.05] blur-[64px] sm:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:mb-5">
            {t.eyebrow}
          </span>
          <h1 className="text-display mb-4 text-[1.85rem] leading-tight text-foreground xs:text-[2.1rem] sm:mb-5 sm:text-5xl md:text-6xl">
            {t.titleBefore}{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-300 to-teal-300 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="mx-auto max-w-md text-body text-[15px] sm:max-w-2xl sm:text-lg">
            {t.description}
          </p>
        </motion.div>
      </div>
    </header>
  );
});

ProjectsHeader.displayName = "ProjectsHeader";

export default ProjectsHeader;
