'use client';
import Image from "next/image";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// Timeline of career/learning events
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
        {`Ongoing studies at a private university—expanding expertise in algorithms, systems, and modern technologies.`}
      </p>
    </li>
    <li className="ml-6">
      <span className="absolute -left-2 flex items-center justify-center w-5 h-5 bg-mygreen/95 rounded-full ring-4 ring-mygreen/15" />
      <h3 className="font-semibold text-base md:text-lg text-mygreen">
        2020–Now: Professional Developer
      </h3>
      <p className="text-xs md:text-sm text-gray-400">
        {`Delivered modern web/mobile apps using React, Next.js, Node.js, TailwindCSS, TypeScript, and more.`}
      </p>
    </li>
  </ol>
);

// Animated tech icons grid
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
  if (!breadcrumbRef.current || !contentRef.current) return;

  // gsap.context garantuje da su selektovani elementi prisutni
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });

    // Animacija breadcrumb-a
    tl.from(breadcrumbRef.current, { y: -30, opacity: 0 });

    // Animacija prvih 2 elementa (npr. hero text)
    tl.from(
      Array.from(contentRef.current.children).slice(0, 2),
      { y: 36, opacity: 0, stagger: 0.22 },
      "-=0.44"
    );

    // Animacija ostatka elemenata (timeline, tech grid itd.)
    tl.from(
      Array.from(contentRef.current.children).slice(2),
      { y: 20, opacity: 0, stagger: 0.15 },
      "-=0.28"
    );

    // Neon blink efekat za h1, h2, ili .highlight-neon
    gsap.to(
      contentRef.current.querySelectorAll("h1, h2, .highlight-neon"),
      {
        textShadow: "0 0 17px #00ff99, 0 0 4px #48ffa7",
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      }
    );
  }, contentRef);

  // Cleanup kada se komponenta unmount-a
  return () => ctx.revert();
}, []);}
