import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read testimonials from clients and colleagues about Mehmed Muric's full-stack development work. See what people say about completed projects and collaborations.",
  alternates: {
    canonical: "https://mehmedmuric.com/testimonials",
  },
  openGraph: {
    title: "Testimonials | Mehmed Muric",
    description: "See what clients and colleagues say about my work and leave your feedback.",
    url: "https://mehmedmuric.com/testimonials",
    type: "website",
    images: [
      {
        url: "https://mehmedmuric.com/images/testimonials/testimonials.png",
        width: 1200,
        height: 630,
        alt: "Client Testimonials - Mehmed Muric",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | Mehmed Muric",
    description: "See what clients and colleagues say about my work.",
    images: ["https://mehmedmuric.com/images/testimonials/testimonials.png"],
  },
};

export default function TestimonialsPage() {
  return (
    
      <TestimonialsClient />
    
  );
}