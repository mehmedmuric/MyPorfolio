'use client';
import Image from "next/image";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Timeline data
const timelineData = [
  {
    period: "2019–2023",
    title: "Technical HS, Information Technology, Novi Pazar",
    colorClass: "bg-mygreen ring-mygreen/25",
    textClass: "text-mygreen",
    highlights: ["Robotics Club, IT Olympiad finalist", "First hackathon experience"],
    body: "Graduated as an Information Technology Technician, with a robust foundation in hardware and software. Developed skills in network configuration, problem-solving, and collaboration."
  },
  {
    period: "2023–Present",
    title: "University of Novi Pazar",
    colorClass: "bg-mygreen/75 ring-mygreen/20",
    textClass: "text-mygreen",
    highlights: ["Teaching Assistant (Web Tech)", "Co-founded peer study group"],
    body: "Ongoing at a leading private university. Interests: algorithms, distributed systems, and web engineering. Regular contributor to open source and student groups."
  },
  {
    period: "2020–Now",
    title: "Professional Developer",
    colorClass: "bg-mygreen/95 ring-mygreen/15",
    textClass: "text-mygreen",
    highlights: ["Mentoring junior developers", "Volunteer & open source contributor"],
    body: "Built and shipped multiple web/mobile apps and SaaS platforms using React, Next.js, Node.js, TypeScript, and modern stacks."
  },
  {
    period: "2023-Now",
    title: "Freelancer & Tech Consultant",
    colorClass: "bg-yellow-300 ring-yellow-400/20",
    textClass: "text-yellow-300",
    highlights: ["Focus on reliability, transparent communication, and client enablement"],
    body: "Delivering tailor-made solutions for startups across the EU/USA—making technology accessible and empowering founders and teams."
  }
];

const Timeline = () => (
  <ol className="relative border-l-2 border-mygreen/40 ml-2 mt-4 mb-10" aria-label="Career and Learning Timeline">
    {timelineData.map(({ period, title, colorClass, textClass, highlights, body }, idx) => (
      <li key={period + title} className={`mb-10 ml-6 relative ${idx === timelineData.length - 1 ? "mb-0" : ""}`}>
        {/* Pomereno sa leve na desnu stranu */}
        <span className={`absolute -left-8 top-3 transform -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full ring-4 ${colorClass}`} aria-hidden="true" />
        <h3 className={`font-semibold text-base md:text-lg ${textClass}`}>
          <span className="sr-only">Time period:</span>
          {period}
          <span className="sr-only">, </span>: {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-400">
          {body}
          {highlights && (
            <span className={`block mt-1 ${textClass === "text-yellow-300" ? "text-yellow-300/70" : "text-emerald-400/60"}`}>
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

  return (
    <>
      <div ref={breadcrumbRef}>
        <Breadcrumb pageName="About Me" description="Who I am, what drives me, and how I can help you succeed." />
      </div>

      <main ref={contentRef} className="mx-auto particles-bg overflow-hidden px-4 xs:px-5 sm:px-6 lg:px-8 py-7 sm:py-14 md:py-20 lg:py-28 isolate flex flex-col items-center md:items-start gap-8 sm:gap-14 lg:gap-20 max-w-6xl rounded-3xl bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5 bg-gray-950 relative">
        {/* ... ostatak sadržaja ostaje isti ... */}
        <Timeline />
        <TechStack />
      </main>
    </>
  );
};

export default AboutClient;
