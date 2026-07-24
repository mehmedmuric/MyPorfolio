import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Github,
  ChevronRight,
} from "lucide-react";

import SharePost from "@/components/Blog/SharePost";
import ParticlesLazy from "@/components/Common/ParticlesLazy";
import type { Project } from "@/types/project";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAlternates, localizePath } from "@/lib/i18n/utils";
import { getProjectImageAlt, localizeProject } from "@/lib/i18n/projects";
import { getProjects } from "@/lib/get-projects";

function normalizeTags(tags: string | string[] | undefined): string[] {
  if (!tags) return [];
  const list = Array.isArray(tags)
    ? tags
    : tags.split(/[,\s]+/).map((tag) => tag.trim());
  return list.map((tag) => tag.replace(/^[\s-]+/, "").trim()).filter(Boolean);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  if (!isLocale(resolvedParams.locale)) return {};
  const locale = resolvedParams.locale as Locale;
  const t = await getDictionary(locale);
  const projectId = Number(resolvedParams.id);
  if (isNaN(projectId)) notFound();

  try {
    const projects = getProjects();
    const raw = projects.find((item) => item.id === projectId);
    if (!raw) {
      return {
        title: t.common.notFound,
        description: t.common.notFoundDescription,
      };
    }
    const project = localizeProject(raw, t.caseStudies);
    const path = `/blog-details/${projectId}`;
    const alternates = getAlternates(path);
    const canonicalUrl = alternates.languages[locale];
    const seoTitle =
      project.seoTitle || `${project.title} | Case Study by Mehmed Muric`;
    const seoDescription =
      project.seoDescription ||
      project.valueProposition ||
      project.paragraph.slice(0, 155);
    return {
      title: seoTitle,
      description: seoDescription,
      keywords: project.keywords,
      alternates: {
        canonical: canonicalUrl,
        languages: alternates.languages,
      },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: canonicalUrl,
        images: [
          {
            url: project.image,
            alt: getProjectImageAlt(projectId, t.caseStudies, project.title),
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [project.image],
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching project metadata:", error);
    }
    return {
      title: t.blog.title,
      description: t.blog.paragraph,
    };
  }
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
      {children}
    </p>
  );
}

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-2xl backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />
      <div className="relative p-5 sm:p-9 lg:p-10">{children}</div>
    </div>
  );
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolvedParams = await params;
  if (!isLocale(resolvedParams.locale)) notFound();
  const locale = resolvedParams.locale as Locale;
  const t = await getDictionary(locale);
  const projectId = Number(resolvedParams.id);

  try {
    const projects = getProjects();
    const raw = projects.find((item) => item.id === projectId);
    if (!raw) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950">
          <div className="p-10 text-center text-xl font-medium text-emerald-500">
            {t.common.notFound}
          </div>
        </div>
      );
    }

    const project = localizeProject(raw, t.caseStudies);
    const tags = normalizeTags(project.tags);
    const overview = project.paragraph;
    const valueProposition = project.valueProposition || project.paragraph;
    const projectsHref = localizePath("/projects", locale);
    const contactHref = localizePath("/contact", locale);
    const imageAlt = getProjectImageAlt(projectId, t.caseStudies, project.title);

    const caseStudySchema = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      headline: project.seoTitle || project.title,
      description:
        project.seoDescription ||
        project.valueProposition ||
        project.paragraph.slice(0, 150),
      keywords: project.keywords?.join(", "),
      author: {
        "@type": "Person",
        name: project.author.name,
        jobTitle: project.author.designation || t.caseStudies.authorDesignation,
        image: project.author.image.startsWith("http")
          ? project.author.image
          : `${SITE_URL}${project.author.image}`,
        url: `${SITE_URL}/${locale}`,
      },
      datePublished: project.publishDate,
      image: project.image.startsWith("http")
        ? project.image
        : `${SITE_URL}${project.image}`,
      url: `${SITE_URL}/${locale}/blog-details/${projectId}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${locale}/blog-details/${projectId}`,
      },
    };

    return (
      <Fragment>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(caseStudySchema),
          }}
        />

        <section className="relative min-h-screen overflow-hidden bg-background pb-16 pt-[calc(6.5rem+env(safe-area-inset-top,0px))] sm:pb-20 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <ParticlesLazy density={12} interactive={false} idleDelay={600} />
            <div className="ambient-orb right-1/4 top-0 hidden h-[600px] w-[600px] bg-primary/10 sm:block" />
            <div className="ambient-orb bottom-0 left-1/4 hidden h-[600px] w-[600px] bg-primary/5 sm:block" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 sm:mb-10 sm:gap-4">
              <Link
                href={projectsHref}
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-emerald-400 active:text-emerald-400"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/50 transition-all duration-300 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </span>
                {t.caseStudies.page.backToProjects}
              </Link>
              <p className="eyebrow text-primary/80">{t.caseStudies.page.breadcrumb}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
              <article className="space-y-6 sm:space-y-8 lg:col-span-8">
                <header className="space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-sm font-medium text-slate-400 shadow-inner">
                    <Calendar className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    {project.publishDate}
                  </div>

                  <h1 className="text-display text-[1.85rem] leading-tight text-foreground xs:text-[2.1rem] sm:text-5xl lg:text-6xl">
                    {project.title}
                  </h1>

                  <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                    {valueProposition}
                  </p>
                </header>

                <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.1)] sm:aspect-[16/9] sm:rounded-3xl">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl border border-white/10 sm:rounded-3xl" />
                  <Image
                    src={project.image}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
                    priority
                    quality={90}
                  />
                </div>

                <GlassPanel>
                  <SectionLabel>{t.caseStudies.page.breadcrumb}</SectionLabel>
                  <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                    {overview}
                  </p>
                  {project.paragraph2 && (
                    <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
                      {project.paragraph2}
                    </p>
                  )}
                </GlassPanel>

                {(project.challenge || project.solution) && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    {project.challenge && (
                      <GlassPanel>
                        <SectionLabel>{t.caseStudies.page.challengeLabel}</SectionLabel>
                        <p className="text-[15px] leading-relaxed text-slate-300">
                          {project.challenge}
                        </p>
                      </GlassPanel>
                    )}
                    {project.solution && (
                      <GlassPanel>
                        <SectionLabel>{t.caseStudies.page.solutionLabel}</SectionLabel>
                        <p className="text-[15px] leading-relaxed text-slate-300">
                          {project.solution}
                        </p>
                      </GlassPanel>
                    )}
                  </div>
                )}

                {tags.length > 0 && (
                  <GlassPanel>
                    <SectionLabel>{t.caseStudies.page.techLabel}</SectionLabel>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-400 transition-colors duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassPanel>
                )}

                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <GlassPanel>
                    <SectionLabel>{t.caseStudies.page.featuresLabel}</SectionLabel>
                    <ul className="space-y-3">
                      {project.keyFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-300"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </GlassPanel>
                )}

                {project.outcome && (
                  <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/25 to-slate-900/50 p-5 shadow-2xl sm:rounded-3xl sm:p-9">
                    <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500" aria-hidden="true" />
                    <SectionLabel>{t.caseStudies.page.outcomeLabel}</SectionLabel>
                    <p className="text-lg font-medium leading-relaxed text-slate-200 sm:text-xl">
                      {project.outcome}
                    </p>
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
                  {project.livedemo && (
                    <Link
                      href={project.livedemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[88px] flex-col justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 transition-all duration-500 hover:border-emerald-500 hover:bg-emerald-500 active:bg-emerald-500 sm:rounded-3xl sm:p-8"
                    >
                      <div className="mb-3 flex items-center justify-between sm:mb-4">
                        <span className="rounded-2xl bg-emerald-500 p-3 text-white transition-colors duration-500 group-hover:bg-white group-hover:text-emerald-500">
                          <ExternalLink className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <ArrowRight className="h-5 w-5 text-emerald-500 opacity-70 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-white sm:-translate-x-2 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100" />
                      </div>
                      <h2 className="mb-1 text-lg font-bold text-white sm:text-xl">{t.caseStudies.page.liveDemo}</h2>
                    </Link>
                  )}
                  {project.gitlink && (
                    <Link
                      href={project.gitlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[88px] flex-col justify-center rounded-2xl border border-white/10 bg-slate-900/40 p-5 transition-all duration-500 hover:border-white/20 hover:bg-slate-800 active:bg-slate-800 sm:rounded-3xl sm:p-8"
                    >
                      <div className="mb-3 flex items-center justify-between sm:mb-4">
                        <span className="rounded-2xl border border-white/10 bg-slate-800 p-3 text-white transition-colors duration-500 group-hover:bg-white group-hover:text-slate-900">
                          <Github className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <ChevronRight className="h-5 w-5 text-slate-400 opacity-70 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-white sm:-translate-x-2 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100" />
                      </div>
                      <h2 className="mb-1 text-lg font-bold text-white sm:text-xl">{t.caseStudies.page.viewCode}</h2>
                    </Link>
                  )}
                </div>

                <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:gap-6 sm:pt-10">
                  <SharePost />
                </div>
              </article>

              <aside className="space-y-8 lg:col-span-4">
                <div className="space-y-8 lg:sticky lg:top-32">
                  <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-1 shadow-xl backdrop-blur-xl">
                    <div className="relative rounded-[22px] bg-slate-950/50 p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-full border-2 border-emerald-500/30 p-1 transition-colors duration-500 group-hover:border-emerald-500">
                          <div className="relative h-full w-full overflow-hidden rounded-full">
                            <Image
                              src={project.author.image}
                              alt={project.author.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        </div>
                        <h2 className="mb-1 text-2xl font-bold text-white transition-colors group-hover:text-emerald-400">
                          {project.author.name}
                        </h2>
                        <p className="mb-4 font-medium text-emerald-500">
                          {project.author.designation || t.caseStudies.authorDesignation}
                        </p>
                        <p className="mb-6 text-sm leading-relaxed text-slate-400">
                          {t.seo.jsonLd.personDescription}
                        </p>
                        <div className="flex w-full flex-col gap-3 xs:flex-row">
                          <Link
                            href="https://github.com/mehmedmuric"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 active:bg-slate-800"
                          >
                            <Github className="h-4 w-4" aria-hidden="true" />
                            GitHub
                          </Link>
                          <Link
                            href={contactHref}
                            className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-400 active:bg-emerald-400"
                          >
                            {t.navigation.startProject}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {tags.length > 0 && (
                    <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-xl backdrop-blur-xl">
                      <h2 className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                        <span className="h-px w-8 bg-emerald-500/30" aria-hidden="true" />
                        {t.caseStudies.page.techLabel}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={`side-${tag}`}
                            className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </Fragment>
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error loading project:", error);
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="p-10 text-center text-xl text-red-400">
          {t.common.error}
        </div>
      </div>
    );
  }
}
