// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

interface Blog {
  id: number;
  title: string;
  publishDate: string;
}

async function getProjects(): Promise<Blog[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";
  try {
    const res = await fetch(`${baseUrl}/data/projects.json`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error);
    return [];
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";
  const now = new Date().toISOString();

  // Fetch projects dynamically
  const projects = await getProjects();

  const staticPages = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "about", priority: "0.9", changefreq: "monthly" },
    { path: "contact", priority: "0.8", changefreq: "monthly" },
    { path: "projects", priority: "0.9", changefreq: "weekly" },
    { path: "testimonials", priority: "0.7", changefreq: "monthly" },
    { path: "privacyPolicy", priority: "0.5", changefreq: "yearly" },
    { path: "TermsOfUse", priority: "0.5", changefreq: "yearly" },
  ];

  const urls = [
    // Static pages
    ...staticPages.map(
      (page) => `
      <url>
        <loc>${baseUrl}/${page.path}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `
    ),

    // Dynamic blog-details routes
    ...projects.map(
      (project) => `
      <url>
        <loc>${baseUrl}/blog-details/${project.id}</loc>
        <lastmod>${new Date(project.publishDate).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `
    ),
  ].join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${urls}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
