'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Simple SVG icons
const SupportIcon = () => (
  <svg className="w-7 h-7 md:w-8 md:h-8 text-mygreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);

const SpeedIcon = () => (
  <svg className="w-7 h-7 md:w-8 md:h-8 text-mygreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9z" />
  </svg>
);

const ScalableIcon = () => (
  <svg className="w-7 h-7 md:w-8 md:h-8 text-mygreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06
      a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33
      1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09
      A1.65 1.65 0 007.6 20
      a1.65 1.65 0 00-1.82.33l-.06.06
      a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82
      A1.65 1.65 0 013 13.5V13a2 2 0 012-2h.09
      a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82
      l-.06-.06a2 2 0 012.83-2.83l.06.06
      a1.65 1.65 0 001.82.33h.19A1.65 1.65 0 00112 5V3a2 2 0 014 0v.09
      a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06
      a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.19
      A1.65 1.65 0 0019.5 11h.09a2 2 0 012 2v.09
      a1.65 1.65 0 00-.33 1.82z"
    />
  </svg>
);

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // FIX ✔ now HTMLLIElement instead of HTMLDivElement
  const textRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.1,
        ease: 'power1.out',
      });

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          },
          opacity: 0,
          y: 40,
          scale: 0.94,
          duration: 1.3,
          ease: 'power2.out',
        });
      }

      gsap.from(textRefs.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        opacity: 0,
        x: 36,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.to('.cyber-grid', {
        backgroundPosition: '60px 60px',
        repeat: -1,
        yoyo: true,
        duration: 14,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <SupportIcon />,
      title: 'Customer Support for All Clients',
      text: (
        <>
          Every project comes with{' '}
          <span className="text-mygreen/95 font-medium">reliable long-term support</span>. I ensure ongoing improvements and updates.
        </>
      ),
    },
    {
      icon: <SpeedIcon />,
      title: 'Modern & Fast Applications',
      text: (
        <>
          I build sleek,{' '}
          <span className="text-mygreen/95 font-medium">high-performance applications</span> with cutting-edge technologies.
        </>
      ),
    },
    {
      icon: <ScalableIcon />,
      title: 'Custom Scalable Solutions',
      text: (
        <>
          Tailored to <span className="text-mygreen/95 font-medium">your needs</span> — scalable and cleanly structured.
        </>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-24 lg:py-28 px-4 sm:px-8 bg-[#050d07] isolate text-gray-100"
      aria-label="About Section"
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0 opacity-[0.08] cyber-grid pointer-events-none bg-[linear-gradient(90deg,#00ff99_1.5px,transparent_1.5px),linear-gradient(#00ff99_1.5px,transparent_1.5px)] bg-[size:54px_54px]" />

      {/* Neon glows */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_70%_40%,_rgba(0,255,128,0.15),_transparent_63%)] blur-3xl animate-pulse-slow" />
      <div className="absolute -inset-72 bg-[radial-gradient(circle_at_15%_90%,_rgba(0,255,128,0.10),_transparent_66%)] blur-[120px]" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-stretch gap-y-10 md:gap-x-14 lg:gap-x-20">

          {/* IMAGE LEFT */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center">
            <div
              ref={imageRef}
              className="relative mb-8 md:mb-0 aspect-[25/24] max-w-[340px] sm:max-w-[410px] md:max-w-[460px] rounded-full p-3 md:p-6 border-4 border-mygreen/20 shadow-xl shadow-mygreen/20 bg-gradient-to-tr from-mygreen/20 via-transparent to-mygreen/10 transition-all duration-300 flex-shrink-0"
            >
              <div className="absolute inset-0 rounded-full blur-2xl opacity-30 bg-mygreen/35 animate-pulse pointer-events-none" />

              <Image
                src="/images/about/aboutsection.svg"
                alt="About illustration"
                priority
                width={460}
                height={460}
                className="relative z-10 w-full h-auto rounded-full drop-shadow-[0_0_42px_rgba(0,255,128,0.18)] hover:scale-105 transition-all duration-400"
                sizes="(max-width: 600px) 90vw, 460px"
              />
            </div>
          </div>

          {/* TEXT RIGHT */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <header className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-mygreen/70 mb-2 select-none drop-shadow-[0_2px_12px_#00ff81ad]">
                About Me
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white mb-2 drop-shadow-[0_2px_12px_rgba(0,255,128,0.07)]">
                Software that <span className="text-mygreen">empowers</span>
              </h2>

              <p className="mt-2 max-w-xl text-gray-100/90 text-base sm:text-lg md:text-[1.1rem] leading-relaxed">
                I deliver robust, modern applications with long-term client support and real after-launch care.
              </p>
            </header>

            <ul className="max-w-xl w-full flex flex-col gap-6">
              {features.map((feature, idx) => (
                <li
                  key={feature.title}
                  ref={(el) => el && (textRefs.current[idx] = el)}
                  className="
                    flex flex-row items-start bg-gradient-to-l from-black via-transparent to-black
                    rounded-xl shadow-lg border-l-4 border-mygreen/40 py-4 px-5 gap-3
                    hover:shadow-[0_0_20px_#0ad55282] transition-shadow duration-300
                  "
                  style={{ minHeight: 80 }}
                >
                  <span className="shrink-0">{feature.icon}</span>

                  <span>
                    <span className="block font-bold text-base md:text-lg text-mygreen mb-1 leading-tight">
                      {feature.title}
                    </span>
                    <span className="block text-sm sm:text-base text-gray-100/90 leading-relaxed">
                      {feature.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-9 flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="/projects"
                className="
                  group inline-flex items-center px-6 py-3 border-2 border-mygreen bg-mygreen text-black font-bold rounded-lg
                  hover:bg-transparent hover:text-mygreen transition-all duration-200 shadow-[0_0_12px_#00ff8170] hover:shadow-[0_0_24px_#00ff81c0]
                  focus:outline-none focus:ring-2 focus:ring-mygreen/60 focus:ring-offset-2 text-base
                "
              >
                View Projects
                <svg className="ml-2 w-5 h-5 text-mygreen group-hover:translate-x-1 transition-transform duration-150" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="/contact"
                className="
                  inline-flex items-center px-6 py-3 border border-mygreen/60 bg-transparent text-mygreen font-bold rounded-lg
                  hover:bg-mygreen hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mygreen/50 text-base
                "
              >
                Contact Me
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
