import Link from "next/link";
import { Fragment } from "react";

interface BreadcrumbProps {
  pageName: string;
  description?: string;
  crumbs?: { name: string; href?: string }[];
}

// Enhanced Breadcrumbs - dynamic and accessible
const Breadcrumb = ({
  pageName,
  description,
  crumbs = [
    { name: "Home", href: "/" }
    // Optionally push more crumbs in usage site for nested pages
  ]
}: BreadcrumbProps) => {
  return (
    <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px] particles-bg bg-gradient-to-b from-transparent via-transparent to-transparent">
      {/* Subtle background glow for breadcrumb */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-0">
          <ol className="flex flex-wrap items-center space-x-2 md:justify-end mb-6 text-[15px] font-medium">
            {crumbs.map((crumb, idx) => (
              <Fragment key={crumb.name}>
                {crumb.href ? (
                  <li>
                    <Link
                      href={crumb.href}
                      className="text-body-color hover:text-mygreen transition-colors underline-offset-2"
                    >
                      {crumb.name}
                    </Link>
                  </li>
                ) : (
                  <li className="text-mygreen font-semibold">{crumb.name}</li>
                )}
                {idx < crumbs.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="mx-2 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"
                  />
                )}
              </Fragment>
            ))}
            <li
              className="text-mygreen font-semibold"
              aria-current="page"
            >
              {pageName}
            </li>
          </ol>
        </nav>
        
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 md:w-8/12 lg:w-7/12">
            <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
              <h1 className="mb-3 text-3xl sm:text-4xl font-extrabold text-gradient bg-gradient-to-r from-mygreen to-green-400 bg-clip-text text-transparent mt-6 drop-shadow-sm">
                {pageName}
              </h1>
              {description && (
                <p className="text-base font-medium leading-relaxed text-body-color/90">
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className="w-full px-4 md:w-4/12 lg:w-5/12 flex items-center justify-end">
            {/* Optionally you can add an illustration, icon or secondary content here */}
            {/* <div className="hidden md:block"> ... </div> */}
          </div>
        </div>
      </div>

      {/* Decorative SVGs, with an animation class and improved colors */}
      <span className="absolute left-0 top-0 z-[-1] animate-fade-in">
        <svg
          width="287"
          height="254"
          viewBox="0 0 287 254"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.13"
            d="M286.5 0.5L-14.5 254.5V69.5L286.5 0.5Z"
            className="fill-mygreen"
          />
        </svg>
      </span>
      <span className="absolute right-0 top-0 z-[-1] animate-fade-in">
        <svg
          width="628"
          height="258"
          viewBox="0 0 628 258"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.09"
            d="M669.125 257.002L345.875 31.9983L524.571 -15.8832L669.125 257.002Z"
            className="fill-mygreen"
          />
          <path
            opacity="0.08"
            d="M0.0716344 182.78L101.988 -15.0769L142.154 81.4093L0.0716344 182.78Z"
            className="fill-mygreen"
          />
        </svg>
      </span>
    </section>
  );
};

export default Breadcrumb;
