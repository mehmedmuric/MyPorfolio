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

const SingleBlog = dynamic(() => import("./SingleBlog"), {
  ssr: false,
  loading: () => <Loader />,
});

const BlogList = () => {
  const [projects, setProjects] = useState<Blog[]>([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/data/projects.json");
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
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
      {/* Neon radial pulse overlays */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.08),_transparent_70%)] blur-3xl animate-pulse-slow" />
      <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.04),_transparent_70%)] blur-[120px]" />

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
          autoplay={{ delay: 2000, disableOnInteraction: false }}
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
                shadow-[0_0_20px_rgba(0,255,128,0.12)] hover:shadow-[0_0_35px_rgba(0,255,128,0.3)]
                transition-all duration-500 hover:-translate-y-2 hover:scale-105
                backdrop-blur-md  p-4">
                <SingleBlog blog={blog} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={handlePrevSlide}
            className="bg-green-500 border border-green-500 text-black py-3 px-5 rounded-full
              ease-in-out hover:bg-transparent
              hover:text-green-500 shadow-[0_0_15px_rgba(0,255,128,0.4)] transition-all"
          >
            {`<`}
          </button>
          <button
            onClick={handleNextSlide}
            className="bg-green-500 border border-green-500 text-black py-3 px-5 rounded-full
              ease-in-out hover:bg-transparent
              hover:text-green-500 shadow-[0_0_15px_rgba(0,255,128,0.4)] transition-all"
          >
            {`>`}
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            href={"/projects"}
            className="rounded-lg bg-green-500 px-9 py-4 border border-green-500 text-black
              font-medium text-base duration-300 ease-in-out hover:bg-transparent
              hover:text-green-500 shadow-[0_0_15px_rgba(0,255,128,0.4)] transition-all"
          >
            All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
