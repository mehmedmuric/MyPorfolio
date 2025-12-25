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
    <div className="relative mb-8 md:mb-12">
      {/* HUD Border Top */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-[#00FF41] shadow-[0_0_10px_#00FF41] opacity-60" />
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#00FF41] shadow-[0_0_20px_#00FF41]" />
      
      <h2 
        className="relative text-[#00FF41] text-center font-mono font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-2 w-full max-w-4xl mx-auto tracking-wider"
        style={{
          textShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41',
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        <span className="inline-block relative">
          <span className="absolute -left-4 top-0 text-[#00FF41]/30 font-mono text-lg xs:text-xl">[</span>
          Web <span className="text-[#00FF41]/80">&amp;</span> Mobile
          <br className="block sm:hidden" />
          <span className="sm:block hidden">&nbsp;Application Features</span>
          <span className="sm:hidden">
            <br />Application<br />Features
          </span>
          <span className="absolute -right-4 top-0 text-[#00FF41]/30 font-mono text-lg xs:text-xl">]</span>
        </span>
      </h2>
      
      {/* HUD Border Bottom */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-[#00FF41] shadow-[0_0_10px_#00FF41] opacity-60" />
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#00FF41] shadow-[0_0_20px_#00FF41]" />
    </div>
  );

  const ResponsiveParagraph = () => (
    <div className="relative mb-12 md:mb-16">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#00FF41]/30" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-[#00FF41]/30" />
      
      <p 
        className="text-[#00FF41]/90 text-sm xs:text-base md:text-lg lg:text-xl text-center font-mono max-w-3xl mx-auto leading-relaxed px-6 md:px-8 py-4 relative"
        style={{
          textShadow: '0 0 5px rgba(0,255,65,0.5)'
        }}
      >
        <span className="inline-block text-[#00FF41]/50 mr-2">[INFO]</span>
        I create modern web &amp; mobile apps — blending elegant UI, performance, security, and seamless usability.
        <br className="hidden xs:inline" />
        <span className="xs:hidden"><br /></span>
        <span className="inline-block ml-2 text-[#00FF41]/50">[STATUS: ACTIVE]</span>
      </p>
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
        className="relative overflow-hidden py-16 xs:py-20 md:py-24 lg:py-32 xl:py-40 isolate px-3 xs:px-4 sm:px-6 lg:px-8"
        style={{
          background: 'radial-gradient(ellipse at center, #001108 0%, #000000 100%)',
          backgroundImage: 'linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
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

        {/* Glow Effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-3xl opacity-20 z-0"
          style={{
            background: 'radial-gradient(circle, #00FF41 0%, transparent 70%)'
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 blur-3xl opacity-15 z-0"
          style={{
            background: 'radial-gradient(circle, #00FF41 0%, transparent 70%)'
          }}
        />

        <div className="container mx-auto relative z-20 px-2 xs:px-4 md:px-6 lg:px-8">
          <ResponsiveTitle />
          <ResponsiveParagraph />

          <div className="mx-auto grid grid-cols-1 gap-6 xs:gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl 2xl:max-w-[1600px]">
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
        group relative flex flex-col w-full p-6 xs:p-7 md:p-8 lg:p-10 xl:p-12
        bg-gradient-to-br from-black/90 via-black/95 to-black
        border-2 border-[#00FF41]/30
        outline-none
        transition-all duration-500
        cursor-pointer
        hover:border-[#00FF41]
        hover:shadow-[0_0_30px_rgba(0,255,65,0.4),inset_0_0_30px_rgba(0,255,65,0.1)]
        hover:-translate-y-1
        hover:scale-[1.02]
        focus:ring-2 focus:ring-[#00FF41] focus:ring-offset-2 focus:ring-offset-black
        ${hasFocus ? "ring-2 ring-[#00FF41] ring-offset-2 ring-offset-black" : ""}
      `}
      style={{
        clipPath: 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 20px 100%, 0% calc(100% - 20px))',
        WebkitTapHighlightColor: "rgba(0,255,65,0.2)",
        boxShadow: isHovered 
          ? '0 0 40px rgba(0,255,65,0.5), inset 0 0 40px rgba(0,255,65,0.1)' 
          : '0 0 15px rgba(0,255,65,0.15)'
      }}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
      {...(feature.href ? { "aria-describedby": `desc-${feature.id}` } : {})}
    >
      {/* HUD Corner Accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00FF41]/60 group-hover:border-[#00FF41] transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00FF41]/60 group-hover:border-[#00FF41] transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00FF41]/60 group-hover:border-[#00FF41] transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00FF41]/60 group-hover:border-[#00FF41] transition-colors duration-300" />

      {/* Scanning Line Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,65,0.1) 50%, transparent 100%)',
          animation: isHovered ? 'scanLine 2s linear infinite' : 'none'
        }}
      />

      {/* HUD Panel Number Badge */}
      <div 
        className="absolute -top-3 -right-3 w-8 h-8 bg-black border-2 border-[#00FF41] flex items-center justify-center font-mono text-xs text-[#00FF41] font-bold z-20"
        style={{
          boxShadow: '0 0 15px #00FF41',
          clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 8px 100%, 0% calc(100% - 8px))'
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Background Glow */}
      <div 
        className="absolute -inset-0.5 bg-[#00FF41]/0 group-hover:bg-[#00FF41]/20 blur-xl transition-all duration-500 -z-10 opacity-0 group-hover:opacity-100"
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <SingleFeature feature={feature} index={index} />
      </div>

      {/* Bottom HUD Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF41]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};
