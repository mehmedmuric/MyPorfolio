'use client'

import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { useState, memo, useCallback } from "react";

const SingleBlog = memo(({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleFocus = useCallback(() => setIsHovered(true), []);
  const handleBlur = useCallback(() => setIsHovered(false), []);

  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-[#00ff41]/25 bg-gradient-to-b from-[#0a0a0a]/95 to-[#050805]/95
        shadow-[0_4px_20px_rgba(0,255,65,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm
        transition-all duration-400 hover:border-[#00ff41]/50 
        hover:shadow-[0_8px_40px_rgba(0,255,65,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] will-change-transform
        h-full flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Modern Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff41]/10 via-[#00ff41]/5 to-[#00ff41]/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10 pointer-events-none rounded-xl" />

      {/* Image Container */}
      <Link
        href={`/blog-details/${blog.id}`}
        className="relative block aspect-[37/22] w-full overflow-hidden bg-[#0a0a0a] rounded-t-xl"
        aria-label={`Read article: ${title}`}
      >
        {/* Modern image overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41]/5 to-[#00ff41]/10 transition-opacity duration-500 z-10 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Tag Badge - Modern Design - Responsive */}
        {tags && tags.length > 0 && (
          <span className="absolute right-2 top-2 xs:right-3 xs:top-3 sm:right-4 sm:top-4 z-20 inline-flex items-center justify-center rounded-lg 
            bg-[#00ff41]/15 backdrop-blur-md border border-[#00ff41]/40 px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-3 sm:py-1.5 
            text-[10px] xs:text-xs font-medium uppercase tracking-wide xs:tracking-widest text-[#00ff41] 
            shadow-[0_4px_20px_rgba(0,255,65,0.4)] transition-all duration-300 
            group-hover:shadow-[0_6px_30px_rgba(0,255,65,0.6)] group-hover:scale-105 group-hover:bg-[#00ff41]/20 group-hover:border-[#00ff41]/60
            max-w-[calc(100%-1rem)] truncate">
            {tags[0].replace(/^[\s-]+/, '')}
          </span>
        )}
        
        <Image 
          src={image} 
          alt={`Featured image for ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          loading="lazy"
          quality={85}
        />
      </Link>

      {/* Content Container - Responsive with flex-grow */}
      <div className="p-4 xs:p-5 sm:p-6 lg:p-6 xl:p-7 relative z-10 bg-gradient-to-b from-transparent to-[#0a0a0a]/50 flex flex-col flex-grow min-h-0">
        {/* Title - Responsive */}
        <h3 className="mb-2.5 xs:mb-3 sm:mb-4 flex-shrink-0">
          <Link
            href={`/blog-details/${blog.id}`}
            className="block text-base xs:text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold leading-tight xs:leading-snug sm:leading-tight
              text-white hover:text-[#00ff41] transition-colors duration-300 
              focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 focus:ring-offset-[#050805] rounded"
          >
            <span className="relative inline-block break-words">
              {title}
              <span 
                className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#00ff41] to-transparent transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`}
              />
            </span>
          </Link>
        </h3>

        {/* Excerpt - Better responsive with proper line clamping */}
        <p className="mb-4 xs:mb-5 sm:mb-6 pb-4 xs:pb-5 sm:pb-6 text-xs xs:text-sm sm:text-base leading-relaxed text-gray-400 
          border-b border-[#00ff41]/15 line-clamp-3 sm:line-clamp-2 group-hover:text-gray-300 transition-colors duration-300 flex-grow-0 overflow-hidden">
          {paragraph}
        </p>

        {/* Meta Info - Better responsive layout */}
        <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 sm:gap-0 flex-shrink-0">
          {/* Author */}
          <div className="flex items-center border-r-0 xs:border-r border-[#00ff41]/15 pr-0 xs:pr-4 sm:pr-5 mr-0 xs:mr-4 sm:mr-5 min-w-0 flex-1">
            <div className="mr-2.5 xs:mr-3 sm:mr-4 flex-shrink-0">
              <div className="relative h-10 w-10 xs:h-11 xs:w-11 sm:h-12 sm:w-12 overflow-hidden rounded-full 
                ring-2 ring-[#00ff41]/25 group-hover:ring-[#00ff41]/70 transition-all duration-300
                shadow-[0_0_15px_rgba(0,255,65,0.2)] group-hover:shadow-[0_0_25px_rgba(0,255,65,0.4)]">
                <Image 
                  src={author.image} 
                  alt={`${author.name}, ${author.designation}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110" 
                  sizes="(max-width: 475px) 40px, (max-width: 640px) 44px, 48px"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs xs:text-xs sm:text-sm font-semibold text-white group-hover:text-[#00ff41] 
                transition-colors duration-300 truncate">
                {author.name}
              </h4>
              <p className="text-[11px] xs:text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 truncate mt-0.5">
                {author.designation}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex-shrink-0">
            <h4 className="text-xs xs:text-xs sm:text-sm font-semibold text-white group-hover:text-[#00ff41] 
              transition-colors duration-300 mb-0.5 xs:mb-1">
              Date
            </h4>
            <p className="text-[11px] xs:text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
              {publishDate}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
});

SingleBlog.displayName = "SingleBlog";

export default SingleBlog;