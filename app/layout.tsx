import { Inter } from 'next/font/google';
import '../styles/index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BotpressChat from './components/BotpressChat'; 
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mehmed Muric - Full-Stack Developer",
    template: "%s | Mehmed Muric",
  },
  description:
    "Portfolio of Mehmed Muric, a full-stack developer specialized in modern web and mobile applications using React, Next.js, Node.js, and more.",
  metadataBase: new URL("https://mehmedmuric.com"),
  openGraph: {
    type: "website",
    url: "https://mehmedmuric.com",
    title: "Mehmed Muric - Full-Stack Developer",
    description:
      "Portfolio showcasing modern web & mobile applications built with React, Next.js, Node.js, and more.",
    siteName: "Mehmed Muric Portfolio",
    images: [
      {
        url: "https://mehmedmuric.com/images/logo/MMlogo.png",
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
    images: ["https://mehmedmuric.com/images/og-image.png"],
    creator: "@mehmedmuric",
  },
  icons: {
    icon: "/images/logo/MMlogo.png",
    shortcut: "/images/logo/MMlogo.png",
    apple: "/images/logo/MMlogo.png",
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
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const isHome = resolvedParams.locale === undefined;
  return (
    <html lang="en">
      <body className={`${inter.className} ${isHome ? "home" : ""}`}>
        <Header />
        {children}
        <Analytics/>
        <SpeedInsights />
        <BotpressChat />
        <Footer />
       
      </body>
    </html>
  );
}
