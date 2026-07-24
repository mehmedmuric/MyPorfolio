"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Zap, Layout, Code2, Rocket, Users, ShieldCheck } from "lucide-react";
import Link from "@/lib/i18n/link";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const featureIcons = [Layout, Rocket, ShieldCheck] as const;
const featureStyles = [
  {},
  {
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    hoverBorderColor: "group-hover:border-blue-500/50",
  },
  {
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    hoverBorderColor: "group-hover:border-purple-500/50",
  },
] as const;

const AboutSection = () => {
  const t = useTranslations().about;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="about" className="section-y bg-background relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-40 -translate-x-1/3 translate-y-1/3 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.02] pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            className="order-2 lg:order-1 relative group"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative mx-auto aspect-square max-w-md overflow-visible lg:max-w-none">
              <div className="absolute inset-0 -m-4 hidden rounded-full border border-primary/20 opacity-50 animate-[spin_20s_linear_infinite] transition-colors duration-700 group-hover:border-primary/40 sm:-m-8 sm:block" />
              <div className="absolute inset-0 -m-2 hidden rounded-full border border-dashed border-white/10 opacity-50 animate-[spin_30s_linear_infinite_reverse] sm:-m-4 sm:block" />

              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-blue-500/10 opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-60" />

              <div className="relative flex h-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-6 shadow-2xl backdrop-blur-md transition-all duration-700 ease-out sm:p-8 sm:skew-y-2 sm:group-hover:skew-y-0 hover:shadow-[0_0_50px_rgba(0,255,128,0.15)]">
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <Image
                  src="/images/about/aboutsection.svg"
                  alt={t.imageAlt}
                  width={600}
                  height={600}
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                />
              </div>

              {/* Experience Badge — inset on mobile to prevent overflow */}
              <motion.div
                className="absolute bottom-3 right-3 z-20 rounded-2xl border border-white/10 bg-black/90 p-3 shadow-xl backdrop-blur-xl transition-colors duration-300 hover:border-primary/50 sm:bottom-4 sm:right-4 sm:p-4 md:-bottom-6 md:-right-4 lg:bottom-10 lg:-right-10"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,255,128,0.2)]">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-mono font-semibold tracking-wider mb-0.5">{t.experienceLabel}</p>
                    <p className="text-xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{t.experienceValue}</p>
                  </div>
                </div>
              </motion.div>

              {/* Projects Badge */}
              <motion.div
                className="absolute left-3 top-3 z-20 rounded-2xl border border-white/10 bg-black/90 p-3 shadow-xl backdrop-blur-xl transition-colors duration-300 hover:border-blue-500/50 sm:left-4 sm:top-4 sm:p-4 md:top-10 md:-left-4 lg:top-20 lg:-left-10"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: -20 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/30">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-mono font-semibold tracking-wider mb-0.5">{t.focusLabel}</p>
                    <p className="text-lg font-bold text-foreground">{t.focusValue}</p>
                  </div>
                </div>
              </motion.div>

              {/* Clients Badge — desktop/tablet only to avoid cramped mobile collage */}
              <motion.div
                className="absolute bottom-16 left-3 z-20 hidden rounded-2xl border border-white/10 bg-black/90 p-3.5 shadow-xl backdrop-blur-xl transition-colors duration-300 hover:border-purple-500/50 sm:flex md:bottom-20 md:left-4 lg:bottom-10 lg:-left-4"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: -20 }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/20 text-purple-400">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.clientsLabel}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <SectionTitle
                title={t.title}
                paragraph={t.paragraph}
                mb="mb-8"
                align="left"
              />
            </motion.div>

            <motion.div className="space-y-4 mt-8" variants={containerVariants}>
              {t.features.map((feature, index) => (
                <FeatureRow
                  key={feature.title}
                  icon={featureIcons[index] ?? Layout}
                  title={feature.title}
                  description={feature.description}
                  variants={itemVariants}
                  {...(featureStyles[index] ?? {})}
                />
              ))}
            </motion.div>

            <motion.div className="mt-10 flex w-full flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-4" variants={itemVariants}>
              <Button size="lg" variant="premium" className="h-12 min-h-[48px] w-full px-8 sm:w-auto" asChild>
                <Link href="/projects">{t.viewProjects}</Link>
              </Button>
              <Button size="lg" variant="glass" className="h-12 min-h-[48px] w-full px-8 sm:w-auto" asChild>
                <Link href="/contact">{t.ctaContact}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

const FeatureRow = ({
  icon: Icon,
  title,
  description,
  variants,
  color = "text-primary",
  bgColor = "bg-primary/10",
  borderColor = "border-primary/20",
  hoverBorderColor = "group-hover:border-primary/50",
}: {
  icon: typeof Layout;
  title: string;
  description: string;
  variants: Variants;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
}) => (
  <motion.div variants={variants} className="group cursor-default">
    <Card className="border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:bg-white/[0.04] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
      <CardContent className="p-5 flex gap-5 items-start">
        <div className={`h-14 w-14 shrink-0 rounded-2xl ${bgColor} border ${borderColor} ${hoverBorderColor} flex items-center justify-center ${color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-foreground text-lg mb-1.5 group-hover:text-white transition-colors">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed transition-colors group-hover:text-muted-foreground/90">{description}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default AboutSection;
