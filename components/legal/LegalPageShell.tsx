"use client";

import {
  useState,
  useEffect,
  useMemo,
  memo,
  type ReactNode,
  type MouseEvent,
} from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useIsClient, useMediaQuery, usePrefersReducedMotion } from "@/lib/media";
import { useTranslations } from "@/lib/i18n/dictionary-context";

export type LegalTocItem = {
  id: string;
  title: string;
};

export type LegalPageShellProps = {
  breadcrumbName: string;
  title: string;
  description?: string;
  children: ReactNode;
  sections?: LegalTocItem[];
  showScrollProgress?: boolean;
  /** Unique prefix for SVG pattern IDs to avoid collisions */
  gridIdPrefix?: string;
};

const DATA_STREAM_CHARS = [
  "0", "1", "0", "1", "0", "1", "1", "0", "1", "0",
  "1", "1", "0", "1", "0", "1", "0", "1", "1", "0",
];

const PARTICLE_SEEDS = [
  { left: "8%", size: 3, delay: 0, duration: 18 },
  { left: "18%", size: 2, delay: 0.8, duration: 22 },
  { left: "28%", size: 4, delay: 1.6, duration: 16 },
  { left: "38%", size: 2.5, delay: 2.4, duration: 20 },
  { left: "48%", size: 3.5, delay: 3.2, duration: 24 },
  { left: "58%", size: 2, delay: 4, duration: 17 },
  { left: "68%", size: 4, delay: 4.8, duration: 21 },
  { left: "78%", size: 3, delay: 5.6, duration: 19 },
  { left: "88%", size: 2.5, delay: 6.4, duration: 23 },
  { left: "12%", size: 3, delay: 7.2, duration: 15 },
  { left: "52%", size: 2, delay: 8, duration: 25 },
  { left: "92%", size: 3.5, delay: 8.8, duration: 18 },
];

const DataStream = ({
  delay,
  left,
  speed = 8,
  reducedMotion,
}: {
  delay: number;
  left: string;
  speed?: number;
  reducedMotion: boolean;
}) => {
  const [chars, setChars] = useState<string[]>(() =>
    Array.from(
      { length: 20 },
      () => DATA_STREAM_CHARS[Math.floor(Math.random() * DATA_STREAM_CHARS.length)],
    ),
  );

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setChars((prev) => {
        const next = [...prev];
        next.shift();
        next.push(
          DATA_STREAM_CHARS[Math.floor(Math.random() * DATA_STREAM_CHARS.length)],
        );
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div
      className="absolute text-primary/25 sm:text-primary/30 md:text-primary/35 font-mono text-[8px] sm:text-[10px] tracking-[0.2em] pointer-events-none select-none"
      style={{
        left,
        top: "-10%",
        animation: reducedMotion
          ? undefined
          : `legalDataStream ${speed}s linear ${delay}s infinite`,
        textShadow:
          "0 0 3px hsla(var(--primary), 0.3), 0 0 6px hsla(var(--primary), 0.2)",
      }}
      aria-hidden="true"
    >
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            opacity: i < 3 ? 0.1 : i > chars.length - 4 ? 0.1 : 0.4,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

const DecorativeCircles = memo(() => (
  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] md:w-[1000px] md:h-[1000px] opacity-5 sm:opacity-8 md:opacity-10 pointer-events-none z-0">
    <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none">
      <circle cx="500" cy="500" r="300" fill="hsla(152, 100%, 50%, 0.06)" />
      <circle cx="750" cy="250" r="150" fill="hsla(152, 100%, 50%, 0.04)" />
      <circle cx="200" cy="750" r="100" fill="hsla(152, 100%, 50%, 0.03)" />
      <circle cx="800" cy="700" r="120" fill="hsla(152, 100%, 50%, 0.03)" />
    </svg>
  </div>
));
DecorativeCircles.displayName = "DecorativeCircles";

const FloatingParticle = ({
  delay,
  left,
  size,
  duration,
  reducedMotion,
}: {
  delay: number;
  left: string;
  size: number;
  duration: number;
  reducedMotion: boolean;
}) => (
  <div
    className="absolute rounded-full bg-primary pointer-events-none"
    style={{
      left,
      width: `${size}px`,
      height: `${size}px`,
      opacity: 0.2,
      animation: reducedMotion
        ? undefined
        : `legalFloatParticle ${duration}s ease-in-out ${delay}s infinite`,
      boxShadow: `0 0 ${size * 2}px hsla(var(--primary), 0.5)`,
    }}
    aria-hidden="true"
  />
);

export default function LegalPageShell({
  breadcrumbName,
  title,
  description,
  children,
  sections,
  showScrollProgress = false,
  gridIdPrefix = "legal",
}: LegalPageShellProps) {
  const t = useTranslations().common;
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)", true);
  const lightFx = reducedMotion || isMobile;
  const mounted = useIsClient();
  const sectionIds = useMemo(
    () => sections?.map((s) => s.id) ?? [],
    [sections],
  );
  const [activeSection, setActiveSection] = useState<string | null>(
    () => sectionIds[0] ?? null,
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  const lastUpdated = useMemo(
    () => new Date().toISOString().split("T")[0],
    [],
  );

  useEffect(() => {
    if (sectionIds.length === 0 && !showScrollProgress) return;

    const handleScroll = () => {
      if (showScrollProgress) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const progress =
          (scrollTop / Math.max(1, documentHeight - windowHeight)) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      if (sectionIds.length === 0) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, showScrollProgress]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    setActiveSection(id);
  };

  const handleArticleMouseOver = (e: MouseEvent<HTMLElement>) => {
    const section = (e.target as HTMLElement).closest("section[id]");
    if (section?.id && sectionIds.includes(section.id)) {
      setActiveSection(section.id);
    }
  };

  const gridPrimary = `${gridIdPrefix}-grid-primary`;
  const gridSecondary = `${gridIdPrefix}-grid-secondary`;
  const gridGlow = `${gridIdPrefix}-grid-glow`;

  return (
    <>
      <Breadcrumb pageName={breadcrumbName} description={description ?? ""} />

      <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#050805] to-[#0a0a0a]">
        {showScrollProgress && (
          <div
            className="fixed left-0 right-0 top-[calc(4.25rem+env(safe-area-inset-top,0px))] z-40 h-[2px] bg-primary/10 sm:top-[calc(4.75rem+env(safe-area-inset-top,0px))]"
            aria-hidden="true"
          >
            <div
              className="h-full bg-gradient-to-r from-primary via-[#00FF88] to-primary transition-all duration-150"
              style={{
                width: `${scrollProgress}%`,
                boxShadow: "0 0 10px hsla(var(--primary), 0.8)",
              }}
            />
          </div>
        )}

        {/* Background FX */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.1]">
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id={gridPrimary}
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#00FF88"
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                </pattern>
                <pattern
                  id={gridSecondary}
                  width="25"
                  height="25"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 25 0 L 0 0 0 25"
                    fill="none"
                    stroke="#00FF88"
                    strokeWidth="0.3"
                    opacity="0.2"
                  />
                </pattern>
                <linearGradient id={gridGlow} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#00FF88" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#00FF88" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${gridPrimary})`} />
              <rect width="100%" height="100%" fill={`url(#${gridSecondary})`} />
              <rect width="100%" height="100%" fill={`url(#${gridGlow})`} />
            </svg>
          </div>

          <DecorativeCircles />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(152,100%,50%,0.04)_0%,_transparent_70%)]" />
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_top_left,_hsla(152,100%,50%,0.03)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_right,_hsla(152,100%,50%,0.03)_0%,_transparent_50%)]" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                hsla(152, 100%, 50%, 0.15) 2px,
                hsla(152, 100%, 50%, 0.15) 4px
              )`,
            }}
          />

          {!lightFx && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute w-full h-[1px] sm:h-[1.5px] md:h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 sm:opacity-35 md:opacity-40"
                style={{
                  animation: "scanLine 4s linear 0s infinite",
                  boxShadow:
                    "0 0 8px #00FF88, 0 0 15px #00FF88, 0 0 25px hsla(152,100%,50%,0.2)",
                }}
              />
              <div
                className="absolute w-full h-[0.5px] sm:h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-25 sm:opacity-30 md:opacity-35"
                style={{
                  animation: "scanLine 6s linear 2s infinite",
                  boxShadow:
                    "0 0 5px #00FF88, 0 0 10px hsla(152,100%,50%,0.3)",
                }}
              />
              <div
                className="absolute w-full h-[0.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-20"
                style={{
                  animation: "scanLine 8s linear 4s infinite",
                  boxShadow: "0 0 3px hsla(152,100%,50%,0.2)",
                }}
              />
            </div>
          )}

          {mounted && !lightFx && (
            <>
              <div suppressHydrationWarning>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <DataStream
                    key={i}
                    delay={i * 1.5}
                    left={`${8 + i * 12}%`}
                    speed={8 + (i % 3) * 2}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
              <div suppressHydrationWarning>
                {PARTICLE_SEEDS.map((p, i) => (
                  <FloatingParticle
                    key={i}
                    delay={p.delay}
                    left={p.left}
                    size={p.size}
                    duration={p.duration}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </>
          )}

          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,_hsla(152,100%,50%,0.08)_0%,_transparent_70%)] blur-3xl opacity-20 ${lightFx ? "" : "animate-pulse-slow"}`}
            aria-hidden
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[radial-gradient(circle_at_center,_hsla(152,100%,50%,0.06)_0%,_transparent_70%)] blur-2xl opacity-15"
            aria-hidden
          />
          <div
            className="absolute top-1/2 right-1/3 w-48 h-48 bg-[radial-gradient(circle_at_center,_hsla(152,100%,50%,0.05)_0%,_transparent_70%)] blur-xl opacity-10"
            aria-hidden
          />
        </div>

        {/* Main layout */}
        <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 sm:py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
            {sections && sections.length > 0 && (
              <aside className="legal-toc-aside lg:-ml-4 lg:w-56 lg:flex-shrink-0 xl:-ml-6 xl:w-64">
                {/* Mobile: compact horizontal chip scroller */}
                <nav
                  aria-label={t.tableOfContents}
                  className="mb-2 overflow-x-auto no-scrollbar lg:hidden"
                >
                  <div className="flex min-w-max gap-2 pb-1">
                    {sections.map((section, index) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={`inline-flex min-h-11 items-center rounded-full border px-3.5 py-2 font-mono text-xs transition-colors ${
                            isActive
                              ? "border-primary/40 bg-primary/15 text-primary"
                              : "border-primary/20 bg-black/40 text-gray-400 active:bg-primary/10"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {String(index + 1).padStart(2, "0")}. {section.title}
                        </button>
                      );
                    })}
                  </div>
                </nav>

                {/* Desktop: sticky sidebar */}
                <nav
                  aria-label={t.tableOfContents}
                  className="sticky top-[calc(5.5rem+env(safe-area-inset-top,0px))] hidden rounded-sm border border-primary/30 bg-black/50 p-4 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsla(var(--primary),0.2)] sm:p-6 lg:block"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                    boxShadow:
                      "0 0 20px hsla(var(--primary), 0.1), inset 0 0 20px hsla(var(--primary), 0.05)",
                  }}
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent" />
                  <h2 className="relative mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary sm:text-sm">
                    <span
                      className={`inline-block h-2 w-2 rounded-full bg-primary ${reducedMotion ? "" : "animate-pulse"}`}
                    />
                    [{t.navigationLabel.toUpperCase()}]
                  </h2>
                  <ul className="space-y-1.5">
                    {sections.map((section, index) => {
                      const isActive = activeSection === section.id;
                      return (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() => scrollToSection(section.id)}
                            className={`group relative w-full overflow-hidden rounded-sm px-3 py-2.5 text-left font-mono text-xs transition-all duration-300 sm:text-sm ${
                              isActive
                                ? "border-l-2 border-primary bg-primary/15 text-primary shadow-[0_0_10px_hsla(var(--primary),0.2)]"
                                : "text-gray-400 hover:border-l-2 hover:border-primary/50 hover:bg-primary/10 hover:text-primary/90"
                            }`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span
                              className={`${isActive ? "text-primary" : "text-primary/50 group-hover:text-primary/70"} transition-colors duration-300`}
                            >
                              {String(index + 1).padStart(2, "0")}.
                            </span>{" "}
                            <span className="ml-1">{section.title}</span>
                            {isActive && (
                              <span
                                className={`absolute right-2 top-1/2 -translate-y-1/2 text-primary opacity-60 ${reducedMotion ? "" : "animate-pulse"}`}
                              >
                                ▸
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </aside>
            )}

            <main className="flex-1 max-w-none lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
              <article
                className="relative rounded-sm border border-primary/30 bg-black/70 p-5 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsla(var(--primary),0.25)] sm:p-8 lg:p-12"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  boxShadow:
                    "0 0 30px hsla(var(--primary), 0.15), inset 0 0 30px hsla(var(--primary), 0.05)",
                }}
                onMouseOver={handleArticleMouseOver}
              >
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary opacity-40" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary opacity-40" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary opacity-40" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary opacity-40" />

                <div className="mb-10 pb-8 border-b border-primary/25 relative">
                  <div className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-primary to-transparent" />
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="font-mono text-[1.5rem] font-bold leading-tight tracking-tight text-primary sm:text-3xl lg:text-4xl xl:text-5xl">
                      {title}
                    </h1>
                    <div className="text-xs sm:text-sm font-mono text-primary/70 flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-sm border border-primary/20">
                      <span
                        className={`text-primary ${reducedMotion ? "" : "animate-pulse"}`}
                      >
                        ●
                      </span>
                      <span>
                        [{t.lastUpdated.replace("{date}", lastUpdated)}]
                      </span>
                    </div>
                  </div>
                  {description ? (
                    <p className="mt-4 text-sm text-gray-400 font-mono max-w-prose">
                      {description}
                    </p>
                  ) : null}
                </div>

                {children}

                <div className="mt-12 pt-8 border-t border-primary/20">
                  <div className="text-xs font-mono text-primary/40 text-center">
                    [{t.endOfDocument.toUpperCase()}]
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes legalFloatParticle {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(20px) scale(1);
            opacity: 0;
          }
        }

        @keyframes legalDataStream {
          0% {
            transform: translateY(-10%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }

        @media print {
          .bg-gradient-to-b,
          .bg-black\\/60,
          .backdrop-blur-sm,
          aside,
          nav {
            background: white !important;
            color: black !important;
            border: 1px solid #000 !important;
          }

          .text-primary,
          .text-primary\\/60,
          .text-primary\\/50,
          .text-primary\\/40 {
            color: black !important;
          }

          .text-gray-300,
          .text-gray-400 {
            color: #333 !important;
          }

          aside,
          nav {
            display: none !important;
          }

          article {
            box-shadow: none !important;
            border: 1px solid #000 !important;
          }

          h1,
          h2 {
            color: black !important;
            text-shadow: none !important;
          }
        }

        @media (max-width: 1023px) {
          .legal-toc-aside {
            position: relative !important;
            top: auto !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow,
          .animate-pulse,
          [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
