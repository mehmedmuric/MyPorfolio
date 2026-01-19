'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useCallback, useState, memo, useRef } from "react";

// ---------- DATA ----------
type Technology = {
  name: string;
  src: string | null;
};

const techStack: Technology[] = [
  { name: "JavaScript", src: "/images/models/javascript.svg" },
  { name: "React", src: "/images/models/react.svg" },
  { name: "Next.js", src: "/images/models/nextjs.svg" },
  { name: "TypeScript", src: "/images/models/typescript.svg" },
  { name: "Node.js", src: "/images/models/nodejs.svg" },
  { name: "MongoDB", src: "/images/models/mongodb.svg" },
  { name: "TailwindCSS", src: "/images/models/tailwindcss.svg" },
];

const fallbackIcon = (
  <span className="w-5 h-5 inline-flex items-center justify-center text-[#00FF41] font-bold">?</span>
);

const STATS = [
  { value: "4+", label: "Years", icon: <svg className="w-5 h-5 text-[#00FF41]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M8 17l4 4 4-4M12 3v12" /></svg> },
  { value: "30+", label: "Projects", icon: <svg className="w-5 h-5 text-[#00FF41]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { value: "10+", label: "Stacks", icon: <svg className="w-5 h-5 text-[#00FF41]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M14 10V3.5a1.5 1.5 0 10-3 0V10m7 4a5 5 0 11-10 0 5 5 0 0110 0z" /></svg> },
];

const socialLinks = [
  { href: "https://github.com/mehmedmuric", aria: "GitHub", icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  { href: "https://linkedin.com/in/mehmed-muric-185297232", aria: "LinkedIn", icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];

// Data stream characters for cyberpunk effect
const DATA_STREAM_CHARS = ['0', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0', '1', '1', '0'];

const PARTICLE_POSITIONS = [
  { left: "15%", top: "16%" },
  { left: "69%", top: "29%" },
  { left: "23%", top: "42%" },
  { left: "46%", top: "55%" },
  { left: "77%", top: "68%" }
];

// ---------- MODERN MEMO COMPONENTS ----------
const TechBadge = memo<{ tech: Technology }>(({ tech }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-3 xs:px-3.5 sm:px-4 md:px-4.5 lg:px-5 py-2 xs:py-2.5 sm:py-3 md:py-3.5 
        backdrop-blur-md bg-gradient-to-br from-[#00FF41]/10 via-[#0a1a0f]/90 to-[#0a1a0f]/80 
        border border-[#00FF41]/40 text-[#00FF41] text-xs sm:text-sm md:text-base 2xl:text-lg font-mono 
        rounded-lg transition-all duration-500 ease-out group overflow-hidden
        hover:border-[#00FF41] hover:from-[#00FF41]/20 hover:via-[#00FF41]/15 hover:to-[#0a1a0f]/90
        hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,65,0.6),0_0_60px_rgba(0,255,65,0.3),inset_0_0_20px_rgba(0,255,65,0.1)]
        active:scale-95"
      style={{
        boxShadow: isHovered 
          ? '0 0 30px rgba(0,255,65,0.6), 0 0 60px rgba(0,255,65,0.3), inset 0 0 20px rgba(0,255,65,0.1)' 
          : '0 0 15px rgba(0,255,65,0.3), inset 0 0 10px rgba(0,255,65,0.05)',
        transform: isHovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Animated gradient sweep */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent 
        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
      
      {/* Top and bottom edge glows */}
      <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/80 to-transparent 
        scale-x-0 group-hover:scale-x-100 transition-transform duration-500" 
        style={{ boxShadow: '0 0 8px rgba(0,255,65,0.8)' }}></span>
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/80 to-transparent 
        scale-x-0 group-hover:scale-x-100 transition-transform duration-500" 
        style={{ boxShadow: '0 0 8px rgba(0,255,65,0.8)' }}></span>
      
      {/* Content */}
      {tech.src ? (
        <Image 
          src={tech.src} 
          alt={tech.name} 
          width={20} 
          height={20} 
          loading="lazy" 
          className="relative z-10 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
          style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,65,0.6))' }} 
        />
      ) : fallbackIcon}
      <span className="relative z-10 transition-all duration-300" style={{ textShadow: '0 0 8px rgba(0,255,65,0.5)' }}>
        {tech.name}
      </span>
    </span>
  );
});
TechBadge.displayName = "TechBadge";

const StatCard = memo<{ stat: typeof STATS[0] }>(({ stat }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center p-3 sm:p-3.5 md:p-4 lg:p-5 w-full max-w-[90px] xs:max-w-[100px] sm:max-w-[110px] md:max-w-[120px] lg:max-w-[130px] xl:max-w-[140px] 2xl:max-w-[160px] 
        backdrop-blur-md bg-gradient-to-br from-[#00FF41]/8 via-[#0a1a0f]/70 to-[#0a1a0f]/60 
        border border-[#00FF41]/30 rounded-xl transition-all duration-500 ease-out group
        hover:border-[#00FF41] hover:from-[#00FF41]/15 hover:via-[#00FF41]/10 hover:to-[#0a1a0f]/70
        hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,65,0.5),0_0_70px_rgba(0,255,65,0.3),inset_0_0_20px_rgba(0,255,65,0.1)]
        active:scale-95"
      style={{
        boxShadow: isHovered 
          ? '0 0 40px rgba(0,255,65,0.5), 0 0 70px rgba(0,255,65,0.3), inset 0 0 20px rgba(0,255,65,0.1)' 
          : '0 0 20px rgba(0,255,65,0.25), inset 0 0 10px rgba(0,255,65,0.05)',
        transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00FF41]/5 to-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl"></div>
      
      {/* Icon container with enhanced glow */}
      <div className="relative rounded-full backdrop-blur-sm bg-gradient-to-br from-[#0a1a0f]/90 to-[#0a1a0f]/70 border-2 border-[#00FF41]/50 
        flex items-center justify-center mb-3 sm:mb-3.5 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 
        transition-all duration-500 group-hover:border-[#00FF41] group-hover:rotate-6 group-hover:scale-110" 
        style={{ 
          boxShadow: isHovered 
            ? '0 0 30px rgba(0,255,65,0.8), 0 0 50px rgba(0,255,65,0.4), inset 0 0 15px rgba(0,255,65,0.2)' 
            : '0 0 15px rgba(0,255,65,0.4), inset 0 0 8px rgba(0,255,65,0.1)' 
        }}
      >
        {stat.icon}
      </div>
      
      {/* Value with enhanced glow */}
      <div className="relative text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#00FF41] font-mono 
        transition-all duration-300 group-hover:scale-110" 
        style={{ 
          textShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.4), 0 0 45px rgba(0,255,65,0.2)' 
        }}
      >
        {stat.value}
      </div>
      
      {/* Label */}
      <div className="relative text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base 2xl:text-lg text-[#00FF41]/80 font-mono uppercase tracking-wider mt-1 
        transition-all duration-300 group-hover:text-[#00FF41]" 
        style={{ textShadow: '0 0 8px rgba(0,255,65,0.4)' }}
      >
        {stat.label}
      </div>
    </div>
  );
});
StatCard.displayName = "StatCard";

// Modern CRT Scanline Effect with improved performance
const CRTScanlines = memo(() => (
  <>
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.06] mix-blend-screen" style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        #00FF41 2px,
        #00FF41 4px
      )`,
    }} aria-hidden="true" />
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0,255,65,0.3) 3px,
        rgba(0,255,65,0.3) 6px
      )`,
    }} aria-hidden="true" />
    <div className="fixed inset-0 pointer-events-none z-50 opacity-40" style={{
      background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)`,
    }} aria-hidden="true" />
  </>
));
CRTScanlines.displayName = "CRTScanlines";

// Modern HUD Grid with improved animations
const HUDGrid = memo(() => (
  <div className="absolute inset-0 pointer-events-none z-10 opacity-20" aria-hidden="true">
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id="hero-hud-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FF41" strokeWidth="0.5" opacity="0.5"/>
        </pattern>
        <pattern id="hero-hud-grid-small" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#00FF41" strokeWidth="0.3" opacity="0.3"/>
        </pattern>
        <linearGradient id="grid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF41" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00FF41" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00FF41" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-hud-grid)" filter="url(#glow)" />
      <rect width="100%" height="100%" fill="url(#hero-hud-grid-small)" />
      <rect width="100%" height="100%" fill="url(#grid-glow)" />
    </svg>
  </div>
));
HUDGrid.displayName = "HUDGrid";

// Modern HUD Status Indicator
const HUDStatusIndicator = memo(() => (
  <div className="absolute top-[7rem] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-6 md:right-6 lg:top-8 lg:right-8 2xl:top-10 2xl:right-10 
    pointer-events-none z-[51] md:z-30" aria-hidden="true">
    <div className="relative backdrop-blur-md bg-gradient-to-br from-[#00FF41]/10 via-[#0a1a0f]/90 to-[#0a1a0f]/80 
      border border-[#00FF41]/50 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 rounded-lg 
      shadow-[0_0_25px_rgba(0,255,65,0.5),inset_0_0_15px_rgba(0,255,65,0.1)] 
      hover:shadow-[0_0_40px_rgba(0,255,65,0.7),inset_0_0_20px_rgba(0,255,65,0.15)] transition-all duration-500" 
      style={{ 
        boxShadow: '0 0 25px rgba(0,255,65,0.5), inset 0 0 15px rgba(0,255,65,0.1), 0 0 0 1px rgba(0,255,65,0.2)' 
      }}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="relative w-2.5 h-2.5 sm:w-3 sm:h-3">
          <div className="absolute inset-0 bg-[#00FF41] rounded-full animate-pulse" style={{ 
            boxShadow: '0 0 15px #00FF41, 0 0 30px rgba(0,255,65,0.6)' 
          }}></div>
          <div className="absolute inset-0 bg-[#00FF41] rounded-full opacity-50 animate-ping" style={{
            animationDuration: '2s'
          }}></div>
        </div>
        <span className="text-[#00FF41] text-sm sm:text-base md:text-lg font-mono uppercase tracking-wider font-bold" style={{
          textShadow: '0 0 10px rgba(0,255,65,0.7), 0 0 20px rgba(0,255,65,0.4)'
        }}>ONLINE</span>
      </div>
      {/* Corner brackets */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => {
        const positions = {
          'top-left': 'top-0 left-0 border-t border-l',
          'top-right': 'top-0 right-0 border-t border-r',
          'bottom-left': 'bottom-0 left-0 border-b border-l',
          'bottom-right': 'bottom-0 right-0 border-b border-r'
        };
        return (
          <div 
            key={pos}
            className={`absolute -${pos.includes('left') ? 'left' : 'right'}-1 -${pos.includes('top') ? 'top' : 'bottom'}-1 
              w-3 h-3 sm:w-4 sm:h-4 border-[#00FF41] ${positions[pos as keyof typeof positions]}`} 
            style={{ boxShadow: '0 0 8px rgba(0,255,65,0.6)' }}
          ></div>
        );
      })}
    </div>
  </div>
));
HUDStatusIndicator.displayName = "HUDStatusIndicator";

// Modern Animated Corner Lines
const AnimatedCornerLines = memo<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }>(({ position }) => {
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };
  
  const lineStyles = {
    'top-left': 'w-20 sm:w-28 md:w-36 lg:w-44 2xl:w-52 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/70 to-transparent',
    'top-right': 'w-20 sm:w-28 md:w-36 lg:w-44 2xl:w-52 h-[2px] bg-gradient-to-l from-[#00FF41] via-[#00FF41]/70 to-transparent',
    'bottom-left': 'w-20 sm:w-28 md:w-36 lg:w-44 2xl:w-52 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/70 to-transparent',
    'bottom-right': 'w-20 sm:w-28 md:w-36 lg:w-44 2xl:w-52 h-[2px] bg-gradient-to-l from-[#00FF41] via-[#00FF41]/70 to-transparent'
  };
  
  const verticalStyles = {
    'top-left': 'h-20 sm:h-28 md:h-36 lg:h-44 2xl:h-52 w-[2px] bg-gradient-to-b from-[#00FF41] via-[#00FF41]/70 to-transparent',
    'top-right': 'h-20 sm:h-28 md:h-36 lg:h-44 2xl:h-52 w-[2px] bg-gradient-to-b from-[#00FF41] via-[#00FF41]/70 to-transparent',
    'bottom-left': 'h-20 sm:h-28 md:h-36 lg:h-44 2xl:h-52 w-[2px] bg-gradient-to-t from-[#00FF41] via-[#00FF41]/70 to-transparent',
    'bottom-right': 'h-20 sm:h-28 md:h-36 lg:h-44 2xl:h-52 w-[2px] bg-gradient-to-t from-[#00FF41] via-[#00FF41]/70 to-transparent'
  };
  
  return (
    <div className={`absolute ${positions[position]} pointer-events-none z-20`} aria-hidden="true">
      <div className={`${lineStyles[position]} animate-pulse transition-all duration-500`} style={{ 
        boxShadow: '0 0 20px #00FF41, 0 0 40px rgba(0,255,65,0.6)' 
      }}></div>
      <div className={`${verticalStyles[position]} mt-[-2px] animate-pulse transition-all duration-500`} style={{ 
        boxShadow: '0 0 20px #00FF41, 0 0 40px rgba(0,255,65,0.6)', 
        animationDelay: '0.5s' 
      }}></div>
    </div>
  );
});
AnimatedCornerLines.displayName = "AnimatedCornerLines";

// Modern Floating Data Stream
const DataStream = memo<{ delay: number; left: string; speed?: number }>(({ delay, left, speed = 8 }) => {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    const stream = Array.from({ length: 25 }, () => 
      DATA_STREAM_CHARS[Math.floor(Math.random() * DATA_STREAM_CHARS.length)]
    );
    setChars(stream);
    
    const interval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev];
        newChars.shift();
        newChars.push(DATA_STREAM_CHARS[Math.floor(Math.random() * DATA_STREAM_CHARS.length)]);
        return newChars;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className="absolute text-[#00FF41]/50 font-mono text-[10px] xs:text-xs sm:text-sm tracking-[0.25em] pointer-events-none select-none"
      style={{ 
        left, 
        top: '-10%',
        animation: `dataStream ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
        textShadow: '0 0 8px rgba(0,255,65,0.6), 0 0 15px rgba(0,255,65,0.3)',
        filter: 'blur(0.5px)'
      }}
      aria-hidden="true"
    >
      {chars.map((char, i) => (
        <span 
          key={i} 
          style={{ 
            opacity: i < 3 ? 0.2 : i > chars.length - 4 ? 0.2 : 0.7,
            textShadow: i % 2 === 0 ? '0 0 5px rgba(0,255,65,0.9)' : 'none'
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
});
DataStream.displayName = "DataStream";

const DecorativeCircles = memo(() => (
  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-[450px] sm:w-[700px] sm:h-[600px] md:w-[900px] md:h-[800px] opacity-15 sm:opacity-20 md:opacity-25 pointer-events-none z-0">
    <svg width="100%" height="100%" viewBox="0 0 900 800" fill="none">
      <circle cx="450" cy="400" r="280" fill="rgba(0,255,65,0.1)" />
      <circle cx="700" cy="180" r="120" fill="rgba(0,255,65,0.08)" />
      <circle cx="150" cy="580" r="90" fill="rgba(0,255,65,0.06)" />
    </svg>
  </div>
));
DecorativeCircles.displayName = "DecorativeCircles";

// ---------- MODERN HERO COMPONENT ----------
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (window.innerWidth > 768 && heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 72;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 72;
      setMousePosition({ x, y });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative z-10 min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-[#000000] via-[#050a08] to-[#000000] 
        pt-24 sm:pt-28 md:pt-24 lg:pt-28 pb-6 sm:pb-8 md:pb-16 lg:pb-20 overflow-hidden"
    >
      {/* Modern CRT Scanline Effect */}
      <CRTScanlines />
      
      {/* Modern HUD Grid Overlay */}
      <HUDGrid />
      
      {/* Modern Animated Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-60 animate-scanLine" style={{
          animation: 'scanLine 4s linear infinite',
          boxShadow: '0 0 20px #00FF41, 0 0 40px #00FF41, 0 0 60px rgba(0,255,65,0.4)',
          filter: 'blur(0.5px)'
        }}></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/50 to-transparent opacity-50 animate-scanLine" style={{
          animation: 'scanLine 6s linear infinite',
          animationDelay: '2s',
          boxShadow: '0 0 12px #00FF41, 0 0 24px rgba(0,255,65,0.5)'
        }}></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/30 to-transparent opacity-40 animate-scanLine" style={{
          animation: 'scanLine 8s linear infinite',
          animationDelay: '4s',
          boxShadow: '0 0 8px rgba(0,255,65,0.4)'
        }}></div>
      </div>
      
      {/* Enhanced Floating Data Streams */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <DataStream 
          key={i} 
          delay={i * 0.8} 
          left={`${8 + i * 12}%`}
          speed={7 + (i % 3) * 2}
        />
      ))}
      
      {/* Modern Glitch overlay effect */}
      <div className="absolute inset-0 pointer-events-none z-40 opacity-0 hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/8 to-transparent animate-glitch"></div>
      </div>
      
      <DecorativeCircles />
      
      {/* Modern Parallax Background Glows with improved performance */}
      <div 
        className="absolute left-[5%] top-[14%] w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 
          bg-[radial-gradient(circle,rgba(0,255,65,0.2)_0%,transparent_75%)] rounded-full 
          pointer-events-none blur-3xl z-10 will-change-transform opacity-60 sm:opacity-80 md:opacity-100 
          transition-transform duration-700 ease-out" 
        style={{ transform: `translate3d(${mousePosition.x * 0.45}px,${mousePosition.y * 0.41}px,0)` }} 
        aria-hidden 
      />
      <div 
        className="absolute right-[10%] bottom-[5%] w-[220px] h-[140px] sm:w-[320px] sm:h-[200px] md:w-[420px] md:h-[260px] 
          bg-[radial-gradient(circle,rgba(0,255,65,0.15)_0%,transparent_80%)] rounded-full 
          pointer-events-none blur-3xl z-10 will-change-transform opacity-60 sm:opacity-80 md:opacity-100 
          transition-transform duration-700 ease-out" 
        style={{ transform: `translate3d(${mousePosition.x * 0.19}px,${mousePosition.y * 0.08}px,0)` }} 
        aria-hidden 
      />
      
      {/* Modern HUD Corner Brackets */}
      <AnimatedCornerLines position="top-left" />
      <AnimatedCornerLines position="top-right" />
      <AnimatedCornerLines position="bottom-left" />
      <AnimatedCornerLines position="bottom-right" />
      
      {/* Modern HUD Status Indicator */}
      <HUDStatusIndicator />
      
      {/* Main Content Container */}
      <div className="relative z-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 mx-auto select-none mt-8 sm:mt-12 md:mt-16 lg:mt-24 max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1920px] w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 2xl:gap-18">
          
          {/* LEFT: CONTENT SECTION */}
          <div className="w-full md:w-[45%] lg:w-[47%] xl:w-[48%] 2xl:w-[50%] max-w-xl lg:max-w-2xl 2xl:max-w-3xl flex flex-col items-center md:items-start text-center md:text-left relative group px-2 sm:px-0">
            {/* Modern Glassmorphism Panel Frame */}
            <div className="absolute -inset-3 sm:-inset-4 md:-inset-6 lg:-inset-8 backdrop-blur-xl bg-gradient-to-br from-[#00FF41]/5 via-transparent to-[#00FF41]/5 border border-[#00FF41]/20 rounded-xl pointer-events-none z-0 animate-pulse transition-all duration-1000 group-hover:border-[#00FF41]/40" style={{
              boxShadow: 'inset 0 0 40px rgba(0,255,65,0.1), 0 0 60px rgba(0,255,65,0.15), 0 0 100px rgba(0,255,65,0.08)'
            }} aria-hidden="true"></div>
            
            {/* Outer glow layer */}
            <div className="absolute -inset-5 sm:-inset-6 md:-inset-10 lg:-inset-12 border border-[#00FF41]/8 rounded-xl pointer-events-none z-0 group-hover:border-[#00FF41]/15 transition-all duration-700" style={{
              boxShadow: '0 0 60px rgba(0,255,65,0.1)'
            }} aria-hidden="true"></div>
            
            {/* Modern corner brackets with enhanced glow */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => {
              const positions = {
                'top-left': '-top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-5 md:-left-5 lg:-top-6 lg:-left-6 border-t-2 border-l-2',
                'top-right': '-top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-5 md:-right-5 lg:-top-6 lg:-right-6 border-t-2 border-r-2',
                'bottom-left': '-bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-5 md:-left-5 lg:-bottom-6 lg:-left-6 border-b-2 border-l-2',
                'bottom-right': '-bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-5 md:-right-5 lg:-bottom-6 lg:-right-6 border-b-2 border-r-2'
              };
              return (
                <div 
                  key={pos}
                  className={`absolute ${positions[pos as keyof typeof positions]} border-[#00FF41] pointer-events-none z-0 animate-pulse transition-all duration-500`} 
                  style={{ 
                    boxShadow: '0 0 20px rgba(0,255,65,0.7), 0 0 40px rgba(0,255,65,0.4), inset 0 0 15px rgba(0,255,65,0.2)' 
                  }} 
                  aria-hidden="true"
                ></div>
              );
            })}
            
            {/* Modern holographic shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0 rounded-xl" style={{
              transform: 'translateX(-100%)',
              animation: 'shimmer 3s ease-in-out infinite'
            }} aria-hidden="true"></div>
            
            <div className="relative z-10 w-full">
              {/* Modern Hero Title */}
              <h1 className="font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-[#00FF41] leading-[1.1] mb-4 sm:mb-5 md:mb-6 tracking-tight flex flex-col items-center md:items-start font-mono relative w-full group/title animate-hero-title" style={{
                textShadow: '0 0 20px rgba(0,255,65,0.7), 0 0 40px rgba(0,255,65,0.5), 0 0 60px rgba(0,255,65,0.3), 0 0 80px rgba(0,255,65,0.2)',
                filter: 'drop-shadow(0 0 8px rgba(0,255,65,0.6))'
              }}>
                <span className="relative inline-block w-full text-center md:text-left">
                  <span className="absolute -left-3 xs:-left-4 sm:-left-5 md:-left-6 lg:-left-7 top-1/2 -translate-y-1/2 text-[#00FF41]/40 font-mono text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl hidden sm:block transition-all duration-300 group-hover/title:text-[#00FF41]/60">[</span>
                  Mehmed <span className="text-[#00FF41] relative inline-block transition-all duration-300 group-hover/title:scale-105">
                    <span className="relative z-10">Muric</span>
                  </span>
                  <span className="absolute -right-3 xs:-right-4 sm:-right-5 md:-right-6 lg:-right-7 top-1/2 -translate-y-1/2 text-[#00FF41]/40 font-mono text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl hidden sm:block transition-all duration-300 group-hover/title:text-[#00FF41]/60">]</span>
                </span>
                <span className="mt-3 sm:mt-3.5 md:mt-4 h-[2px] sm:h-[3px] w-16 xs:w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-90 relative overflow-hidden mx-auto md:mx-0">
                  <span className="absolute inset-0 bg-[#00FF41] animate-pulse" style={{ boxShadow: '0 0 15px #00FF41, 0 0 30px #00FF41' }}></span>
                  <span className="absolute inset-0 bg-[#00FF41] animate-ping opacity-30"></span>
                </span>
              </h1>

              {/* Modern Subtitle */}
              <h2 className="mt-4 sm:mt-4.5 md:mt-5 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-[#00FF41]/90 flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5 md:gap-3 font-mono w-full animate-hero-subtitle" style={{
                textShadow: '0 0 12px rgba(0,255,65,0.5), 0 0 24px rgba(0,255,65,0.3)'
              }}>
                <span className="relative">
                  <span className="absolute -left-2 xs:-left-2.5 sm:-left-3 md:-left-3.5 text-[#00FF41]/60 text-xs xs:text-sm sm:text-base">&gt;</span>
                  Full-Stack Developer
                </span>
                <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#00FF41] transition-transform duration-300 hover:scale-110" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 4px #00FF41)' }}>
                  <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden xs:inline relative">
                  <span className="absolute -left-2 xs:-left-2.5 sm:-left-3 md:-left-3.5 text-[#00FF41]/60 text-xs xs:text-sm sm:text-base">&gt;</span>
                  Software Engineer
                </span>
              </h2>

              {/* Modern Description */}
              <p className="mt-4 sm:mt-5 md:mt-6 mb-5 sm:mb-6 md:mb-7 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-[#00FF41]/85 font-normal max-w-full md:max-w-md lg:max-w-lg 2xl:max-w-xl leading-relaxed mx-auto md:mx-0 px-2 sm:px-2 md:px-0 font-mono animate-hero-desc" style={{
                textShadow: '0 0 8px rgba(0,255,65,0.4)'
              }}>
                I build robust, scalable web & mobile apps focused on speed, polish, and maintainability. Let's craft solutions that last.
              </p>

              {/* Modern Tech Badges */}
              <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3 md:gap-3.5 mb-5 sm:mb-6 md:mb-7 justify-center md:justify-start w-full px-1 xs:px-2 sm:px-2 md:px-0 animate-hero-badges">
                {techStack.map(tech => <TechBadge tech={tech} key={tech.name} />)}
              </div>

              {/* Modern CTA Buttons */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 xs:gap-4.5 sm:gap-5 md:gap-6 lg:gap-7 my-4 sm:my-5 md:my-6 px-2 sm:px-0 animate-hero-cta">
                <a 
                  href="/MojCV.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative inline-flex items-center justify-center px-6 xs:px-7 sm:px-8 md:px-9 lg:px-10 2xl:px-12 py-3 xs:py-3.5 sm:py-4 md:py-4.5 lg:py-5 2xl:py-6 
                    backdrop-blur-md bg-gradient-to-br from-[#00FF41]/15 via-[#0a1a0f]/90 to-[#0a1a0f]/80 
                    border-2 border-[#00FF41] text-[#00FF41] font-bold tracking-wide font-mono uppercase 
                    text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl 
                    shadow-[0_0_30px_rgba(0,255,65,0.6),inset_0_0_20px_rgba(0,255,65,0.1)] 
                    hover:shadow-[0_0_50px_rgba(0,255,65,0.9),0_0_80px_rgba(0,255,65,0.5),inset_0_0_25px_rgba(0,255,65,0.15)] 
                    hover:bg-gradient-to-br hover:from-[#00FF41]/25 hover:via-[#00FF41]/20 hover:to-[#0a1a0f]/90
                    hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 
                    transition-all duration-500 ease-out group overflow-hidden w-full sm:w-auto rounded-lg" 
                  style={{
                    boxShadow: '0 0 30px rgba(0,255,65,0.6), inset 0 0 20px rgba(0,255,65,0.1), 0 0 0 1px rgba(0,255,65,0.3)'
                  }}
                >
                  <span className="absolute inset-0 bg-[#00FF41]/15 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 flex items-center gap-2 xs:gap-2.5" style={{
                    textShadow: '0 0 8px rgba(0,255,65,0.6)'
                  }}>
                    <span>&gt;</span>
                    <span>View CV</span>
                    <span>&lt;</span>
                  </span>
                </a>

                <Link 
                  href="https://github.com/mehmedmuric" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative inline-flex items-center justify-center px-6 xs:px-7 sm:px-8 md:px-9 lg:px-10 2xl:px-12 py-3 xs:py-3.5 sm:py-4 md:py-4.5 lg:py-5 2xl:py-6 
                    border-2 border-[#00FF41]/60 backdrop-blur-md bg-gradient-to-br from-transparent via-[#0a1a0f]/50 to-transparent 
                    text-[#00FF41] font-bold font-mono uppercase 
                    text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl 
                    shadow-[0_0_25px_rgba(0,255,65,0.4)] 
                    hover:shadow-[0_0_45px_rgba(0,255,65,0.7),0_0_70px_rgba(0,255,65,0.4)] 
                    hover:border-[#00FF41] hover:bg-gradient-to-br hover:from-[#00FF41]/10 hover:via-[#00FF41]/5 hover:to-transparent
                    hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 
                    transition-all duration-500 ease-out group overflow-hidden w-full sm:w-auto rounded-lg" 
                  style={{
                    boxShadow: '0 0 25px rgba(0,255,65,0.4), inset 0 0 15px rgba(0,255,65,0.05)'
                  }}
                >
                  <span className="absolute inset-0 bg-[#00FF41]/8 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 flex items-center gap-2 xs:gap-2.5" style={{
                    textShadow: '0 0 8px rgba(0,255,65,0.5)'
                  }}>
                    <span>&gt;</span>
                    <span>GitHub</span>
                    <span>&lt;</span>
                  </span>
                </Link>
              </div>

              {/* Modern Social Links */}
              <div className="flex gap-4 xs:gap-4.5 sm:gap-5 md:gap-6 lg:gap-7 2xl:gap-9 mt-5 sm:mt-6 md:mt-7 mb-0 justify-center md:justify-start w-full">
                {socialLinks.map(({ href, aria, icon }) => (
                  <a 
                    key={href} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={aria} 
                    className="relative flex items-center justify-center w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 
                      border-2 border-[#00FF41]/45 backdrop-blur-md bg-gradient-to-br from-[#00FF41]/10 via-[#0a1a0f]/90 to-[#0a1a0f]/80 
                      text-[#00FF41] rounded-lg
                      hover:text-[#00FF41] hover:border-[#00FF41] 
                      hover:shadow-[0_0_35px_rgba(0,255,65,0.8),0_0_60px_rgba(0,255,65,0.4),inset_0_0_20px_rgba(0,255,65,0.1)] 
                      hover:scale-110 hover:-translate-y-1 hover:rotate-3 active:scale-95 active:translate-y-0 active:rotate-0
                      transition-all duration-500 ease-out group overflow-hidden" 
                    style={{
                      boxShadow: '0 0 18px rgba(0,255,65,0.4), inset 0 0 10px rgba(0,255,65,0.05)'
                    }}
                  >
                    <span className="absolute inset-0 bg-[#00FF41]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-110" style={{
                      filter: 'drop-shadow(0 0 4px rgba(0,255,65,0.6))'
                    }}>{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: PROFILE + STATS SECTION */}
          <div className="w-full md:w-[45%] lg:w-[47%] xl:w-[48%] 2xl:w-[50%] max-w-lg lg:max-w-xl 2xl:max-w-2xl flex flex-col items-center justify-center relative mt-8 sm:mt-10 md:mt-0 group/profile px-2 sm:px-0">
            <div className="relative flex flex-col items-center justify-center animate-hero-profile">
              {/* Modern Glassmorphism Panel Frame for Profile */}
              <div className="absolute -inset-5 sm:-inset-6 md:-inset-10 lg:-inset-12 backdrop-blur-xl bg-gradient-to-br from-[#00FF41]/5 via-transparent to-[#00FF41]/5 border border-[#00FF41]/20 rounded-xl pointer-events-none z-0 animate-pulse transition-all duration-1000 group-hover/profile:border-[#00FF41]/40" style={{
                boxShadow: 'inset 0 0 50px rgba(0,255,65,0.12), 0 0 70px rgba(0,255,65,0.18), 0 0 110px rgba(0,255,65,0.1)'
              }} aria-hidden="true"></div>
              
              <div className="absolute -inset-7 sm:-inset-8 md:-inset-14 lg:-inset-16 border border-[#00FF41]/8 rounded-xl pointer-events-none z-0 group-hover/profile:border-[#00FF41]/15 transition-all duration-700" style={{
                boxShadow: '0 0 70px rgba(0,255,65,0.12)'
              }} aria-hidden="true"></div>
              
              {/* Modern corner brackets for profile */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => {
                const positions = {
                  'top-left': '-top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 lg:-top-7 lg:-left-7 border-t-2 border-l-2',
                  'top-right': '-top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 lg:-top-7 lg:-right-7 border-t-2 border-r-2',
                  'bottom-left': '-bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6 lg:-bottom-7 lg:-left-7 border-b-2 border-l-2',
                  'bottom-right': '-bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 lg:-bottom-7 lg:-right-7 border-b-2 border-r-2'
                };
                return (
                  <div 
                    key={pos}
                    className={`absolute ${positions[pos as keyof typeof positions]} border-[#00FF41] pointer-events-none z-0 animate-pulse transition-all duration-500`} 
                    style={{ 
                      boxShadow: '0 0 25px rgba(0,255,65,0.7), 0 0 50px rgba(0,255,65,0.4), inset 0 0 20px rgba(0,255,65,0.2)' 
                    }} 
                    aria-hidden="true"
                  ></div>
                );
              })}
              
              {/* Modern holographic shimmer effect for profile */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover/profile:opacity-100 transition-opacity duration-1000 pointer-events-none z-0 rounded-xl" style={{
                transform: 'translateX(-100%)',
                animation: 'shimmer 3s ease-in-out infinite'
              }} aria-hidden="true"></div>
              
              <div className="relative group flex flex-col items-center z-10">
                {/* Modern Profile Image Glow */}
                <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#00FF41]/25 to-[#00FF41]/8 blur-3xl group-hover:opacity-90 opacity-60 transition duration-700 pointer-events-none" style={{
                  boxShadow: '0 0 80px rgba(0,255,65,0.4)'
                }} />
                
                {/* Modern Profile Image Container */}
                <div className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 
                  rounded-full overflow-hidden border-2 sm:border-[3px] md:border-4 border-[#00FF41]/70 
                  shadow-[0_0_50px_rgba(0,255,65,0.6),inset_0_0_25px_rgba(0,255,65,0.15)] 
                  group-hover:shadow-[0_0_90px_rgba(0,255,65,1),0_0_130px_rgba(0,255,65,0.6),inset_0_0_40px_rgba(0,255,65,0.25)] 
                  transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:border-[#00FF41] group-hover:rotate-2" 
                  style={{
                    boxShadow: '0 0 50px rgba(0,255,65,0.6), inset 0 0 25px rgba(0,255,65,0.15), 0 0 0 2px rgba(0,255,65,0.3)'
                  }}
                >
                  {/* Modern rotating ring effects */}
                  <div className="absolute -inset-3 rounded-full border-2 border-[#00FF41]/25 group-hover:border-[#00FF41]/50 animate-spin-slow transition-all duration-500" style={{ animationDuration: '25s' }} aria-hidden="true"></div>
                  <div className="absolute -inset-6 rounded-full border border-[#00FF41]/15 group-hover:border-[#00FF41]/35 animate-spin-slow-reverse transition-all duration-500" style={{ animationDuration: '20s' }} aria-hidden="true"></div>
                  
                  <Image 
                    src="/images/logo/mehmed.jpg" 
                    alt="Mehmed Muric, Full-Stack Developer" 
                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110" 
                    width={500} 
                    height={500}
                    style={{ aspectRatio: '1/1' }}
                    priority 
                    quality={90}
                  />
                  
                  {/* Modern gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00FF41]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" style={{
                    animation: 'scanLine 2.5s linear infinite'
                  }}></div>
                  
                  {/* Modern pulsing glow ring */}
                  <div className="absolute -inset-2 rounded-full border-2 border-[#00FF41]/40 animate-pulse pointer-events-none z-20 transition-all duration-500" style={{ boxShadow: '0 0 30px rgba(0,255,65,0.4)' }}></div>
                </div>
                
                {/* Modern Profile Badge */}
                <div className="absolute -bottom-5 xs:-bottom-6 sm:-bottom-7 md:-bottom-8 lg:-bottom-9 2xl:-bottom-11 left-1/2 -translate-x-1/2 
                  px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 2xl:px-9 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 2xl:py-4 
                  backdrop-blur-md bg-gradient-to-br from-[#00FF41]/15 via-[#0a1a0f]/95 to-[#0a1a0f]/90 
                  border-2 border-[#00FF41]/50 rounded-lg
                  shadow-[0_0_30px_rgba(0,255,65,0.6),inset_0_0_15px_rgba(0,255,65,0.12)] 
                  text-[#00FF41] font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-mono uppercase tracking-wider whitespace-nowrap 
                  group-hover:border-[#00FF41] group-hover:shadow-[0_0_45px_rgba(0,255,65,0.8),inset_0_0_20px_rgba(0,255,65,0.15)] 
                  transition-all duration-500" 
                  style={{
                    boxShadow: '0 0 30px rgba(0,255,65,0.6), inset 0 0 15px rgba(0,255,65,0.12), 0 0 0 1px rgba(0,255,65,0.25)'
                  }}
                >
                  <span className="absolute -left-1.5 xs:-left-2 sm:-left-2.5 top-1/2 -translate-y-1/2 text-[#00FF41]/60 text-[10px] xs:text-xs sm:text-sm transition-all duration-300 group-hover:text-[#00FF41]/80" style={{
                    textShadow: '0 0 8px rgba(0,255,65,0.6)'
                  }}>&lt;</span>
                  <span className="relative z-10 transition-all duration-300" style={{
                    textShadow: '0 0 12px rgba(0,255,65,0.7), 0 0 24px rgba(0,255,65,0.4)'
                  }}>Software Engineer</span>
                  <span className="absolute -right-1.5 xs:-right-2 sm:-right-2.5 top-1/2 -translate-y-1/2 text-[#00FF41]/60 text-[10px] xs:text-xs sm:text-sm transition-all duration-300 group-hover:text-[#00FF41]/80" style={{
                    textShadow: '0 0 8px rgba(0,255,65,0.6)'
                  }}>&gt;</span>
                  <div className="absolute inset-0 bg-[#00FF41]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                </div>
              </div>
              
              {/* Modern Stats Grid */}
              <div className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 grid grid-cols-3 gap-x-3 xs:gap-x-4 sm:gap-x-5 md:gap-x-7 lg:gap-x-8 xl:gap-x-9 2xl:gap-x-11 gap-y-4 xs:gap-y-5 sm:gap-y-6 md:gap-y-7 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl mx-auto px-2 sm:px-0">
                {STATS.map(stat => <StatCard stat={stat} key={stat.label} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Floating Particles */}
      {PARTICLE_POSITIONS.map(({ left, top }, i) => (
        <div 
          key={i} 
          className="absolute w-2.5 h-2.5 bg-[#00FF41] rounded-full opacity-40 animate-float pointer-events-none transition-all duration-500 hover:opacity-80 hover:scale-150" 
          style={{ 
            left, 
            top, 
            animationDelay: `${i * 0.45}s`, 
            animationDuration: `${3.6 + i * 0.3}s`,
            boxShadow: '0 0 15px #00FF41, 0 0 30px #00FF41, 0 0 45px rgba(0,255,65,0.5)'
          }} 
          aria-hidden 
        />
      ))}
    </section>
  );
};

export default Hero;
