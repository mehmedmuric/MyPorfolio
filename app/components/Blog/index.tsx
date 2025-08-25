"use client";

import { useEffect, useState, useRef } from "react";
import SingleBlog from "./SingleBlog";
import { Blog } from "@/types/blog";
import SectionTitle from "../Common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Uvezi Swiper stilove
import "swiper/css/navigation"; // Uvezi Swiper navigation stilove
import Link from "next/link";
import { Autoplay } from "swiper/modules";

import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const BlogList = () => {
  useScrollAnimations();

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

  // Funkcija za pomeranje na prethodni slajd
  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // Funkcija za pomeranje na sledeći slajd
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="py-20" data-animate="scale-in-center">
      <div className="container">
        <SectionTitle
          title="Projects"
          paragraph="-----------------"
          center
          mb="80px"
        />
        <Swiper
          className="!p-6"
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false, // preporučljivo da ne stane kad klikneš
          }}
          modules={[Autoplay]} 
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
        >
          {projects.map((blog, index) => (
            <SwiperSlide key={index}>
              <SingleBlog blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dugmadi ispod slidera */}
        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={handlePrevSlide}
            className="bg-green-500 text-white py-3 px-5 rounded-full hover:bg-transparent border border-mygreen hover:text-mygreen transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>

          </button>
          <button
            onClick={handleNextSlide}
            className="bg-green-500 text-white py-3 px-5 rounded-full hover:bg-transparent border border-mygreen hover:text-mygreen transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>

          </button>
        </div>

        <div className="flex justify-center mt-6">
          <Link href={"/projects"} className="shadow-submit dark:shadow-submit-dark rounded-lg bg-mygreen px-9 py-4 text-base font-medium text-white duration-300 hover:bg-transparent border border-mygreen hover:text-mygreen">
            All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};



export default BlogList;



