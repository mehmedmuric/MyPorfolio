'use client';

import { useEffect, useState, useCallback } from 'react';

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

// HUD Grid Overlay
const HUDGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-10 opacity-25" aria-hidden="true">
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id="blog-hud-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FF41" strokeWidth="0.5" opacity="0.4"/>
        </pattern>
        <pattern id="blog-hud-grid-small" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#00FF41" strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="blog-grid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF41" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#00FF41" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00FF41" stopOpacity="0.15" />
        </linearGradient>
        <filter id="blog-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#blog-hud-grid)" filter="url(#blog-glow)" />
      <rect width="100%" height="100%" fill="url(#blog-hud-grid-small)" />
      <rect width="100%" height="100%" fill="url(#blog-grid-glow)" />
    </svg>
  </div>
);

// Decorative Circles
const DecorativeCircles = () => (
  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[400px] h-[350px] sm:w-[600px] sm:h-[525px] md:w-[800px] md:h-[700px] opacity-10 sm:opacity-15 md:opacity-20 pointer-events-none z-0">
    <svg width="100%" height="100%" viewBox="0 0 800 700" fill="none">
      <circle cx="400" cy="350" r="240" fill="rgba(0,255,65,0.08)" />
      <circle cx="630" cy="150" r="100" fill="rgba(0,255,65,0.06)" />
      <circle cx="120" cy="480" r="70" fill="rgba(0,255,65,0.04)" />
    </svg>
  </div>
);

// Parallax Background Glows
const ParallaxGlows = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => (
  <>
    <div className="absolute left-[5%] top-[14%] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[radial-gradient(circle,rgba(0,255,65,0.15)_0%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform opacity-50 sm:opacity-75 md:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.45}px,${mousePosition.y * 0.41}px,0)` }} aria-hidden />
    <div className="absolute right-[10%] bottom-[5%] w-[190px] h-[120px] sm:w-[280px] sm:h-[180px] md:w-[380px] md:h-[240px] bg-[radial-gradient(circle,rgba(0,255,65,0.1)_0%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform opacity-50 sm:opacity-75 md:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.19}px,${mousePosition.y * 0.08}px,0)` }} aria-hidden />
  </>
);

// Animated Scanning Lines
const ScanningLines = () => (
  <>
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes blogScanLine {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `
    }} />
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-50" style={{
        animation: 'blogScanLine 4s linear infinite',
        boxShadow: '0 0 15px #00FF41, 0 0 30px #00FF41, 0 0 45px rgba(0,255,65,0.3)',
        filter: 'blur(0.5px)'
      }}></div>
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent opacity-40" style={{
        animation: 'blogScanLine 6s linear infinite',
        animationDelay: '2s',
        boxShadow: '0 0 8px #00FF41, 0 0 16px rgba(0,255,65,0.4)'
      }}></div>
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-30" style={{
        animation: 'blogScanLine 8s linear infinite',
        animationDelay: '4s',
        boxShadow: '0 0 5px rgba(0,255,65,0.3)'
      }}></div>
    </div>
  </>
);

export default function BlogBackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

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

  return (
    <>
      <CRTScanlines />
      <HUDGrid />
      <ScanningLines />
      <DecorativeCircles />
      {mounted && <ParallaxGlows mousePosition={mousePosition} />}
    </>
  );
}

