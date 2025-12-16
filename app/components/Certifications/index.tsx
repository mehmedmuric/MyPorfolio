'use client';

import { useEffect, useRef, useState } from "react";
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

  // Mouse parallax for cyber effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP scroll and card entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!document.querySelector(".cert-section")) return;

      const ctx = gsap.context(() => {
        // Section entrance
        gsap.from(".cert-section", {
          opacity: 0,
          y: 90,
          duration: 1.2,
          ease: "power4.out",
          autoKill: true,
          scrollTrigger: {
            trigger: ".cert-section",
            start: "top 88%",
          },
        });

      // Title glow
      gsap.from(".cert-title", {
        opacity: 0,
        scale: 0.92,
        filter: "drop-shadow(0 0 0 rgba(16,255,128,0))",
        duration: 1.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-title",
          start: "top 97%",
        },
      });

      // Card entrance and focus
      gsap.utils.toArray(".cert-card").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 80,
            rotateY: 16,
            scale: 0.94,
            filter: "drop-shadow(0 0 0 rgba(57,251,171,0))",
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.92,
            delay: i * 0.09,
            filter: "drop-shadow(0 0 25px rgba(57,251,171,0.23))",
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 97%",
            },
            clearProps: "all"
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
    }, 100); // Delay to allow DOM to render

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cert-section relative overflow-hidden py-16 md:py-20 lg:py-28 isolate px-4 sm:px-6 md:px-8 lg:px-16 
        bg-[#050505] 
        bg-[radial-gradient(ellipse_at_top_left,_#163a2a_10%,_#0b1e15_40%,_#020202_90%)]
        after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle,av(42,244,180/0.07)_0%,_transparent_70%)] after:z-0
      "
      tabIndex={-1}
      aria-label="Certifications Section"
    >
      {/* Main cyber grid background */}
      <div 
        className="absolute inset-0 opacity-[0.07] 
          bg-[linear-gradient(90deg,#1ffaac_1px,transparent_1px),linear-gradient(#1ffaac_1px,transparent_1px)] 
          bg-[size:42px_42px] animate-[gridMove_27s_linear_infinite]"
        aria-hidden
      />

      {/* Extra grid layer for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] 
          bg-[linear-gradient(90deg,#a0ffe5_1px,transparent_1px),linear-gradient(#a0ffe5_1px,transparent_1px)] 
          bg-[size:24px_24px]"
        style={{
          animation: 'gridMove-reverse 16s linear infinite'
        }}
        aria-hidden
      />

      {/* Parallax aurora shine */}
      <div 
        className="absolute -inset-40 pointer-events-none bg-[radial-gradient(circle_at_60%_40%,_rgba(54,255,180,0.14),_transparent_70%)] blur-2xl animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.22}px)`,
        }}
        aria-hidden
      />

      {/* Additional glow/orb */}
      <div 
        className="absolute top-1/3 left-1/4 w-[22rem] h-[22rem] bg-emerald-400/10 rounded-full blur-[110px] animate-[pulse-slow_9s_ease-in-out_infinite]"
        style={{
          transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * 0.09}px)`,
        }}
        aria-hidden
      />

      {/* Floating particles - improved visual */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-gradient-to-br from-green-400 via-emerald-400 to-green-200 rounded-full opacity-[.14] animate-float-spark pointer-events-none"
          style={{
            left: `${9 + i * 11}%`,
            top: `${8 + (i % 4) * 22}%`,
            animationDelay: `${i * 0.33}s`,
            animationDuration: `${3.7 + i * 0.6}s`,
            width: `${4 + ((i*2)%5)}px`,
            height: `${4 + ((i*3)%6)}px`,
            filter: i % 2 === 0 ? "blur(0.5px)" : "blur(2.5px)"
          }}
        />
      ))}

      {/* Animated scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div 
          className="absolute top-[18%] left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 via-60% to-transparent"
          style={{
            opacity: 0.045,
            animation: 'scanLine 10s linear infinite'
          }}
        />
        <div 
          className="absolute top-[62%] left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 via-30% to-transparent"
          style={{
            opacity: 0.035,
            animation: 'scanLine 16s linear infinite reverse'
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="cert-title">
          <SectionTitle
            title="Certifications"
            paragraph="I continuously expand my expertise through curated courses and verified certifications. Every badge below marks a pivotal step in conquering modern full-stack engineering."
            center
            mb="65px"
          />
        </div>

        <p
          className="text-center text-emerald-300/80 font-mono tracking-wide max-w-2xl mx-auto mb-14 text-base sm:text-lg 
            animate-fade-in-up opacity-95 shadow-none"
          style={{ animationDelay: '0.16s', animationDuration: "1.1s" }}
        >
          Proven credentials in back-end systems, front-end frameworks, cloud, DevOps and more:
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-8 md:gap-10 lg:gap-12 items-center justify-center">
          {brandsData.map((brand, index) => (
            <SingleBrand key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

// Improved card: accessibility, focus, even more cybernics
const SingleBrand = ({ brand, index }: { brand: Brand; index: number }) => {
  const { href, image, name, issued, platform, description } = brand;
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div
      tabIndex={0}
      aria-label={`${name} certification`}
      className={`
        cert-card group/brand relative flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl
        backdrop-blur-lg bg-black/70 border border-green-500/25
        transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-[1.025] md:hover:scale-[1.045]
        w-[93vw] sm:w-[70vw] md:w-[40vw] lg:w-[340px] xl:w-[320px] max-w-[340px]
        shadow-[0_0_28px_rgba(34,197,94,0.10)] ring-0 ring-emerald-300/70 
        focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:z-30
        hover:shadow-[0_0_44px_rgba(16,255,128,0.24)] hover:ring-2
        ${hasFocus ? "ring-2 ring-green-400/80 shadow-[0_0_52px_rgba(16,255,128,0.32)] z-20" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
    >
      {/* Four animated cyber-corner accents, deeper */}
      <div className="feature-corner absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-green-500/22 rounded-tl-2xl group-hover/brand:border-green-400/70 group-focus/brand:border-green-300/90 transition-colors duration-400 pointer-events-none" />
      <div className="feature-corner absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-green-400/11 rounded-tr-2xl group-hover/brand:border-green-400/60 transition-colors duration-400 pointer-events-none" />
      <div className="feature-corner absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-emerald-400/13 rounded-bl-2xl group-hover/brand:border-emerald-300/45 transition-colors duration-400 pointer-events-none" />
      <div className="feature-corner absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-green-400/15 rounded-br-lg group-hover/brand:border-green-400/35 transition-colors duration-400 pointer-events-none" />

      {/* Glow shine and border aurora */}
      <div className={`
        pointer-events-none absolute -inset-2 rounded-3xl blur-[2.7px] 
        bg-emerald-400/0 group-hover/brand:bg-emerald-400/[.10] group-focus/brand:bg-emerald-400/[.19]
        transition-all duration-500 -z-10
      `} />

      {/* Inner border gradient pulse */}
      <div className={`
        absolute inset-[2px] rounded-2xl bg-gradient-to-br from-emerald-400/0 via-emerald-400/12 to-green-400/0
        transition-all duration-500 pointer-events-none
        ${isHovered || hasFocus ? 'opacity-100 blur-[1.6px]' : 'opacity-0'}
      `} />

      {/* Icon/brand image with animations and cyber outline */}
      <div
        className="relative flex items-center justify-center h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40
        rounded-full shadow-[0_0_26px_rgba(0,255,128,0.23)]
        group-hover/brand:shadow-[0_0_36px_rgba(0,255,128,0.35)]
        transition-all duration-500 animate-pulse-slow
        bg-gradient-radial from-emerald-400/30 via-emerald-400/0 to-transparent
      ">
        {/* Pulsing cyber ring */}
        {(isHovered || hasFocus) && (
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-pulse pointer-events-none" />
        )}
        <Image
          src={image}
          alt={`${name} logo`}
          width={160}
          height={160}
          loading="eager"
          className={`
            relative z-10 object-contain drop-shadow-[0_0_15px_rgba(0,255,128,0.18)]
            group-hover/brand:drop-shadow-[0_0_34px_rgba(59,255,180,0.28)] transition-all duration-500
            group-hover/brand:scale-110 ${hasFocus ? "scale-[1.12]" : ""}
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
          `}
          draggable={false}
          priority
        />
      </div>

      {/* Certificate title */}
      <p className="mt-4 ro md:mt-5 text-[0.98rem] sm:text-base md:text-[1.12rem] font-semibold text-center text-white group-hover/brand:text-emerald-300/90 group-focus/brand:text-emerald-400 transition-all duration-300 relative">
        <span className="relative inline-block">
          {name}
          <span 
            className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-300/70 transition-all duration-500 ${isHovered || hasFocus ? 'w-full' : 'w-0'}`}
            aria-hidden
            
          />
        </span>
      </p>
      {/* Platform/issued line */}
      <p className="text-xs sm:text-sm text-gray-400 text-center mt-1 group-hover/brand:text-gray-200 group-focus/brand:text-gray-100 transition-colors">
        {platform} • {issued}
      </p>
      {/* Description */}
      <p className="text-center text-gray-400 mt-2 text-xs sm:text-sm px-3 group-hover/brand:text-gray-300 group-focus/brand:text-gray-100 transition-colors">{description}</p>
      
      {/* Certificate link button */}
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer noopener"
        aria-describedby={`cert-desc-${index}`}
        className={`
          mt-4 md:mt-5 relative inline-block rounded-lg px-4 py-2.5 md:px-6 md:py-3.5 
          text-xs sm:text-sm md:text-base text-center font-medium uppercase tracking-wide
          transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,128,0.24)] focus:shadow-[0_0_26px_rgba(9,255,128,0.37)]
          bg-emerald-400 border border-emerald-400 text-black
          hover:bg-transparent focus:bg-transparent
          hover:text-emerald-400 focus:text-emerald-300
          shadow-[0_0_15px_rgba(0,255,128,0.13)]
          group/btn
          outline-none
        `}
        tabIndex={0}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      >
        {/* Button glow accent */}
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/25 to-emerald-400/0 opacity-0 group-hover/btn:opacity-100 group-focus/btn:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
        <span className="relative z-10">Show Certificate</span>
      </a>

      {/* Visually hidden extra description for screen readers */}
      <span id={`cert-desc-${index}`} className="sr-only">{`${name} issued by ${platform} on ${issued}`}</span>
    </div>
  );
};
