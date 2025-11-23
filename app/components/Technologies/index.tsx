'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

type TechCategory = 'frontend' | 'backend' | 'database' | 'cloud' | 'tools';

interface Technology {
  name: string;
  src: string;
  category: TechCategory;
  proficiency?: string;
}

const Technologies = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  useScrollAnimations();

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

  const technologies: Technology[] = [
    { name: "HTML", src: "/images/models/html5.svg", category: "frontend" },
    { name: "CSS", src: "/images/models/css3.svg", category: "frontend" },
    { name: "JavaScript", src: "/images/models/javascript.svg", category: "frontend", proficiency: "Advanced" },
    { name: "React", src: "/images/models/react.svg", category: "frontend", proficiency: "Advanced" },
    { name: "NextJS", src: "/images/models/nextjs.svg", category: "frontend", proficiency: "Advanced" },
    { name: "TailwindCSS", src: "/images/models/tailwindcss.svg", category: "frontend" },
    { name: "SASS", src: "/images/models/sass.svg", category: "frontend" },
    { name: "Bootstrap", src: "/images/models/bootstrap.svg", category: "frontend" },
    { name: "MaterialUI", src: "/images/models/materialui.svg", category: "frontend" },
    { name: "TypeScript", src: "/images/models/typescript.svg", category: "frontend", proficiency: "Advanced" },
    { name: "ReduxJS", src: "/images/models/reduxjs.svg", category: "frontend" },
    { name: "NodeJS", src: "/images/models/nodejs.svg", category: "backend", proficiency: "Advanced" },
    { name: "ExpressJS", src: "/images/models/expressjs.svg", category: "backend" },
    { name: "MongoDB", src: "/images/models/mongodb.svg", category: "database" },
    { name: "MySQL", src: "/images/models/mysql.svg", category: "database" },
    { name: "AWS", src: "/images/models/amazonAWS.svg", category: "cloud" },
    { name: "Kali Linux", src: "/images/models/kalilinux.svg", category: "tools" },
  ];

  const getCategoryColor = (category: TechCategory) => {
    const colors = {
      frontend: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      backend: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
      database: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      cloud: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30',
      tools: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
    };
    return colors[category] || colors.frontend;
  };

  return (
    <section
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8
        bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_85%)]"
      id="technologies"
    >
      {/* Animated cyber grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)]
          bg-[size:50px_50px] animate-[gridMove_20s_linear_infinite]"
      />

      {/* Secondary grid layer for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:25px_25px]"
        style={{
          animation: 'gridMove-reverse 15s linear infinite'
        }}
      />

      {/* Neon radial glows with parallax */}
      <div 
        className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.1),_transparent_70%)] blur-3xl animate-pulse-slow transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        }}
      />
      <div 
        className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.05),_transparent_70%)] blur-[120px] transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
        }}
      />

      {/* Additional accent glow */}
      <div 
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20 animate-float"
          style={{
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${4 + i * 0.4}s`,
            width: `${2 + (i % 2)}px`,
            height: `${2 + (i % 2)}px`,
          }}
        />
      ))}

      {/* Animated scan lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"
          style={{
            animation: 'scanLine 8s linear infinite'
          }}
        />
      </div>

      <div className="container relative z-10">
        <SectionTitle
          title="Technologies"
          paragraph="Comprehensive tech stack I use for building modern, scalable applications — from frontend frameworks to cloud infrastructure."
          center
          mb="80px"
        />

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 place-items-center">
          {technologies.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
              className="group relative flex flex-col items-center justify-center p-6 rounded-2xl backdrop-blur-md
                bg-gradient-to-br from-black/70 via-black/60 to-black/70
                border border-green-500/20
                transition-all duration-500
                hover:-translate-y-3 hover:scale-110
                w-full max-w-[140px] sm:max-w-[160px]
                shadow-[0_0_25px_rgba(0,255,128,0.1)]
                hover:shadow-[0_0_50px_rgba(0,255,128,0.4)]
                hover:border-green-500/60
                before:absolute before:inset-0 before:rounded-2xl
                before:bg-gradient-to-br before:from-green-500/0 before:via-green-500/5 before:to-green-500/0
                before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500
                overflow-hidden"
              data-animate="scale-in-center"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-green-500/20 rounded-tl-2xl group-hover:border-green-500/60 transition-colors duration-500" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-500/20 rounded-br-2xl group-hover:border-green-500/60 transition-colors duration-500" />

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-green-500/0 group-hover:bg-green-500/10 blur-xl transition-all duration-500 -z-10" />

              {/* Icon container */}
              <div className="relative z-10 flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 mb-4
                rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5
                border border-green-500/30
                group-hover:border-green-500/60
                group-hover:scale-110 group-hover:rotate-6
                transition-all duration-500
                shadow-[0_0_25px_rgba(0,255,128,0.2)]
                group-hover:shadow-[0_0_40px_rgba(0,255,128,0.6)]"
              >
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={80}
                  height={80}
                  className={`object-contain transition-transform duration-500 ${
                    hoveredTech === index ? 'scale-110' : 'scale-100'
                  }`}
                  priority={index < 6}
                />
                
                {/* Proficiency badge */}
                {tech.proficiency && (
                  <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {tech.proficiency}
                  </div>
                )}
              </div>

              {/* Tech name */}
              <p className="text-sm sm:text-base font-semibold text-center text-white/80 
                group-hover:text-green-400 transition-colors duration-300 relative z-10">
                {tech.name}
              </p>

              {/* Category indicator */}
              <div className={`absolute bottom-2 left-2 right-2 h-1 rounded-full bg-gradient-to-r ${getCategoryColor(tech.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Category Legend */}
        <div className="mt-16 flex items-center justify-center w-full">
          <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl px-8 py-6 shadow-xl flex flex-col sm:flex-row gap-8 sm:gap-16">
            {[
              { label: 'Frontend', color: 'from-blue-400/70 to-blue-500/30', border: 'border-blue-500/30', icon: '🖥️' },
              { label: 'Backend', color: 'from-purple-400/70 to-purple-500/20', border: 'border-purple-500/30', icon: '🔧' },
              { label: 'Database', color: 'from-green-400/70 to-green-500/20', border: 'border-green-500/30', icon: '🗄️' },
              { label: 'Cloud', color: 'from-orange-300/70 to-orange-500/20', border: 'border-orange-500/30', icon: '☁️' },
              { label: 'Tools', color: 'from-gray-400/60 to-gray-500/10', border: 'border-gray-500/30', icon: '⚙️' },
            ].map((cat, idx) => (
              <div
                key={cat.label}
                className={`
                  flex items-center gap-3 px-4 py-2 border rounded-lg
                  bg-gradient-to-br ${cat.color} ${cat.border}
                  shadow-md
                  backdrop-blur
                  text-sm font-semibold
                  text-white/90
                  relative overflow-hidden
                  hover:scale-105 hover:shadow-lg
                  transition-all duration-300
                `}
                style={{ animationDelay: `${(technologies.length + idx) * 0.05}s` }}
                data-animate="fade-in-up"
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;