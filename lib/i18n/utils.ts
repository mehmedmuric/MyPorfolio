import { defaultLocale, isLocale, locales, type Locale } from "./config";

/** Strip locale prefix from a pathname. `/en/projects` → `/projects` */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && isLocale(segments[1])) {
    const rest = segments.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

/** Prefixed path for a locale. `/projects` + `de` → `/de/projects` */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

/** Replace locale segment while preserving the rest of the route. */
export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  return localizePath(stripLocale(pathname), nextLocale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : defaultLocale;
}

/** Negotiate preferred locale from Accept-Language header. */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return {
        tag: tag.toLowerCase().split("-")[0],
        q: q ? Number(q) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    if (isLocale(tag)) return tag;
  }

  return defaultLocale;
}

export function getAlternates(pathWithoutLocale: string) {
  const clean =
    pathWithoutLocale === "/" ? "" : pathWithoutLocale.replace(/\/$/, "");

  const languages = Object.fromEntries(
    locales.map((locale) => [
      locale,
      `https://mehmedmuric.com/${locale}${clean}`,
    ])
  ) as Record<Locale, string>;

  return {
    canonical: `https://mehmedmuric.com/${defaultLocale}${clean}`,
    languages: {
      ...languages,
      "x-default": `https://mehmedmuric.com/${defaultLocale}${clean}`,
    },
  };
}
