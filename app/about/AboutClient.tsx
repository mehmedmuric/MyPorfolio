"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import ParticlesBackground from "@/components/Common/ParticlesBackground";
import HeroSection from "./components/HeroSection";
import Timeline from "./components/Timeline";
import CoreValues from "./components/CoreValues";
import TechStack from "./components/TechStack";
import CTA from "./components/CTA";

const AboutClient = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-hidden selection:bg-primary/30 selection:text-white text-sans font-sans">
      {/* High-end SaaS Background Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticlesBackground />

        {/* Top Right Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen opacity-60" />

        {/* Bottom Left Glow */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen opacity-40" />

        {/* subtle grid overlay for texture */}
        <div className="absolute inset-0 bg-[url('/images/grid-texture.svg')] bg-center opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Breadcrumb
          pageName="About Me"
          description="Curious by nature. Driven by building."
        />

        <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-32 flex flex-col gap-24 sm:gap-32 mt-8">
          <HeroSection />

          <CoreValues />

          {/* Subtle Divider */}
          <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <Timeline />
          <TechStack />

          <CTA />
        </main>
      </div>
    </div>
  );
};

export default AboutClient;
