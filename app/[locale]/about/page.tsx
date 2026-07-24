import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { isLocale, type Locale, SITE_URL } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAlternates } from "@/lib/i18n/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = await getDictionary(locale);
  const alternates = getAlternates("/about");
  return {
    title: t.seo.about.title,
    description: t.seo.about.description,
    alternates: {
      canonical: alternates.languages[locale],
      languages: alternates.languages,
    },
    openGraph: {
      title: t.seo.about.title,
      description: t.seo.about.description,
      url: `${SITE_URL}/${locale}/about`,
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
