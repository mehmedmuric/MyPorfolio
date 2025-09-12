import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about me, my skills, and my developer journey.",
  openGraph: {
    title: "About Me | Mehmed Muric",
    description: "Full-stack developer with a passion for building modern web apps.",
    url: "https://mehmedmuric/about",
    images: ["/images/logo/MMlogo.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

