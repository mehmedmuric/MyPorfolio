import Image from "next/image";
import Link from "next/link";
import SharePost from "../../components/Blog/SharePost";
import TagButton from "../../components/Blog/TagButton";
import { Metadata } from "next";
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

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data/projects.json`, { cache: "no-store" });
  const blogs: Blog[] = await res.json();

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return { title: "Blog Not Found", description: "This blog does not exist" };
  }

  return {
    title: `${blog.title} | My Portfolio Blog`,
    description: blog.paragraph.slice(0, 150),
  };
}

const BlogDetailsPage = async ({ params }: { params: { id: string } }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data/projects.json`, { cache: "no-store" });
  const blogs: Blog[] = await res.json();

  const blog = blogs.find((b) => b.id === Number(params.id));

  if (!blog) return <div className="text-white p-10 text-center">Project not found</div>;

  return (
      <>
      <Breadcrumb
          pageName={blog.title}
          description="Project Details"
        />
      <section className="pb-[100px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">

          {/* AUTHOR & META */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 border-b border-mygreen border-opacity-50 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src={blog.author.image} alt="author" fill className="object-cover" sizes="(max-width: 640px) 100vw,  
                    (max-width: 1024px) 80vw,  
                    (max-width: 1280px) 70vw,  
                    50vw"  />
                </div>
                <span className="text-sm sm:text-base text-body-color">By {blog.author.name}</span>
              </div>
              <span className="text-sm sm:text-base text-body-color">{blog.publishDate}</span>
            </div>
            <span className="inline-flex items-center justify-center rounded-full bg-mygreen px-3 py-2 text-sm font-semibold text-white">
              {blog.tags}
            </span>
          </div>

          {/* PARAGRAPH */}
          <p className="text-center sm:text-left text-base sm:text-lg leading-relaxed text-body-color">
            {blog.paragraph}
          </p>

          {/* IMAGE */}
          <div className="w-full rounded-lg overflow-hidden border border-mygreen">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={blog.image}
                alt="project image"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
              />
            </div>
          </div>

          {/* LINKS */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href={blog.livedemo}
              target="_blank"
              className="rounded-lg bg-mygreen px-6 py-3 text-base font-semibold text-white border border-mygreen hover:bg-transparent hover:text-mygreen transition-colors duration-300"
            >
              Live Demo
            </Link>
            <Link
              href={blog.gitlink}
              target="_blank"
              className="rounded-lg bg-black px-6 py-3 text-base font-semibold text-white border border-mygreen hover:bg-transparent hover:text-mygreen transition-colors duration-300"
            >
              GitHub Code
            </Link>
          </div>

          {/* PARAGRAPH2 */}
          {blog.paragraph2 && (
            <div className="bg-primary bg-opacity-10 rounded-lg p-6 sm:p-8 text-center italic text-body-color">
              {blog.paragraph2}
            </div>
          )}

          {/* TAGS & SOCIAL */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <TagButton href="https://github.com/mehmedmuric" text="Github Profile" />
              <TagButton href="/contact" text="Contact Me" />
              <TagButton href="/about" text="About Me" />
            </div>
            <div className="flex justify-center sm:justify-end">
              <SharePost />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;
