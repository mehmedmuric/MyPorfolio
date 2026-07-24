"use client";

import type { Project } from "@/types/project";
import Image from "next/image";
import Link from "@/lib/i18n/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/dictionary-context";
import { getProjectImageAlt } from "@/lib/i18n/projects";

interface BlogCardProps {
  blog: Project;
  index: number;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const t = useTranslations();
  const { id, title, paragraph, image, coverImage, tags, publishDate, excerpt, description, valueProposition } =
    blog;

  const displayImage = image || coverImage || "/images/blog/blog-01.jpg";
  const displayExcerpt = valueProposition || paragraph || excerpt || description || "";
  const displayDate = publishDate || new Date().getFullYear().toString();
  const imageAlt = getProjectImageAlt(id, t.caseStudies, title);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link
        href={`/blog-details/${id}`}
        className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.045] to-transparent transition-all duration-500 active:border-primary/25 active:bg-white/[0.03] hover:border-primary/25 hover:shadow-[0_28px_56px_-32px_rgba(0,0,0,0.7),0_0_0_1px_hsla(var(--primary),0.1)] md:hover:-translate-y-1.5">
          <div className="relative aspect-[16/10] overflow-hidden">
            <div className="absolute inset-0 bg-muted/30" aria-hidden="true" />
            <Image
              src={displayImage}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-active:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-70"
              aria-hidden="true"
            />

            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-background/80 px-3 py-1.5 text-[11px] font-medium text-foreground backdrop-blur-md">
                {t.projects.viewCaseStudy}
                <ArrowUpRight className="h-3 w-3 text-primary" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="relative flex flex-grow flex-col p-4 sm:p-6">
            {tags && tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-3.5">
                {tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-primary/15 bg-primary/[0.06] px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary"
                  >
                    {tag.replace(/ - /g, "")}
                  </span>
                ))}
              </div>
            )}

            <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary group-active:text-primary sm:text-xl">
              {title}
            </h3>

            <p className="mb-4 line-clamp-2 flex-grow text-sm font-light leading-relaxed text-muted-foreground sm:mb-5">
              {displayExcerpt}
            </p>

            <div className="mt-auto flex min-h-11 items-center justify-between border-t border-white/[0.06] pt-3.5">
              <time className="font-mono text-[11px] tracking-wide text-muted-foreground/70">
                {displayDate}
              </time>

              <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary group-active:text-primary">
                {t.projects.viewCaseStudy}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
