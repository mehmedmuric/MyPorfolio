"use client";

import { useEffect, useState, useRef } from "react";
import SingleBlog from "./SingleBlog";
import { Blog } from "@/types/blog";
import SectionTitle from "../Common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Uvezi Swiper stilove
import "swiper/css/navigation"; // Uvezi Swiper navigation stilove

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
    <section className="py-20">
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
          autoplay={{ delay: 2500 }}
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
        <div className="flex justify-center gap-8 mt-6">
          <button
            onClick={handlePrevSlide}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-transparent border border-mygreen hover:text-mygreen transition-all duration-300"
          >
            Prethodni
          </button>
          <button
            onClick={handleNextSlide}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-transparent border border-mygreen hover:text-mygreen transition-all duration-300"
          >
            Sledeći
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <button className="shadow-submit dark:shadow-submit-dark rounded-lg bg-mygreen px-9 py-4 text-base font-medium text-white duration-300 hover:bg-transparent border border-mygreen hover:text-mygreen">
            Prikazati sve projekte
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogList;



