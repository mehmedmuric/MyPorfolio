import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "See what clients say about my work and leave your feedback.",
  alternates: {
    canonical: "https://mehmedmuric.com/testimonials",
  },
  openGraph: {
    title: "Testimonials | Mehmed Muric",
    description: "See what clients say about my work and leave your feedback.",
    url: "https://mehmedmuric.com/testimonials",
    images: ["/images/logo/MMlogo.png"],
  },
};

export default function TestimonialsPage() {
  return (
    
      <TestimonialsClient />
    
  );
}