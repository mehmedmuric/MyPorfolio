"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import Breadcrumb from "../components/Common/Breadcrumb";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
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

// ===================== OPTIMIZED BACKGROUND EFFECTS =====================

// CRT Scanline Effect Component - Memoized for performance
const CRTScanlines = memo(() => (
  <>
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.08] mix-blend-screen" style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        #00FF41 2px,
        #00FF41 4px
      )`,
    }} aria-hidden="true" />
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay" style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0,255,65,0.3) 3px,
        rgba(0,255,65,0.3) 6px
      )`,
    }} aria-hidden="true" />
    <div className="fixed inset-0 pointer-events-none z-50 opacity-30" style={{
      background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)`,
    }} aria-hidden="true" />
  </>
));
CRTScanlines.displayName = "CRTScanlines";

// HUD Grid Overlay - Memoized
const HUDGrid = memo(() => (
  <div className="absolute inset-0 pointer-events-none z-10 opacity-25" aria-hidden="true">
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id="testimonials-hud-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FF41" strokeWidth="0.5" opacity="0.4"/>
        </pattern>
        <pattern id="testimonials-hud-grid-small" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#00FF41" strokeWidth="0.3" opacity="0.2"/>
        </pattern>
        <linearGradient id="testimonials-grid-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF41" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#00FF41" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00FF41" stopOpacity="0.15" />
        </linearGradient>
        <filter id="testimonials-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#testimonials-hud-grid)" filter="url(#testimonials-glow)" />
      <rect width="100%" height="100%" fill="url(#testimonials-hud-grid-small)" />
      <rect width="100%" height="100%" fill="url(#testimonials-grid-glow)" />
    </svg>
  </div>
));
HUDGrid.displayName = "HUDGrid";

// CSS-only Data Stream - No JavaScript intervals for better performance
const DataStream = memo(({ delay, left, speed = 8 }: { delay: number; left: string; speed?: number }) => {
  const chars = useMemo(() => {
    const DATA_STREAM_CHARS = ['0', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0', '1', '1', '0'];
    return Array.from({ length: 20 }, () => 
      DATA_STREAM_CHARS[Math.floor(Math.random() * DATA_STREAM_CHARS.length)]
    );
  }, []);
  
  return (
    <div 
      className="absolute text-[#00FF41]/30 font-mono text-[10px] xs:text-xs sm:text-sm tracking-[0.2em] pointer-events-none select-none whitespace-nowrap"
      style={{ 
        left, 
        top: '-10%',
        animation: `testimonialDataStream ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
        textShadow: '0 0 5px rgba(0,255,65,0.4), 0 0 10px rgba(0,255,65,0.2)',
      }}
      aria-hidden="true"
    >
      {chars.join('')}
    </div>
  );
});
DataStream.displayName = "DataStream";

// Decorative Circles - Memoized
const DecorativeCircles = memo(() => (
  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[400px] h-[350px] sm:w-[600px] sm:h-[525px] md:w-[800px] md:h-[700px] opacity-10 sm:opacity-15 md:opacity-20 pointer-events-none z-0">
    <svg width="100%" height="100%" viewBox="0 0 800 700" fill="none">
      <circle cx="400" cy="350" r="240" fill="rgba(0,255,65,0.08)" />
      <circle cx="630" cy="150" r="100" fill="rgba(0,255,65,0.06)" />
      <circle cx="120" cy="480" r="70" fill="rgba(0,255,65,0.04)" />
    </svg>
  </div>
));
DecorativeCircles.displayName = "DecorativeCircles";

// Throttle function for performance
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Star Rating Component - Optimized and moved outside
const StarRating = memo(({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center justify-center gap-0.5 sm:gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
          i < rating
            ? "text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]"
            : "text-gray-600"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
));
StarRating.displayName = "StarRating";

// Testimonial Card Component - Optimized and moved outside
const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => (
  <figure className="relative h-full group min-h-[420px] sm:min-h-[480px] md:min-h-[500px]">
    {/* Enhanced HUD Card Container */}
    <div
      className="relative h-full p-5 sm:p-6 md:p-7 lg:p-8 bg-black/85 border border-[#00ff41]/30 backdrop-blur-md
      rounded-xl shadow-[0_0_30px_rgba(0,255,65,0.15),inset_0_0_40px_rgba(0,255,65,0.03)]
      transition-all duration-500 hover:border-[#00ff41]/70 hover:shadow-[0_0_50px_rgba(0,255,65,0.35)]
      hover:scale-[1.02] flex flex-col items-center text-center"
      style={{
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      }}
    >
      {/* HUD Corner Brackets - Enhanced */}
      <div className="absolute top-3 left-3 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#00ff41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-3 right-3 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#00ff41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 left-3 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#00ff41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 right-3 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#00ff41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Subtle Scanline overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41]/3 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_3s_linear_infinite] pointer-events-none rounded-xl" />

      {/* Enhanced Quote Mark */}
      <div className="absolute -top-3 sm:-top-4 md:-top-5 -left-2 sm:-left-3 text-[#00ff41]/15 text-7xl sm:text-8xl md:text-9xl font-bold leading-none select-none pointer-events-none group-hover:text-[#00ff41]/25 transition-colors duration-500" style={{ fontFamily: 'serif' }}>
        "
      </div>

      {/* Star Rating - Enhanced spacing */}
      <div className="mt-6 sm:mt-8 mb-4 sm:mb-5 relative z-10">
        <StarRating rating={5} />
      </div>

      {/* Enhanced Testimonial Text */}
      <blockquote className="mb-6 sm:mb-7 md:mb-8 relative z-10 flex-1 flex items-center px-3 sm:px-5">
        <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed font-light italic">
          {testimonial.comment}
        </p>
      </blockquote>

      {/* Enhanced Closing Quote */}
      <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -right-2 sm:-right-3 text-[#00ff41]/15 text-7xl sm:text-8xl md:text-9xl font-bold leading-none select-none pointer-events-none group-hover:text-[#00ff41]/25 transition-colors duration-500" style={{ fontFamily: 'serif' }}>
        "
      </div>

      {/* Enhanced Author Info */}
      <figcaption className="flex flex-col items-center mt-6 sm:mt-7 md:mt-8 relative z-10 w-full">
        {/* Enhanced Avatar with better glow */}
        <div className="relative mb-4 sm:mb-5">
          <div className="absolute inset-0 rounded-full bg-[#00ff41]/20 blur-xl animate-pulse-slow" />
          <div className="relative">
            <Image
              src={testimonial.image || "/images/testimonials/testimonials.png"}
              alt={testimonial.name}
              width={72}
              height={72}
              className="rounded-full border-2 border-[#00ff41]/60 shadow-[0_0_25px_rgba(0,255,65,0.4)] transition-all duration-500 group-hover:border-[#00ff41] group-hover:shadow-[0_0_40px_rgba(0,255,65,0.7)] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="font-mono font-bold text-[#00ff41] text-base sm:text-lg md:text-xl mb-2 transition-all duration-500 group-hover:text-[#00ff88] group-hover:drop-shadow-[0_0_15px_rgba(0,255,65,0.9)] px-3">
          {testimonial.name}
        </div>
        {testimonial.role && (
          <div className="font-mono text-gray-400 text-xs sm:text-sm md:text-base border-b border-[#00ff41]/30 pb-2 transition-all duration-500 group-hover:border-[#00ff41]/70 px-3 text-center max-w-[90%]">
            {testimonial.role}
          </div>
        )}
      </figcaption>
    </div>
  </figure>
));
TestimonialCard.displayName = "TestimonialCard";

const TestimonialsClient = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    comment: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const swiperRef = useRef<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Throttled mouse move handler using requestAnimationFrame for better performance
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 72,
          y: (e.clientY / window.innerHeight - 0.5) * 72,
        });
      }
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    const throttledHandler = throttle(handleMouseMove, 16); // ~60fps
    window.addEventListener("mousemove", throttledHandler);
    return () => {
      window.removeEventListener("mousemove", throttledHandler);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  // Fetch testimonials with loading state
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) {
          const text = await res.text().catch(() => null);
          if (process.env.NODE_ENV === 'development') {
            console.error(`API error: ${res.status}`, text);
          }
          setTestimonials([]);
          return;
        }
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          if (process.env.NODE_ENV === 'development') {
            console.error("Invalid content type:", contentType);
          }
          setTestimonials([]);
          return;
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.error("API did not return an array:", data);
          }
          setTestimonials([]);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Error fetching testimonials:", error);
        }
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2_000_000) { // 2MB max
      alert("File too large (max 2MB).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setFormData({ ...formData, image: reader.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: formData.image || "/images/testimonials/testimonials.png",
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        if (process.env.NODE_ENV === 'development') {
          console.error(`POST error (${res.status}):`, errorText);
        }
        alert("Failed to submit testimonial. Please try again.");
        return;
      }

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Invalid response content type:", contentType);
        }
        alert("Server error. Please try again.");
        return;
      }

      let data;
      try {
        data = await res.json();
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Failed to parse JSON response:", error);
        }
        alert("Server response error. Please try again.");
        return;
      }

      setTestimonials((prev) => [data, ...prev]);
      setFormData({ name: "", role: "", comment: "", image: "" });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Failed to submit testimonial:", error);
      }
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <Breadcrumb pageName="Testimonials" description="" />

      <section className="relative isolate overflow-hidden bg-[#000000] bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#050a08] px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 min-h-screen" suppressHydrationWarning>
        {/* Background Effects */}
        <CRTScanlines />
        <HUDGrid />
        
        {/* Animated Scanning Lines */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-50" style={{
            animation: 'scanLine 4s linear infinite',
            boxShadow: '0 0 15px #00FF41, 0 0 30px #00FF41, 0 0 45px rgba(0,255,65,0.3)',
            filter: 'blur(0.5px)'
          }}></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent opacity-40" style={{
            animation: 'scanLine 6s linear infinite',
            animationDelay: '2s',
            boxShadow: '0 0 8px #00FF41, 0 0 16px rgba(0,255,65,0.4)'
          }}></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-30" style={{
            animation: 'scanLine 8s linear infinite',
            animationDelay: '4s',
            boxShadow: '0 0 5px rgba(0,255,65,0.3)'
          }}></div>
        </div>
        
        {/* Optimized Data Streams - Reduced count for better performance */}
        <div suppressHydrationWarning>
          {mounted && [0, 1, 2, 3, 4].map((i) => (
            <DataStream 
              key={i} 
              delay={i * 1.2} 
              left={`${10 + i * 16}%`}
              speed={8 + (i % 2) * 2}
            />
          ))}
        </div>
        
        <DecorativeCircles />
        
        {/* Parallax Background Glows */}
        <div className="absolute left-[5%] top-[14%] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[radial-gradient(circle,rgba(0,255,65,0.15)_0%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform opacity-50 sm:opacity-75 md:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.45}px,${mousePosition.y * 0.41}px,0)` }} aria-hidden />
        <div className="absolute right-[10%] bottom-[5%] w-[190px] h-[120px] sm:w-[280px] sm:h-[180px] md:w-[380px] md:h-[240px] bg-[radial-gradient(circle,rgba(0,255,65,0.1)_0%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform opacity-50 sm:opacity-75 md:opacity-100" style={{ transform: `translate3d(${mousePosition.x * 0.19}px,${mousePosition.y * 0.08}px,0)` }} aria-hidden />

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#00ff41] via-[#00ff88] to-[#00ff41] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,65,0.5)] leading-tight">
              What Clients Say
            </h2>
            <div className="w-16 sm:w-24 md:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto mt-3 sm:mt-4 shadow-[0_0_10px_rgba(0,255,65,0.6)]" />
          </div>

          {/* Enhanced Submission Form - HUD Style */}
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-5 sm:p-7 md:p-9 lg:p-11 xl:p-12 mb-12 sm:mb-16 md:mb-20 relative group
            bg-black/75 border border-[#00ff41]/35 backdrop-blur-lg 
            rounded-xl shadow-[0_0_35px_rgba(0,255,65,0.18),inset_0_0_50px_rgba(0,255,65,0.04)]
            transition-all duration-500 hover:border-[#00ff41]/70 hover:shadow-[0_0_60px_rgba(0,255,65,0.45)]"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
            }}
          >
            {/* Enhanced HUD Corner Brackets */}
            <div className="absolute top-3 left-3 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-t-2 border-l-2 border-[#00ff41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-3 right-3 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-t-2 border-r-2 border-[#00ff41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-3 left-3 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-b-2 border-l-2 border-[#00ff41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-3 right-3 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-b-2 border-r-2 border-[#00ff41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Enhanced Scanline overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41]/4 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_3s_linear_infinite] pointer-events-none rounded-xl" />
            
            {/* Form Title */}
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00ff41] font-mono mb-2">
                [SUBMIT_TESTIMONIAL]
              </h3>
              <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-7 mb-5 sm:mb-6 md:mb-7">
              <div>
                <label htmlFor="name" className="mb-2.5 sm:mb-3 block text-xs sm:text-sm font-mono font-semibold text-[#00ff41] text-center sm:text-left tracking-wider">
                  [NAME] *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-[#00ff41]/35 bg-[#0a0f0a]/80 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 text-sm sm:text-base text-gray-100 font-mono
                      outline-none focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/40 
                      transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,255,65,0.4)] 
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  maxLength={50}
                />
              </div>

              <div>
                <label htmlFor="role" className="mb-2.5 sm:mb-3 block text-xs sm:text-sm font-mono font-semibold text-[#00ff41] text-center sm:text-left tracking-wider">
                  [ROLE/COMPANY]
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Enter your role or company"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-[#00ff41]/35 bg-[#0a0f0a]/80 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 text-sm sm:text-base text-gray-100 font-mono
                      outline-none focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/40 
                      transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,255,65,0.4)]
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  maxLength={50}
                />
              </div>
            </div>

            <div className="w-full mb-5 sm:mb-6 md:mb-7">
              <label htmlFor="image" className="mb-2.5 sm:mb-3 block text-xs sm:text-sm font-mono font-semibold text-[#00ff41] text-center tracking-wider">
                [UPLOAD IMAGE] <span className="text-gray-500 text-xs">(Optional, Max 2MB)</span>
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageChange}
                disabled={isSubmitting}
                className="block w-full text-xs sm:text-sm text-[#00ff41] border border-[#00ff41]/35 rounded-lg cursor-pointer bg-[#0a0f0a]/80 
                           file:mr-3 sm:file:mr-4 file:py-2 sm:file:py-2.5 file:px-3 sm:file:px-5 file:rounded-lg file:border-0 
                           file:text-xs sm:file:text-sm file:font-mono file:font-semibold file:bg-transparent file:text-[#00ff41] 
                           hover:file:bg-[#00ff41] hover:file:text-black px-3 sm:px-4 py-2 sm:py-2.5 transition-all duration-300
                           file:transition-all file:duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="w-full mb-6 sm:mb-7 md:mb-8">
              <label htmlFor="comment" className="mb-2.5 sm:mb-3 block text-xs sm:text-sm font-mono font-semibold text-[#00ff41] text-center tracking-wider">
                [COMMENT] *
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={5}
                placeholder="Share your experience..."
                value={formData.comment}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-[#00ff41]/35 bg-[#0a0f0a]/80 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 text-sm sm:text-base text-gray-100 font-mono
                      outline-none focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/40 
                      transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,255,65,0.4)] resize-none
                      disabled:opacity-50 disabled:cursor-not-allowed"
                required
                maxLength={500}
              ></textarea>
              <div className="mt-2 text-right">
                <span className="text-xs text-gray-500 font-mono">
                  {formData.comment.length}/500
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto mx-auto block rounded-lg bg-[#00ff41] px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 text-sm sm:text-base font-mono font-bold text-black 
              transition-all duration-300 ease-in-out hover:bg-transparent border-2 border-[#00ff41] hover:text-[#00ff41] 
              shadow-[0_0_25px_rgba(0,255,65,0.6)] hover:shadow-[0_0_40px_rgba(0,255,65,0.9)] hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "[SUBMITTING...]" : "[SUBMIT]"}
            </button>
          </form>

          {/* Enhanced Testimonials Carousel */}
          {isLoading ? (
            <div className="text-center py-16 sm:py-20 md:py-24 px-4">
              <div className="inline-block p-6 sm:p-8 border border-[#00ff41]/30 rounded-xl bg-black/40 backdrop-blur-sm">
                <div className="animate-pulse space-y-3">
                  <div className="w-8 h-8 border-2 border-[#00ff41] border-t-transparent rounded-full mx-auto animate-spin" />
                  <p className="text-[#00ff41] font-mono text-sm sm:text-base md:text-lg">[LOADING_TESTIMONIALS]</p>
                </div>
              </div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16 sm:py-20 md:py-24 px-4">
              <div className="inline-block p-6 sm:p-8 border border-[#00ff41]/30 rounded-xl bg-black/40 backdrop-blur-sm">
                <p className="text-gray-400 font-mono text-sm sm:text-base md:text-lg mb-3">[NO_TESTIMONIALS_FOUND]</p>
                <p className="text-gray-500 font-mono text-xs sm:text-sm">Be the first to leave a testimonial!</p>
              </div>
            </div>
          ) : (
            <div className="relative px-2 sm:px-4">
              <Swiper
                ref={swiperRef}
                className="!pb-12 sm:!pb-16 md:!pb-20"
                spaceBetween={16}
                slidesPerView={1}
                loop={testimonials.length >= 3}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Autoplay, Navigation, Pagination]}
                pagination={{
                  el: ".testimonials-pagination",
                  clickable: true,
                  bulletClass: "testimonial-bullet",
                  bulletActiveClass: "testimonial-bullet-active",
                }}
                breakpoints={{
                  480: { slidesPerView: 1, spaceBetween: 16 },
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 24 },
                  1280: { slidesPerView: 3, spaceBetween: 28 },
                }}
              >
                {testimonials.map((t) => (
                  <SwiperSlide key={t.id}>
                    <TestimonialCard testimonial={t} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Pagination Dots */}
              <div className="testimonials-pagination flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8 relative z-10" />

              {/* Enhanced Navigation Arrows */}
              <button
                onClick={() => swiperRef.current?.swiper?.slidePrev()}
                className="absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full 
                bg-black/85 border-2 border-[#00ff41]/50 backdrop-blur-md flex items-center justify-center
                transition-all duration-300 hover:border-[#00ff41] hover:bg-black/95 hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]
                active:scale-95 touch-manipulation group"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#00ff41] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => swiperRef.current?.swiper?.slideNext()}
                className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full 
                bg-black/85 border-2 border-[#00ff41]/50 backdrop-blur-md flex items-center justify-center
                transition-all duration-300 hover:border-[#00ff41] hover:bg-black/95 hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]
                active:scale-95 touch-manipulation group"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#00ff41] group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Custom Styles */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes testimonialDataStream {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 0.4; }
            90% { opacity: 0.4; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          @keyframes scanline {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          @keyframes scanLine {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .testimonial-bullet {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(0, 255, 65, 0.25);
            border: 2px solid rgba(0, 255, 65, 0.5);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            margin: 0 4px;
          }
          @media (min-width: 640px) {
            .testimonial-bullet {
              width: 12px;
              height: 12px;
              margin: 0 5px;
            }
          }
          .testimonial-bullet:hover {
            background: rgba(0, 255, 65, 0.6);
            border-color: rgba(0, 255, 65, 0.9);
            box-shadow: 0 0 12px rgba(0, 255, 65, 0.7);
            transform: scale(1.15);
          }
          .testimonial-bullet-active {
            background: #00ff41;
            border-color: #00ff41;
            box-shadow: 0 0 18px rgba(0, 255, 65, 0.9);
            transform: scale(1.25);
          }
          @media (max-width: 640px) {
            .testimonial-bullet-active {
              transform: scale(1.2);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes testimonialDataStream,
            @keyframes scanline,
            @keyframes scanLine {
              animation: none !important;
            }
            .testimonial-bullet,
            .testimonial-bullet-active {
              transition: none !important;
            }
          }
        `}} />
      </section>
    </>
  );
};

export default TestimonialsClient;