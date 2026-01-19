'use client'

import { useState, useEffect, useRef, useMemo, memo } from "react";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TechCategory = 'frontend' | 'backend' | 'database' | 'cloud' | 'tools';

interface Technology {
  name: string;
  src: string;
  category?: TechCategory;
  proficiency?: string;
  years?: number;
  docUrl?: string;
}

const categories = [
  {
    key: 'frontend',
    label: 'Frontend',
    color: 'from-blue-400/70 to-blue-500/30',
    border: 'border-blue-500/30',
    icon: '🖥️',
    description: "UI, interactivity, web frameworks",
  },
  {
    key: 'backend',
    label: 'Backend',
    color: 'from-purple-400/70 to-purple-500/20',
    border: 'border-purple-500/30',
    icon: '🔧',
    description: "APIs, business logic, server-side",
  },
  {
    key: 'database',
    label: 'Database',
    color: 'from-green-400/70 to-green-500/20',
    border: 'border-green-500/30',
    icon: '🗄️',
    description: "Persistence, data storage",
  },
  {
    key: 'cloud',
    label: 'Cloud',
    color: 'from-orange-300/70 to-orange-500/20',
    border: 'border-orange-500/30',
    icon: '☁️',
    description: "Infrastructure, scalability, CDN",
  },
  {
    key: 'tools',
    label: 'Tools',
    color: 'from-gray-400/60 to-gray-500/10',
    border: 'border-gray-500/30',
    icon: '⚙️',
    description: "Auxiliary, OS, dev toolkit",
  }
] as const;

const getCategoryColor = (category?: TechCategory) => {
  if (!category) return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
  const colors = {
    frontend: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    backend: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    database: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    cloud: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30',
    tools: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
  };
  return colors[category] || colors.frontend;
};

const technologies: Technology[] = [
  { name: "HTML", src: "/images/models/html5.svg", category: "frontend", years: 7, docUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", src: "/images/models/css3.svg", category: "frontend", years: 7, docUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript", src: "/images/models/javascript.svg", category: "frontend", proficiency: "Advanced", years: 7, docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "React", src: "/images/models/react.svg", category: "frontend", proficiency: "Advanced", years: 5, docUrl: "https://react.dev/" },
  { name: "NextJS", src: "/images/models/nextjs.svg", category: "frontend", proficiency: "Advanced", years: 4, docUrl: "https://nextjs.org/" },
  { name: "TailwindCSS", src: "/images/models/tailwindcss.svg", category: "frontend", years: 3, docUrl: "https://tailwindcss.com/docs" },
  { name: "SASS", src: "/images/models/sass.svg", category: "frontend", years: 3, docUrl: "https://sass-lang.com/" },
  { name: "Bootstrap", src: "/images/models/bootstrap.svg", category: "frontend", years: 3, docUrl: "https://getbootstrap.com/" },
  { name: "MaterialUI", src: "/images/models/materialui.svg", category: "frontend", years: 2, docUrl: "https://mui.com/" },
  { name: "TypeScript", src: "/images/models/typescript.svg", category: "frontend", proficiency: "Advanced", years: 5, docUrl: "https://www.typescriptlang.org/" },
  { name: "ReduxJS", src: "/images/models/reduxjs.svg", category: "frontend", years: 4, docUrl: "https://redux.js.org/" },
  { name: "NodeJS", src: "/images/models/nodejs.svg", category: "backend", proficiency: "Advanced", years: 5, docUrl: "https://nodejs.org/" },
  { name: "ExpressJS", src: "/images/models/expressjs.svg", category: "backend", years: 4, docUrl: "https://expressjs.com/" },
  { name: "MongoDB", src: "/images/models/mongodb.svg", category: "database", years: 4, docUrl: "https://www.mongodb.com/" },
  { name: "MySQL", src: "/images/models/mysql.svg", category: "database", years: 3, docUrl: "https://www.mysql.com/" },
  { name: "AWS", src: "/images/models/amazonAWS.svg", category: "cloud", years: 3, docUrl: "https://aws.amazon.com/" },
  { name: "Kali Linux", src: "/images/models/kalilinux.svg", category: "tools", years: 1, docUrl: "https://www.kali.org/" },
];

const Technologies = () => {
  useScrollAnimations();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<TechCategory | "all">("all");
  const iconsRef = useRef<HTMLDivElement[]>([]);

  // Mouse movement for parallax
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

  // GSAP entrance & floating effect
  useEffect(() => {
    iconsRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, rotationY: -20, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          delay: index * 0.08,
        }
      );
      // floating
      gsap.to(el, {
        y: "+=7",
        rotationY: 5,
        repeat: -1,
        yoyo: true,
        duration: 2 + Math.random(),
        ease: "sine.inOut",
        delay: index * 0.1,
      });
    });
  }, []);

  // Memoized filtered data
  const filteredTechnologies = useMemo(() =>
    activeCategory === "all"
      ? technologies
      : technologies.filter(t => t.category === activeCategory),
    [activeCategory]
  );

  // For category counts on badges
  const categoryCounts = useMemo(() => {
    const result = {} as Record<TechCategory, number>;
    technologies.forEach(tech => {
      if (tech.category) {
        result[tech.category] = (result[tech.category] ?? 0) + 1;
      }
    });
    return result;
  }, []);

  // For color glow of active cat
  const getLegendActiveGlow = (cat: typeof categories[number], active: boolean) =>
    active ? `shadow-[0_0_24px_4px_rgba(16,255,128,0.19)] ring-2 ring-green-500/50 scale-[1.08]` : '';

  return (
    <section
      className="relative overflow-hidden py-20 md:py-24 lg:py-32 isolate px-4 sm:px-6 md:px-8 lg:px-8 bg-gradient-to-b from-black via-black to-[#000000]"
      id="technologies"
    >
      {/* CRT Scanline Overlay */}
      <div className="crt-scanlines fixed inset-0 pointer-events-none z-50" />
      
      {/* Enhanced futuristic background with layered gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,65,0.05)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,255,65,0.03)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_0%,_rgba(0,255,65,0.02)_50%,_transparent_100%)]" />
      
      {/* Animated HUD Grid Pattern - Enhanced opacity */}
      <div
        className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{ animation: 'hudGridMove 25s linear infinite' }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:20px_20px]"
        style={{ animation: 'hudGridMoveReverse 18s linear infinite' }}
      />
      
      {/* Animated scanning lines - Smoother effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={`scan-${i}`}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent"
            style={{
              animation: `hudScanLine ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 2.5}s`,
              top: `${(i * 25) % 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Data stream particles - More refined */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-[1px] h-[24px] bg-[#00FF41] opacity-25"
          style={{
            left: `${5 + (i * 6) % 90}%`,
            animation: `hudDataStream ${4 + (i % 3)}s linear infinite`,
            animationDelay: `${i * 0.25}s`,
            boxShadow: `0 0 ${3 + (i % 3)}px #00FF41`,
          }}
        />
      ))}
      
      {/* Floating HUD corner brackets - More prominent */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-[#00FF41]/50 animate-hud-float" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-[#00FF41]/50 animate-hud-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-[#00FF41]/50 animate-hud-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-[#00FF41]/50 animate-hud-float" style={{ animationDelay: '1.5s' }} />
      
      {/* Enhanced glowing orbs for depth */}
      <div
        className="absolute -inset-40 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.18),_transparent_70%)] blur-3xl transition-transform duration-[2000ms] ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.25}px, ${mousePosition.y * 0.2}px)`,
        }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.1),_transparent_70%)] blur-[140px] transition-transform duration-[2000ms] ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.12}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[360px] h-[360px] bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.06),_transparent_70%)] blur-[100px] transition-transform duration-[2000ms] ease-out"
        style={{
          transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.08}px)`,
        }}
      />

      {/* Section title with enhanced HUD styling */}
      <div className="container relative z-10 max-w-7xl mx-auto">
        <div className="relative mb-14 md:mb-16 lg:mb-24">
          {/* Enhanced HUD Panel behind title */}
          <div className="absolute inset-0 -inset-x-4 md:-inset-x-8 bg-gradient-to-br from-black/60 via-black/50 to-black/60 border border-[#00FF41]/35 rounded-xl backdrop-blur-md shadow-[0_0_30px_rgba(0,255,65,0.25),inset_0_0_20px_rgba(0,255,65,0.05)]" />
          <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-[#00FF41] via-[#00FF41]/80 to-[#00FF41] opacity-70" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/50 to-transparent" />
          <div className="relative px-6 md:px-10 py-8 md:py-10">
            <SectionTitle
              title="Technologies"
              paragraph="A comprehensive stack to power modern, scalable applications — from frontend frameworks to cloud infrastructure. Click categories to filter."
              center
              mb="0px"
            />
          </div>
        </div>

        {/* Enhanced Category buttons with modern design */}
        <div className="flex justify-center flex-wrap gap-3 md:gap-4 lg:gap-5 mb-10 sm:mb-14 md:mb-16 select-none relative z-10">
          <button
            className={`
              flex items-center text-sm md:text-[15px] font-mono font-bold px-4 md:px-5 py-2.5 md:py-3
              bg-gradient-to-br from-black/90 to-black/80 border-2 transition-all duration-500 relative overflow-hidden
              group rounded-lg
              ${activeCategory === "all" 
                ? "border-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.9),inset_0_0_15px_rgba(0,255,65,0.1)] text-[#00FF41] scale-105" 
                : "border-[#00FF41]/50 text-[#00FF41]/90 hover:border-[#00FF41] hover:text-[#00FF41]"
              }
              hover:shadow-[0_0_25px_rgba(0,255,65,0.7)] hover:scale-105 active:scale-100
            `}
            aria-pressed={activeCategory === "all"}
            tabIndex={0}
            onClick={() => setActiveCategory("all")}
          >
            <span className="relative z-10 font-mono tracking-wider">[ALL]</span>
            <span className={`relative z-10 ml-3 px-2.5 py-1 rounded-md border text-xs md:text-sm font-mono font-bold transition-all duration-300 ${
              activeCategory === "all" 
                ? "bg-[#00FF41]/25 border-[#00FF41]/60 text-[#00FF41]" 
                : "bg-[#00FF41]/15 border-[#00FF41]/40 text-[#00FF41]/90 group-hover:bg-[#00FF41]/25 group-hover:border-[#00FF41]/60 group-hover:text-[#00FF41]"
            }`}>
              {technologies.length}
            </span>
            {/* Animated gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br from-[#00FF41]/10 via-transparent to-[#00FF41]/5 transition-opacity duration-500 ${
              activeCategory === "all" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`} />
            {/* Scanning line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudButtonScan transition-opacity duration-500" />
          </button>
          {categories.map(cat => (
            <button
              key={cat.label}
              className={`
                flex items-center gap-2 text-xs md:text-sm px-4 md:px-5 py-2.5 md:py-3
                bg-gradient-to-br from-black/90 to-black/80 border-2 font-mono font-semibold tracking-wide
                transition-all duration-500 group relative overflow-hidden rounded-lg
                ${activeCategory === cat.key 
                  ? "border-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.8),inset_0_0_15px_rgba(0,255,65,0.1)] text-[#00FF41] scale-105" 
                  : "border-[#00FF41]/40 text-[#00FF41]/85 hover:border-[#00FF41] hover:text-[#00FF41]"
                }
                hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] hover:scale-105 active:scale-100
              `}
              aria-pressed={activeCategory === cat.key}
              tabIndex={0}
              title={cat.description}
              onClick={() => setActiveCategory(cat.key as TechCategory)}
            >
              <span className="relative z-10 text-lg md:text-xl drop-shadow-lg">{cat.icon}</span>
              <span className="relative z-10 font-mono">{cat.label.toUpperCase()}</span>
              <span className={`relative z-10 px-2 py-1 rounded-md border text-[10px] md:text-xs ml-1.5 font-mono font-bold transition-all duration-300 min-w-[22px] text-center ${
                activeCategory === cat.key 
                  ? "bg-[#00FF41]/25 border-[#00FF41]/60 text-[#00FF41]" 
                  : "bg-[#00FF41]/15 border-[#00FF41]/40 text-[#00FF41]/85 group-hover:bg-[#00FF41]/25 group-hover:border-[#00FF41]/60 group-hover:text-[#00FF41]"
              }`}>
                {categoryCounts[cat.key as TechCategory] || 0}
              </span>
              {/* Animated gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[#00FF41]/10 via-transparent to-[#00FF41]/5 transition-opacity duration-500 ${
                activeCategory === cat.key ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`} />
              {/* Scanning line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudButtonScan transition-opacity duration-500" />
            </button>
          ))}
        </div>

        {/* Enhanced Tech Grid with modern card design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5 md:gap-6 lg:gap-7 place-items-center relative z-10">
          {filteredTechnologies.length === 0 ? (
            <div className="col-span-full text-[#00FF41]/70 text-center py-24 text-base md:text-lg font-mono">
              <div className="bg-gradient-to-br from-black/70 to-black/60 border-2 border-[#00FF41]/40 px-8 py-5 rounded-xl inline-block shadow-[0_0_20px_rgba(0,255,65,0.3)]">
                <span className="text-[#00FF41]">[NO DATA FOUND]</span>
              </div>
            </div>
          ) : (
            filteredTechnologies.map((tech, index) => (
              <div
                key={tech.name}
                ref={(el) => {
                  if (el) {
                    iconsRef.current[index] = el;
                  }
                }}
                onMouseEnter={() => setHoveredTech(index)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`
                  group relative flex flex-col items-center justify-center 
                  p-4 sm:p-5 md:p-6 lg:p-7
                  bg-gradient-to-br from-black/80 via-black/75 to-black/80 
                  border-2 backdrop-blur-md
                  transition-all duration-700 ease-out
                  hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-105 md:hover:scale-110
                  w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-auto
                  rounded-xl overflow-hidden
                  ${hoveredTech === index 
                    ? "z-20 border-[#00FF41] shadow-[0_0_50px_rgba(0,255,65,0.9),inset_0_0_30px_rgba(0,255,65,0.15)] scale-105 md:scale-110" 
                    : "border-[#00FF41]/35 hover:border-[#00FF41]/70 hover:shadow-[0_0_35px_rgba(0,255,65,0.7),inset_0_0_25px_rgba(0,255,65,0.1)]"
                  }
                  hover:bg-gradient-to-br hover:from-black/90 hover:via-black/85 hover:to-black/90
                `}
                title={tech.name + (tech.proficiency ? ` (${tech.proficiency})` : "")}
                aria-label={tech.name + (tech.proficiency ? ` (${tech.proficiency})` : "")}
              >
                {/* Enhanced HUD Corner Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Enhanced scanning line effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudCardScan transition-opacity duration-700 pointer-events-none" />
                
                {/* Enhanced Icon Container with better glow */}
                <div className="relative flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 mb-3 md:mb-4
                  bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.25),_transparent_75%)]
                  transition-all duration-700 rounded-xl
                  group-hover:bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.45),_transparent_75%)]
                ">
                  {/* Enhanced glowing ring */}
                  <div className="absolute inset-0 rounded-xl border-2 border-[#00FF41]/50 opacity-0 group-hover:opacity-100 group-hover:animate-hudIconPulse transition-opacity duration-500" />
                  
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    width={96}
                    height={96}
                    className={`object-contain transition-all duration-700 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 filter ${
                      hoveredTech === index ? 'scale-115 brightness-125 drop-shadow-[0_0_20px_rgba(0,255,65,0.9)]' : 'scale-100'
                    }`}
                    priority={index < 7}
                  />
                  
                  {/* Enhanced Proficiency badge */}
                  {tech.proficiency && (
                    <div className="absolute -top-1.5 -right-1.5 px-2 py-1 bg-gradient-to-br from-black/95 to-black/90 border-2 border-[#00FF41]/70 text-[#00FF41] text-[10px] md:text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(0,255,65,0.6)] z-20 rounded-md">
                      [{tech.proficiency}]
                    </div>
                  )}
                  {/* Enhanced Years badge */}
                  {tech.years && tech.years > 1 && (
                    <div className="absolute -bottom-1.5 -left-1.5 px-2 py-1 bg-gradient-to-br from-black/95 to-black/90 border-2 border-[#00FF41]/70 text-[#00FF41] text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(0,255,65,0.6)] z-20 select-none pointer-events-none rounded-md">
                      {tech.years}Y
                    </div>
                  )}
                </div>
                
                {/* Enhanced Tech name with better typography */}
                <p className={`text-xs sm:text-sm md:text-base font-mono font-semibold text-center 
                  transition-colors duration-500 relative z-10 mt-2 md:mt-3
                  tracking-wider select-none
                  ${hoveredTech === index ? "text-[#00FF41]" : "text-[#00FF41]/90"}
                `}>
                  <span className="drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">{tech.name.toUpperCase()}</span>
                </p>
                
                {/* Enhanced Category indicator bar */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent
                  ${hoveredTech === index ? "opacity-100" : "opacity-0"}
                  group-hover:opacity-100 transition-opacity duration-500
                  shadow-[0_0_10px_rgba(0,255,65,0.6)]
                `} />
                
                {/* Enhanced hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/8 via-transparent to-[#00FF41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            ))
          )}
        </div>

        
       
      </div>
    </section>
  );
};

export default memo(Technologies);
