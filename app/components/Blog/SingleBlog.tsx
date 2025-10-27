import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  return (
    <>
      <div
        className="wow fadeInUp max-w-[365px] group relative overflow-hidden rounded-3xl shadow-lg ring-0 ring-green-500 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:ring-2 bg-gray-950/60 opacity-90 border border-mygreen/80"
        data-wow-delay=".1s"
      >
        <Link
          href={`/blog-details/${blog.id}`}
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-mygreen px-4 py-2 text-sm font-semibold capitalize text-white">
            {tags[0]}
          </span>
          <Image 
            src={image} 
            alt="image" 
            width={370}
            height={220}
            sizes="(max-width: 640px) 100vw,  
                  (max-width: 1024px) 80vw,  
                  (max-width: 1280px) 70vw,  
                  50vw"     
            priority               

          />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3 className="line-clamp-1"> 
            <Link
              href={`/blog-details/${blog.id}`}
              className="mb-4 block text-xl font-bold hover:text-mygreen text-white sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b pb-7 text-base font-medium text-body-color border-mygreen border-opacity-75 line-clamp-2">
            {paragraph}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r pr-5 border-mygreen border-opacity-75 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={author.image} alt="author" fill  className="object-cover" sizes="(max-width: 640px) 100vw,  
                  (max-width: 1024px) 80vw,  
                  (max-width: 1280px) 70vw,  
                  50vw"/>
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-white">
                  {author.name}
                </h4>
                <p className="text-xs text-body-color-dark">{author.designation}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">{publishDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
