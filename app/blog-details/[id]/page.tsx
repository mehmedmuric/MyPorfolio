import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import SharePost from "../../components/Blog/SharePost";
import TagButton from "../../components/Blog/TagButton";
import ReadingProgress from "../../components/Blog/ReadingProgress";
import BlogBackgroundEffects from "../../components/Blog/BlogBackgroundEffects";
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
  tags: string | string[];
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
  try {
    const res = await fetch(`${baseUrl}/data/projects.json`, { 
      next: { revalidate: 3600 } 
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) throw new Error("Invalid content type");
    const blogs: Blog[] = await res.json();
    const blog = blogs.find((b) => b.id === blogId);
    if (!blog) {
      return { title: "Blog Not Found", description: "This blog does not exist" };
    }
    const canonicalUrl = `${baseUrl}/blog-details/${blogId}`;
    return {
      title: `${blog.title} | My Portfolio Blog`,
      description: blog.paragraph.slice(0, 150),
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${blog.title} | My Portfolio Blog`,
        description: blog.paragraph.slice(0, 150),
        url: canonicalUrl,
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
        images: [blog.image],
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching blog metadata:", error);
    }
    return { title: "Blog | My Portfolio", description: "Explore my latest blog posts" };
  }
}

// Tags Display Component - Modern Design
function TagsDisplay({ tags }: { tags: string | string[] }) {
  if (!tags) return null;
  
  let tagList: string[] = [];
  
  // Handle both string and array formats
  if (Array.isArray(tags)) {
    tagList = tags;
  } else if (typeof tags === "string") {
    if (tags.includes(",")) {
      tagList = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    } else {
      tagList = tags.split(" ").map(tag => tag.trim()).filter(Boolean);
    }
  }
  
  // Clean up tags: remove leading dashes and spaces
  tagList = tagList.map(tag => tag.replace(/^[\s-]+/, "").trim()).filter(Boolean);
  
  if (tagList.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
      {tagList.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="group relative inline-flex items-center justify-center min-h-[36px] sm:min-h-[40px] 
            px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm 
            bg-gradient-to-br from-[#0a0a0a]/95 via-[#050805]/95 to-[#0a0a0a]/95 
            backdrop-blur-md border border-[#00ff41]/40 
            text-xs sm:text-sm font-mono font-semibold 
            text-[#00ff41] 
            shadow-[0_0_12px_rgba(0,255,65,0.25)] 
            hover:border-[#00ff41] 
            hover:shadow-[0_0_24px_rgba(0,255,65,0.6),0_0_48px_rgba(0,255,65,0.3)] 
            hover:bg-gradient-to-br hover:from-[#00ff41]/15 hover:via-[#050805] hover:to-[#00ff41]/10
            hover:scale-105
            active:scale-100
            transition-all duration-300 ease-out
            will-change-transform
            cursor-default
            whitespace-nowrap
            overflow-hidden"
          style={{ color: '#00ff41' }}
        >
          {/* Glow effect on hover */}
          <span className="absolute inset-0 bg-[#00ff41]/0 group-hover:bg-[#00ff41]/5 
            transition-colors duration-300 blur-xl"></span>
          <span className="relative z-10">{tag}</span>
        </span>
      ))}
    </div>
  );
}

// Modern Cyberpunk Terminal Container with Glassmorphism
function TerminalContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group relative ${className}`}>
      {/* Corner Brackets with enhanced glow */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00ff41]/60 
        shadow-[0_0_8px_rgba(0,255,65,0.4)] group-hover:border-[#00ff41] 
        group-hover:shadow-[0_0_12px_rgba(0,255,65,0.6)] transition-all duration-300" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#00ff41]/60 
        shadow-[0_0_8px_rgba(0,255,65,0.4)] group-hover:border-[#00ff41] 
        group-hover:shadow-[0_0_12px_rgba(0,255,65,0.6)] transition-all duration-300" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#00ff41]/60 
        shadow-[0_0_8px_rgba(0,255,65,0.4)] group-hover:border-[#00ff41] 
        group-hover:shadow-[0_0_12px_rgba(0,255,65,0.6)] transition-all duration-300" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00ff41]/60 
        shadow-[0_0_8px_rgba(0,255,65,0.4)] group-hover:border-[#00ff41] 
        group-hover:shadow-[0_0_12px_rgba(0,255,65,0.6)] transition-all duration-300" />
      
      {/* Animated Glow Border */}
      <div className="absolute inset-0 rounded-sm border border-[#00ff41]/40 
        shadow-[0_0_24px_rgba(0,255,65,0.25),inset_0_0_24px_rgba(0,255,65,0.08)] 
        group-hover:border-[#00ff41]/60 group-hover:shadow-[0_0_32px_rgba(0,255,65,0.4),inset_0_0_32px_rgba(0,255,65,0.12)]
        pointer-events-none transition-all duration-500" />
      
      {/* Background gradient with glassmorphism */}
      <div className="relative bg-gradient-to-br from-[#0a0a0a]/80 via-[#050805]/85 to-[#0a0a0a]/80 
        backdrop-blur-md rounded-sm p-4 sm:p-6 lg:p-8
        before:absolute before:inset-0 before:rounded-sm 
        before:bg-gradient-to-br before:from-[#00ff41]/5 before:via-transparent before:to-transparent
        before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500
        overflow-hidden">
        {/* Subtle scan line effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r 
            from-transparent via-[#00ff41]/40 to-transparent 
            animate-[blogScanLine_3s_linear_infinite]"></div>
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

// Modern HUD Panel Component with Glassmorphism
function HUDPanel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <aside className={`group relative bg-gradient-to-br from-[#0a0a0a]/90 via-[#050805]/85 to-[#0a0a0a]/90 
      backdrop-blur-lg border border-[#00ff41]/30 
      rounded-sm p-4 sm:p-5 lg:p-6 
      shadow-[0_0_20px_rgba(0,255,65,0.15),inset_0_0_20px_rgba(0,255,65,0.05)] 
      hover:border-[#00ff41]/50 hover:shadow-[0_0_30px_rgba(0,255,65,0.3),inset_0_0_30px_rgba(0,255,65,0.1)]
      transition-all duration-500 overflow-hidden ${className}`}>
      
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/3 via-transparent to-[#00ff41]/3 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Corner accent lines */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#00ff41]/10 
        group-hover:border-[#00ff41]/30 transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#00ff41]/10 
        group-hover:border-[#00ff41]/30 transition-colors duration-500"></div>
      
      <div className="relative z-10">
        <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#00ff41] mb-4 
          border-b border-[#00ff41]/20 pb-2.5 
          group-hover:text-[#00ff41] group-hover:border-[#00ff41]/40
          transition-all duration-300
          flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-[#00ff41] rounded-full 
            shadow-[0_0_8px_rgba(0,255,65,0.6)] 
            group-hover:shadow-[0_0_12px_rgba(0,255,65,0.8)] 
            group-hover:scale-125 transition-all duration-300"></span>
          <span>[{title}]</span>
        </h3>
        {children}
      </div>
    </aside>
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
  try {
    const res = await fetch(`${baseUrl}/data/projects.json`, { 
      next: { revalidate: 3600 } 
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("Invalid response content type");
    }
    const blogs: Blog[] = await res.json();
    const blog = blogs.find((b) => b.id === blogId);
    if (!blog) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#050805] to-[#0a0a0a]">
          <div className="text-[#00ff41] p-10 text-center text-xl md:text-2xl font-mono">
            🚫 Project not found
          </div>
        </div>
      );
    }

    const baseUrlForSchema = process.env.NEXT_PUBLIC_SITE_URL || "https://mehmedmuric.com";
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.paragraph.slice(0, 150),
      "author": {
        "@type": "Person",
        "name": blog.author.name,
        "image": blog.author.image
      },
      "datePublished": blog.publishDate,
      "image": blog.image.startsWith("http") ? blog.image : `${baseUrlForSchema}${blog.image}`,
      "url": `${baseUrlForSchema}/blog-details/${blogId}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrlForSchema}/blog-details/${blogId}`
      }
    };

    return (
      <Fragment>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
        
        {/* Main Content Section */}
        <section className="relative min-h-screen bg-[#000000] bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#050a08] 
          overflow-hidden py-8 sm:py-12 lg:py-16 pt-24 sm:pt-28 lg:pt-32 mt-12 sm:mt-24 lg:mt-28">
          
          {/* Background Effects */}
          <BlogBackgroundEffects />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              
              {/* Main Content Column */}
              <article className="lg:col-span-8 space-y-6 sm:space-y-8">
                
                {/* Title Section - Enhanced */}
                <div className="space-y-5 sm:space-y-7">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black 
                    text-[#00ff41] leading-[1.1] font-mono tracking-tight
                    drop-shadow-[0_0_20px_rgba(0,255,65,0.5),0_0_40px_rgba(0,255,65,0.3)]
                    group-hover:drop-shadow-[0_0_30px_rgba(0,255,65,0.7),0_0_60px_rgba(0,255,65,0.4)]
                    transition-all duration-500">
                    {blog.title}
                  </h1>
                  
                  {/* Author & Date Info - Enhanced */}
                  <div className="flex flex-wrap items-center gap-5 sm:gap-6 pb-2">
                    <div className="flex items-center gap-4 sm:gap-5 group/author">
                      <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden 
                        border-2 border-[#00ff41]/60 shadow-[0_0_20px_rgba(0,255,65,0.4)]
                        group-hover/author:border-[#00ff41] group-hover/author:shadow-[0_0_30px_rgba(0,255,65,0.6)]
                        transition-all duration-300 ring-2 ring-[#00ff41]/20 group-hover/author:ring-[#00ff41]/40">
                        <Image
                          src={blog.author.image}
                          alt={`Author: ${blog.author.name}`}
                          fill
                          className="object-cover group-hover/author:scale-110 transition-transform duration-300"
                          sizes="64px"
                          priority
                        />
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-[#00ff41]/0 group-hover/author:bg-[#00ff41]/10 
                          transition-colors duration-300"></div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm sm:text-base font-mono text-[#00ff41]/90 
                          group-hover/author:text-[#00ff41] transition-colors duration-300">
                          By <strong className="text-[#00ff41] font-bold">{blog.author.name}</strong>
                        </span>
                        <span className="text-xs sm:text-sm font-mono text-[#788293] 
                          group-hover/author:text-[#9ca3af] transition-colors duration-300" 
                          suppressHydrationWarning>
                          {blog.publishDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Section: Featured Image - Enhanced */}
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden 
                  rounded-sm border-2 border-[#00ff41]/40 
                  shadow-[0_0_40px_rgba(0,255,65,0.2),inset_0_0_40px_rgba(0,255,65,0.05)]
                  group will-change-transform
                  hover:border-[#00ff41]/60 hover:shadow-[0_0_60px_rgba(0,255,65,0.4),inset_0_0_60px_rgba(0,255,65,0.1)]
                  transition-all duration-500">
                  
                  {/* Corner brackets */}
                  <div className="absolute -top-1 -left-1 z-10 w-6 h-6 border-t-2 border-l-2 border-[#00ff41]/50 
                    shadow-[0_0_10px_rgba(0,255,65,0.4)] group-hover:border-[#00ff41] 
                    group-hover:shadow-[0_0_15px_rgba(0,255,65,0.6)] transition-all duration-300"></div>
                  <div className="absolute -top-1 -right-1 z-10 w-6 h-6 border-t-2 border-r-2 border-[#00ff41]/50 
                    shadow-[0_0_10px_rgba(0,255,65,0.4)] group-hover:border-[#00ff41] 
                    group-hover:shadow-[0_0_15px_rgba(0,255,65,0.6)] transition-all duration-300"></div>
                  <div className="absolute -bottom-1 -left-1 z-10 w-6 h-6 border-b-2 border-l-2 border-[#00ff41]/50 
                    shadow-[0_0_10px_rgba(0,255,65,0.4)] group-hover:border-[#00ff41] 
                    group-hover:shadow-[0_0_15px_rgba(0,255,65,0.6)] transition-all duration-300"></div>
                  <div className="absolute -bottom-1 -right-1 z-10 w-6 h-6 border-b-2 border-r-2 border-[#00ff41]/50 
                    shadow-[0_0_10px_rgba(0,255,65,0.4)] group-hover:border-[#00ff41] 
                    group-hover:shadow-[0_0_15px_rgba(0,255,65,0.6)] transition-all duration-300"></div>
                  
                  <Image
                    src={blog.image}
                    alt={`Featured image for ${blog.title}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
                    priority
                    quality={90}
                  />
                  
                  {/* Enhanced gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 
                    opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/0 via-transparent to-[#00ff41]/0 
                    opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {/* Scan line effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r 
                      from-transparent via-[#00ff41]/60 to-transparent 
                      animate-[blogScanLine_2s_linear_infinite]"></div>
                  </div>
                </div>

                {/* Main Article Content - Enhanced Cyberpunk Terminal */}
                <TerminalContainer className="mt-8 sm:mt-10">
                  <div className="prose prose-invert prose-lg max-w-none 
                    prose-headings:text-[#00ff41] prose-headings:font-mono prose-headings:font-bold
                    prose-headings:drop-shadow-[0_0_10px_rgba(0,255,65,0.4)]
                    prose-p:text-[#e0e0e0] prose-p:leading-relaxed prose-p:text-base sm:text-lg lg:text-xl
                    prose-p:mb-6 sm:prose-p:mb-7
                    prose-a:text-[#00ff41] prose-a:no-underline 
                    hover:prose-a:underline hover:prose-a:text-[#00ff41]
                    prose-a:transition-all prose-a:duration-300
                    prose-strong:text-[#00ff41] prose-strong:font-bold prose-strong:drop-shadow-[0_0_6px_rgba(0,255,65,0.4)]
                    prose-code:text-[#00ff41] prose-code:bg-[#050805]/90 prose-code:backdrop-blur-sm
                    prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm sm:prose-code:text-base
                    prose-code:border prose-code:border-[#00ff41]/30 prose-code:shadow-[0_0_8px_rgba(0,255,65,0.2)]
                    prose-blockquote:border-l-[#00ff41] prose-blockquote:border-l-4 prose-blockquote:text-[#b0b0b0]
                    prose-blockquote:bg-[#050805]/50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-sm
                    prose-ul:text-[#e0e0e0] prose-ol:text-[#e0e0e0] prose-ul:space-y-2 prose-ol:space-y-2
                    prose-li:marker:text-[#00ff41] prose-li:marker:font-bold">
                    <p className="text-center sm:text-left text-base sm:text-lg lg:text-xl leading-relaxed 
                      text-[#e0e0e0] max-w-[70ch] mx-auto sm:mx-0
                      tracking-wide sm:tracking-normal">
                      {blog.paragraph}
                    </p>
                  </div>
                </TerminalContainer>

                {/* Action Buttons: Live Demo & GitHub - Enhanced */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-5 mt-8 sm:mt-10">
                  <Link
                    href={blog.livedemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="See Live Demo"
                    className="group relative inline-flex items-center justify-center min-h-[48px] gap-2.5 
                      px-7 sm:px-9 py-3.5 rounded-sm 
                      bg-gradient-to-r from-[#00ff41] via-[#00ee3a] to-[#00cc33] 
                      text-black font-bold text-sm sm:text-base tracking-wide 
                      shadow-[0_0_24px_rgba(0,255,65,0.5),inset_0_0_24px_rgba(255,255,255,0.1)] 
                      hover:shadow-[0_0_40px_rgba(0,255,65,0.8),inset_0_0_40px_rgba(255,255,255,0.15)]
                      hover:scale-110 active:scale-105 
                      transition-all duration-300 ease-out
                      border-2 border-transparent hover:border-white/30
                      will-change-transform overflow-hidden
                      before:absolute before:inset-0 before:bg-gradient-to-r 
                      before:from-transparent before:via-white/20 before:to-transparent
                      before:translate-x-[-100%] hover:before:translate-x-[100%]
                      before:transition-transform before:duration-700"
                  >
                    <span className="relative z-10 text-lg">🚀</span>
                    <span className="relative z-10">Live Demo</span>
                    <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 
                      transition-transform duration-300" 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  
                  <Link
                    href={blog.gitlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on GitHub"
                    className="group relative inline-flex items-center justify-center min-h-[48px] gap-2.5 
                      px-7 sm:px-9 py-3.5 rounded-sm 
                      border-2 border-[#00ff41]/50 
                      bg-gradient-to-br from-[#0a0a0a]/90 via-[#050805]/90 to-[#0a0a0a]/90 
                      backdrop-blur-md
                      text-[#00ff41] font-bold text-sm sm:text-base 
                      shadow-[0_0_20px_rgba(0,255,65,0.25),inset_0_0_20px_rgba(0,255,65,0.05)] 
                      hover:border-[#00ff41] 
                      hover:bg-gradient-to-br hover:from-[#00ff41]/15 hover:via-[#050805] hover:to-[#00ff41]/10
                      hover:shadow-[0_0_35px_rgba(0,255,65,0.5),inset_0_0_35px_rgba(0,255,65,0.15)]
                      hover:scale-110 active:scale-105 
                      transition-all duration-300 ease-out 
                      will-change-transform overflow-hidden
                      before:absolute before:inset-0 before:bg-gradient-to-r 
                      before:from-transparent before:via-[#00ff41]/10 before:to-transparent
                      before:translate-x-[-100%] hover:before:translate-x-[100%]
                      before:transition-transform before:duration-700"
                  >
                    <svg className="w-5 h-5 relative z-10 group-hover:rotate-12 
                      transition-transform duration-300" 
                      fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="relative z-10">GitHub Code</span>
                  </Link>
                </div>

                {/* Optional Secondary Paragraph - Enhanced */}
                {blog.paragraph2 && (
                  <TerminalContainer className="mt-8 sm:mt-10">
                    <div className="relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10
                        bg-gradient-to-br from-[#0a0a0a] via-[#050805] to-[#0a0a0a]
                        p-2 rounded-full border border-[#00ff41]/30 
                        shadow-[0_0_15px_rgba(0,255,65,0.3)]">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#00ff41]/70 
                          drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]" 
                          fill="none" stroke="currentColor" 
                          strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" 
                            d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m6-4v12m6-6H6" />
                        </svg>
                      </div>
                      <p className="text-center sm:text-left text-base sm:text-lg lg:text-xl 
                        leading-relaxed text-[#b0b0b0] italic max-w-[70ch] mx-auto sm:mx-0 pt-6
                        tracking-wide sm:tracking-normal">
                        &ldquo;{blog.paragraph2}&rdquo;
                      </p>
                    </div>
                  </TerminalContainer>
                )}

                {/* Tags & Share Section - Enhanced */}
                <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center 
                  gap-6 sm:gap-8 pt-8 sm:pt-10 
                  border-t-2 border-[#00ff41]/20 
                  before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 
                  before:w-24 before:h-0.5 before:bg-gradient-to-r 
                  before:from-transparent before:via-[#00ff41]/60 before:to-transparent
                  before:shadow-[0_0_15px_rgba(0,255,65,0.6)]
                  mt-8 sm:mt-10">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
                    <TagButton href="https://github.com/mehmedmuric" text="Github Profile" />
                    <TagButton href="/contact" text="Contact Me" />
                    <TagButton href="/about" text="About Me" />
                  </div>
                  <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                    <SharePost />
                  </div>
                </div>
              </article>

              {/* Sidebar - HUD Panels (Desktop) - Enhanced */}
              <aside className="lg:col-span-4 space-y-6 sm:space-y-7 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] 
                lg:overflow-y-auto lg:overflow-x-hidden 
                scrollbar-thin scrollbar-thumb-[#00ff41]/30 scrollbar-track-transparent
                hover:scrollbar-thumb-[#00ff41]/50">
                
                {/* Tags HUD Panel */}
                <HUDPanel title="TAGS">
                  <TagsDisplay tags={blog.tags} />
                </HUDPanel>

                {/* Author HUD Panel - Enhanced */}
                <HUDPanel title="AUTHOR">
                  <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start 
                    lg:items-center gap-5 group/author">
                    <div className="relative h-20 w-20 sm:h-28 sm:w-28 rounded-full overflow-hidden 
                      border-2 border-[#00ff41]/60 shadow-[0_0_20px_rgba(0,255,65,0.4)] flex-shrink-0
                      group-hover/author:border-[#00ff41] group-hover/author:shadow-[0_0_30px_rgba(0,255,65,0.6)]
                      transition-all duration-300 ring-2 ring-[#00ff41]/20 group-hover/author:ring-[#00ff41]/40">
                      <Image
                        src={blog.author.image}
                        alt={`Author: ${blog.author.name}`}
                        fill
                        className="object-cover group-hover/author:scale-110 transition-transform duration-300"
                        sizes="112px"
                        loading="lazy"
                      />
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-[#00ff41]/0 group-hover/author:bg-[#00ff41]/10 
                        transition-colors duration-300 rounded-full"></div>
                    </div>
                    <div className="text-center sm:text-left lg:text-center space-y-1.5">
                      <h4 className="text-base sm:text-lg font-mono font-bold text-[#00ff41] 
                        group-hover/author:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]
                        transition-all duration-300">
                        {blog.author.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#788293] font-mono 
                        group-hover/author:text-[#9ca3af] transition-colors duration-300">
                        FullStack Developer
                      </p>
                      {/* Status indicator */}
                      <div className="flex items-center justify-center sm:justify-start lg:justify-center gap-2 pt-1">
                        <span className="inline-block w-2 h-2 bg-[#00ff41] rounded-full 
                          shadow-[0_0_8px_rgba(0,255,65,0.6)] 
                          group-hover/author:shadow-[0_0_12px_rgba(0,255,65,0.8)]
                          animate-pulse"></span>
                        <span className="text-[10px] sm:text-xs font-mono text-[#788293] 
                          group-hover/author:text-[#9ca3af] transition-colors duration-300">
                          Available
                        </span>
                      </div>
                    </div>
                  </div>
                </HUDPanel>
              </aside>
            </div>
          </div>
        </section>
      </Fragment>
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error loading blog:", error);
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#050805] to-[#0a0a0a]">
        <div className="text-[#00ff41] p-10 text-center text-xl md:text-2xl font-mono">
          🚫 Error loading project
        </div>
      </div>
    );
  }
}
