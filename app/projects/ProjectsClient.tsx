'use client'

import Breadcrumb from '../components/Common/Breadcrumb';
import { Blog } from '@/types/blog';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../components/Loader';
import gsap from 'gsap';

const SingleBlog = dynamic(() => import("../components/Blog/SingleBlog"), {
  ssr: false,
  loading: () => <Loader />,
});

// ===================== BACKGROUND EFFECTS =====================
const DATA_STREAM_CHARS = ['0', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0', '1', '1', '0'];

// CRT Scanline Effect Component
const CRTScanlines = () => (
  <>
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.08] mix-blend-screen" style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        #00FF41 2px,
        #00FF41 4px
      )`,
    }} aria-hidden="true" />
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay" style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0,255,65,0.3) 3px,
        rgba(0,255,65,0.3) 6px
      )`,
    }} aria-hidden="true" />
    <div className="fixed inset-0 pointer-events-none z-50 opacity-30" style={{
      background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)`,
    }} aria-hidden="true" />
  </>
);

// HUD Grid Overlay - Responsive
const HUDGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.15] sm:opacity-20 md:opacity-25" aria-hidden="true">
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        {/* Mobile: smaller grid */}
        <pattern id="projects-hud-grid-mobile" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00FF41" strokeWidth="0.3" opacity="0.3"/>
        </pattern>
        {/* Tablet: medium grid */}
        <pattern id="projects-hud-grid-tablet" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00FF41" strokeWidth="0.4" opacity="0.35"/>
        </pattern>
        {/* Desktop: large grid */}
        <pattern id="projects-hud-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FF41" strokeWidth="0.5" opacity="0.4"/>
        </pattern>
        {/* Small grid pattern */}
        <pattern id="projects-hud-grid-small-mobile" width="15" height="15" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#00FF41" strokeWidth="0.2" opacity="0.15"/>
        </pattern>
        <pattern id="projects-hud-grid-small" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#00FF41" strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="projects-grid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF41" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#00FF41" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#00FF41" stopOpacity="0.1" />
        </linearGradient>
        <filter id="projects-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Mobile grid */}
      <rect width="100%" height="100%" fill="url(#projects-hud-grid-mobile)" className="sm:hidden" />
      <rect width="100%" height="100%" fill="url(#projects-hud-grid-small-mobile)" className="sm:hidden" />
      {/* Tablet grid */}
      <rect width="100%" height="100%" fill="url(#projects-hud-grid-tablet)" className="hidden sm:block md:hidden" />
      <rect width="100%" height="100%" fill="url(#projects-hud-grid-small)" className="hidden sm:block md:hidden" />
      {/* Desktop grid */}
      <rect width="100%" height="100%" fill="url(#projects-hud-grid)" filter="url(#projects-glow)" className="hidden md:block" />
      <rect width="100%" height="100%" fill="url(#projects-hud-grid-small)" className="hidden md:block" />
      {/* Glow overlay */}
      <rect width="100%" height="100%" fill="url(#projects-grid-glow)" className="hidden md:block" />
    </svg>
  </div>
);

// Floating Data Stream Component - Responsive
const DataStream = ({ delay, left, speed = 8, charCount = 25 }: { delay: number; left: string; speed?: number; charCount?: number }) => {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    // Initialize with random chars - this only runs on client
    const stream = Array.from({ length: charCount }, () => 
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
  }, [charCount]);
  
  // Don't render until chars are initialized (client-side only)
  if (chars.length === 0) {
    return null;
  }
  
  return (
    <div 
      className="absolute text-[#00FF41]/30 sm:text-[#00FF41]/35 md:text-[#00FF41]/40 font-mono text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] pointer-events-none select-none"
      style={{ 
        left, 
        top: '-10%',
        animation: `dataStream ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
        textShadow: '0 0 3px rgba(0,255,65,0.3), 0 0 6px rgba(0,255,65,0.2)',
        filter: 'blur(0.3px)'
      }}
      aria-hidden="true"
    >
      {chars.map((char, i) => (
        <span 
          key={i} 
          style={{ 
            opacity: i < 3 ? 0.15 : i > chars.length - 4 ? 0.15 : 0.5,
            textShadow: i % 2 === 0 ? '0 0 2px rgba(0,255,65,0.6)' : 'none'
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

// Decorative Circles - Responsive
const DecorativeCircles = () => (
  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[250px] h-[220px] xs:w-[300px] xs:h-[260px] sm:w-[450px] sm:h-[390px] md:w-[600px] md:h-[525px] lg:w-[800px] lg:h-[700px] opacity-8 xs:opacity-10 sm:opacity-12 md:opacity-15 lg:opacity-20 pointer-events-none z-0">
    <svg width="100%" height="100%" viewBox="0 0 800 700" fill="none" preserveAspectRatio="xMidYMid meet">
      <circle cx="400" cy="350" r="240" fill="rgba(0,255,65,0.08)" className="opacity-60 sm:opacity-80 md:opacity-100" />
      <circle cx="630" cy="150" r="100" fill="rgba(0,255,65,0.06)" className="opacity-60 sm:opacity-80 md:opacity-100" />
      <circle cx="120" cy="480" r="70" fill="rgba(0,255,65,0.04)" className="opacity-60 sm:opacity-80 md:opacity-100" />
    </svg>
  </div>
);

const ProjectsClient = () => {
  const [projects, setProjects] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (window.innerWidth > 768) {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 72,
        y: (e.clientY / window.innerHeight - 0.5) * 72,
      });
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/data/projects.json");
        if (!res.ok) throw new Error('Failed to load projects');
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Invalid response content type");
        }
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e.message || 'Could not load projects.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Extract unique first tags from projects
  const categories = useMemo(() => {
    const firstTags = projects
      .map(project => project.tags && project.tags.length > 0 ? project.tags[0].trim() : null)
      .filter((tag): tag is string => tag !== null && tag !== '');
    return Array.from(new Set(firstTags)).sort();
  }, [projects]);

  // Filter projects by selected category
  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return projects;
    return projects.filter(project => {
      const firstTag = project.tags && project.tags.length > 0 ? project.tags[0].trim() : '';
      return firstTag === selectedCategory;
    });
  }, [projects, selectedCategory]);

  useEffect(() => {
    if (!sectionRef.current || loading || error) return;
    const cards = sectionRef.current.querySelectorAll('.project-card');
    if (cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 32, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.13, duration: 0.7, ease: 'power3.out', delay: 0.15 }
    );
  }, [filteredProjects, loading, error]);

  return (
    <>
      <Breadcrumb
        pageName="Projects"
        description="A showcase of my featured web & mobile projects, open-source work, and experiments. Click to learn more about each."
      />
      <section
        ref={sectionRef}
        className="relative z-10 isolate min-h-screen overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#050a08] flex flex-col items-center"
        suppressHydrationWarning
      >
        {/* Background Effects */}
        <CRTScanlines />
        <HUDGrid />
        
        {/* Animated Scanning Lines - Responsive */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
          {/* Primary scanline - thicker on desktop */}
          <div className="absolute w-full h-[1px] sm:h-[1.5px] md:h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-40 sm:opacity-45 md:opacity-50" style={{
            animation: 'scanLine 4s linear infinite',
            boxShadow: '0 0 8px #00FF41, 0 0 15px #00FF41, 0 0 25px rgba(0,255,65,0.2)',
            filter: 'blur(0.3px)'
          }}></div>
          {/* Secondary scanline */}
          <div className="absolute w-full h-[0.5px] sm:h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent opacity-30 sm:opacity-35 md:opacity-40" style={{
            animation: 'scanLine 6s linear infinite',
            animationDelay: '2s',
            boxShadow: '0 0 5px #00FF41, 0 0 10px rgba(0,255,65,0.3)'
          }}></div>
          {/* Tertiary scanline - hidden on mobile */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-25 md:opacity-30 hidden sm:block" style={{
            animation: 'scanLine 8s linear infinite',
            animationDelay: '4s',
            boxShadow: '0 0 3px rgba(0,255,65,0.2)'
          }}></div>
        </div>
        
        {/* Floating Data Streams - Responsive count and positioning */}
        {mounted && (
          <div suppressHydrationWarning>
            {/* Mobile: Show 4 streams */}
            <div className="sm:hidden">
              {[0, 1, 2, 3].map((i) => (
                <DataStream 
                  key={`mobile-${i}`}
                  delay={i * 0.8} 
                  left={`${15 + i * 20}%`}
                  speed={7 + (i % 2) * 2}
                  charCount={18}
                />
              ))}
            </div>
            {/* Tablet: Show 6 streams */}
            <div className="hidden sm:block lg:hidden">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <DataStream 
                  key={`tablet-${i}`}
                  delay={i * 0.8} 
                  left={`${12 + (i % 6) * 14}%`}
                  speed={7 + (i % 2) * 2}
                  charCount={20}
                />
              ))}
            </div>
            {/* Desktop: Show 8 streams */}
            <div className="hidden lg:block">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <DataStream 
                  key={`desktop-${i}`}
                  delay={i * 0.8} 
                  left={`${8 + i * 12}%`}
                  speed={7 + (i % 3) * 2}
                  charCount={25}
                />
              ))}
            </div>
          </div>
        )}
        
        <DecorativeCircles />
        
        {/* Parallax Background Glows - Responsive */}
        <div className="absolute left-[5%] top-[14%] w-32 h-32 xs:w-40 xs:h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[radial-gradient(circle,rgba(0,255,65,0.12)_0%,transparent_75%)] rounded-full pointer-events-none blur-2xl sm:blur-3xl z-10 will-change-transform opacity-40 xs:opacity-50 sm:opacity-65 md:opacity-80 lg:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.45}px,${mousePosition.y * 0.41}px,0)` }} aria-hidden />
        <div className="absolute right-[5%] xs:right-[8%] sm:right-[10%] bottom-[5%] w-[120px] h-[75px] xs:w-[150px] xs:h-[95px] sm:w-[220px] sm:h-[140px] md:w-[300px] md:h-[190px] lg:w-[380px] lg:h-[240px] bg-[radial-gradient(circle,rgba(0,255,65,0.08)_0%,transparent_80%)] rounded-full pointer-events-none blur-2xl sm:blur-3xl z-10 will-change-transform opacity-40 xs:opacity-50 sm:opacity-65 md:opacity-80 lg:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.19}px,${mousePosition.y * 0.08}px,0)` }} aria-hidden />

        {/* Section Heading - Cyberpunk Style - Responsive */}
        <header className="mb-8 mt-4 xs:mb-10 xs:mt-6 sm:mb-12 sm:mt-8 md:mb-16 md:mt-12 flex flex-col items-center text-center w-full px-3 xs:px-4 sm:px-6 relative z-20">
          <div className="relative inline-block">
            {/* Corner brackets - Responsive sizing */}
            <div className="absolute -top-1 xs:-top-1.5 sm:-top-2 -left-3 xs:-left-3.5 sm:-left-4 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 border-t-[1.5px] xs:border-t-2 border-l-[1.5px] xs:border-l-2 border-[#00FF41]/50 sm:border-[#00FF41]/60" />
            <div className="absolute -top-1 xs:-top-1.5 sm:-top-2 -right-3 xs:-right-3.5 sm:-right-4 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 border-t-[1.5px] xs:border-t-2 border-r-[1.5px] xs:border-r-2 border-[#00FF41]/50 sm:border-[#00FF41]/60" />
            <div className="absolute -bottom-1 xs:-bottom-1.5 sm:-bottom-2 -left-3 xs:-left-3.5 sm:-left-4 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 border-b-[1.5px] xs:border-b-2 border-l-[1.5px] xs:border-l-2 border-[#00FF41]/50 sm:border-[#00FF41]/60" />
            <div className="absolute -bottom-1 xs:-bottom-1.5 sm:-bottom-2 -right-3 xs:-right-3.5 sm:-right-4 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 border-b-[1.5px] xs:border-b-2 border-r-[1.5px] xs:border-r-2 border-[#00FF41]/50 sm:border-[#00FF41]/60" />
            
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#00FF41] font-mono tracking-tight sm:tracking-normal drop-shadow-[0_0_6px_rgba(0,255,65,0.4)] sm:drop-shadow-[0_0_8px_rgba(0,255,65,0.5)] relative z-10 px-1.5 xs:px-2 leading-tight sm:leading-normal">
              {'[ PROJECTS PORTFOLIO ]'}
            </h1>
          </div>
          
          <p className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300/85 sm:text-gray-300/90 max-w-[95%] xs:max-w-md sm:max-w-lg md:max-w-2xl mx-auto font-mono leading-relaxed px-3 xs:px-4 sm:px-2">
            Explore my web/mobile projects, client work, and experiments – using React, Next.js, Node.js, TypeScript, and more.
          </p>
          
          {/* Decorative line - Responsive */}
          <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 w-20 xs:w-24 sm:w-28 md:w-32 h-[0.5px] xs:h-px bg-gradient-to-r from-transparent via-[#00FF41]/50 xs:via-[#00FF41]/60 to-transparent" />
        </header>

        {/* Category Filter Buttons - Cyberpunk Style */}
        {categories.length > 0 && (
          <div className="w-full max-w-7xl mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 mb-6 xs:mb-8 sm:mb-10 md:mb-12 relative z-20">
            <div className="flex flex-col items-center gap-3 xs:gap-4">
              {/* Section Label */}
              <span className="text-xs xs:text-sm font-mono font-semibold uppercase tracking-wider text-[#00ff41]/70">
                [FILTER_BY_CATEGORY]
              </span>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-2 xs:gap-3 sm:gap-4">
                {/* All Button */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`group relative inline-flex items-center justify-center min-h-[44px] px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 
                    rounded-sm border text-sm xs:text-base font-mono font-medium transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 focus:ring-offset-[#050805]
                    will-change-transform ${
                      !selectedCategory
                        ? 'border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.4)]'
                        : 'border-[#00ff41]/30 bg-[#0a0a0a] text-[#788293] hover:border-[#00ff41] hover:text-[#00ff41] hover:bg-[#00ff41]/10 hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:scale-105 active:scale-100'
                    }`}
                  aria-label="Show all projects"
                  aria-pressed={!selectedCategory}
                >
                  <span className="relative z-10">[ALL]</span>
                  {!selectedCategory && (
                    <span className="absolute inset-0 rounded-sm bg-[#00ff41]/5 blur-md pointer-events-none" />
                  )}
                </button>

                {/* Category Buttons */}
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`group relative inline-flex items-center justify-center min-h-[44px] px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 
                      rounded-sm border text-sm xs:text-base font-mono font-medium transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 focus:ring-offset-[#050805]
                      will-change-transform ${
                        selectedCategory === category
                          ? 'border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.4)]'
                          : 'border-[#00ff41]/30 bg-[#0a0a0a] text-[#788293] hover:border-[#00ff41] hover:text-[#00ff41] hover:bg-[#00ff41]/10 hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:scale-105 active:scale-100'
                      }`}
                    aria-label={`Filter by ${category}`}
                    aria-pressed={selectedCategory === category}
                  >
                    <span className="relative z-10">{category}</span>
                    {selectedCategory === category && (
                      <span className="absolute inset-0 rounded-sm bg-[#00ff41]/5 blur-md pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Projects Grid - Cyberpunk HUD Layout - Responsive */}
        <div className="w-full max-w-7xl mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 pb-12 xs:pb-14 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 relative z-20">
          <div
            className={[
              "grid gap-3.5 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8",
              "grid-cols-1",
              "xs:max-w-[360px] xs:mx-auto",
              "sm:grid-cols-2 sm:max-w-none",
              "md:grid-cols-2",
              "lg:grid-cols-3",
              "xl:grid-cols-4",
              "justify-items-center",
              "auto-rows-fr"
            ].join(" ")}
          >
            {loading ? (
              <div className="col-span-full flex items-center justify-center h-[160px] xs:h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]">
                <div className="relative">
                  <Loader />
                  <div className="absolute -inset-3 xs:-inset-3.5 sm:-inset-4 border border-[#00FF41]/20 rounded animate-pulse" />
                </div>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-6 xs:py-7 sm:py-8 md:py-10 lg:py-12">
                <div className="inline-block px-3 xs:px-4 sm:px-5 md:px-6 py-2.5 xs:py-3 sm:py-3.5 md:py-4 border border-red-500/50 bg-red-500/10 backdrop-blur-sm rounded">
                  <p className="text-red-400 font-mono font-semibold text-xs xs:text-sm sm:text-base md:text-lg tracking-wide">
                    {'[ ERROR ] '}{error}
                  </p>
                </div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-6 xs:py-7 sm:py-8 md:py-10 lg:py-12">
                <div className="inline-block px-3 xs:px-4 sm:px-5 md:px-6 py-2.5 xs:py-3 sm:py-3.5 md:py-4 border border-[#00FF41]/30 bg-[#00FF41]/5 backdrop-blur-sm rounded">
                  <p className="text-white/70 font-mono text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-wide">
                    {'[ NO DATA ] No projects found. Try again later!'}
                  </p>
                </div>
              </div>
            ) : (
              filteredProjects.map((blog, index) => (
                <article
                  key={index}
                  className="project-card w-full max-w-full xs:max-w-[320px] sm:max-w-[340px] md:max-w-[365px] relative group"
                >
                  {/* HUD Corner Brackets - Responsive */}
                  <div className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-t-[1.5px] xs:border-t-2 border-l-[1.5px] xs:border-l-2 border-[#00FF41]/35 sm:border-[#00FF41]/40 group-hover:border-[#00FF41] transition-all duration-200 z-30" />
                  <div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-t-[1.5px] xs:border-t-2 border-r-[1.5px] xs:border-r-2 border-[#00FF41]/35 sm:border-[#00FF41]/40 group-hover:border-[#00FF41] transition-all duration-200 z-30" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-b-[1.5px] xs:border-b-2 border-l-[1.5px] xs:border-l-2 border-[#00FF41]/35 sm:border-[#00FF41]/40 group-hover:border-[#00FF41] transition-all duration-200 z-30" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-b-[1.5px] xs:border-b-2 border-r-[1.5px] xs:border-r-2 border-[#00FF41]/35 sm:border-[#00FF41]/40 group-hover:border-[#00FF41] transition-all duration-200 z-30" />

                  {/* Scanline overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudScan transition-opacity duration-200 pointer-events-none z-20 rounded" />

                  {/* Glow border effect */}
                  <div className="absolute -inset-[1px] bg-[#00FF41]/0 group-hover:bg-[#00FF41]/20 blur-sm transition-all duration-200 rounded -z-10" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <SingleBlog blog={blog} />
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Cyberpunk Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        
        .project-card {
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
        }
        
        .project-card:hover,
        .project-card:focus-within {
          transform: translateY(-8px) scale(1.02);
          outline: none;
        }
        
        .project-card:focus-visible {
          outline: 2px solid #00FF41;
          outline-offset: 4px;
        }

        @keyframes hudScan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .animate-hudScan {
          animation: hudScan 0.8s ease-out;
        }

        /* Responsive adjustments */
        @media (max-width: 475px) {
          .project-card:hover,
          .project-card:focus-within {
            transform: translateY(-4px) scale(1.01);
          }
        }
        
        @media (min-width: 476px) and (max-width: 639px) {
          .project-card:hover,
          .project-card:focus-within {
            transform: translateY(-6px) scale(1.015);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .project-card {
            transition: none;
          }
          
          .project-card:hover,
          .project-card:focus-within {
            transform: none;
          }
          
          .animate-hudScan {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectsClient;
