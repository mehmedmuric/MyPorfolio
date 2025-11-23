'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const Hero = () => {
  useScrollAnimations();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techStack = ['JavaScript', 'Next.js', 'TypeScript', 'Node.js', 'ExpressJS'];

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden min-h-screen flex items-center
        bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_85%)] 
        pb-20 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.08] 
        bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
             linear-gradient(#00ff99_1px,transparent_1px)] 
        bg-[size:50px_50px] animate-[gridMove_20s_linear_infinite]" />

      {/* Neon radial glows with parallax */}
      <div 
        className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.15),_transparent_60%)] blur-3xl animate-pulse-slow transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        }}
      />
      <div 
        className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.08),_transparent_70%)] blur-[120px] transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full opacity-30 animate-float"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}

      <div className="container relative z-10">
        <div className="-mx-4 flex flex-wrap items-center justify-between gap-8">
          {/* Left side - Content */}
          <div className="w-full px-4 md:w-[48%]">
            <div 
              className={`leftSide opacity-0 transition-all duration-1000 ${isLoaded ? 'opacity-100' : ''}`} 
              data-animate="fade-in-up"
            >
              <div className="mx-auto max-w-[800px] text-center md:text-left">
                {/* Greeting badge */}
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium backdrop-blur-sm"
                  data-animate="slide-in-left"
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Available for new projects</span>
                </div>

                {/* Main heading with gradient */}
                <h1 className="typingText mb-6 font-bold leading-tight text-white text-center md:text-left text-4xl sm:text-5xl md:text-5xl lg:text-7xl drop-shadow-[0_0_30px_rgba(0,255,128,0.6)]">
                  <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
                    Mehmed Muric
                  </span>
                </h1>

                {/* Subtitle */}
                <div className="mb-6 space-y-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-200">
                    Full-Stack Developer
                  </h2>
                  <p className="text-lg sm:text-xl text-green-400 font-medium">
                    Building Modern Web & Mobile Solutions
                  </p>
                </div>

                {/* Description */}
                <p className="mb-8 text-base text-center md:text-left leading-relaxed text-gray-300 sm:text-lg md:text-xl max-w-[600px]">
                  I craft scalable, high-performance applications using cutting-edge technologies. 
                  Passionate about clean code, user experience, and delivering solutions that make an impact.
                </p>

                {/* Technology badges */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                  {techStack.map((tech, idx) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-dark/50 border border-green-500/20 text-green-400 text-sm font-medium backdrop-blur-sm hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                      data-animate="scale-in-center"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-8">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/MojCV.pdf"
                    className="group relative px-8 py-4 rounded-lg bg-mygreen text-black font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,128,0.4)] hover:shadow-[0_0_30px_rgba(0,255,128,0.6)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span>🔥</span>
                      <span>View my CV</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/mehmedmuric"
                    className="group relative px-8 py-4 rounded-lg bg-transparent border-2 border-green-500 text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,255,128,0.3)] hover:shadow-[0_0_25px_rgba(0,255,128,0.5)] hover:bg-green-500/10"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub Profile</span>
                    </span>
                  </Link>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-6">
                  <a
                    href="https://github.com/mehmedmuric"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-full bg-dark/50 border border-green-500/20 text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/mehmed-muric-185297232"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-full bg-dark/50 border border-green-500/20 text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Profile Image */}
          <div
            className={`w-full opacity-0 px-4 md:w-[35%] flex flex-col items-center justify-center text-center transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100' : ''}`}
            data-animate="fade-in-up"
          >
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-green-500 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow" />
              
              {/* Profile image container */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-green-500 shadow-[0_0_30px_rgba(0,255,128,0.4)] group-hover:shadow-[0_0_60px_rgba(0,255,128,0.6)] transition-all duration-500 group-hover:scale-105">
                <Image
                  src="/images/logo/mehmed.jpg"
                  alt="Mehmed Muric - Full-Stack Developer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width={500}
                  height={500}
                  priority
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-dark/80 border border-green-500/30 backdrop-blur-md shadow-lg">
                <p className="text-green-400 font-semibold text-sm md:text-base">
                  Software Engineer
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-green-500/30 rounded-full animate-spin-slow hidden md:block" />
              <div className="absolute -bottom-8 -left-8 w-16 h-16 border-2 border-green-500/20 rounded-full animate-spin-slow-reverse hidden md:block" />
            </div>

            {/* Stats or additional info */}
            <div className="mt-16 grid grid-cols-3 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">3+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">20+</div>
                <div className="text-sm text-gray-400">Projects Done</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">5+</div>
                <div className="text-sm text-gray-400">Tech Stack</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="flex flex-col items-center gap-2 text-green-400/60">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
<div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="rgba(45, 255, 0, 0.16)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="rgba(45, 255, 0, 0.16)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="rgba(45, 255, 0, 0.16)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="rgba(45, 255, 0, 0.16))"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="rgba(45, 255, 0, 0.16)"
            />
            <defs>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="rgba(45, 255, 0, 0.16)"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="rgba(45, 255, 0, 0.16)"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="rgba(45, 255, 0, 0.16)"
            />
            <circle cx="220" cy="63" r="43" fill="rgba(45, 255, 0, 0.16)" />
            <defs>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="rgba(45, 255, 0, 0.16)"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="rgba(45, 255, 0, 0.16)"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
  );
};

export default Hero;
    
