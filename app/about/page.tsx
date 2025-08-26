"use client";
import Image from "next/image";
import AboutSection from "../components/AboutWebAndMobile";
import Breadcrumb from "../components/Common/Breadcrumb";

import { Metadata } from "next";

import useScrollAnimations from "@/app/hooks/useScrollAnimations";



const AboutPage = () => {
  useScrollAnimations();
  return (
    <>
      <Breadcrumb
        pageName="About Me"
        description="--------"
      />
      <AboutSection />
      
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row items-center md:items-start gap-20 opacity-0" data-animate="slide-in-bottom">
      <div className="flex-1 text-left">
        <h1 className="text-4xl font-bold mb-6 underline underline-offset-4 decoration-mygreen">Hi, I’m Mehmed Muric</h1>
        <p className="text-body-color mb-4">
          I’m a passionate full-stack developer with experience in building modern web and mobile applications. I specialize in crafting high-performance, scalable solutions tailored to meet the unique needs of each client. From sleek, intuitive user interfaces to robust backend systems, I strive to deliver clean, maintainable, and efficient code in every project.
        </p>
        <p className="text-body-color mb-4">
          I have a strong foundation in a wide range of technologies, including React, React Native, Next.js, Node.js, TailwindCSS, Material UI, TypeScript, Appwrite, MongoDB, and MySQL. I’m constantly learning and keeping up with the latest trends to ensure that the applications I develop are fast, secure, and optimized for both performance and user experience.
        </p>
        <p className="text-body-color mb-4">
          My journey in tech began with completing a technical high school, which gave me a solid understanding of programming principles and problem-solving skills. Since then, I’ve dedicated myself to applying that knowledge to real-world projects, helping clients bring their ideas to life with reliable and scalable solutions.
        </p>
        <p className="text-body-color">
          I approach every project with a long-term vision, offering not just development but also ongoing support and optimization, so your applications continue to perform at their best long after launch.
        </p>
      </div>
        
      <div className="flex-shrink-0 w-96 h-96 md:w-auto md:h-80 overflow-hidden mt-36">
        <Image
          src="/images/about/aboutme.svg"
          alt="Mehmed Muric"
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
      </div>

      {/* Tekst s desne strane */}
    </div>
    </>
  );
};

export default AboutPage;
