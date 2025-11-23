'use client'

import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import SectionTitle from "../Common/SectionTitle";
import { useEffect, useState } from "react";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const Certifications = () => {
  useScrollAnimations();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-16 
      bg-[#050505] bg-[radial-gradient(ellipse_at_top,_#0f3d2e_0%,_#020202_80%)]"
    >
      {/* Animated cyber grid background */}
      <div 
        className="absolute inset-0 opacity-[0.06] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:50px_50px] animate-[gridMove_20s_linear_infinite]"
      />

      {/* Secondary grid layer for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:25px_25px]"
        style={{
          animation: 'gridMove-reverse 15s linear infinite'
        }}
      />

      {/* Green glow overlay with parallax */}
      <div 
        className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        }}
      />

      {/* Additional accent glow */}
      <div 
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20 animate-float"
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${4 + i * 0.5}s`,
            width: `${2 + (i % 2)}px`,
            height: `${2 + (i % 2)}px`,
          }}
        />
      ))}

      {/* Animated scan lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"
          style={{
            animation: 'scanLine 8s linear infinite'
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <SectionTitle
          title="Certifications"
          paragraph="I continually improve my skills through real-world courses and certifications. Each one represents a milestone in mastering modern full-stack technologies."
          center
          mb="70px"
        />

        <p 
          className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-base sm:text-lg opacity-0"
          data-animate="fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Here are some of my completed certifications — covering everything from backend architecture to modern front-end frameworks.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-12 items-center justify-center">
          {brandsData.map((brand, index) => (
            <SingleBrand key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

const SingleBrand = ({ brand, index }: { brand: Brand; index: number }) => {
  const { href, image, name, issued, platform, description } = brand;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col items-center justify-center p-10 sm:p-12 rounded-3xl 
      backdrop-blur-md bg-gradient-to-br from-black/70 via-black/60 to-black/70 border border-green-600/30 
      transition-all duration-500 hover:-translate-y-3 hover:scale-105
      w-[95%] sm:w-[80%] md:w-[72%] lg:w-[70%] xl:w-[320px] max-w-[280px]
      shadow-lg hover:shadow-[0_0_50px_rgba(0,255,128,0.4)] hover:border-green-500/60
      overflow-hidden"
      data-animate="fade-in-up"
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-green-500/20 rounded-tl-3xl group-hover:border-green-500/60 transition-colors duration-500">
        <div className={`absolute top-0 left-0 w-full h-full bg-green-500/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500/20 rounded-br-3xl group-hover:border-green-500/60 transition-colors duration-500">
        <div className={`absolute bottom-0 right-0 w-full h-full bg-green-500/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Animated border glow */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 blur-sm transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-green-500/0 group-hover:bg-green-500/5 blur-xl transition-all duration-500 -z-10" />

      {/* Subtle inner glow */}
      <div className={`absolute inset-[1px] rounded-3xl bg-gradient-to-br from-green-500/0 via-green-500/5 to-green-500/0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Icon container with enhanced animations */}
      <div
        className="relative flex items-center justify-center h-36 w-36 sm:h-44 sm:w-44 
        rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.80),_transparent_90%)]
        shadow-[0_0_20px_rgba(0,255,128,0.25)] group-hover:shadow-[0_0_40px_rgba(0,255,128,0.8)]
        transition-all duration-500 animate-pulse-slow group-hover:scale-110"
      >
        {/* Pulsing ring on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full border-2 border-green-500/50 animate-ping" />
        )}
        
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="relative z-10 object-contain drop-shadow-[0_0_15px_rgba(0,255,128,0.3)] 
          group-hover:drop-shadow-[0_0_30px_rgba(0,255,128,0.6)] transition-all duration-500
          group-hover:scale-110"
          priority
        />
      </div>

      <p className="mt-5 text-base sm:text-lg font-semibold text-center text-white group-hover:text-green-400 transition-colors duration-300 relative">
        <span className="relative inline-block">
          {name}
          <span 
            className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}
          />
        </span>
      </p>

      <p className="text-sm text-gray-400 text-center mt-1 group-hover:text-gray-300 transition-colors">
        {platform} • {issued}
      </p>

      <p className="text-center text-gray-400 mt-2 text-sm px-3 group-hover:text-gray-300 transition-colors">{description}</p>

      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="mt-6 relative inline-block rounded-lg px-6 py-4 
        text-sm sm:text-base text-center font-medium  
        transition-all duration-300 
        bg-green-500 border border-green-500 text-black 
        ease-in-out hover:bg-transparent hover:text-green-500 
        shadow-[0_0_15px_rgba(0,255,128,0.4)] hover:shadow-[0_0_30px_rgba(0,255,128,0.6)]
        hover:scale-105 overflow-hidden group/btn"
      >
        {/* Button glow effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10">Show Certificate</span>
      </a>
    </div>
  );
};
