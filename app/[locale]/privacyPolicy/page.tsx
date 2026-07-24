import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";
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
  const alternates = getAlternates("/privacyPolicy");
  return {
    title: t.seo.privacy.title,
    description: t.seo.privacy.description,
    alternates: {
      canonical: alternates.languages[locale],
      languages: alternates.languages,
    },
    openGraph: {
      title: t.seo.privacy.title,
      description: t.seo.privacy.description,
      url: `${SITE_URL}/${locale}/privacyPolicy`,
    },
  };
}

export default function PrivacyPolicy() {
  return <PrivacyPolicyClient />;
}
