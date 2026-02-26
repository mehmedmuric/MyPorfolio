'use client'
import Link from "next/link";
import { Fragment } from "react";

interface BreadcrumbProps {
  pageName: string;
  description?: string;
  crumbs?: { name: string; href?: string }[];
}

// Enhanced Breadcrumbs - premium modern design
const Breadcrumb = ({
  pageName,
  description,
  crumbs = [
    { name: "Home", href: "/" }
  ]
}: BreadcrumbProps) => {

  return (
    <section className="relative z-10 overflow-hidden pt-28 pb-10 bg-slate-950/50">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-slate-900/50 to-transparent pointer-events-none" />
      <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm font-medium">
            {crumbs.map((crumb, idx) => (
              <Fragment key={crumb.name}>
                {crumb.href ? (
                  <li>
                    <Link
                      href={crumb.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {crumb.name}
                    </Link>
                  </li>
                ) : (
                  <li className="text-slate-500 cursor-default">{crumb.name}</li>
                )}
                {idx < crumbs.length - 1 && (
                  <li aria-hidden="true" className="text-slate-600">
                    /
                  </li>
                )}
              </Fragment>
            ))}
            <li aria-hidden="true" className="text-slate-600">/</li>
            <li className="text-white" aria-current="page">
              {pageName}
            </li>
          </ol>
        </nav>

        {/* Title section */}
        <div className="max-w-2xl">
          <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {pageName}
          </h1>
          {description && (
            <p className="text-base sm:text-lg leading-relaxed text-slate-400">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
