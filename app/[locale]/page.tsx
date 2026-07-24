import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import SectionSkeleton from "@/components/ui/section-skeleton";

const TrustSignals = dynamic(() => import("@/components/TrustSignals"), {
  loading: () => <SectionSkeleton className="h-28" />,
});

const Features = dynamic(() => import("@/components/AboutWebAndMobile"), {
  loading: () => <SectionSkeleton />,
});

const Technologies = dynamic(() => import("@/components/Technologies"), {
  loading: () => <SectionSkeleton />,
});

const Certifications = dynamic(() => import("@/components/Certifications"), {
  loading: () => <SectionSkeleton />,
});

const BlogList = dynamic(() => import("@/components/Blog"), {
  loading: () => <SectionSkeleton />,
});

const AboutSection = dynamic(() => import("@/components/About/AboutSection"), {
  loading: () => <SectionSkeleton />,
});

const HowIWork = dynamic(() => import("@/components/HowIWork"), {
  loading: () => <SectionSkeleton />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <div className="cv-auto">
        <TrustSignals />
      </div>
      <div className="cv-auto">
        <Features />
      </div>
      <div className="cv-auto">
        <Technologies />
      </div>
      <div className="cv-auto">
        <Certifications />
      </div>
      <div className="cv-auto">
        <BlogList />
      </div>
      <div className="cv-auto">
        <AboutSection />
      </div>
      <div className="cv-auto">
        <HowIWork />
      </div>
      <div className="cv-auto">
        <Contact />
      </div>
    </>
  );
}
