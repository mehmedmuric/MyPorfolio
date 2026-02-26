"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/types/blog";
import SectionTitle from "../Common/SectionTitle";
import Container from "../Container";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BlogList = () => {
  const [projects, setProjects] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/data/projects.json");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-[#020617] overflow-hidden">
      {/* Enhanced Background Decor with Green/Primary Accents */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] opacity-40 mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[100px] opacity-30 mix-blend-screen animate-pulse duration-12000 delay-1000" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[80px] opacity-20" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <SectionTitle
            title="Featured Projects"
            paragraph="Explore a selection of my latest work, spanning web applications, tools, and experiments."
            align="center"
            mb="0"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[520px] rounded-2xl bg-slate-900/40 border border-slate-800/60 animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-7xl mx-auto px-4 sm:px-0"
          >
            <style jsx global>{`
              .swiper-pagination {
                bottom: 0 !important;
              }
              .swiper-pagination-bullet {
                background: #334155;
                opacity: 0.5;
                width: 10px;
                height: 10px;
                transition: all 0.3s ease;
              }
              .swiper-pagination-bullet-active {
                background: hsl(var(--primary));
                opacity: 1;
                width: 24px;
                border-radius: 5px;
                box-shadow: 0 0 10px hsl(var(--primary) / 0.5);
              }
              .swiper-button-next, .swiper-button-prev {
                color: hsl(var(--primary));
                background: rgba(15, 23, 42, 0.6);
                backdrop-filter: blur(4px);
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
              }
              .swiper-button-next:after, .swiper-button-prev:after {
                font-size: 20px;
                font-weight: bold;
              }
              .swiper-button-next:hover, .swiper-button-prev:hover {
                background: hsl(var(--primary) / 0.1);
                border-color: hsl(var(--primary) / 0.5);
                box-shadow: 0 0 15px hsl(var(--primary) / 0.2);
              }
            `}</style>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="pb-16"
            >
              {projects.map((project, index) => (
                <SwiperSlide key={project.id} className="h-auto">
                  <div className="h-full py-4">
                    <BlogCard blog={project} index={index} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Link href="/projects">
            <Button
              size="lg"
              variant="outline"
              className="group h-14 px-10 rounded-full border-slate-700 bg-slate-900/50 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
            >
              <span className="text-base font-medium">View All Projects</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 text-primary" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default BlogList;
