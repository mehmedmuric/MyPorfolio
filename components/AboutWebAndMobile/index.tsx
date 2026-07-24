"use client";

import SectionTitle from "../Common/SectionTitle";
import FeatureGrid from "./FeatureGrid";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const AboutWebAndMobile = () => {
  const t = useTranslations().capabilities;

  return (
    <section id="features" className="section-y bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03]" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT/0.05),transparent_70%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 sm:mb-24 px-4"
        >
          <SectionTitle
            title={t.title}
            paragraph={t.paragraph}
            align="center"
          />
        </motion.div>

        <FeatureGrid />
      </div>
    </section>
  );
};

export default AboutWebAndMobile;
