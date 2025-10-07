'use client';

// dynamic import for client-side only components|
import dynamic from "next/dynamic";
import Loader from "./components/Loader";
const AboutSection = dynamic(() => import("./components/About/AboutSection"), {
  ssr: false, // ili true ako treba SEO
  loading: () => <Loader />,
});
const Contact = dynamic(() => import("./components/Contact"), {
  ssr: false, // ili true ako treba SEO
  loading: () => <Loader />,
});
const Certifications = dynamic(() => import("./components/Certifications"), {
  ssr: false, // ili true ako treba SEO
  loading: () => <Loader />,
});
const Features = dynamic(() => import("./components/AboutWebAndMobile"), {
  ssr: false, // ili true ako treba SEO
  loading: () => <Loader />,
});
const Hero = dynamic(() => import("./components/Hero"), {
  ssr: false, // ili true ako treba SEO
  loading: () => <Loader />,
});
const Technologies = dynamic(() => import("./components/Technologies"), {
  ssr: false, // ili true ako treba SEO
  loading: () => <Loader />,
});
const BlogList = dynamic(() => import("./components/Blog"), {
  ssr: false, // ili true ako treba SEO
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