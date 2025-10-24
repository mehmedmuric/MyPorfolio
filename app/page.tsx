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

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";




export default function Home() {
  const particlesInit = async (engine: any) => {
        await loadSlim(engine);
      };

  return (
    
    <>
      <Hero />
      <Features />
      <Technologies />
      <Certifications />
      <BlogList />
      <AboutSection />
      <Contact />
    {/* ✅ Sjajkice */}
                  <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                      background: { color: "transparent" },
                      fpsLimit: 60,
                      particles: {
                        color: { value: "#00ff99" },
                        number: { value: 60, density: { enable: true, area: 600 } },
                        size: { value: { min: 1, max: 3 } },
                        move: { enable: true, speed: 0.6, direction: "none", outModes: "out" },
                        opacity: { value: 0.4 },
                        
                      },
                    }}
                    className="absolute inset-0 z-0 pointer-events-none"
                  />
    </>
  );
}