'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useCallback, useState, memo } from "react";

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

// ---------- MEMO COMPONENTS ----------
const TechBadge = memo<{ tech: Technology }>(({ tech }) => (
  <span className="relative flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-3.5 md:px-4 lg:px-4.5 2xl:px-5 py-1.5 xs:py-2 sm:py-2.5 md:py-3 2xl:py-3.5 bg-[#0a1a0f] border border-[#00FF41]/45 text-[#00FF41] text-[11px] xs:text-xs sm:text-sm md:text-base 2xl:text-lg font-mono rounded-sm shadow-[0_0_15px_rgba(0,255,65,0.4),inset_0_0_8px_rgba(0,255,65,0.05)] hover:bg-[#00FF41]/10 hover:border-[#00FF41] hover:shadow-[0_0_30px_rgba(0,255,65,0.7),0_0_50px_rgba(0,255,65,0.4),inset_0_0_12px_rgba(0,255,65,0.1)] transition-all duration-300 group overflow-hidden" style={{
      boxShadow: '0 0 15px rgba(0,255,65,0.4), inset 0 0 8px rgba(0,255,65,0.05), 0 0 0 1px rgba(0,255,65,0.15)'
    }}>
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
    <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/70 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{
      boxShadow: '0 0 5px rgba(0,255,65,0.5)'
    }}></span>
    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/70 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{
      boxShadow: '0 0 5px rgba(0,255,65,0.5)'
    }}></span>
    {tech.src ? <Image src={tech.src} alt={tech.name} width={20} height={20} loading="lazy" className="relative z-10 w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7" style={{
      filter: 'drop-shadow(0 0 3px rgba(0,255,65,0.5))'
    }} /> : fallbackIcon}
    <span className="relative z-10" style={{
      textShadow: '0 0 5px rgba(0,255,65,0.4)'
    }}>{tech.name}</span>
  </span>
));
TechBadge.displayName = "TechBadge";

const StatCard = memo<{ stat: typeof STATS[0] }>(({ stat }) => (
  <div className="relative flex flex-col items-center p-2.5 sm:p-3 md:p-3.5 lg:p-4 2xl:p-5 w-full max-w-[85px] xs:max-w-[90px] sm:max-w-[100px] md:max-w-[110px] lg:max-w-[120px] xl:max-w-[130px] 2xl:max-w-[150px] bg-[#0a1a0f]/60 border border-[#00FF41]/35 rounded-sm shadow-[0_0_20px_rgba(0,255,65,0.25),inset_0_0_10px_rgba(0,255,65,0.05)] hover:shadow-[0_0_35px_rgba(0,255,65,0.5),0_0_50px_rgba(0,255,65,0.3),inset_0_0_15px_rgba(0,255,65,0.1)] hover:border-[#00FF41] transition-all duration-300 group" style={{
      boxShadow: '0 0 20px rgba(0,255,65,0.25), inset 0 0 10px rgba(0,255,65,0.05), 0 0 0 1px rgba(0,255,65,0.1)'
    }}>
    <div className="absolute inset-0 bg-[#00FF41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative rounded-full bg-[#0a1a0f] border border-[#00FF41]/50 flex items-center justify-center mb-2 sm:mb-2.5 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 2xl:w-14 2xl:h-14 shadow-[0_0_15px_rgba(0,255,65,0.4)] group-hover:shadow-[0_0_25px_rgba(0,255,65,0.7),0_0_40px_rgba(0,255,65,0.4)] transition-all" style={{
      boxShadow: '0 0 15px rgba(0,255,65,0.4), inset 0 0 5px rgba(0,255,65,0.1)'
    }}>{stat.icon}</div>
    <div className="relative text-base xs:text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-[#00FF41] font-mono" style={{
      textShadow: '0 0 10px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.3)'
    }}>{stat.value}</div>
    <div className="relative text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs lg:text-sm 2xl:text-base text-[#00FF41]/70 font-mono uppercase tracking-wider" style={{
      textShadow: '0 0 5px rgba(0,255,65,0.3)'
    }}>{stat.label}</div>
  </div>
));
StatCard.displayName = "StatCard";

// Enhanced CRT Scanline Effect Component
const CRTScanlines = memo(() => (
  <>
    {/* Primary scanlines */}
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.08] mix-blend-screen" style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        #00FF41 2px,
        #00FF41 4px
      )`,
    }} aria-hidden="true" />
    {/* Secondary scanlines for depth */}
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay" style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0,255,65,0.3) 3px,
        rgba(0,255,65,0.3) 6px
      )`,
    }} aria-hidden="true" />
    {/* Vignette effect */}
    <div className="fixed inset-0 pointer-events-none z-50 opacity-30" style={{
      background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)`,
    }} aria-hidden="true" />
  </>
));
CRTScanlines.displayName = "CRTScanlines";

// Enhanced HUD Grid Overlay with depth
const HUDGrid = memo(() => (
  <div className="absolute inset-0 pointer-events-none z-10 opacity-25" aria-hidden="true">
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id="hero-hud-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FF41" strokeWidth="0.5" opacity="0.4"/>
        </pattern>
        <pattern id="hero-hud-grid-small" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#00FF41" strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="grid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF41" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#00FF41" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00FF41" stopOpacity="0.15" />
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
    {/* Animated grid lines */}
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: `linear-gradient(90deg, transparent 0%, #00FF41 1px, transparent 1px),
                        linear-gradient(0deg, transparent 0%, #00FF41 1px, transparent 1px)`,
      backgroundSize: '100px 100px',
      animation: 'gridPulse 3s ease-in-out infinite'
    }} aria-hidden="true"></div>
  </div>
));
HUDGrid.displayName = "HUDGrid";

// Enhanced HUD Status Indicator
const HUDStatusIndicator = memo(() => (
  <div className="absolute top-[7rem] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-6 md:right-6 lg:top-8 lg:right-8 2xl:top-10 2xl:right-10 pointer-events-none z-[51] md:z-30" aria-hidden="true">
    <div className="relative bg-[#0a1a0f]/90 border border-[#00FF41]/50 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-sm shadow-[0_0_20px_rgba(0,255,65,0.4),inset_0_0_10px_rgba(0,255,65,0.1)]" style={{
      boxShadow: '0 0 20px rgba(0,255,65,0.4), inset 0 0 10px rgba(0,255,65,0.1), 0 0 0 1px rgba(0,255,65,0.2)'
    }}>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className="relative w-2 h-2 sm:w-2.5 sm:h-2.5">
          <div className="absolute inset-0 bg-[#00FF41] rounded-full animate-pulse" style={{ 
            boxShadow: '0 0 10px #00FF41, 0 0 20px rgba(0,255,65,0.5)' 
          }}></div>
          <div className="absolute inset-0 bg-[#00FF41] rounded-full opacity-50 animate-ping" style={{
            animationDuration: '2s'
          }}></div>
        </div>
        <span className="text-[#00FF41] text-xs sm:text-sm md:text-base font-mono uppercase tracking-wider" style={{
          textShadow: '0 0 8px rgba(0,255,65,0.6), 0 0 16px rgba(0,255,65,0.3)'
        }}>ONLINE</span>
      </div>
      <div className="absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 w-3 h-3 sm:w-4 sm:h-4 border-t border-l border-[#00FF41]" style={{
        boxShadow: '0 0 5px rgba(0,255,65,0.5)'
      }}></div>
      <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-3 h-3 sm:w-4 sm:h-4 border-t border-r border-[#00FF41]" style={{
        boxShadow: '0 0 5px rgba(0,255,65,0.5)'
      }}></div>
      <div className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 w-3 h-3 sm:w-4 sm:h-4 border-b border-l border-[#00FF41]" style={{
        boxShadow: '0 0 5px rgba(0,255,65,0.5)'
      }}></div>
      <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 w-3 h-3 sm:w-4 sm:h-4 border-b border-r border-[#00FF41]" style={{
        boxShadow: '0 0 5px rgba(0,255,65,0.5)'
      }}></div>
    </div>
  </div>
));
HUDStatusIndicator.displayName = "HUDStatusIndicator";

// Enhanced Animated Corner Lines
const AnimatedCornerLines = memo<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }>(({ position }) => {
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };
  
  const lineStyles = {
    'top-left': 'w-16 sm:w-24 md:w-32 lg:w-40 2xl:w-48 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/80 to-transparent',
    'top-right': 'w-16 sm:w-24 md:w-32 lg:w-40 2xl:w-48 h-[2px] bg-gradient-to-l from-[#00FF41] via-[#00FF41]/80 to-transparent',
    'bottom-left': 'w-16 sm:w-24 md:w-32 lg:w-40 2xl:w-48 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/80 to-transparent',
    'bottom-right': 'w-16 sm:w-24 md:w-32 lg:w-40 2xl:w-48 h-[2px] bg-gradient-to-l from-[#00FF41] via-[#00FF41]/80 to-transparent'
  };
  
  const verticalStyles = {
    'top-left': 'h-16 sm:h-24 md:h-32 lg:h-40 2xl:h-48 w-[2px] bg-gradient-to-b from-[#00FF41] via-[#00FF41]/80 to-transparent',
    'top-right': 'h-16 sm:h-24 md:h-32 lg:h-40 2xl:h-48 w-[2px] bg-gradient-to-b from-[#00FF41] via-[#00FF41]/80 to-transparent',
    'bottom-left': 'h-16 sm:h-24 md:h-32 lg:h-40 2xl:h-48 w-[2px] bg-gradient-to-t from-[#00FF41] via-[#00FF41]/80 to-transparent',
    'bottom-right': 'h-16 sm:h-24 md:h-32 lg:h-40 2xl:h-48 w-[2px] bg-gradient-to-t from-[#00FF41] via-[#00FF41]/80 to-transparent'
  };
  
  return (
    <div className={`absolute ${positions[position]} pointer-events-none z-20`} aria-hidden="true">
      <div className={`${lineStyles[position]} animate-pulse`} style={{ 
        boxShadow: '0 0 15px #00FF41, 0 0 30px rgba(0,255,65,0.5)' 
      }}></div>
      <div className={`${verticalStyles[position]} mt-[-2px] animate-pulse`} style={{ 
        boxShadow: '0 0 15px #00FF41, 0 0 30px rgba(0,255,65,0.5)', 
        animationDelay: '0.5s' 
      }}></div>
    </div>
  );
});
AnimatedCornerLines.displayName = "AnimatedCornerLines";

// Enhanced Floating Data Stream Component with fade effect
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
      className="absolute text-[#00FF41]/40 font-mono text-[10px] xs:text-xs sm:text-sm tracking-[0.2em] pointer-events-none select-none"
      style={{ 
        left, 
        top: '-10%',
        animation: `dataStream ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
        textShadow: '0 0 5px rgba(0,255,65,0.5), 0 0 10px rgba(0,255,65,0.3)',
        filter: 'blur(0.5px)'
      }}
      aria-hidden="true"
    >
      {chars.map((char, i) => (
        <span 
          key={i} 
          style={{ 
            opacity: i < 3 ? 0.2 : i > chars.length - 4 ? 0.2 : 0.6,
            textShadow: i % 2 === 0 ? '0 0 3px rgba(0,255,65,0.8)' : 'none'
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
  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[400px] h-[350px] sm:w-[600px] sm:h-[525px] md:w-[800px] md:h-[700px] opacity-10 sm:opacity-15 md:opacity-20 pointer-events-none z-0">
    <svg width="100%" height="100%" viewBox="0 0 800 700" fill="none">
      <circle cx="400" cy="350" r="240" fill="rgba(0,255,65,0.08)" />
      <circle cx="630" cy="150" r="100" fill="rgba(0,255,65,0.06)" />
      <circle cx="120" cy="480" r="70" fill="rgba(0,255,65,0.04)" />
    </svg>
  </div>
));
DecorativeCircles.displayName = "DecorativeCircles";



// ---------- HERO COMPONENT ----------
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (window.innerWidth > 768) {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 72,
        y: (e.clientY / window.innerHeight - 0.5) * 72,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section id="home" className="relative z-10 min-h-screen flex items-center justify-center bg-[#000000] bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#050a08] pt-24 sm:pt-28 md:pt-24 lg:pt-28 pb-6 sm:pb-8 md:pb-16 lg:pb-20 overflow-hidden">
      {/* Enhanced CRT Scanline Effect */}
      <CRTScanlines />
      
      {/* Enhanced HUD Grid Overlay */}
      <HUDGrid />
      
      {/* Multiple Animated Scanning Lines with depth */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-50 animate-scanLine" style={{
          animation: 'scanLine 4s linear infinite',
          boxShadow: '0 0 15px #00FF41, 0 0 30px #00FF41, 0 0 45px rgba(0,255,65,0.3)',
          filter: 'blur(0.5px)'
        }}></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent opacity-40 animate-scanLine" style={{
          animation: 'scanLine 6s linear infinite',
          animationDelay: '2s',
          boxShadow: '0 0 8px #00FF41, 0 0 16px rgba(0,255,65,0.4)'
        }}></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-30 animate-scanLine" style={{
          animation: 'scanLine 8s linear infinite',
          animationDelay: '4s',
          boxShadow: '0 0 5px rgba(0,255,65,0.3)'
        }}></div>
      </div>
      
      {/* Enhanced Floating Data Streams - more streams for ultra-wide */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <DataStream 
          key={i} 
          delay={i * 0.8} 
          left={`${8 + i * 12}%`}
          speed={7 + (i % 3) * 2}
        />
      ))}
      
      {/* Glitch overlay effect */}
      <div className="absolute inset-0 pointer-events-none z-40 opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/5 to-transparent animate-glitch"></div>
      </div>
      
      <DecorativeCircles />
      
      {/* Parallax Background Glows */}
      <div className="absolute left-[5%] top-[14%] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[radial-gradient(circle,rgba(0,255,65,0.15)_0%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform opacity-50 sm:opacity-75 md:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.45}px,${mousePosition.y * 0.41}px,0)` }} aria-hidden />
      <div className="absolute right-[10%] bottom-[5%] w-[190px] h-[120px] sm:w-[280px] sm:h-[180px] md:w-[380px] md:h-[240px] bg-[radial-gradient(circle,rgba(0,255,65,0.1)_0%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform opacity-50 sm:opacity-75 md:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.19}px,${mousePosition.y * 0.08}px,0)` }} aria-hidden />
      
      {/* HUD Corner Brackets */}
      <AnimatedCornerLines position="top-left" />
      <AnimatedCornerLines position="top-right" />
      <AnimatedCornerLines position="bottom-left" />
      <AnimatedCornerLines position="bottom-right" />
      
      {/* HUD Status Indicator */}
      <HUDStatusIndicator />
      
      <div className="relative z-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 mx-auto select-none mt-8 sm:mt-12 md:mt-16 lg:mt-24 max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1920px] w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">
          
          {/* LEFT: CONTENT */}
          <div className="w-full md:w-[45%] lg:w-[47%] xl:w-[48%] 2xl:w-[50%] max-w-xl lg:max-w-2xl 2xl:max-w-3xl flex flex-col items-center md:items-start text-center md:text-left relative group px-2 sm:px-0">
            {/* Enhanced HUD Panel Frame with multiple layers */}
            <div className="absolute -inset-2 sm:-inset-3 md:-inset-6 lg:-inset-8 border border-[#00FF41]/25 rounded-sm pointer-events-none z-0 animate-pulse" style={{
              boxShadow: 'inset 0 0 30px rgba(0,255,65,0.15), 0 0 40px rgba(0,255,65,0.15), 0 0 60px rgba(0,255,65,0.08), 0 0 80px rgba(0,255,65,0.04)'
            }} aria-hidden="true"></div>
            {/* Outer glow layer */}
            <div className="absolute -inset-4 sm:-inset-5 md:-inset-8 lg:-inset-10 border border-[#00FF41]/10 rounded-sm pointer-events-none z-0 group-hover:border-[#00FF41]/20 transition-all duration-500" style={{
              boxShadow: '0 0 50px rgba(0,255,65,0.1)'
            }} aria-hidden="true"></div>
            {/* Corner brackets with enhanced glow */}
            <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 md:-top-3 md:-left-3 lg:-top-4 lg:-left-4 w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 border-t-2 border-l-2 border-[#00FF41] pointer-events-none z-0 animate-pulse" style={{ 
              boxShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.3), inset 0 0 10px rgba(0,255,65,0.2)'
            }} aria-hidden="true"></div>
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-3 md:-right-3 lg:-top-4 lg:-right-4 w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 border-t-2 border-r-2 border-[#00FF41] pointer-events-none z-0 animate-pulse" style={{ 
              boxShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.3), inset 0 0 10px rgba(0,255,65,0.2)'
            }} aria-hidden="true"></div>
            <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 md:-bottom-3 md:-left-3 lg:-bottom-4 lg:-left-4 w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 border-b-2 border-l-2 border-[#00FF41] pointer-events-none z-0 animate-pulse" style={{ 
              boxShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.3), inset 0 0 10px rgba(0,255,65,0.2)'
            }} aria-hidden="true"></div>
            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 md:-bottom-3 md:-right-3 lg:-bottom-4 lg:-right-4 w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 border-b-2 border-r-2 border-[#00FF41] pointer-events-none z-0 animate-pulse" style={{ 
              boxShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.3), inset 0 0 10px rgba(0,255,65,0.2)'
            }} aria-hidden="true"></div>
            {/* Enhanced diagonal accent lines */}
            <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-4 md:-left-4 lg:-top-5 lg:-left-5 w-8 sm:w-12 md:w-16 lg:w-20 h-[2px] bg-gradient-to-r from-[#00FF41]/70 via-[#00FF41]/40 to-transparent rotate-45 origin-left pointer-events-none z-0" style={{
              boxShadow: '0 0 8px rgba(0,255,65,0.5)'
            }} aria-hidden="true"></div>
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 lg:-top-5 lg:-right-5 w-8 sm:w-12 md:w-16 lg:w-20 h-[2px] bg-gradient-to-l from-[#00FF41]/70 via-[#00FF41]/40 to-transparent -rotate-45 origin-right pointer-events-none z-0" style={{
              boxShadow: '0 0 8px rgba(0,255,65,0.5)'
            }} aria-hidden="true"></div>
            {/* Bottom diagonal lines */}
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 lg:-bottom-5 lg:-left-5 w-8 sm:w-12 md:w-16 lg:w-20 h-[2px] bg-gradient-to-r from-[#00FF41]/70 via-[#00FF41]/40 to-transparent -rotate-45 origin-left pointer-events-none z-0" style={{
              boxShadow: '0 0 8px rgba(0,255,65,0.5)'
            }} aria-hidden="true"></div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 md:-bottom-4 md:-right-4 lg:-bottom-5 lg:-right-5 w-8 sm:w-12 md:w-16 lg:w-20 h-[2px] bg-gradient-to-l from-[#00FF41]/70 via-[#00FF41]/40 to-transparent rotate-45 origin-right pointer-events-none z-0" style={{
              boxShadow: '0 0 8px rgba(0,255,65,0.5)'
            }} aria-hidden="true"></div>
            {/* Holographic shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0" style={{
              transform: 'translateX(-100%)',
              animation: 'shimmer 3s ease-in-out infinite'
            }} aria-hidden="true"></div>
            
            <div className="relative z-10 w-full">
              <h1 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-[#00FF41] leading-[1.15] mb-3 sm:mb-3 md:mb-4 tracking-tight flex flex-col items-center md:items-start font-mono relative w-full group/title animate-hero-title" style={{
                textShadow: '0 0 15px rgba(0,255,65,0.6), 0 0 30px rgba(0,255,65,0.4), 0 0 45px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.15), 0 0 80px rgba(0,255,65,0.1)',
                filter: 'drop-shadow(0 0 5px rgba(0,255,65,0.5))'
              }}>
                <span className="relative inline-block w-full text-center md:text-left">
                  <span className="absolute -left-2 xs:-left-3 sm:-left-4 md:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 text-[#00FF41]/30 font-mono text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl hidden sm:block">[</span>
                  Mehmed <span className="text-[#00FF41] relative inline-block">
                    <span className="relative z-10">Muric</span>
                  </span>
                  <span className="absolute -right-2 xs:-right-3 sm:-right-4 md:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 text-[#00FF41]/30 font-mono text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl hidden sm:block">]</span>
                </span>
                <span className="mt-2 sm:mt-2.5 md:mt-3 h-[2px] sm:h-[3px] w-12 xs:w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-80 relative overflow-hidden mx-auto md:mx-0">
                  <span className="absolute inset-0 bg-[#00FF41] animate-pulse" style={{ boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41' }}></span>
                  <span className="absolute inset-0 bg-[#00FF41] animate-ping opacity-20"></span>
                </span>
              </h1>

              <h2 className="mt-3 sm:mt-3 md:mt-4 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#00FF41]/90 flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-3 font-mono w-full animate-hero-subtitle" style={{
                textShadow: '0 0 8px rgba(0,255,65,0.4), 0 0 16px rgba(0,255,65,0.2)'
              }}>
                <span className="relative">
                  <span className="absolute -left-1.5 xs:-left-2 sm:-left-2.5 md:-left-3 text-[#00FF41]/50 text-[10px] xs:text-xs sm:text-sm">&gt;</span>
                  Full-Stack Developer
                </span>
                <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 hidden xs:inline text-[#00FF41]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 3px #00FF41)' }}>
                  <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden xs:inline relative">
                  <span className="absolute -left-1.5 xs:-left-2 sm:-left-2.5 md:-left-3 text-[#00FF41]/50 text-[10px] xs:text-xs sm:text-sm">&gt;</span>
                  Software Engineer
                </span>
              </h2>

              <p className="mt-3 sm:mt-4 md:mt-5 mb-4 sm:mb-5 md:mb-6 text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl text-[#00FF41]/80 font-normal max-w-full md:max-w-md lg:max-w-lg 2xl:max-w-xl leading-relaxed mx-auto md:mx-0 px-2 sm:px-2 md:px-0 font-mono animate-hero-desc" style={{
                textShadow: '0 0 5px rgba(0,255,65,0.3)'
              }}>
                I build robust, scalable web & mobile apps focused on speed, polish, and maintainability. Lets craft solutions that last.
              </p>

              <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 mb-4 sm:mb-5 md:mb-6 justify-center md:justify-start w-full px-1 xs:px-2 sm:px-2 md:px-0 animate-hero-badges">
                {techStack.map(tech => <TechBadge tech={tech} key={tech.name} />)}
              </div>

              <div className="w-full flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 xs:gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 my-3 sm:my-4 md:my-5 px-2 sm:px-0 animate-hero-cta">
                <a href="/MojCV.pdf" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center px-5 xs:px-6 sm:px-7 md:px-8 lg:px-9 2xl:px-10 py-2.5 xs:py-3 sm:py-3.5 md:py-4 lg:py-4.5 2xl:py-5 bg-[#0a1a0f] border-2 border-[#00FF41] text-[#00FF41] font-bold tracking-wide font-mono uppercase text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl shadow-[0_0_25px_rgba(0,255,65,0.5),inset_0_0_15px_rgba(0,255,65,0.1)] hover:shadow-[0_0_40px_rgba(0,255,65,0.8),0_0_60px_rgba(0,255,65,0.4),inset_0_0_20px_rgba(0,255,65,0.2)] hover:bg-[#00FF41]/10 hover:scale-105 active:scale-95 transition-all duration-300 group overflow-hidden w-full sm:w-auto" style={{
                  boxShadow: '0 0 25px rgba(0,255,65,0.5), inset 0 0 15px rgba(0,255,65,0.1), 0 0 0 1px rgba(0,255,65,0.2)'
                }}>
                  <span className="absolute inset-0 bg-[#00FF41]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center gap-1.5 xs:gap-2" style={{
                    textShadow: '0 0 5px rgba(0,255,65,0.5)'
                  }}>
                    <span>&gt;</span>
                    <span>View CV</span>
                    <span>&lt;</span>
                  </span>
                </a>

                <Link href="https://github.com/mehmedmuric" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center px-5 xs:px-6 sm:px-7 md:px-8 lg:px-9 2xl:px-10 py-2.5 xs:py-3 sm:py-3.5 md:py-4 lg:py-4.5 2xl:py-5 border-2 border-[#00FF41]/60 bg-transparent text-[#00FF41] font-bold font-mono uppercase text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_35px_rgba(0,255,65,0.6),0_0_50px_rgba(0,255,65,0.3)] hover:border-[#00FF41] hover:bg-[#00FF41]/5 hover:scale-105 transition-all duration-300 group overflow-hidden w-full sm:w-auto" style={{
                  boxShadow: '0 0 20px rgba(0,255,65,0.3), inset 0 0 10px rgba(0,255,65,0.05)'
                }}>
                  <span className="absolute inset-0 bg-[#00FF41]/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center gap-1.5 xs:gap-2" style={{
                    textShadow: '0 0 5px rgba(0,255,65,0.4)'
                  }}>
                    <span>&gt;</span>
                    <span>GitHub</span>
                    <span>&lt;</span>
                  </span>
                </Link>
              </div>

              <div className="flex gap-3 xs:gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 2xl:gap-8 mt-4 sm:mt-5 md:mt-6 mb-0 justify-center md:justify-start w-full">
                {socialLinks.map(({ href, aria, icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={aria} className="relative flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 border-2 border-[#00FF41]/45 bg-[#0a1a0f] text-[#00FF41] hover:text-[#00FF41] hover:border-[#00FF41] hover:shadow-[0_0_30px_rgba(0,255,65,0.7),0_0_50px_rgba(0,255,65,0.4)] hover:scale-110 transition-all duration-300 group overflow-hidden" style={{
                    boxShadow: '0 0 15px rgba(0,255,65,0.3), inset 0 0 8px rgba(0,255,65,0.05)'
                  }}>
                    <span className="absolute inset-0 bg-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="relative z-10" style={{
                      filter: 'drop-shadow(0 0 3px rgba(0,255,65,0.5))'
                    }}>{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: PROFILE + STATS */}
          <div className="w-full md:w-[45%] lg:w-[47%] xl:w-[48%] 2xl:w-[50%] max-w-lg lg:max-w-xl 2xl:max-w-2xl flex flex-col items-center justify-center relative mt-6 sm:mt-8 md:mt-0 group/profile px-2 sm:px-0">
            <div className="relative flex flex-col items-center justify-center animate-hero-profile">
              {/* Enhanced HUD Panel Frame for Profile with multiple layers */}
              <div className="absolute -inset-4 sm:-inset-6 md:-inset-10 lg:-inset-12 border border-[#00FF41]/25 rounded-sm pointer-events-none z-0 animate-pulse" style={{
                boxShadow: 'inset 0 0 40px rgba(0,255,65,0.15), 0 0 50px rgba(0,255,65,0.15), 0 0 70px rgba(0,255,65,0.1), 0 0 90px rgba(0,255,65,0.05)'
              }} aria-hidden="true"></div>
              {/* Outer glow layer */}
              <div className="absolute -inset-6 sm:-inset-8 md:-inset-12 lg:-inset-16 border border-[#00FF41]/10 rounded-sm pointer-events-none z-0 group-hover/profile:border-[#00FF41]/20 transition-all duration-500" style={{
                boxShadow: '0 0 60px rgba(0,255,65,0.1)'
              }} aria-hidden="true"></div>
              {/* Enhanced corner brackets */}
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-5 md:-left-5 lg:-top-6 lg:-left-6 w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 border-t-2 border-l-2 border-[#00FF41] pointer-events-none z-0 animate-pulse" style={{ 
                boxShadow: '0 0 20px rgba(0,255,65,0.6), 0 0 40px rgba(0,255,65,0.3), inset 0 0 15px rgba(0,255,65,0.2)'
              }} aria-hidden="true"></div>
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-5 md:-right-5 lg:-top-6 lg:-right-6 w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 border-t-2 border-r-2 border-[#00FF41] pointer-events-none z-0 animate-pulse" style={{ 
                boxShadow: '0 0 20px rgba(0,255,65,0.6), 0 0 40px rgba(0,255,65,0.3), inset 0 0 15px rgba(0,255,65,0.2)'
              }} aria-hidden="true"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-5 md:-left-5 lg:-bottom-6 lg:-left-6 w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 border-b-2 border-l-2 border-[#00FF41] pointer-events-none z-0 animate-pulse" style={{ 
                boxShadow: '0 0 20px rgba(0,255,65,0.6), 0 0 40px rgba(0,255,65,0.3), inset 0 0 15px rgba(0,255,65,0.2)'
              }} aria-hidden="true"></div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 md:-bottom-5 md:-right-5 lg:-bottom-6 lg:-right-6 w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 border-b-2 border-r-2 border-[#00FF41] pointer-events-none z-0 animate-pulse" style={{ 
                boxShadow: '0 0 20px rgba(0,255,65,0.6), 0 0 40px rgba(0,255,65,0.3), inset 0 0 15px rgba(0,255,65,0.2)'
              }} aria-hidden="true"></div>
              {/* Enhanced diagonal accent lines for profile */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 lg:-top-7 lg:-left-7 w-10 sm:w-14 md:w-20 lg:w-24 h-[2px] bg-gradient-to-r from-[#00FF41]/70 via-[#00FF41]/40 to-transparent rotate-45 origin-left pointer-events-none z-0" style={{
                boxShadow: '0 0 10px rgba(0,255,65,0.5)'
              }} aria-hidden="true"></div>
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 lg:-top-7 lg:-right-7 w-10 sm:w-14 md:w-20 lg:w-24 h-[2px] bg-gradient-to-l from-[#00FF41]/70 via-[#00FF41]/40 to-transparent -rotate-45 origin-right pointer-events-none z-0" style={{
                boxShadow: '0 0 10px rgba(0,255,65,0.5)'
              }} aria-hidden="true"></div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6 lg:-bottom-7 lg:-left-7 w-10 sm:w-14 md:w-20 lg:w-24 h-[2px] bg-gradient-to-r from-[#00FF41]/70 via-[#00FF41]/40 to-transparent -rotate-45 origin-left pointer-events-none z-0" style={{
                boxShadow: '0 0 10px rgba(0,255,65,0.5)'
              }} aria-hidden="true"></div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 lg:-bottom-7 lg:-right-7 w-10 sm:w-14 md:w-20 lg:w-24 h-[2px] bg-gradient-to-l from-[#00FF41]/70 via-[#00FF41]/40 to-transparent rotate-45 origin-right pointer-events-none z-0" style={{
                boxShadow: '0 0 10px rgba(0,255,65,0.5)'
              }} aria-hidden="true"></div>
              {/* Holographic shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/5 to-transparent opacity-0 group-hover/profile:opacity-100 transition-opacity duration-1000 pointer-events-none z-0" style={{
                transform: 'translateX(-100%)',
                animation: 'shimmer 3s ease-in-out infinite'
              }} aria-hidden="true"></div>
              
              <div className="relative group flex flex-col items-center z-10">
                <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#00FF41]/20 to-[#00FF41]/5 blur-3xl group-hover:opacity-80 opacity-50 transition duration-500 pointer-events-none" style={{
                  boxShadow: '0 0 60px rgba(0,255,65,0.3)'
                }} />
                <div className="relative w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 rounded-full overflow-hidden border-2 sm:border-4 border-[#00FF41]/60 shadow-[0_0_40px_rgba(0,255,65,0.5),inset_0_0_20px_rgba(0,255,65,0.1)] group-hover:shadow-[0_0_70px_rgba(0,255,65,0.9),0_0_100px_rgba(0,255,65,0.5),inset_0_0_30px_rgba(0,255,65,0.2)] transition-all duration-700 group-hover:scale-[1.05] group-hover:border-[#00FF41]" style={{
                  boxShadow: '0 0 40px rgba(0,255,65,0.5), inset 0 0 20px rgba(0,255,65,0.1), 0 0 0 2px rgba(0,255,65,0.2)'
                }}>
                  {/* Rotating ring effect */}
                  <div className="absolute -inset-2 rounded-full border-2 border-[#00FF41]/20 group-hover:border-[#00FF41]/40 animate-spin-slow" style={{ animationDuration: '20s' }} aria-hidden="true"></div>
                  <div className="absolute -inset-4 rounded-full border border-[#00FF41]/10 group-hover:border-[#00FF41]/30 animate-spin-slow-reverse" style={{ animationDuration: '15s' }} aria-hidden="true"></div>
                  
                  <Image 
                    src="/images/logo/mehmed.jpg" 
                    alt="Mehmed Muric, Full-Stack Developer" 
                    className="w-full h-full object-cover relative z-10" 
                    width={500} 
                    height={500}
                    style={{ aspectRatio: '1/1' }}
                    priority 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none z-20" />
                  {/* Scanning overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20" style={{
                    animation: 'scanLine 2s linear infinite'
                  }}></div>
                  {/* Pulsing glow ring */}
                  <div className="absolute -inset-1 rounded-full border-2 border-[#00FF41]/30 animate-pulse pointer-events-none z-20" style={{ boxShadow: '0 0 20px rgba(0,255,65,0.3)' }}></div>
                </div>
                <div className="absolute -bottom-4 xs:-bottom-5 sm:-bottom-6 md:-bottom-7 lg:-bottom-8 2xl:-bottom-10 left-1/2 -translate-x-1/2 px-2.5 xs:px-3 sm:px-4 md:px-5 lg:px-6 2xl:px-8 py-1 xs:py-1.5 sm:py-2 md:py-2.5 lg:py-3 2xl:py-4 bg-[#0a1a0f]/95 border-2 border-[#00FF41]/45 shadow-[0_0_25px_rgba(0,255,65,0.5),inset_0_0_10px_rgba(0,255,65,0.1)] text-[#00FF41] font-bold text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl font-mono uppercase tracking-wider whitespace-nowrap group" style={{
                  boxShadow: '0 0 25px rgba(0,255,65,0.5), inset 0 0 10px rgba(0,255,65,0.1), 0 0 0 1px rgba(0,255,65,0.2)'
                }}>
                  <span className="absolute -left-1 xs:-left-1.5 sm:-left-2 top-1/2 -translate-y-1/2 text-[#00FF41]/50 text-[8px] xs:text-[10px] sm:text-xs" style={{
                    textShadow: '0 0 5px rgba(0,255,65,0.5)'
                  }}>&lt;</span>
                  <span className="relative z-10" style={{
                    textShadow: '0 0 8px rgba(0,255,65,0.6), 0 0 16px rgba(0,255,65,0.3)'
                  }}>Software Engineer</span>
                  <span className="absolute -right-1 xs:-right-1.5 sm:-right-2 top-1/2 -translate-y-1/2 text-[#00FF41]/50 text-[8px] xs:text-[10px] sm:text-xs" style={{
                    textShadow: '0 0 5px rgba(0,255,65,0.5)'
                  }}>&gt;</span>
                  <div className="absolute inset-0 bg-[#00FF41]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <div className="mt-8 xs:mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-18 2xl:mt-20 grid grid-cols-3 gap-x-2.5 xs:gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-7 xl:gap-x-8 2xl:gap-x-10 gap-y-3 xs:gap-y-4 sm:gap-y-5 md:gap-y-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl mx-auto px-2 sm:px-0">
                {STATS.map(stat => <StatCard stat={stat} key={stat.label} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PARTICLES */}
      {PARTICLE_POSITIONS.map(({ left, top }, i) => (
        <div key={i} className="absolute w-2 h-2 bg-[#00FF41] rounded-full opacity-30 animate-float pointer-events-none" style={{ 
          left, 
          top, 
          animationDelay: `${i * 0.45}s`, 
          animationDuration: `${3.6 + i * 0.3}s`,
          boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41'
        }} aria-hidden />
      ))}
    </section>
  );
};

export default Hero;
