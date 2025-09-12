import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse my full-stack projects and portfolio work.",
  openGraph: {
    title: "Projects | Mehmed Muric",
    description: "Showcasing portfolio and real-world projects.",
    url: "https://mehmedmuric/projects",
    images: ["/images/logo/MMlogo.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}