"use client";

import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";

const SvgTech3D = () => {
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
    { name: "KaliLinux", src: "./images/models/kalilinux.svg" },
    { name: "AmazonAWS", src: "./images/models/amazonAWS.svg" },
  ]);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Tehnologije sa kojima radim"
          paragraph="Evo nekih od tehnologija koje koristim u svojim projektima."
          center
          mb="80px"
        />

        {/* Frontend Technologies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Frontend</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {frontendImages.map((image, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="p-4 bg-green-700 rounded-2xl shadow-2xl glow-effect">
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Technologies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Backend</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {backendImages.map((image, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="p-4 bg-green-700 rounded-2xl shadow-2xl glow-effect">
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Technologies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Baze Podataka</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {databaseImages.map((image, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="p-4 bg-green-700 rounded-2xl shadow-2xl glow-effect">
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Technologies */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Ostale Tehnologije</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {otherImages.map((image, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="p-4 bg-green-700 rounded-2xl shadow-2xl glow-effect">
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SvgTech3D;





