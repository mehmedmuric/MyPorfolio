import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import SharePost from "../../components/Blog/SharePost";
import TagButton from "../../components/Blog/TagButton";
import Breadcrumb from "@/app/components/Common/Breadcrumb";

interface BlogAuthor {
  name: string;
  image: string;
}

interface Blog {
  id: number;
  title: string;
  paragraph: string;
  paragraph2?: string;
  author: BlogAuthor;
  publishDate: string;
  tags: string;
  image: string;
  livedemo: string;
  gitlink: string;
}

// ✅ Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blogId = Number(resolvedParams.id);
  if (isNaN(blogId)) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data/projects.json`, { cache: "no-store" });
  const blogs: Blog[] = await res.json();

  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return { title: "Blog Not Found", description: "This blog does not exist" };
  }

  return {
    title: `${blog.title} | My Portfolio Blog`,
    description: blog.paragraph.slice(0, 150),
    openGraph: {
      title: `${blog.title} | My Portfolio Blog`,
      description: blog.paragraph.slice(0, 150),
      images: [
        {
          url: blog.image,
          alt: blog.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | My Portfolio Blog`,
      description: blog.paragraph.slice(0, 150),
      images: [blog.image]
    }
  };
}

// Improved tag splitter, safer for empty/comma/mixed edge cases
function TagsDisplay({ tags }: { tags: string }) {
  // safely handle possible undefined/null/empty
  if (!tags || typeof tags !== "string") return null;
  // Split by either "," or " " (accounts for both possible separators), flatten, filter empty
  // Also support both comma and space separated values (e.g. "tag1, tag2 tag3")
  let tagList: string[] = [];
  if (tags.includes(",")) {
    tagList = tags.split(",").map(tag => tag.trim()).filter(Boolean);
  } else {
    tagList = tags.split(" ").map(tag => tag.trim()).filter(Boolean);
  }
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

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const blogId = Number(resolvedParams.id);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data/projects.json`, { cache: "no-store" });
  const blogs: Blog[] = await res.json();

  const blog = blogs.find((b) => b.id === blogId);

  if (!blog)
    return <div className="text-white p-10 text-center text-xl md:text-2xl">🚫 Project not found</div>;

  return (
    <Fragment>
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
                <span className="text-xs sm:text-sm text-body-color/70">{blog.publishDate}</span>
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
    </Fragment>
  );
}
