"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Briefcase, MapPin, Sparkles } from "lucide-react";

export default function HeroVisual() {
    const ref = useRef<HTMLDivElement>(null);

    // Simplified 3D Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 400, damping: 40 });
    const mouseY = useSpring(y, { stiffness: 400, damping: 40 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

    // Calculate glare positioning based on mouse
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["100%", "0%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["100%", "0%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Detect touch to disable hover effects on mobile
    const [isTouch, setIsTouch] = useState(true);
    useEffect(() => {
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    return (
        <div className="relative flex justify-center items-center h-full w-full perspective-1000 py-6 lg:py-0">

            {/* Main 3D Container */}
            <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-[300px] h-[380px] sm:w-[360px] sm:h-[460px] lg:w-[400px] lg:h-[500px] rounded-[32px] z-10 animate-float"
                style={!isTouch ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
                onMouseMove={!isTouch ? handleMouseMove : undefined}
                onMouseLeave={!isTouch ? handleMouseLeave : undefined}
            >
                {/* 0. Aura Glow */}
                <div className="absolute inset-0 bg-primary/20 rounded-[32px] blur-3xl -z-20 transform scale-90 group-hover:scale-100 transition-transform duration-700 opacity-50" />

                {/* 1. Glass Card Chassis - Enhanced */}
                <div className="absolute inset-0 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-md -z-10 shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Dynamic Glare Overlay */}
                    {!isTouch && (
                        <motion.div
                            className="absolute inset-0 z-10 pointer-events-none"
                            style={{
                                background: "radial-gradient(circle 300px at var(--x) var(--y), rgba(255,255,255,0.15), transparent)",
                                // @ts-ignore
                                "--x": glareX,
                                // @ts-ignore
                                "--y": glareY
                            }}
                        />
                    )}
                </div>

                {/* 2. Image Container */}
                <div className="relative w-full h-full rounded-[30px] overflow-hidden border-[4px] border-white/5 shadow-inner bg-black/40 group">
                    <Image
                        src="/images/logo/mehmed.jpg"
                        alt="Mehmed Muric"
                        fill
                        priority
                        className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>

                {/* 3. Floating Badges */}

                {/* Badge: Experience */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -right-6 top-16 z-20 pointer-events-none select-none hidden sm:block animate-float-delayed"
                    style={!isTouch ? { translateZ: 50 } : undefined}
                >
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg group">
                        <div className="p-2 rounded-xl bg-primary/20 text-primary">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Experience</div>
                            <div className="text-sm font-bold text-white">Full Stack Dev</div>
                        </div>
                    </div>
                </motion.div>

                {/* Badge: Location */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute -left-6 bottom-24 z-20 pointer-events-none select-none hidden sm:block animate-float"
                    style={!isTouch ? { translateZ: 40 } : undefined}
                >
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Location</div>
                            <div className="text-sm font-bold text-white">Novi Pazar, SRB</div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
