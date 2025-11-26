"use client";

import Image from "next/image";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// Expanded Timeline Data - improved descriptions & highlights
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
    period: "2020–Now",
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
  {
    period: "2023-Now",
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
  }
];

const Timeline = () => (
  <ol
    className="relative border-l-2 border-mygreen/40 ml-2 mt-4 mb-10"
    aria-label="Career and Learning Timeline"
  >
    {timelineData.map(({ period, title, colorClass, textClass, highlights, body }, idx) => (
      <li
        key={period + title}
        className={`mb-10 ml-6 relative ${idx === timelineData.length - 1 ? "mb-0" : ""}`}
      >
        <span
          className={`absolute -left-8 top-3 transform -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full ring-4 ${colorClass}`}
          aria-hidden="true"
        />
        <h3 className={`font-semibold text-base md:text-lg ${textClass}`}>
          <span className="sr-only">Time period:</span>
          {period}
          <span className="sr-only">, </span>: {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-400">
          {body}
          {highlights && (
            <span
              className={`block mt-1 ${
                textClass === "text-yellow-300"
                  ? "text-yellow-300/70"
                  : "text-emerald-400/60"
              }`}
            >
              {highlights.map((h, hIdx) => (
                <span key={hIdx}>
                  • {h}
                  {hIdx < highlights.length - 1 && <br />}
                </span>
              ))}
            </span>
          )}
        </p>
      </li>
    ))}
  </ol>
);

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
    <ul
      className={`grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-3 xs:gap-4 sm:gap-5 md:gap-6 justify-center items-center w-full max-w-3xl`}
      aria-label="Technology stack"
    >
      {techStack.map((item, i) => (
        <li
          key={item.label}
          className="flex flex-col items-center group transition-all duration-200 hover:scale-110"
          style={{ animation: `appearFadeIn 0.7s ${0.055 * i}s both` }}
          tabIndex={0}
          aria-label={item.label}
        >
          <Image src={item.src} alt={item.label} width={36} height={36} className="drop-shadow-glow-slim" draggable={false} loading={i < 4 ? "eager" : "lazy"} />
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
// ---------------- TIMELINE ----------------
const Timeline = () => (
  <ol className="relative border-l-2 border-mygreen/40 ml-2 mt-4 mb-10">
    <li className="mb-8 ml-6">
      <span className="absolute -left-2 flex items-center justify-center w-5 h-5 bg-mygreen rounded-full ring-4 ring-mygreen/25" />
      <h3 className="font-semibold text-base md:text-lg text-mygreen">
        2019–2023: Technical HS, Information Technology, Novi Pazar
      </h3>
      <p className="text-xs md:text-sm text-gray-400">
        Graduated as Information Technology Technician, building a strong engineering and software foundation.
      </p>
    </li>

    <li className="mb-8 ml-6">
      <span className="absolute -left-2 flex items-center justify-center w-5 h-5 bg-mygreen/75 rounded-full ring-4 ring-mygreen/20" />
      <h3 className="font-semibold text-base md:text-lg text-mygreen">
        2021–Present: BSc Computer Science
      </h3>
      <p className="text-xs md:text-sm text-gray-400">
        Ongoing studies at a private university—expanding expertise in algorithms, systems, and modern technologies.
      </p>
    </li>

    <li className="ml-6">
      <span className="absolute -left-2 flex items-center justify-center w-5 h-5 bg-mygreen/95 rounded-full ring-4 ring-mygreen/15" />
      <h3 className="font-semibold text-base md:text-lg text-mygreen">
        2020–Now: Professional Developer
      </h3>
      <p className="text-xs md:text-sm text-gray-400">
        Delivered modern web/mobile apps using React, Next.js, Node.js, TailwindCSS, TypeScript, and more.
      </p>
    </li>
  </ol>
);

// ---------------- TECH STACK ----------------
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
        @keyframes appearFadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .drop-shadow-glow-slim {
          filter: drop-shadow(0 0 6px #00ff99a2);
        }
      `}</style>
    </div>
  );
};

// ---------------- ABOUT CLIENT ----------------
const AboutClient = () => {
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (breadcrumbRef.current && contentRef.current) {
      const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });
      tl.from(breadcrumbRef.current, { y: -30, opacity: 0 });
      tl.from(Array.from(contentRef.current.children).slice(0, 2), { y: 36, opacity: 0, stagger: 0.19 }, "-=0.44");
      tl.from(Array.from(contentRef.current.children).slice(2), { y: 20, opacity: 0, stagger: 0.13 }, "-=0.22");
      gsap.to(contentRef.current.querySelectorAll("h1, h2, .highlight-neon"), {
        textShadow: "0 0 16px #00ff99, 0 0 4px #48ffa7",
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut"
      });
    }
  }, []);

  // Add improved about-me intro
    if (!breadcrumbRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.7, ease: "power3.out" },
      });

      // breadcrumb anim
      tl.from(breadcrumbRef.current, { y: -30, opacity: 0 });

      // first two elements
      tl.from(
        Array.from(contentRef.current.children).slice(0, 2),
        { y: 36, opacity: 0, stagger: 0.22 },
        "-=0.44"
      );

      // the rest
      tl.from(
        Array.from(contentRef.current.children).slice(2),
        { y: 20, opacity: 0, stagger: 0.15 },
        "-=0.28"
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  // 🔥 THIS FIXES THE ERROR → JSX RETURN
  return (
    <div ref={contentRef} className="px-4 pb-10">
      <div ref={breadcrumbRef}>
        <Breadcrumb
          pageName="About Me"
          description="Curious by nature. Driven by building. Enabling others. Welcome to my journey."
        />
      </div>

      <main
        ref={contentRef}
        className="mx-auto particles-bg overflow-hidden px-4 xs:px-5 sm:px-6 lg:px-8 py-7 sm:py-14 md:py-20 lg:py-28 isolate flex flex-col items-center md:items-start gap-8 sm:gap-14 lg:gap-20 max-w-6xl rounded-3xl bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5 bg-gray-950 relative"
      >
        {/* About Me - Custom Introduction Section */}
        <section className="mb-2 flex flex-col gap-3 md:gap-5 max-w-2xl w-full text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-mygreen highlight-neon">Hello! I'm Mehmed Muric 👋</h1>
          <p className="text-base md:text-lg text-gray-300">
            I’m a <span className="text-mygreen font-semibold">full-stack developer</span> with a passion for building products that solve real-world problems, empower teams, and delight users.
            My journey bridges the world of algorithms and software craftsmanship, grounded in <span className="text-emerald-400 font-medium">collaboration, teaching</span>, and relentless curiosity.
          </p>
          <p className="text-base md:text-lg text-gray-400">
            I thrive in environments where learning never stops—whether that’s mentoring, leading workshops, or collaborating across borders. I believe in <span className="text-yellow-300 font-medium">clear communication</span> and always prioritizing reliability, accessibility, and empathy in both code and teamwork.
          </p>
          <p className="text-base text-gray-500">
            Outside coding, I’m an open source enthusiast, hackathon regular, and robotics tinkerer. Let's build solutions that last—and grow together along the way!
          </p>
        </section>
        <Timeline />
        <TechStack />
      </main>
    </>
        <Breadcrumb pageName="About Me" />
      </div>

      <h1 className="text-3xl font-bold text-mygreen mt-4">About Me</h1>

      <p className="text-gray-400 mt-2 max-w-2xl">
        I’m a passionate full-stack developer who loves crafting modern,
        animated, and highly optimized digital experiences using the newest
        technologies in the ecosystem.
      </p>

      <Timeline />
      <TechStack />
    </div>
  );
};

export default AboutClient;
