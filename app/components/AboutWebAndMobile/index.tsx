"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

// Register GSAP plugin once globally


const Features = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Subtle floating effect for entire section (paused while in reduced motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sectionRef.current && !prefersReducedMotion) {
      const floatAnim = gsap.to(sectionRef.current, {
        y: "+=5",
        repeat: -1,
        yoyo: true,
        duration: 6,
        ease: "sine.inOut",
      });
      return () => { floatAnim.kill(); };
    }
  }, []);

  // GSAP Animations (section and features staggered entry)
  useEffect(() => {
    if (hasAnimated) return;
    const ctx = gsap.context(() => {
      // Section entry animation
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.25,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      featureRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 66, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
            },
          }
        );
        gsap.fromTo(
          el,
          { boxShadow: "0 0 0px #00ff8055" },
          {
            boxShadow: "0 0 28px #00ff8060, 0 0 0 #00ff80",
            borderColor: "#2cffae44",
            duration: 0.64,
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
            },
          }
        );

        // Neon flicker for corners
        const accents = el.querySelectorAll(".feature-corner");
        accents.forEach((accent, accIdx) => {
          gsap.fromTo(
            accent,
            { opacity: 0.62 + Math.random() * 0.12 },
            {
              opacity: 1,
              repeat: -1,
              yoyo: true,
              duration: 1.5 + Math.random() * 1.1,
              delay: i * 0.185 + accIdx * 0.065,
              ease: "sine.inOut",
            }
          );
        });
      });
      setHasAnimated(true);
    }, sectionRef);

    return () => ctx.revert();
  }, [hasAnimated]);

  // Improved Title: bolder, more responsive, plus subtle underglow
  const ResponsiveTitle = () => (
    <h2 className="relative text-green-100 text-center font-black text-3xl xs:text-4xl md:text-5.5xl leading-tight mb-5 w-full max-w-3xl mx-auto drop-shadow-[0_2px_10px_rgba(0,255,128,0.12)]">
      <span className="block">
        Web <span className="text-green-400">&amp;</span> Mobile
        <br className="block sm:hidden" />
        <span className="sm:block hidden">&nbsp;Application Features</span>
        <span className="sm:hidden">
          Application<br />Features
        </span>
      </span>
      <span
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8/12 h-3 blur-lg bg-green-400/10 z-[-1]"
      />
    </h2>
  );

  // Improved Subtitle: softer color, clearer language, better contrast
  const ResponsiveParagraph = () => (
    <p className="text-green-100/85 text-base xs:text-lg md:text-xl text-center font-medium max-w-2xl mx-auto mb-12 tracking-normal leading-relaxed">
      I create modern web &amp; mobile apps — blending elegant UI, performance, security, and seamless usability.<br className="hidden xs:inline" /> Below are some core strengths:
    </p>
  );

  // Keyboard skip link for accessibility
  const SkipFeaturesLink = () => (
    <a
      href="#after-features"
      className="skip-to-content-link sr-only focus:not-sr-only absolute z-50 left-3 top-3 bg-green-950 px-4 py-2 rounded shadow outline-none text-green-100 font-bold"
      tabIndex={0}
    >
      Skip Features Section
    </a>
  );

  return (
    <>
      <SkipFeaturesLink />
      <section
        id="features"
        ref={sectionRef}
        aria-label="Web & Mobile Application Features"
        className="relative overflow-hidden py-20 md:py-24 lg:py-32 isolate px-2 xs:px-4 sm:py-32 lg:px-8 bg-[#0a1810] bg-[radial-gradient(ellipse_at_top,_#085b3b_0%,_#010101_80%)]"
      >
        {/* Cyber grid background (improved density) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]
          bg-[linear-gradient(90deg,#00ff88_1px,transparent_1px),linear-gradient(#00ff88_1px,transparent_1px)]
          bg-[size:36px_36px]"
          aria-hidden="true"
        />

        {/* Animated scan lines (thicker, slower) */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] z-10 select-none">
          <div
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent"
            style={{
              animation: 'scanLine 9s linear infinite'
            }}
          />
        </div>

        {/* Subtle outer glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 blur-[56px] mix-blend-lighten z-0"
          style={{
            background: "radial-gradient(ellipse at 70% 11%,rgba(27,255,163,0.08) 0%,transparent 80%)"
          }}
        />

        <div className="container mx-auto relative z-20 px-0 md:px-6">
          {/* Responsive and centered title/paragraph */}
          <ResponsiveTitle />
          <ResponsiveParagraph />

          <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-10 sm:gap-x-12 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
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
        {/* anchor for skip link */}
        <div id="after-features" tabIndex={-1} />
      </section>
    </>
  );
};

export default Features;

// Enhanced Wrapper with focus ring, better a11y, tactile tap, and neon edge accent/animation
const SingleFeatureWrapper = ({
  feature,
  index,
}: { feature: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  // Allow pressing enter/space to activate card (if feature has link)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === "Enter" || e.key === " ") && feature.href) {
        window.open(feature.href, "_blank", "noopener noreferrer");
      }
    },
    [feature]
  );

  // Accent classes for modular highlights
  const cornerBase = "feature-corner absolute border-green-400/18 transition-colors duration-400";
  const activeAccent = "group-hover:border-green-400/60 group-focus:border-green-400/90";

  return (
    <div
      tabIndex={0}
      aria-label={feature.title || feature.name}
      role={feature.href ? "link" : "region"}
      className={`
        group relative flex flex-col items-center justify-center w-full p-7 xs:p-9 md:p-11 lg:p-14
        bg-gradient-to-br from-green-900/30 to-black/80 rounded-2xl md:rounded-3xl outline-none
        border border-green-400/15
        shadow-[0_0_24px_rgba(0,255,128,0.11)]
        hover:shadow-[0_0_48px_rgba(0,255,128,0.35)]
        focus:ring-2 focus:ring-green-400 ring-0 ring-green-500/60 hover:ring-2
        transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-[1.018] md:hover:scale-105
        cursor-pointer
        ${hasFocus ? "ring-2 ring-green-400" : ""}
      `}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
      style={{
        WebkitTapHighlightColor: "rgba(0,255,160,0.15)",
        outline: "none"
      }}
      {...(feature.href ? { "aria-describedby": `desc-${feature.id}` } : {})}
    >
      {/* Shifting animated background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-green-400/0 via-green-400/12 to-green-400/0 opacity-0 group-hover:opacity-100 group-focus:opacity-90 transition-opacity duration-300" />

      {/* Four animated corner neon accents */}
      <div className={`${cornerBase} top-0 right-0 w-11 h-11 border-t-2 border-r-2 rounded-tr-2xl ${activeAccent}`} />
      <div className={`${cornerBase} bottom-0 left-0 w-11 h-11 border-b-2 border-l-2 rounded-bl-2xl ${activeAccent}`} />
      <div className="feature-corner absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400/8 rounded-br-xl" />
      <div className="feature-corner absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-green-400/8 rounded-tl-xl" />

      {/* Extra subtle edge glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-2xl blur-[3.2px] bg-green-400/0 group-hover:bg-green-400/[.11] group-focus:bg-green-400/[.19] transition-all duration-300 -z-10" />

      {/* Card content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <SingleFeature feature={feature} index={index} />
      </div>
    </div>
  );
};
