'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CategoryOption, TechCategory } from "./types";

interface TechFilterProps {
    categories: CategoryOption[];
    activeCategory: TechCategory;
    onSelect: (category: TechCategory) => void;
}

const TechFilter = ({ categories, activeCategory, onSelect }: TechFilterProps) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => {
                const isActive = activeCategory === cat.key;

                return (
                    <button
                        key={cat.key}
                        onClick={() => onSelect(cat.key)}
                        type="button"
                        className={cn(
                            "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            isActive
                                ? "text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-primary rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{cat.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default TechFilter;
