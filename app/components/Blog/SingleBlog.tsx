'use client'

import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { calculateReadingTime } from "@/lib/utils";

// Helper to safely get first tag
const getFirstTag = (tags: string | string[] | undefined): string => {
  if (!tags) return 'Project';
  if (Array.isArray(tags)) return tags[0] || 'Project';
  const tagArray = tags.split(/[,\s-]+/).filter(Boolean);
  return tagArray[0] || 'Project';
};

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  const [isHovered, setIsHovered] = useState(false);
  const readingTime = calculateReadingTime(paragraph);

  return (
    <div
      className="wow fadeInUp max-w-[365px] group relative overflow-hidden rounded-3xl 
      shadow-lg transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,255,128,0.5)] 
      bg-gradient-to-br from-gray-950/80 via-gray-950/70 to-gray-950/80 
      border border-mygreen/40 hover:border-mygreen/70"
      data-wow-delay=".1s"
      data-animate="fade-in-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-green-500/20 rounded-tl-3xl group-hover:border-green-500/60 transition-colors duration-500 z-20">
        <div className={`absolute top-0 left-0 w-full h-full bg-green-500/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500/20 rounded-br-3xl group-hover:border-green-500/60 transition-colors duration-500 z-20">
        <div className={`absolute bottom-0 right-0 w-full h-full bg-green-500/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-green-500/0 group-hover:bg-green-500/5 blur-xl transition-all duration-500 -z-10" />

      <Link
        href={`/blog-details/${blog.id}`}
        className="relative block aspect-[37/22] w-full overflow-hidden"
      >
        {/* Image overlay on hover */}
        <div className={`absolute inset-0 bg-green-500/10 transition-opacity duration-500 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full 
          bg-mygreen px-4 py-2 text-sm font-semibold capitalize text-white
          shadow-[0_0_15px_rgba(0,255,128,0.4)] group-hover:shadow-[0_0_25px_rgba(0,255,128,0.6)]
          transition-all duration-300 group-hover:scale-110">
          {getFirstTag(tags)}
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
          className="transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8 relative z-10">
        <h3 className="line-clamp-1"> 
          <Link
            href={`/blog-details/${blog.id}`}
            className="mb-4 block text-xl font-bold hover:text-mygreen text-white sm:text-2xl transition-colors duration-300 relative inline-block"
          >
            <span className="relative">
              {title}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}
              />
            </span>
          </Link>
        </h3>
        <p className="mb-6 border-b pb-7 text-base font-medium text-body-color border-mygreen border-opacity-75 line-clamp-2 group-hover:text-gray-300 transition-colors">
          {paragraph}
        </p>
        <div className="flex items-center">
          <div className="mr-5 flex items-center border-r pr-5 border-mygreen border-opacity-75 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="mr-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-green-500/30 group-hover:ring-green-500/60 transition-all duration-300">
                <Image 
                  src={author.image} 
                  alt="author" 
                  fill  
                  className="object-cover transition-transform duration-300 group-hover:scale-110" 
                  sizes="(max-width: 640px) 100vw,  
                  (max-width: 1024px) 80vw,  
                  (max-width: 1280px) 70vw,  
                  50vw"
                />
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-1 text-sm font-medium text-white group-hover:text-green-400 transition-colors">
                {author.name}
              </h4>
              <p className="text-xs text-body-color-dark group-hover:text-gray-400 transition-colors">{author.designation}</p>
            </div>
          </div>
          <div className="inline-block">
            <h4 className="mb-1 text-sm font-medium text-white group-hover:text-green-400 transition-colors">
              {publishDate}
            </h4>
            <p className="text-xs text-body-color group-hover:text-gray-400 transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} min read
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
