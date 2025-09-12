
import { Inter } from 'next/font/google';

import '../styles/index.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

// Metadata for SEO and social sharing
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mehmed Muric - Full-Stack Developer",
    template: "%s | Mehmed Muric",
  },
  description:
    "Portfolio of Mehmed Muric, a full-stack developer specialized in modern web and mobile applications using React, Next.js, Node.js, and more.",
  metadataBase: new URL("https://mehmedmuric.com"), // 👈 stavi pravi domen kad deployaš

  openGraph: {
    type: "website",
    url: "https://mehmedmuric.com",
    title: "Mehmed Muric - Full-Stack Developer",
    description:
      "Portfolio showcasing modern web & mobile applications built with React, Next.js, Node.js, and more.",
    siteName: "Mehmed Muric Portfolio",
    images: [
      {
        url: "/images/logo/MMlogo.png", // 👈 napravi sliku 1200x630
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
    images: ["/images/og-image.png"],
    creator: "@mehmedmuric", // ako imaš Twitter
  },

  alternates: {
    canonical: "https://mehmedmuric.com",
  },

  icons: {
    icon: "/images/logo/MMlogo.png", // 👈 stavi favicon
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


export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
            <Header />
            {children}
            <Footer />
      </body>
    </html>
  );
}