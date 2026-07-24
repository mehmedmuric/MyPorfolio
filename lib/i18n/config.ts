export const locales = ["sr", "en", "de", "fr", "tr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sr";

export const localeLabels: Record<
  Locale,
  { name: string; nativeName: string; flag: string; short: string }
> = {
  sr: { name: "Serbian", nativeName: "Srpski", flag: "🇷🇸", short: "SR" },
  en: { name: "English", nativeName: "English", flag: "🇬🇧", short: "EN" },
  de: { name: "German", nativeName: "Deutsch", flag: "🇩🇪", short: "DE" },
  fr: { name: "French", nativeName: "Français", flag: "🇫🇷", short: "FR" },
  tr: { name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", short: "TR" },
};

export const htmlLang: Record<Locale, string> = {
  sr: "sr",
  en: "en",
  de: "de",
  fr: "fr",
  tr: "tr",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const SITE_URL = "https://mehmedmuric.com";
