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
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_85%)]"
      id="technologies"
    >
      {/* Animated grid, glows & floating bits */}
      <div
        className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),linear-gradient(#00ff99_1px,transparent_1px)] bg-[size:50px_50px] animate-[gridMove_20s_linear_infinite]"
      />
      <div
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),linear-gradient(#00ff99_1px,transparent_1px)] bg-[size:25px_25px]"
        style={{ animation: 'gridMove-reverse 15s linear infinite' }}
      />
      <div
        className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_70%)] blur-3xl animate-pulse-slow transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.22}px, ${mousePosition.y * 0.19}px)`,
        }}
      />
      <div
        className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.05),_transparent_70%)] blur-[120px] transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.17}px)`,
        }}
      />
      <div
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.13}px)`,
        }}
      />
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-green-400 rounded-full opacity-15 animate-float"
          style={{
            left: `${8 + (i * 12) % 84}%`,
            top: `${10 + ((i * 17) % 67)}%`,
            animationDelay: `${i * 0.51}s`,
            animationDuration: `${3.7 + i * 0.52}s`,
            width: `${2 + (i % 2)}px`,
            height: `${2 + (i % 2)}px`,
          }}
        />
      ))}
      {/* Animated scan lines */}
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"
          style={{ animation: 'scanLine 8s linear infinite' }}
        />
      </div>

      {/* Section title */}
      <div className="container relative z-10">
        <SectionTitle
          title="Technologies"
          paragraph="A comprehensive stack to power modern, scalable applications — from frontend frameworks to cloud infrastructure. Click categories to filter."
          center
          mb="80px"
        />

        {/* Category buttons */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8 sm:mb-12 select-none">
          <button
            className={`
              flex items-center text-[14px] font-semibold px-4 py-1.5 md:px-5 md:py-2 rounded-lg
              bg-gradient-to-br from-green-400/30 to-emerald-500/10 border border-green-700/20 text-white/90 shadow-sm
              transition-all duration-200 relative hover:scale-105 hover:shadow-lg
              group overflow-hidden
              ${activeCategory === "all" ? "ring-green-400/80 ring-2 bg-green-400/30" : ""}
            `}
            aria-pressed={activeCategory === "all"}
            tabIndex={0}
            onClick={() => setActiveCategory("all")}
          >
            <span className="font-bold mr-2 text-green-400">All</span>
            <span className="bg-black/60 px-2 rounded-lg text-xs ml-1">{technologies.length}</span>
          </button>
          {categories.map(cat => (
            <button
              key={cat.label}
              className={`
                flex items-center gap-1.5 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg
                bg-gradient-to-br ${cat.color} ${cat.border}
                shadow-md backdrop-blur text-white/90 font-semibold
                transition-all duration-200
                hover:scale-105 focus:scale-105 hover:shadow-lg focus:shadow-lg
                group relative overflow-hidden
                border-2 border-transparent
                ${activeCategory === cat.key ? getLegendActiveGlow(cat, true) : ""}
              `}
              aria-pressed={activeCategory === cat.key}
              tabIndex={0}
              title={cat.description}
              onClick={() => setActiveCategory(cat.key as TechCategory)}
            >
              <span className="text-[1.2em] md:text-xl drop-shadow">{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="bg-black/50 px-1 min-w-6 rounded text-[10px] ml-1 font-bold text-green-300/90 drop-shadow">{categoryCounts[cat.key as TechCategory] || 0}</span>
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-8 place-items-center">
          {filteredTechnologies.length === 0 ? (
            <div className="col-span-full text-white/60 text-center py-20 text-lg">
              <span>No technologies found for this category.</span>
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
                  text-emerald-300/80 font-mono tracking-wide max-w-3xl 
                  group relative flex flex-col items-center justify-center 
                  p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-lg
                  bg-black/60 border border-green-500/20  
                  transition-transform duration-300
                  hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-[1.02] md:hover:scale-105 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-auto
                  shadow-lg ring-0 ring-green-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:ring-2
                  cursor-pointer
                  ${hoveredTech === index ? "z-20 bg-green-800/10 border-green-500/30 scale-105" : ""}
                `}
                tabIndex={0}
                title={`Learn about ${tech.name}`}
                onClick={() => tech.docUrl && window.open(tech.docUrl, "_blank", "noopener")}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    tech.docUrl && window.open(tech.docUrl, "_blank", "noopener");
                  }
                }}
                aria-label={tech.name + (tech.proficiency ? ` (${tech.proficiency})` : "")}
              >
                {/* Icon */}
                <div className="relative flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full
                  bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.70),_transparent_70%)]
                  shadow-[0_0_20px_rgba(0,255,128,0.25)] group-hover:shadow-[0_0_38px_rgba(0,255,128,0.82)]
                  transition-all duration-500"
                >
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    width={80}
                    height={80}
                    className={`object-contain transition-transform duration-500 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ${
                      hoveredTech === index ? 'scale-110 blur-[.5px] saturate-125' : 'scale-100'
                    }`}
                    priority={index < 7}
                  />
                  
                  {/* Proficiency badge */}
                  {tech.proficiency && (
                    <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-green-500/30 border border-green-500/40 text-green-300 text-xs font-bold opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 shadow-md backdrop-blur-[2px]">
                      {tech.proficiency}
                    </div>
                  )}
                  {/* Years badge, only if >1 */}
                  {tech.years && tech.years > 1 && (
                    <div className="absolute -bottom-2 -left-2 px-2 py-0.5 rounded-full bg-neutral-800/80 border border-green-900/40 text-green-400 text-[10px] font-bold opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 shadow-md select-none pointer-events-none">
                      {tech.years}y
                    </div>
                  )}
                </div>
                {/* Tech name, clickable if docUrl exists */}
                <p className="text-xs sm:text-sm md:text-base font-semibold text-center text-white/80 
                  group-hover:text-green-400 group-focus:text-green-400 transition-colors duration-300 relative z-10 mt-2
                  underline-offset-2 decoration-green-400/50 cursor-pointer select-none"
                >
                  {tech.docUrl ? (
                    <span className="underline decoration-dotted">{tech.name}</span>
                  ) : (
                    tech.name
                  )}
                </p>
                {/* Category indicator */}
                <div className={`
                  absolute bottom-2 left-2 right-2 h-1 rounded-full bg-gradient-to-r
                  ${getCategoryColor(tech.category)}
                  ${hoveredTech === index ? "opacity-70" : "opacity-0"}
                  group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300
                `} />
              </div>
            ))
          )}
        </div>

        
       
      </div>
    </section>
  );
};

export default Technologies;
