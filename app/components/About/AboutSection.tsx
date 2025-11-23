'use client'

import Image from "next/image";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";
import { useEffect, useState } from "react";

const AboutSection = () => {
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
    <section className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 
      bg-[#020b06] text-gray-300">
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

      {/* Neon radial glows with parallax */}
      <div 
        className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        }}
      />
      <div 
        className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.06),_transparent_70%)] blur-[120px] transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
        }}
      />

      {/* Additional accent glow */}
      <div 
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] animate-pulse-slow"
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
        <div className="-mx-4 flex flex-wrap items-center">

          {/* Image */}
          <div className="w-full px-4 lg:w-1/2 flex justify-center lg:justify-start">
            <div 
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-animate="fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              {/* Pulsing neon circle */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-mygreen/50 animate-pulse-slow" />
              
              {/* Additional glow layers */}
              <div className="absolute inset-[-20px] rounded-full blur-2xl opacity-10 bg-mygreen/30 animate-pulse-slow" style={{ animationDelay: '1s' }} />
              
              <Image
                src="/images/about/aboutsection.svg"
                alt="about image"
                priority
                width={500}
                height={480}
                className="relative z-10 drop-shadow-[0_0_35px_rgba(0,255,120,0.25)] transition-all duration-500 hover:drop-shadow-[0_0_50px_rgba(0,255,120,0.6)] hover:scale-105"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              
              <div 
                className="mb-8 border-l-2 border-mygreen/60 pl-5 group hover:border-mygreen transition-colors duration-300"
                data-animate="fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-mygreen tracking-wide uppercase group-hover:text-green-400 transition-colors">
                  Customer Support for All Clients
                </h3>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  Every project comes with reliable long-term support. I ensure clients receive ongoing updates, fixes, and improvements for lasting performance.
                </p>
              </div>

              <div 
                className="mb-8 border-l-2 border-mygreen/60 pl-5 group hover:border-mygreen transition-colors duration-300"
                data-animate="fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-mygreen tracking-wide uppercase group-hover:text-green-400 transition-colors">
                  Modern & Fast Applications
                </h3>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  I build sleek, high-performance applications with cutting-edge technologies. Every detail is optimized for speed and user experience.
                </p>
              </div>

              <div 
                className="border-l-2 border-mygreen/60 pl-5 group hover:border-mygreen transition-colors duration-300"
                data-animate="fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-mygreen tracking-wide uppercase group-hover:text-green-400 transition-colors">
                  Custom Scalable Solutions
                </h3>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  Tailored to your needs — every line of code is crafted to fit your business, with scalability and clean structure as priorities.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
