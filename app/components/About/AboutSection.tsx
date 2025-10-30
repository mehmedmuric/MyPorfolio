'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade-in sekcije
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 2,
        ease: 'power1.out',
      });

      // Slika - sporiji zoom & fade
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          },
          opacity: 0,
          y: 70,
          scale: 0.88,
          duration: 2,
          ease: 'power3.out',
        });
      }

      // Tekst blokovi - sporiji slide + lagan fade
      gsap.from(textRefs.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: 50,
        stagger: 0.4,
        duration: 1.8,
        ease: 'power2.out',
      });

      // Cyber grid sporije "diše"
      gsap.to('.cyber-grid', {
        backgroundPosition: '50px 50px',
        repeat: -1,
        yoyo: true,
        duration: 10,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 bg-[#020b06] text-gray-300"
    >
      {/* Cyber grid background */}
      <div
        className="absolute inset-0 opacity-[0.06] cyber-grid
        bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
             linear-gradient(#00ff99_1px,transparent_1px)] 
        bg-[size:50px_50px]"
      />

      {/* Neon radial glows */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow" />
      <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.06),_transparent_70%)] blur-[120px]" />

      <div className="container mx-auto relative z-10">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Slika */}
          <div className="w-full px-4 lg:w-1/2 flex justify-center lg:justify-start">
            <div
              ref={imageRef}
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
            >
              <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-mygreen/50 animate-pulse-slow" />
              <Image
                src="/images/about/aboutsection.svg"
                alt="about image"
                priority
                width={500}
                height={480}
                className="relative z-10 drop-shadow-[0_0_35px_rgba(0,255,120,0.25)] transition-all duration-500 hover:drop-shadow-[0_0_45px_rgba(0,255,120,0.5)]"
              />
            </div>
          </div>

          {/* Tekst */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              {[
                {
                  title: 'Customer Support for All Clients',
                  text: 'Every project comes with reliable long-term support. I ensure clients receive ongoing updates, fixes, and improvements for lasting performance.',
                },
                {
                  title: 'Modern & Fast Applications',
                  text: 'I build sleek, high-performance applications with cutting-edge technologies. Every detail is optimized for speed and user experience.',
                },
                {
                  title: 'Custom Scalable Solutions',
                  text: 'Tailored to your needs — every line of code is crafted to fit your business, with scalability and clean structure as priorities.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) textRefs.current[i] = el;
                  }}
                  className="mb-8 last:mb-0 border-l-2 border-mygreen/60 pl-5"
                >
                  <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-mygreen tracking-wide uppercase">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
