"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "@/lib/i18n/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import menuData from "./menuData";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "../ui/button";
import { SocialButton } from "../ui/social-button";
import Container from "../Container";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n/dictionary-context";
import { stripLocale } from "@/lib/i18n/utils";

const Header = () => {
  const t = useTranslations();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const pathWithoutLocale = stripLocale(pathname);
  const reducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const closeMenu = useCallback(() => setNavbarOpen(false), []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setSticky(window.scrollY >= 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navbarOpen]);

  useEffect(() => {
    if (!navbarOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [navbarOpen, closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-[max(1rem,env(safe-area-inset-top))] focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t.navigation.skipToContent}
      </a>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 border-b border-transparent transition-all duration-500 ease-out",
          "pt-[env(safe-area-inset-top,0px)]",
          sticky
            ? "border-white/5 bg-background/75 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:py-4"
            : "bg-transparent py-4 sm:py-6"
        )}
      >
        <Container className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="group relative z-50 flex min-h-11 min-w-11 items-center gap-2 focus-visible:outline-none"
            onClick={closeMenu}
            aria-label={t.navigation.homeAria}
          >
            <div className="relative">
              <Image
                src="/images/logo/MMlogo.png"
                alt="Mehmed Muric"
                width={48}
                height={48}
                className="h-auto w-10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 sm:w-12"
                priority
              />
              <div
                className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
            </div>
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/5 p-1 backdrop-blur-sm md:flex"
            aria-label={t.navigation.primaryNav}
          >
            {menuData.map((item) => {
              const isActive = pathWithoutLocale === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path || "/"}
                  className={cn(
                    "relative rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-white/5 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {t.navigation[item.titleKey]}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full ring-1 ring-primary/25"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex lg:gap-3">
            <LanguageSwitcher />
            <Button variant="premium" size="sm" className="hidden min-h-10 lg:inline-flex" asChild>
              <Link href="/contact">{t.navigation.startProject}</Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-primary lg:hidden" asChild>
              <Link href="/contact" aria-label={t.navigation.contactAria}>
                <Mail className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setNavbarOpen((open) => !open)}
            className={cn(
              "relative z-50 flex h-11 w-11 items-center justify-center rounded-xl text-primary transition-colors active:bg-white/10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              navbarOpen && "pointer-events-none opacity-0"
            )}
            aria-label={t.navigation.openMenu}
            aria-expanded={navbarOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            id="mobile-nav"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.navigation.mobileNav}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-transparent to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/3 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl opacity-70"
              aria-hidden="true"
            />

            <div className="relative z-10 flex items-center justify-end px-4 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] sm:px-6">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-primary transition-colors active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={t.navigation.closeMenu}
              >
                <X size={26} aria-hidden="true" />
              </button>
            </div>

            <nav
              className="relative z-10 flex flex-1 flex-col items-stretch justify-center gap-1 px-6 pb-8"
              aria-label={t.navigation.mobileNav}
            >
              {menuData.map((item, index) => {
                const isActive = pathWithoutLocale === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reducedMotion ? 0 : 0.04 + index * 0.04,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.path || "/"}
                      onClick={closeMenu}
                      className={cn(
                        "flex min-h-[52px] items-center justify-between rounded-2xl px-4 text-[1.65rem] font-semibold tracking-tight transition-colors duration-200 active:bg-white/[0.06]",
                        isActive
                          ? "bg-primary/[0.08] text-primary"
                          : "text-foreground/90"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {t.navigation[item.titleKey]}
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="my-4 h-px w-full bg-white/10" aria-hidden="true" />

              <LanguageSwitcher variant="mobile" className="mb-4" onSelect={closeMenu} />

              <Button
                size="xl"
                variant="premium"
                className="w-full rounded-full"
                asChild
              >
                <Link href="/contact" onClick={closeMenu}>
                  {t.navigation.startProject}
                </Link>
              </Button>

              <div className="mt-8 flex items-center justify-center gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <SocialButton href="https://github.com/mehmedmuric" icon={Github} label={t.common.github} />
                <SocialButton
                  href="https://linkedin.com/in/mehmed-muric-185297232"
                  icon={Linkedin}
                  label={t.common.linkedin}
                />
                <SocialButton href="https://twitter.com/mehmedmuricc" icon={Twitter} label={t.common.twitter} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
