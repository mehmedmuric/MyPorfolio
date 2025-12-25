'use client'

import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group relative overflow-hidden rounded-lg border border-[#00ff41]/30 bg-[#050805] 
        shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all duration-200 hover:border-[#00ff41]/60 
        hover:shadow-[0_0_40px_rgba(0,255,65,0.3)] hover:-translate-y-1 will-change-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* HUD Corner Brackets */}
      <div className="absolute top-0 left-0 z-20">
        <div className="h-4 w-4 border-t-2 border-l-2 border-[#00ff41]/50 transition-colors duration-200 group-hover:border-[#00ff41]">
          <span className="absolute -top-1 -left-1 text-[8px] text-[#00ff41]/70 font-mono">[</span>
        </div>
      </div>
      <div className="absolute top-0 right-0 z-20">
        <div className="h-4 w-4 border-t-2 border-r-2 border-[#00ff41]/50 transition-colors duration-200 group-hover:border-[#00ff41]">
          <span className="absolute -top-1 -right-1 text-[8px] text-[#00ff41]/70 font-mono">]</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-20">
        <div className="h-4 w-4 border-b-2 border-l-2 border-[#00ff41]/50 transition-colors duration-200 group-hover:border-[#00ff41]">
          <span className="absolute -bottom-1 -left-1 text-[8px] text-[#00ff41]/70 font-mono">[</span>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 z-20">
        <div className="h-4 w-4 border-b-2 border-r-2 border-[#00ff41]/50 transition-colors duration-200 group-hover:border-[#00ff41]">
          <span className="absolute -bottom-1 -right-1 text-[8px] text-[#00ff41]/70 font-mono">]</span>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-[#00ff41]/0 group-hover:bg-[#00ff41]/5 blur-xl transition-opacity duration-200 -z-10 pointer-events-none" />

      {/* Image Container */}
      <Link
        href={`/blog-details/${blog.id}`}
        className="relative block aspect-[37/22] w-full overflow-hidden bg-[#0a0a0a]"
        aria-label={`Read article: ${title}`}
      >
        {/* Image overlay on hover */}
        <div className={`absolute inset-0 bg-[#00ff41]/10 transition-opacity duration-200 z-10 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Tag Badge */}
        {tags && tags.length > 0 && (
          <span className="absolute right-3 top-3 z-20 inline-flex items-center justify-center rounded-sm 
            bg-[#00ff41]/20 backdrop-blur-sm border border-[#00ff41]/50 px-3 py-1.5 
            text-xs font-mono font-semibold uppercase tracking-wider text-[#00ff41] 
            shadow-[0_0_15px_rgba(0,255,65,0.4)] transition-all duration-200 
            group-hover:shadow-[0_0_25px_rgba(0,255,65,0.6)] group-hover:scale-105">
            {tags[0]}
          </span>
        )}
        
        <Image 
          src={image} 
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </Link>

      {/* Content Container */}
      <div className="p-4 sm:p-6 lg:p-5 xl:p-6 relative z-10 bg-gradient-to-b from-[#050805] to-[#0a0a0a]">
        {/* Title */}
        <h3 className="mb-3 sm:mb-4">
          <Link
            href={`/blog-details/${blog.id}`}
            className="block text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold leading-tight 
              text-white hover:text-[#00ff41] transition-colors duration-200 
              focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 focus:ring-offset-[#050805] rounded"
          >
            <span className="relative inline-block">
              {title}
              <span 
                className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#00ff41] transition-all duration-200 ${isHovered ? 'w-full' : 'w-0'}`}
              />
            </span>
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mb-4 sm:mb-5 pb-4 sm:pb-5 text-sm sm:text-base leading-relaxed text-[#788293] 
          border-b border-[#00ff41]/20 line-clamp-2 group-hover:text-[#959CB1] transition-colors duration-200">
          {paragraph}
        </p>

        {/* Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
          {/* Author */}
          <div className="flex items-center border-r-0 sm:border-r border-[#00ff41]/20 pr-0 sm:pr-4 mr-0 sm:mr-4">
            <div className="mr-3 sm:mr-4 flex-shrink-0">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full 
                ring-2 ring-[#00ff41]/30 group-hover:ring-[#00ff41]/60 transition-all duration-200">
                <Image 
                  src={author.image} 
                  alt={`${author.name}, ${author.designation}`}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-110" 
                  sizes="(max-width: 640px) 40px, 48px"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-medium text-white group-hover:text-[#00ff41] 
                transition-colors duration-200 truncate">
                {author.name}
              </h4>
              <p className="text-xs text-[#788293] group-hover:text-[#959CB1] transition-colors duration-200 truncate">
                {author.designation}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex-shrink-0">
            <h4 className="text-xs sm:text-sm font-medium text-white group-hover:text-[#00ff41] 
              transition-colors duration-200 mb-0.5">
              Date
            </h4>
            <p className="text-xs font-mono text-[#788293] group-hover:text-[#959CB1] transition-colors duration-200">
              {publishDate}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SingleBlog;