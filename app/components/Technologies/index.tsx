"use client";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";

const Technologies = () => {
  useScrollAnimations();
  const [frontendImages, setFrontendImages] = useState([
    { name: "HTML", src: "./images/models/html5.svg" },
    { name: "CSS", src: "./images/models/css3.svg" },
    { name: "JavaScript", src: "./images/models/javascript.svg" },
    { name: "React", src: "./images/models/react.svg" },
    { name: "NextJS", src: "./images/models/nextjs.svg" },
    { name: "TailwindCSS", src: "./images/models/tailwindcss.svg" },
    { name: "SASS", src: "./images/models/sass.svg" },
    { name: "Bootstrap", src: "./images/models/bootstrap.svg" },
    { name: "MaterialUI", src: "./images/models/materialui.svg" },
  ]);

  const [backendImages, setBackendImages] = useState([
    { name: "NodeJS", src: "./images/models/nodejs.svg" },
    { name: "ExpressJS", src: "./images/models/expressjs.svg" },
  ]);

  const [databaseImages, setDatabaseImages] = useState([
    { name: "MongoDB", src: "./images/models/mongodb.svg" },
    { name: "MySQL", src: "./images/models/mysql.svg" },
  ]);

  const [otherImages, setOtherImages] = useState([
    { name: "ReduxJS", src: "./images/models/reduxjs.svg" },
    { name: "TypeScript", src: "./images/models/typescript.svg" },
    { name: "Kali Linux", src: "./images/models/kalilinux.svg" },
    { name: "Amazon AWS", src: "./images/models/amazonAWS.svg" },
  ]);

  return (
    
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
      
        <SectionTitle
          title="Technologies"
          paragraph="---------------------"
          center
          mb="80px"
        />

        {/* Frontend Technologies */}
        <div className="mb-16">
          
          <h2 className="text-3xl drop-shadow-[0px_0px_19px_rgba(0,255,4,1)] font-bold text-center mb-12 opacity-0" data-animate="tracking-in-expand-fwd">Front-end</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 opacity-0" data-animate="slide-in-left">
            {frontendImages.map((image, index) => (
              <div key={index} className="w-full flex justify-center flex-col items-center">
                <div className="p-4 bg-green-700 rounded-2xl shadow-2xl glow-effect">
                  <Image
                    src={image.src}
                    alt={image.name}
                    className="w-20 h-20 object-contain"
                    width={80}
                    height={80}
                  />
                </div>
                <p className="mt-4 text-left dark:text-white text-black text-sm font-medium">{image.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Technologies */}
        <div className="mb-16">
          <h2 className="text-2xl drop-shadow-[0px_0px_19px_rgba(0,255,4,1)] font-bold text-center mb-12 opacity-0" data-animate="tracking-in-expand-fwd">Back-end</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 opacity-0" data-animate="slide-in-left">
            {backendImages.map((image, index) => (
              <div key={index} className="w-full flex justify-center flex-col items-center">
                <div className="p-4 bg-green-700 rounded-2xl shadow-2xl glow-effect">
                  <Image
                    src={image.src}
                    alt={image.name}
                    className="w-20 h-20 object-contain"
                    width={80}
                    height={80}
                  />
                </div>
                <p className="mt-4 text-left dark:text-white text-black text-sm font-medium">{image.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Database Technologies */}
        <div className="mb-16">
          <h2 className="text-2xl drop-shadow-[0px_0px_19px_rgba(0,255,4,1)] font-bold text-center mb-12 opacity-0" data-animate="tracking-in-expand-fwd">Databases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 opacity-0 " data-animate="slide-in-left">
            {databaseImages.map((image, index) => (
              <div key={index} className="w-full flex justify-center flex-col items-center">
                <div className="p-4 bg-green-700 rounded-2xl shadow-2xl glow-effect">
                  <Image
                    src={image.src}
                    alt={image.name}
                    className="w-20 h-20 object-contain"
                    width={80}
                    height={80}
                  />
                </div>
                <p className="mt-4 text-left dark:text-white text-black text-sm font-medium">{image.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Technologies */}
        <div>
          <h2 className="text-2xl drop-shadow-[0px_0px_19px_rgba(0,255,4,1)] font-bold text-center mb-12 opacity-0" data-animate="tracking-in-expand-fwd">Other Tehcnologies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 opacity-0" data-animate="slide-in-left">
            {otherImages.map((image, index) => (
              <div key={index} className="w-full flex justify-center flex-col items-center">
                <div className="p-4 bg-green-700 rounded-2xl shadow-2xl glow-effect">
                  <Image
                    src={image.src}
                    alt={image.name}
                    className="w-20 h-20 object-contain"
                    width={80}
                    height={80}
                  />
                </div>
                <p className="mt-4 text-left dark:text-white text-black text-sm font-medium">{image.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;





