"use client";

import brandsData from "./brandsData";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import CertificationCard from "./CertificationCard";

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
      </div>

      <Container className="relative z-10">
        <div className="mb-16 md:mb-24">
          <SectionTitle
            title="Certifications & Awards"
            paragraph="Professional credentials validating expertise in modern web technologies and cloud infrastructure."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {brandsData.map((brand, index) => (
            <CertificationCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Certifications;
