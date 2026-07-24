"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import ProjectsHeader from "@/components/Projects/ProjectsHeader";
import FilterBar from "@/components/Projects/FilterBar";
import ProjectGrid from "@/components/Projects/ProjectGrid";
import Link from "@/lib/i18n/link";
import { Mail, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "@/lib/i18n/dictionary-context";
import type { Project } from "@/types/project";
import { filterProjects } from "@/lib/get-projects";

const ParticlesBackground = dynamic(
  () => import("@/components/Common/ParticlesBackground"),
  { ssr: false }
);

type ProjectsClientProps = {
  projects: Project[];
  categories: string[];
};

const ProjectsClient = ({ projects, categories }: ProjectsClientProps) => {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filteredProjects = useMemo(
    () => filterProjects(projects, selectedCategory, deferredSearch),
    [projects, selectedCategory, deferredSearch]
  );

  const handleSelectCategory = useCallback((category: string | null) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPastThreshold = window.scrollY > 400;
          setShowScrollTop((prev) =>
            prev !== isPastThreshold ? isPastThreshold : prev
          );
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Breadcrumb pageName={t.navigation.projects} />

      <div className="relative z-10 min-h-screen overflow-hidden bg-background pb-16 sm:pb-20">
        <div
          className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
          aria-hidden="true"
        />
        <ParticlesBackground density={14} interactive={false} idleDelay={400} />
        <div
          className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-[420px] w-[420px] sm:block"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 -z-10 hidden h-[420px] w-[420px] sm:block"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <ProjectsHeader />

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <ProjectGrid projects={filteredProjects} />

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-10 mx-auto w-full max-w-4xl px-4 py-20 text-center"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/80 via-card/50 to-primary/5 p-8 shadow-xl backdrop-blur-sm sm:p-12 sm:shadow-2xl sm:backdrop-blur-md">
            <div
              className="pointer-events-none absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <h2 className="relative z-10 mb-4 text-2xl font-bold sm:text-3xl">
              {t.contact.sectionTitle}
            </h2>
            <p className="relative z-10 mx-auto mb-8 max-w-xl text-muted-foreground">
              {t.contact.sectionParagraph}
            </p>
            <Link
              href="/contact"
              className="relative z-10 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 active:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
            >
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              {t.navigation.contact}
            </Link>
          </div>
        </motion.section>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary p-0 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-8 sm:right-8"
              aria-label={t.footer.backToTop}
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProjectsClient;
