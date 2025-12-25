'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Simple SVG icons - memoized for performance
const SupportIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#00FF41]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);

const SpeedIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#00FF41]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9z" />
  </svg>
);

const ScalableIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#00FF41]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06
      a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33
      1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09
      A1.65 1.65 0 007.6 20
      a1.65 1.65 0 00-1.82.33l-.06.06
      a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82
      A1.65 1.65 0 013 13.5V13a2 2 0 012-2h.09
      a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82
      l-.06-.06a2 2 0 012.83-2.83l.06.06
      a1.65 1.65 0 001.82.33h.19A1.65 1.65 0 00112 5V3a2 2 0 014 0v.09
      a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06
      a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.19
      A1.65 1.65 0 0019.5 11h.09a2 2 0 012 2v.09
      a1.65 1.65 0 00-.33 1.82z"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // FIX ✔ now HTMLLIElement instead of HTMLDivElement
  const textRefs = useRef<HTMLLIElement[]>([]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized mouse parallax with throttling
  useEffect(() => {
    if (isReducedMotion) return;
    
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 25,
          y: (e.clientY / window.innerHeight - 0.5) * 25,
        });
        rafId = null;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  // Optimized GSAP animations
  useEffect(() => {
    if (!sectionRef.current || isReducedMotion || typeof window === 'undefined') return;

    let ctx: gsap.Context | null = null;
    let timer: NodeJS.Timeout | null = null;

    const initAnimations = () => {
      if (!sectionRef.current) return;

      // Clean up any existing context
      if (ctx) {
        ctx.revert();
      }

      ctx = gsap.context(() => {
        // Title animation
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            {
              opacity: 0,
              y: 30,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // Section entrance animation
        if (sectionRef.current) {
          gsap.fromTo(
            sectionRef.current,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // Image animation
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            {
              opacity: 0,
              y: 40,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: imageRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // Feature cards animation - filter out null refs
        const validTextRefs = textRefs.current.filter((ref) => ref !== null);
        if (validTextRefs.length > 0) {
          gsap.fromTo(
            validTextRefs,
            {
              opacity: 0,
              y: 40,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }
      }, sectionRef);
    };

    // Delay initialization to ensure DOM is ready and refs are populated
    timer = setTimeout(() => {
      initAnimations();
    }, 150);

    return () => {
      if (timer) clearTimeout(timer);
      if (ctx) {
        ctx.revert();
        ctx = null;
      }
    };
  }, [isReducedMotion]);

  // Memoized features array
  const features = useMemo(() => [
    {
      icon: <SupportIcon />,
      title: 'Customer Support for All Clients',
      text: (
        <>
          Every project comes with{' '}
          <span className="text-[#00FF41]/95 font-medium">reliable long-term support</span>. I ensure ongoing improvements and updates.
        </>
      ),
    },
    {
      icon: <SpeedIcon />,
      title: 'Modern & Fast Applications',
      text: (
        <>
          I build sleek,{' '}
          <span className="text-[#00FF41]/95 font-medium">high-performance applications</span> with cutting-edge technologies.
        </>
      ),
    },
    {
      icon: <ScalableIcon />,
      title: 'Custom Scalable Solutions',
      text: (
        <>
          Tailored to <span className="text-[#00FF41]/95 font-medium">your needs</span> — scalable and cleanly structured.
        </>
      ),
    },
  ], []);

  // Optimized hover handlers
  const handleCardMouseEnter = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 65, 0.6), inset 0 0 40px rgba(0, 255, 65, 0.1)';
    e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 1)';
    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  }, []);

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.2), inset 0 0 30px rgba(0, 255, 65, 0.05)';
    e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.3)';
    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  }, []);

  // Memoize particle arrays for performance
  const scanningLines = useMemo(() => [...Array(3)], []);
  const particles = useMemo(() => [...Array(isReducedMotion ? 5 : 10)], [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="about-section relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 isolate px-4 sm:px-6 md:px-8 lg:px-8 bg-[#000000]"
      aria-label="About Section"
    >
      {/* Dark futuristic background with subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.03)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_0%,_rgba(0,255,65,0.01)_50%,_transparent_100%)]" />
      
      {/* Animated HUD Grid Pattern - reduced on mobile */}
      <div
        className="absolute inset-0 opacity-[0.06] sm:opacity-[0.08] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]"
        style={{ animation: isReducedMotion ? 'none' : 'hudGridMove 25s linear infinite' }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.03] sm:opacity-[0.04] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:15px_15px] sm:bg-[size:20px_20px]"
        style={{ animation: isReducedMotion ? 'none' : 'hudGridMoveReverse 18s linear infinite' }}
        aria-hidden
      />
      
      {/* Animated scanning lines - lightweight, hidden on mobile */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
          {scanningLines.map((_, i) => (
            <div
              key={`scan-${i}`}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-30"
              style={{
                animation: `hudScanLine ${8 + i * 2}s linear infinite`,
                animationDelay: `${i * 2.5}s`,
                top: `${(i * 33) % 100}%`,
              }}
              aria-hidden
            />
          ))}
        </div>
      )}
      
      {/* Data stream particles - reduced on mobile */}
      {!isReducedMotion && (
        <div className="hidden sm:block">
          {particles.map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-[1px] h-[20px] bg-[#00FF41] opacity-20"
              style={{
                left: `${5 + (i * 9) % 90}%`,
                animation: `hudDataStream ${4 + (i % 3)}s linear infinite`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: `0 0 ${2 + (i % 3)}px #00FF41`,
              }}
              aria-hidden
            />
          ))}
        </div>
      )}
      
      {/* Floating HUD corner brackets - smaller on mobile */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-16 border-t-2 border-l-2 border-[#00FF41] opacity-30 sm:opacity-40" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite' }}
        aria-hidden 
      />
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-16 border-t-2 border-r-2 border-[#00FF41] opacity-30 sm:opacity-40" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite', animationDelay: '1s' }}
        aria-hidden 
      />
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-16 border-b-2 border-l-2 border-[#00FF41] opacity-30 sm:opacity-40" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite', animationDelay: '2s' }}
        aria-hidden 
      />
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-16 border-b-2 border-r-2 border-[#00FF41] opacity-30 sm:opacity-40" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite', animationDelay: '1.5s' }}
        aria-hidden 
      />
      
      {/* HUD Status Lines - hidden on mobile */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-8 w-16 sm:w-32 h-[1px] bg-[#00FF41] opacity-20 sm:opacity-30 hidden sm:block" aria-hidden />
      <div className="absolute top-16 sm:top-20 left-4 sm:left-8 w-[1px] h-6 sm:h-8 bg-[#00FF41] opacity-20 sm:opacity-30 hidden sm:block" aria-hidden />
      <div className="absolute top-16 sm:top-20 right-4 sm:right-8 w-16 sm:w-32 h-[1px] bg-[#00FF41] opacity-20 sm:opacity-30 hidden sm:block" aria-hidden />
      <div className="absolute top-16 sm:top-20 right-4 sm:right-8 w-[1px] h-6 sm:h-8 bg-[#00FF41] opacity-20 sm:opacity-30 hidden sm:block" aria-hidden />
      
      {/* HUD Info Panels - hidden on mobile */}
      <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-8 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/60 border border-[#00FF41]/30 font-mono text-[#00FF41]/60 text-[8px] sm:text-[10px] tracking-wider backdrop-blur-sm hidden sm:block" aria-hidden>
        <span className="text-[#00FF41]">[ABOUT_ACTIVE]</span>
      </div>
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/60 border border-[#00FF41]/30 font-mono text-[#00FF41]/60 text-[8px] sm:text-[10px] tracking-wider backdrop-blur-sm hidden sm:block" aria-hidden>
        <span className="text-[#00FF41]">[{features.length} FEATURES]</span>
      </div>
      
      {/* Glowing orbs for depth with mouse parallax - reduced on mobile */}
      {!isReducedMotion && (
        <>
          <div
            className="absolute -inset-20 sm:-inset-40 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.12)_0%,_rgba(0,255,65,0.15)_50%,_transparent_70%)] blur-2xl sm:blur-3xl transition-transform duration-1000 will-change-transform"
            style={{
              transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.18}px)`,
            }}
            aria-hidden
          />
          <div
            className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.06)_0%,_rgba(0,255,65,0.08)_50%,_transparent_70%)] blur-[80px] sm:blur-[120px] transition-transform duration-1000 will-change-transform"
            style={{
              transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * 0.1}px)`,
            }}
            aria-hidden
          />
        </>
      )}

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section title with HUD styling */}
        <div className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
          {/* HUD Panel behind title */}
          <div className="absolute inset-0 -inset-x-2 sm:-inset-x-4 md:-inset-x-8 bg-black/40 border border-[#00FF41]/30 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.15)] sm:shadow-[0_0_20px_rgba(0,255,65,0.2)]" />
          <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-[#00FF41] opacity-50 sm:opacity-60" />
          <div ref={titleRef} className="relative px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 about-title">
            <div className="text-center">
              <div className="inline-block text-[10px] xs:text-xs sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#00FF41]/70 mb-2 sm:mb-3 select-none font-mono">
                About Me
              </div>
              <h2 className="mb-3 sm:mb-4 text-2xl xs:text-3xl sm:text-4xl md:text-[42px] lg:text-[45px] font-bold !leading-[1.1] text-white">
                Software that <span className="text-[#00FF41]">empowers</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg !leading-relaxed text-gray-300 max-w-2xl mx-auto px-2">
                I deliver robust, modern applications with long-term client support and real after-launch care.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          
          {/* IMAGE LEFT - HUD styled */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start items-center order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative mb-0 aspect-[25/24] w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[460px] flex-shrink-0 group will-change-transform"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
              }}
            >
              {/* HUD Corner Brackets */}
              <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              
              {/* HUD Border */}
              <div className="absolute inset-0 border-2 border-[#00FF41]/30 bg-black/70 backdrop-blur-sm group-hover:border-[#00FF41] group-hover:shadow-[0_0_25px_rgba(0,255,65,0.5),inset_0_0_15px_rgba(0,255,65,0.08)] sm:group-hover:shadow-[0_0_30px_rgba(0,255,65,0.6),inset_0_0_20px_rgba(0,255,65,0.1)] transition-all duration-300" />
              
              {/* Scanning line effect */}
              {!isReducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudCardScan transition-opacity duration-300 pointer-events-none" />
              )}
              
              {/* Inner container */}
              <div className="relative rounded-full p-3 sm:p-4 md:p-5 lg:p-6 m-1.5 sm:m-2">
                {/* Pulsing inner glow */}
                {!isReducedMotion && (
                  <div className="absolute inset-0 rounded-full bg-[#00FF41]/20 blur-2xl opacity-30 sm:opacity-40 animate-pulse pointer-events-none" />
                )}

                <Image
                  src="/images/about/aboutsection.svg"
                  alt="About illustration"
                  priority
                  width={460}
                  height={460}
                  className="relative z-10 w-full h-auto rounded-full drop-shadow-[0_0_30px_rgba(0,255,65,0.2)] sm:drop-shadow-[0_0_50px_rgba(0,255,65,0.25)] group-hover:drop-shadow-[0_0_60px_rgba(0,255,65,0.3)] sm:group-hover:drop-shadow-[0_0_70px_rgba(0,255,65,0.35)] transition-all duration-500 group-hover:scale-[1.01] sm:group-hover:scale-[1.02]"
                  sizes="(max-width: 375px) 280px, (max-width: 640px) 90vw, (max-width: 1024px) 50vw, 460px"
                />
              </div>
            </div>
          </div>

          {/* TEXT RIGHT - HUD styled */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-2">
            {/* Features list with HUD styling */}
            <ul className="max-w-2xl w-full flex flex-col gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
              {features.map((feature, idx) => (
                <li
                  key={feature.title}
                  ref={(el) => {
                    if (el) {
                      textRefs.current[idx] = el;
                    }
                  }}
                  className="group relative flex flex-row items-start gap-3 sm:gap-4 md:gap-5 p-4 sm:p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:scale-[1.01] sm:hover:scale-[1.02] will-change-transform"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '2px solid rgba(0, 255, 65, 0.3)',
                    boxShadow: '0 0 20px rgba(0, 255, 65, 0.15), inset 0 0 25px rgba(0, 255, 65, 0.04)',
                    backdropFilter: 'blur(8px)',
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                    minHeight: 'auto'
                  }}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                >
                  {/* HUD Corner Brackets */}
                  <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
                  <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
                  <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
                  <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
                  
                  {/* HUD Status Indicator - hidden on mobile */}
                  <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 px-1 sm:px-1.5 py-0.5 bg-black/80 border border-[#00FF41]/40 font-mono text-[7px] sm:text-[8px] text-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 backdrop-blur-sm hidden sm:block"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))',
                      boxShadow: '0 0 8px rgba(0, 255, 65, 0.25)'
                    }}
                  >
                    <span className="text-[#00FF41]">[ACTIVE]</span>
                  </div>
                  
                  {/* Scanning line effect */}
                  {!isReducedMotion && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudCardScan transition-opacity duration-300 pointer-events-none" />
                  )}
                  
                  {/* HUD Side Panels - hidden on mobile */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-12 sm:h-16 bg-[#00FF41]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-12 sm:h-16 bg-[#00FF41]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
                  
                  {/* Icon container */}
                  <span className="shrink-0 relative z-10 p-1.5 sm:p-2 rounded-lg bg-[#00FF41]/10 group-hover:bg-[#00FF41]/20 transition-colors duration-300">
                    <span className="drop-shadow-[0_0_6px_rgba(0,255,65,0.3)] sm:drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                      {feature.icon}
                    </span>
                  </span>

                  {/* Content */}
                  <div className="flex-1 pt-0.5 sm:pt-1 relative z-10">
                    <h3 className="block font-bold text-sm sm:text-base md:text-lg lg:text-xl text-[#00FF41] mb-1.5 sm:mb-2 leading-tight drop-shadow-[0_0_8px_rgba(0,255,65,0.25)] sm:drop-shadow-[0_0_10px_rgba(0,255,65,0.3)] font-mono">
                      {feature.title}
                    </h3>
                    <p className="block text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                  
                  {/* HUD Bottom Status Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </li>
              ))}
            </ul>

            {/* CTA buttons with HUD styling */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 items-stretch sm:items-center">
              <a
                href="/projects"
                className="group/btn relative inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 border-2 font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80 focus:ring-offset-2 focus:ring-offset-black overflow-hidden text-[11px] xs:text-xs sm:text-sm md:text-base min-h-[44px] sm:min-h-[48px] touch-manipulation"
                style={{
                  backgroundColor: 'rgba(0, 255, 65, 0.1)',
                  borderColor: '#00FF41',
                  color: '#00FF41',
                  boxShadow: '0 0 15px rgba(0, 255, 65, 0.3), inset 0 0 15px rgba(0, 255, 65, 0.05)',
                  clipPath: 'polygon(3px 0, 100% 0, 100% 100%, 0 100%, 0 3px)'
                }}
                onMouseEnter={(e) => {
                  if (!isReducedMotion) {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.7), inset 0 0 25px rgba(0, 255, 65, 0.1)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.3), inset 0 0 15px rgba(0, 255, 65, 0.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                }}
              >
                {/* Button corner accents */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                {/* Button scanning line effect */}
                {!isReducedMotion && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-hudButtonScan transition-opacity duration-200 pointer-events-none" />
                )}
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[#00FF41]/60 text-[10px] sm:text-xs">▶</span>
                  <span>View Projects</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover/btn:translate-x-0.5 sm:group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="text-[#00FF41]/60 text-[10px] sm:text-xs">◀</span>
                </span>
              </a>

              <a
                href="/contact"
                className="group/btn relative inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 border-2 font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80 focus:ring-offset-2 focus:ring-offset-black overflow-hidden text-[11px] xs:text-xs sm:text-sm md:text-base min-h-[44px] sm:min-h-[48px] touch-manipulation"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderColor: 'rgba(0, 255, 65, 0.5)',
                  color: '#00FF41',
                  boxShadow: '0 0 12px rgba(0, 255, 65, 0.15), inset 0 0 12px rgba(0, 255, 65, 0.03)',
                  clipPath: 'polygon(3px 0, 100% 0, 100% 100%, 0 100%, 0 3px)'
                }}
                onMouseEnter={(e) => {
                  if (!isReducedMotion) {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.5), inset 0 0 20px rgba(0, 255, 65, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 1)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 255, 65, 0.15), inset 0 0 12px rgba(0, 255, 65, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                }}
              >
                {/* Button corner accents */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                {/* Button scanning line effect */}
                {!isReducedMotion && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-hudButtonScan transition-opacity duration-200 pointer-events-none" />
                )}
                <span className="relative z-10">Contact Me</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
