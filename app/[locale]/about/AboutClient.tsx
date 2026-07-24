"use client";

import dynamic from "next/dynamic";
import Breadcrumb from "@/components/Common/Breadcrumb";
import HeroSection from "./components/HeroSection";
import Timeline from "./components/Timeline";
import CoreValues from "./components/CoreValues";
import TechStack from "./components/TechStack";
import CTA from "./components/CTA";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const ParticlesBackground = dynamic(
  () => import("@/components/Common/ParticlesBackground"),
  { ssr: false }
);

const AboutClient = () => {
  const t = useTranslations().aboutPage;

  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden text-sans font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <ParticlesBackground density={14} interactive={false} idleDelay={400} />
        <div className="ambient-orb top-[-10%] right-[-5%] hidden h-[600px] w-[600px] bg-primary/10 opacity-60 sm:block" />
        <div className="ambient-orb bottom-[-20%] left-[-10%] hidden h-[800px] w-[800px] bg-primary/5 opacity-40 sm:block" />
        <div className="absolute inset-0 bg-[url('/images/grid-texture.svg')] bg-center opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Breadcrumb
          pageName={t.breadcrumb}
          description={t.breadcrumbDescription}
        />

        <div className="mx-auto mt-6 flex w-full flex-1 flex-col gap-14 px-4 pb-20 sm:mt-8 sm:gap-24 sm:px-6 sm:pb-28 lg:gap-32 lg:px-8">
          <HeroSection />
          <CoreValues />
          <div
            className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            aria-hidden="true"
          />
          <Timeline />
          <TechStack />
          <CTA />
        </div>
      </div>
    </div>
  );
};

export default AboutClient;
