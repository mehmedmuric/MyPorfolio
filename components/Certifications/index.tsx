"use client";

import brandsData from "./brandsData";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import CertificationCard from "./CertificationCard";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const Certifications = () => {
  const t = useTranslations().certifications;

  return (
    <section id="certifications" className="section-y bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20" aria-hidden="true">
        <div className="ambient-orb top-1/4 left-1/4 w-96 h-96 bg-primary/20" />
        <div className="ambient-orb bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20" />
      </div>

      <Container className="relative z-10">
        <div className="mb-16 md:mb-24">
          <SectionTitle
            title={t.title}
            paragraph={t.paragraph}
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
