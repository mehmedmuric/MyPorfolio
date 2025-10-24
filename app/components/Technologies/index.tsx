"use client";

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
    <section className="pt-20 pb-24 bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5 bg-gray-900">
      <div className="container">
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
              className="group relative flex flex-col items-center justify-center p-5 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:scale-105 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[80%] xl:w-auto max-w-[200px]"
            >
              <div className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-mygreen/30 to-transparent group-hover:from-mygreen/30 transition-all duration-300">
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={100}
                  height={100}
                  className="object-contain  group-hover:opacity-100 transition-all duration-300"
                  priority
                />
              </div>

              <p className="mt-3 text-sm sm:text-base font-semibold text-center text-white group-hover:text-mygreen transition-colors duration-300">
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
