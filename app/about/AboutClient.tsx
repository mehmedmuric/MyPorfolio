'use client';
import Image from "next/image";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Iconic timeline of career/learning events for extra visual narrative
const Timeline = () => (
  <ol className="relative border-l-2 border-mygreen/40 ml-2 mt-4 mb-10">
    <li className="mb-8 ml-6">
      <span className="absolute -left-2 flex items-center justify-center w-5 h-5 bg-mygreen rounded-full ring-4 ring-mygreen/25" />
      <h3 className="font-semibold text-base md:text-lg text-mygreen">2019–2023: Technical HS, Information Technology, Novi Pazar</h3>
      <p className="text-xs md:text-sm text-gray-400">
        Graduated as Information Technology Technician, building a strong engineering and software foundation.
      </p>
    </li>
    <li className="mb-8 ml-6">
      <span className="absolute -left-2 flex items-center justify-center w-5 h-5 bg-mygreen/75 rounded-full ring-4 ring-mygreen/20" />
      <h3 className="font-semibold text-base md:text-lg text-mygreen">2021–Present: BSc Computer Science</h3>
      <p className="text-xs md:text-sm text-gray-400">
        Ongoing studies at a private university—expanding expertise in algorithms, systems, and modern technologies.
      </p>
    </li>
    <li className="ml-6">
      <span className="absolute -left-2 flex items-center justify-center w-5 h-5 bg-mygreen/95 rounded-full ring-4 ring-mygreen/15" />
      <h3 className="font-semibold text-base md:text-lg text-mygreen">2020–Now: Professional Developer</h3>
      <p className="text-xs md:text-sm text-gray-400">
        Delivered modern web/mobile apps using React, Next.js, Node.js, TailwindCSS, TypeScript, and more.
      </p>
    </li>
  </ol>
);

// Simple animated tech icons grid
const TechStack = () => {
  const stack = [
    { src: "/images/models/javascript.svg", label: "Javascript" },  
    { src: "/images/models/react.svg", label: "React" },  
    { src: "/images/models/nextjs.svg", label: "Next.js" },
    { src: "/images/models/nodejs.svg", label: "Node.js" },
    { src: "/images/models/typescript.svg", label: "TypeScript" },
    { src: "/images/models/tailwindcss.svg", label: "TailwindCSS" },
    { src: "/images/models/mongodb.svg", label: "MongoDB" },
    { src: "/images/models/mysql.svg", label: "MySQL" },
    { src: "/images/models/materialui.svg", label: "Material UI" },
  ];
  return (
    <div className="w-full flex flex-col items-center mt-3">
      <h2 className="font-semibold text-mygreen mb-2 text-lg md:text-xl tracking-widest">
        My Tech Toolbox
      </h2>
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-4 sm:gap-6 justify-center items-center">
        {stack.map((item, i) => (
          <div
            key={item.label}
            className="flex flex-col items-center group transition-all duration-200 hover:scale-110"
            style={{ animation: `appearFadeIn 0.8s ${0.08 * i}s both` }}
          >
            <Image
              src={item.src}
              alt={item.label}
              width={38}
              height={38}
              className="drop-shadow-glow-slim"
            />
            <span className="text-xs text-gray-400 mt-1">{item.label}</span>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes appearFadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); }}
        .drop-shadow-glow-slim { filter: drop-shadow(0 0 6px #00ff99a2); }
      `}</style>
    </div>
  );
};

const AboutClient = () => {
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (breadcrumbRef.current && contentRef.current) {
      const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });

      // Breadcrumb from above
      tl.from(breadcrumbRef.current, { y: -30, opacity: 0 });

      // Hero text + intro staggered
      tl.from(
        Array.from(contentRef.current.children).slice(0, 2),
        { y: 36, opacity: 0, stagger: 0.22 },
        "-=0.44"
      );

      // Other sections staggered in
      tl.from(
        Array.from(contentRef.current.children).slice(2),
        { y: 20, opacity: 0, stagger: 0.15 },
        "-=0.28"
      );

      // Neon blink effect for h1, h2, important p's
      gsap.to(
        contentRef.current.querySelectorAll("h1, h2, .highlight-neon"),
        {
          textShadow: "0 0 17px #00ff99, 0 0 4px #48ffa7",
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "power1.inOut"
        }
      );
    }
  }, []);

  return (
    <>
      <div ref={breadcrumbRef}>
        <Breadcrumb pageName="About Me" description="Who I am, what I do, and how I can help you succeed." />
      </div>

      <div
        ref={contentRef}
        className="mx-auto particles-bg overflow-hidden md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 rounded-3xl max-w-6xl sm:px-6 py-8 flex flex-col items-center md:items-start gap-8 sm:gap-14 lg:gap-20 
          bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5 bg-gray-950
          relative"
      >
        {/* Cyber grid background */}
        <div className="absolute inset-0 opacity-[0.06] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:50px_50px] pointer-events-none" />

        {/* Neon radial glows */}
        <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.06),_transparent_70%)] blur-[120px] pointer-events-none" />

        {/* About Hero */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 underline underline-offset-4 decoration-mygreen">
          Hi, I’m Mehmed Muric
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-6 w-full">
          {/* Optionally, portrait or avatar */}
          <div className="w-28 h-28 mb-2 md:mb-0 flex-shrink-0 relative rounded-full border-2 border-mygreen/20 shadow-[0_0_16px_#00ff9940] overflow-hidden bg-mygreen/5 mr-0 md:mr-6">
            <Image
              src="/images/logo/mehmed.jpg"
              alt="Mehmed Muric Avatar"
              fill
              sizes="112px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-body-color mb-2 md:mb-4 text-sm sm:text-base md:text-lg">
              <span className="highlight-neon font-medium tracking-wide">
                Passionate Full-Stack Developer
              </span>{" "}
              from Novi Pazar, on a quest to build high-impact, modern web and mobile applications. I thrive on challenges, solving real-world problems and exceeding user expectations through meticulous, efficient code.
            </p>
            <p className="text-body-color mb-2 text-xs md:text-sm italic text-mygreen/90">
              "Focus on quality, user value, and creative solutions."
            </p>
          </div>
        </div>

        {/* Animated Timeline of Journey */}
        <Timeline />

        {/* Tech stack grid */}
        <TechStack />

        {/* Additional details / philosophy */}
        <div className="flex flex-col gap-3 mt-4">
          <p className="text-body-color text-sm sm:text-base md:text-lg">
            My core toolkit is always evolving. I build with <span className="font-semibold text-mygreen/95">React</span>, <span className="font-semibold text-mygreen/95">Next.js</span>, <span className="font-semibold text-mygreen/95">Node.js</span>, <span className="font-semibold text-mygreen/95">TypeScript</span>, <span className="font-semibold text-mygreen/95">TailwindCSS</span>, <span className="font-semibold text-mygreen/95">MongoDB</span>, <span className="font-semibold text-mygreen/95">MySQL</span> and more—keeping up with the latest best practices to deliver high-performance, secure, and scalable applications.
          </p>
          <p className="text-body-color text-sm sm:text-base md:text-lg mt-1">
            <span className="highlight-neon font-semibold">What motivates me the most</span> is helping clients turn their ideas into reality—and continuing to support their growth long after launch. Every project receives long-term planning, scalability, and performance at its heart.
          </p>
          <p className="text-body-color text-xs sm:text-sm md:text-base text-gray-400 mt-3">
            When I'm not coding, I'm usually exploring new tech, gaming, or enjoying music with friends. Always open to meaningful collaborations!
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutClient;
