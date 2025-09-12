'use client';

import AboutSection from "./components/About/AboutSection";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Features from "./components/AboutWebAndMobile";
import Hero from "./components/Hero";
import Technologies from "./components/Technologies";
import BlogList from "./components/Blog";




export default function Home() {

  return (
    <>
      <Hero />
      <Features />
      <Technologies />
      <Certifications />
      <BlogList />
      <AboutSection />
      <Contact />
    </>
  );
}