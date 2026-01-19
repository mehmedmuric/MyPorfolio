'use client';

import React, { useEffect, useRef, useState, memo } from "react";
import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import SectionTitle from "../Common/SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Mouse parallax for cyber effects - lightweight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP scroll and card entrance animations - optimized
  useEffect(() => {
    if (!sectionRef.current) return;

    const timer = setTimeout(() => {
      const certSection = document.querySelector(".cert-section");
      const certTitle = document.querySelector(".cert-title");
      if (!certSection || !certTitle) return;

      const ctx = gsap.context(() => {
        // Section entrance - fast
        gsap.from(certSection, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: certSection,
            start: "top 85%",
            invalidateOnRefresh: true,
          },
        });

        // Title entrance
        gsap.from(certTitle, {
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: certTitle,
            start: "top 90%",
            invalidateOnRefresh: true,
          },
        });

        // Card entrance - fast and lightweight
        cardsRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(
            el,
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
              delay: i * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cert-section relative overflow-hidden py-16 md:py-20 lg:py-28 isolate px-4 sm:px-6 md:px-8 lg:px-8 bg-[#000000]"
      id="certifications"
      tabIndex={-1}
      aria-label="Certifications Section"
    >
      {/* Dark futuristic background with subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.03)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_0%,_rgba(0,255,65,0.01)_50%,_transparent_100%)]" />
      
      {/* Animated HUD Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{ animation: 'hudGridMove 25s linear infinite' }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:20px_20px]"
        style={{ animation: 'hudGridMoveReverse 18s linear infinite' }}
        aria-hidden
      />
      
      {/* Animated scanning lines - lightweight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
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
      
      {/* Data stream particles - lightweight */}
      {[...Array(10)].map((_, i) => (
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
      
      {/* Floating HUD corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#00FF41] opacity-40 animate-hud-float" aria-hidden />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#00FF41] opacity-40 animate-hud-float" style={{ animationDelay: '1s' }} aria-hidden />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#00FF41] opacity-40 animate-hud-float" style={{ animationDelay: '2s' }} aria-hidden />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#00FF41] opacity-40 animate-hud-float" style={{ animationDelay: '1.5s' }} aria-hidden />
      
      {/* HUD Status Lines */}
      <div className="absolute top-20 left-8 w-32 h-[1px] bg-[#00FF41] opacity-30" aria-hidden />
      <div className="absolute top-20 left-8 w-[1px] h-8 bg-[#00FF41] opacity-30" aria-hidden />
      <div className="absolute top-20 right-8 w-32 h-[1px] bg-[#00FF41] opacity-30" aria-hidden />
      <div className="absolute top-20 right-8 w-[1px] h-8 bg-[#00FF41] opacity-30" aria-hidden />
      
      {/* HUD Info Panels */}
      <div className="absolute bottom-20 left-8 px-3 py-1.5 bg-black/60 border border-[#00FF41]/30 font-mono text-[#00FF41]/60 text-[10px] tracking-wider" aria-hidden>
        <span className="text-[#00FF41]">[CERT_VERIFIED]</span>
      </div>
      <div className="absolute bottom-20 right-8 px-3 py-1.5 bg-black/60 border border-[#00FF41]/30 font-mono text-[#00FF41]/60 text-[10px] tracking-wider" aria-hidden>
        <span className="text-[#00FF41]">[{brandsData.length} ACTIVE]</span>
      </div>
      
      {/* Glowing orbs for depth - lightweight */}
      <div
        className="absolute -inset-40 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.15),_transparent_70%)] blur-3xl transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.18}px)`,
        }}
        aria-hidden
      />
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.08),_transparent_70%)] blur-[120px] transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * 0.1}px)`,
        }}
        aria-hidden
      />

      <div className="container mx-auto relative z-10">
        {/* Enhanced Section title with modern HUD styling */}
        <div className="relative mb-14 md:mb-18 lg:mb-24">
          {/* Modern HUD Panel behind title */}
          <div className="absolute inset-0 -inset-x-4 md:-inset-x-8 bg-gradient-to-br from-black/60 via-black/50 to-black/60 border border-[#00FF41]/35 rounded-xl backdrop-blur-md shadow-[0_0_30px_rgba(0,255,65,0.25),inset_0_0_20px_rgba(0,255,65,0.05)]" />
          <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-[#00FF41] via-[#00FF41]/80 to-[#00FF41] opacity-70" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/50 to-transparent" />
          <div className="relative px-6 md:px-10 py-8 md:py-10 cert-title">
            <SectionTitle
              title="Certifications"
              paragraph="I continuously expand my expertise through curated courses and verified certifications. Every badge below marks a pivotal step in conquering modern full-stack engineering."
              center
              mb="0px"
            />
          </div>
        </div>

        {/* Enhanced subtitle with better typography */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          <p className="text-[#00FF41]/90 font-mono tracking-wide max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
            <span className="text-[#00FF41]/50">[</span>
            <span className="text-[#00FF41]">Proven credentials</span>
            <span className="text-[#00FF41]/50">]</span> in back-end systems, front-end frameworks, cloud infrastructure, DevOps and more:
          </p>
        </div>

        {/* Modern Certifications Grid - Enhanced responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-stretch justify-items-center max-w-7xl mx-auto cert-grid">
          {brandsData.map((brand, index) => (
            <SingleBrand 
              key={brand.id} 
              brand={brand} 
              index={index}
              ref={(el) => {
                if (el) {
                  cardsRef.current[index] = el;
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Certifications);

// Modern HUD-style certification card with enhanced cyber green aesthetic
const SingleBrand = React.forwardRef<HTMLDivElement, { brand: Brand; index: number }>(
  ({ brand, index }, ref) => {
    const { href, image, name, issued, platform, description } = brand;
    const [isHovered, setIsHovered] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);

    return (
      <div
        ref={ref}
        tabIndex={0}
        aria-label={`${name} certification`}
        className={`
          cert-card group/brand relative flex flex-col items-center justify-center 
          p-6 sm:p-7 md:p-8 lg:p-9
          bg-gradient-to-br from-black/80 via-black/75 to-black/80 
          border-2 backdrop-blur-md rounded-xl overflow-hidden
          transition-all duration-700 ease-out
          hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-[1.03] md:hover:scale-[1.05]
          w-full max-w-[400px]
          hover:border-[#00FF41] hover:shadow-[0_0_50px_rgba(0,255,65,0.9),inset_0_0_30px_rgba(0,255,65,0.15)]
          hover:bg-gradient-to-br hover:from-black/90 hover:via-black/85 hover:to-black/90
          focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80 focus:z-30
          ${hasFocus ? "border-[#00FF41] shadow-[0_0_50px_rgba(0,255,65,0.9)] z-20" : "border-[#00FF41]/35"}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      >
        {/* Enhanced HUD Corner Brackets */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#00FF41]/70 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#00FF41]/70 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#00FF41]/70 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#00FF41]/70 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
        
        {/* Enhanced HUD Status Indicator */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-br from-black/95 to-black/90 border-2 border-[#00FF41]/70 text-[#00FF41] text-[10px] md:text-xs font-mono font-bold opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(0,255,65,0.6)] z-20 rounded-md">
          [ACTIVE]
        </div>
        
        {/* Enhanced scanning line effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/15 to-transparent opacity-0 group-hover/brand:opacity-100 group-hover/brand:animate-hudCardScan transition-opacity duration-700 pointer-events-none" />
        
        {/* Enhanced hover glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/8 via-transparent to-[#00FF41]/5 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Enhanced Icon Container with modern HUD glow */}
        <div className="relative flex items-center justify-center h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 mb-4 md:mb-5
          bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.25),_transparent_75%)]
          transition-all duration-700 rounded-xl
          group-hover/brand:bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.45),_transparent_75%)]
        ">
          {/* Enhanced glowing ring */}
          <div className="absolute inset-0 rounded-xl border-2 border-[#00FF41]/50 opacity-0 group-hover/brand:opacity-100 group-hover/brand:animate-hudIconPulse transition-opacity duration-500" />
          
          {/* HUD Crosshair Lines - Enhanced */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-[#00FF41]/40 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-[#00FF41]/40 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-3 bg-[#00FF41]/40 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-3 bg-[#00FF41]/40 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500" />
          
          <Image
            src={image}
            alt={`${name} logo`}
            width={128}
            height={128}
            loading="eager"
            className={`
              relative z-10 object-contain transition-all duration-700
              w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 filter
              ${isHovered || hasFocus ? 'scale-115 brightness-125 drop-shadow-[0_0_20px_rgba(0,255,65,0.9)]' : 'scale-100'}
            `}
            draggable={false}
            priority={index < 3}
          />
        </div>
        
        {/* Enhanced Certificate title with better typography */}
        <div className="mt-3 md:mt-4 relative w-full">
          <p className={`text-base sm:text-lg md:text-xl font-mono font-semibold text-center transition-colors duration-500 relative z-10 tracking-wider select-none ${isHovered || hasFocus ? "text-[#00FF41]" : "text-[#00FF41]/90"}`}>
            <span className="relative inline-block drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
              <span className="text-[#00FF41]/50 mr-1.5">[</span>
              {name.toUpperCase()}
              <span className="text-[#00FF41]/50 ml-1.5">]</span>
            </span>
          </p>
          
          {/* Enhanced Title Underline Accent */}
          <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-16 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent transition-all duration-500 ${isHovered || hasFocus ? 'w-32 opacity-100 shadow-[0_0_10px_rgba(0,255,65,0.6)]' : 'opacity-50'}`} />
        </div>
        
        {/* Enhanced Platform/issued line */}
        <div className="mt-2 md:mt-3 relative w-full px-5">
          <p className="text-xs sm:text-sm md:text-base text-center font-mono 
            transition-colors duration-500"
          >
            <span className={`${isHovered || hasFocus ? 'text-[#00FF41]/60' : 'text-[#00FF41]/40'}`}>PLATFORM:</span> 
            <span className={`mx-1.5 ${isHovered || hasFocus ? 'text-[#00FF41]' : 'text-[#00FF41]/90'}`}>{platform}</span> 
            <span className={`${isHovered || hasFocus ? 'text-[#00FF41]/60' : 'text-[#00FF41]/40'} mx-1.5`}>|</span> 
            <span className={`${isHovered || hasFocus ? 'text-[#00FF41]/60' : 'text-[#00FF41]/40'}`}>ISSUED:</span> 
            <span className={`ml-1.5 ${isHovered || hasFocus ? 'text-[#00FF41]' : 'text-[#00FF41]/90'}`}>{issued}</span>
          </p>
        </div>
        
        {/* Enhanced Description */}
        <p className={`text-center mt-3 md:mt-4 text-xs sm:text-sm md:text-base px-4 md:px-5 font-mono
          transition-colors duration-500 leading-relaxed
          ${isHovered || hasFocus ? 'text-[#00FF41]/80' : 'text-[#00FF41]/50'}
        `}>
          {description}
        </p>
        
        {/* Enhanced Certificate link button */}
        <a
          href={href || "#"}
          target={href ? "_blank" : undefined}
          rel={href ? "nofollow noreferrer noopener" : undefined}
          aria-describedby={`cert-desc-${index}`}
          className={`
            mt-5 md:mt-6 relative inline-block px-5 py-2.5 md:px-6 md:py-3
            text-xs sm:text-sm md:text-base text-center font-mono font-bold uppercase tracking-wider
            transition-all duration-500 rounded-lg overflow-hidden
            bg-gradient-to-br from-black/90 to-black/80 border-2 text-[#00FF41]
            hover:border-[#00FF41] hover:shadow-[0_0_25px_rgba(0,255,65,0.7)] hover:bg-gradient-to-br hover:from-black/95 hover:to-black/90
            hover:scale-105 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80
            group/btn
            ${isHovered || hasFocus ? "border-[#00FF41] shadow-[0_0_25px_rgba(0,255,65,0.7)]" : "border-[#00FF41]/50"}
            ${!href ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          `}
          tabIndex={href ? 0 : -1}
          onClick={(e) => !href && e.preventDefault()}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        >
          {/* Enhanced button corner accents */}
          <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#00FF41]/70 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#00FF41]/70 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#00FF41]/70 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#00FF41]/70 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          
          {/* Enhanced button scanning line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/25 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-hudButtonScan transition-opacity duration-500 pointer-events-none" />
          
          {/* Enhanced button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/10 via-transparent to-[#00FF41]/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          
          <span className="relative z-10 flex items-center gap-2">
            <span className={`transition-opacity duration-500 ${isHovered || hasFocus ? 'text-[#00FF41]/80' : 'text-[#00FF41]/50'}`}>▶</span>
            <span>{href ? "VIEW CERTIFICATE" : "COMING SOON"}</span>
            <span className={`transition-opacity duration-500 ${isHovered || hasFocus ? 'text-[#00FF41]/80' : 'text-[#00FF41]/50'}`}>◀</span>
          </span>
        </a>
        
        {/* Enhanced Bottom Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-0 group-hover/brand:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_rgba(0,255,65,0.6)]" />

        {/* Visually hidden extra description for screen readers */}
        <span id={`cert-desc-${index}`} className="sr-only">{`${name} issued by ${platform} on ${issued}`}</span>
      </div>
    );
  }
);

SingleBrand.displayName = "SingleBrand";
