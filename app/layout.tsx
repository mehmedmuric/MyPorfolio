import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BotpressChat from './components/BotpressChat';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  adjustFontFallback: true,
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
  title: {
    default: "Mehmed Muric - Full-Stack Developer",
    template: "%s | Mehmed Muric",
  },
  description:
    "Portfolio of Mehmed Muric, a full-stack developer specialized in modern web and mobile applications using React, Next.js, Node.js, and more.",
  metadataBase: new URL("https://mehmedmuric.com"),
  alternates: {
    canonical: "https://mehmedmuric.com",
  },
  openGraph: {
    type: "website",
    url: "https://mehmedmuric.com",
    title: "Mehmed Muric - Full-Stack Developer",
    description:
      "Portfolio showcasing modern web & mobile applications built with React, Next.js, Node.js, and more.",
    siteName: "Mehmed Muric Portfolio",
    images: [
      {
        url: "https://mehmedmuric.com/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehmed Muric - Full-Stack Developer",
    description:
      "Portfolio showcasing modern web & mobile applications built with React, Next.js, Node.js, and more.",
    images: ["https://mehmedmuric.com/android-chrome-512x512.png"],
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
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHome = true; // Root layout is always home

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://cdn.botpress.cloud" />
        <link rel="preconnect" href="https://files.bpcontent.cloud" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://messaging.botpress.cloud" />
        <meta name="theme-color" content="#00FF88" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mehmed Muric",
              "jobTitle": "Full-Stack Developer",
              "url": "https://mehmedmuric.com",
              "sameAs": [
                "https://github.com/mehmedmuric",
                "https://linkedin.com/in/mehmed-muric-185297232"
              ],
              "email": "mehmedmuric22@gmail.com",
              "image": "https://mehmedmuric.com/images/logo/mehmed.jpg"
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.variable} ${isHome ? "home" : ""}`}>
        <ErrorBoundary>
          <Header />
          {children}
          <Analytics />
          <SpeedInsights />
          <BotpressChat />
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
