"use client";

import React from "react";
import {
    Code2,
    Layers,
    FileText,
    Sparkles,
    Terminal,
    Database,
    Cloud,
    PenTool,
    Server,
    Smartphone,
    Box,
    Cpu,
    Globe,
    Layout,
    GitBranch
} from "lucide-react";

const TECH_STACK = [
    { name: "React", icon: <Code2 className="w-4 h-4" /> },
    { name: "Next.js", icon: <Layers className="w-4 h-4" /> },
    { name: "TypeScript", icon: <FileText className="w-4 h-4" /> },
    { name: "Tailwind", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Node.js", icon: <Terminal className="w-4 h-4" /> },
    { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
    { name: "AWS", icon: <Cloud className="w-4 h-4" /> },
    { name: "Figma", icon: <PenTool className="w-4 h-4" /> },
    { name: "Redis", icon: <Server className="w-4 h-4" /> },
    { name: "Mobile", icon: <Smartphone className="w-4 h-4" /> },
    { name: "Three.js", icon: <Box className="w-4 h-4" /> },
    { name: "Docker", icon: <Layout className="w-4 h-4" /> }, // Using Layout as placeholder for Container
    { name: "GraphQL", icon: <Globe className="w-4 h-4" /> },
    { name: "Git", icon: <GitBranch className="w-4 h-4" /> },
    { name: "Prisma", icon: <Database className="w-4 h-4" /> },
    { name: "System Arch", icon: <Cpu className="w-4 h-4" /> },
];

export default function TechTicker() {
    // Duplicate the list enough times to ensure smooth scrolling
    // 2 repetitions are enough for the -50% translation logic (A B -> A B)
    const tickerItems = [...TECH_STACK, ...TECH_STACK];

    return (
        <div className="w-full relative overflow-hidden group select-none">

            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Containers - Dual Flow */}
            <div className="flex flex-col gap-3 py-2">
                {/* Row 1: Normal speed, default direction */}
                <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                    {tickerItems.map((tech, i) => (
                        <div
                            key={`r1-${tech.name}-${i}`}
                            className="flex items-center gap-2 mx-3 sm:mx-4 px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 transition-all duration-300 group/item cursor-default hover:shadow-[0_0_15px_-5px_var(--primary)]"
                        >
                            <span className="text-muted-foreground group-hover/item:text-primary transition-colors duration-300 opacity-70 group-hover/item:opacity-100">
                                {tech.icon}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground/60 group-hover/item:text-foreground transition-colors whitespace-nowrap">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Row 2: Reverse direction, offset start */}
                <div className="flex w-max animate-scroll-reverse hover:[animation-play-state:paused] ml-[-50%]">
                    {tickerItems.slice().reverse().map((tech, i) => (
                        <div
                            key={`r2-${tech.name}-${i}`}
                            className="flex items-center gap-2 mx-3 sm:mx-4 px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 transition-all duration-300 group/item cursor-default hover:shadow-[0_0_15px_-5px_var(--primary)]"
                        >
                            <span className="text-muted-foreground group-hover/item:text-emerald-400 transition-colors duration-300 opacity-70 group-hover/item:opacity-100">
                                {tech.icon}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground/60 group-hover/item:text-foreground transition-colors whitespace-nowrap">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
