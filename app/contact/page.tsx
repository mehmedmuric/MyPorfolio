import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to me via the contact form or social media.",
  openGraph: {
    title: "Contact | Mehmed Muric",
    description: "Full-stack developer portfolio contact page.",
    url: "https://mehmedmuric.com/contact",
    images: ["/images/logo/MMlogo.png"],
  },
};

export default function AboutPage() {
  return <ContactClient />;
}

