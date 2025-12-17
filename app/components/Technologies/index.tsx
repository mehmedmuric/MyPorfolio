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
  { name: "Flutter", src: "/images/models/flutter.svg", category: "frontend", years: 2, docUrl: "https://flutter.dev/" },
  { name: "React Native", src: "/images/models/reactnative.svg", category: "frontend", years: 2, docUrl: "https://reactnative.dev/" },
  { name: "TypeScript", src: "/images/models/typescript.svg", category: "frontend", proficiency: "Advanced", years: 5, docUrl: "https://www.typescriptlang.org/" },
  { name: "ReduxJS", src: "/images/models/reduxjs.svg", category: "frontend", years: 4, docUrl: "https://redux.js.org/" },
  { name: "NodeJS", src: "/images/models/nodejs.svg", category: "backend", proficiency: "Advanced", years: 5, docUrl: "https://nodejs.org/" },
  { name: "ExpressJS", src: "/images/models/expressjs.svg", category: "backend", years: 4, docUrl: "https://expressjs.com/" },
  { name: "REST APIs", src: "/images/models/restapi.svg", category: "backend", years: 5, docUrl: "https://restfulapi.net/" },
  { name: "MongoDB", src: "/images/models/mongodb.svg", category: "database", years: 4, docUrl: "https://www.mongodb.com/" },
  { name: "MySQL", src: "/images/models/mysql.svg", category: "database", years: 3, docUrl: "https://www.mysql.com/" },
  { name: "AWS", src: "/images/models/amazonAWS.svg", category: "cloud", years: 3, docUrl: "https://aws.amazon.com/" },
  { name: "Git/GitHub", src: "/images/models/github.svg", category: "tools", years: 5, docUrl: "https://github.com/" },
  { name: "Docker", src: "/images/models/docker.svg", category: "tools", years: 2, docUrl: "https://www.docker.com/" },
  { name: "Prisma", src: "/images/models/prisma.svg", category: "tools", years: 3, docUrl: "https://www.prisma.io/" },
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

  // GSAP entrance animation - smooth and minimal
  useEffect(() => {
    iconsRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          delay: index * 0.05,
        }
      );
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


  return (
    <section
      className="relative overflow-hidden py-16 md:py-20 lg:py-28 isolate px-4 sm:px-6 md:px-8 lg:px-8 bg-gradient-to-b from-[#0a0f0a] via-[#0d1a0f] to-[#0a0f0a]"
      id="technologies"
    >
      {/* Soft green gradient backgrounds */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-green-950/15 pointer-events-none"
      />
      <div
        className="absolute -inset-40 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.08),_transparent_60%)] blur-3xl transition-transform duration-[3000ms] ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.08}px)`,
        }}
      />
      <div
        className="absolute -inset-60 bg-[radial-gradient(circle_at_70%_60%,rgba(5,150,105,0.05),_transparent_70%)] blur-[100px] transition-transform duration-[4000ms] ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.05}px)`,
        }}
      />

      {/* Section title */}
      <div className="container relative z-10">
        <SectionTitle
          title="Technologies"
          paragraph="A comprehensive stack to power modern, scalable applications — from frontend frameworks to cloud infrastructure. Click categories to filter."
          center
          mb="80px"
        />

        {/* Modern Category Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-10 sm:mb-14 select-none">
          <button
            className={`
              modern-filter-btn flex items-center text-sm font-medium px-5 py-2.5 rounded-xl
              backdrop-blur-md border transition-all duration-300
              ${activeCategory === "all" 
                ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]" 
                : "bg-white/5 border-white/10 text-gray-300 hover:border-emerald-400/30 hover:text-emerald-300 hover:bg-emerald-500/5"
              }
            `}
            aria-pressed={activeCategory === "all"}
            tabIndex={0}
            onClick={() => setActiveCategory("all")}
          >
            <span className="font-semibold mr-2">All</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-medium">{technologies.length}</span>
          </button>
          {categories.map(cat => (
            <button
              key={cat.label}
              className={`
                modern-filter-btn flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl
                backdrop-blur-md border transition-all duration-300
                ${activeCategory === cat.key 
                  ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]" 
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-emerald-400/30 hover:text-emerald-300 hover:bg-emerald-500/5"
                }
              `}
              aria-pressed={activeCategory === cat.key}
              tabIndex={0}
              title={cat.description}
              onClick={() => setActiveCategory(cat.key as TechCategory)}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="font-medium">{cat.label}</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-medium">{categoryCounts[cat.key as TechCategory] || 0}</span>
            </button>
          ))}
        </div>

        {/* Modern Glass Tech Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-7 place-items-center">
          {filteredTechnologies.length === 0 ? (
            <div className="col-span-full text-gray-400 text-center py-20 text-lg">
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
                  modern-tech-card group relative flex flex-col items-center justify-center 
                  p-5 sm:p-6 md:p-7 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-auto
                  rounded-2xl backdrop-blur-xl
                  bg-white/5 border border-white/10
                  transition-all duration-300 ease-out cursor-pointer
                  hover:-translate-y-2 hover:border-emerald-400/40 hover:bg-white/8
                  hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]
                  ${hoveredTech === index ? "z-20 scale-105" : ""}
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
                {/* Subtle green glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:via-emerald-500/3 group-hover:to-emerald-500/5 transition-all duration-300 pointer-events-none" />

                {/* Icon Container */}
                <div className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 mb-4
                  rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5
                  border border-emerald-400/20
                  group-hover:border-emerald-400/40 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]
                  transition-all duration-300
                ">
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    width={80}
                    height={80}
                    className={`object-contain transition-all duration-300 w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22
                      filter brightness-110
                      group-hover:scale-110 group-hover:brightness-125
                      ${hoveredTech === index ? 'scale-110' : 'scale-100'}
                    `}
                    priority={index < 7}
                  />
                  
                  {/* Proficiency badge - Modern style */}
                  {tech.proficiency && (
                    <div className="absolute -top-2 -right-2 px-2.5 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                      {tech.proficiency}
                    </div>
                  )}
                  {/* Years badge - Modern style */}
                  {tech.years && tech.years > 1 && (
                    <div className="absolute -bottom-2 -left-2 px-2 py-0.5 rounded-md bg-emerald-950/60 backdrop-blur-sm border border-emerald-500/20 text-emerald-400 text-[9px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                      {tech.years}y
                    </div>
                  )}
                </div>
                
                {/* Tech name */}
                <p className="text-xs sm:text-sm md:text-base font-medium text-center text-gray-200 
                  group-hover:text-emerald-300 transition-colors duration-300 relative z-10
                  ${tech.docUrl ? 'cursor-pointer' : ''}
                ">
                  {tech.name}
                </p>
              </div>
            ))
          )}
        </div>

        
       
      </div>
    </section>
  );
};

export default Technologies;
