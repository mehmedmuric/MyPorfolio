'use client';
import Image from "next/image";
import Breadcrumb from "../components/Common/Breadcrumb";

const AboutClient  = () => {
  
  return (
    <>
      <Breadcrumb pageName="About Me" description="" />
       
           
      <div
        className="mx-auto particles-bg overflow-hidden md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 rounded-3xl max-w-6xl sm:px-6 py-8 flex flex-col items-center md:items-start gap-10 sm:gap-16 lg:gap-20 
        bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5 bg-gray-950
        relative
        "
      >
         
                 {/* Cyber grid background */}
              <div className="absolute inset-0 opacity-[0.06] 
                bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
                     linear-gradient(#00ff99_1px,transparent_1px)] 
                bg-[size:50px_50px] " />
        
              {/* Neon radial glows */}
              <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow " />
              <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.06),_transparent_70%)] blur-[120px] " />
        <div className="flex-1 text-center md:text-left z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 underline underline-offset-4 decoration-mygreen">
            Hi, I’m Mehmed Muric
          </h1>
          <p className="text-body-color mb-4 text-sm sm:text-base md:text-lg">
            I’m a passionate full-stack developer from Novi Pazar with a strong drive for building modern web and mobile applications. I specialize in creating high-performance, scalable solutions that are tailored to meet the unique needs of each client. From sleek and intuitive user interfaces to robust backend systems, I always aim to deliver clean, maintainable, and efficient code.
          </p>
          <p className="text-body-color mb-4 text-sm sm:text-base md:text-lg">
            My foundation in tech started at the Technical High School in Novi Pazar, where I graduated as an Information Technology Technician. Currently, I’m finishing my studies in Computer Science at a private university in Novi Pazar, further deepening my knowledge and expertise in the field..
          </p>
          <p className="text-body-color mb-4 text-sm sm:text-base md:text-lg">
            Over the years, I’ve gained solid experience with a wide range of technologies, including React, React Native, Next.js, Node.js, TailwindCSS, Material UI, TypeScript, Appwrite, MongoDB, and MySQL. I’m constantly learning and keeping up with the latest trends to ensure the applications I develop are fast, secure, and optimized for both performance and user experience.
          </p>
          <p className="text-body-color text-sm sm:text-base md:text-lg">
            What drives me most is helping people bring their ideas to life. I approach every project with a long-term vision, not just focusing on development, but also offering ongoing support and optimization, so that applications continue to perform at their best long after launch.
          </p>
        </div>
        
      </div>
    </>
  );
};

export default AboutClient;
