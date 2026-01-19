import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mehmed Muric - full-stack developer. Reach out via the contact form or connect on social media for project inquiries and collaborations.",
  alternates: {
    canonical: "https://mehmedmuric.com/contact",
  },
  openGraph: {
    title: "Contact | Mehmed Muric",
    description: "Get in touch with a full-stack developer for your next project.",
    url: "https://mehmedmuric.com/contact",
    type: "website",
    images: [
      {
        url: "https://mehmedmuric.com/images/logo/MMlogo.png",
        width: 1200,
        height: 630,
        alt: "Contact Mehmed Muric",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Mehmed Muric",
    description: "Get in touch with a full-stack developer for your next project.",
    images: ["https://mehmedmuric.com/images/logo/MMlogo.png"],
  },
};

export default function AboutPage() {
  return <ContactClient />;
}

