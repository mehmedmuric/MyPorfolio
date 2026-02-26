"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { CheckCircle2, Zap, Layout, Code2, Rocket, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
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
    <section id="about" className="py-16 lg:py-24 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            className="order-2 lg:order-1 relative group"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              {/* Animated orbital ring behind image */}
              <div className="absolute inset-0 -m-8 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite] opacity-50 group-hover:border-primary/40 transition-colors duration-700" />
              <div className="absolute inset-0 -m-4 border border-dashed border-white/10 rounded-full animate-[spin_30s_linear_infinite_reverse] opacity-50" />

              {/* Decorative background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/10 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

              <div className="relative h-full bg-card/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl skew-y-2 group-hover:skew-y-0 transition-all duration-700 ease-out hover:shadow-[0_0_50px_rgba(0,255,128,0.15)] flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                <Image
                  src="/images/about/aboutsection.svg"
                  alt="About illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-105 filter drop-shadow-2xl"
                />
              </div>

              {/* Experience Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 lg:bottom-10 lg:-right-10 bg-black/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/10 hover:border-primary/50 transition-colors group-hover:scale-105 duration-300 z-20"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,255,128,0.2)]">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-mono font-semibold tracking-wider mb-0.5">Experience</p>
                    <p className="text-xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">5+ Years</p>
                  </div>
                </div>
              </motion.div>

              {/* Projects Badge */}
              <motion.div
                className="absolute top-10 -left-6 lg:top-20 lg:-left-10 bg-black/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/10 hover:border-blue-500/50 transition-colors group-hover:scale-105 duration-300 z-20"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: -20 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/30">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-mono font-semibold tracking-wider mb-0.5">Projects</p>
                    <p className="text-lg font-bold text-foreground">50+ Delivered</p>
                  </div>
                </div>
              </motion.div>

              {/* Clients Badge */}
              <motion.div
                className="absolute -bottom-10 left-10 lg:bottom-10 lg:-left-4 bg-black/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/10 hover:border-purple-500/50 transition-colors group-hover:scale-105 duration-300 z-20"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: -20 }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 border border-purple-500/30">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Happy Clients</p>
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
                title="Software that empowers your business"
                paragraph="I deliver robust, modern applications with long-term client support and real after-launch care. My focus is on creating value through clean code, exceptional user experience, and scalable architectures."
                mb="mb-8"
                align="left"
              />
            </motion.div>

            <motion.div className="space-y-4 mt-8" variants={containerVariants}>
              <FeatureRow
                icon={Layout}
                title="Modern & Scalable"
                description="Building applications that grow with your business using React, Next.js, and modern ecosystems."
                variants={itemVariants}
              />
              <FeatureRow
                icon={Rocket}
                title="High Performance"
                description="Optimized for speed, SEO, and efficiency to ensure the best possible user experience."
                variants={itemVariants}
                color="text-blue-400"
                bgColor="bg-blue-500/10"
                borderColor="border-blue-500/20"
                hoverBorderColor="group-hover:border-blue-500/50"
              />
              <FeatureRow
                icon={ShieldCheck}
                title="Long-term Support"
                description="I don't just build and leave. I provide ongoing support, security updates, and feature additions."
                variants={itemVariants}
                color="text-purple-400"
                bgColor="bg-purple-500/10"
                borderColor="border-purple-500/20"
                hoverBorderColor="group-hover:border-purple-500/50"
              />
            </motion.div>

            <motion.div className="mt-12 flex flex-wrap gap-4" variants={itemVariants}>
              <Link href="/projects">
                <Button size="lg" className="rounded-full px-8 h-12 shadow-[0_0_20px_rgba(0,255,128,0.2)] hover:shadow-[0_0_30px_rgba(0,255,128,0.4)] transition-all bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide">
                  View Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-white/10 hover:bg-white/5 hover:border-white/30 transition-all font-medium tracking-wide backdrop-blur-sm">
                  Contact Me
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

const FeatureRow = ({ icon: Icon, title, description, variants, color = "text-primary", bgColor = "bg-primary/10", borderColor = "border-primary/20", hoverBorderColor = "group-hover:border-primary/50" }: any) => (
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
)

export default AboutSection;

