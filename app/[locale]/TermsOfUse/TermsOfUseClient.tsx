"use client";

import { useState, useEffect, useMemo } from "react";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { usePrefersReducedMotion } from "@/lib/media";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const TermsOfUseClient = () => {
  const t = useTranslations().legal.terms;
  const sections = t.sections;
  const reducedMotion = usePrefersReducedMotion();

  const contentSections = useMemo(
    () => [
      { id: "intro", title: sections.intro.title, content: sections.intro.content },
      { id: "acceptance", title: sections.acceptance.title, content: sections.acceptance.content },
      { id: "use-of-website", title: sections.useOfWebsite.title, content: sections.useOfWebsite.content },
      {
        id: "intellectual-property",
        title: sections.intellectualProperty.title,
        content: sections.intellectualProperty.content,
      },
      { id: "disclaimer", title: sections.disclaimer.title, content: sections.disclaimer.content },
      { id: "limitation", title: sections.limitation.title, content: sections.limitation.content },
      { id: "contact", title: sections.contact.title, content: sections.contact.content },
    ],
    [sections]
  );

  const [revealed, setRevealed] = useState<Set<string>>(
    () => new Set(["intro"])
  );
  const visibleSections = reducedMotion
    ? new Set(contentSections.map((s) => s.id))
    : revealed;

  useEffect(() => {
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0.1,
      }
    );

    contentSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [reducedMotion, contentSections]);

  const sectionClass = (id: string) =>
    reducedMotion
      ? "mb-16 scroll-mt-8"
      : `mb-16 scroll-mt-8 transition-all duration-700 ${
          visibleSections.has(id)
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`;

  return (
    <LegalPageShell
      breadcrumbName={t.breadcrumb}
      title={t.title}
      sections={contentSections.map(({ id, title }) => ({ id, title }))}
      showScrollProgress
      gridIdPrefix="terms"
    >
      <p className="mb-10 text-sm text-muted-foreground">{t.lastUpdated}</p>

      {contentSections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={
            section.id === "contact"
              ? reducedMotion
                ? "mb-12 scroll-mt-8"
                : `mb-12 scroll-mt-8 transition-all duration-700 ${
                    visibleSections.has("contact")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`
              : sectionClass(section.id)
          }
        >
          <div className="mb-6 group">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-primary mb-6 relative inline-block group-hover:text-[#00FF88] transition-colors duration-300">
              <span className="absolute -left-10 text-primary/60 font-mono text-lg">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <span className="relative inline-block">
                {section.title}
                <span
                  className="block mt-3 h-[2px] bg-gradient-to-r from-primary via-[#00FF88] to-transparent transition-all duration-300 group-hover:w-full"
                  style={{
                    boxShadow:
                      "0 0 10px hsla(var(--primary), 0.6), 0 0 20px hsla(var(--primary), 0.3)",
                  }}
                />
              </span>
            </h2>
          </div>
          <div className="pl-6 border-l-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <p
              className="text-gray-200 leading-relaxed text-base sm:text-lg"
              style={{ maxWidth: "70ch", lineHeight: "1.8" }}
            >
              {section.content}
            </p>
          </div>
        </section>
      ))}
    </LegalPageShell>
  );
};

export default TermsOfUseClient;
