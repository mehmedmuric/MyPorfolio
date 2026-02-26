"use client";

import { useState, useEffect, memo } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";

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

const TermsOfUseClient = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
    setActiveSection("intro");
    setVisibleSections(new Set(["intro"]));
  }, []);

  // Enhanced scroll spy with intersection observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "intro",
        "use-of-content",
        "accuracy",
        "external-links",
        "limitation",
        "changes",
        "contact",
      ];

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Active section detection
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      // Intersection observer for fade-in animations
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            setVisibleSections((prev) => new Set(prev).add(sectionId));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Intersection Observer for better performance
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    const sections = [
      "intro",
      "use-of-content",
      "accuracy",
      "external-links",
      "limitation",
      "changes",
      "contact",
    ];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "use-of-content", title: "Use of Content" },
    { id: "accuracy", title: "Accuracy of Information" },
    { id: "external-links", title: "External Links" },
    { id: "limitation", title: "Limitation of Liability" },
    { id: "changes", title: "Changes to Terms" },
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
      <Breadcrumb pageName="Terms of Use" description="" />

      <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#050805] to-[#0a0a0a]">
        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-[#00FF41]/10 z-50" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-[#00FF41] via-[#00FF88] to-[#00FF41] transition-all duration-150"
            style={{ width: `${scrollProgress}%`, boxShadow: "0 0 10px rgba(0, 255, 65, 0.8)" }}
          />
        </div>

        {/* Background HUD Effects */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          {/* Enhanced Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.1]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="terms-grid-primary" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#00FF41"
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                </pattern>
                <pattern id="terms-grid-secondary" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path
                    d="M 25 0 L 0 0 0 25"
                    fill="none"
                    stroke="#00FF41"
                    strokeWidth="0.3"
                    opacity="0.2"
                  />
                </pattern>
                <linearGradient id="grid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF41" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#00FF41" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#00FF41" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#terms-grid-primary)" />
              <rect width="100%" height="100%" fill="url(#terms-grid-secondary)" />
              <rect width="100%" height="100%" fill="url(#grid-glow)" />
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
                animation: "scanLine 4s linear infinite",
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
            {/* Table of Contents - Enhanced Sticky Sidebar */}
            <aside className="lg:w-56 xl:w-64 lg:flex-shrink-0 lg:-ml-4 xl:-ml-6">
              <nav
                aria-label="Table of contents"
                className="sticky top-8 bg-black/50 backdrop-blur-md border border-[#00FF41]/30 p-4 sm:p-6 rounded-sm transition-all duration-300 hover:border-[#00FF41]/50 hover:shadow-[0_0_30px_rgba(0,255,65,0.15)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  boxShadow: "0 0 20px rgba(0, 255, 65, 0.1), inset 0 0 20px rgba(0, 255, 65, 0.05)",
                }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00FF41] via-[#00FF88] to-transparent opacity-60" />
                <h2 className="text-sm font-mono text-[#00FF41] mb-6 tracking-wider uppercase flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-[#00FF41] animate-pulse" />
                  [NAVIGATION]
                </h2>
                <ul className="space-y-1.5">
                  {sections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    const isVisible = visibleSections.has(section.id);
                    return (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`group relative w-full text-left px-3 py-2.5 text-sm font-mono transition-all duration-300 rounded-sm ${isActive
                              ? "text-[#00FF41] bg-[#00FF41]/15 border-l-2 border-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.2)]"
                              : "text-gray-400 hover:text-[#00FF41] hover:bg-[#00FF41]/8 hover:border-l-2 hover:border-[#00FF41]/50"
                            } ${isVisible ? "opacity-100 translate-x-0" : "opacity-60 translate-x-[-4px]"}`}
                          aria-current={isActive ? "page" : undefined}
                          style={{
                            transitionDelay: `${index * 50}ms`,
                          }}
                        >
                          <span className={`inline-block transition-all duration-300 ${isActive ? "text-[#00FF41]" : "text-[#00FF41]/50 group-hover:text-[#00FF41]/80"}`}>
                            {String(index + 1).padStart(2, "0")}.
                          </span>{" "}
                          <span className="relative">
                            {section.title}
                            {isActive && (
                              <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-[#00FF41] animate-pulse" />
                            )}
                          </span>
                          {isActive && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#00FF41] opacity-60 animate-pulse">
                              ▶
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* Main Content Area - Wider Responsive Width */}
            <main className="flex-1 max-w-none lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
              {/* Terminal Window Container */}
              <article
                className="bg-black/70 backdrop-blur-md border border-[#00FF41]/40 p-6 sm:p-8 lg:p-12 rounded-sm relative transition-all duration-300 hover:border-[#00FF41]/60 hover:shadow-[0_0_40px_rgba(0,255,65,0.2)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  boxShadow: "0 0 30px rgba(0, 255, 65, 0.15), inset 0 0 30px rgba(0, 255, 65, 0.05)",
                }}
              >
                {/* Enhanced Corner Brackets */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00FF41] opacity-50" style={{ animation: "pulse-slow 4s ease-in-out 0s infinite", boxShadow: "0 0 8px rgba(0, 255, 65, 0.3)" }} />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#00FF41] opacity-50" style={{ animation: "pulse-slow 4s ease-in-out 0.5s infinite", boxShadow: "0 0 8px rgba(0, 255, 65, 0.3)" }} />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#00FF41] opacity-50" style={{ animation: "pulse-slow 4s ease-in-out 1s infinite", boxShadow: "0 0 8px rgba(0, 255, 65, 0.3)" }} />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00FF41] opacity-50" style={{ animation: "pulse-slow 4s ease-in-out 1.5s infinite", boxShadow: "0 0 8px rgba(0, 255, 65, 0.3)" }} />

                {/* Terminal Header */}
                <div className="mb-10 pb-6 border-b border-[#00FF41]/30 relative">
                  <div className="absolute -bottom-[1px] left-0 w-24 h-[2px] bg-gradient-to-r from-[#00FF41] to-transparent" />
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-[#00FF41] tracking-tight relative">
                        [TERMS_OF_USE]
                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#00FF41] opacity-50" />
                      </h1>
                      <span className="inline-block w-2 h-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-[#00FF41]/70 flex items-center gap-2 px-3 py-1.5 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-sm">
                      <span className="animate-pulse text-[#00FF41]">●</span>
                      <span>[LAST_UPDATED: {new Date().toISOString().split("T")[0]}]</span>
                    </div>
                  </div>
                </div>

                {/* Introduction Section */}
                <section
                  id="intro"
                  className={`mb-16 scroll-mt-8 transition-all duration-700 ${visibleSections.has("intro")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                    }`}
                  onMouseEnter={() => setActiveSection("intro")}
                >
                  <div className="relative pl-6 border-l-2 border-[#00FF41]/30 mb-6">
                    <div className="absolute -left-[2px] top-0 w-2 h-2 bg-[#00FF41] rounded-full animate-pulse" />
                    <p
                      className="text-gray-200 leading-relaxed text-base sm:text-lg"
                      style={{
                        maxWidth: "70ch",
                        lineHeight: "1.8",
                      }}
                    >
                      By accessing and using this portfolio website, you agree to comply with and be
                      bound by the following terms and conditions. If you do not agree with these
                      terms, please refrain from using the site.
                    </p>
                  </div>
                </section>

                {/* Use of Content Section */}
                <section
                  id="use-of-content"
                  className={`mb-16 scroll-mt-8 transition-all duration-700 ${visibleSections.has("use-of-content")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                    }`}
                  onMouseEnter={() => setActiveSection("use-of-content")}
                >
                  <div className="mb-6 group">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-6 relative inline-block group-hover:text-[#00FF88] transition-colors duration-300">
                      <span className="absolute -left-10 text-[#00FF41]/60 font-mono text-lg">01.</span>
                      <span className="relative inline-block">
                        Use of Content
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF88] to-transparent transition-all duration-300 group-hover:w-full"
                          style={{
                            boxShadow: "0 0 10px rgba(0, 255, 65, 0.6), 0 0 20px rgba(0, 255, 65, 0.3)",
                          }}
                        />
                      </span>
                    </h2>
                  </div>
                  <div className="pl-6 border-l-2 border-[#00FF41]/20 hover:border-[#00FF41]/40 transition-colors duration-300">
                    <p
                      className="text-gray-200 leading-relaxed text-base sm:text-lg"
                      style={{
                        maxWidth: "70ch",
                        lineHeight: "1.8",
                      }}
                    >
                      All content on this website, including text, code snippets, images, and
                      projects, is provided for informational and portfolio purposes only. You may
                      not copy, redistribute, or use the content without prior permission.
                    </p>
                  </div>
                </section>

                {/* Accuracy of Information Section */}
                <section
                  id="accuracy"
                  className={`mb-16 scroll-mt-8 transition-all duration-700 ${visibleSections.has("accuracy")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                    }`}
                  onMouseEnter={() => setActiveSection("accuracy")}
                >
                  <div className="mb-6 group">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-6 relative inline-block group-hover:text-[#00FF88] transition-colors duration-300">
                      <span className="absolute -left-10 text-[#00FF41]/60 font-mono text-lg">02.</span>
                      <span className="relative inline-block">
                        Accuracy of Information
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF88] to-transparent transition-all duration-300 group-hover:w-full"
                          style={{
                            boxShadow: "0 0 10px rgba(0, 255, 65, 0.6), 0 0 20px rgba(0, 255, 65, 0.3)",
                          }}
                        />
                      </span>
                    </h2>
                  </div>
                  <div className="pl-6 border-l-2 border-[#00FF41]/20 hover:border-[#00FF41]/40 transition-colors duration-300">
                    <p
                      className="text-gray-200 leading-relaxed text-base sm:text-lg"
                      style={{
                        maxWidth: "70ch",
                        lineHeight: "1.8",
                      }}
                    >
                      While I strive to keep the information up to date and accurate, I make no
                      guarantees of completeness, reliability, or suitability of any content for
                      specific purposes.
                    </p>
                  </div>
                </section>

                {/* External Links Section */}
                <section
                  id="external-links"
                  className={`mb-16 scroll-mt-8 transition-all duration-700 ${visibleSections.has("external-links")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                    }`}
                  onMouseEnter={() => setActiveSection("external-links")}
                >
                  <div className="mb-6 group">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-6 relative inline-block group-hover:text-[#00FF88] transition-colors duration-300">
                      <span className="absolute -left-10 text-[#00FF41]/60 font-mono text-lg">03.</span>
                      <span className="relative inline-block">
                        External Links
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF88] to-transparent transition-all duration-300 group-hover:w-full"
                          style={{
                            boxShadow: "0 0 10px rgba(0, 255, 65, 0.6), 0 0 20px rgba(0, 255, 65, 0.3)",
                          }}
                        />
                      </span>
                    </h2>
                  </div>
                  <div className="pl-6 border-l-2 border-[#00FF41]/20 hover:border-[#00FF41]/40 transition-colors duration-300">
                    <p
                      className="text-gray-200 leading-relaxed text-base sm:text-lg"
                      style={{
                        maxWidth: "70ch",
                        lineHeight: "1.8",
                      }}
                    >
                      This website may contain links to third-party websites. I am not responsible for
                      the content, accuracy, or practices of external sites and encourage you to
                      review their own terms and policies.
                    </p>
                  </div>
                </section>

                {/* Limitation of Liability Section */}
                <section
                  id="limitation"
                  className={`mb-16 scroll-mt-8 transition-all duration-700 ${visibleSections.has("limitation")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                    }`}
                  onMouseEnter={() => setActiveSection("limitation")}
                >
                  <div className="mb-6 group">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-6 relative inline-block group-hover:text-[#00FF88] transition-colors duration-300">
                      <span className="absolute -left-10 text-[#00FF41]/60 font-mono text-lg">04.</span>
                      <span className="relative inline-block">
                        Limitation of Liability
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF88] to-transparent transition-all duration-300 group-hover:w-full"
                          style={{
                            boxShadow: "0 0 10px rgba(0, 255, 65, 0.6), 0 0 20px rgba(0, 255, 65, 0.3)",
                          }}
                        />
                      </span>
                    </h2>
                  </div>
                  <div className="pl-6 border-l-2 border-[#00FF41]/20 hover:border-[#00FF41]/40 transition-colors duration-300">
                    <p
                      className="text-gray-200 leading-relaxed text-base sm:text-lg"
                      style={{
                        maxWidth: "70ch",
                        lineHeight: "1.8",
                      }}
                    >
                      I shall not be held liable for any direct, indirect, or consequential damages
                      arising from the use of this website, including reliance on its content or
                      technical issues.
                    </p>
                  </div>
                </section>

                {/* Changes to Terms Section */}
                <section
                  id="changes"
                  className={`mb-16 scroll-mt-8 transition-all duration-700 ${visibleSections.has("changes")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                    }`}
                  onMouseEnter={() => setActiveSection("changes")}
                >
                  <div className="mb-6 group">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-6 relative inline-block group-hover:text-[#00FF88] transition-colors duration-300">
                      <span className="absolute -left-10 text-[#00FF41]/60 font-mono text-lg">05.</span>
                      <span className="relative inline-block">
                        Changes to Terms
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF88] to-transparent transition-all duration-300 group-hover:w-full"
                          style={{
                            boxShadow: "0 0 10px rgba(0, 255, 65, 0.6), 0 0 20px rgba(0, 255, 65, 0.3)",
                          }}
                        />
                      </span>
                    </h2>
                  </div>
                  <div className="pl-6 border-l-2 border-[#00FF41]/20 hover:border-[#00FF41]/40 transition-colors duration-300">
                    <p
                      className="text-gray-200 leading-relaxed text-base sm:text-lg"
                      style={{
                        maxWidth: "70ch",
                        lineHeight: "1.8",
                      }}
                    >
                      These terms may be updated from time to time. By continuing to use the site
                      after changes are made, you accept the revised terms.
                    </p>
                  </div>
                </section>

                {/* Contact Section */}
                <section
                  id="contact"
                  className={`mb-12 scroll-mt-8 transition-all duration-700 ${visibleSections.has("contact")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                    }`}
                  onMouseEnter={() => setActiveSection("contact")}
                >
                  <div className="mb-6 group">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[#00FF41] mb-6 relative inline-block group-hover:text-[#00FF88] transition-colors duration-300">
                      <span className="absolute -left-10 text-[#00FF41]/60 font-mono text-lg">06.</span>
                      <span className="relative inline-block">
                        Contact
                        <span
                          className="block mt-3 h-[2px] bg-gradient-to-r from-[#00FF41] via-[#00FF88] to-transparent transition-all duration-300 group-hover:w-full"
                          style={{
                            boxShadow: "0 0 10px rgba(0, 255, 65, 0.6), 0 0 20px rgba(0, 255, 65, 0.3)",
                          }}
                        />
                      </span>
                    </h2>
                  </div>
                  <div className="pl-6 border-l-2 border-[#00FF41]/20 hover:border-[#00FF41]/40 transition-colors duration-300">
                    <p
                      className="text-gray-200 leading-relaxed text-base sm:text-lg"
                      style={{
                        maxWidth: "70ch",
                        lineHeight: "1.8",
                      }}
                    >
                      If you have any questions regarding these Terms of Use, please contact me
                      through the email address provided on this website.
                    </p>
                  </div>
                </section>

                {/* Footer Divider */}
                <div className="mt-16 pt-8 border-t border-[#00FF41]/30 relative">
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent" />
                  <div className="text-xs sm:text-sm font-mono text-[#00FF41]/50 text-center flex items-center justify-center gap-2">
                    <span className="inline-block w-1 h-1 bg-[#00FF41] rounded-full" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 0s infinite" }} />
                    [END_OF_DOCUMENT]
                    <span className="inline-block w-1 h-1 bg-[#00FF41] rounded-full" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite" }} />
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

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Section fade-in animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Enhanced navigation hover effects */
        nav button:hover {
          transform: translateX(4px);
        }

        nav button:active {
          transform: translateX(2px);
        }

        /* Section content hover effect */
        section:hover {
          border-left-color: rgba(0, 255, 65, 0.4) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow,
          [style*="animation"],
          html {
            animation: none !important;
            scroll-behavior: auto !important;
          }
          
          section {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default TermsOfUseClient;

