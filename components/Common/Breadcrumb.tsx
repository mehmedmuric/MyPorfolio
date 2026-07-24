"use client";

import Link from "@/lib/i18n/link";
import { Fragment } from "react";
import { useTranslations } from "@/lib/i18n/dictionary-context";

interface BreadcrumbProps {
  pageName: string;
  description?: string;
  crumbs?: { name: string; href?: string }[];
}

const Breadcrumb = ({
  pageName,
  description,
  crumbs,
}: BreadcrumbProps) => {
  const t = useTranslations();
  const resolvedCrumbs = crumbs ?? [{ name: t.navigation.home, href: "/" }];

  return (
    <section className="relative z-10 overflow-hidden bg-background/80 pb-8 pt-[calc(6.5rem+env(safe-area-inset-top,0px))] sm:pb-10 sm:pt-28">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-gradient-to-b from-muted/40 to-transparent" aria-hidden="true" />
      <div className="absolute -top-20 left-1/4 hidden h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px] sm:block" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label={t.common.breadcrumb} className="mb-6 sm:mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm font-medium">
            {resolvedCrumbs.map((crumb, idx) => (
              <Fragment key={crumb.name}>
                {crumb.href ? (
                  <li>
                    <Link
                      href={crumb.href}
                      className="inline-flex min-h-11 items-center rounded-sm py-2 text-muted-foreground transition-colors duration-200 hover:text-primary active:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {crumb.name}
                    </Link>
                  </li>
                ) : (
                  <li className="text-muted-foreground/70">{crumb.name}</li>
                )}
                {idx < resolvedCrumbs.length - 1 && (
                  <li aria-hidden="true" className="text-muted-foreground/40">
                    /
                  </li>
                )}
              </Fragment>
            ))}
            <li aria-hidden="true" className="text-muted-foreground/40">
              /
            </li>
            <li className="text-foreground" aria-current="page">
              {pageName}
            </li>
          </ol>
        </nav>

        <div className="max-w-2xl">
          <h1 className="mb-3 text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:mb-4 sm:text-4xl lg:text-5xl">
            {pageName}
          </h1>
          {description && (
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground sm:max-w-none sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
