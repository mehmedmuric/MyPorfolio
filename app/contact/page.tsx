import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";

export const metadata: Metadata = {
  title: "Contact Me | Get In Touch",
  description: "Reach out to me via the contact form or social media. I'm available for freelance projects, collaborations, and opportunities. Let's build something amazing together!",
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: "Contact Me | Mehmed Muric - Full-Stack Developer",
    description: "Get in touch with Mehmed Muric for freelance projects, collaborations, and opportunities. Available for web and mobile development projects.",
    url: `${baseUrl}/contact`,
    siteName: "Mehmed Muric Portfolio",
    images: [
      {
        url: `${baseUrl}/images/logo/MMlogo.png`,
        width: 1200,
        height: 630,
        alt: "Contact Mehmed Muric",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Me | Mehmed Muric",
    description: "Reach out for freelance projects, collaborations, and opportunities.",
    images: [`${baseUrl}/images/logo/MMlogo.png`],
    creator: "@mehmedmuric",
  },
  keywords: [
    "contact developer",
    "hire full-stack developer",
    "freelance developer",
    "web development services",
    "contact form",
  ],
};

export default function AboutPage() {
  return <ContactClient />;
}

