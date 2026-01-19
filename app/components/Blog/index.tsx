'use client';

import { useEffect, useState, useRef, useMemo, memo } from "react";
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

// Inline SVGs for navigation arrows
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
  const containerRef = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax for cyber effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

    const timer = setTimeout(() => {
      const blogSection = document.querySelector(".blog-section");
      const blogTitle = document.querySelector(".blog-title");
      if (!blogSection || !blogTitle) return;

      const ctx = gsap.context(() => {
        gsap.from(blogSection, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blogSection,
            start: "top 85%",
            invalidateOnRefresh: true,
          },
        });

        gsap.from(blogTitle, {
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blogTitle,
            start: "top 90%",
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray(".blog-card").forEach((el: any, i) => {
          if (!el) return;
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 40,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: i * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [projects]);

  const handlePrevSlide = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const recentProjects = useMemo(
    () => projects.slice(0, Math.min(3, projects.length)),
    [projects]
  );

  // Calculate if loop should be enabled (need at least 4 slides for loop to work properly)
  const shouldEnableLoop = projects.length > 3;

  return (
    <section
      ref={containerRef}
      className="blog-section relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 isolate px-4 sm:px-6 lg:px-8 bg-[#000000]"
      id="projects"
      aria-labelledby="projects-title"
    >
      {/* Dark futuristic background with subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.03)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_0%,_rgba(0,255,65,0.01)_50%,_transparent_100%)]" />
      
      {/* Animated HUD Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{ animation: 'hudGridMove 25s linear infinite' }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:20px_20px]"
        style={{ animation: 'hudGridMoveReverse 18s linear infinite' }}
        aria-hidden
      />
      
      {/* Animated scanning lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={`scan-${i}`}
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-30"
            style={{
              animation: `hudScanLine ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 2.5}s`,
              top: `${(i * 33) % 100}%`,
            }}
            aria-hidden
          />
        ))}
      </div>
      
      {/* Data stream particles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-[1px] h-[20px] bg-[#00FF41] opacity-20"
          style={{
            left: `${5 + (i * 9) % 90}%`,
            animation: `hudDataStream ${4 + (i % 3)}s linear infinite`,
            animationDelay: `${i * 0.3}s`,
            boxShadow: `0 0 ${2 + (i % 3)}px #00FF41`,
          }}
          aria-hidden
        />
      ))}
      
      {/* Floating HUD corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#00FF41] opacity-40 animate-hud-float" aria-hidden />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#00FF41] opacity-40 animate-hud-float" style={{ animationDelay: '1s' }} aria-hidden />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#00FF41] opacity-40 animate-hud-float" style={{ animationDelay: '2s' }} aria-hidden />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#00FF41] opacity-40 animate-hud-float" style={{ animationDelay: '1.5s' }} aria-hidden />
      
      {/* HUD Status Lines */}
      <div className="absolute top-20 left-8 w-32 h-[1px] bg-[#00FF41] opacity-30" aria-hidden />
      <div className="absolute top-20 left-8 w-[1px] h-8 bg-[#00FF41] opacity-30" aria-hidden />
      <div className="absolute top-20 right-8 w-32 h-[1px] bg-[#00FF41] opacity-30" aria-hidden />
      <div className="absolute top-20 right-8 w-[1px] h-8 bg-[#00FF41] opacity-30" aria-hidden />
      
      {/* HUD Info Panels - Enhanced */}
      <div 
        className="absolute bottom-20 left-8 px-3 py-1.5 bg-black/60 border border-[#00FF41]/30 font-mono text-[#00FF41]/60 text-[10px] tracking-wider backdrop-blur-sm transition-all duration-300 hover:border-[#00FF41]/60 hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]" 
        aria-hidden
        style={{
          clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'
        }}
      >
        <span className="text-[#00FF41]">[PROJECTS_ACTIVE]</span>
      </div>
      <div 
        className="absolute bottom-20 right-8 px-3 py-1.5 bg-black/60 border border-[#00FF41]/30 font-mono text-[#00FF41]/60 text-[10px] tracking-wider backdrop-blur-sm transition-all duration-300 hover:border-[#00FF41]/60 hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]" 
        aria-hidden
        style={{
          clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'
        }}
      >
        <span className="text-[#00FF41]">[{projects.length} ITEMS]</span>
      </div>
      
      {/* Glowing orbs for depth with mouse parallax */}
      <div
        className="absolute -inset-40 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.15),_transparent_70%)] blur-3xl transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.18}px)`,
        }}
        aria-hidden
      />
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.08),_transparent_70%)] blur-[120px] transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * 0.1}px)`,
        }}
        aria-hidden
      />

      <div className="container mx-auto relative z-10 max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section title with Enhanced HUD styling */}
        <div className="relative mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          {/* Modern Glassmorphism Panel behind title */}
          <div className="absolute inset-0 -inset-x-4 md:-inset-x-8 bg-gradient-to-br from-black/70 via-black/50 to-black/70 border-2 border-[#00FF41]/40 rounded-2xl backdrop-blur-md shadow-[0_0_40px_rgba(0,255,65,0.3),inset_0_0_30px_rgba(0,255,65,0.05)] transition-all duration-500 hover:border-[#00FF41]/60 hover:shadow-[0_0_60px_rgba(0,255,65,0.4),inset_0_0_40px_rgba(0,255,65,0.08)]" />
          {/* Enhanced accent bar */}
          <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-[#00FF41] via-[#00FF41]/80 to-[#00FF41] opacity-70 rounded-l-2xl" />
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/60 to-transparent" />
          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent" />
          
          {/* HUD Corner Accents */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#00FF41]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#00FF41]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#00FF41]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#00FF41]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative px-6 md:px-10 py-8 md:py-10 blog-title group">
            <SectionTitle
              title="Projects"
              paragraph="Browse featured and recent creations."
              center
              mb="0px"
            />
          </div>
        </div>

        {/* Enhanced Descriptive text with modern styling */}
        <div className="relative mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <p className="text-center text-[#00FF41]/90 font-mono tracking-wider max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed relative z-10 px-4">
            <span className="inline-block relative">
              <span className="text-[#00FF41]/50 mr-2">[</span>
              <span className="drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]">Explore my portfolio of innovative web applications, full-stack solutions, and creative digital experiences</span>
              <span className="text-[#00FF41]/50 ml-2">]</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/60 to-transparent"></span>
            </span>
          </p>
        </div>

        {/* Stats Badges - Modern Glassmorphism Design */}
        <div className="flex justify-center flex-wrap gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-16 relative z-10">
          <div 
            className="group relative flex items-center gap-2.5 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 md:px-7 md:py-4 rounded-xl backdrop-blur-md border-2 transition-all duration-500 hover:scale-110 hover:-translate-y-1 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 20, 8, 0.6) 100%)',
              borderColor: 'rgba(0, 255, 65, 0.4)',
              boxShadow: '0 0 25px rgba(0, 255, 65, 0.2), inset 0 0 25px rgba(0, 255, 65, 0.05), 0 4px 20px rgba(0, 0, 0, 0.5)',
              color: '#00FF41',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 65, 0.6), inset 0 0 35px rgba(0, 255, 65, 0.12), 0 8px 30px rgba(0, 255, 65, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.2), inset 0 0 25px rgba(0, 255, 65, 0.05), 0 4px 20px rgba(0, 0, 0, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.4)';
            }}
          >
            {/* Modern corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tl-lg shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tr-lg shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-bl-lg shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-br-lg shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            
            {/* Glowing orb effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl" />
            
            {/* Scanning line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudCardScan transition-opacity duration-500 pointer-events-none rounded-xl" />
            
            <span role="img" aria-label="New" className="text-lg sm:text-xl md:text-2xl relative z-10 drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">🆕</span>
            <span className="font-bold text-base sm:text-lg md:text-xl font-mono relative z-10 drop-shadow-[0_0_6px_rgba(0,255,65,0.5)]">{recentProjects.length}</span>
            <span className="hidden sm:inline text-base sm:text-lg md:text-xl font-mono relative z-10 drop-shadow-[0_0_6px_rgba(0,255,65,0.5)]">Recent</span>
          </div>
          <div 
            className="group relative flex items-center gap-2.5 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 md:px-7 md:py-4 rounded-xl backdrop-blur-md border-2 transition-all duration-500 hover:scale-110 hover:-translate-y-1 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 20, 8, 0.6) 100%)',
              borderColor: 'rgba(0, 255, 65, 0.4)',
              boxShadow: '0 0 25px rgba(0, 255, 65, 0.2), inset 0 0 25px rgba(0, 255, 65, 0.05), 0 4px 20px rgba(0, 0, 0, 0.5)',
              color: '#00FF41',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 65, 0.6), inset 0 0 35px rgba(0, 255, 65, 0.12), 0 8px 30px rgba(0, 255, 65, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.2), inset 0 0 25px rgba(0, 255, 65, 0.05), 0 4px 20px rgba(0, 0, 0, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.4)';
            }}
          >
            {/* Modern corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tl-lg shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tr-lg shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-bl-lg shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-br-lg shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
            
            {/* Glowing orb effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl" />
            
            {/* Scanning line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudCardScan transition-opacity duration-500 pointer-events-none rounded-xl" />
            
            <span role="img" aria-label="Projects" className="text-lg sm:text-xl md:text-2xl relative z-10 drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">🗂</span>
            <span className="font-bold text-base sm:text-lg md:text-xl font-mono relative z-10 drop-shadow-[0_0_6px_rgba(0,255,65,0.5)]">{projects.length}</span>
            <span className="hidden sm:inline text-base sm:text-lg md:text-xl font-mono relative z-10 drop-shadow-[0_0_6px_rgba(0,255,65,0.5)]">Total</span>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center py-16 sm:py-20 md:py-24">
            <Loader />
          </div>
        ) : fetchError ? (
          <div 
            className="flex justify-center items-center py-12 sm:py-14 text-center font-mono text-base sm:text-lg px-4"
            style={{ color: '#f87171' }}
          >
            {fetchError}
          </div>
        ) : projects.length === 0 ? (
          <div 
            className="flex justify-center items-center py-12 sm:py-14 font-mono text-base sm:text-lg px-4"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            No projects found.
          </div>
        ) : (
          <>
            {/* Swiper Carousel */}
            <div className="mb-6 sm:mb-8">
              <Swiper
                className="!pb-2 sm:!pb-4"
                ref={swiperRef}
                spaceBetween={16}
                slidesPerView={1}
                loop={shouldEnableLoop}
                autoplay={shouldEnableLoop ? {
                  delay: 3000, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                } : false}
                modules={[Autoplay, Navigation, Pagination]}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                  bulletClass: "swiper-bullet-custom",
                  bulletActiveClass: "swiper-bullet-active-custom",
                }}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 24 },
                  1024: { slidesPerView: 3, spaceBetween: 28 },
                }}
              >
                {projects.map((blog, index) => (
                  <SwiperSlide key={`${blog.id}-${index}`}>
                    <article
                      className="blog-card group relative h-full overflow-hidden rounded-2xl transition-all duration-500 ease-out hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-[1.03] shadow-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 20, 8, 0.65) 100%)',
                        border: '2px solid rgba(0, 255, 65, 0.4)',
                        boxShadow: '0 0 30px rgba(0, 255, 65, 0.25), inset 0 0 35px rgba(0, 255, 65, 0.06), 0 8px 25px rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(12px)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 255, 65, 0.7), inset 0 0 50px rgba(0, 255, 65, 0.15), 0 12px 40px rgba(0, 255, 65, 0.4)';
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 1)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 30, 12, 0.75) 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.25), inset 0 0 35px rgba(0, 255, 65, 0.06), 0 8px 25px rgba(0, 0, 0, 0.6)';
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.4)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 20, 8, 0.65) 100%)';
                      }}
                    >
                      {/* HUD Corner Brackets - Enhanced */}
                      <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                        <div className="absolute top-0 left-0 w-full h-full bg-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                        <div className="absolute top-0 right-0 w-full h-full bg-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                        <div className="absolute bottom-0 left-0 w-full h-full bg-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      
                      {/* HUD Status Indicator - Enhanced */}
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 border border-[#00FF41]/40 font-mono text-[8px] text-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 backdrop-blur-sm"
                        style={{
                          clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                          boxShadow: '0 0 10px rgba(0, 255, 65, 0.3)'
                        }}
                      >
                        <span className="text-[#00FF41]">[ACTIVE]</span>
                      </div>
                      
                      {/* HUD Top Accent Line */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-[#00FF41]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Scanning line effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudCardScan transition-opacity duration-300 pointer-events-none" />
                      
                      {/* HUD Side Panels */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-16 bg-[#00FF41]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-16 bg-[#00FF41]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* HUD Bottom Status Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        <SingleBlog blog={blog} />
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Pagination Dots - Enhanced HUD Style */}
            <div className="swiper-pagination flex justify-center items-center gap-2 mb-6 sm:mb-8 relative z-10" 
              style={{
                '--swiper-pagination-color': 'rgba(0, 255, 65, 0.3)',
              } as React.CSSProperties}
            >
              {/* HUD indicator line above pagination */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-[#00FF41]/30" aria-hidden />
            </div>

            {/* Navigation Controls - HUD Style */}
            <nav className="flex justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-10" aria-label="Project carousel navigation">
              <button
                onClick={handlePrevSlide}
                className="group/btn relative border-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderColor: '#00FF41',
                  color: '#00FF41',
                  padding: '0.625rem 1.25rem',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)',
                  clipPath: 'polygon(4px 0, 100% 0, 100% 100%, 0 100%, 0 4px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.8), inset 0 0 20px rgba(0, 255, 65, 0.1)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                }}
                aria-label="Previous project slide"
                type="button"
              >
                {/* Button corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                {/* Button scanning line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-hudButtonScan transition-opacity duration-200 pointer-events-none" />
                <ArrowLeftIcon 
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 relative z-10" 
                  aria-hidden="true" 
                />
                <span className="sr-only">Previous</span>
              </button>
              <button
                onClick={handleNextSlide}
                className="group/btn relative border-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderColor: '#00FF41',
                  color: '#00FF41',
                  padding: '0.625rem 1.25rem',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)',
                  clipPath: 'polygon(4px 0, 100% 0, 100% 100%, 0 100%, 0 4px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.8), inset 0 0 20px rgba(0, 255, 65, 0.1)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                }}
                aria-label="Next project slide"
                type="button"
              >
                {/* Button corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                {/* Button scanning line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-hudButtonScan transition-opacity duration-200 pointer-events-none" />
                <ArrowRightIcon 
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 relative z-10" 
                  aria-hidden="true" 
                />
                <span className="sr-only">Next</span>
              </button>
            </nav>

            {/* CTA Button - HUD Style */}
            <div className="flex justify-center">
              <Link
                href="/projects"
                className="group/cta relative border-2 font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80 focus:ring-offset-2 focus:ring-offset-black overflow-hidden inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 md:px-9 md:py-4 text-xs sm:text-sm md:text-base"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderColor: '#00FF41',
                  color: '#00FF41',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)',
                  animationDelay: '0.3s',
                  clipPath: 'polygon(4px 0, 100% 0, 100% 100%, 0 100%, 0 4px)'
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 255, 65, 0.8), inset 0 0 30px rgba(0, 255, 65, 0.1)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                }}
                data-animate="fade-in-up"
                aria-label="View all projects"
              >
                {/* Button corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF41]/60 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-200" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FF41]/60 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FF41]/60 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FF41]/60 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-200" />
                {/* Button scanning line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover/cta:opacity-100 group-hover/cta:animate-hudButtonScan transition-opacity duration-200 pointer-events-none" />
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-[#00FF41]/5 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-200" />
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-[#00FF41]/60">▶</span>
                  <span>ALL PROJECTS</span>
                  <ArrowRightIcon 
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover/cta:translate-x-1" 
                    aria-hidden="true" 
                  />
                  <span className="text-[#00FF41]/60">◀</span>
                </span>
              </Link>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .swiper-bullet-custom {
          background-color: rgba(0, 255, 65, 0.25) !important;
          opacity: 1 !important;
          width: 10px !important;
          height: 10px !important;
          border: 1px solid rgba(0, 255, 65, 0.3) !important;
          transition: all 0.3s ease !important;
        }
        .swiper-bullet-active-custom {
          background-color: rgba(0, 255, 65, 0.9) !important;
          transform: scale(1.3);
          box-shadow: 0 0 15px rgba(0, 255, 65, 0.8), inset 0 0 8px rgba(0, 255, 65, 0.4);
          border-color: rgba(0, 255, 65, 1) !important;
        }
        @media (min-width: 640px) {
          .swiper-bullet-custom {
            width: 12px !important;
            height: 12px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default memo(BlogList);
