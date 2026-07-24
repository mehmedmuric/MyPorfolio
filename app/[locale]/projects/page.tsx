import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAlternates } from "@/lib/i18n/utils";
import { localizeProjects } from "@/lib/i18n/projects";
import { getProjectCategories, getProjects } from "@/lib/get-projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = await getDictionary(locale);
  const alternates = getAlternates("/projects");
  return {
    title: t.seo.projects.title,
    description: t.seo.projects.description,
    alternates: {
      canonical: alternates.languages[locale],
      languages: alternates.languages,
    },
    openGraph: {
      title: t.seo.projects.title,
      description: t.seo.projects.description,
      url: `${SITE_URL}/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return null;

  const locale = raw as Locale;
  const t = await getDictionary(locale);
  const projects = localizeProjects(getProjects(), t.caseStudies);
  const categories = getProjectCategories(projects);

  return <ProjectsClient projects={projects} categories={categories} />;
}
