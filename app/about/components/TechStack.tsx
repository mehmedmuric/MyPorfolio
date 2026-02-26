"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const techStack = [
    { src: "/images/models/javascript.svg", label: "JavaScript" },
    { src: "/images/models/typescript.svg", label: "TypeScript" },
    { src: "/images/models/react.svg", label: "React" },
    { src: "/images/models/nextjs.svg", label: "Next.js" },
    { src: "/images/models/nodejs.svg", label: "Node.js" },
    { src: "/images/models/tailwindcss.svg", label: "TailwindCSS" },
    { src: "/images/models/mongodb.svg", label: "MongoDB" },
    { src: "/images/models/mysql.svg", label: "MySQL" },
    { src: "/images/models/amazonAWS.svg", label: "AWS" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
};

const TechStack = () => {
    return (
        <section className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col mb-10 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">Tech Stack</h2>
                <p className="text-gray-400">The tools and technologies I use to build scalable applications.</p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
            >
                {techStack.map((tech, index) => (
                    <motion.div
                        key={tech.label}
                        variants={itemVariants}
                        className="group relative flex flex-col items-center justify-center p-6 bg-white/[0.01] border border-white/[0.05] rounded-2xl hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-300"
                    >
                        {/* Subtle glow on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="relative mb-4 w-12 h-12 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-out">
                            <Image
                                src={tech.src}
                                alt={tech.label}
                                width={48}
                                height={48}
                                className="drop-shadow-[0_0_10px_rgba(255,255,255,0.0)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
                            />
                        </div>

                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                            {tech.label}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default TechStack;
