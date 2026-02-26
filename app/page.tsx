'use client'; // force rebuild // force rebuild

// dynamic import for client-side only components
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

const Hero = dynamic(() => import("@/components/Hero"), {
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