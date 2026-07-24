import type { Metadata } from "next";
import TermsOfUseClient from "./TermsOfUseClient";
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
  const alternates = getAlternates("/TermsOfUse");
  return {
    title: t.seo.terms.title,
    description: t.seo.terms.description,
    alternates: {
      canonical: alternates.languages[locale],
      languages: alternates.languages,
    },
    openGraph: {
      title: t.seo.terms.title,
      description: t.seo.terms.description,
      url: `${SITE_URL}/${locale}/TermsOfUse`,
    },
  };
}

export default function TermsOfUse() {
  return <TermsOfUseClient />;
}
