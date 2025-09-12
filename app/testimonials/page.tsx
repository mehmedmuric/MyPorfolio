import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "See what clients say about my work and leave your feedback.",
  openGraph: {
    title: "About Me | Mehmed Muric",
    description: "See what clients say about my work and leave your feedback.",
    url: "https://mehmedmuric/testimonials",
    images: ["/images/logo/MMlogo.png"],
  },
};

export default function TestimonialsPage() {
  return (
    
      <TestimonialsClient />
    
  );
}