"use client";

import React from "react";

export default function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-background">

            {/* 1. Subtle Noise Overlap */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay bg-noise" />

            {/* 2. Modern Grid Pattern */}
            <div
                className="absolute inset-0 z-[0] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
            />

            {/* 3. Ambient Glows (Premium & Subtle) */}

            {/* Top Center Glow (Primary) */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen opacity-40 animate-pulse-slow" />

            {/* Top Right Accent (Blue/Purple) */}
            <div className="absolute top-[-5%] right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full mix-blend-screen opacity-30" />

            {/* Bottom Left Accent (Secondary) */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full mix-blend-screen opacity-30" />

            {/* 4. Vignette for focus */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
        </div>
    );
}
