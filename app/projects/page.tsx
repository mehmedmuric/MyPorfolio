import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse my portfolio of 30+ full-stack projects including web applications, mobile apps, and modern solutions built with React, Next.js, Node.js, and more.",
  alternates: {
    canonical: "https://mehmedmuric.com/projects",
  },
  openGraph: {
    title: "Projects | Mehmed Muric",
    description: "Showcasing portfolio and real-world projects built with cutting-edge technologies.",
    url: "https://mehmedmuric.com/projects",
    type: "website",
    images: [
      {
        url: "https://mehmedmuric.com/images/logo/MMlogo.png",
        width: 1200,
        height: 630,
        alt: "Mehmed Muric Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Mehmed Muric",
    description: "Showcasing portfolio and real-world projects.",
    images: ["https://mehmedmuric.com/images/logo/MMlogo.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}