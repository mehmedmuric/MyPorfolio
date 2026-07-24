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
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-2xl hover:shadow-primary/5 active:border-primary/25 active:bg-zinc-900/60 md:hover:-translate-y-1"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 max-md:hidden"
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

            <div className="relative z-10 flex h-full flex-col p-5 sm:p-8">
                <div className="relative mb-5 flex h-12 w-12 items-center justify-center sm:mb-6">
                    <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
                    <div className="relative z-10 flex h-full w-full items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-primary/40 group-active:border-primary/40">
                        <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                </div>

                <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary group-active:text-primary sm:mb-3 sm:text-xl">
                    {title}
                </h3>

                <p className="flex-grow text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
                    {paragraph}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-transform duration-700 ease-out group-hover:scale-x-100 group-hover:opacity-100 group-active:scale-x-100 group-active:opacity-100" />
            </div>
        </motion.div>
    );
};

export default FeatureCard;
