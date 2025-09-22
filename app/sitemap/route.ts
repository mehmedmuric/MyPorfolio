import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://mehmedmuric.com";

  // statične stranice
  const staticPages = [
    { url: "/", lastModified: new Date() },
    { url: "/about", lastModified: new Date() },
    { url: "/contact", lastModified: new Date() },
    { url: "/portfolio", lastModified: new Date() },
  ];

  // blog projekti
  const blogProjects = [
    { id: 1, lastModified: new Date() },
    { id: 2, lastModified: new Date() },
    { id: 3, lastModified: new Date() },
  ];

  const blogPages = blogProjects.map((b) => ({
    url: `/blog-details/${b.id}`,
    lastModified: b.lastModified,
  }));

  const pages = [...staticPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `<url>
  <loc>${baseUrl}${page.url}</loc>
  <lastmod>${page.lastModified.toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
