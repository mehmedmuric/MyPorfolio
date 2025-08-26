'use client'
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const Features = () => {
  useScrollAnimations();
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="About Web and Mobile Applications"
            paragraph="I specialize in building high-performance web and mobile applications tailored to your business needs from sleek user interfaces to scalable backend solutions."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 opacity-0" data-animate="slide-in-bottom">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
