'use client'
import Image from "next/image";
import Link from "next/link";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

const Hero = () => {
  useScrollAnimations();

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-gray-900 bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5 pb-20 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      {/* ✅ Particles sa zelenim glow efektom */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          detectRetina: true,
          fpsLimit: 60,
          particles: {
            number: {
              value:
                typeof window !== "undefined" && window.innerWidth < 768 ? 25 : 60,
              density: { enable: true, area: 800 },
            },
            color: { value: "#00ff99" },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: false,
            },
            size: {
              value: { min: 1, max: 3 },
            },
            move: {
              enable: true,
              speed: 0.6,
              direction: "none",
              outModes: "out",
            },
            // 💚 Glow efekat
            shadow: {
              enable: true,
              blur: 6,
              color: "#00ff99",
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              repulse: { distance: 70, duration: 0.4 },
              push: { quantity: 3 },
            },
          },
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="container relative z-10">
        <div className="-mx-4 flex flex-wrap justify-between">
          {/* ✅ Levi deo */}
          <div className="w-full px-4 md:w-[40%]">
            <div className="leftSide opacity-0 mt-14" data-animate="blink-1">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="typingText mb-5 font-bold leading-tight text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl">
                  Mehmed Muric
                </h1>
                <p className="dark:text-body-color-dark mb-12 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
                  Hi, I’m Mehmed Muric, a full-stack developer crafting modern web and mobile applications. I work with technologies like React, React Native, Next.js, Node.js, TailwindCSS, TypeScript, Appwrite, MongoDB, and MySQL — delivering clean, scalable, and high-performance solutions.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mb-12">
                  <a
                    target="_blank"
                    href="/MojCV.pdf"
                    className="rounded-lg bg-mygreen px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-transparent border border-mygreen hover:text-mygreen"
                  >
                    🔥 View my CV
                  </a>
                  <Link
                    target="_blank"
                    href="https://github.com/mehmedmuric"
                    className="inline-block rounded-lg bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-transparent border border-mygreen"
                  >
                    GitHub Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Desni deo */}
          <div
            className="w-full opacity-0 px-4 md:w-[55%] flex flex-col items-center justify-center text-center ml-auto mt-6 sm:mt-10 md:mt-0"
            data-animate="blink-1"
          >
            <div className="profileImage relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-mygreen mb-6">
              <Image
                src="/images/logo/mehmed.jpg"
                alt="mehmed"
                className="w-full h-full object-cover rounded-full"
                width={500}
                height={500}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 50vw"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4 italic">
              Software Engineer
            </h2>
            <p className="text-lg text-gray-500 mb-4 underline underline-offset-8 decoration-mygreen">
              Full-stack developer | Mobile & Web Applications
            </p>
            <p className="text-base text-gray-400">
              Developer with experience in building modern applications using the latest technologies. I am dedicated to continuous learning and delivering the best solutions for my clients.
            </p>
            <div className="socialLinks flex justify-center mt-6">
              <a
                href="https://github.com/mehmedmuric"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-mygreen mx-2 underline decoration-dashed decoration-mygreen/50 underline-offset-8"
              >
                <i className="fab fa-github"></i> GitHub
              </a>
              <a
                href="https://linkedin.com/in/mehmed-muric-185297232"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-mygreen mx-2 underline decoration-dashed decoration-mygreen/50 underline-offset-8"
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
