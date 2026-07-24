"use client";

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { useTranslations } from "@/lib/i18n/dictionary-context";

interface SocialItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const SocialItem = ({ href, icon: Icon, label, onClick }: SocialItemProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    onClick={onClick}
    className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.06] hover:text-primary active:scale-95 active:border-primary/30 active:bg-primary/[0.06] active:text-primary md:hover:-translate-y-0.5"
  >
    <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-105" />
    <span className="pointer-events-none absolute -bottom-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-background/95 px-2 py-1 text-[10px] text-foreground opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:hidden">
      {label}
    </span>
  </a>
);

export default function SocialLinks() {
  const common = useTranslations().common;
  const connectLabel = useTranslations().contact.connectLabel;

  return (
    <div className="flex items-center gap-3">
      <SocialItem
        href="https://github.com/mehmedmuric"
        icon={Github}
        label={common.github}
        onClick={() => trackEvent(AnalyticsEvent.GithubClick, { source: "hero" })}
      />
      <SocialItem
        href="https://linkedin.com/in/mehmed-muric-185297232"
        icon={Linkedin}
        label={common.linkedin}
        onClick={() => trackEvent(AnalyticsEvent.LinkedinClick, { source: "hero" })}
      />
      <SocialItem
        href="mailto:mehmedmuric22@gmail.com"
        icon={Mail}
        label={common.email}
        onClick={() => trackEvent(AnalyticsEvent.EmailClick, { source: "hero" })}
      />

      <div
        className="mx-1 hidden h-6 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:block"
        aria-hidden="true"
      />
      <span className="eyebrow hidden sm:inline">{connectLabel}</span>
    </div>
  );
}
