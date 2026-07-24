"use client";

import LegalPageShell from "@/components/legal/LegalPageShell";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const PrivacyPolicyClient = () => {
  const t = useTranslations().legal.privacy;
  const sections = t.sections;

  const toc = Object.entries(sections).map(([key, section]) => ({
    id: key.replace(/([A-Z])/g, "-$1").toLowerCase(),
    title: section.title,
  }));

  const ordered = [
    { id: "intro", ...sections.intro },
    {
      id: "information-collection",
      title: sections.informationCollection.title,
      list: [
        sections.informationCollection.personalData,
        sections.informationCollection.automaticData,
      ],
    },
    { id: "use-of-information", ...sections.useOfInformation },
    { id: "data-sharing", ...sections.dataSharing },
    { id: "cookies", ...sections.cookies },
    { id: "security", ...sections.security },
    { id: "your-rights", ...sections.yourRights },
    { id: "contact", ...sections.contact },
  ] as const;

  return (
    <LegalPageShell
      breadcrumbName={t.breadcrumb}
      title={t.title}
      sections={toc}
      gridIdPrefix="privacy"
    >
      <p className="mb-10 text-sm text-muted-foreground">{t.lastUpdated}</p>

      {ordered.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="mb-16 scroll-mt-8 group relative"
        >
          <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="pl-6 group-hover:pl-8 transition-all duration-300">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-primary mb-4 relative inline-block group-hover:tracking-wider transition-all duration-300">
                <span className="absolute -left-8 sm:-left-10 text-primary/50 font-mono">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                {section.title}
                <span
                  className="block mt-3 h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent w-full group-hover:w-[120%] transition-all duration-500"
                  style={{ boxShadow: "0 0 8px hsla(var(--primary), 0.5)" }}
                />
              </h2>
            </div>
            {"list" in section && section.list ? (
              <ul
                className="space-y-5 text-gray-300 leading-relaxed"
                style={{
                  maxWidth: "70ch",
                  fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                  lineHeight: "1.8",
                }}
              >
                {section.list.map((item) => (
                  <li
                    key={item}
                    className="relative pl-8 before:content-['▸'] before:absolute before:left-0 before:text-primary/70 before:font-mono before:text-lg group-hover:before:text-primary transition-colors duration-300 group-hover:text-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                style={{
                  maxWidth: "70ch",
                  fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                  lineHeight: "1.8",
                }}
              >
                {"content" in section ? section.content : null}
              </p>
            )}
          </div>
        </section>
      ))}
    </LegalPageShell>
  );
};

export default PrivacyPolicyClient;
