'use client'

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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
      className="relative overflow-hidden py-16 md:py-20 lg:py-28 isolate px-4 sm:px-6 md:px-8 lg:px-8 bg-[#000000]"
      id="technologies"
    >
      {/* CRT Scanline Overlay */}
      <div className="crt-scanlines fixed inset-0 pointer-events-none z-50" />
      
      {/* Dark futuristic background with subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.03)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_0%,_rgba(0,255,65,0.01)_50%,_transparent_100%)]" />
      
      {/* Animated HUD Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{ animation: 'hudGridMove 25s linear infinite' }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:20px_20px]"
        style={{ animation: 'hudGridMoveReverse 18s linear infinite' }}
      />
      
      {/* Animated scanning lines */}
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
          />
        ))}
      </div>
      
      {/* Data stream particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-[1px] h-[20px] bg-[#00FF41] opacity-20"
          style={{
            left: `${5 + (i * 7.5) % 90}%`,
            animation: `hudDataStream ${4 + (i % 3)}s linear infinite`,
            animationDelay: `${i * 0.3}s`,
            boxShadow: `0 0 ${2 + (i % 3)}px #00FF41`,
          }}
        />
      ))}
      
      {/* Floating HUD corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#00FF41] opacity-40 animate-hud-float" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#00FF41] opacity-40 animate-hud-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#00FF41] opacity-40 animate-hud-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#00FF41] opacity-40 animate-hud-float" style={{ animationDelay: '1.5s' }} />
      
      {/* Glowing orbs for depth */}
      <div
        className="absolute -inset-40 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.15),_transparent_70%)] blur-3xl animate-hud-pulse transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.18}px)`,
        }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.08),_transparent_70%)] blur-[120px] transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * 0.1}px)`,
        }}
      />

      {/* Section title with HUD styling */}
      <div className="container relative z-10">
        <div className="relative mb-12 md:mb-16 lg:mb-20">
          {/* HUD Panel behind title */}
          <div className="absolute inset-0 -inset-x-4 md:-inset-x-8 bg-black/40 border border-[#00FF41]/30 rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,65,0.2)]" />
          <div className="absolute top-0 left-0 w-2 h-full bg-[#00FF41] opacity-60" />
          <div className="relative px-4 md:px-8 py-6 md:py-8">
            <SectionTitle
              title="Technologies"
              paragraph="A comprehensive stack to power modern, scalable applications — from frontend frameworks to cloud infrastructure. Click categories to filter."
              center
              mb="0px"
            />
          </div>
        </div>

        {/* Category buttons - HUD Style */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-3 lg:gap-4 mb-8 sm:mb-12 select-none relative z-10">
          <button
            className={`
              flex items-center text-[13px] md:text-[14px] font-mono font-bold px-3 md:px-4 py-2 md:py-2.5
              bg-black/80 border-2 border-[#00FF41]/50 text-[#00FF41] 
              transition-all duration-300 relative overflow-hidden
              group hover:border-[#00FF41] hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] hover:bg-black/90
              hover:scale-105 active:scale-95
              ${activeCategory === "all" ? "border-[#00FF41] shadow-[0_0_25px_rgba(0,255,65,0.8)] bg-black/90" : ""}
            `}
            aria-pressed={activeCategory === "all"}
            tabIndex={0}
            onClick={() => setActiveCategory("all")}
          >
            <span className="relative z-10 font-mono tracking-wider">[ALL]</span>
            <span className="relative z-10 ml-2 bg-[#00FF41]/20 px-2 py-0.5 rounded border border-[#00FF41]/40 text-[10px] md:text-xs font-mono font-bold text-[#00FF41]">{technologies.length}</span>
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Scanning line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudButtonScan transition-opacity duration-300" />
          </button>
          {categories.map(cat => (
            <button
              key={cat.label}
              className={`
                flex items-center gap-1.5 text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5
                bg-black/80 border-2 border-[#00FF41]/40 text-[#00FF41]/90
                font-mono font-semibold tracking-wide
                transition-all duration-300
                group relative overflow-hidden
                hover:border-[#00FF41] hover:shadow-[0_0_15px_rgba(0,255,65,0.5)] hover:bg-black/90 hover:text-[#00FF41]
                hover:scale-105 active:scale-95
                ${activeCategory === cat.key ? "border-[#00FF41] shadow-[0_0_20px_rgba(0,255,65,0.7)] bg-black/90 text-[#00FF41]" : ""}
              `}
              aria-pressed={activeCategory === cat.key}
              tabIndex={0}
              title={cat.description}
              onClick={() => setActiveCategory(cat.key as TechCategory)}
            >
              <span className="relative z-10 text-[1em] md:text-lg drop-shadow">{cat.icon}</span>
              <span className="relative z-10 font-mono">{cat.label.toUpperCase()}</span>
              <span className="relative z-10 bg-[#00FF41]/20 px-1.5 py-0.5 rounded border border-[#00FF41]/40 text-[9px] md:text-[10px] ml-1 font-mono font-bold text-[#00FF41] min-w-[20px] text-center">{categoryCounts[cat.key as TechCategory] || 0}</span>
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Scanning line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudButtonScan transition-opacity duration-300" />
            </button>
          ))}
        </div>

        {/* Tech Grid - HUD Card Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 lg:gap-6 place-items-center relative z-10">
          {filteredTechnologies.length === 0 ? (
            <div className="col-span-full text-[#00FF41]/60 text-center py-20 text-base md:text-lg font-mono">
              <div className="bg-black/60 border border-[#00FF41]/30 px-6 py-4 rounded-lg inline-block">
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
                  p-3 sm:p-4 md:p-5 lg:p-6
                  bg-black/70 border-2 border-[#00FF41]/30 backdrop-blur-sm
                  transition-all duration-500 ease-out
                  hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-[1.05] md:hover:scale-110
                  w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-auto
                  hover:border-[#00FF41] hover:shadow-[0_0_30px_rgba(0,255,65,0.6),inset_0_0_20px_rgba(0,255,65,0.1)]
                  hover:bg-black/85
                  ${hoveredTech === index ? "z-20 border-[#00FF41] shadow-[0_0_40px_rgba(0,255,65,0.8)] scale-105 md:scale-110" : ""}
                `}
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
                title={tech.name + (tech.proficiency ? ` (${tech.proficiency})` : "")}
                aria-label={tech.name + (tech.proficiency ? ` (${tech.proficiency})` : "")}
              >
                {/* HUD Corner Brackets */}
                <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Scanning line effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudCardScan transition-opacity duration-500 pointer-events-none" />
                
                {/* Icon Container with HUD glow */}
                <div className="relative flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 mb-2 md:mb-3
                  bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.3),_transparent_70%)]
                  transition-all duration-500
                  group-hover:bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.5),_transparent_70%)]
                ">
                  {/* Glowing ring */}
                  <div className="absolute inset-0 rounded-full border border-[#00FF41]/40 opacity-0 group-hover:opacity-100 group-hover:animate-hudIconPulse transition-opacity duration-300" />
                  
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    width={80}
                    height={80}
                    className={`object-contain transition-all duration-500 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 filter ${
                      hoveredTech === index ? 'scale-110 brightness-110 drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]' : 'scale-100'
                    }`}
                    priority={index < 7}
                  />
                  
                  {/* Proficiency badge - HUD style */}
                  {tech.proficiency && (
                    <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-black/90 border border-[#00FF41]/60 text-[#00FF41] text-[9px] md:text-xs font-mono font-bold opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(0,255,65,0.5)] z-20">
                      [{tech.proficiency}]
                    </div>
                  )}
                  {/* Years badge - HUD style */}
                  {tech.years && tech.years > 1 && (
                    <div className="absolute -bottom-1 -left-1 px-1.5 py-0.5 bg-black/90 border border-[#00FF41]/60 text-[#00FF41] text-[9px] font-mono font-bold opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(0,255,65,0.5)] z-20 select-none pointer-events-none">
                      {tech.years}Y
                    </div>
                  )}
                </div>
                
                {/* Tech name - Monospace HUD style */}
                <p className="text-[10px] sm:text-xs md:text-sm font-mono font-semibold text-center text-[#00FF41]/90 
                  group-hover:text-[#00FF41] transition-colors duration-300 relative z-10 mt-1 md:mt-2
                  tracking-wider select-none"
                >
                  <span>{tech.name.toUpperCase()}</span>
                </p>
                
                {/* Category indicator - HUD style bar */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent
                  ${hoveredTech === index ? "opacity-100" : "opacity-0"}
                  group-hover:opacity-100 transition-opacity duration-300
                `} />
                
                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-[#00FF41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))
          )}
        </div>

        
       
      </div>
    </section>
  );
};

export default Technologies;
