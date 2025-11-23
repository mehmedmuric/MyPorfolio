'use client';

import { useEffect, useState, useRef } from "react";
import { Blog } from "@/types/blog";
import SectionTitle from "../Common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

import dynamic from "next/dynamic";
import Loader from "../Loader";

const SingleBlog = dynamic(() => import("./SingleBlog"), {
  ssr: false,
  loading: () => <Loader />,
});

const BlogList = () => {
  useScrollAnimations();
  const [projects, setProjects] = useState<Blog[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/data/projects.json");
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePrevSlide = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const handleNextSlide = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  return (
    <section
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8
        bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_85%)]"
    >
      {/* Animated cyber grid background */}
      <div 
        className="absolute inset-0 opacity-[0.06] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:50px_50px] animate-[gridMove_20s_linear_infinite]"
      />

      {/* Secondary grid layer for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:25px_25px]"
        style={{
          animation: 'gridMove-reverse 15s linear infinite'
        }}
      />

      {/* Neon radial pulse overlays with parallax */}
      <div 
        className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.08),_transparent_70%)] blur-3xl animate-pulse-slow transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        }}
      />
      <div 
        className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.04),_transparent_70%)] blur-[120px] transition-transform duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
        }}
      />

      {/* Additional accent glow */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20 animate-float"
          style={{
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 3) * 35}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${4 + i * 0.4}s`,
            width: `${2 + (i % 2)}px`,
            height: `${2 + (i % 2)}px`,
          }}
        />
      ))}

      {/* Animated scan lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"
          style={{
            animation: 'scanLine 8s linear infinite'
          }}
        />
      </div>

      <div className="container relative z-10">
        <SectionTitle
          title="Projects"
          paragraph=""
          center
          mb="50px"
        />

        <Swiper
          className="!p-4 md:!p-6 lg:!p-8"
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
        >
          {projects.map((blog, index) => (
            <SwiperSlide key={index}>
              <div className="group relative rounded-3xl overflow-hidden 
                shadow-[0_0_20px_rgba(0,255,128,0.12)] hover:shadow-[0_0_50px_rgba(0,255,128,0.4)]
                transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]
                backdrop-blur-md p-4 border border-green-500/20 hover:border-green-500/50
                bg-gradient-to-br from-black/60 via-black/50 to-black/60">
                <SingleBlog blog={blog} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Enhanced Navigation buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={handlePrevSlide}
            className="group relative bg-green-500 border border-green-500 text-black py-3 px-6 rounded-full
              ease-in-out hover:bg-transparent hover:text-green-500 
              shadow-[0_0_15px_rgba(0,255,128,0.4)] hover:shadow-[0_0_25px_rgba(0,255,128,0.6)]
              transition-all duration-300 hover:scale-110 overflow-hidden"
            aria-label="Previous slide"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-lg font-bold">{`<`}</span>
          </button>
          <button
            onClick={handleNextSlide}
            className="group relative bg-green-500 border border-green-500 text-black py-3 px-6 rounded-full
              ease-in-out hover:bg-transparent hover:text-green-500 
              shadow-[0_0_15px_rgba(0,255,128,0.4)] hover:shadow-[0_0_25px_rgba(0,255,128,0.6)]
              transition-all duration-300 hover:scale-110 overflow-hidden"
            aria-label="Next slide"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-lg font-bold">{`>`}</span>
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href={"/projects"}
            className="group relative rounded-lg bg-green-500 px-9 py-4 border border-green-500 text-black
              font-medium text-base duration-300 ease-in-out hover:bg-transparent
              hover:text-green-500 shadow-[0_0_15px_rgba(0,255,128,0.4)] 
              hover:shadow-[0_0_30px_rgba(0,255,128,0.6)] transition-all hover:scale-105 overflow-hidden"
            data-animate="fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">All Projects</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
