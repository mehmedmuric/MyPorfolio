import type { Project } from "@/types/project";
import type { Messages } from "@/messages/types";

type CaseStudies = Messages["caseStudies"];
type CaseStudyItem = {
  title: string;
  valueProposition: string;
  paragraph: string;
  challenge: string;
  solution: string;
  outcome: string;
  keyFeatures: string[];
  paragraph2: string;
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
};

function getCaseStudyItem(
  caseStudies: CaseStudies,
  projectId: number
): CaseStudyItem | undefined {
  const key = String(projectId) as keyof CaseStudies;
  const value = caseStudies[key];
  if (!value || typeof value === "string" || !("title" in value)) {
    return undefined;
  }
  return value as CaseStudyItem;
}

export function localizeProject(
  project: Project,
  caseStudies: CaseStudies
): Project {
  const localized = getCaseStudyItem(caseStudies, project.id);
  if (!localized) return project;

  return {
    ...project,
    title: localized.title,
    valueProposition: localized.valueProposition,
    paragraph: localized.paragraph,
    challenge: localized.challenge,
    solution: localized.solution,
    outcome: localized.outcome,
    keyFeatures: localized.keyFeatures,
    paragraph2: localized.paragraph2,
    seoTitle: localized.seoTitle,
    seoDescription: localized.seoDescription,
    author: project.author
      ? {
          ...project.author,
          designation: caseStudies.authorDesignation,
        }
      : project.author,
  };
}

export function localizeProjects(
  projects: Project[],
  caseStudies: CaseStudies
): Project[] {
  return projects.map((project) => localizeProject(project, caseStudies));
}

export function getProjectImageAlt(
  projectId: number,
  caseStudies: CaseStudies,
  fallbackTitle: string
): string {
  return getCaseStudyItem(caseStudies, projectId)?.imageAlt || fallbackTitle;
}
