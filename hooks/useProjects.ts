import { useMemo, useState } from "react";
import type { Project } from "@/types/project";
import { useTranslations } from "@/lib/i18n/dictionary-context";
import { localizeProjects } from "@/lib/i18n/projects";
import {
  filterProjects,
  getProjectCategories,
  getProjects,
} from "@/lib/get-projects";

/**
 * Client-side project filtering over the static catalog.
 * Prefer server-passing localized projects (see /projects page) when possible.
 */
export const useProjects = () => {
  const caseStudies = useTranslations().caseStudies;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const projects = useMemo(
    () => localizeProjects(getProjects(), caseStudies),
    [caseStudies]
  );

  const categories = useMemo(
    () => getProjectCategories(projects),
    [projects]
  );

  const filteredProjects = useMemo(
    () => filterProjects(projects, selectedCategory, searchQuery),
    [projects, selectedCategory, searchQuery]
  );

  return {
    projects,
    filteredProjects,
    categories,
    loading: false,
    error: null as string | null,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  };
};

export type { Project };
