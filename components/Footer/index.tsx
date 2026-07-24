"use client";

import Link from "@/lib/i18n/link";
import NextImage from "next/image";
import { Github, Linkedin, Mail, ArrowUp, MapPin } from "lucide-react";
import { SocialButton } from "@/components/ui/social-button";
import Container from "../Container";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const Footer = () => {
  const messages = useTranslations();
  const t = messages.footer;
  const nav = messages.navigation;
  const common = messages.common;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-background pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16 sm:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-7xl -translate-x-1/2" aria-hidden="true">
        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="group relative inline-flex min-h-11 min-w-11 items-center" aria-label={nav.homeAria}>
              <NextImage
                src="/images/logo/MMlogo.png"
                alt="Mehmed Muric"
                width={48}
                height={48}
                className="relative z-10 h-auto w-10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 sm:w-12"
              />
              <div
                className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t.tagline}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary/80" aria-hidden="true" />
              {t.location}
            </div>
            <div className="flex gap-3">
              <SocialButton
                href="https://github.com/mehmedmuric"
                icon={Github}
                label={common.github}
                onClick={() => trackEvent(AnalyticsEvent.GithubClick, { source: "footer" })}
              />
              <SocialButton
                href="https://www.linkedin.com/in/mehmed-muric-185297232"
                icon={Linkedin}
                label={common.linkedin}
                onClick={() => trackEvent(AnalyticsEvent.LinkedinClick, { source: "footer" })}
              />
              <SocialButton
                href="mailto:mehmedmuric22@gmail.com"
                icon={Mail}
                label={common.email}
                onClick={() => trackEvent(AnalyticsEvent.EmailClick, { source: "footer" })}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-mono text-sm font-semibold uppercase tracking-wider text-white">
              {t.navTitle}
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/" label={t.nav.home} />
              <FooterLink href="/projects" label={t.nav.projects} />
              <FooterLink href="/about" label={t.nav.about} />
              <FooterLink href="/testimonials" label={t.nav.testimonials} />
              <FooterLink href="/contact" label={t.nav.contact} />
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-mono text-sm font-semibold uppercase tracking-wider text-white">
              {t.legalTitle}
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/privacyPolicy" label={t.privacyPolicy} />
              <FooterLink href="/TermsOfUse" label={t.termsOfUse} />
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-mono text-sm font-semibold uppercase tracking-wider text-white">
              {t.getInTouchTitle}
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:mehmedmuric22@gmail.com"
                  onClick={() => trackEvent(AnalyticsEvent.EmailClick, { source: "footer_touch" })}
                  className="group flex min-h-11 items-center gap-2.5 transition-colors hover:text-primary active:text-primary"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-primary/20">
                    <Mail size={16} aria-hidden="true" />
                  </span>
                  <span className="break-all">mehmedmuric22@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="relative flex h-8 w-8 items-center justify-center" aria-hidden="true">
                  <span className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsla(var(--primary),0.5)]" />
                </span>
                <span className="text-primary/90">{t.availableReply}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground/60 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-8">
            <p>
              {t.copyright.replace("{year}", String(currentYear))}
            </p>
            <div className="flex items-center gap-6">
              <span>{t.builtWith}</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/10 md:block" aria-hidden="true" />
              <span>{t.location}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex min-h-11 items-center gap-2.5 rounded-full px-1 transition-colors hover:text-primary active:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t.backToTop}
          >
            <span className="font-mono text-[11px] uppercase tracking-wider">{t.backToTop}</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/10">
              <ArrowUp size={16} aria-hidden="true" />
            </div>
          </button>
        </div>
      </Container>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 py-1.5 text-sm text-muted-foreground transition-all duration-200 hover:text-primary active:text-primary"
    >
      <span
        className="block h-px w-1.5 origin-left scale-x-0 bg-primary/50 transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span className="link-underline transition-transform duration-300 group-hover:translate-x-1">
        {label}
      </span>
    </Link>
  </li>
);

export default Footer;
