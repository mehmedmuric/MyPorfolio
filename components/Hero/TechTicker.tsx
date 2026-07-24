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
  Server,
  Cpu,
  GitBranch,
  Box,
  Globe,
} from "lucide-react";

const TECH_STACK = [
  { name: "Next.js", icon: <Layers className="h-3.5 w-3.5" /> },
  { name: "React", icon: <Code2 className="h-3.5 w-3.5" /> },
  { name: "TypeScript", icon: <FileText className="h-3.5 w-3.5" /> },
  { name: "Node.js", icon: <Terminal className="h-3.5 w-3.5" /> },
  { name: "Prisma", icon: <Database className="h-3.5 w-3.5" /> },
  { name: "PostgreSQL", icon: <Database className="h-3.5 w-3.5" /> },
  { name: "MongoDB", icon: <Server className="h-3.5 w-3.5" /> },
  { name: "Supabase", icon: <Cloud className="h-3.5 w-3.5" /> },
  { name: "Docker", icon: <Box className="h-3.5 w-3.5" /> },
  { name: "Vercel", icon: <Globe className="h-3.5 w-3.5" /> },
  { name: "Cursor", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { name: "AI Integration", icon: <Cpu className="h-3.5 w-3.5" /> },
  { name: "Git", icon: <GitBranch className="h-3.5 w-3.5" /> },
];

export default function TechTicker() {
  const tickerItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="group relative w-full select-none overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/80 to-transparent sm:w-28"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/80 to-transparent sm:w-28"
        aria-hidden="true"
      />

      <div className="flex w-max animate-scroll py-1 motion-reduce:animate-none [@media(hover:hover)]:hover:[animation-play-state:paused]">
        {tickerItems.map((tech, i) => (
          <div
            key={`t-${tech.name}-${i}`}
            className="group/item mx-1.5 flex cursor-default items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 transition-colors duration-300 sm:mx-2.5 sm:px-3.5 [@media(hover:hover)]:hover:border-primary/25 [@media(hover:hover)]:hover:bg-primary/[0.05]"
          >
            <span className="text-muted-foreground/70 transition-colors duration-300 group-hover/item:text-primary">
              {tech.icon}
            </span>
            <span className="whitespace-nowrap text-xs font-medium text-muted-foreground/65 transition-colors group-hover/item:text-foreground/90">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
