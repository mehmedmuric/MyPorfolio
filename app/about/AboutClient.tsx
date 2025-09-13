"use client";
import Image from "next/image";
import AboutSection from "../components/AboutWebAndMobile";
import Breadcrumb from "../components/Common/Breadcrumb";

import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const AboutClient  = () => {
  useScrollAnimations();
  return (
    <>
      <Breadcrumb pageName="About Me" description="" />
      <AboutSection />

      <div
        className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center md:items-start gap-10 sm:gap-16 lg:gap-20 opacity-0"
        data-animate="slide-in-bottom"
      >
        {/* Tekst */}
        <div className="flex-1 text-center md:text-left">
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

        {/* Slika */}
        <div className="flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden mt-10 md:mt-0">
          <Image
            src="/images/about/aboutme.svg"
            alt="Mehmed Muric"
            className="w-full h-full"
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
};

export default AboutClient ;
