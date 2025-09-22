import { NextRequest, NextResponse } from "next/server";

interface Blog {
  id: number;
}

interface Project {
  id: number;
}

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapEntry {
  url: string;
  lastModified: string | Date;
  changeFrequency?: ChangeFrequency;
  priority?: number;
}

export async function GET(req: NextRequest) {
  const baseUrl = "https://mehmedmuric.com"; // promeni po potrebi

  // --- Primer statičkih stranica ---
  const staticPages = ["", "/about", "/contact", "/testimonials"];
  
  const staticEntries: SitemapEntry[] = staticPages.map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  // --- Projekti (dohvati iz JSON-a ili API-ja) ---
  const projectsRes = await fetch(`${baseUrl}/data/projects.json`);
  const projects: Project[] = await projectsRes.json();

  const projectEntries: SitemapEntry[] = projects.map((p) => ({
    url: `${baseUrl}/blog-details/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // --- Blogovi (dohvati iz JSON-a ili API-ja) ---
  const blogsRes = await fetch(`${baseUrl}/data/blogs.json`);
  const blogs: Blog[] = await blogsRes.json();

  const blogEntries: SitemapEntry[] = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // --- Spoji sve ---
  const allEntries: SitemapEntry[] = [
    ...staticEntries,
    ...projectEntries,
    ...blogEntries,
  ];

  // --- Generiši XML ---
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allEntries
      .map(
        (entry) => `
      <url>
        <loc>${entry.url}</loc>
        <lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>
        <changefreq>${entry.changeFrequency ?? "monthly"}</changefreq>
        <priority>${entry.priority ?? 0.5}</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
