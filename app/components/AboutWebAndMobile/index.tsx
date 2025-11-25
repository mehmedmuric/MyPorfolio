"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Subtle floating effect for entire section
  useEffect(() => {
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        y: "+=5",
        repeat: -1,
        yoyo: true,
        duration: 6,
        ease: "sine.inOut",
      });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entry animation
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Animation for each feature box
      featureRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: i * 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 93%",
            },
          }
        );
        gsap.fromTo(
          el,
          { boxShadow: "0 0 0px #00ff8055" },
          {
            boxShadow: "0 0 24px #00ff8011, 0 0 0 #00ff80",
            borderColor: "#2cffae44",
            duration: 0.7,
            scrollTrigger: {
              trigger: el,
              start: "top 91%",
            }
          }
        );
        // Neon corner flicker effect (using opacity animation)
        const accents = el.querySelectorAll(".feature-corner");
        accents.forEach((accent, accIdx) => {
          gsap.fromTo(
            accent,
            { opacity: 0.62 },
            {
              opacity: 1,
              repeat: -1,
              yoyo: true,
              duration: 1.8 + Math.random() * 1.2,
              delay: i * 0.21 + accIdx * 0.08,
              ease: "sine.inOut",
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Responsive, centered custom title
  const ResponsiveTitle = () => (
    <h2 className="text-green-200 text-center font-extrabold text-3xl xs:text-4xl md:text-5xl leading-tight mb-4 w-full max-w-3xl mx-auto">
      <span>
        Web <span className="text-green-400">&amp;</span> Mobile
        <br className="block sm:hidden" />
        <span className="sm:block hidden">
          &nbsp;Application Features
        </span>
        <span className="sm:hidden"> Application<br />Features</span>
      </span>
    </h2>
  );

  // Responsive, centered subtitle
  const ResponsiveParagraph = () => (
    <p className="text-green-200/90 text-base xs:text-lg md:text-xl text-center font-normal max-w-2xl mx-auto mb-10">
      I specialize in crafting modern, high-performance web and mobile solutions—combining beautiful design, ultra-fast performance, robust&nbsp;security, and easy-to-use interfaces. Explore core strengths:
    </p>
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-4 sm:py-32 lg:px-8 bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_80%)]"
    >
      {/* Cyber grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]
        bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),linear-gradient(#00ff99_1px,transparent_1px)]
        bg-[size:54px_54px]"
        aria-hidden
      />

      {/* Animated scan lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"
          style={{
            animation: 'scanLine 7s linear infinite'
          }}
        />
      </div>

      {/* Subtle outer glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 blur-3xl mix-blend-lighten z-0"
        style={{
          background: "radial-gradient(ellipse at 72% 16%,rgba(27,255,163,0.08) 0%,transparent 74%)"
        }}
      />

      <div className="container mx-auto relative z-10 px-0 md:px-6">
        {/* Improved responsive and centered title/paragraph */}
        <ResponsiveTitle />
        <ResponsiveParagraph />

        <div className="mx-auto grid grid-cols-1 gap-x-7 gap-y-10 sm:gap-x-12 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          {featuresData.map((feature, i) => (
            <div
              key={feature.id}
              ref={el => { featureRefs.current[i] = el; }}
              className="flex"
            >
              <SingleFeatureWrapper feature={feature} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;


/** Enhanced Wrapper for SingleFeature: improved accessibility, cyber-accents, animated glow, and keyboard focus, centered better on mobile */
const SingleFeatureWrapper = ({
  feature,
  index,
}: { feature: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div
      tabIndex={0}
      aria-label={feature.title || feature.name}
      className={`group relative flex flex-col items-center justify-center w-full p-7 sm:p-9 md:p-11 lg:p-14 rounded-2xl md:rounded-3xl outline-none
        backdrop-blur-lg bg-black/75 border border-green-500/25
        shadow-[0_0_22px_rgba(0,255,128,0.12)]
        hover:shadow-[0_0_46px_rgba(0,255,128,0.4)]
        focus:ring-2 focus:ring-green-400 ring-0 ring-green-500/60 hover:ring-2
        transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-[1.02] md:hover:scale-105
        ${hasFocus ? "ring-2 ring-green-400" : ""}
        `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
    >
      {/* Animated background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-400/0 via-green-400/8 to-green-400/0 opacity-0 group-hover:opacity-100 group-focus:opacity-[0.85] transition-opacity duration-300" />

      {/* Four animated corner accents */}
      <div className="feature-corner absolute top-0 right-0 w-11 h-11 border-t-2 border-r-2 border-green-400/20 rounded-tr-2xl group-hover:border-green-400/60 group-focus:border-green-400/80 transition-colors duration-400" />
      <div className="feature-corner absolute bottom-0 left-0 w-11 h-11 border-b-2 border-l-2 border-green-400/18 rounded-bl-2xl group-hover:border-green-400/60 group-focus:border-green-400/80 transition-colors duration-400" />
      <div className="feature-corner absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400/10 rounded-br-xl" />
      <div className="feature-corner absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-green-400/10 rounded-tl-xl" />

      {/* Glow shine */}
      <div className="pointer-events-none absolute -inset-1 rounded-2xl blur-[2.6px] bg-green-400/0 group-hover:bg-green-400/[.09] group-focus:bg-green-400/[.17] transition-all duration-400 -z-10" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <SingleFeature feature={feature} index={index} />
      </div>
    </div>
  );
};
