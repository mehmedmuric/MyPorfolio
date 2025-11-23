'use client';

import { useEffect, useState, useRef } from "react";
import { Blog } from "@/types/blog";
import SectionTitle from "../Common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import dynamic from "next/dynamic";
import Loader from "../Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SingleBlog = dynamic(() => import("./SingleBlog"), {
  ssr: false,
  loading: () => <Loader />,
});

gsap.registerPlugin(ScrollTrigger);

const BlogList = () => {
  useScrollAnimations();
  const [projects, setProjects] = useState<Blog[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
            delay: i * 0.15,
            ease: "power3.out",
            filter: "drop-shadow(0 0 15px rgba(0,255,128,0.3))",
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
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const handleNextSlide = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  return (
    <section
      ref={containerRef}
      className="blog-section relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8
        bg-[#010101] bg-[radial-gradient(ellipse_at_top,_#0a3b27_0%,_#010101_85%)]"
    >
      {/* Neon overlays */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.08),_transparent_70%)] blur-3xl animate-pulse-slow" />
      <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.04),_transparent_70%)] blur-[120px]" />

      <div className="container relative z-10">
        <div className="blog-title">
          <SectionTitle title="Projects" paragraph="" center mb="50px" />
        </div>

        <Swiper
          className="!p-4 md:!p-6 lg:!p-8"
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {projects.map((blog, index) => (
            <SwiperSlide key={index}>
              <div
                className="blog-card group relative rounded-3xl overflow-hidden 
                  shadow-[0_0_20px_rgba(0,255,128,0.12)] hover:shadow-[0_0_35px_rgba(0,255,128,0.3)]
                  transition-all duration-500 hover:-translate-y-2 hover:scale-105
                  backdrop-blur-md p-4"
              >
                <SingleBlog blog={blog} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nav buttons */}
        <div className="flex justify-center gap-6 mt-4">
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
