'use client'; // force rebuild // force rebuild

// static import for LCP optimization
import Hero from "@/components/Hero";

// dynamic import for client-side only components below the fold
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
const AboutSection = dynamic(() => import("@/components/About/AboutSection"), {
  loading: () => <Loader />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <Loader />,
});

const Certifications = dynamic(() => import("@/components/Certifications"), {
  loading: () => <Loader />,
});

const Features = dynamic(() => import("@/components/AboutWebAndMobile"), {
  loading: () => <Loader />,
});



const Technologies = dynamic(() => import("@/components/Technologies"), {
  loading: () => <Loader />,
});

const BlogList = dynamic(() => import("@/components/Blog"), {
  loading: () => <Loader />,
});




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