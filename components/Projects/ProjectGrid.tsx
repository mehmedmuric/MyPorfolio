"use client";

import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";
import { memo } from "react";

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = memo(({ projects }: ProjectGridProps) => {
  const t = useTranslations().projects;

  if (projects.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-28 sm:px-6 lg:px-8">
        <div className="flex min-h-[300px] flex-col items-center justify-center text-muted-foreground">
          <p className="text-lg font-medium">{t.emptyState}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-28 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="sync" initial={false}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.28,
                delay: Math.min(index * 0.03, 0.15),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});

ProjectGrid.displayName = "ProjectGrid";

export default ProjectGrid;
