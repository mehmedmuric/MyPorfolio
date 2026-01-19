'use client';

import { useRef, useState, useEffect, memo, useMemo, useCallback } from "react";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Success and error icons with HUD styling
const SuccessIcon = () => (
  <svg className="inline w-5 h-5 mr-1 text-[#00FF41]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);
const ErrorIcon = () => (
  <svg className="inline w-5 h-5 mr-1 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
  </svg>
);

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  // Accessibility improvement: focus ref for status
  const messageStatusRef = useRef<HTMLParagraphElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized mouse parallax with throttling
  useEffect(() => {
    if (isReducedMotion) return;
    
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 25,
          y: (e.clientY / window.innerHeight - 0.5) * 25,
        });
        rafId = null;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email: string) =>
    !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/
      );

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // UX validation before sending
    if (
      !formData.user_name.trim() ||
      !formData.user_email.trim() ||
      !formData.message.trim()
    ) {
      setMessageType("error");
      setMessage("❌ Please fill in all required fields.");
      messageStatusRef.current?.focus();
      return;
    }

    if (!validateEmail(formData.user_email)) {
      setMessageType("error");
      setMessage("❌ Please enter a valid email address.");
      messageStatusRef.current?.focus();
      return;
    }

    setIsSending(true);
    setMessage(""); // Clear old

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_jt0dhte",
        "template_i0djgfp",
        formRef.current,
        "e3HwtEEiXF4PsfjEl"
      )
      .then(
        () => {
          setMessageType("success");
          setMessage("Your message has been sent! I'll reply shortly.");
          setIsSending(false);
          setFormData({ user_name: "", user_email: "", message: "" });
          formRef.current?.reset();
          setTimeout(() => setMessage(""), 7000); // Hide after 7s
        },
        (error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error("EmailJS error:", error);
          }
          setMessageType("error");
          setMessage(
            "Failed to send message. Please try again later or email me directly."
          );
          setIsSending(false);
          messageStatusRef.current?.focus();
        }
      );
  };

  // Optimized GSAP animations
  useEffect(() => {
    if (!sectionRef.current || isReducedMotion || typeof window === 'undefined') return;

    let ctx: gsap.Context | null = null;
    let timer: NodeJS.Timeout | null = null;

    const initAnimations = () => {
      if (!sectionRef.current) return;

      // Clean up any existing context
      if (ctx) {
        ctx.revert();
      }

      ctx = gsap.context(() => {
        // Title animation
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            {
              opacity: 0,
              y: 30,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // Section entrance animation
        if (sectionRef.current) {
          gsap.fromTo(
            sectionRef.current,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // Form card animation
        if (formCardRef.current) {
          gsap.fromTo(
            formCardRef.current,
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
              ease: 'power2.out',
              scrollTrigger: {
                trigger: formCardRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // Image animation
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
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
              ease: 'power2.out',
              scrollTrigger: {
                trigger: imageRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        // Subtle button pulse (only if not reduced motion)
        if (!isReducedMotion) {
          gsap.to(".contact-btn", {
            boxShadow: "0 0 30px rgba(0,255,65,0.4)",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      }, sectionRef);
    };

    // Delay initialization to ensure DOM is ready and refs are populated
    timer = setTimeout(() => {
      initAnimations();
    }, 150);

    return () => {
      if (timer) clearTimeout(timer);
      if (ctx) {
        ctx.revert();
        ctx = null;
      }
    };
  }, [isReducedMotion]);

  // Memoize particle arrays for performance
  const scanningLines = useMemo(() => [...Array(3)], []);
  const particles = useMemo(() => [...Array(isReducedMotion ? 5 : 10)], [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="contact-section relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 isolate px-4 sm:px-6 md:px-8 lg:px-8 bg-[#000000]"
      aria-label="Contact"
    >
      {/* Dark futuristic background with subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.03)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_0%,_rgba(0,255,65,0.01)_50%,_transparent_100%)]" />
      
      {/* Animated HUD Grid Pattern - reduced on mobile */}
      <div
        className="absolute inset-0 opacity-[0.06] sm:opacity-[0.08] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]"
        style={{ animation: isReducedMotion ? 'none' : 'hudGridMove 25s linear infinite' }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.03] sm:opacity-[0.04] bg-[linear-gradient(90deg,#00FF41_1px,transparent_1px),linear-gradient(#00FF41_1px,transparent_1px)] bg-[size:15px_15px] sm:bg-[size:20px_20px]"
        style={{ animation: isReducedMotion ? 'none' : 'hudGridMoveReverse 18s linear infinite' }}
        aria-hidden
      />
      
      {/* Animated scanning lines - lightweight, hidden on mobile */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
          {scanningLines.map((_, i) => (
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
      )}
      
      {/* Data stream particles - reduced on mobile */}
      {!isReducedMotion && (
        <div className="hidden sm:block">
          {particles.map((_, i) => (
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
        </div>
      )}
      
      {/* Floating HUD corner brackets - smaller on mobile */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-16 border-t-2 border-l-2 border-[#00FF41] opacity-30 sm:opacity-40" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite' }}
        aria-hidden 
      />
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-16 border-t-2 border-r-2 border-[#00FF41] opacity-30 sm:opacity-40" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite', animationDelay: '1s' }}
        aria-hidden 
      />
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-16 border-b-2 border-l-2 border-[#00FF41] opacity-30 sm:opacity-40" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite', animationDelay: '2s' }}
        aria-hidden 
      />
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-16 border-b-2 border-r-2 border-[#00FF41] opacity-30 sm:opacity-40" 
        style={{ animation: isReducedMotion ? 'none' : 'hud-float 3s ease-in-out infinite', animationDelay: '1.5s' }}
        aria-hidden 
      />
      
      {/* HUD Status Lines - hidden on mobile */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-8 w-16 sm:w-32 h-[1px] bg-[#00FF41] opacity-20 sm:opacity-30 hidden sm:block" aria-hidden />
      <div className="absolute top-16 sm:top-20 left-4 sm:left-8 w-[1px] h-6 sm:h-8 bg-[#00FF41] opacity-20 sm:opacity-30 hidden sm:block" aria-hidden />
      <div className="absolute top-16 sm:top-20 right-4 sm:right-8 w-16 sm:w-32 h-[1px] bg-[#00FF41] opacity-20 sm:opacity-30 hidden sm:block" aria-hidden />
      <div className="absolute top-16 sm:top-20 right-4 sm:right-8 w-[1px] h-6 sm:h-8 bg-[#00FF41] opacity-20 sm:opacity-30 hidden sm:block" aria-hidden />
      
      {/* HUD Info Panels - hidden on mobile */}
      <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-8 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/60 border border-[#00FF41]/30 font-mono text-[#00FF41]/60 text-[8px] sm:text-[10px] tracking-wider backdrop-blur-sm hidden sm:block" aria-hidden>
        <span className="text-[#00FF41]">[CONTACT_ACTIVE]</span>
      </div>
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/60 border border-[#00FF41]/30 font-mono text-[#00FF41]/60 text-[8px] sm:text-[10px] tracking-wider backdrop-blur-sm hidden sm:block" aria-hidden>
        <span className="text-[#00FF41]">[FORM_READY]</span>
      </div>
      
      {/* Glowing orbs for depth with mouse parallax - reduced on mobile */}
      {!isReducedMotion && (
        <>
          <div
            className="absolute -inset-20 sm:-inset-40 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.12)_0%,_rgba(0,255,65,0.15)_50%,_transparent_70%)] blur-2xl sm:blur-3xl transition-transform duration-1000 will-change-transform"
            style={{
              transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.18}px)`,
            }}
            aria-hidden
          />
          <div
            className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.06)_0%,_rgba(0,255,65,0.08)_50%,_transparent_70%)] blur-[80px] sm:blur-[120px] transition-transform duration-1000 will-change-transform"
            style={{
              transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * 0.1}px)`,
            }}
            aria-hidden
          />
        </>
      )}

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section title with HUD styling */}
        <div ref={titleRef} className="relative mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
          {/* HUD Panel behind title */}
          <div className="absolute inset-0 -inset-x-2 sm:-inset-x-4 md:-inset-x-8 bg-black/40 border border-[#00FF41]/30 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.15)] sm:shadow-[0_0_20px_rgba(0,255,65,0.2)]" />
          <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-[#00FF41] opacity-50 sm:opacity-60" />
          <div className="relative px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 contact-title">
            <SectionTitle
              title="Contact"
              paragraph="Let's get in touch — I respond to every message within a day."
              center
              mb="0px"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start justify-center">
          {/* Form */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <div
              ref={formCardRef}
              className="contact-form-card group relative transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] will-change-transform"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '2px solid rgba(0, 255, 65, 0.3)',
                boxShadow: '0 0 25px rgba(0, 255, 65, 0.2), inset 0 0 30px rgba(0, 255, 65, 0.05)',
                backdropFilter: 'blur(8px)',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                padding: '2rem 1.5rem'
              }}
              onMouseEnter={(e) => {
                if (!isReducedMotion) {
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 65, 0.6), inset 0 0 40px rgba(0, 255, 65, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 1)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.2), inset 0 0 30px rgba(0, 255, 65, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              }}
            >
              {/* HUD Corner Brackets */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              
              {/* HUD Status Indicator */}
              <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 border border-[#00FF41]/40 font-mono text-[8px] text-[#00FF41]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 backdrop-blur-sm hidden sm:block"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                  boxShadow: '0 0 10px rgba(0, 255, 65, 0.3)'
                }}
              >
                <span className="text-[#00FF41]">[FORM_ACTIVE]</span>
              </div>
              
              {/* Scanning line effect */}
              {!isReducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudCardScan transition-opacity duration-300 pointer-events-none" />
              )}

              <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="mb-6 sm:mb-8">
                  <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-white font-mono flex items-center gap-2">
                    <span className="text-[#00FF41]">▶</span>
                    Send Me a Message
                  </h2>
                  <p className="text-sm sm:text-base font-light text-gray-300 leading-relaxed">
                    Fill in your details and I'll reply as soon as possible.<br className="hidden sm:inline" /> 
                    <span className="text-[#00FF41]/80"> Get direct support from me — not a chatbot!</span>
                  </p>
                </div>

              <form ref={formRef} onSubmit={sendEmail} autoComplete="off" aria-label="Contact form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="user_name" className="block mb-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00FF41] font-mono">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      minLength={2}
                      maxLength={96}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-gray-200 font-mono bg-black/60 border-2 border-[#00FF41]/30 focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41]/50 transition-all duration-300 outline-none"
                      style={{
                        clipPath: 'polygon(3px 0, 100% 0, 100% 100%, 0 100%, 0 3px)',
                        boxShadow: 'inset 0 0 10px rgba(0, 255, 65, 0.05)'
                      }}
                      value={formData.user_name}
                      onChange={handleInput}
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label htmlFor="user_email" className="block mb-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00FF41] font-mono">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      minLength={4}
                      maxLength={96}
                      placeholder="you@email.com"
                      className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-gray-200 font-mono bg-black/60 border-2 border-[#00FF41]/30 focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41]/50 transition-all duration-300 outline-none"
                      style={{
                        clipPath: 'polygon(3px 0, 100% 0, 100% 100%, 0 100%, 0 3px)',
                        boxShadow: 'inset 0 0 10px rgba(0, 255, 65, 0.05)'
                      }}
                      value={formData.user_email}
                      onChange={handleInput}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <label htmlFor="message" className="block mb-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00FF41] font-mono">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    minLength={4}
                    maxLength={1800}
                    placeholder="How can I help you?"
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-gray-200 font-mono bg-black/60 border-2 border-[#00FF41]/30 focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41]/50 transition-all duration-300 outline-none resize-none"
                    style={{
                      clipPath: 'polygon(3px 0, 100% 0, 100% 100%, 0 100%, 0 3px)',
                      boxShadow: 'inset 0 0 10px rgba(0, 255, 65, 0.05)'
                    }}
                    value={formData.message}
                    onChange={handleInput}
                    aria-describedby="contact-message-desc"
                  ></textarea>
                  <p id="contact-message-desc" className="text-xs text-gray-400 mt-1.5 font-mono">
                    Please describe your idea, question, or project!
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 text-center flex flex-col items-center gap-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="contact-btn group/btn relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 border-2 font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00FF41]/80 focus:ring-offset-2 focus:ring-offset-black overflow-hidden text-xs sm:text-sm md:text-base min-h-[44px] sm:min-h-[48px] touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: 'rgba(0, 255, 65, 0.1)',
                      borderColor: '#00FF41',
                      color: '#00FF41',
                      boxShadow: '0 0 20px rgba(0, 255, 65, 0.4), inset 0 0 20px rgba(0, 255, 65, 0.05)',
                      clipPath: 'polygon(4px 0, 100% 0, 100% 100%, 0 100%, 0 4px)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isReducedMotion && !isSending) {
                        e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 255, 65, 0.8), inset 0 0 30px rgba(0, 255, 65, 0.1)';
                        e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.4), inset 0 0 20px rgba(0, 255, 65, 0.05)';
                      e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                    }}
                  >
                    {/* Button corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FF41]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                    {/* Button scanning line effect */}
                    {!isReducedMotion && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-hudButtonScan transition-opacity duration-200 pointer-events-none" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {isSending ? (
                        <>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="#00FF41"
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray="62.8"
                              strokeDashoffset="10"
                            />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[#00FF41]/60">▶</span>
                          <span>Send Message</span>
                          <span className="text-[#00FF41]/60">◀</span>
                        </>
                      )}
                    </span>
                  </button>
                  {message && (
                    <p
                      ref={messageStatusRef}
                      className={`mt-3 text-xs sm:text-sm transition-colors duration-300 font-mono ${
                        messageType === "success"
                          ? "text-[#00FF41] font-semibold"
                          : "text-red-400 font-semibold"
                      }`}
                      tabIndex={-1}
                      aria-live="polite"
                    >
                      {messageType === "success" ? <SuccessIcon /> : <ErrorIcon />}
                      {message}
                    </p>
                  )}
                </div>
              </form>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#00FF41]/10">
                <div className="text-[10px] sm:text-xs text-gray-400 text-center max-w-xl mx-auto flex flex-col items-center gap-2 font-mono">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-[#00FF41]/20 rounded-sm">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00FF41]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    All messages are encrypted in transit via EmailJS
                  </span>
                </div>
              </div>
              
              {/* HUD Bottom Status Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Contact Information Cards - Modern Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {/* Email Card */}
              <a
                href="mailto:mehmedmuric22@gmail.com"
                className="group/contact relative p-4 sm:p-5 bg-black/60 border-2 border-[#00FF41]/30 hover:border-[#00FF41] hover:bg-black/80 transition-all duration-300 outline-none focus:ring-2 focus:ring-[#00FF41]/50"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  boxShadow: '0 0 15px rgba(0, 255, 65, 0.1), inset 0 0 20px rgba(0, 255, 65, 0.02)'
                }}
                onMouseEnter={(e) => {
                  if (!isReducedMotion) {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.4), inset 0 0 30px rgba(0, 255, 65, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.1), inset 0 0 20px rgba(0, 255, 65, 0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#00FF41]/50 opacity-0 group-hover/contact:opacity-100 transition-opacity duration-200" />
                <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#00FF41]/50 opacity-0 group-hover/contact:opacity-100 transition-opacity duration-200" />
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF41]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <div className="absolute inset-0 bg-[#00FF41]/20 blur-md opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#00FF41]/70 mb-0.5">Email</div>
                    <div className="text-xs sm:text-sm font-mono text-gray-200 truncate group-hover/contact:text-[#00FF41] transition-colors">
                      mehmedmuric22@gmail.com
                    </div>
                  </div>
                </div>
              </a>

              {/* Response Time Card */}
              <div
                className="relative p-4 sm:p-5 bg-black/60 border-2 border-[#00FF41]/30"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  boxShadow: '0 0 15px rgba(0, 255, 65, 0.1), inset 0 0 20px rgba(0, 255, 65, 0.02)'
                }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF41]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#00FF41]/70 mb-0.5">Response</div>
                    <div className="text-xs sm:text-sm font-mono text-gray-200">
                      Within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links - Modern HUD Style */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#00FF41]/20">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#00FF41]/70 mb-4 text-center">
                Connect On Social Media
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/mehmed-muric/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social relative inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black/60 border-2 border-[#00FF41]/30 hover:border-[#00FF41] hover:bg-black/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FF41]/50"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                    boxShadow: '0 0 10px rgba(0, 255, 65, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isReducedMotion) {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                  aria-label="Visit my LinkedIn profile"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF41] group-hover/social:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <div className="absolute inset-0 bg-[#00FF41]/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/MehmedMuric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social relative inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black/60 border-2 border-[#00FF41]/30 hover:border-[#00FF41] hover:bg-black/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FF41]/50"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                    boxShadow: '0 0 10px rgba(0, 255, 65, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isReducedMotion) {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                  aria-label="Visit my GitHub profile"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF41] group-hover/social:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div className="absolute inset-0 bg-[#00FF41]/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div
            ref={imageRef}
            className="w-full lg:w-1/2 flex justify-center lg:sticky lg:top-24"
            aria-label="Contact illustration"
          >
            <div className="relative aspect-[6/5] w-full max-w-[380px] sm:max-w-[420px] group will-change-transform"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
              }}
            >
              {/* HUD Corner Brackets */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#00FF41]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />
              
              {/* HUD Border */}
              <div className="absolute inset-0 border-2 border-[#00FF41]/30 bg-black/70 backdrop-blur-sm group-hover:border-[#00FF41] group-hover:shadow-[0_0_30px_rgba(0,255,65,0.6),inset_0_0_20px_rgba(0,255,65,0.1)] transition-all duration-300" />
              
              {/* Scanning line effect */}
              {!isReducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hudCardScan transition-opacity duration-300 pointer-events-none" />
              )}
              
              {/* Inner container */}
              <div className="relative rounded-2xl p-3 sm:p-4 m-2 overflow-hidden">
                {/* Pulsing inner glow */}
                {!isReducedMotion && (
                  <div className="absolute inset-0 rounded-2xl bg-[#00FF41]/20 blur-2xl opacity-30 sm:opacity-40 animate-pulse pointer-events-none" />
                )}
                {/* Floating particles effect */}
                {!isReducedMotion && (
                  <>
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00FF41]/40 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }} />
                    <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-[#00FF41]/30 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }} />
                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#00FF41]/50 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '2.5s' }} />
                  </>
                )}
                <Image
                  src="/images/contactus.svg"
                  alt="contact illustration"
                  width={600}
                  height={480}
                  priority
                  className="relative z-10 w-full h-auto drop-shadow-[0_0_30px_rgba(0,255,65,0.2)] sm:drop-shadow-[0_0_50px_rgba(0,255,65,0.25)] group-hover:drop-shadow-[0_0_60px_rgba(0,255,65,0.3)] sm:group-hover:drop-shadow-[0_0_70px_rgba(0,255,65,0.35)] transition-all duration-500 group-hover:scale-[1.01] sm:group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 420px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
