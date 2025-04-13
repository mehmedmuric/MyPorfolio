
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import SvgTech3D from "@/components/3Dobjects";
import BlogList from "@/components/Blog";



export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <SvgTech3D />
      <Brands />
      <AboutSectionTwo />
      <BlogList />
      <Contact />
    </>
  );
}
