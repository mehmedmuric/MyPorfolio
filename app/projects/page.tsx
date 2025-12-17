import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { generateCollectionPageStructuredData } from "@/lib/structuredData";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";

// Fetch projects for structured data
async function getProjectsForStructuredData() {
  try {
    const res = await fetch(`${baseUrl}/data/projects.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Projects | Portfolio Showcase",
  description: "Browse my full-stack projects and portfolio work. Explore modern web applications, mobile apps, and innovative solutions built with React, Next.js, Node.js, and more.",
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
  openGraph: {
    title: "Projects | Mehmed Muric Portfolio",
    description: "Showcasing portfolio and real-world projects including web applications, mobile apps, and full-stack solutions.",
    url: `${baseUrl}/projects`,
    siteName: "Mehmed Muric Portfolio",
    images: [
      {
        url: `${baseUrl}/images/logo/MMlogo.png`,
        width: 1200,
        height: 630,
        alt: "Mehmed Muric Projects",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Mehmed Muric Portfolio",
    description: "Showcasing portfolio and real-world projects.",
    images: [`${baseUrl}/images/logo/MMlogo.png`],
    creator: "@mehmedmuric",
  },
  keywords: [
    "portfolio projects",
    "web development",
    "full-stack developer",
    "React projects",
    "Next.js projects",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "web applications",
  ],
};

export default async function ProjectsPage() {
  const projects = await getProjectsForStructuredData();
  
  const structuredData = generateCollectionPageStructuredData({
    name: "Portfolio Projects",
    url: `${baseUrl}/projects`,
    description: "A collection of full-stack projects and portfolio work showcasing modern web and mobile applications.",
    items: projects.map((project: any) => ({
      name: project.title,
      url: `${baseUrl}/blog-details/${project.id}`,
      image: project.image?.startsWith('/') ? `${baseUrl}${project.image}` : project.image,
      description: project.paragraph?.slice(0, 150),
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProjectsClient />
    </>
  );
}