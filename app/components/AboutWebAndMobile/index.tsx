"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

// Register GSAP plugin once globally
if (typeof window !== "undefined") {
  const coreGlobals = (gsap as any).core?.globals;
  if (!((gsap as any).ScrollTrigger || coreGlobals?.ScrollTrigger)) {
    gsap.registerPlugin(ScrollTrigger);
  }
}

const Features = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const dataStreamRef = useRef<HTMLDivElement | null>(null);

  // Create animated data streams
  useEffect(() => {
    const createDataStream = () => {
      if (!sectionRef.current) return;
      
      const streamContainer = document.createElement('div');
      streamContainer.className = 'absolute inset-0 pointer-events-none overflow-hidden';
      streamContainer.style.zIndex = '5';
      
      for (let i = 0; i < 8; i++) {
        const stream = document.createElement('div');
        stream.className = 'absolute w-px h-20 bg-gradient-to-b from-transparent via-[#00FF41] to-transparent opacity-20 animate-data-stream';
        stream.style.left = `${Math.random() * 100}%`;
        stream.style.animationDuration = `${3 + Math.random() * 4}s`;
        stream.style.animationDelay = `${Math.random() * 2}s`;
        streamContainer.appendChild(stream);
      }
      
      sectionRef.current.appendChild(streamContainer);
      return () => streamContainer.remove();
    };

    const cleanup = createDataStream();
    return cleanup;
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (hasAnimated) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.25,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
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
              start: "top 94%"
            }
          }
        );
      });

      setHasAnimated(true);
    }, sectionRef);

    return () => ctx.revert();
  }, [hasAnimated]);

  const ResponsiveTitle = () => (
    <div className="relative mb-10 md:mb-14 lg:mb-16">
      {/* Modern Glow Effect */}
      <div className="absolute inset-0 -top-8 -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl blur-3xl opacity-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-[#00FF41]/40 via-[#00FF88]/30 to-[#00FF41]/40 rounded-full" />
      </div>
      
      {/* Animated Border Lines */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-60" />
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-[#00FF41]/60 via-[#00FF41] to-[#00FF41]/60 shadow-[0_0_20px_#00FF41,0_0_40px_#00FF41]" />
      
      {/* Title Container */}
      <div className="relative">
        <h2 
          className="relative text-center font-mono font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl leading-[1.1] mb-4 w-full max-w-5xl mx-auto tracking-tight"
          style={{
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}
        >
          <span className="inline-block relative">
            <span className="absolute -left-6 xs:-left-8 sm:-left-10 md:-left-12 top-0 text-[#00FF41]/40 font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl animate-pulse">[</span>
            <span 
              className="relative z-10 inline-block"
              style={{
                background: 'linear-gradient(90deg, #00FF41 0%, #00FF88 50%, #00FF41 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 20px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.2)',
                filter: 'drop-shadow(0 0 8px rgba(0,255,65,0.6))'
              }}
            >
              Web <span style={{ background: 'linear-gradient(90deg, #00FF88 0%, #00FF41 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>&amp;</span> Mobile
              <br className="block sm:hidden" />
              <span className="sm:block hidden">&nbsp;Application</span>
              <span className="sm:hidden">
                <br />Application
              </span>
              <br />
              Features
            </span>
            <span className="absolute -right-6 xs:-right-8 sm:-right-10 md:-right-12 top-0 text-[#00FF41]/40 font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl animate-pulse">]</span>
          </span>
        </h2>
        
        {/* Subtitle Glow Line */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/50 to-transparent opacity-60" />
      </div>
      
      {/* Bottom Border */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-60" />
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-[#00FF41]/60 via-[#00FF41] to-[#00FF41]/60 shadow-[0_0_20px_#00FF41,0_0_40px_#00FF41]" />
    </div>
  );

  const ResponsiveParagraph = () => (
    <div className="relative mb-14 md:mb-20 lg:mb-24">
      {/* Decorative Side Lines */}
      <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00FF41]/30 to-transparent opacity-50" />
      <div className="hidden lg:block absolute right-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00FF41]/30 to-transparent opacity-50" />
      
      {/* Modern Paragraph Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 -inset-x-4 -inset-y-2 bg-gradient-to-r from-black/20 via-[#00FF41]/5 to-black/20 backdrop-blur-sm rounded-2xl border border-[#00FF41]/10 opacity-50" />
        
        <p 
          className="relative text-[#00FF41]/95 text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl text-center font-mono max-w-3xl mx-auto leading-relaxed py-6 md:py-8 px-6 md:px-10"
          style={{
            textShadow: '0 0 10px rgba(0,255,65,0.4), 0 0 20px rgba(0,255,65,0.2)'
          }}
        >
          <span className="inline-block text-[#00FF41]/60 mr-3 text-sm xs:text-base font-semibold tracking-wider">[INFO]</span>
          <span className="relative">
            I create modern web &amp; mobile apps — blending elegant UI, performance, security, and seamless usability.
          </span>
          <br className="hidden xs:inline" />
          <span className="xs:hidden"><br /></span>
          <span className="inline-block ml-3 text-[#00FF41]/60 text-sm xs:text-base font-semibold tracking-wider">
            [STATUS: <span className="text-[#00FF88] animate-pulse">ACTIVE</span>]
          </span>
        </p>
      </div>
    </div>
  );

  const SkipFeaturesLink = () => (
    <a
      href="#after-features"
      className="skip-to-content-link sr-only focus:not-sr-only absolute z-50 left-3 top-3 bg-black/90 border border-[#00FF41]/50 px-4 py-2 font-mono text-[#00FF41] text-xs shadow-[0_0_10px_#00FF41] outline-none focus:ring-2 focus:ring-[#00FF41]"
      tabIndex={0}
    >
      [SKIP SECTION]
    </a>
  );

  return (
    <>
      <SkipFeaturesLink />
      <section
        id="features"
        ref={sectionRef}
        aria-label="Web & Mobile Application Features"
        className="relative overflow-hidden py-20 xs:py-24 md:py-28 lg:py-36 xl:py-44 isolate px-3 xs:px-4 sm:px-6 lg:px-8"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,255,65,0.08) 0%, transparent 50%), radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,255,136,0.05) 0%, transparent 50%), #000000',
          backgroundImage: 'linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      >
        {/* CRT Scanlines Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 z-30 opacity-[0.08]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)',
          }}
          aria-hidden="true"
        />

        {/* Animated Scan Line */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
          <div
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent"
            style={{ 
              animation: 'scanLine 8s linear infinite',
              boxShadow: '0 0 20px #00FF41, 0 0 40px #00FF41'
            }}
          />
        </div>

        {/* Corner HUD Elements */}
        <div className="pointer-events-none absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00FF41]/40 z-10" />
        <div className="pointer-events-none absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#00FF41]/40 z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#00FF41]/40 z-10" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00FF41]/40 z-10" />

        {/* Floating HUD Elements */}
        <div 
          className="absolute top-20 left-8 w-2 h-2 bg-[#00FF41] opacity-60 animate-pulse hidden lg:block"
          style={{ boxShadow: '0 0 10px #00FF41' }}
          aria-hidden="true"
        />
        <div 
          className="absolute top-40 right-12 w-1.5 h-1.5 bg-[#00FF41] opacity-50 animate-ping hidden xl:block"
          style={{ animationDelay: '1s', boxShadow: '0 0 8px #00FF41' }}
          aria-hidden="true"
        />
        <div 
          className="absolute bottom-32 left-16 w-2 h-2 bg-[#00FF41] opacity-70 animate-pulse hidden lg:block"
          style={{ animationDelay: '2s', boxShadow: '0 0 12px #00FF41' }}
          aria-hidden="true"
        />

        {/* Enhanced Glow Effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-3xl opacity-25 z-0 animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,65,0.4) 0%, rgba(0,255,136,0.2) 30%, transparent 70%)'
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] blur-3xl opacity-20 z-0 animate-pulse-slow"
          style={{
            animationDelay: '1s',
            background: 'radial-gradient(circle, rgba(0,255,136,0.3) 0%, rgba(0,255,65,0.15) 40%, transparent 70%)'
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-3xl opacity-10 z-0"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,255,65,0.2) 0%, transparent 60%)'
          }}
        />

        <div className="container mx-auto relative z-20 px-2 xs:px-4 md:px-6 lg:px-8">
          <ResponsiveTitle />
          <ResponsiveParagraph />

          <div className="mx-auto grid grid-cols-1 gap-8 xs:gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-3 max-w-7xl 2xl:max-w-[1600px]">
            {featuresData.map((feature, i) => (
              <div
                key={feature.id}
                ref={(el) => {
                  featureRefs.current[i] = el;
                }}
                className="flex"
              >
                <SingleFeatureWrapper feature={feature} index={i} />
              </div>
            ))}
          </div>
        </div>

        <div id="after-features" tabIndex={-1} />
      </section>
    </>
  );
};

export default Features;

const SingleFeatureWrapper = ({
  feature,
  index
}: {
  feature: any;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === "Enter" || e.key === " ") && feature.href) {
        window.open(feature.href, "_blank", "noopener noreferrer");
      }
    },
    [feature]
  );

  return (
    <div
      tabIndex={0}
      aria-label={feature.title || feature.name}
      role={feature.href ? "link" : "region"}
      className={`
        group relative flex flex-col w-full p-8 xs:p-9 md:p-10 lg:p-12 xl:p-14
        bg-gradient-to-br from-black/95 via-black/98 to-black
        border border-[#00FF41]/20
        rounded-2xl
        backdrop-blur-sm
        outline-none
        transition-all duration-700 ease-out
        cursor-pointer
        hover:border-[#00FF41]/60
        hover:shadow-[0_8px_32px_rgba(0,255,65,0.25),0_0_60px_rgba(0,255,65,0.15),inset_0_0_60px_rgba(0,255,65,0.05)]
        hover:-translate-y-2
        hover:scale-[1.02]
        focus:ring-2 focus:ring-[#00FF41] focus:ring-offset-2 focus:ring-offset-black
        ${hasFocus ? "ring-2 ring-[#00FF41] ring-offset-2 ring-offset-black" : ""}
        overflow-hidden
      `}
      style={{
        WebkitTapHighlightColor: "rgba(0,255,65,0.2)",
        boxShadow: isHovered 
          ? '0 12px 48px rgba(0,255,65,0.3), 0 0 80px rgba(0,255,136,0.2), inset 0 0 60px rgba(0,255,65,0.08)' 
          : '0 4px 20px rgba(0,255,65,0.1), inset 0 0 40px rgba(0,255,65,0.03)'
      }}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
      {...(feature.href ? { "aria-describedby": `desc-${feature.id}` } : {})}
    >
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(0,255,65,0.15) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(0,255,136,0.1) 0%, transparent 60%)'
        }}
      />

      {/* Modern Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#00FF41]/40 group-hover:border-[#00FF41] rounded-tl-2xl transition-all duration-500 group-hover:shadow-[0_0_15px_#00FF41]" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#00FF41]/40 group-hover:border-[#00FF41] rounded-tr-2xl transition-all duration-500 group-hover:shadow-[0_0_15px_#00FF41]" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#00FF41]/40 group-hover:border-[#00FF41] rounded-bl-2xl transition-all duration-500 group-hover:shadow-[0_0_15px_#00FF41]" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#00FF41]/40 group-hover:border-[#00FF41] rounded-br-2xl transition-all duration-500 group-hover:shadow-[0_0_15px_#00FF41]" />

      {/* Scanning Line Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,65,0.08) 30%, rgba(0,255,136,0.1) 50%, rgba(0,255,65,0.08) 70%, transparent 100%)',
          animation: isHovered ? 'scanLine 3s linear infinite' : 'none'
        }}
      />

      {/* Modern Number Badge */}
      <div 
        className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-black via-black to-[#001108] border-2 border-[#00FF41]/60 group-hover:border-[#00FF41] flex items-center justify-center font-mono text-sm text-[#00FF41] font-bold z-20 rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.4)] group-hover:shadow-[0_0_30px_rgba(0,255,65,0.6)] transition-all duration-500 group-hover:scale-110"
      >
        <span className="relative">
          {String(index + 1).padStart(2, '0')}
          <span className="absolute inset-0 blur-md opacity-50 group-hover:opacity-100 transition-opacity">
            {String(index + 1).padStart(2, '0')}
          </span>
        </span>
      </div>

      {/* Enhanced Background Glow */}
      <div 
        className="absolute -inset-1 bg-gradient-to-br from-[#00FF41]/0 via-[#00FF41]/0 to-[#00FF41]/0 group-hover:from-[#00FF41]/10 group-hover:via-[#00FF88]/5 group-hover:to-[#00FF41]/10 blur-2xl transition-all duration-700 -z-10 rounded-2xl opacity-0 group-hover:opacity-100"
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <SingleFeature feature={feature} index={index} />
      </div>

      {/* Modern Bottom Accent Bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent group-hover:w-3/4 transition-all duration-700 opacity-0 group-hover:opacity-100 shadow-[0_0_20px_#00FF41]" />
      
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF88] to-transparent group-hover:w-1/2 transition-all duration-700 opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#00FF88]" />
    </div>
  );
};
