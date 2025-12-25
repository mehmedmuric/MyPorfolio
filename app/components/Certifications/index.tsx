'use client';

import React, { useEffect, useRef, useState } from "react";
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
        {/* Section title with HUD styling */}
        <div className="relative mb-12 md:mb-16 lg:mb-20">
          {/* HUD Panel behind title */}
          <div className="absolute inset-0 -inset-x-4 md:-inset-x-8 bg-black/40 border border-[#00FF41]/30 rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,65,0.2)]" />
          <div className="absolute top-0 left-0 w-2 h-full bg-[#00FF41] opacity-60" />
          <div className="relative px-4 md:px-8 py-6 md:py-8 cert-title">
            <SectionTitle
              title="Certifications"
              paragraph="I continuously expand my expertise through curated courses and verified certifications. Every badge below marks a pivotal step in conquering modern full-stack engineering."
              center
              mb="0px"
            />
          </div>
        </div>

        <p
          className="text-center text-[#00FF41]/80 font-mono tracking-wide max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14 text-sm sm:text-base md:text-lg"
        >
          Proven credentials in back-end systems, front-end frameworks, cloud, DevOps and more:
        </p>

        {/* Certifications Grid - Responsive HUD Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-stretch justify-items-center max-w-7xl mx-auto cert-grid">
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

export default Certifications;

// HUD-style certification card with cyber green aesthetic
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
          p-5 sm:p-6 md:p-7 lg:p-8
          bg-black/70 border-2 border-[#00FF41]/30 backdrop-blur-sm
          transition-all duration-300 ease-out
          hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-[1.02] md:hover:scale-[1.03]
          w-full max-w-[380px]
          hover:border-[#00FF41] hover:shadow-[0_0_30px_rgba(0,255,65,0.6),inset_0_0_20px_rgba(0,255,65,0.1)]
          hover:bg-black/85
          focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80 focus:z-30
          ${hasFocus ? "border-[#00FF41] shadow-[0_0_40px_rgba(0,255,65,0.8)] z-20" : ""}
        `}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      >
        {/* HUD Corner Brackets - Enhanced */}
        <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200" />
        <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200" />
        <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200" />
        <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200" />
        
        {/* HUD Status Indicator */}
        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 border border-[#00FF41]/40 font-mono text-[8px] text-[#00FF41]/70 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200">
          [ACTIVE]
        </div>
        
        {/* Scanning line effect on hover - fast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover/brand:opacity-100 group-hover/brand:animate-hudCardScan transition-opacity duration-300 pointer-events-none" />
        
        {/* HUD Side Panels */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-16 bg-[#00FF41]/20 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-16 bg-[#00FF41]/20 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300" />
        
        {/* Icon Container with HUD glow - Enhanced */}
        <div className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 mb-3 md:mb-4
          bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.3),_transparent_70%)]
          transition-all duration-300
          group-hover/brand:bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.5),_transparent_70%)]
        ">
          {/* Outer HUD Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#00FF41]/20 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300" />
          
          {/* Glowing ring - Inner */}
          <div className="absolute inset-2 rounded-full border border-[#00FF41]/40 opacity-0 group-hover/brand:opacity-100 group-hover/brand:animate-hudIconPulse transition-opacity duration-200" />
          
          {/* HUD Crosshair Lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-[#00FF41]/30 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-[#00FF41]/30 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-[#00FF41]/30 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-[#00FF41]/30 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300" />
          
          <Image
            src={image}
            alt={`${name} logo`}
            width={128}
            height={128}
            loading="eager"
            className={`
              relative z-10 object-contain transition-all duration-300
              w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
              ${isHovered || hasFocus ? 'scale-110 brightness-110 drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]' : 'scale-100'}
            `}
            draggable={false}
            priority={index < 3}
          />
        </div>
        
        {/* Certificate title - Monospace HUD style - Enhanced */}
        <div className="mt-2 md:mt-3 relative w-full">
          <p className="text-sm sm:text-base md:text-lg font-mono font-semibold text-center text-[#00FF41]/90 
            group-hover/brand:text-[#00FF41] transition-colors duration-200 relative z-10
            tracking-wider"
          >
            <span className="relative inline-block">
              <span className="text-[#00FF41]/50 mr-1">[</span>
              {name.toUpperCase()}
              <span className="text-[#00FF41]/50 ml-1">]</span>
              <span 
                className={`absolute -bottom-1 left-0 h-[2px] bg-[#00FF41] transition-all duration-200 ${isHovered || hasFocus ? 'w-full' : 'w-0'}`}
                aria-hidden
              />
            </span>
          </p>
          
          {/* HUD Title Underline Accent */}
          <div className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1px] w-12 bg-[#00FF41]/30 transition-all duration-200 ${isHovered || hasFocus ? 'w-24 opacity-100' : 'opacity-50'}`} />
        </div>
        
        {/* Platform/issued line - HUD style - Enhanced */}
        <div className="mt-1.5 md:mt-2 relative w-full px-4">
          <p className="text-[10px] sm:text-xs md:text-sm text-[#00FF41]/60 text-center font-mono 
            group-hover/brand:text-[#00FF41]/80 transition-colors duration-200"
          >
            <span className="text-[#00FF41]/40">PLATFORM:</span> <span className="text-[#00FF41]">{platform}</span> <span className="text-[#00FF41]/40 mx-1">|</span> <span className="text-[#00FF41]/40">ISSUED:</span> <span className="text-[#00FF41]">{issued}</span>
          </p>
        </div>
        
        {/* Description - HUD style */}
        <p className="text-center text-[#00FF41]/50 mt-2 md:mt-3 text-[10px] sm:text-xs md:text-sm px-3 md:px-4 font-mono
          group-hover/brand:text-[#00FF41]/70 transition-colors duration-200 leading-relaxed"
        >
          {description}
        </p>
        
        {/* Certificate link button - HUD style - Enhanced */}
        <a
          href={href}
          target="_blank"
          rel="nofollow noreferrer noopener"
          aria-describedby={`cert-desc-${index}`}
          className={`
            mt-4 md:mt-5 relative inline-block px-4 py-2 md:px-5 md:py-2.5
            text-[10px] sm:text-xs md:text-sm text-center font-mono font-bold uppercase tracking-wider
            transition-all duration-200
            bg-black/80 border-2 border-[#00FF41]/50 text-[#00FF41]
            hover:border-[#00FF41] hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] hover:bg-black/90
            hover:scale-105 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80
            group/btn
          `}
          style={{
            clipPath: 'polygon(4px 0, 100% 0, 100% 100%, 0 100%, 0 4px)',
          }}
          tabIndex={0}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        >
          {/* Button corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
          
          {/* Button scanning line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-hudButtonScan transition-opacity duration-200 pointer-events-none" />
          
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-[#00FF41]/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
          
          <span className="relative z-10 flex items-center gap-1.5">
            <span className="text-[#00FF41]/60">▶</span>
            <span>SHOW CERTIFICATE</span>
            <span className="text-[#00FF41]/60">◀</span>
          </span>
        </a>
        
        {/* HUD Bottom Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300" />

        {/* Visually hidden extra description for screen readers */}
        <span id={`cert-desc-${index}`} className="sr-only">{`${name} issued by ${platform} on ${issued}`}</span>
      </div>
    );
  }
);

SingleBrand.displayName = "SingleBrand";
