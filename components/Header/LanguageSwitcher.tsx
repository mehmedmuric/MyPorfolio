"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { locales, localeLabels, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/utils";
import { useLocale, useTranslations } from "@/lib/i18n/dictionary-context";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  variant?: "desktop" | "mobile";
  className?: string;
  onSelect?: () => void;
};

export default function LanguageSwitcher({
  variant = "desktop",
  className,
  onSelect,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const languageLabel = t.navigation.language;
  const selectLabel = t.common.selectLanguage;

  const current = localeLabels[locale];

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const selectLocale = (next: Locale) => {
    if (next === locale) {
      close();
      onSelect?.();
      return;
    }
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
    router.push(switchLocalePath(pathname, next));
    close();
    onSelect?.();
  };

  if (variant === "mobile") {
    return (
      <div className={cn("w-full", className)} role="group" aria-label={languageLabel}>
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {languageLabel}
        </p>
        <div className="grid grid-cols-5 gap-2">
          {locales.map((code) => {
            const meta = localeLabels[code];
            const active = code === locale;
            return (
              <button
                key={code}
                type="button"
                onClick={() => selectLocale(code)}
                className={cn(
                  "relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl border px-1 py-2.5 text-[11px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "border-primary/40 bg-primary/[0.12] text-primary shadow-[0_0_24px_-8px_hsla(var(--primary),0.55)]"
                    : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-white/15 hover:bg-white/[0.06] hover:text-foreground active:bg-white/[0.08]"
                )}
                aria-pressed={active}
                aria-label={meta.nativeName}
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  {meta.flag}
                </span>
                <span className="font-mono tracking-wider">{meta.short}</span>
                {active && (
                  <span
                    className="absolute bottom-1.5 h-0.5 w-3 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group inline-flex h-10 min-h-10 items-center gap-2 rounded-full border px-3.5 text-sm font-medium backdrop-blur-md transition-all duration-300",
          "border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] text-foreground/90",
          "hover:border-primary/35 hover:from-primary/[0.12] hover:to-white/[0.04] hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
          open &&
            "border-primary/40 from-primary/[0.14] to-white/[0.05] text-primary shadow-[0_0_28px_-10px_hsla(var(--primary),0.55)]"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${languageLabel}: ${current.nativeName}`}
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[13px] leading-none ring-1 ring-primary/25"
          aria-hidden="true"
        >
          {current.flag}
        </span>
        <span className="font-mono text-[11px] font-semibold tracking-[0.14em]">
          {current.short}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 group-hover:text-primary",
            open && "rotate-180 text-primary"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={selectLabel}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+0.55rem)] z-50 min-w-[13rem] overflow-hidden rounded-2xl border border-white/10 bg-background/95 p-1.5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9),0_0_0_1px_hsla(var(--primary),0.08)] backdrop-blur-2xl"
          >
            <li className="px-3 pb-1.5 pt-1" role="presentation">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
                {selectLabel}
              </p>
            </li>
            {locales.map((code) => {
              const meta = localeLabels[code];
              const active = code === locale;
              return (
                <li key={code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => selectLocale(code)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "bg-primary/[0.12] text-primary"
                        : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-base leading-none ring-1",
                        active
                          ? "bg-primary/15 ring-primary/30"
                          : "bg-white/[0.04] ring-white/10"
                      )}
                      aria-hidden="true"
                    >
                      {meta.flag}
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium leading-tight">
                        {meta.nativeName}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] tracking-wider text-muted-foreground/70">
                        {meta.short}
                      </span>
                    </span>
                    {active && (
                      <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
