
import { memo, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

interface FilterBarProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const FilterBar = memo(({ categories, selectedCategory, onSelectCategory, searchQuery, onSearchChange }: FilterBarProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    if (categories.length === 0) return null;

    const allCategories = [null, ...categories];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sticky top-20 z-40 pointer-events-none">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pointer-events-auto">

                {/* Search Input */}
                <div className="relative group w-full max-w-xs md:max-w-[240px]">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-primary/70 transition-colors">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search projects..."
                        className="w-full pl-9 pr-8 py-2 rounded-full bg-background/60 backdrop-blur-2xl border border-border/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 hover:border-border/60 transition-all duration-300"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => {
                                onSearchChange('');
                                inputRef.current?.focus();
                            }}
                            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground/50 hover:text-foreground transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* Categories */}
                <div className="p-1.5 rounded-full bg-background/60 backdrop-blur-2xl border border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-x-auto max-w-full no-scrollbar ring-1 ring-white/5">
                    <div className="flex flex-nowrap items-center gap-1.5 min-w-max">
                        {allCategories.map((category) => {
                            const isSelected = selectedCategory === category;
                            const label = category ? category.replace(/^[\s-]+/, '') : "All";

                            return (
                                <button
                                    key={category || 'all'}
                                    onClick={() => onSelectCategory(category)}
                                    className={cn(
                                        "relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                                        isSelected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                                    )}
                                    aria-pressed={isSelected}
                                >
                                    {isSelected && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-primary/90 rounded-full shadow-[0_0_24px_rgba(34,197,94,0.4)] backdrop-blur-sm"
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        />
                                    )}
                                    <span className="relative z-10">{label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});

FilterBar.displayName = "FilterBar";

export default FilterBar;
