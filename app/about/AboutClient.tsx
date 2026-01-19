"use client";

import Image from "next/image";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

/* ===================== TIMELINE DATA ===================== */
const timelineData = [
  {
    period: "2019–2023",
    title: "Technical HS, Information Technology, Novi Pazar",
    colorClass: "bg-[#00FF41] ring-[#00FF41]/25",
    textClass: "text-[#00FF41]",
    highlights: [
      "Basics of programming, hardware and networks",
      "Built Arduino- and Raspberry Pi-based robots",
      "Organized school's first open hackathon",
      "First hands-on experience with teamwork under pressure",
    ],
    body:
      "Graduated as an Information Technology Technician, blending hardware and software. Built a strong foundation in networks, scripting, troubleshooting, and teamwork through competitions and real projects.",
  },
  {
    period: "2023–Present",
    title: "University of Novi Pazar",
    colorClass: "bg-[#00FF41]/75 ring-[#00FF41]/20",
    textClass: "text-[#00FF41]",
    highlights: [
      "Web Tech, Systems Programming, Database Management, AI and Machine Learning, Software Engineering, and more",
      "C#, C++ Python, Java, SQL, NoSQLand more",
      "Hackathons & faculty leadership",
    ],
    body:
      "Computer Science student focused on algorithms, distributed systems, and modern web engineering. Passionate about teaching, mentoring, and applying theory to production-grade systems.",
  },
  {
    period: "2023–2024",
    title: "Freelancer & Tech Consultant",
    colorClass: "bg-yellow-300 ring-yellow-400/20",
    textClass: "text-yellow-300",
    highlights: [
      "Clear communication & long-term maintainability",
      "MVP → scale mindset",
      "EU / US early-stage SaaS clients",
    ],
    body:
      "Delivered tailored solutions for startups and remote teams, focusing on scalability, UX, and clean handoff. Strong emphasis on documentation and future-proof architecture.",
  },
  {
    period: "2024–Now",
    title: "Professional Full-Stack Developer",
    colorClass: "bg-[#00FF41]/95 ring-[#00FF41]/15",
    textClass: "text-[#00FF41]",
    highlights: [
      "Mentored junior developers",
      "Open-source contributor",
      "SaaS, mobile & internal tools",
      "Remote international teams",
    ],
    body:
      "Building and shipping production web and mobile products using React, Next.js, Node.js and TypeScript with strong focus on quality, testing and performance.",
  },
];

/* ===================== TIMELINE ===================== */
const Timeline = () => (
  <section className="relative w-full">
    <h2 className="font-mono text-[#00FF41] text-xl mb-8 flex items-center gap-3">
      <span className="text-[#00FF41]/50">[</span>
      <span>JOURNEY</span>
      <span className="text-[#00FF41]/50">]</span>
      <div className="flex-1 h-px bg-gradient-to-r from-[#00FF41]/40 to-transparent"></div>
    </h2>
    
    <div className="relative">
      {/* Vertical timeline connector line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF41]/60 via-[#00FF41]/30 to-transparent hidden md:block"></div>
      
      <ol className="relative space-y-10 md:space-y-12">
        {timelineData.map((item, index) => (
          <li key={item.period} className="relative">
            {/* Timeline dot */}
            <div className="absolute left-0 top-6 w-12 h-12 hidden md:flex items-center justify-center z-10">
              <div className={`w-4 h-4 rounded-full ${item.colorClass} ring-4 ring-black ring-offset-2 ring-offset-black transition-all duration-300 group-hover:scale-125 group-hover:ring-[#00FF41]/50`}></div>
            </div>
            
            <article
              className="group relative bg-black/60 border border-[#00FF41]/30 backdrop-blur-xl p-6 md:p-8 md:ml-16 transition-all duration-500 hover:border-[#00FF41] hover:bg-black/80 hover:shadow-[0_0_40px_rgba(0,255,65,0.4)] hover:-translate-y-1"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              ></div>
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <h3
                    className={`font-mono font-bold text-lg sm:text-xl ${item.textClass} transition-colors duration-300`}
                  >
                    <span className="text-[#00FF41]/60 mr-3 font-normal">
                      [{item.period}]
                    </span>
                    {item.title}
                  </h3>
                </div>

                <p className="mt-2 text-gray-300/90 font-mono text-sm sm:text-base leading-relaxed mb-5">
                  {item.body}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-[#00FF41]/20 pt-4">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-sm font-mono text-[#00FF41]/80 flex gap-3 items-start group/item"
                    >
                      <span className="text-[#00FF41]/60 group-hover/item:text-[#00FF41] transition-colors duration-300 mt-0.5">▶</span>
                      <span className="flex-1 group-hover/item:text-[#00FF41] transition-colors duration-300">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#00FF41]/20 group-hover:border-[#00FF41]/50 transition-colors duration-300"></div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ===================== TECH STACK ===================== */
const techStack = [
  { src: "/images/models/javascript.svg", label: "JavaScript" },
  { src: "/images/models/typescript.svg", label: "TypeScript" },
  { src: "/images/models/react.svg", label: "React" },
  { src: "/images/models/nextjs.svg", label: "Next.js" },
  { src: "/images/models/nodejs.svg", label: "Node.js" },
  { src: "/images/models/tailwindcss.svg", label: "TailwindCSS" },
  { src: "/images/models/mongodb.svg", label: "MongoDB" },
  { src: "/images/models/mysql.svg", label: "MySQL" },
  { src: "/images/models/amazonAWS.svg", label: "AWS" },
];

const TechStack = () => (
  <section className="w-full">
    <h2 className="font-mono text-[#00FF41] text-xl mb-8 flex items-center gap-3">
      <span className="text-[#00FF41]/50">[</span>
      <span>TECH STACK</span>
      <span className="text-[#00FF41]/50">]</span>
      <div className="flex-1 h-px bg-gradient-to-r from-[#00FF41]/40 to-transparent"></div>
    </h2>

    <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6">
      {techStack.map((t) => (
        <li 
          key={t.label} 
          className="group flex flex-col items-center p-4 sm:p-6 bg-black/40 border border-[#00FF41]/20 rounded-lg backdrop-blur-sm transition-all duration-300 hover:border-[#00FF41] hover:bg-black/60 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:-translate-y-1"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          <div className="relative mb-3 transform transition-all duration-300 group-hover:scale-110">
            <Image
              src={t.src}
              alt={t.label}
              width={48}
              height={48}
              className="drop-shadow-[0_0_10px_rgba(0,255,65,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,65,0.9)] transition-all duration-300"
            />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-[#00FF41]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
          <span className="text-xs sm:text-sm font-mono text-gray-400 group-hover:text-[#00FF41]/80 transition-colors duration-300 text-center">
            {t.label}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

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

// HUD Grid Overlay
const HUDGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-10 opacity-25" aria-hidden="true">
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id="about-hud-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FF41" strokeWidth="0.5" opacity="0.4"/>
        </pattern>
        <pattern id="about-hud-grid-small" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#00FF41" strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="about-grid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF41" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#00FF41" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00FF41" stopOpacity="0.15" />
        </linearGradient>
        <filter id="about-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#about-hud-grid)" filter="url(#about-glow)" />
      <rect width="100%" height="100%" fill="url(#about-hud-grid-small)" />
      <rect width="100%" height="100%" fill="url(#about-grid-glow)" />
    </svg>
  </div>
);

// Floating Data Stream Component
const DataStream = ({ delay, left, speed = 8 }: { delay: number; left: string; speed?: number }) => {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    // Initialize with random chars - this only runs on client
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
  
  // Don't render until chars are initialized (client-side only)
  if (chars.length === 0) {
    return null;
  }
  
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
};

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

/* ===================== ABOUT CLIENT ===================== */
const AboutClient = () => {
  const contentRef = useRef<HTMLDivElement>(null);
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
    
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(contentRef.current!.children), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "all",
      });
    }, contentRef);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className="relative w-full min-h-screen bg-[#000000] bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#050a08] overflow-hidden" suppressHydrationWarning>
      {/* Background Effects */}
      <CRTScanlines />
      <HUDGrid />
      
      {/* Animated Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-50" style={{
          animation: 'scanLine 4s linear infinite',
          boxShadow: '0 0 15px #00FF41, 0 0 30px #00FF41, 0 0 45px rgba(0,255,65,0.3)',
          filter: 'blur(0.5px)'
        }}></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent opacity-40" style={{
          animation: 'scanLine 6s linear infinite',
          animationDelay: '2s',
          boxShadow: '0 0 8px #00FF41, 0 0 16px rgba(0,255,65,0.4)'
        }}></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-30" style={{
          animation: 'scanLine 8s linear infinite',
          animationDelay: '4s',
          boxShadow: '0 0 5px rgba(0,255,65,0.3)'
        }}></div>
      </div>
      
      {/* Floating Data Streams - Only render after mount to prevent hydration mismatch */}
      <div suppressHydrationWarning>
        {mounted && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <DataStream 
            key={i} 
            delay={i * 0.8} 
            left={`${8 + i * 12}%`}
            speed={7 + (i % 3) * 2}
          />
        ))}
      </div>
      
      <DecorativeCircles />
      
      {/* Parallax Background Glows */}
      <div className="absolute left-[5%] top-[14%] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[radial-gradient(circle,rgba(0,255,65,0.15)_0%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform opacity-50 sm:opacity-75 md:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.45}px,${mousePosition.y * 0.41}px,0)` }} aria-hidden />
      <div className="absolute right-[10%] bottom-[5%] w-[190px] h-[120px] sm:w-[280px] sm:h-[180px] md:w-[380px] md:h-[240px] bg-[radial-gradient(circle,rgba(0,255,65,0.1)_0%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform opacity-50 sm:opacity-75 md:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.19}px,${mousePosition.y * 0.08}px,0)` }} aria-hidden />

      <Breadcrumb
        pageName="About Me"
        description="Curious by nature. Driven by building."
      />

      <main
        ref={contentRef}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-20 z-20"
      >
        {/* HEADER */}
        <section className="max-w-3xl font-mono relative">
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#00FF41] mb-6 font-bold leading-tight">
              <span className="text-[#00FF41]/50">[</span> Hello, I'm Mehmed Muric <span className="text-[#00FF41]/50">]</span>
            </h1>
            <p className="text-gray-300/90 text-base sm:text-lg leading-relaxed max-w-2xl">
              Software Engineer focused on scalable systems, clean UX and production-ready code.
            </p>
            {/* Decorative line */}
            <div className="mt-6 h-px w-32 bg-gradient-to-r from-[#00FF41]/60 to-transparent"></div>
          </div>
        </section>

        <Timeline />
        <TechStack />
      </main>
    </div>
  );
};

export default AboutClient;
