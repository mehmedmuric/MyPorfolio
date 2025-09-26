// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://mehmedmuric.com";

  // Ako imaš projects.json ili dinamičke ID-jeve
  const projects = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    // dodaj sve projekte koje imaš u /data/projects.json
  ];

  const staticPages = [
    "",
    "about",
    "contact",
    "testimonials",
    "projects",
    "blog",
  ];

  const urls = [
    // statične rute
    ...staticPages.map(
      (page) => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${page === "" ? "1.0" : "0.8"}</priority>
      </url>
    `
    ),

    // dinamičke rute za blog-details
    ...projects.map(
      (project) => `
      <url>
        <loc>${baseUrl}/blog-details/${project.id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `
    ),
  ].join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
