"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Download } from "lucide-react";
import { Button } from "../ui/button";
import SocialLinks from "./SocialLinks";
import { motion } from "framer-motion";

export default function HeroContent() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 lg:gap-10 relative z-10 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
        >

            {/* 1. Status Badge & Greeting */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-default select-none shadow-[0_0_15px_-5px_#10b981]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Available for New Projects
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground/80">
                    <span className="text-lg animate-wave origin-bottom-right inline-block">👋</span>
                    <span>Hi, I'm <span className="text-foreground font-semibold">Mehmed Muric</span></span>
                </div>
            </motion.div>

            {/* 2. Main Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] sm:leading-[1.1]">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/60">
                        Crafting Digital
                    </span>
                    <span className="relative inline-block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-200 to-teal-400 animate-shimmer bg-[length:200%_auto]">
                            Excellence
                        </span>
                        {/* Clean Underline */}
                        <div className="absolute -bottom-1 left-0 w-full h-[6px] bg-primary/20 -skew-x-12 -z-10 rounded-sm" />
                    </span>
                </h1>

                <p className="text-lg sm:text-lg text-muted-foreground/80 leading-relaxed text-balance max-w-lg mx-auto lg:mx-0 font-light">
                    I architect modern, scalable web and mobile solutions. Specializing in high-performance applications with premium aesthetics and seamless user experiences.
                </p>
            </motion.div>

            {/* 3. CTA Actions */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto mt-4">
                <div className="relative group w-full sm:w-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-emerald-400 to-teal-400 rounded-lg blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                    <Link href="/contact" className="relative block w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto h-12 px-6 text-sm bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] shadow-[0_0_20px_rgba(0,255,128,0.2)] hover:shadow-[0_0_30px_rgba(0,255,128,0.4)] transition-all duration-300 font-semibold tracking-wide rounded-lg flex items-center justify-center"
                        >
                            Start a Project
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <a href="/MehmedMuricCv.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto h-12 px-6 text-sm border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 rounded-lg group"
                    >
                        <Download className="mr-2 w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                        View Resume
                    </Button>
                </a>
            </motion.div>

            {/* 4. Social Links */}
            <motion.div variants={itemVariants} className="pt-4 border-t border-white/5 w-full flex justify-center lg:justify-start">
                <SocialLinks />
            </motion.div>
        </motion.div>
    );
}
