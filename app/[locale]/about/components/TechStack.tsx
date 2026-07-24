"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";

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
    const t = useTranslations().aboutPage.techStack;

    return (
        <section className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col mb-10 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
                <p className="text-gray-400">{t.paragraph}</p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
            >
                {techStack.map((tech) => (
                    <motion.div
                        key={tech.label}
                        variants={itemVariants}
                        className="group relative flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.01] p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.03] active:bg-white/[0.04] sm:p-6"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="relative mb-4 flex h-12 w-12 items-center justify-center opacity-90 transition-all duration-300 ease-out group-hover:scale-110 group-hover:opacity-100 group-active:scale-105">
                            <Image
                                src={tech.src}
                                alt={tech.label}
                                width={48}
                                height={48}
                                sizes="48px"
                                className="drop-shadow-[0_0_12px_rgba(255,255,255,0.08)] transition-all duration-300"
                            />
                        </div>

                        <span className="text-sm font-medium text-foreground/75 transition-colors duration-300 group-hover:text-white">
                            {tech.label}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default TechStack;
