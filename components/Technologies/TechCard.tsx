'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { Technology } from "./types";
import { cn } from "@/lib/utils";

interface TechCardProps {
    tech: Technology;
    index: number;
}

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 260,
            damping: 20
        }
    }
};

const TechCard = ({ tech, index }: TechCardProps) => {
    return (
        <motion.div
            layout
            variants={item}
            className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm 
        hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] 
        transition-all duration-500"
        >
            {/* Dynamic Shine Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Advanced Badge Indicator */}
            {tech.proficiency === 'Advanced' && (
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" title="Advanced Proficiency" />
            )}

            <div className="relative w-16 h-16 mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                <Image
                    src={tech.src}
                    alt={tech.name}
                    fill
                    className="object-contain filter drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500"
                />
            </div>

            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {tech.name}
            </span>
        </motion.div>
    );
};

export default TechCard;
