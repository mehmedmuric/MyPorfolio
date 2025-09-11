import SharePost from "../../components/Blog/SharePost";
import TagButton from "../../components/Blog/TagButton";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog Details Page | Free Next.js Template for Startup and SaaS",
  description: "This is Blog Details Page for Startup Nextjs Template",
};

const BlogDetailsPage = async ({ params }: { params: { id: string } }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data/projects.json`, { cache: "no-store" });
  const blogs = await res.json();

  const blog = blogs.find((b: any) => b.id === Number(params.id));

  if (!blog) return <div className="text-white p-10">Project not found</div>;

  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <h2 className="mb-8 text-3xl sm:text-4xl font-bold leading-tight text-white">
              {blog.title}
            </h2>

            <div className="mb-10 flex flex-wrap items-center justify-between border-b border-mygreen border-opacity-75 pb-4">
              <div className="flex flex-wrap items-center">
                <div className="mb-5 mr-10 flex items-center">
                  <div className="mr-4 relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={blog.author.image}
                      alt="author"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <span className="text-base font-medium text-body-color">
                    By <span>{blog.author.name}</span>
                  </span>
                </div>

                <div className="mb-5 flex items-center">
                  <p className="flex items-center text-base font-medium text-body-color mr-5">
                    <span className="mr-3">
                      {/* SVG ikona */}
                    </span>
                    {blog.publishDate}
                  </p>
                </div>
              </div>

              <a
                href="#0"
                className="inline-flex items-center justify-center rounded-full bg-mygreen px-4 py-2 text-sm font-semibold text-white"
              >
                {blog.tags}
              </a>
            </div>

            <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg xl:text-lg">
              {blog.paragraph}
            </p>

            <div className="mb-10 w-full overflow-hidden rounded-lg border border-mygreen">
              <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                <Image
                  src={blog.image}
                  alt="image"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                />
              </div>
            </div>

            <div className="mb-10 flex justify-center items-center">
              <Link
                href={blog.livedemo}
                target="_blank"
                className="mr-4 rounded-lg bg-mygreen px-8 py-4 text-base font-semibold text-white border border-mygreen hover:bg-transparent hover:text-mygreen duration-300"
              >
                Live Demo
              </Link>
              <Link
                href={blog.gitlink}
                target="_blank"
                className="rounded-lg bg-black px-12 py-4 text-base font-semibold text-white border border-mygreen hover:bg-transparent duration-300"
              >
                GitHub Code
              </Link>
            </div>

            <div className="relative z-10 mb-10 mt-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9">
              <p className="text-center text-base font-medium italic text-body-color">
                {blog.paragraph2}
              </p>
              <span className="absolute left-0 top-0 z-[-1]">
                {/* SVG dekoracija */}
              </span>
              <span className="absolute bottom-0 right-0 z-[-1]">
                {/* SVG dekoracija */}
              </span>
            </div>

            <div className="sm:flex items-center justify-between">
              <div className="mb-5">
                <h4 className="mb-3 text-sm font-medium text-body-color">View:</h4>
                <div className="flex items-center">
                  <TagButton href="https://github.com/mehmedmuric" text="Github Profile" />
                  <TagButton href="/contact" text="Contact Me" />
                  <TagButton href="/about" text="About Me" />
                </div>
              </div>

              <div className="mb-5">
                <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">Social Network</h5>
                <div className="flex items-center sm:justify-end">
                  <SharePost />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
