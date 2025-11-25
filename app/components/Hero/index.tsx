'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// TECHNOLOGIES
interface Technology {
  name: string;
  src: string;
}

const techStack: Technology[] = [
  { name: "JavaScript", src: "/images/models/javascript.svg" },
  { name: "React", src: "/images/models/react.svg" },
  { name: "Next.js", src: "/images/models/nextjs.svg" },
  { name: "TypeScript", src: "/images/models/typescript.svg" },
  { name: "Node.js", src: "/images/models/nodejs.svg" },
  { name: "MongoDB", src: "/images/models/mongodb.svg" },
  { name: "TailwindCSS", src: "/images/models/tailwindcss.svg" },
];

const STATS = [
  {
    value: "4+",
    label: "Years",
    icon: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M8 17l4 4 4-4M12 3v12" />
      </svg>
    ),
  },
  {
    value: "30+",
    label: "Projects",
    icon: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "10+",
    label: "Stacks",
    icon: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M14 10V3.5a1.5 1.5 0 10-3 0V10m7 4a5 5 0 11-10 0 5 5 0 0110 0z" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    href: "https://github.com/mehmedmuric",
    aria: "GitHub",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12..." />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/in/mehmed-muric-185297232",
    aria: "LinkedIn",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569..." />
      </svg>
    ),
  },
];

export default function Hero() {
  // refs
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const badgesRef = useRef(null);
  const ctaRef = useRef(null);
  const profileRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // PARALLAX
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 60,
        y: (e.clientY / window.innerHeight - 0.5) * 60,
      });
    };

    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handle);
      return () => window.removeEventListener("mousemove", handle);
    }
  }, []);

  // GSAP animations
  useEffect(() => {
    if (
      !titleRef.current ||
      !subtitleRef.current ||
      !descRef.current ||
      !badgesRef.current ||
      !ctaRef.current ||
      !profileRef.current
    )
      return;

    gsap.fromTo(titleRef.current, { y: 40 }, { y: 0, duration: 0.7, ease: "expo.out" });
    gsap.fromTo(subtitleRef.current, { x: -30 }, { x: 0, duration: 0.7, delay: 0.2, ease: "expo.out" });
    gsap.fromTo(descRef.current, { y: 20 }, { y: 0, duration: 0.7, delay: 0.3, ease: "expo.out" });
    gsap.fromTo(badgesRef.current, { y: 15 }, { y: 0, duration: 0.7, delay: 0.5, ease: "power2.out" });
    gsap.fromTo(ctaRef.current, { scale: 0.95 }, { scale: 1, duration: 0.6, delay: 0.7, ease: "back.out(1.5)" });
    gsap.fromTo(profileRef.current, { y: 80, scale: 0.93 }, { y: 0, scale: 1, duration: 0.7, ease: "expo.out" });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#101011] bg-gradient-to-b from-[#212e26] via-[#010101] to-[#051912] py-12 overflow-hidden"
    >
      {/* PARALLAX GLOWS */}
      <div
        className="absolute left-[5%] top-[14%] w-96 h-96 bg-[radial-gradient(circle,rgba(0,255,140,0.22)_0%,transparent_80%)] rounded-full blur-2xl pointer-events-none"
        style={{ transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          
          {/* LEFT CONTENT */}
          <div className="w-full md:w-1/2">
            <h1 ref={titleRef} className="text-6xl font-black text-green-300 tracking-tight">
              Mehmed <span className="text-green-400">Muric</span>
            </h1>

            <h2 ref={subtitleRef} className="text-3xl font-semibold text-gray-100 mt-3">
              Full-Stack Developer • Software Engineer
            </h2>

            <p ref={descRef} className="text-green-300 mt-4 max-w-xl">
              I build robust, scalable web & mobile apps focused on speed, polish, and maintainability.
            </p>

            {/* TECH BADGES */}
            <div ref={badgesRef} className="flex flex-wrap gap-2 mt-4">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="flex items-center gap-1 px-3 py-2 border border-green-500/20 rounded-lg text-green-300 text-sm bg-[#15241c]"
                >
                  <Image src={tech.src} alt={tech.name} width={16} height={16} />
                  {tech.name}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex gap-4 mt-6">
              <a
                href="/MojCV.pdf"
                target="_blank"
                className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-700 rounded-full font-bold text-black"
              >
                View CV
              </a>
              <Link
                href="https://github.com/mehmedmuric"
                target="_blank"
                className="px-6 py-3 border border-green-500 rounded-full text-green-300"
              >
                GitHub
              </Link>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div ref={profileRef} className="flex flex-col items-center">
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-green-400/50 shadow-xl">
                <Image
                  src="/images/logo/mehmed.jpg"
                  alt="Profile"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold text-green-400">{s.value}</div>
                    <div className="text-sm text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
