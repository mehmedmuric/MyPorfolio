import { JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BotpressChat from "@/components/BotpressChat";
import JsonLd from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  defaultLocale,
  htmlLang,
  isLocale,
  locales,
  SITE_URL,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { DictionaryProvider } from "@/lib/i18n/dictionary-context";
import { getAlternates } from "@/lib/i18n/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  adjustFontFallback: true,
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = await getDictionary(locale);
  const alternates = getAlternates("/");

  return {
    manifest: "/manifest.webmanifest",
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.seo.home.title,
      template: `%s | Mehmed Muric`,
    },
    description: t.seo.home.description,
    keywords: t.seo.home.keywords,
    alternates: {
      canonical: alternates.languages[locale],
      languages: alternates.languages,
    },
    openGraph: {
      type: "website",
      locale: htmlLang[locale],
      url: `${SITE_URL}/${locale}`,
      title: t.seo.home.title,
      description: t.seo.home.description,
      siteName: "Mehmed Muric",
      images: [
        {
          url: `${SITE_URL}/images/logo/mehmed.jpg`,
          width: 1200,
          height: 630,
          alt: t.seo.home.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.home.title,
      description: t.seo.home.description,
      images: [`${SITE_URL}/images/logo/mehmed.jpg`],
      creator: "@mehmedmuric",
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      ],
      apple: [
        {
          url: "/apple-touch-icon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        { rel: "android-chrome", url: "/android-chrome-192x192.png" },
        { rel: "android-chrome", url: "/android-chrome-512x512.png" },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = await getDictionary(locale);

  return (
    <html
      lang={htmlLang[locale]}
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://cdn.botpress.cloud" />
        <link rel="preconnect" href="https://files.bpcontent.cloud" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://messaging.botpress.cloud" />
        <meta name="theme-color" content="#00FF88" />
        <JsonLd locale={locale} messages={messages} />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        <DictionaryProvider locale={locale} messages={messages}>
          <Header />
          <main id="main-content">{children}</main>
          <Analytics />
          <SpeedInsights />
          <BotpressChat />
          <Footer />
        </DictionaryProvider>
      </body>
    </html>
  );
}

// Silence unused defaultLocale in some bundlers
void defaultLocale;
