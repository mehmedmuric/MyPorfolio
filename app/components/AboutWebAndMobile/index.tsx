"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef(null);
  const featureRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in sekcije
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animacija za svaki feature box (sa zakašnjenjem)
      featureRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8
        bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_80%)]"
    >
      {/* Cyber grid background */}
      <div
        className="absolute inset-0 opacity-[0.07] 
        bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
             linear-gradient(#00ff99_1px,transparent_1px)] 
        bg-[size:50px_50px]"
      />

      {/* Pulsing green glow layers */}
      <div className="absolute -inset-40 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow" />
      <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.06),_transparent_70%)] blur-[100px]" />

      <div className="container mx-auto relative z-10">
        <SectionTitle
          title="About Web and Mobile Applications"
          paragraph="I specialize in building high-performance web and mobile applications tailored to your business needs — from sleek user interfaces to scalable backend solutions."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, i) => (
            <div
              key={feature.id}
              ref={(el) => {
                if (el) featureRefs.current[i] = el;
              }}
            >
              <SingleFeatureWrapper feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

/* Wrapper for SingleFeature with cyber-neon style */
const SingleFeatureWrapper = ({ feature }: { feature: any }) => {
  return (
    <div
      className="group relative flex flex-col items-center justify-center p-10 sm:p-12 rounded-3xl
        backdrop-blur-md bg-black/70 border border-green-500/30
        shadow-[0_0_25px_rgba(0,255,128,0.15)]
        hover:shadow-[0_0_40px_rgba(0,255,128,0.35)]
        transition-all duration-500 hover:-translate-y-3 hover:scale-105
        ring-0 ring-green-500 hover:ring-2"
    >
      <SingleFeature feature={feature} />
    </div>
  );
};
