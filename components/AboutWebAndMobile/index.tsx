"use client";

import SectionTitle from "../Common/SectionTitle";
import FeatureGrid from "./FeatureGrid";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutWebAndMobile = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="features" className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Background - Technical Dot Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)]" />

      {/* Background - Radial Gradient for depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT/0.05),transparent_70%)] pointer-events-none" />

      {/* Additional Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 sm:mb-24 px-4"
        >
          <SectionTitle
            title="What I Deliver"
            paragraph="Scalable, high-performance web and mobile solutions tailored for growth."
            align="center"
          />
        </motion.div>

        {/* Feature Grid */}
        <FeatureGrid />

      </div>
    </section>
  );
};

export default AboutWebAndMobile;
