"use client";

import Image from "next/image";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// ---------------- TIMELINE DATA ----------------
const timelineData = [
  {
    period: "2019–2023",
    title: "Technical HS, Information Technology, Novi Pazar",
    colorClass: "bg-mygreen ring-mygreen/25",
    textClass: "text-mygreen",
    highlights: [
      "Robotics Club Lead, IT Olympiad Finalist",
      "Built Arduino- and Raspberry Pi-based robots",
      "Organized school’s first open hackathon",
      "First hands-on experience with teamwork under pressure"
    ],
    body: "Graduated as an Information Technology Technician, blending hardware and software. Laid a foundation in computer networks, scripting, troubleshooting, and collaborative project execution through club participation and competitions.",
  },
  {
    period: "2023–Present",
    title: "University of Novi Pazar",
    colorClass: "bg-mygreen/75 ring-mygreen/20",
    textClass: "text-mygreen",
    highlights: [
      "Teaching Assistant (Web Tech, Systems Programming)",
      "Co-founded university’s peer study group",
      "Held workshops on React/Next.js for new students",
      "Hackathons & leadership in faculty projects"
    ],
    body: "Currently pursuing Computer Science, focusing on algorithms, distributed systems, and web engineering. A regular contributor to open source and student initiatives. Enthusiastic about teaching, mentoring, and applying theory to real-world apps.",
  },
  {
    period: "2023-2024",
    title: "Freelancer & Tech Consultant",
    colorClass: "bg-yellow-300 ring-yellow-400/20",
    textClass: "text-yellow-300",
    highlights: [
      "Focus on reliability and clear, transparent communication",
      "Enablement—creating docs, training, and handoff guides",
      "Bridging business vision to technology with empathy",
      "Clients include EU/US early-stage SaaS, e-Health, and fintech startups"
    ],
    body: "Delivering tailor-made solutions for founders and remote teams: from MVP prototyping to scaling, with special attention to maintainability and modern UX. My mission: empower clients, making tech accessible and sustainable."
  },
  {
    period: "2024–Now",
    title: "Professional Developer",
    colorClass: "bg-mygreen/95 ring-mygreen/15",
    textClass: "text-mygreen",
    highlights: [
      "Mentored junior developers; led standups and reviews",
      "Volunteer & open source contributor (Next.js, Astro)",
      "Built and shipped multi-platform products (React Native, SaaS, internal tools)",
      "Collaborated in distributed, international remote teams"
    ],
    body: "Delivered real-world web/mobile products for startups/SMBs across diverse industries—leveraging React, Next.js, Node.js, TypeScript, and devops best practices. Advocated for code quality, testing, and documentation in every project.",
  },
];

// ---------------- TIMELINE COMPONENT ----------------
const Timeline = () => (
  <ol className="relative border-l-2 border-mygreen/40 ml-2 mt-4 mb-10">
    {timelineData.map(({ period, title, colorClass, textClass, highlights, body }, idx) => (
      <li key={period + title} className={`mb-10 ml-6 relative ${idx === timelineData.length - 1 ? "mb-0" : ""}`}>
        <span
          className={`absolute -left-8 top-3 flex items-center justify-center w-5 h-5 rounded-full ring-4 ${colorClass}`}
          aria-hidden="true"
        />
        <h3 className={`font-semibold text-base md:text-lg ${textClass}`}>
          <span className="sr-only">Time period:</span>
          {period} <span className="sr-only">, </span>: {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-400">
          {body}
          {highlights && (
            <span className={`block mt-1 ${textClass === "text-yellow-300" ? "text-yellow-300/70" : "text-emerald-400/60"}`}>
              {highlights.map((h, hIdx) => (
                <span key={hIdx}>
                  • {h}{hIdx < highlights.length - 1 && <br />}
                </span>
              ))}
            </span>
          )}
        </p>
      </li>
    ))}
  </ol>
);

// ---------------- TECH STACK COMPONENT ----------------
const techStack = [
  { src: "/images/models/javascript.svg", label: "JavaScript" },
  { src: "/images/models/typescript.svg", label: "TypeScript" },
  { src: "/images/models/react.svg", label: "React" },
  { src: "/images/models/nextjs.svg", label: "Next.js" },
  { src: "/images/models/nodejs.svg", label: "Node.js" },
  { src: "/images/models/tailwindcss.svg", label: "TailwindCSS" },
  { src: "/images/models/materialui.svg", label: "Material UI" },
  { src: "/images/models/mongodb.svg", label: "MongoDB" },
  { src: "/images/models/mysql.svg", label: "MySQL" },
  { src: "/images/models/amazonAWS.svg", label: "AWS" }
];

const TechStack = () => (
  <section className="w-full flex flex-col items-center mt-3" aria-labelledby="tech-toolbox">
    <h2 id="tech-toolbox" className="font-semibold text-mygreen mb-2 text-lg md:text-xl tracking-widest">
      My Tech Toolbox
    </h2>
    <ul className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-3 xs:gap-4 sm:gap-5 md:gap-6 justify-center items-center w-full max-w-3xl">
      {techStack.map((item, i) => (
        <li
          key={item.label}
          className="flex flex-col items-center group transition-all duration-200 hover:scale-110"
          style={{ animation: `appearFadeIn 0.7s ${0.055 * i}s both` }}
          tabIndex={0}
          aria-label={item.label}
        >
          <Image
            src={item.src}
            alt={item.label}
            width={36}
            height={36}
            className="drop-shadow-glow-slim"
            draggable={false}
            loading={i < 4 ? "eager" : "lazy"}
          />
          <span className="text-[11px] md:text-xs text-gray-400 mt-1 text-center">{item.label}</span>
        </li>
      ))}
    </ul>
    <style jsx global>{`
      @keyframes appearFadeIn {
        from { opacity: 0; transform: scale(0.82); }
        to { opacity: 1; transform: scale(1); }
      }
      .drop-shadow-glow-slim { filter: drop-shadow(0 0 8px #00ff99a2); }
    `}</style>
  </section>
);

// ---------------- ABOUT CLIENT ----------------
const AboutClient = () => {
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!breadcrumbRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });
      tl.from(breadcrumbRef.current, { y: -30, opacity: 0 });
      tl.from(Array.from(contentRef.current.children), { y: 36, opacity: 0, stagger: 0.15 });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] bg-gradient-to-b from-[#0f1419] via-[#000000] to-[#051912] overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Animated Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scanLine" />
      </div>

      {/* Enhanced Parallax Background with Cyberpunk Glow */}
      <div className="absolute left-[5%] top-[14%] w-96 h-96 bg-[radial-gradient(circle,rgba(0,255,140,0.3)_0%,rgba(0,255,200,0.15)_40%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform animate-pulse" aria-hidden />
      <div className="absolute right-[10%] bottom-[5%] w-[380px] h-[240px] bg-[radial-gradient(circle,rgba(0,200,255,0.2)_0%,rgba(100,200,255,0.1)_40%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform" aria-hidden />
      
      {/* Cyberpunk Neon Accents */}
      <div className="absolute top-20 left-10 w-2 h-32 bg-gradient-to-b from-green-400 to-transparent opacity-60 blur-sm animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-60 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="px-4 pb-10 relative z-20">
        <div ref={breadcrumbRef}>
          <Breadcrumb
            pageName="About Me"
            description="Curious by nature. Driven by building. Enabling others. Welcome to my journey."
          />
        </div>

        <main
          ref={contentRef}
          className="mx-auto particles-bg overflow-hidden px-4 xs:px-5 sm:px-6 lg:px-8 py-7 sm:py-14 md:py-20 lg:py-28 isolate flex flex-col items-center md:items-start gap-8 sm:gap-14 lg:gap-20 max-w-6xl rounded-3xl bg-gradient-to-b from-gray-950/90 via-mygreen/5 to-mygreen/5 bg-gray-950/80 backdrop-blur-sm relative border border-green-500/10 shadow-[0_0_40px_rgba(0,255,128,0.1)]"
        >
        <section className="mb-2 flex flex-col gap-3 md:gap-5 max-w-2xl w-full text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-mygreen highlight-neon">
            Hello! I&apos;m Mehmed Muric 👋
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            I&apos;m a <span className="text-mygreen font-semibold">full-stack developer</span> with a passion for building products that solve real-world problems, empower teams, and delight users.
          </p>
          <p className="text-base text-gray-500">
            Outside coding, I&apos;m an open source enthusiast, hackathon regular, and robotics tinkerer.
          </p>
        </section>

        <Timeline />
        <TechStack />
      </main>
      </div>
    </div>
  );
};

export default AboutClient;
