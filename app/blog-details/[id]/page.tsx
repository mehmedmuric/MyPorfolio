import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowLeft, ArrowRight, Calendar, User, ExternalLink, Github, ChevronRight } from "lucide-react";

import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import ParticlesBackground from "@/components/Common/ParticlesBackground";

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

// Modern Tag Pill Component
function TagsDisplay({ tags }: { tags: string | string[] }) {
  if (!tags) return null;

  let tagList: string[] = [];

  // Handle both string and array formats
  if (Array.isArray(tags)) {
    tagList = tags;
  } else if (typeof tags === "string") {
    tagList = tags.split(/[,\s]+/).map(tag => tag.trim()).filter(Boolean);
  }

  // Clean up tags
  tagList = tagList.map(tag => tag.replace(/^[\s-]+/, "").trim()).filter(Boolean);

  if (tagList.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {tagList.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full
            bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md
            text-xs font-semibold text-emerald-400 tracking-wide uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]
            hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:-translate-y-0.5
            transition-all duration-300 cursor-default"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// Clean Content Card with Soft Glassmorphism
function ContentCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-3xl overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50 pointer-events-none" />
      <div className="relative p-8 sm:p-10 lg:p-12">
        {children}
      </div>
    </div>
  );
}

// Clean Sidebar Widget
function SidebarWidget({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <aside className={`relative rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 shadow-xl overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500 ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[50px] group-hover:bg-emerald-500/10 transition-colors duration-500 pointer-events-none" />
      <h3 className="relative text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-emerald-500/30"></span>
        {title}
      </h3>
      <div className="relative z-10">
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
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="text-emerald-500 p-10 text-center text-xl font-medium">
            Project not found
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
        <section className="relative min-h-screen bg-slate-950 pt-32 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <ParticlesBackground />
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Top Navigation Bar */}
            <div className="mb-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors duration-300 group"
              >
                <div className="p-2 rounded-full bg-slate-900/50 border border-slate-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Projects
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
              {/* Main Content Column */}
              <article className="lg:col-span-8 space-y-10">
                {/* Header Section */}
                <header className="space-y-8">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 font-medium">
                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800 shadow-inner">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      {blog.publishDate}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800 shadow-inner">
                      <User className="w-4 h-4 text-emerald-500" />
                      {blog.author.name}
                    </div>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-[1.1] tracking-tight drop-shadow-sm">
                    {blog.title}
                  </h1>
                </header>

                {/* Hero Image */}
                <div className="relative w-full aspect-[21/9] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)] group">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 border border-white/10 rounded-3xl z-20 pointer-events-none" />
                  <Image
                    src={blog.image}
                    alt={`Featured image for ${blog.title}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
                    priority
                    quality={100}
                  />
                  {/* Action Buttons Float */}
                  <div className="absolute bottom-6 right-6 z-30 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {blog.livedemo && (
                      <Link href={blog.livedemo} target="_blank" className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg hover:bg-emerald-400 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    )}
                    {blog.gitlink && (
                      <Link href={blog.gitlink} target="_blank" className="p-3 bg-slate-900/90 text-white rounded-xl border border-white/10 hover:bg-slate-800 transition-colors backdrop-blur-md">
                        <Github className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Main Article Content */}
                <ContentCard>
                  <div className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-lg
                    prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300
                    prose-strong:text-white prose-strong:font-semibold
                    prose-code:text-emerald-300 prose-code:bg-emerald-500/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-emerald-500/20 prose-code:before:content-none prose-code:after:content-none
                    prose-blockquote:border-l-2 prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-300 prose-blockquote:italic
                    prose-li:marker:text-emerald-500">
                    <p className="whitespace-pre-wrap first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-500 first-letter:float-left first-letter:mr-4 first-letter:mt-1">
                      {blog.paragraph}
                    </p>
                  </div>
                </ContentCard>

                {/* Secondary Paragraph */}
                {blog.paragraph2 && (
                  <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-slate-900/50 border border-emerald-500/20 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                    <svg className="absolute -bottom-8 -right-8 w-32 h-32 text-emerald-500/10 rotate-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.0171 16H9C9.00012 13.1784 11.2353 11.0718 14.0171 11.3333V9C14.0171 4.58172 10.4354 1 6.01709 1V3C8.77851 3 11.0171 5.23858 11.0171 8V8.9551C7.62002 9.45887 5.01709 12.4171 5.01709 16C5.01709 18.7614 7.25567 21 10.0171 21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.0171 16H16C16.0001 13.1784 18.2353 11.0718 21.0171 11.3333V9C21.0171 4.58172 17.4354 1 13.0171 1V3C15.7785 3 18.0171 5.23858 18.0171 8V8.9551C14.62 9.45887 12.0171 12.4171 12.0171 16C12.0171 18.7614 14.2557 21 17.0171 21H21.017Z" />
                    </svg>
                    <p className="relative z-10 text-slate-300 text-xl leading-relaxed font-medium">
                      {blog.paragraph2}
                    </p>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-400 font-medium">Share this project</div>
                    <div className="h-px w-12 bg-white/10 hidden sm:block"></div>
                    <SharePost />
                  </div>
                </div>

                {/* Bottom Action Cards */}
                <div className="grid sm:grid-cols-2 gap-6 mt-8">
                  {blog.livedemo && (
                    <Link
                      href={blog.livedemo}
                      target="_blank"
                      className="group flex flex-col justify-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-500"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-500 text-white rounded-2xl group-hover:bg-white group-hover:text-emerald-500 transition-colors duration-500">
                          <ExternalLink className="w-6 h-6" />
                        </div>
                        <ArrowRight className="w-6 h-6 text-emerald-500 -rotate-45 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Live Demo</h3>
                      <p className="text-emerald-400 group-hover:text-emerald-100 transition-colors">See the project in action</p>
                    </Link>
                  )}
                  {blog.gitlink && (
                    <Link
                      href={blog.gitlink}
                      target="_blank"
                      className="group flex flex-col justify-center p-8 rounded-3xl bg-slate-900/40 border border-white/10 hover:bg-slate-800 hover:border-white/20 transition-all duration-500"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-slate-800 text-white border border-white/10 rounded-2xl group-hover:bg-white group-hover:text-slate-900 transition-colors duration-500">
                          <Github className="w-6 h-6" />
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Source Code</h3>
                      <p className="text-slate-400 group-hover:text-slate-300 transition-colors">Explore the repository</p>
                    </Link>
                  )}
                </div>

              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-8">
                <div className="lg:sticky lg:top-32 space-y-8">
                  {/* Author Widget Elements */}
                  <div className="relative rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/10 p-1 shadow-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-slate-950/50 rounded-[22px] p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-emerald-500/30 p-1 mb-6 group-hover:border-emerald-500 transition-colors duration-500">
                          <div className="relative h-full w-full rounded-full overflow-hidden">
                            <Image
                              src={blog.author.image}
                              alt={`Author: ${blog.author.name}`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{blog.author.name}</h4>
                        <p className="text-emerald-500 font-medium mb-4">Developer</p>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                          Passionate about building scalable web applications, crafting beautiful user experiences, and exploring new technologies.
                        </p>
                        <div className="flex gap-3 w-full">
                          <Link href="https://github.com/mehmedmuric" target="_blank" className="flex-1 py-3 px-4 bg-slate-900 border border-white/10 hover:bg-slate-800 rounded-xl text-sm font-medium text-white transition-colors flex items-center justify-center gap-2">
                            <Github className="w-4 h-4" />
                            GitHub
                          </Link>
                          <Link href="/contact" className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center">
                            Contact
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags Widget */}
                  <SidebarWidget title="Technologies Used">
                    <TagsDisplay tags={blog.tags} />
                  </SidebarWidget>
                </div>
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
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-red-400 p-10 text-center text-xl">
          Error loading project
        </div>
      </div>
    );
  }
}
