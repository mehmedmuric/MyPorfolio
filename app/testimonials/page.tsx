import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";

export const metadata: Metadata = {
  title: "Testimonials | Client Reviews",
  description: "See what clients and collaborators say about my work. Read testimonials from satisfied clients and leave your feedback about working with me.",
  alternates: {
    canonical: `${baseUrl}/testimonials`,
  },
  openGraph: {
    title: "Testimonials | Mehmed Muric - Client Reviews",
    description: "See what clients say about my work and leave your feedback. Read testimonials from satisfied clients.",
    url: `${baseUrl}/testimonials`,
    siteName: "Mehmed Muric Portfolio",
    images: [
      {
        url: `${baseUrl}/images/testimonials/testimonials.png`,
        width: 1200,
        height: 630,
        alt: "Client Testimonials",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | Mehmed Muric",
    description: "See what clients say about my work and leave your feedback.",
    images: [`${baseUrl}/images/testimonials/testimonials.png`],
    creator: "@mehmedmuric",
  },
  keywords: [
    "client testimonials",
    "developer reviews",
    "portfolio feedback",
    "client reviews",
    "satisfied clients",
  ],
};

export default function TestimonialsPage() {
  return (
    
      <TestimonialsClient />
    
  );
}