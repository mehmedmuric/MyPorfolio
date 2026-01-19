import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Mehmed Muric, a full-stack developer with 4+ years of experience building modern web and mobile applications using React, Next.js, Node.js, and more.",
  alternates: {
    canonical: "https://mehmedmuric.com/about",
  },
  openGraph: {
    title: "About Me | Mehmed Muric",
    description: "Full-stack developer with a passion for building modern web apps.",
    url: "https://mehmedmuric.com/about",
    type: "profile",
    images: [
      {
        url: "https://mehmedmuric.com/images/logo/mehmed.jpg",
        width: 1200,
        height: 630,
        alt: "Mehmed Muric - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me | Mehmed Muric",
    description: "Full-stack developer with a passion for building modern web apps.",
    images: ["https://mehmedmuric.com/images/logo/mehmed.jpg"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

