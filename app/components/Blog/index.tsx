'use client';

import { useEffect, useState, useRef, useMemo } from "react";
import { Blog } from "@/types/blog";
import SectionTitle from "../Common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import dynamic from "next/dynamic";
import Loader from "../Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

// Inline SVGs for left/right arrows to avoid missing FaArrowLeft/FaArrowRight
const ArrowLeftIcon = ({ className = "", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
    focusable="false"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.25L8.75 12.25L15.75 5.25" />
  </svg>
);

const ArrowRightIcon = ({ className = "", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
    focusable="false"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.25L15.25 12.25L8.25 5.25" />
  </svg>
);

const SingleBlog = dynamic(() => import("./SingleBlog"), {
  ssr: false,
  loading: () => <Loader />,
});

gsap.registerPlugin(ScrollTrigger);

const BlogList = () => {
  useScrollAnimations();
  const [projects, setProjects] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setFetchError(null);

    const fetchProjects = async () => {
      try {
        const res = await fetch("/data/projects.json");
        if (!res.ok) {
          throw new Error("Failed to fetch projects.");
        }
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Invalid response content type");
        }
        const data = await res.json();
        if (isMounted) {
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (err: any) {
        if (isMounted) setFetchError(err.message || "Fetch error.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // section reveal
      gsap.from(".blog-section", {
        opacity: 0,
        y: 60,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-section",
          start: "top 80%",
        },
      });

      // title pulse + glow
      gsap.from(".blog-title", {
        opacity: 0,
        scale: 0.9,
        filter: "drop-shadow(0 0 10px rgba(0,255,128,0))",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-title",
          start: "top 85%",
        },
      });

      // project cards float + glow
      gsap.utils.toArray(".blog-card").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
            filter: "drop-shadow(0 0 0px rgba(0,255,128,0))",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: i * 0.12,
            ease: "power3.out",
            filter: "drop-shadow(0 0 18px rgba(0,255,128,0.16))",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  const handlePrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // Stats
  const recentProjects = useMemo(
    () => projects.slice(0, Math.min(3, projects.length)),
    [projects]
  );

  return (
    <section
      ref={containerRef}
      className="blog-section relative overflow-hidden py-16 md:py-20 lg:py-28 isolate px-4 sm:px-6 md:px-8 lg:px-8
        bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_85%)]"
      aria-labelledby="projects-title"
      tabIndex={-1}
    >
      {/* Neon overlays */}
      <div className="pointer-events-none absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.11),_transparent_85%)] blur-3xl animate-pulse-slow" />
      <div className="pointer-events-none absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.04),_transparent_85%)] blur-[120px]" />

      <div className="container relative z-10">
        <div className="blog-title">
          <SectionTitle
            title="Projects"
            paragraph="Browse featured and recent creations."
            center
            mb="36px"
          />
        </div>
        {/* Stats Row */}
        <div className="flex justify-center flex-wrap gap-3 sm:gap-5 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-green-400/30 shadow-green-900/40 shadow text-green-200 font-mono text-xs sm:text-sm">
            <span role="img" aria-label="New">🆕</span>
            <span className="font-bold">{recentProjects.length}</span>
            <span className="hidden sm:inline">Recent</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-green-400/30 shadow-green-900/40 shadow text-green-200 font-mono text-xs sm:text-sm">
            <span role="img" aria-label="Projects">🗂</span>
            <span className="font-bold">{projects.length}</span>
            <span className="hidden sm:inline">Total</span>
          </div>
        </div>

        {/* Loader/Error State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : fetchError ? (
          <div className="flex justify-center items-center py-14 text-red-400 text-center font-mono text-lg">
            {fetchError}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex justify-center items-center py-14 text-white/60 font-mono text-lg">
            No projects found.
          </div>
        ) : (
          <>
            <Swiper
              className="!p-3 sm:!p-4 md:!p-6 lg:!p-8"
              ref={swiperRef}
              spaceBetween={24}
              slidesPerView={3}
              loop={true}
              autoplay={{ delay: 2600, disableOnInteraction: false }}
              modules={[Autoplay, Navigation, Pagination]}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                bulletClass: "project-swiper-bullet",
                bulletActiveClass: "project-swiper-bullet-active",
              }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 15 },
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 28 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
              }}
            >
              {projects.map((blog, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`blog-card group relative rounded-3xl overflow-hidden 
                      shadow-[0_0_22px_rgba(0,255,128,0.14)] hover:shadow-[0_0_40px_rgba(0,255,128,0.34)]
                      transition-all duration-500 hover:-translate-y-2 hover:scale-105
                      backdrop-blur-md p-4 border border-green-500/15
                      `}
                  >
                    <SingleBlog blog={blog} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Swiper Pagination Dots */}
            <div className="swiper-pagination flex justify-center items-center gap-2 mt-5 z-20 mb-1 [&>span]:!w-3.5 [&>span]:!h-3.5 [&>span]:bg-green-500/20 [&>span.project-swiper-bullet-active]:bg-green-500/90 [&>span]:transition-all" />

            {/* Navigation buttons with improved a11y and Fa icons */}
            <div className="flex justify-center gap-4 md:gap-6 mt-3 md:mt-6">
              <button
                onClick={handlePrevSlide}
                className="group relative bg-green-500 border border-green-500 text-black py-2.5 px-5 md:py-3 md:px-6 rounded-full
                  focus:outline-none focus:ring-2 focus:ring-green-400/70
                  hover:bg-transparent hover:text-green-500 
                  shadow-[0_0_15px_rgba(0,255,128,0.4)] hover:shadow-[0_0_25px_rgba(0,255,128,0.6)]
                  transition-all duration-300 hover:scale-110 overflow-hidden flex items-center justify-center"
                aria-label="Previous project slide"
                tabIndex={0}
                type="button"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/30 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-base md:text-lg font-bold flex items-center">
                  <ArrowLeftIcon className="w-5 h-5 mr-1 text-green-900 group-hover:text-green-400 transition-colors duration-200" aria-hidden="true" />
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                onClick={handleNextSlide}
                className="group relative bg-green-500 border border-green-500 text-black py-2.5 px-5 md:py-3 md:px-6 rounded-full
                  focus:outline-none focus:ring-2 focus:ring-green-400/70
                  hover:bg-transparent hover:text-green-500 
                  shadow-[0_0_15px_rgba(0,255,128,0.4)] hover:shadow-[0_0_25px_rgba(0,255,128,0.6)]
                  transition-all duration-300 hover:scale-110 overflow-hidden flex items-center justify-center"
                aria-label="Next project slide"
                tabIndex={0}
                type="button"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/30 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-base md:text-lg font-bold flex items-center">
                  <ArrowRightIcon className="w-5 h-5 ml-1 text-green-900 group-hover:text-green-400 transition-colors duration-200" aria-hidden="true" />
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>

            {/* "All Projects" Button */}
            <div className="flex justify-center mt-6 md:mt-8">
              <Link
                href={"/projects"}
                className="group relative rounded-lg bg-green-500 px-6 py-3 md:px-9 md:py-4 border border-green-500 text-black
                  font-medium text-sm md:text-base duration-300 ease-in-out hover:bg-transparent
                  hover:text-green-500 shadow-[0_0_15px_rgba(0,255,128,0.4)] 
                  hover:shadow-[0_0_30px_rgba(0,255,128,0.6)] transition-all hover:scale-105 overflow-hidden
                  focus:outline-none focus:ring-2 focus:ring-green-400/70"
                data-animate="fade-in-up"
                style={{ animationDelay: '0.3s' }}
                aria-label="View all projects"
                tabIndex={0}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  All Projects
                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 text-green-700 group-hover:text-green-400 transition-colors duration-200" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogList;
