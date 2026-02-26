"use client";

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

interface SocialItemProps {
    href: string;
    icon: React.ElementType;
    label: string;
}

const SocialItem = ({ href, icon: Icon, label }: SocialItemProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group relative p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,128,0.2)]"
    >
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-md">
            {label}
        </span>
    </a>
);

export default function SocialLinks() {
    return (
        <div className="flex items-center gap-4 pt-4">
            <SocialItem
                href="https://github.com/mehmedmuric"
                icon={Github}
                label="GitHub"
            />
            <SocialItem
                href="https://linkedin.com/in/mehmed-muric-185297232"
                icon={Linkedin}
                label="LinkedIn"
            />
            <SocialItem
                href="mailto:mehmedmuric@gmail.com" // Assuming email from context or placeholder
                icon={Mail}
                label="Email"
            />

            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent mx-2" />
            <span className="text-[10px] text-muted-foreground/50 font-mono tracking-[0.2em] uppercase">
                Follow Me
            </span>
        </div>
    );
}
