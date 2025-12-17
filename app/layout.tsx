import { Inter } from 'next/font/google';
import '../styles/index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BotpressChat from './components/BotpressChat'; 
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  manifest: "/manifest.webmanifest",
  title: {
    default: "Mehmed Muric - Full-Stack Developer | Portfolio",
    template: "%s | Mehmed Muric",
  },
  description:
    "Portfolio of Mehmed Muric, a full-stack developer specialized in modern web and mobile applications. Explore projects built with React, Next.js, Node.js, TypeScript, and cutting-edge technologies. Available for freelance and collaboration opportunities.",
  keywords: [
    "full-stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript",
    "JavaScript",
    "mobile app developer",
    "portfolio",
    "freelance developer",
    "web development",
    "software engineer",
  ],
  authors: [{ name: "Mehmed Muric", url: baseUrl }],
  creator: "Mehmed Muric",
  publisher: "Mehmed Muric",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "Mehmed Muric - Full-Stack Developer | Portfolio",
    description:
      "Portfolio showcasing modern web & mobile applications built with React, Next.js, Node.js, TypeScript, and cutting-edge technologies. Explore my projects and get in touch for collaborations.",
    siteName: "Mehmed Muric Portfolio",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/android-chrome-512x512.png`,
        width: 1200,
        height: 630,
        alt: "Mehmed Muric - Full-Stack Developer Portfolio",
        type: "image/png",
      },
      {
        url: `${baseUrl}/images/logo/mehmed.jpg`,
        width: 1200,
        height: 630,
        alt: "Mehmed Muric Profile",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehmed Muric - Full-Stack Developer | Portfolio",
    description:
      "Portfolio showcasing modern web & mobile applications built with React, Next.js, Node.js, and more.",
    images: [`${baseUrl}/android-chrome-512x512.png`],
    creator: "@mehmedmuric",
    site: "@mehmedmuric",
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
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
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
  verification: {
    // Add your verification codes here if needed
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const isHome = resolvedParams.locale === undefined;

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* Performance: Resource hints */}
        <link rel="preconnect" href="https://cdn.botpress.cloud" />
        <link rel="preconnect" href="https://files.bpcontent.cloud" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://messaging.botpress.cloud" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* SEO: Canonical and alternate */}
        <link rel="canonical" href={baseUrl} />
        <meta name="theme-color" content="#00FF88" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        {/* Structured Data for Homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mehmed Muric",
              "url": baseUrl,
              "image": `${baseUrl}/images/logo/mehmed.jpg`,
              "jobTitle": "Full-Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance",
              },
              "sameAs": [
                "https://github.com/mehmedmuric",
                // Add other social media links here
              ],
              "knowsAbout": [
                "Web Development",
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "Full-Stack Development",
                "Mobile App Development",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mehmed Muric Portfolio",
              "url": baseUrl,
              "description": "Full-stack developer portfolio showcasing modern web and mobile applications",
              "author": {
                "@type": "Person",
                "name": "Mehmed Muric",
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${baseUrl}/projects?search={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${isHome ? "home" : ""} scroll-smooth`}>
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
        <BotpressChat />
        <Footer />
      </body>
    </html>
  );
}
