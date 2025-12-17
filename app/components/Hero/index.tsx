'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useCallback, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  { name: "Flutter", src: "/images/models/flutter.svg" },
  { name: "AWS", src: "/images/models/amazonAWS.svg" },
  { name: "Kali Linux", src: "/images/models/kalilinux.svg" },
  { name: "MySQL", src: "/images/models/mysql.svg" },
];

const fallbackIcon = (
  <span className="w-5 h-5 inline-flex items-center justify-center text-green-300 font-bold">?</span>
);

const STATS = [
  { value: "4+", label: "Years", icon: <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M8 17l4 4 4-4M12 3v12" /></svg> },
  { value: "30+", label: "Projects", icon: <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { value: "10+", label: "Stacks", icon: <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M14 10V3.5a1.5 1.5 0 10-3 0V10m7 4a5 5 0 11-10 0 5 5 0 0110 0z" /></svg> },
];

const socialLinks = [
  { href: "https://github.com/mehmedmuric", aria: "GitHub", icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  { href: "https://linkedin.com/in/mehmed-muric-185297232", aria: "LinkedIn", icon: <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];

const PARTICLE_POSITIONS = [
  { left: "15%", top: "16%" },
  { left: "69%", top: "29%" },
  { left: "23%", top: "42%" },
  { left: "46%", top: "55%" },
  { left: "77%", top: "68%" }
];

// ---------- MEMO COMPONENTS ----------
const TechBadge = memo<{ tech: Technology }>(({ tech }) => (
  <span className="modern-tech-badge group flex items-center gap-1.5 px-3 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 text-xs rounded-xl shadow-sm hover:bg-emerald-500/10 hover:border-emerald-400/30 hover:text-emerald-300 transition-all duration-300">
    {tech.src ? (
      <Image 
        src={tech.src} 
        alt={tech.name} 
        width={18} 
        height={18} 
        loading="lazy"
        className="filter brightness-110 group-hover:brightness-125 transition-all"
      />
    ) : (
      fallbackIcon
    )}
    <span className="font-medium">{tech.name}</span>
  </span>
));
TechBadge.displayName = "TechBadge";

const StatCard = memo<{ stat: typeof STATS[0] }>(({ stat }) => (
  <div className="flex flex-col items-center p-2 w-20 xs:w-24">
    <div className="rounded-full bg-[#192f21] flex items-center justify-center mb-2 w-9 h-9 xs:w-10 xs:h-10">{stat.icon}</div>
    <div className="text-xl md:text-2xl font-bold text-green-400">{stat.value}</div>
    <div className="text-[11px] text-gray-400">{stat.label}</div>
  </div>
));
StatCard.displayName = "StatCard";

const DecorativeCircles = memo(() => (
  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[700px] opacity-40 pointer-events-none z-0">
    <svg width="100%" height="100%" viewBox="0 0 800 700" fill="none">
      <circle cx="400" cy="350" r="240" fill="rgba(45,255,0,0.10)" />
      <circle cx="630" cy="150" r="100" fill="rgba(45,255,0,0.08)" />
      <circle cx="120" cy="480" r="70" fill="rgba(45,255,0,0.04)" />
    </svg>
  </div>
));
DecorativeCircles.displayName = "DecorativeCircles";



// ---------- HERO COMPONENT ----------
const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (titleRef.current && subtitleRef.current && descRef.current && badgesRef.current && ctaRef.current && profileRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(titleRef.current, { y: 48 }, { y: 0, duration: 0.6, ease: "expo.out" })
        .fromTo(subtitleRef.current, { x: -36 }, { x: 0, duration: 0.5, ease: "expo.out" }, "-=0.3")
        .fromTo(descRef.current, { y: 28 }, { y: 0, duration: 0.45, ease: "expo.out" }, "-=0.2")
        .fromTo(badgesRef.current, { y: 17 }, { y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .fromTo(ctaRef.current, { scale: 0.96 }, { scale: 1, duration: 0.38, ease: "back.out(1.5)" }, "-=0.2")
        .fromTo(profileRef.current, { y: 112, scale: 0.95 }, { y: 0, scale: 1, duration: 0.68, ease: "expo.out" }, "-=0.6");
    }
  }, []);

  return (
    <section id="home" className="relative z-10 min-h-screen flex items-center bg-[#0a0a0a] bg-gradient-to-b from-[#0f1419] via-[#000000] to-[#051912] py-12 md:py-16 lg:py-20 overflow-hidden">
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

      <DecorativeCircles />
      
      {/* Enhanced Parallax Background with Cyberpunk Glow */}
      <div className="absolute left-[5%] top-[14%] w-96 h-96 bg-[radial-gradient(circle,rgba(0,255,140,0.3)_0%,rgba(0,255,200,0.15)_40%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform animate-pulse" style={{ transform: `translate3d(${mousePosition.x * 0.45}px,${mousePosition.y * 0.41}px,0)` }} aria-hidden />
      <div className="absolute right-[10%] bottom-[5%] w-[380px] h-[240px] bg-[radial-gradient(circle,rgba(0,200,255,0.2)_0%,rgba(100,200,255,0.1)_40%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform" style={{ transform: `translate3d(${mousePosition.x * 0.19}px,${mousePosition.y * 0.08}px,0)` }} aria-hidden />
      
      {/* Cyberpunk Neon Accents */}
      <div className="absolute top-20 left-10 w-2 h-32 bg-gradient-to-b from-green-400 to-transparent opacity-60 blur-sm animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-60 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container relative z-20 px-4 sm:px-10 mx-auto select-none mt-12 md:mt-16 lg:mt">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          
          {/* LEFT: CONTENT */}
          <div className="w-full md:w-3/5 lg:w-1/2 max-w-2xl flex flex-col items-center md:items-start text-center md:text-left">
            <h1 ref={titleRef} className="font-black text-4xl xs:text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-3 tracking-tight flex flex-col items-center md:items-start relative">
              <span className="relative">
                <span className="text-green-300 drop-shadow-[0_0_10px_rgba(0,255,140,0.5)]">Mehmed</span>
                <span className="text-green-400 drop-shadow-[0_0_15px_rgba(0,255,140,0.8)] animate-pulse"> Muric</span>
                {/* Cyberpunk underline effect */}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 rounded-full opacity-80 shadow-[0_0_10px_rgba(0,255,140,0.6)] animate-pulse" />
              </span>
            </h1>

            <h2 ref={subtitleRef} className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold flex items-center gap-2 flex-wrap">
              <span className="text-cyan-300 drop-shadow-[0_0_8px_rgba(0,200,255,0.4)]">Full-Stack Developer</span>
              <span className="text-green-400 animate-pulse">|</span>
              <span className="text-gray-200">Software Engineer</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs md:text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available
              </span>
            </h2>

            <p ref={descRef} className="mt-4 mb-6 text-base sm:text-lg text-gray-300 font-normal max-w-lg leading-relaxed">
              I build <span className="text-green-400 font-semibold">robust</span>, <span className="text-cyan-400 font-semibold">scalable</span> web & mobile apps focused on <span className="text-green-400 font-semibold">speed</span>, <span className="text-cyan-400 font-semibold">polish</span>, and <span className="text-green-400 font-semibold">maintainability</span>. Let's craft solutions that last.
            </p>

            <div ref={badgesRef} className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
              {techStack.map(tech => <TechBadge tech={tech} key={tech.name} />)}
            </div>

            <div ref={ctaRef} className="w-full flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-5 my-2">
              <a href="/MojCV.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-7 py-3 rounded-full bg-gradient-to-r from-green-400 to-green-700 text-black font-bold tracking-wide shadow-lg hover:shadow-[0_0_30px_rgba(0,255,128,0.4)] hover:scale-105 active:scale-95 transition group border-2 border-transparent hover:from-green-500 hover:to-green-800" aria-label="View my CV">
                View CV
              </a>

              <Link href="https://github.com/mehmedmuric" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-7 py-3 rounded-full border-2 border-green-500 bg-transparent text-green-100 font-bold shadow-md hover:shadow-[0_0_20px_rgba(0,255,128,0.3)] hover:scale-105 hover:bg-green-500/15 transition" aria-label="GitHub">
                GitHub
              </Link>
            </div>

            <div className="flex gap-4 mt-4 mb-0 justify-center md:justify-start">
              {socialLinks.map(({ href, aria, icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={aria} className="flex items-center justify-center w-10 h-10 rounded-full border border-green-500/30 bg-[#172616] text-green-200 hover:text-green-400 hover:border-green-400/60 hover:shadow-[0_0_15px_rgba(0,255,128,0.3)] hover:scale-110 transition shadow-sm">{icon}</a>
              ))}
            </div>
          </div>

          {/* RIGHT: PROFILE + STATS */}
          <div className="w-full md:w-2/5 lg:w-[34%] flex flex-col items-center justify-center relative mt-14 md:mt-0">
            <div ref={profileRef} className="relative flex flex-col items-center justify-center">
              <div className="relative group flex flex-col items-center">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-green-500/30 to-green-400/10 blur-2xl group-hover:opacity-70 opacity-50 transition duration-500 pointer-events-none" />
                <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 xl:w-72 xl:h-72 rounded-full overflow-hidden border-4 border-green-400/60 shadow-xl group-hover:shadow-[0_0_55px_rgba(0,255,128,0.6)] transition-all duration-700 group-hover:scale-[1.05]">
                  <Image src="/images/logo/mehmed.jpg" alt="Mehmed Muric, Full-Stack Developer" className="w-full h-full object-cover" width={500} height={500} priority />
                  <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-dark/90 border border-green-500/25 shadow-lg text-green-300 font-bold text-base whitespace-nowrap">
                  Software Engineer
                </div>
              </div>
              <div className="mt-16 grid grid-cols-3 gap-x-5 gap-y-1 xs:gap-x-6">
                {STATS.map(stat => <StatCard stat={stat} key={stat.label} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PARTICLES */}
      {PARTICLE_POSITIONS.map(({ left, top }, i) => (
        <div key={i} className="absolute w-2 h-2 bg-green-500 rounded-full opacity-20 animate-float pointer-events-none" style={{ left, top, animationDelay: `${i * 0.45}s`, animationDuration: `${3.6 + i * 0.3}s` }} aria-hidden />
      ))}
    </section>
  );
};

export default Hero;
