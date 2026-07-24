"use client";

import { useMemo } from "react";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import { Button } from "../ui/button";
import Link from "@/lib/i18n/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import BlogCard from "./BlogCard";
import { motion, useReducedMotion } from "framer-motion";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { useTranslations } from "@/lib/i18n/dictionary-context";
import { getProjectImageAlt, localizeProjects } from "@/lib/i18n/projects";
import { getProjects } from "@/lib/get-projects";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BlogList = () => {
  const t = useTranslations();
  const reducedMotion = useReducedMotion();

  const projects = useMemo(
    () => localizeProjects(getProjects(), t.caseStudies),
    [t.caseStudies]
  );

  const featured =
    projects.find((project) => project.featured) || projects[0] || null;
  const galleryProjects = featured
    ? projects.filter((project) => project.id !== featured.id)
    : projects;

  return (
    <section id="projects" className="relative section-y bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
        <div className="ambient-orb top-[-20%] right-[-10%] hidden h-[800px] w-[800px] bg-primary/10 opacity-40 sm:block" />
        <div className="ambient-orb bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/5 opacity-30" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <SectionTitle
            title={t.blog.title}
            paragraph={t.blog.paragraph}
            align="center"
            mb="0"
          />
        </div>

        <>
            {featured && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="mx-auto mb-16 w-full max-w-7xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent"
              >
                <div className="grid lg:grid-cols-2">
                  <Link
                    href={`/blog-details/${featured.id}`}
                    className="relative block aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[480px]"
                  >
                    <Image
                      src={featured.image}
                      alt={getProjectImageAlt(featured.id, t.caseStudies, featured.title)}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:bg-gradient-to-r"
                      aria-hidden="true"
                    />
                  </Link>

                  <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                    <p className="eyebrow mb-4 text-primary">{t.blog.featuredLabel}</p>
                    <h3 className="text-display mb-4 text-2xl text-foreground sm:text-3xl lg:text-4xl">
                      <Link
                        href={`/blog-details/${featured.id}`}
                        className="transition-colors hover:text-primary"
                      >
                        {featured.title}
                      </Link>
                    </h3>
                    <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                      {featured.valueProposition || featured.paragraph}
                    </p>

                    <div className="mb-7 space-y-5">
                      {featured.challenge && (
                        <div>
                          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                            {t.blog.challengeLabel}
                          </p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {featured.challenge}
                          </p>
                        </div>
                      )}
                      {featured.solution && (
                        <div>
                          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                            {t.blog.solutionLabel}
                          </p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {featured.solution}
                          </p>
                        </div>
                      )}
                      {featured.outcome && (
                        <div className="rounded-xl border border-primary/15 bg-primary/[0.04] px-4 py-3.5">
                          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                            {t.blog.outcomeLabel}
                          </p>
                          <p className="text-sm leading-relaxed text-foreground/85">
                            {featured.outcome}
                          </p>
                        </div>
                      )}
                    </div>

                    {featured.tags && featured.tags.length > 0 && (
                      <div className="mb-8">
                        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                          {t.blog.techLabel}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {featured.tags.slice(0, 6).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-primary/15 bg-primary/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
                            >
                              {tag.replace(/^[\s-]+/, "")}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                      <Button size="lg" variant="premium" className="h-12 min-h-[48px] w-full rounded-full px-6 sm:w-auto" asChild>
                        <Link href={`/blog-details/${featured.id}`}>
                          {t.blog.readMore}
                          <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                      {featured.livedemo && (
                        <Button size="lg" variant="glass" className="h-12 min-h-[48px] w-full rounded-full px-6 sm:w-auto" asChild>
                          <a href={featured.livedemo} target="_blank" rel="noopener noreferrer">
                            {t.blog.liveDemo}
                          </a>
                        </Button>
                      )}
                      {featured.gitlink && (
                        <Button size="lg" variant="ghost" className="h-12 min-h-[48px] w-full rounded-full px-5 text-muted-foreground sm:w-auto" asChild>
                          <a href={featured.gitlink} target="_blank" rel="noopener noreferrer">
                            {t.blog.source}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {galleryProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
                className="mx-auto w-full max-w-7xl px-0 sm:px-0"
              >
                <div className="mb-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow mb-2">{t.blog.moreProjects}</p>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {t.blog.selectedCaseStudies}
                    </h3>
                  </div>
                </div>

                <style jsx global>{`
                  .blog-swiper .swiper-pagination {
                    bottom: 0 !important;
                  }
                  .blog-swiper .swiper-pagination-bullet {
                    background: hsl(var(--muted-foreground) / 0.35);
                    opacity: 1;
                    width: 12px;
                    height: 12px;
                    margin: 0 6px !important;
                    transition: all 0.3s ease;
                    position: relative;
                  }
                  .blog-swiper .swiper-pagination-bullet::before {
                    content: "";
                    position: absolute;
                    inset: -14px;
                  }
                  .blog-swiper .swiper-pagination-bullet-active {
                    background: hsl(var(--primary));
                    width: 28px;
                    border-radius: 999px;
                  }
                  .blog-swiper .swiper-button-next,
                  .blog-swiper .swiper-button-prev {
                    display: none;
                    color: hsl(var(--foreground) / 0.85);
                    background: hsl(var(--background) / 0.7);
                    backdrop-filter: blur(8px);
                    width: 44px;
                    height: 44px;
                    border-radius: 999px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.3s ease;
                  }
                  @media (min-width: 640px) {
                    .blog-swiper .swiper-button-next,
                    .blog-swiper .swiper-button-prev {
                      display: flex;
                    }
                  }
                  .blog-swiper .swiper-button-next:after,
                  .blog-swiper .swiper-button-prev:after {
                    font-size: 14px;
                    font-weight: 700;
                  }
                  .blog-swiper .swiper-button-next:hover,
                  .blog-swiper .swiper-button-prev:hover {
                    background: hsl(var(--primary) / 0.08);
                    border-color: hsl(var(--primary) / 0.35);
                    color: hsl(var(--primary));
                  }
                `}</style>

                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  spaceBetween={24}
                  slidesPerView={1}
                  loop={galleryProjects.length > 3}
                  autoplay={
                    reducedMotion
                      ? false
                      : {
                          delay: 5500,
                          disableOnInteraction: false,
                          pauseOnMouseEnter: true,
                        }
                  }
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  navigation={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 24,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 28,
                    },
                  }}
                  className="blog-swiper pb-14"
                >
                  {galleryProjects.map((project, index) => (
                    <SwiperSlide key={project.id} className="h-auto">
                      <div className="h-full py-3">
                        <BlogCard blog={project} index={index} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            )}
        </>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <Button size="lg" variant="glass" className="group h-12 rounded-full px-8" asChild>
            <Link
              href="/projects"
              onClick={() => trackEvent(AnalyticsEvent.ViewProjects, { source: "featured_work" })}
            >
              <span className="text-sm font-medium">{t.blog.viewAll}</span>
              <ArrowRight
                className="ml-2 h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default BlogList;
