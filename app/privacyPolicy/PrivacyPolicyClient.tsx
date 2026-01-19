"use client";

import { useState, useEffect, memo } from "react";
import Breadcrumb from "../components/Common/Breadcrumb";

// Background effects constants
const DATA_STREAM_CHARS = ['0', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0', '1', '1', '0'];

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
      className="absolute text-[#00FF41]/25 sm:text-[#00FF41]/30 md:text-[#00FF41]/35 font-mono text-[8px] sm:text-[10px] tracking-[0.2em] pointer-events-none select-none"
      style={{ 
        left, 
        top: '-10%',
        animation: `dataStream ${speed}s linear ${delay}s infinite`,
        textShadow: '0 0 3px rgba(0,255,65,0.3), 0 0 6px rgba(0,255,65,0.2)',
      }}
      aria-hidden="true"
    >
      {chars.map((char, i) => (
        <span 
          key={i} 
          style={{ 
            opacity: i < 3 ? 0.1 : i > chars.length - 4 ? 0.1 : 0.4,
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
  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] md:w-[1000px] md:h-[1000px] opacity-5 sm:opacity-8 md:opacity-10 pointer-events-none z-0">
    <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none">
      <circle cx="500" cy="500" r="300" fill="rgba(0,255,65,0.06)" />
      <circle cx="750" cy="250" r="150" fill="rgba(0,255,65,0.04)" />
      <circle cx="200" cy="750" r="100" fill="rgba(0,255,65,0.03)" />
      <circle cx="800" cy="700" r="120" fill="rgba(0,255,65,0.03)" />
    </svg>
  </div>
));
DecorativeCircles.displayName = "DecorativeCircles";

// Floating Particles
const FloatingParticle = ({ delay, left, size, duration }: { delay: number; left: string; size: number; duration: number }) => (
  <div
    className="absolute rounded-full bg-[#00FF41] pointer-events-none"
    style={{
      left,
      width: `${size}px`,
      height: `${size}px`,
      opacity: Math.random() * 0.3 + 0.1,
      animation: `floatParticle ${duration}s ease-in-out ${delay}s infinite`,
      boxShadow: `0 0 ${size * 2}px rgba(0, 255, 65, 0.5)`,
    }}
    aria-hidden="true"
  />
);

const PrivacyPolicyClient = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set first section as active on mount
    setActiveSection("intro");
  }, []);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "intro",
        "information-collection",
        "use-of-information",
        "data-sharing",
        "cookies",
        "security",
        "your-rights",
        "contact",
      ];
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "information-collection", title: "Information Collection" },
    { id: "use-of-information", title: "Use of Information" },
    { id: "data-sharing", title: "Data Sharing" },
    { id: "cookies", title: "Cookies" },
    { id: "security", title: "Security" },
    { id: "your-rights", title: "Your Rights" },
    { id: "contact", title: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Privacy Policy" description="" />

      <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#050805] to-[#0a0a0a]">
        {/* Background HUD Effects */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          {/* Enhanced Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.1]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="privacy-grid-primary" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#00FF41"
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                </pattern>
                <pattern id="privacy-grid-secondary" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path
                    d="M 25 0 L 0 0 0 25"
                    fill="none"
                    stroke="#00FF41"
                    strokeWidth="0.3"
                    opacity="0.2"
                  />
                </pattern>
                <linearGradient id="privacy-grid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF41" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#00FF41" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#00FF41" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#privacy-grid-primary)" />
              <rect width="100%" height="100%" fill="url(#privacy-grid-secondary)" />
              <rect width="100%" height="100%" fill="url(#privacy-grid-glow)" />
            </svg>
          </div>

          {/* Decorative Circles */}
          <DecorativeCircles />

          {/* Subtle background gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.04)_0%,_transparent_70%)]" />
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,65,0.03)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,255,65,0.03)_0%,_transparent_50%)]" />

          {/* Enhanced Scanlines */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 65, 0.15) 2px,
                rgba(0, 255, 65, 0.15) 4px
              )`,
            }}
          />

          {/* Multiple Scanning Lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div
              className="absolute w-full h-[1px] sm:h-[1.5px] md:h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-30 sm:opacity-35 md:opacity-40"
              style={{
                animation: "scanLine 4s linear 0s infinite",
                boxShadow: "0 0 8px #00FF41, 0 0 15px #00FF41, 0 0 25px rgba(0,255,65,0.2)",
              }}
            />
            <div
              className="absolute w-full h-[0.5px] sm:h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/60 to-transparent opacity-25 sm:opacity-30 md:opacity-35"
              style={{
                animation: "scanLine 6s linear 2s infinite",
                boxShadow: "0 0 5px #00FF41, 0 0 10px rgba(0,255,65,0.3)",
              }}
            />
            <div
              className="absolute w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent opacity-20"
              style={{
                animation: "scanLine 8s linear 4s infinite",
                boxShadow: "0 0 3px rgba(0,255,65,0.2)",
              }}
            />
          </div>

          {/* Floating Data Streams */}
          {mounted && (
            <div suppressHydrationWarning>
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <DataStream 
                  key={i} 
                  delay={i * 1.5} 
                  left={`${8 + i * 12}%`}
                  speed={8 + (i % 3) * 2}
                />
              ))}
            </div>
          )}

          {/* Floating Particles/Orbs */}
          {mounted && (
            <div suppressHydrationWarning>
              {Array.from({ length: 12 }).map((_, i) => (
                <FloatingParticle
                  key={i}
                  delay={i * 0.8}
                  left={`${Math.random() * 100}%`}
                  size={Math.random() * 4 + 2}
                  duration={Math.random() * 10 + 15}
                />
              ))}
            </div>
          )}

          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.08)_0%,_transparent_70%)] blur-3xl opacity-20 animate-pulse-slow" aria-hidden />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.06)_0%,_transparent_70%)] blur-2xl opacity-15" aria-hidden />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.05)_0%,_transparent_70%)] blur-xl opacity-10" aria-hidden />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
            {/* Table of Contents - Sticky Sidebar - Moved More Left */}
            <aside className="lg:w-56 xl:w-64 lg:flex-shrink-0 lg:-ml-4 xl:-ml-6">
              <nav
                aria-label="Table of contents"
                className="sticky top-8 bg-black/50 backdrop-blur-md border border-[#00FF41]/30 p-4 sm:p-6 rounded-sm hover:border-[#00FF41]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  boxShadow: "0 0 20px rgba(0, 255, 65, 0.1), inset 0 0 20px rgba(0, 255, 65, 0.05)",
                }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00FF41]/80 via-[#00FF41]/40 to-transparent" />
                <h2 className="text-xs sm:text-sm font-mono text-[#00FF41] mb-6 tracking-wider uppercase relative">
                  <span className="absolute -left-2 top-0 bottom-0 w-0.5 bg-[#00FF41]/60"></span>
                  [NAVIGATION]
                </h2>
                <ul className="space-y-1.5">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm font-mono transition-all duration-300 rounded-sm relative overflow-hidden group ${
                          activeSection === section.id
                            ? "text-[#00FF41] bg-[#00FF41]/15 border-l-2 border-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.2)]"
                            : "text-gray-400 hover:text-[#00FF41]/90 hover:bg-[#00FF41]/8 hover:border-l-2 hover:border-[#00FF41]/50"
                        }`}
                        aria-current={activeSection === section.id ? "page" : undefined}
                      >
                        <span className={`${activeSection === section.id ? "text-[#00FF41]" : "text-[#00FF41]/50 group-hover:text-[#00FF41]/70"} transition-colors duration-300`}>
                          {String(index + 1).padStart(2, "0")}.
                        </span>{" "}
                        <span className="ml-1">{section.title}</span>
                        {activeSection === section.id && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#00FF41] opacity-60 animate-pulse">▸</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Content Area - Wider Responsive Width */}
            <main className="flex-1 max-w-none lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
              {/* Terminal Window Container */}
              <article
                className="bg-black/70 backdrop-blur-md border border-[#00FF41]/30 p-6 sm:p-8 lg:p-12 rounded-sm relative hover:border-[#00FF41]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,65,0.25)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  boxShadow: "0 0 30px rgba(0, 255, 65, 0.15), inset 0 0 30px rgba(0, 255, 65, 0.05)",
                }}
              >
                {/* Corner Brackets */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00FF41] opacity-40" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#00FF41] opacity-40" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#00FF41] opacity-40" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00FF41] opacity-40" />

                {/* Terminal Header */}
                <div className="mb-10 pb-8 border-b border-[#00FF41]/25 relative">
                  <div className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-[#00FF41] to-transparent"></div>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-mono text-[#00FF41] tracking-tight group-hover:tracking-wider transition-all duration-300">
                      [PRIVACY_POLICY]
                    </h1>
                    <div className="text-xs sm:text-sm font-mono text-[#00FF41]/70 flex items-center gap-2 px-3 py-1.5 bg-[#00FF41]/5 rounded-sm border border-[#00FF41]/20">
                      <span className="animate-pulse text-[#00FF41]">●</span>
                      <span>[LAST_UPDATED: {new Date().toISOString().split("T")[0]}]</span>
                    </div>
                  </div>
                </div>

                {/* Introduction Section */}
                <section
                  id="intro"
                  className="mb-16 scroll-mt-8 group relative"
                  onMouseEnter={() => setActiveSection("intro")}
                >
                  <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF41]/60 via-[#00FF41]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="pl-6 group-hover:pl-8 transition-all duration-300">
                    <p
                      className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      style={{
                        maxWidth: "70ch",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        lineHeight: "1.8",
                      }}
                    >
                      Your privacy is important. This page explains what information may be collected while using
                      my portfolio website and how it is used.
                    </p>
                  </div>
                </section>

                {/* Information Collection Section */}
                <section
                  id="information-collection"
                  className="mb-16 scroll-mt-8 group relative"
                  onMouseEnter={() => setActiveSection("information-collection")}
                >
                  <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF41]/60 via-[#00FF41]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="pl-6 group-hover:pl-8 transition-all duration-300">
                    <div className="mb-8">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-4 relative inline-block group-hover:tracking-wider transition-all duration-300">
                        <span className="absolute -left-8 sm:-left-10 text-[#00FF41]/50 font-mono">01.</span>
                        Information Collection
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/60 to-transparent w-full group-hover:w-[120%] transition-all duration-500"
                          style={{
                            boxShadow: "0 0 8px rgba(0, 255, 65, 0.5)",
                          }}
                        />
                      </h2>
                    </div>
                    <ul
                      className="space-y-5 text-gray-300 leading-relaxed"
                      style={{
                        maxWidth: "70ch",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        lineHeight: "1.8",
                      }}
                    >
                      <li className="relative pl-8 before:content-['▸'] before:absolute before:left-0 before:text-[#00FF41]/70 before:font-mono before:text-lg group-hover:before:text-[#00FF41] transition-colors duration-300">
                        <span className="font-semibold text-[#00FF41]/90 group-hover:text-[#00FF41] transition-colors duration-300">Personal Data</span>{" "}
                        <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">–</span> Collected only if you voluntarily
                        provide it via the contact form (name, email, message).
                      </li>
                      <li className="relative pl-8 before:content-['▸'] before:absolute before:left-0 before:text-[#00FF41]/70 before:font-mono before:text-lg group-hover:before:text-[#00FF41] transition-colors duration-300">
                        <span className="font-semibold text-[#00FF41]/90 group-hover:text-[#00FF41] transition-colors duration-300">Automatic Data</span>{" "}
                        <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">–</span> Like most websites, this portfolio
                        may use basic analytics tools (e.g., Google Analytics) that collect anonymous information
                        such as IP address, browser type, and time of visit.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Use of Information Section */}
                <section
                  id="use-of-information"
                  className="mb-16 scroll-mt-8 group relative"
                  onMouseEnter={() => setActiveSection("use-of-information")}
                >
                  <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF41]/60 via-[#00FF41]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="pl-6 group-hover:pl-8 transition-all duration-300">
                    <div className="mb-8">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-4 relative inline-block group-hover:tracking-wider transition-all duration-300">
                        <span className="absolute -left-8 sm:-left-10 text-[#00FF41]/50 font-mono">02.</span>
                        Use of Information
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/60 to-transparent w-full group-hover:w-[120%] transition-all duration-500"
                          style={{
                            boxShadow: "0 0 8px rgba(0, 255, 65, 0.5)",
                          }}
                        />
                      </h2>
                    </div>
                    <ul
                      className="space-y-5 text-gray-300 leading-relaxed"
                      style={{
                        maxWidth: "70ch",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        lineHeight: "1.8",
                      }}
                    >
                      <li className="relative pl-8 before:content-['▸'] before:absolute before:left-0 before:text-[#00FF41]/70 before:font-mono before:text-lg group-hover:before:text-[#00FF41] transition-colors duration-300 group-hover:text-gray-200">
                        To respond to messages sent through the contact form.
                      </li>
                      <li className="relative pl-8 before:content-['▸'] before:absolute before:left-0 before:text-[#00FF41]/70 before:font-mono before:text-lg group-hover:before:text-[#00FF41] transition-colors duration-300 group-hover:text-gray-200">
                        To understand how visitors use the site and improve its content and functionality.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Data Sharing Section */}
                <section
                  id="data-sharing"
                  className="mb-16 scroll-mt-8 group relative"
                  onMouseEnter={() => setActiveSection("data-sharing")}
                >
                  <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF41]/60 via-[#00FF41]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="pl-6 group-hover:pl-8 transition-all duration-300">
                    <div className="mb-8">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-4 relative inline-block group-hover:tracking-wider transition-all duration-300">
                        <span className="absolute -left-8 sm:-left-10 text-[#00FF41]/50 font-mono">03.</span>
                        Data Sharing
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/60 to-transparent w-full group-hover:w-[120%] transition-all duration-500"
                          style={{
                            boxShadow: "0 0 8px rgba(0, 255, 65, 0.5)",
                          }}
                        />
                      </h2>
                    </div>
                    <p
                      className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      style={{
                        maxWidth: "70ch",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        lineHeight: "1.8",
                      }}
                    >
                      Your personal data is <span className="font-semibold text-[#00FF41]/90 group-hover:text-[#00FF41] transition-colors duration-300 px-1 bg-[#00FF41]/5 rounded-sm">not shared</span> with third parties and
                      is not used for marketing purposes.
                    </p>
                  </div>
                </section>

                {/* Cookies Section */}
                <section
                  id="cookies"
                  className="mb-16 scroll-mt-8 group relative"
                  onMouseEnter={() => setActiveSection("cookies")}
                >
                  <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF41]/60 via-[#00FF41]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="pl-6 group-hover:pl-8 transition-all duration-300">
                    <div className="mb-8">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-4 relative inline-block group-hover:tracking-wider transition-all duration-300">
                        <span className="absolute -left-8 sm:-left-10 text-[#00FF41]/50 font-mono">04.</span>
                        Cookies
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/60 to-transparent w-full group-hover:w-[120%] transition-all duration-500"
                          style={{
                            boxShadow: "0 0 8px rgba(0, 255, 65, 0.5)",
                          }}
                        />
                      </h2>
                    </div>
                    <p
                      className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      style={{
                        maxWidth: "70ch",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        lineHeight: "1.8",
                      }}
                    >
                      This website may use cookies for basic functionality and analytics. You can disable cookies
                      in your browser settings at any time.
                    </p>
                  </div>
                </section>

                {/* Security Section */}
                <section
                  id="security"
                  className="mb-16 scroll-mt-8 group relative"
                  onMouseEnter={() => setActiveSection("security")}
                >
                  <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF41]/60 via-[#00FF41]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="pl-6 group-hover:pl-8 transition-all duration-300">
                    <div className="mb-8">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-4 relative inline-block group-hover:tracking-wider transition-all duration-300">
                        <span className="absolute -left-8 sm:-left-10 text-[#00FF41]/50 font-mono">05.</span>
                        Security
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/60 to-transparent w-full group-hover:w-[120%] transition-all duration-500"
                          style={{
                            boxShadow: "0 0 8px rgba(0, 255, 65, 0.5)",
                          }}
                        />
                      </h2>
                    </div>
                    <p
                      className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      style={{
                        maxWidth: "70ch",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        lineHeight: "1.8",
                      }}
                    >
                      Reasonable measures are taken to protect your data, but please note that no internet
                      transmission is <span className="font-semibold text-[#00FF41]/90 group-hover:text-[#00FF41] transition-colors duration-300 px-1 bg-[#00FF41]/5 rounded-sm">100% secure</span>.
                    </p>
                  </div>
                </section>

                {/* Your Rights Section */}
                <section
                  id="your-rights"
                  className="mb-16 scroll-mt-8 group relative"
                  onMouseEnter={() => setActiveSection("your-rights")}
                >
                  <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF41]/60 via-[#00FF41]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="pl-6 group-hover:pl-8 transition-all duration-300">
                    <div className="mb-8">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-4 relative inline-block group-hover:tracking-wider transition-all duration-300">
                        <span className="absolute -left-8 sm:-left-10 text-[#00FF41]/50 font-mono">06.</span>
                        Your Rights
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/60 to-transparent w-full group-hover:w-[120%] transition-all duration-500"
                          style={{
                            boxShadow: "0 0 8px rgba(0, 255, 65, 0.5)",
                          }}
                        />
                      </h2>
                    </div>
                    <p
                      className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      style={{
                        maxWidth: "70ch",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        lineHeight: "1.8",
                      }}
                    >
                      You may request the <span className="font-semibold text-[#00FF41]/90 group-hover:text-[#00FF41] transition-colors duration-300 px-1 bg-[#00FF41]/5 rounded-sm">deletion</span> of any personal information you submitted via the contact
                      form at any time.
                    </p>
                  </div>
                </section>

                {/* Contact Section */}
                <section
                  id="contact"
                  className="mb-12 scroll-mt-8 group relative"
                  onMouseEnter={() => setActiveSection("contact")}
                >
                  <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF41]/60 via-[#00FF41]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="pl-6 group-hover:pl-8 transition-all duration-300">
                    <div className="mb-8">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-4 relative inline-block group-hover:tracking-wider transition-all duration-300">
                        <span className="absolute -left-8 sm:-left-10 text-[#00FF41]/50 font-mono">07.</span>
                        Contact
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF41]/60 to-transparent w-full group-hover:w-[120%] transition-all duration-500"
                          style={{
                            boxShadow: "0 0 8px rgba(0, 255, 65, 0.5)",
                          }}
                        />
                      </h2>
                    </div>
                    <p
                      className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      style={{
                        maxWidth: "70ch",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        lineHeight: "1.8",
                      }}
                    >
                      For any privacy-related questions, feel free to contact me via the email address provided
                      on this website.
                    </p>
                  </div>
                </section>

                {/* Footer Divider */}
                <div className="mt-12 pt-8 border-t border-[#00FF41]/20">
                  <div className="text-xs font-mono text-[#00FF41]/40 text-center">
                    [END_OF_DOCUMENT]
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>

      {/* Print Styles & Animations */}
      <style jsx global>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(20px) scale(1);
            opacity: 0;
          }
        }

        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.05); 
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        @media print {
          .bg-gradient-to-b,
          .bg-black\/60,
          .backdrop-blur-sm,
          aside,
          nav {
            background: white !important;
            color: black !important;
            border: 1px solid #000 !important;
          }
          
          .text-\\[\\#00FF41\\],
          .text-\\[\\#00FF41\\]\\/60,
          .text-\\[\\#00FF41\\]\\/50,
          .text-\\[\\#00FF41\\]\\/40 {
            color: black !important;
          }
          
          .text-gray-300,
          .text-gray-400 {
            color: #333 !important;
          }
          
          aside,
          nav {
            display: none !important;
          }
          
          article {
            box-shadow: none !important;
            border: 1px solid #000 !important;
          }
          
          h1, h2 {
            color: black !important;
            text-shadow: none !important;
          }
        }
        
        @media (max-width: 1023px) {
          aside {
            position: relative !important;
            top: auto !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow,
          [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default PrivacyPolicyClient;

