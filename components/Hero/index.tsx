"use client";

import dynamic from "next/dynamic";
import Container from "../Container";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import TechTicker from "./TechTicker";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const ParticlesBackground = dynamic(
  () => import("../Common/ParticlesBackground"),
  { ssr: false }
);

export default function Hero() {
  const t = useTranslations().hero;

  const handleScrollDown = () => {
    const nextSection =
      document.getElementById("features") ??
      document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-background pb-8 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] sm:pb-10 lg:pb-0 lg:pt-20"
      aria-label={t.introAria}
    >
      <HeroBackground />
      <ParticlesBackground density={16} idleDelay={200} />

      <Container className="relative z-10 flex h-full w-full flex-grow flex-col justify-center">
        <div className="mx-auto grid h-full w-full max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="order-1 flex w-full flex-col justify-center">
            <HeroContent />
          </div>
          <div className="relative order-2 flex w-full items-center justify-center lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </Container>

      <div className="relative z-10 mt-8 w-full border-t border-white/[0.05] bg-background/40 backdrop-blur-md sm:mt-auto">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-6 lg:px-8">
          <p className="eyebrow hidden whitespace-nowrap sm:block">{t.stackLabel}</p>
          <div className="w-full flex-1 overflow-hidden">
            <TechTicker />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleScrollDown}
        className="group absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2.5 rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 lg:flex"
        aria-label={t.scrollAria}
      >
        <span className="eyebrow transition-colors duration-300 group-hover:text-primary">
          {t.explore}
        </span>
        <div
          className="relative h-10 w-px overflow-hidden bg-gradient-to-b from-transparent via-white/20 to-transparent transition-colors duration-300 group-hover:via-primary/40"
          aria-hidden="true"
        >
          <div className="absolute left-0 top-0 h-1/3 w-full bg-primary/80 animate-fall" />
        </div>
      </button>
    </section>
  );
}
