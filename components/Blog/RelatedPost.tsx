import Image from "next/image";
import Link from "next/link";

const RelatedPost = ({
  image,
  slug,
  title,
  date,
}: {
  image: string;
  slug: string;
  title: string;
  date: string;
}) => {
  return (
    <article className="group relative flex flex-col sm:flex-row lg:flex-col xl:flex-row 
      items-start sm:items-center lg:items-start xl:items-center gap-3 sm:gap-4 lg:gap-3 xl:gap-4 
      p-3 sm:p-4 rounded-sm border border-[#00ff41]/20 bg-[#0a0a0a]/50 
      hover:border-[#00ff41]/50 hover:bg-[#0a0a0a] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] 
      transition-all duration-200 hover:-translate-y-0.5 will-change-transform">
      
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-full sm:w-auto">
        <div className="relative aspect-[4/3] sm:aspect-auto h-[60px] w-[70px] sm:h-[75px] sm:w-[85px] 
          lg:h-[70px] lg:w-[80px] xl:h-[75px] xl:w-[85px] overflow-hidden rounded-sm 
          border border-[#00ff41]/20 group-hover:border-[#00ff41]/50 transition-colors duration-200">
          <Image 
            src={image} 
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70px, (max-width: 1280px) 80px, 85px"
            className="object-cover transition-transform duration-200 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <h5 className="mb-1.5 sm:mb-2">
          <Link
            href={slug}
            className="block text-sm sm:text-base font-medium leading-snug text-white 
              hover:text-[#00ff41] transition-colors duration-200 line-clamp-2 
              focus:outline-none focus:ring-2 focus:ring-[#00ff41] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
          >
            {title}
          </Link>
        </h5>
        <p className="text-xs font-mono text-[#788293] group-hover:text-[#959CB1] transition-colors duration-200">
          {date}
        </p>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="h-2 w-2 border-t border-r border-[#00ff41]/50" />
      </div>
    </article>
  );
};

export default RelatedPost;