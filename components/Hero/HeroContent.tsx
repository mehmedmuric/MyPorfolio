"use client";

import React from "react";
import Link from "@/lib/i18n/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "../ui/button";
import SocialLinks from "./SocialLinks";
import { motion } from "framer-motion";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { useTranslations } from "@/lib/i18n/dictionary-context";

export default function HeroContent() {
  const t = useTranslations().hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 mx-auto flex w-full max-w-xl flex-col gap-6 text-center sm:gap-7 lg:mx-0 lg:gap-9 lg:text-left"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-4 lg:items-start"
      >
        <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-2 text-[12px] font-medium leading-none text-primary sm:py-1.5">
          <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="truncate">{t.available}</span>
        </div>

        <div className="space-y-1.5">
          <p className="text-base font-medium tracking-tight text-foreground/90 sm:text-lg">
            {t.name}
          </p>
          <p className="eyebrow">{t.role}</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5">
        <h1 className="text-display text-[2.125rem] text-foreground xs:text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          <span className="block text-foreground">{t.headlineLine1}</span>
          <span className="relative mt-1 inline-block">
            <span className="bg-gradient-to-r from-primary via-emerald-300 to-teal-300 bg-clip-text text-transparent">
              {t.headlineHighlight}
            </span>
            <span
              className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-primary/50 via-primary/20 to-transparent"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p className="mx-auto max-w-[22rem] text-body font-light sm:max-w-md lg:mx-0">
          {t.subtitle}
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
      >
        <Button
          size="lg"
          variant="premium"
          className="group h-12 min-h-[48px] w-full rounded-full px-7 sm:w-auto"
          asChild
        >
          <Link
            href="/projects"
            onClick={() => trackEvent(AnalyticsEvent.ViewProjects, { source: "hero" })}
          >
            {t.viewProjects}
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Button>

        <Button
          variant="glass"
          size="lg"
          className="group h-12 min-h-[48px] w-full rounded-full px-7 sm:w-auto"
          asChild
        >
          <Link
            href="/contact"
            onClick={() => trackEvent(AnalyticsEvent.ContactCta, { source: "hero" })}
          >
            {t.startProject}
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="group h-12 min-h-[48px] w-full rounded-full px-5 text-muted-foreground hover:text-foreground sm:w-auto"
          asChild
        >
          <a
            href="/MehmedMuricCv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(AnalyticsEvent.CvDownload, { source: "hero" })}
          >
            <Download
              className="mr-2 h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100 group-active:opacity-100"
              aria-hidden="true"
            />
            {t.downloadCv}
          </a>
        </Button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex w-full justify-center border-t border-white/[0.06] pt-5 sm:pt-6 lg:justify-start"
      >
        <SocialLinks />
      </motion.div>
    </motion.div>
  );
}
