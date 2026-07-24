"use client";

import { memo, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useTranslations } from "@/lib/i18n/dictionary-context";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  searchAria?: string;
  clearSearch?: string;
  filterAria?: string;
  allLabel?: string;
}

const FilterBar = memo(
  ({
    categories,
    selectedCategory,
    onSelectCategory,
    searchQuery,
    onSearchChange,
    searchPlaceholder,
    searchAria,
    clearSearch,
    filterAria,
    allLabel,
  }: FilterBarProps) => {
    const t = useTranslations().projects;
    const inputRef = useRef<HTMLInputElement>(null);

    if (categories.length === 0) return null;

    const allCategories = [null, ...categories];
    const placeholder = searchPlaceholder ?? t.searchPlaceholder;
    const searchAriaLabel = searchAria ?? t.searchAria;
    const clearSearchLabel = clearSearch ?? t.clearSearch;
    const filterAriaLabel = filterAria ?? t.filterAria;
    const all = allLabel ?? t.filterAll;

    return (
      <div className="pointer-events-none sticky top-[calc(4.5rem+env(safe-area-inset-top,0px))] z-40 mb-6 w-full max-w-7xl mx-auto px-4 sm:mb-8 sm:px-6 lg:px-8">
        <div className="pointer-events-auto flex flex-col items-stretch justify-center gap-3 md:flex-row md:items-center">
          <div className="relative group w-full md:max-w-[240px]">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground/50 transition-colors group-focus-within:text-primary/70">
              <Search className="h-4 w-4" aria-hidden="true" />
            </div>
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder}
              aria-label={searchAriaLabel}
              autoComplete="off"
              spellCheck={false}
              className="h-12 w-full rounded-full border border-border/30 bg-background/85 py-2 pl-10 pr-11 text-base shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 hover:border-border/60 sm:h-11 sm:text-sm supports-[backdrop-filter]:bg-background/70"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  onSearchChange("");
                  inputRef.current?.focus();
                }}
                className="absolute inset-y-0 right-1.5 flex h-full w-10 items-center justify-center text-muted-foreground/50 transition-colors hover:text-foreground active:text-foreground"
                aria-label={clearSearchLabel}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="max-w-full overflow-x-auto rounded-full border border-border/30 bg-background/85 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-white/5 backdrop-blur-md no-scrollbar supports-[backdrop-filter]:bg-background/70">
            <div
              className="flex min-w-max flex-nowrap items-center gap-1.5"
              role="group"
              aria-label={filterAriaLabel}
            >
              {allCategories.map((category) => {
                const isSelected = selectedCategory === category;
                const label = category
                  ? category.replace(/^[\s-]+/, "")
                  : all;

                return (
                  <button
                    key={category || "all"}
                    type="button"
                    onClick={() => onSelectCategory(category)}
                    className={cn(
                      "relative min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:min-h-10 sm:py-2",
                      isSelected
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary/20 hover:text-foreground active:bg-secondary/25"
                    )}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="projects-filter"
                        className="absolute inset-0 rounded-full bg-primary/90 shadow-[0_0_20px_hsla(var(--primary),0.25)]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
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
  }
);

FilterBar.displayName = "FilterBar";

export default FilterBar;
