"use client";

import React from "react";

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden bg-background">
      {/* Fine noise */}
      <div className="bg-noise absolute inset-0 z-[1] opacity-[0.035] mix-blend-overlay" />

      {/* Soft grid — fades toward edges */}
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_20%,#000_45%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Primary ambient — lighter blur on small screens */}
      <div
        className="absolute left-1/2 top-[-18%] h-[360px] w-[480px] -translate-x-1/2 rounded-full bg-primary/[0.09] opacity-60 blur-[70px] sm:h-[520px] sm:w-[720px] sm:opacity-70 sm:blur-[110px]"
        aria-hidden="true"
      />

      {/* Secondary depth orbs — desktop only to reduce mobile paint */}
      <div
        className="absolute right-[-8%] top-[10%] hidden h-[420px] w-[420px] rounded-full bg-emerald-500/[0.05] blur-[100px] sm:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-15%] left-[-8%] hidden h-[480px] w-[480px] rounded-full bg-teal-500/[0.04] blur-[110px] sm:block"
        aria-hidden="true"
      />

      {/* Bottom vignette into next section */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-background"
        aria-hidden="true"
      />
    </div>
  );
}
