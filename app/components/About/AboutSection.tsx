'use client'

import Image from "next/image";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const AboutSection = () => {
  useScrollAnimations();

  return (
    <section className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 
      bg-[#020b06] text-gray-300">
        {/* Cyber grid background */}
      <div className="absolute inset-0 opacity-[0.06] 
        bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
             linear-gradient(#00ff99_1px,transparent_1px)] 
        bg-[size:50px_50px]" />

      {/* Neon radial glows */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow" />
      <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.06),_transparent_70%)] blur-[120px]" />
      
      <div className="container mx-auto relative z-10">
        <div className="-mx-4 flex flex-wrap items-center">

          {/* Slika */}
          <div className="w-full px-4 lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0">
              {/* Pulsirajući neon krug */}
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
              
              <div className="mb-8 border-l-2 border-mygreen/60 pl-5">
                <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-mygreen tracking-wide uppercase">
                  Customer Support for All Clients
                </h3>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Every project comes with reliable long-term support. I ensure clients receive ongoing updates, fixes, and improvements for lasting performance.
                </p>
              </div>

              <div className="mb-8 border-l-2 border-mygreen/60 pl-5">
                <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-mygreen tracking-wide uppercase">
                  Modern & Fast Applications
                </h3>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  I build sleek, high-performance applications with cutting-edge technologies. Every detail is optimized for speed and user experience.
                </p>
              </div>

              <div className="border-l-2 border-mygreen/60 pl-5">
                <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-mygreen tracking-wide uppercase">
                  Custom Scalable Solutions
                </h3>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
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
