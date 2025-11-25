"use client";

import Image from "next/image";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// ---------------- TIMELINE ----------------
const Timeline = () => (
  <ol className="relative border-l-2 border-mygreen/40 ml-2 mt-4 mb-10">
    {/* ... ceo tvoj timeline ... */}
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
      {/* ... ceo tvoj TechStack ... */}
    </div>
  );
};

// ---------------- ABOUT CLIENT ----------------
const AboutClient = () => {
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!breadcrumbRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.7, ease: "power3.out" },
      });

      tl.from(breadcrumbRef.current, { y: -30, opacity: 0 });

      tl.from(
        Array.from(contentRef.current.children).slice(0, 2),
        { y: 36, opacity: 0, stagger: 0.22 },
        "-=0.44"
      );

      tl.from(
        Array.from(contentRef.current.children).slice(2),
        { y: 20, opacity: 0, stagger: 0.15 },
        "-=0.28"
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  // ⬇⬇⬇ THIS WAS MISSING ⬇⬇⬇
  return (
    <div ref={contentRef} className="px-4">
      <div ref={breadcrumbRef}>
        <Breadcrumb pageName="About Me" />
      </div>

      <h1 className="text-3xl font-bold text-mygreen mt-4">About Me</h1>

      <p className="text-gray-400 mt-2">
        {/* ubaci svoj tekst */}
      </p>

      <Timeline />
      <TechStack />
    </div>
  );
};

export default AboutClient;
