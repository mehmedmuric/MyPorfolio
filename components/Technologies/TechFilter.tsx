'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CategoryOption, TechCategory } from "./types";
import { useTranslations } from "@/lib/i18n/dictionary-context";

interface TechFilterProps {
    categories: CategoryOption[];
    activeCategory: TechCategory;
    onSelect: (category: TechCategory) => void;
}

const TechFilter = ({ categories, activeCategory, onSelect }: TechFilterProps) => {
    const filterLabel = useTranslations().common.filterTechnologies;

    return (
        <div className="mb-10 w-full overflow-x-auto no-scrollbar sm:mb-12 sm:overflow-visible">
            <div
                className="flex min-w-max flex-nowrap justify-start gap-2 px-0.5 sm:min-w-0 sm:flex-wrap sm:justify-center sm:gap-3"
                role="group"
                aria-label={filterLabel}
            >
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.key;

                    return (
                        <button
                            key={cat.key}
                            onClick={() => onSelect(cat.key)}
                            type="button"
                            className={cn(
                                "relative min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:min-h-10 sm:px-5",
                                isActive
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground active:bg-white/[0.08]"
                            )}
                            aria-pressed={isActive}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="tech-filter"
                                    className="absolute inset-0 rounded-full bg-primary"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{cat.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TechFilter;
