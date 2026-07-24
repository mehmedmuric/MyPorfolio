"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Technology } from "./types";
import { useTranslations } from "@/lib/i18n/dictionary-context";

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
      damping: 20,
    },
  },
};

const TechCard = ({ tech }: TechCardProps) => {
  const t = useTranslations();
  const aiLabel = t.technologies.labels?.aiIntegration;
  const displayName =
    tech.name === "AI Integration" && aiLabel ? aiLabel : tech.name;
  const isAdvanced = tech.proficiency === "Advanced";

  return (
    <motion.div
      variants={item}
      className="group relative flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-500 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] active:border-primary/40 active:bg-white/10 sm:min-h-0 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {isAdvanced && (
        <div
          className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]"
          aria-hidden="true"
        />
      )}

      <div className="relative mb-3 h-12 w-12 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 sm:mb-4 sm:h-16 sm:w-16">
        <Image
          src={tech.src}
          alt={displayName}
          fill
          sizes="64px"
          className="object-contain drop-shadow-md transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        />
      </div>

      <span className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-primary group-active:text-primary">
        {displayName}
      </span>
    </motion.div>
  );
};

export default TechCard;
