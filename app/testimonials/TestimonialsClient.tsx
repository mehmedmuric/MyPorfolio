"use client";

import { useState, useEffect, useRef, memo } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, Sparkles } from "lucide-react";
import ParticlesBackground from "@/components/Common/ParticlesBackground";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ===================== TYPES =====================
interface Testimonial {
  id: string;
  name: string;
  role?: string;
  comment: string;
  image?: string;
}

// ===================== COMPONENTS =====================

const StarRating = memo(({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < rating ? "fill-primary text-primary" : "fill-neutral-800 text-neutral-800"
          }`}
      />
    ))}
  </div>
));
StarRating.displayName = "StarRating";

const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => (
  <div className="group relative flex h-full min-h-[400px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-primary/5">

    {/* Decorative Quote Icon */}
    <div className="absolute top-6 right-6 text-white/5 transition-colors duration-300 group-hover:text-primary/10">
      <Quote size={80} strokeWidth={1} />
    </div>

    <div className="relative z-10">
      <StarRating rating={5} />
      <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-300 font-light">
        "{testimonial.comment}"
      </p>
    </div>

    <div className="relative z-10 mt-8 flex items-center gap-4 border-t border-white/5 pt-6">
      <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full border border-white/10">
        <Image
          src={testimonial.image || "/images/testimonials/testimonials.png"}
          alt={`${testimonial.name}'s profile picture`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 48px, 56px"
        />
      </div>
      <div>
        <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-primary transition-colors">
          {testimonial.name}
        </h4>
        {testimonial.role && (
          <p className="text-sm text-neutral-500 mt-0.5">{testimonial.role}</p>
        )}
      </div>
    </div>
  </div>
));
TestimonialCard.displayName = "TestimonialCard";

// ===================== MAIN COMPONENT =====================

const TestimonialsClient = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    comment: "",
    image: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const swiperRef = useRef<any>(null);

  // Fetch testimonials
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2_000_000) {
      alert("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment || status === "submitting") return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: formData.image || "/images/testimonials/testimonials.png",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      setTestimonials((prev) => [data, ...prev]);
      setFormData({ name: "", role: "", comment: "", image: "" });
      setStatus("success");

      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-primary/30 selection:text-white">
      <Breadcrumb pageName="Testimonials" description="Hear from the people I have worked with." />

      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        {/* Particles Background */}
        <ParticlesBackground />

        {/* Subtle Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none opacity-50" aria-hidden="true" />
        <div className="absolute bottom-0 right-[-20%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none opacity-50" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Client Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">clients worldwide</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl text-center">
              Real stories from my clients and collaborators. We build great products together, and their feedback is my most valuable asset.
            </p>
          </motion.div>

          {/* Form & Carousel Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-12 xl:gap-16 items-start">

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full xl:sticky xl:top-32"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 shadow-xl">
                <header className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">Share your experience</h3>
                  <p className="text-sm text-neutral-400 mt-2">Your feedback helps me improve and grow.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-300">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium text-neutral-300">Company & Role</label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      placeholder="CTO at Acme Corp"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium text-neutral-300">Profile Image <span className="text-neutral-500 font-normal">(Optional)</span></label>
                    <div className="relative group">
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageChange}
                        disabled={status === "submitting"}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="flex items-center gap-3 w-full rounded-xl border border-white/10 border-dashed bg-black/20 px-4 py-3 text-sm text-neutral-400 group-hover:bg-white/5 group-hover:border-primary/50 transition-colors">
                        <ImageIcon className="w-5 h-5 text-neutral-500" />
                        <span>{formData.image ? "Image selected" : "Click to upload image"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="comment" className="text-sm font-medium text-neutral-300">Comment *</label>
                      <span className="text-xs text-neutral-500">{formData.comment.length}/500</span>
                    </div>
                    <textarea
                      id="comment"
                      name="comment"
                      required
                      rows={4}
                      maxLength={500}
                      placeholder="What was it like working with me?"
                      value={formData.comment}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {status === "submitting" ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting</>
                    ) : (
                      "Submit Feedback"
                    )}
                  </button>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        Thank you for your feedback!
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Something went wrong. Please try again.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>

            {/* Carousel Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full xl:w-[calc(100vw-400px-6rem)] xl:max-w-[850px]"
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[400px] border border-white/5 rounded-2xl bg-white/[0.01]">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="mt-4 text-sm text-neutral-400">Loading testimonials...</p>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] border border-white/5 rounded-2xl bg-white/[0.01] text-center p-6">
                  <Quote className="w-12 h-12 text-neutral-700 mb-4" />
                  <p className="text-lg text-neutral-300 font-medium">No testimonials yet</p>
                  <p className="mt-2 text-sm text-neutral-500">Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="relative group/swiper">
                  <Swiper
                    ref={swiperRef}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={testimonials.length >= 2}
                    autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    modules={[Autoplay, Navigation, Pagination]}
                    pagination={{
                      el: ".custom-swiper-pagination",
                      clickable: true,
                      bulletClass: "swiper-bullet",
                      bulletActiveClass: "swiper-bullet-active",
                    }}
                    breakpoints={{
                      768: { slidesPerView: 2, spaceBetween: 24 },
                      1280: { slidesPerView: 2, spaceBetween: 32 },
                    }}
                    className="pb-16"
                  >
                    {testimonials.map((t) => (
                      <SwiperSlide key={t.id} className="h-auto">
                        <TestimonialCard testimonial={t} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Custom Navigation */}
                  <div className="hidden sm:block">
                    <button
                      onClick={() => swiperRef.current?.swiper?.slidePrev()}
                      className="absolute -left-4 xl:-left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 xl:h-12 xl:w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-neutral-400 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:scale-110 opacity-0 group-hover/swiper:opacity-100 disabled:opacity-0 focus:opacity-100"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => swiperRef.current?.swiper?.slideNext()}
                      className="absolute -right-4 xl:-right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 xl:h-12 xl:w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-neutral-400 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:scale-110 opacity-0 group-hover/swiper:opacity-100 disabled:opacity-0 focus:opacity-100"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Custom Pagination Container */}
                  <div className="custom-swiper-pagination absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-10" />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Override Swiper Pagination styles securely */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .swiper-bullet {
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            background-color: rgba(255, 255, 255, 0.2);
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-block;
          }
          .swiper-bullet:hover {
            background-color: rgba(255, 255, 255, 0.4);
          }
          .swiper-bullet-active {
            width: 24px;
            background-color: var(--color-primary, #00FF80);
          }
        `}} />
      </section>
    </div>
  );
};

export default TestimonialsClient;