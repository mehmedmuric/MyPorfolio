
import AboutSection from "@/components/About/AboutSection";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Free Next.js Template for Startup and SaaS",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Me"
        description="Kreiram brza i moderna web rešenja uz punu podršku i prilagodljivost klijentu."
      />
      <AboutSection />
    </>
  );
};

export default AboutPage;
