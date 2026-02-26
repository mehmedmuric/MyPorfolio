"use client";

import { Feature } from "./features";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
    feature: Feature;
    index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
    const { icon: Icon, title, paragraph } = feature;
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="group relative rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"
            onMouseMove={handleMouseMove}
        >
            {/* Hover Spotlight Effect - Enhanced */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--primary-rgb), 0.08),
              transparent 80%
            )
          `,
                }}
            />

            {/* Content Container */}
            <div className="relative h-full flex flex-col p-6 sm:p-8 z-10">
                {/* Icon Header with Glow */}
                <div className="mb-6 relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 w-full h-full rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500 ease-out">
                        <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base flex-grow font-medium">
                    {paragraph}
                </p>

                {/* Bottom Active Border */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center opacity-0 group-hover:opacity-100" />
            </div>
        </motion.div>
    );
};

export default FeatureCard;
