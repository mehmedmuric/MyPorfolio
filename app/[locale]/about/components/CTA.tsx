"use client";

import Link from "@/lib/i18n/link";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const CTA = () => {
    const t = useTranslations().aboutPage;
    const cta = t.cta;

    return (
        <section className="w-full max-w-4xl mx-auto py-16 sm:py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-white/10 rounded-3xl bg-white/[0.01] backdrop-blur-md shadow-2xl overflow-hidden"
            >
                <h2 className="mb-4 text-[1.65rem] font-bold leading-tight text-white sm:mb-6 sm:text-4xl">
                    {cta.title}
                </h2>
                <p className="mb-8 max-w-md text-[15px] leading-relaxed text-gray-400 sm:mb-10 sm:max-w-xl sm:text-lg">
                    {cta.paragraph}
                </p>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                    <Link
                        href="/contact"
                        className="group relative flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-primary/90 active:bg-primary/85 sm:w-auto"
                    >
                        <span>{cta.button}</span>
                        <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link
                        href="/projects"
                        className="flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-8 py-4 font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] active:bg-white/[0.1] sm:w-auto"
                    >
                        {t.hero.ctaProjects}
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default CTA;
