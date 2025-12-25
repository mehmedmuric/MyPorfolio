'use client'
import Link from "next/link";
import { Fragment, useState, useEffect, memo } from "react";

interface BreadcrumbProps {
  pageName: string;
  description?: string;
  crumbs?: { name: string; href?: string }[];
}

// Background effects constants
const DATA_STREAM_CHARS = ['0', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0', '1', '1', '0'];

// HUD Grid Overlay
const HUDGrid = memo(() => (
  <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.15] sm:opacity-20 md:opacity-25" aria-hidden="true">
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id="breadcrumb-hud-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FF41" strokeWidth="0.5" opacity="0.4"/>
        </pattern>
        <pattern id="breadcrumb-hud-grid-small" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#00FF41" strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="breadcrumb-grid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF41" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#00FF41" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#00FF41" stopOpacity="0.1" />
        </linearGradient>
        <filter id="breadcrumb-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#breadcrumb-hud-grid)" filter="url(#breadcrumb-glow)" />
      <rect width="100%" height="100%" fill="url(#breadcrumb-hud-grid-small)" />
      <rect width="100%" height="100%" fill="url(#breadcrumb-grid-glow)" />
    </svg>
  </div>
));
HUDGrid.displayName = "HUDGrid";

// Floating Data Stream Component
const DataStream = ({ delay, left, speed = 8 }: { delay: number; left: string; speed?: number }) => {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    const stream = Array.from({ length: 20 }, () => 
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
  
  if (chars.length === 0) {
    return null;
  }
  
  return (
    <div 
      className="absolute text-[#00FF41]/30 sm:text-[#00FF41]/35 md:text-[#00FF41]/40 font-mono text-[8px] sm:text-[10px] tracking-[0.2em] pointer-events-none select-none"
      style={{ 
        left, 
        top: '-10%',
        animation: `dataStream ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
        textShadow: '0 0 3px rgba(0,255,65,0.3), 0 0 6px rgba(0,255,65,0.2)',
      }}
      aria-hidden="true"
    >
      {chars.map((char, i) => (
        <span 
          key={i} 
          style={{ 
            opacity: i < 3 ? 0.15 : i > chars.length - 4 ? 0.15 : 0.5,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

// Decorative Circles
const DecorativeCircles = memo(() => (
  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[400px] h-[350px] sm:w-[600px] sm:h-[525px] md:w-[800px] md:h-[700px] opacity-8 sm:opacity-12 md:opacity-15 pointer-events-none z-0">
    <svg width="100%" height="100%" viewBox="0 0 800 700" fill="none">
      <circle cx="400" cy="350" r="240" fill="rgba(0,255,65,0.08)" />
      <circle cx="630" cy="150" r="100" fill="rgba(0,255,65,0.06)" />
      <circle cx="120" cy="480" r="70" fill="rgba(0,255,65,0.04)" />
    </svg>
  </div>
));
DecorativeCircles.displayName = "DecorativeCircles";

// Enhanced Breadcrumbs - dynamic and accessible with HUD styling
const Breadcrumb = ({
  pageName,
  description,
  crumbs = [
    { name: "Home", href: "/" }
    // Optionally push more crumbs in usage site for nested pages
  ]
}: BreadcrumbProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px] bg-[#000000] bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#050a08]" suppressHydrationWarning>
      {/* Background Effects */}
      <HUDGrid />
      <DecorativeCircles />
      
      {/* Subtle background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.03)_0%,_transparent_70%)]" />
      
      {/* Animated Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
        <div className="absolute w-full h-[1px] sm:h-[1.5px] md:h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-40 sm:opacity-45 md:opacity-50" style={{
          animation: 'scanLine 4s linear infinite',
          boxShadow: '0 0 8px #00FF41, 0 0 15px #00FF41, 0 0 25px rgba(0,255,65,0.2)',
        }}></div>
        <div className="absolute w-full h-[0.5px] sm:h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent opacity-30 sm:opacity-35 md:opacity-40" style={{
          animation: 'scanLine 6s linear infinite',
          animationDelay: '2s',
          boxShadow: '0 0 5px #00FF41, 0 0 10px rgba(0,255,65,0.3)'
        }}></div>
      </div>
      
      {/* Floating Data Streams */}
      {mounted && (
        <div suppressHydrationWarning>
          {[0, 1, 2, 3, 4].map((i) => (
            <DataStream 
              key={i} 
              delay={i * 1.2} 
              left={`${10 + i * 16}%`}
              speed={8 + (i % 2) * 2}
            />
          ))}
        </div>
      )}
      
      {/* Subtle glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.06)_0%,_transparent_70%)] blur-3xl opacity-30" aria-hidden />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.04)_0%,_transparent_70%)] blur-2xl opacity-20" aria-hidden />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation with HUD styling */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <div className="relative inline-flex items-center px-3 py-1.5 bg-black/40 border border-[#00FF41]/30 backdrop-blur-sm"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
            }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00FF41] opacity-50" />
            <ol className="flex flex-wrap items-center space-x-2 text-[13px] sm:text-[14px] font-mono">
              {crumbs.map((crumb, idx) => (
                <Fragment key={crumb.name}>
                  {crumb.href ? (
                    <li>
                      <Link
                        href={crumb.href}
                        className="text-gray-400 hover:text-[#00FF41] transition-colors duration-200"
                      >
                        {crumb.name}
                      </Link>
                    </li>
                  ) : (
                    <li className="text-[#00FF41]/70 font-semibold">{crumb.name}</li>
                  )}
                  {idx < crumbs.length - 1 && (
                    <li
                      aria-hidden="true"
                      className="mx-2 text-[#00FF41]/40"
                    >
                      /
                    </li>
                  )}
                </Fragment>
              ))}
              <li
                className="text-[#00FF41] font-semibold"
                aria-current="page"
              >
                {pageName}
              </li>
            </ol>
          </div>
        </nav>
        
        {/* Title section with HUD panel styling */}
        <div className="relative mb-8 max-w-[570px]">
          {/* HUD Panel behind title */}
          <div className="absolute inset-0 -inset-x-2 sm:-inset-x-4 bg-black/40 border border-[#00FF41]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.15)]"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
            }}
          />
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00FF41] opacity-50" />
          
          <div className="relative px-4 sm:px-6 py-5 sm:py-6">
            <h1 className="mb-3 text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,255,65,0.3)]">
              <span className="text-[#00FF41]">[</span>
              {pageName}
              <span className="text-[#00FF41]">]</span>
            </h1>
            {description && (
              <p className="text-sm sm:text-base leading-relaxed text-gray-300 font-mono">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Subtle corner brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#00FF41] opacity-20 hidden sm:block" aria-hidden />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[#00FF41] opacity-20 hidden sm:block" aria-hidden />
    </section>
  );
};

export default Breadcrumb;
