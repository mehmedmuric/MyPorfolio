"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";
import type { ReactNode } from "react";

const icons: ReactNode[] = [
  (
    <svg key="clarity" className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  (
    <svg key="user" className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  (
    <svg key="ship" className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  (
    <svg key="collab" className="w-6 h-6 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
];

const CoreValues = () => {
  const t = useTranslations().aboutPage.coreValues;

  return (
    <section className="w-full max-w-5xl mx-auto py-12">
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-gray-400 max-w-xl">
          {t.paragraph}
        </p>
      </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.values.map((v, index) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04] active:bg-white/[0.04] sm:p-8"
          >
            <div className="pointer-events-none absolute -right-[100px] -top-[100px] h-[200px] w-[200px] rounded-full bg-primary/5 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100" />

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.04] transition-transform duration-300 group-hover:scale-110 sm:mb-6">
              {icons[index]}
            </div>

            <h3 className="mb-2 text-lg font-semibold text-white sm:mb-3 sm:text-xl">{v.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              {v.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
