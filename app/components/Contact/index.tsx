'use client';

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Optional: Success and error icons (for improved feedback UX)
const SuccessIcon = () => (
  <svg className="inline w-5 h-5 mr-1 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);
const ErrorIcon = () => (
  <svg className="inline w-5 h-5 mr-1 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  // Accessibility improvement: focus ref for status
  const messageStatusRef = useRef<HTMLParagraphElement>(null);

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
          console.error("EmailJS error:", error);
          setMessageType("error");
          setMessage(
            "Failed to send message. Please try again later or email me directly."
          );
          setIsSending(false);
          messageStatusRef.current?.focus();
        }
      );
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section fade in
      gsap.from(".contact-section", {
        opacity: 0,
        y: 100,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 85%",
        },
      });

      // Title animation
      gsap.from(".contact-title", {
        opacity: 0,
        y: 40,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 85%",
        },
      });

      // Form card float in
      gsap.from(".contact-form-card", {
        opacity: 0,
        y: 64,
        scale: 0.98,
        duration: 1.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
      });

      // Image pop
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 60, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Subtle button pulse
      gsap.to(".contact-btn", {
        boxShadow: "0 0 42px 7px rgba(0,255,128,0.27)",
        duration: 1.33,
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="contact-section relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8
        bg-[#041005] bg-[radial-gradient(ellipse_at_top,_#09381e_0%,_#020402_82%)]"
      aria-label="Contact"
    >
      {/* Neon cyber grid */}
      <div className="absolute inset-0 opacity-[0.065]
        bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),linear-gradient(#00ff99_1px,transparent_1px)]
        bg-[size:48px_48px]" />
      {/* Neon radial glows */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_70%_40%,_rgba(0,255,128,0.14),_transparent_60%)] blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute -inset-64 bg-[radial-gradient(circle_at_10%_88%,_rgba(0,255,128,0.09),_transparent_70%)] blur-[130px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="contact-title">
          <SectionTitle
            title="Contact"
            paragraph="Let’s get in touch — I respond to every message within a day."
            center
            mb="50px"
          />
        </div>

        <div className="-mx-4 flex flex-wrap items-center justify-center">
          {/* Form */}
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="contact-form-card relative bg-black/70 border border-mygreen/25 backdrop-blur-md
              rounded-2xl p-8 sm:p-12 shadow-[0_0_30px_2px_rgba(0,255,128,0.18)]
              transition-all duration-300 hover:shadow-[0_0_55px_7px_rgba(0,255,128,0.23)]"
            >
              <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Send Me a Message
              </h2>
              <p className="mb-10 text-base font-light text-gray-300">
                Fill in your details and I’ll reply as soon as possible.<br className="hidden sm:inline" /> Get direct support from me — not a chatbot!
              </p>

              <form ref={formRef} onSubmit={sendEmail} autoComplete="off" aria-label="Contact form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-mygreen">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      minLength={2}
                      maxLength={96}
                      placeholder="e.g. Jane Doe"
                      className="w-full rounded-md border border-mygreen/25 bg-[#0a1e15] px-5 py-3 text-base text-gray-100
                        outline-none focus:border-mygreen focus:ring-1 focus:ring-mygreen transition shadow-sm"
                      value={formData.user_name}
                      onChange={handleInput}
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label htmlFor="user_email" className="block mb-2 text-sm font-medium text-mygreen">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      minLength={4}
                      maxLength={96}
                      placeholder="you@email.com"
                      className="w-full rounded-md border border-mygreen/25 bg-[#0a1e15] px-5 py-3 text-base text-gray-100
                        outline-none focus:border-mygreen focus:ring-1 focus:ring-mygreen transition shadow-sm"
                      value={formData.user_email}
                      onChange={handleInput}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-mygreen">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    minLength={4}
                    maxLength={1800}
                    placeholder="How can I help you?"
                    className="w-full rounded-md border border-mygreen/25 bg-[#0a1e15] px-5 py-3 text-base text-gray-100
                      outline-none focus:border-mygreen focus:ring-1 focus:ring-mygreen transition shadow resize-none"
                    value={formData.message}
                    onChange={handleInput}
                    aria-describedby="contact-message-desc"
                  ></textarea>
                  <p id="contact-message-desc" className="text-xs text-gray-400 mt-1">
                    Please describe your idea, question, or project!
                  </p>
                </div>

                <div className="mt-8 text-center flex flex-col items-center gap-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="contact-btn rounded-lg px-12 py-4 font-semibold text-base
                      transition-all duration-200
                      bg-mygreen border border-mygreen text-black
                      hover:bg-transparent hover:text-mygreen
                      shadow-[0_0_15px_rgba(0,255,128,0.33)] hover:shadow-[0_0_50px_rgba(0,255,128,0.47)]
                      focus:outline-none focus:ring-2 focus:ring-mygreen/65 focus:ring-offset-2"
                  >
                    {isSending ? (
                      <span className="flex items-center gap-2 justify-center">
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#00ff93"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="62.8"
                            strokeDashoffset="10"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>Send Message</>
                    )}
                  </button>
                  {message && (
                    <p
                      ref={messageStatusRef}
                      className={`mt-3 text-sm transition-colors duration-300 ${
                        messageType === "success"
                          ? "text-mygreen font-semibold"
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

              <div className="mt-10 pb-1 text-xs text-gray-400 text-center max-w-xl mx-auto flex">
                <span className="inline-flex items-center gap-1">
                  <svg className="inline w-6 h-6 text-mygreen mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity=".27"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
                  All messages are encrypted in transit via EmailJS.
                </span>
                <span className="ml-2 mt-2">
                  You may alternatively email me at <a href="mailto:mehmedmuric22@gmail.com" className="underline text-mygreen font-semibold hover:text-mygreen/80 transition">mehmedmuric22@gmail.com</a>
                </span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div
            ref={imageRef}
            className="w-full px-8 lg:w-5/12 xl:w-4/12 flex justify-center mt-10 lg:mt-0"
            aria-label="Contact illustration"
          >
            <div className="relative aspect-[6/5] w-full max-w-[420px] rounded-3xl border-4 border-mygreen/15 shadow-2xl shadow-mygreen/10 bg-gradient-to-tr from-mygreen/10 via-transparent to-mygreen/5 overflow-hidden">
              <div className="absolute inset-0 blur-[66px] opacity-30 bg-mygreen/35 animate-pulse pointer-events-none rounded-3xl" />
              <Image
                src="/images/contactus.svg"
                alt="contact illustration"
                width={600}
                height={480}
                priority
                className="relative z-10 w-full h-auto drop-shadow-[0_0_35px_rgba(0,255,128,0.23)] hover:scale-105 transition-all duration-400"
                sizes="(max-width: 600px) 88vw, 420px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
