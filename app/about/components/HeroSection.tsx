"use client";

import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <section className="relative w-full max-w-4xl mx-auto pt-20 pb-16 sm:pt-32 sm:pb-24 flex flex-col items-center justify-center text-center">
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-primary/20 blur-[100px] sm:blur-[120px] opacity-50 pointer-events-none -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
            >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-gray-300">Available for new opportunities</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
            >
                Building scalable digital <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                    experiences
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed"
            >
                Hello, I'm <span className="text-white font-medium">Mehmed Muric</span>. A Software Engineer focused on scalable systems, clean UX, and production-ready code. I turn complex problems into elegant, performant solutions.
            </motion.p>
        </section>
    );
};

export default HeroSection;
