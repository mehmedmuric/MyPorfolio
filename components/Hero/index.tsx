"use client";

import React from "react";
import Container from "../Container";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import TechTicker from "./TechTicker";
import { ArrowDown } from "lucide-react";
import ParticlesBackground from "../Common/ParticlesBackground";

export default function Hero() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-background pt-20 pb-12 lg:py-0 selection:bg-primary/20"
      aria-label="Introduction"
    >
      <HeroBackground />
      <ParticlesBackground />

      <Container className="relative z-10 flex-grow flex flex-col justify-center w-full h-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full h-full max-w-7xl mx-auto">
          {/* Content Column */}
          <div className="order-2 lg:order-1 flex flex-col justify-center w-full">
            <HeroContent />
          </div>

          {/* Visual Column */}
          <div className="order-1 lg:order-2 w-full flex items-center justify-center relative">
            <HeroVisual />
          </div>
        </div>
      </Container>

      {/* Bottom Ticker Section */}
      <div className="relative z-10 w-full mt-auto border-t border-white/5 bg-background/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.2em] whitespace-nowrap hidden sm:block">
            Trusted Technologies
          </p>
          <div className="w-full flex-1 overflow-hidden">
            <TechTicker />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-24 lg:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full p-2"
        aria-label="Scroll to next section"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 group-hover:text-primary transition-colors duration-300">
          Explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent group-hover:via-primary/50 transition-colors duration-300 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-primary animate-fall" />
        </div>
      </button>

    </section>
  );
}
