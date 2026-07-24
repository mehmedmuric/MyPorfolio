import projectsData from "@/public/data/projects.json";
import type { Project } from "@/types/project";

/** Static project catalog — no network fetch, safe on server and client. */
export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectById(id: number): Project | undefined {
  return getProjects().find((project) => project.id === id);
}

export function getProjectCategories(projects: Project[]): string[] {
  const firstTags = projects
    .map((project) =>
      project.tags && project.tags.length > 0 ? project.tags[0].trim() : null
    )
    .filter((tag): tag is string => tag !== null && tag !== "");

  return Array.from(new Set(firstTags)).sort();
}

export function filterProjects(
  projects: Project[],
  selectedCategory: string | null,
  searchQuery: string
): Project[] {
  let filtered = projects;

  if (selectedCategory) {
    filtered = filtered.filter((project) => {
      const firstTag =
        project.tags && project.tags.length > 0 ? project.tags[0].trim() : "";
      return firstTag === selectedCategory;
    });
  }

  const query = searchQuery.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.paragraph.toLowerCase().includes(query) ||
        project.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  return filtered;
}
