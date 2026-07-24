"use client";

import type { Project } from "@/types/project";
import Image from "next/image";
import Link from "@/lib/i18n/link";
import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/lib/i18n/dictionary-context";
import { getProjectImageAlt } from "@/lib/i18n/projects";

const ProjectCard = memo(
  ({ project, index }: { project: Project; index: number }) => {
    const t = useTranslations();
    const { id, title, paragraph, image, tags, publishDate, valueProposition } =
      project;
    const summary = valueProposition || paragraph;
    const imageAlt = getProjectImageAlt(id, t.caseStudies, title);
    // First row paints sooner for LCP-ish feel without forcing all images
    const eager = index < 2;

    return (
      <Link
        href={`/blog-details/${id}`}
        className="group block h-full w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent transition-[border-color,box-shadow,transform] duration-500 active:border-primary/25 active:bg-white/[0.03] hover:border-primary/25 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.65),0_0_0_1px_hsla(var(--primary),0.08)] md:hover:-translate-y-1">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/20">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-active:scale-[1.02] motion-reduce:transition-none"
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              quality={75}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-80"
              aria-hidden="true"
            />

            {tags && tags.length > 0 && (
              <div className="absolute left-3 top-3 z-10">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-background/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/90 backdrop-blur-md">
                  {tags[0]}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col space-y-3 p-4 sm:space-y-3.5 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <time
                dateTime={publishDate}
                className="font-mono text-[11px] tracking-wide text-muted-foreground/70"
              >
                {publishDate}
              </time>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-active:text-primary"
                aria-hidden="true"
              />
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary group-active:text-primary sm:text-lg">
                {title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {summary}
              </p>
            </div>

            {tags && tags.length > 1 && (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {tags.slice(1, 4).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 4 && (
                  <span className="inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] font-medium text-muted-foreground/70">
                    +{tags.length - 4}
                  </span>
                )}
              </div>
            )}

            <div className="mt-auto flex min-h-[40px] items-center border-t border-white/[0.06] pt-3">
              <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground group-active:text-foreground">
                {t.projects.viewCaseStudy}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
