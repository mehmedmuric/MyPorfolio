'use client';

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const Technologies = () => {
  const technologies = [
    { name: "HTML", src: "./images/models/html5.svg" },
    { name: "CSS", src: "./images/models/css3.svg" },
    { name: "JavaScript", src: "./images/models/javascript.svg" },
    { name: "React", src: "./images/models/react.svg" },
    { name: "NextJS", src: "./images/models/nextjs.svg" },
    { name: "TailwindCSS", src: "./images/models/tailwindcss.svg" },
    { name: "SASS", src: "./images/models/sass.svg" },
    { name: "Bootstrap", src: "./images/models/bootstrap.svg" },
    { name: "MaterialUI", src: "./images/models/materialui.svg" },
    { name: "NodeJS", src: "./images/models/nodejs.svg" },
    { name: "ExpressJS", src: "./images/models/expressjs.svg" },
    { name: "MongoDB", src: "./images/models/mongodb.svg" },
    { name: "MySQL", src: "./images/models/mysql.svg" },
    { name: "ReduxJS", src: "./images/models/reduxjs.svg" },
    { name: "TypeScript", src: "./images/models/typescript.svg" },
    { name: "Kali Linux", src: "./images/models/kalilinux.svg" },
    { name: "AWS", src: "./images/models/amazonAWS.svg" },
  ];

  return (
    <section
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8
        bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_85%)]"
    >
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 opacity-[0.05] 
        bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
             linear-gradient(#00ff99_1px,transparent_1px)]
        bg-[size:50px_50px]" />

      {/* Neon radial glows */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.08),_transparent_70%)] blur-3xl animate-pulse-slow" />
      <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.04),_transparent_70%)] blur-[120px]" />

      <div className="container relative z-10">
        <SectionTitle
          title="Technologies"
          paragraph="Tech stack I use for front-end, back-end, databases and cloud."
          center
          mb="60px"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-12 place-items-center">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center p-5 rounded-3xl backdrop-blur-lg
                bg-black/60 border border-green-500/20  
                 transition-transform duration-300
                hover:-translate-y-2 hover:scale-105 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[80%] xl:w-auto max-w-[200px]
                
                shadow-lg ring-0 ring-green-500  hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:ring-2"
            >
              <div className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full
                bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.70),_transparent_70%)]
                shadow-[0_0_20px_rgba(0,255,128,0.25)] group-hover:shadow-[0_0_35px_rgba(0,255,128,0.8)]
                transition-all duration-500 animate-pulse-slow"
              >
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-3 text-sm sm:text-base font-semibold text-center text-white/80 
                group-hover:text-green-400 transition-colors duration-300">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;