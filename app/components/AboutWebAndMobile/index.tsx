"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

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

      {/* Animated scan lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"
          style={{
            animation: 'scanLine 8s linear infinite'
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <SectionTitle
          title="About Web and Mobile Applications"
          paragraph="I specialize in building high-performance web and mobile applications tailored to your business needs — from sleek user interfaces to scalable backend solutions."
          center
          mb="80px"
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

/* Enhanced Wrapper for SingleFeature with cyber-neon style */
const SingleFeatureWrapper = ({ feature, index }: { feature: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col items-center justify-center p-10 sm:p-12 rounded-3xl
        backdrop-blur-md bg-black/70 border border-green-500/30
        shadow-[0_0_25px_rgba(0,255,128,0.15)]
        hover:shadow-[0_0_40px_rgba(0,255,128,0.35)]
        transition-all duration-500 hover:-translate-y-3 hover:scale-105
        ring-0 ring-green-500 hover:ring-2"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-green-500/20 rounded-tr-2xl group-hover:border-green-500/50 transition-colors duration-300" />

      <div className="relative z-10">
        <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
          {count}{suffix}
        </div>
        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          {label}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-green-500/0 group-hover:bg-green-500/10 blur-xl transition-all duration-300 -z-10" />
    </div>
  );
};
