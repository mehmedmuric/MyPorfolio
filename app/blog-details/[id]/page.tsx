import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import SharePost from "../../components/Blog/SharePost";
import TagButton from "../../components/Blog/TagButton";
import Breadcrumb from "@/app/components/Common/Breadcrumb";
import { generateArticleStructuredData, generateBreadcrumbStructuredData } from "@/lib/structuredData";
import { calculateReadingTime } from "@/lib/utils";

interface BlogAuthor {
  name: string;
  image: string;
  designation?: string;
}

interface Blog {
  id: number;
  title: string;
  paragraph: string;
  paragraph2?: string;
  author: BlogAuthor;
  publishDate: string;
  tags: string | string[] | undefined; // Can be string, array, or undefined
  image: string;
  livedemo: string;
  gitlink: string;
}

// Helper function to parse date format MM-DD-YYYY to ISO string
function parseDate(dateStr: string): string {
  try {
    const [month, day, year] = dateStr.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// Helper function to safely parse tags (handles string, array, or undefined)
function parseTags(tags: string | string[] | undefined): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean);
  if (typeof tags !== 'string') return [];
  
  // Handle string tags - split by comma or space, filter empty
  if (tags.includes(',')) {
    return tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  return tags.split(/\s+/).map(tag => tag.trim()).filter(Boolean);
}

// Helper function to fetch blogs with caching
async function getBlogs(): Promise<Blog[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";
  try {
    const res = await fetch(`${baseUrl}/data/projects.json`, {
      next: { revalidate: 3600 }, // Revalidate every hour (ISR)
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) throw new Error("Invalid content type");
    return await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// ✅ Generate static params for all blog posts (Performance optimization)
export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    id: blog.id.toString(),
  }));
}

// ✅ Enhanced Metadata with comprehensive SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blogId = Number(resolvedParams.id);
  if (isNaN(blogId)) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.id === blogId);
  
  if (!blog) {
    return { 
      title: "Project Not Found | Mehmed Muric",
      description: "The requested project could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const fullImageUrl = blog.image.startsWith('http') 
    ? blog.image 
    : `${baseUrl}${blog.image.startsWith('/') ? '' : '/'}${blog.image}`;
  
  const description = blog.paragraph.slice(0, 160).trim() + (blog.paragraph.length > 160 ? '...' : '');
  const canonicalUrl = `${baseUrl}/blog-details/${blogId}`;
  const publishDate = parseDate(blog.publishDate);

  return {
    title: `${blog.title} | Mehmed Muric Portfolio`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${blog.title} | Mehmed Muric Portfolio`,
      description,
      url: canonicalUrl,
      siteName: "Mehmed Muric Portfolio",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: publishDate,
      authors: [blog.author.name],
      tags: parseTags(blog.tags),
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | Mehmed Muric Portfolio`,
      description,
      images: [fullImageUrl],
      creator: "@mehmedmuric",
    },
    keywords: [
      ...parseTags(blog.tags),
      "portfolio",
      "web development",
      "full-stack developer",
      "React",
      "Next.js",
    ],
    authors: [{ name: blog.author.name }],
    other: {
      "article:published_time": publishDate,
      "article:author": blog.author.name,
    },
  };
}

function TagsDisplay({ tags }: { tags: string | string[] | undefined }) {
  const tagList = parseTags(tags);
  if (tagList.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {tagList.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center justify-center rounded-full bg-mygreen px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-green-700 hover:text-white transition-colors"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}

// Structured Data Components for SEO
function ArticleStructuredData({ blog }: { blog: Blog }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";
  
  const structuredData = generateArticleStructuredData({
    headline: blog.title,
    description: blog.paragraph,
    image: blog.image,
    datePublished: parseDate(blog.publishDate),
    author: {
      name: blog.author.name,
      image: blog.author.image,
      jobTitle: blog.author.designation || "Full-Stack Developer",
    },
    url: `${baseUrl}/blog-details/${blog.id}`,
    keywords: parseTags(blog.tags),
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function BreadcrumbStructuredData({ blog }: { blog: Blog }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";
  
  const structuredData = generateBreadcrumbStructuredData({
    items: [
      { name: "Home", url: baseUrl },
      { name: "Projects", url: `${baseUrl}/projects` },
      { name: blog.title, url: `${baseUrl}/blog-details/${blog.id}` },
    ],
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const blogId = Number(resolvedParams.id);

  if (isNaN(blogId)) {
    notFound();
  }

  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.id === blogId);
  
  if (!blog) {
    notFound();
  }
  return (
    <Fragment>
      <ArticleStructuredData blog={blog} />
      <BreadcrumbStructuredData blog={blog} />
      <div className="relative min-h-screen bg-[#0a0a0a] bg-gradient-to-b from-[#0f1419] via-[#000000] to-[#051912] overflow-hidden">
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Animated Scan Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scanLine" />
        </div>

        {/* Enhanced Parallax Background with Cyberpunk Glow */}
        <div className="absolute left-[5%] top-[14%] w-96 h-96 bg-[radial-gradient(circle,rgba(0,255,140,0.3)_0%,rgba(0,255,200,0.15)_40%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform animate-pulse" aria-hidden />
        <div className="absolute right-[10%] bottom-[5%] w-[380px] h-[240px] bg-[radial-gradient(circle,rgba(0,200,255,0.2)_0%,rgba(100,200,255,0.1)_40%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform" aria-hidden />
        
        {/* Cyberpunk Neon Accents */}
        <div className="absolute top-20 left-10 w-2 h-32 bg-gradient-to-b from-green-400 to-transparent opacity-60 blur-sm animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-60 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-20">
          <Breadcrumb pageName={blog.title} description="Project Details" />
          <section className="overflow-hidden py-16 sm:py-24 lg:py-32 isolate px-2 sm:px-6 lg:px-8 bg-gradient-to-b bg-gray-900/20 from-gray-950 via-mygreen/10 to-mygreen/5 relative">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          {/* AUTHOR/META HEADER */}
          <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row sm:justify-between sm:items-center border-b border-mygreen/40 pb-5">
            <div className="flex flex-row items-center gap-6">
              {/* Author Avatar */}
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-mygreen shadow">
                <Image
                  src={blog.author.image}
                  alt={`Author: ${blog.author.name}`}
                  fill
                  className="object-cover"
                  sizes="48px"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs sm:text-sm text-body-color/90">
                  By <strong>{blog.author.name}</strong>
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs sm:text-sm text-body-color/70">{blog.publishDate}</span>
                  <span className="text-xs sm:text-sm text-body-color/70 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {calculateReadingTime(blog.paragraph + (blog.paragraph2 || ''))} min read
                  </span>
                </div>
              </div>
            </div>
            <TagsDisplay tags={blog.tags} />
          </div>

          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-center sm:text-left mt-2 mb-2 tracking-tight text-green-100">
            {blog.title}
          </h1>

          {/* PARAGRAPH */}
          <p className="text-center sm:text-left text-base sm:text-lg leading-relaxed text-body-color/90 max-w-3xl mx-auto">
            {blog.paragraph}
          </p>

          {/* IMAGE */}
          <div className="w-full rounded-xl overflow-hidden border border-mygreen/70 shadow-lg group relative">
            <div className="relative aspect-[16/9] w-full bg-mygreen/5 transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-xl">
              <Image
                src={blog.image}
                alt={`Image for ${blog.title}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                priority
              />
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none"></div>
            </div>
          </div>

          {/* LIVE DEMO / GITHUB */}
          <div className="flex flex-wrap sm:flex-row justify-center sm:justify-start items-center gap-4 mt-4">
            <Link
              href={blog.livedemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="See Live Demo"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-green-700 px-7 py-3 text-base font-bold tracking-wide shadow-lg hover:scale-105 active:scale-95 transition group border-2 border-transparent hover:text-white hover:bg-gradient-to-l hover:from-green-500 hover:to-green-800 text-black"
            >
              <span className="">🚀</span>
              Live Demo
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={blog.gitlink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              className="inline-flex items-center gap-2 rounded-full border-2 border-green-500 bg-black px-7 py-3 font-bold text-white shadow-md hover:scale-105 hover:bg-green-500/10 hover:text-green-300 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Code
            </Link>
          </div>

          {/* OPTIONAL SECONDARY PARAGRAPH */}
          {blog.paragraph2 && (
            <div className="bg-primary/15 rounded-xl p-6 sm:p-8 text-center italic text-body-color shadow border-t border-b border-mygreen/10 max-w-2xl mx-auto mt-2">
              <svg className="mx-auto mb-3 w-7 h-7 text-green-400 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m6-4v12m6-6H6" />
              </svg>
              {blog.paragraph2}
            </div>
          )}

          {/* TAG BUTTONS & SHARE */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-7 pt-4 border-t border-mygreen/20">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4">
              <TagButton href="https://github.com/mehmedmuric" text="Github Profile" />
              <TagButton href="/contact" text="Contact Me" />
              <TagButton href="/about" text="About Me" />
            </div>
            <div className="flex justify-center sm:justify-end">
              <SharePost />
            </div>
          </div>
        </div>
        {/* SCROLL DOWN INDICATOR (for style/continuity with home) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center group pointer-events-none" style={{ opacity: 1 }}>
          <span className="text-xs text-green-400/60 mb-2 tracking-wider font-semibold group-animate-bounce">
            Scroll for More
          </span>
          <svg className="w-5 h-5 text-green-400/60 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
        </div>
      </div>
    </Fragment>
  );
}
