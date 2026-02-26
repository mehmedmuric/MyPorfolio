"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CTA = () => {
    return (
        <section className="w-full max-w-4xl mx-auto py-16 sm:py-24 relative">
            {/* Background glow for emphasis */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-white/10 rounded-3xl bg-white/[0.01] backdrop-blur-md shadow-2xl overflow-hidden"
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Let&apos;s build something great.</h2>
                <p className="text-gray-400 max-w-xl mb-10 text-lg">
                    Whether you have a project in mind, need technical consultation, or just want to chat about the latest web technologies, I&apos;m always open to new opportunities.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href="/contact"
                        className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto"
                    >
                        <span>Get in Touch</span>
                        <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link
                        href="/resume" // Optional link to a resume if they have one or can simply link to projects
                        className="flex items-center justify-center px-8 py-4 bg-white/[0.03] text-white font-medium rounded-xl border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 w-full sm:w-auto"
                    >
                        View Projects
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default CTA;
