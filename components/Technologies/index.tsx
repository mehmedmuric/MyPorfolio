'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import { technologies, categories as categoryKeys, coreStack } from "./data";
import { TechCategory } from "./types";
import TechFilter from "./TechFilter";
import TechCard from "./TechCard";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const Technologies = () => {
  const t = useTranslations().technologies;
  const [activeCategory, setActiveCategory] = useState<TechCategory>("all");

  const categories = categoryKeys.map((cat) => ({
    ...cat,
    label: t.categories[cat.key as keyof typeof t.categories] ?? cat.label,
  }));

  const filteredTechnologies =
    activeCategory === "all"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <section id="technologies" className="section-y relative overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        <div className="ambient-orb top-[-10%] right-[-5%] hidden h-[500px] w-[500px] bg-primary/5 sm:block" />
        <div className="ambient-orb bottom-[-10%] left-[-5%] hidden h-[500px] w-[500px] bg-primary/5 sm:block" />
      </div>


      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <SectionTitle
            title={t.title}
            paragraph={t.paragraph}
            align="center"
            mb="0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-8 overflow-x-auto no-scrollbar sm:mb-12 sm:overflow-visible"
          aria-label={t.coreStackAria}
        >
          <div className="flex min-w-max flex-nowrap items-center justify-start gap-2 px-0.5 sm:min-w-0 sm:flex-wrap sm:justify-center sm:gap-2.5">
            {coreStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-primary/15 bg-primary/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary transition-colors duration-300 hover:border-primary/35 hover:bg-primary/[0.1]"
              >
                {tech === "AI Integration"
                  ? t.labels?.aiIntegration || tech
                  : tech}
              </span>
            ))}
          </div>
        </motion.div>

        <TechFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.04,
              },
            },
          }}
          className="grid grid-cols-2 gap-3 xs:grid-cols-3 sm:grid-cols-4 sm:gap-6 md:grid-cols-5 lg:grid-cols-6"
        >
          <AnimatePresence mode="sync" initial={false}>
            {filteredTechnologies.map((tech, index) => (
              <TechCard key={tech.name} tech={tech} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

export default Technologies;
