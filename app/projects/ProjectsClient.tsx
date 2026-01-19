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

        {/* Section Heading - Modern Cyberpunk Style - Responsive */}
        <header className="mb-10 mt-6 xs:mb-12 xs:mt-8 sm:mb-16 sm:mt-10 md:mb-20 md:mt-14 flex flex-col items-center text-center w-full px-3 xs:px-4 sm:px-6 relative z-20">
          <div className="relative inline-block">
            {/* Modern decorative elements */}
            <div className="absolute -top-2 xs:-top-3 sm:-top-4 -left-4 xs:-left-5 sm:-left-6 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5">
              <div className="absolute inset-0 border-t-2 border-l-2 border-[#00FF41]/40"></div>
              <div className="absolute inset-0 border-t-2 border-l-2 border-[#00FF41] blur-sm opacity-50"></div>
            </div>
            <div className="absolute -top-2 xs:-top-3 sm:-top-4 -right-4 xs:-right-5 sm:-right-6 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5">
              <div className="absolute inset-0 border-t-2 border-r-2 border-[#00FF41]/40"></div>
              <div className="absolute inset-0 border-t-2 border-r-2 border-[#00FF41] blur-sm opacity-50"></div>
            </div>
            <div className="absolute -bottom-2 xs:-bottom-3 sm:-bottom-4 -left-4 xs:-left-5 sm:-left-6 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5">
              <div className="absolute inset-0 border-b-2 border-l-2 border-[#00FF41]/40"></div>
              <div className="absolute inset-0 border-b-2 border-l-2 border-[#00FF41] blur-sm opacity-50"></div>
            </div>
            <div className="absolute -bottom-2 xs:-bottom-3 sm:-bottom-4 -right-4 xs:-right-5 sm:-right-6 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5">
              <div className="absolute inset-0 border-b-2 border-r-2 border-[#00FF41]/40"></div>
              <div className="absolute inset-0 border-b-2 border-r-2 border-[#00FF41] blur-sm opacity-50"></div>
            </div>
            
            <h1 className="relative z-10 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] via-[#39FF6D] to-[#00FF41] font-mono tracking-tight sm:tracking-normal px-2 xs:px-3 sm:px-4 leading-tight sm:leading-tight drop-shadow-[0_0_10px_rgba(0,255,65,0.5)] sm:drop-shadow-[0_0_15px_rgba(0,255,65,0.6)]">
              <span className="relative inline-block">
                PROJECTS PORTFOLIO
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-60"></span>
              </span>
            </h1>
          </div>
          
          <p className="mt-5 xs:mt-6 sm:mt-8 md:mt-10 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300/80 sm:text-gray-300/85 md:text-gray-300/90 max-w-[95%] xs:max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto font-sans leading-relaxed px-3 xs:px-4 sm:px-2 font-light">
            Explore my web/mobile projects, client work, and experiments – built with React, Next.js, Node.js, TypeScript, and modern technologies.
          </p>
          
          {/* Modern decorative line - Responsive */}
          <div className="mt-5 xs:mt-6 sm:mt-8 md:mt-10 flex items-center gap-3 xs:gap-4 sm:gap-6">
            <div className="h-px w-12 xs:w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent to-[#00FF41]/60"></div>
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-[#00FF41]/80 shadow-[0_0_8px_rgba(0,255,65,0.6)]"></div>
            <div className="h-px w-12 xs:w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent to-[#00FF41]/60"></div>
          </div>
        </header>

        {/* Category Filter Buttons - Modern Cyberpunk Style */}
        {categories.length > 0 && (
          <div className="w-full max-w-7xl mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 mb-8 xs:mb-10 sm:mb-12 md:mb-16 relative z-20">
            <div className="flex flex-col items-center gap-4 xs:gap-5 sm:gap-6">
              {/* Section Label - Modern Design */}
              <div className="flex items-center gap-3 xs:gap-4">
                <div className="h-px w-8 xs:w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#00ff41]/50"></div>
                <span className="text-xs xs:text-sm sm:text-base font-mono font-semibold uppercase tracking-[0.15em] text-[#00ff41]/80">
                  Filter by Category
                </span>
                <div className="h-px w-8 xs:w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#00ff41]/50"></div>
              </div>
              
              {/* Filter Buttons - Glassmorphism Design */}
              <div className="flex flex-wrap justify-center items-center gap-3 xs:gap-4 sm:gap-5">
                {/* All Button */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`group relative inline-flex items-center justify-center min-h-[46px] xs:min-h-[48px] px-5 xs:px-6 sm:px-7 py-2.5 xs:py-3 
                    rounded-lg border backdrop-blur-sm text-sm xs:text-base font-medium transition-all duration-300 ease-out
                    focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 focus:ring-offset-[#050805]
                    will-change-transform ${
                      !selectedCategory
                        ? 'border-[#00ff41] bg-[#00ff41]/15 text-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.5),inset_0_0_20px_rgba(0,255,65,0.05)] backdrop-blur-md'
                        : 'border-[#00ff41]/20 bg-[#0a0a0a]/60 text-gray-400 hover:border-[#00ff41]/60 hover:text-[#00ff41] hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:scale-105 active:scale-95'
                    }`}
                  aria-label="Show all projects"
                  aria-pressed={!selectedCategory}
                >
                  <span className="relative z-10 font-mono tracking-wide">All Projects</span>
                  {!selectedCategory && (
                    <>
                      <span className="absolute inset-0 rounded-lg bg-[#00ff41]/10 blur-xl pointer-events-none animate-pulse" />
                      <span className="absolute -inset-[1px] rounded-lg bg-[#00ff41]/20 blur-sm pointer-events-none" />
                    </>
                  )}
                </button>

                {/* Category Buttons */}
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`group relative inline-flex items-center justify-center min-h-[46px] xs:min-h-[48px] px-5 xs:px-6 sm:px-7 py-2.5 xs:py-3 
                      rounded-lg border backdrop-blur-sm text-sm xs:text-base font-medium transition-all duration-300 ease-out
                      focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 focus:ring-offset-[#050805]
                      will-change-transform ${
                        selectedCategory === category
                          ? 'border-[#00ff41] bg-[#00ff41]/15 text-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.5),inset_0_0_20px_rgba(0,255,65,0.05)] backdrop-blur-md'
                          : 'border-[#00ff41]/20 bg-[#0a0a0a]/60 text-gray-400 hover:border-[#00ff41]/60 hover:text-[#00ff41] hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:scale-105 active:scale-95'
                      }`}
                    aria-label={`Filter by ${category}`}
                    aria-pressed={selectedCategory === category}
                  >
                    <span className="relative z-10 font-mono tracking-wide">{category.replace(/^[\s-]+/, '')}</span>
                    {selectedCategory === category && (
                      <>
                        <span className="absolute inset-0 rounded-lg bg-[#00ff41]/10 blur-xl pointer-events-none animate-pulse" />
                        <span className="absolute -inset-[1px] rounded-lg bg-[#00ff41]/20 blur-sm pointer-events-none" />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Projects Grid - Modern Layout - Responsive */}
        <div className="w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pb-16 xs:pb-18 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32 relative z-20">
          <div
            className={[
              "grid gap-5 xs:gap-6 sm:gap-7 md:gap-8 lg:gap-9 xl:gap-10",
              "grid-cols-1",
              "xs:max-w-[380px] xs:mx-auto",
              "sm:grid-cols-2 sm:max-w-none",
              "md:grid-cols-2",
              "lg:grid-cols-3",
              "xl:grid-cols-3 2xl:grid-cols-4",
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
                  className="project-card w-full max-w-full xs:max-w-[350px] sm:max-w-[360px] md:max-w-[380px] relative group"
                >
                  {/* Modern Glassmorphism Border */}
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#00FF41]/20 via-[#00FF41]/10 to-[#00FF41]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm z-0" />
                  
                  {/* Corner accent dots - Modern Design */}
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#00FF41]/30 group-hover:bg-[#00FF41] group-hover:shadow-[0_0_12px_rgba(0,255,65,0.8)] transition-all duration-300 z-30" />
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00FF41]/30 group-hover:bg-[#00FF41] group-hover:shadow-[0_0_12px_rgba(0,255,65,0.8)] transition-all duration-300 z-30" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#00FF41]/30 group-hover:bg-[#00FF41] group-hover:shadow-[0_0_12px_rgba(0,255,65,0.8)] transition-all duration-300 z-30" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#00FF41]/30 group-hover:bg-[#00FF41] group-hover:shadow-[0_0_12px_rgba(0,255,65,0.8)] transition-all duration-300 z-30" />

                  {/* Glow overlay on hover - Modern effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-lg" />

                  {/* Subtle scanline effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudScan transition-opacity duration-300 pointer-events-none z-20 rounded-lg" />

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
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s ease-out;
        }
        
        .project-card:hover,
        .project-card:focus-within {
          transform: translateY(-12px) scale(1.03);
          outline: none;
        }
        
        .project-card:focus-visible {
          outline: 2px solid #00FF41;
          outline-offset: 6px;
          border-radius: 12px;
        }

        @keyframes hudScan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .animate-hudScan {
          animation: hudScan 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Responsive adjustments */
        @media (max-width: 475px) {
          .project-card:hover,
          .project-card:focus-within {
            transform: translateY(-6px) scale(1.02);
          }
        }
        
        @media (min-width: 476px) and (max-width: 639px) {
          .project-card:hover,
          .project-card:focus-within {
            transform: translateY(-8px) scale(1.025);
          }
        }
        
        @media (min-width: 1920px) {
          .project-card:hover,
          .project-card:focus-within {
            transform: translateY(-14px) scale(1.04);
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
