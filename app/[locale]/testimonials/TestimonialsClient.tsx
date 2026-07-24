"use client";

import { useState, useEffect, useRef, memo } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(
  () => import("@/components/Common/ParticlesBackground"),
  { ssr: false }
);
import { useTranslations } from "@/lib/i18n/dictionary-context";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  comment: string;
  image?: string;
}

const StarRating = memo(({ rating = 5, ariaLabel }: { rating?: number; ariaLabel: string }) => (
  <div className="flex items-center gap-1" aria-label={ariaLabel}>
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

const TestimonialCard = memo(({
  testimonial,
  clientFallback,
  ratingAria,
}: {
  testimonial: Testimonial;
  clientFallback: string;
  ratingAria: string;
}) => (
  <div className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-primary/5 active:border-primary/25 sm:min-h-[380px] sm:p-8 md:hover:-translate-y-1">
    <div className="absolute top-6 right-6 text-white/5 transition-colors duration-300 group-hover:text-primary/10">
      <Quote size={80} strokeWidth={1} />
    </div>

    <div className="relative z-10">
      <StarRating rating={5} ariaLabel={ratingAria} />
      <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-300 font-light">
        &ldquo;{testimonial.comment}&rdquo;
      </p>
    </div>

    <div className="relative z-10 mt-8 flex items-center gap-4 border-t border-white/5 pt-6">
      <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full border border-white/10">
        <Image
          src={testimonial.image || "/images/testimonials/testimonials.png"}
          alt={`${testimonial.name}${testimonial.role ? `, ${testimonial.role}` : ""}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 48px, 56px"
        />
      </div>
      <div>
        <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-primary transition-colors">
          {testimonial.name}
        </h4>
        {testimonial.role ? (
          <p className="text-sm text-neutral-500 mt-0.5">{testimonial.role}</p>
        ) : (
          <p className="text-sm text-neutral-600 mt-0.5">{clientFallback}</p>
        )}
      </div>
    </div>
  </div>
));
TestimonialCard.displayName = "TestimonialCard";

const TestimonialsClient = () => {
  const t = useTranslations().testimonials;
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    comment: "",
    image: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const swiperRef = useRef<{ swiper?: { slidePrev: () => void; slideNext: () => void } } | null>(null);
  const reducedMotion = useReducedMotion();
  const ratingAria = t.ratingAria.replace("{rating}", "5");

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
      alert(t.imageHint);
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
      <Breadcrumb pageName={t.breadcrumb} description={t.description} />

      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <ParticlesBackground density={12} interactive={false} idleDelay={500} />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[130px] rounded-full pointer-events-none opacity-50" aria-hidden="true" />
        <div className="absolute bottom-0 right-[-20%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none opacity-50" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{t.breadcrumb}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              {t.title}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl text-center">
              {t.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-12 xl:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full xl:sticky xl:top-32"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 shadow-xl">
                <header className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">{t.formTitle}</h3>
                  <p className="text-sm text-neutral-400 mt-2">{t.formSubtitle}</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-300">{t.nameLabel}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="h-12 min-h-[48px] w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-base text-white transition-colors placeholder:text-neutral-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 sm:text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium text-neutral-300">{t.roleLabel}</label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      placeholder={t.rolePlaceholder}
                      value={formData.role}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="h-12 min-h-[48px] w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-base text-white transition-colors placeholder:text-neutral-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 sm:text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium text-neutral-300">{t.imageLabel}</label>
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
                        <span>{formData.image ? t.imageLabel : t.imageHint}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="comment" className="text-sm font-medium text-neutral-300">{t.commentLabel}</label>
                      <span className="text-xs text-neutral-500">{formData.comment.length}/500</span>
                    </div>
                    <textarea
                      id="comment"
                      name="comment"
                      required
                      rows={4}
                      maxLength={500}
                      placeholder={t.commentPlaceholder}
                      value={formData.comment}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="min-h-[140px] w-full resize-none rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-base text-white transition-colors placeholder:text-neutral-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex h-12 min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-primary/90 active:scale-95 disabled:pointer-events-none disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> {t.submitting}</>
                    ) : (
                      t.submit
                    )}
                  </button>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        {t.successMessage}
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {t.errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full xl:w-[calc(100vw-400px-6rem)] xl:max-w-[850px]"
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[400px] border border-white/5 rounded-2xl bg-white/[0.01]">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="mt-4 text-sm text-neutral-400">{t.loading}</p>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-12 text-center">
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />
                  </div>
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] text-primary">
                    <Quote className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <p className="relative z-10 mt-6 text-xl font-semibold tracking-tight text-white">
                    {t.emptyTitle}
                  </p>
                  <p className="relative z-10 mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
                    {t.emptyDescription}
                  </p>
                  <div className="relative z-10 mt-8 grid w-full max-w-lg gap-3 sm:grid-cols-2">
                    {[1, 2].map((slot) => (
                      <div
                        key={slot}
                        className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-left"
                        aria-hidden="true"
                      >
                        <div className="mb-3 flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-neutral-800 text-neutral-800" />
                          ))}
                        </div>
                        <div className="mb-2 h-3 w-full rounded-full bg-white/5" />
                        <div className="mb-4 h-3 w-[80%] rounded-full bg-white/[0.04]" />
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full border border-white/10 bg-white/5" />
                          <div>
                            <div className="mb-1.5 h-2.5 w-20 rounded-full bg-white/10" />
                            <div className="h-2 w-16 rounded-full bg-white/5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative group/swiper">
                  <Swiper
                    ref={swiperRef as never}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={testimonials.length >= 2}
                    autoplay={
                      reducedMotion
                        ? false
                        : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
                    }
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
                    {testimonials.map((item) => (
                      <SwiperSlide key={item.id} className="h-auto">
                        <TestimonialCard
                          testimonial={item}
                          clientFallback={t.clientFallback}
                          ratingAria={ratingAria}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="mt-4 flex items-center justify-center gap-3 sm:mt-0">
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.swiper?.slidePrev()}
                      className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-neutral-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:absolute sm:-left-4 sm:top-1/2 sm:-translate-y-1/2 xl:-left-6 xl:h-12 xl:w-12"
                      aria-label={t.previous}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.swiper?.slideNext()}
                      className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-neutral-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:absolute sm:-right-4 sm:top-1/2 sm:-translate-y-1/2 xl:-right-6 xl:h-12 xl:w-12"
                      aria-label={t.next}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="custom-swiper-pagination absolute bottom-0 left-0 right-0 z-10 flex justify-center gap-2" />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .swiper-bullet {
            width: 12px;
            height: 12px;
            border-radius: 9999px;
            background-color: rgba(255, 255, 255, 0.2);
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-block;
            position: relative;
            margin: 0 6px;
          }
          .swiper-bullet::before {
            content: "";
            position: absolute;
            inset: -14px;
          }
          .swiper-bullet:hover,
          .swiper-bullet:active {
            background-color: rgba(255, 255, 255, 0.45);
          }
          .swiper-bullet-active {
            width: 28px;
            background-color: var(--color-primary, #00FF80);
          }
        `}} />
      </section>
    </div>
  );
};

export default TestimonialsClient;
