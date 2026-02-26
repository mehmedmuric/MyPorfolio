"use client";

import { motion } from "framer-motion";

const values = [
    {
        title: "Relentless Quality",
        description: "Code should not just work; it must be secure, readable, and fundamentally robust.",
        icon: (
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "User-Centric Empathy",
        description: "Every architectural choice is driven by the end-user's experience and satisfaction.",
        icon: (
            <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "Continuous Growth",
        description: "The best engineering happens when ego steps aside for curiosity and daily learning.",
        icon: (
            <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    }
];

const CoreValues = () => {
    return (
        <section className="w-full max-w-5xl mx-auto py-12">
            <div className="flex flex-col items-center mb-12 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">My Principles</h2>
                <p className="text-gray-400 max-w-xl">
                    The foundation of how I approach problem solving, architecture, and collaborating on a team.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((v, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                        className="flex flex-col group p-8 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Soft Radial Glow on hover */}
                        <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="w-12 h-12 bg-white/[0.04] border border-white/[0.05] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            {v.icon}
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-3">{v.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            {v.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CoreValues;
