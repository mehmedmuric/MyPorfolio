import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";

export const metadata: Metadata = {
  title: "About Me | Full-Stack Developer",
  description: "Learn more about Mehmed Muric, a full-stack developer specializing in modern web and mobile applications. Discover my skills, experience, and passion for building innovative solutions with React, Next.js, Node.js, and more.",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About Me | Mehmed Muric - Full-Stack Developer",
    description: "Full-stack developer with a passion for building modern web apps. Specialized in React, Next.js, Node.js, and mobile development.",
    url: `${baseUrl}/about`,
    siteName: "Mehmed Muric Portfolio",
    images: [
      {
        url: `${baseUrl}/images/logo/mehmed.jpg`,
        width: 1200,
        height: 630,
        alt: "Mehmed Muric - Full-Stack Developer",
      },
    ],
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me | Mehmed Muric - Full-Stack Developer",
    description: "Full-stack developer with a passion for building modern web apps.",
    images: [`${baseUrl}/images/logo/mehmed.jpg`],
    creator: "@mehmedmuric",
  },
  keywords: [
    "full-stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "mobile app developer",
    "JavaScript",
    "TypeScript",
    "portfolio",
  ],
};

export default function AboutPage() {
  return <AboutClient />;
}

