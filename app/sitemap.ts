import type { MetadataRoute } from "next";
import projects from "@/public/data/projects.json";
import { locales, SITE_URL } from "@/lib/i18n/config";

const staticPaths = [
  "",
  "/about",
  "/contact",
  "/projects",
  "/testimonials",
  "/privacyPolicy",
  "/TermsOfUse",
] as const;

function languageAlternates(path: string): Record<string, string> {
  const clean = path === "" ? "" : path;
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}${clean}`])
  );
  return {
    ...languages,
    "x-default": `${SITE_URL}/sr${clean}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: languageAlternates(path),
      },
    }))
  );

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((project) => {
      const path = `/blog-details/${project.id}`;
      return {
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: languageAlternates(path),
        },
      };
    })
  );

  return [...staticRoutes, ...projectRoutes];
}
