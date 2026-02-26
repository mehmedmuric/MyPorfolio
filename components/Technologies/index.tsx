'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import { technologies, categories } from "./data";
import { TechCategory } from "./types";
import TechFilter from "./TechFilter";
import TechCard from "./TechCard";
import { cn } from "@/lib/utils";

const Technologies = () => {
  const [activeCategory, setActiveCategory] = useState<TechCategory>("all");

  const filteredTechnologies = useMemo(() => {
    return activeCategory === "all"
      ? technologies
      : technologies.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="technologies" className="py-16 lg:py-24 relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>


      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionTitle
            title="Technologies"
            paragraph="A comprehensive stack to power modern, scalable applications."
            align="center"
          />
        </motion.div>

        <TechFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <motion.div
          key={activeCategory}
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechnologies.map((tech, index) => (
              <TechCard
                key={tech.name}
                tech={tech}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

export default Technologies;
