'use client';

import { useEffect, useRef } from "react";
import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import SectionTitle from "../Common/SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section fade-in
      gsap.from(".cert-section", {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-section",
          start: "top 85%",
        },
      });

      // Title glow + pulse
      gsap.from(".cert-title", {
        opacity: 0,
        scale: 0.9,
        filter: "drop-shadow(0 0 0 rgba(0,255,128,0))",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cert-title",
          start: "top 90%",
        },
      });

      // Individual cards animation
      gsap.utils.toArray(".cert-card").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 80,
            rotateX: -10,
            scale: 0.95,
            filter: "drop-shadow(0 0 0 rgba(0,255,128,0))",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
            filter: "drop-shadow(0 0 15px rgba(0,255,128,0.3))",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cert-section relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-16 
      bg-[#050505] bg-[radial-gradient(ellipse_at_top,_#0f3d2e_0%,_#020202_80%)]"
    >
      {/* Green glow overlay */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="cert-title">
          <SectionTitle
            title="Certifications"
            paragraph="I continually improve my skills through real-world courses and certifications. Each one represents a milestone in mastering modern full-stack technologies."
            center
            mb="70px"
          />
        </div>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-base sm:text-lg">
          Here are some of my completed certifications — covering everything from backend architecture to modern front-end frameworks.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-12 items-center justify-center">
          {brandsData.map((brand) => (
            <SingleBrand key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name, issued, platform, description } = brand;

  return (
    <div
      className="cert-card group relative flex flex-col items-center justify-center p-10 sm:p-12 rounded-3xl 
      backdrop-blur-md bg-black/60 border border-green-600/30 
      transition-all duration-500 hover:-translate-y-3 hover:scale-105
      w-[95%] sm:w-[80%] md:w-[72%] lg:w-[70%] xl:w-[320px] max-w-[280px]
      shadow-lg ring-0 ring-green-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:ring-2"
    >
      <div
        className="relative flex items-center justify-center h-36 w-36 sm:h-44 sm:w-44 
        rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.80),_transparent_90%)]
        shadow-[0_0_20px_rgba(0,255,128,0.25)] group-hover:shadow-[0_0_35px_rgba(0,255,128,0.8)]
        transition-all duration-500 animate-pulse-slow"
      >
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="object-contain drop-shadow-[0_0_15px_rgba(0,255,128,0.3)] 
          group-hover:drop-shadow-[0_0_25px_rgba(0,255,128,0.5)] transition-all duration-500"
          priority
        />
      </div>

      <p className="mt-5 text-base sm:text-lg font-semibold text-center text-white group-hover:text-green-400 transition-colors duration-300">
        {name}
      </p>

      <p className="text-sm text-gray-400 text-center mt-1">
        {platform} • {issued}
      </p>

      <p className="text-center text-gray-400 mt-2 text-sm px-3">{description}</p>

      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="mt-6 inline-block rounded-lg px-6 py-4 
        text-sm sm:text-base text-center font-medium  
        transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,128,0.35)]
        bg-green-500 border border-green-500 text-black 
        ease-in-out hover:bg-transparent
        hover:text-green-500 shadow-[0_0_15px_rgba(0,255,128,0.4)]"
      >
        Show Certificate
      </a>
    </div>
  );
};
