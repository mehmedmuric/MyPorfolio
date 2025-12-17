
"use client"

import { use, useEffect, useRef } from "react";
import Breadcrumb from "../components/Common/Breadcrumb";
import gsap from "gsap";


const PrivacyPolicy = () => {
    const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll("section, h1, p, ul, li");

      gsap.from(sections, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] bg-gradient-to-b from-[#0f1419] via-[#000000] to-[#051912] overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Animated Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scanLine" />
      </div>

      {/* Enhanced Parallax Background with Cyberpunk Glow */}
      <div className="absolute left-[5%] top-[14%] w-96 h-96 bg-[radial-gradient(circle,rgba(0,255,140,0.3)_0%,rgba(0,255,200,0.15)_40%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform animate-pulse" aria-hidden />
      <div className="absolute right-[10%] bottom-[5%] w-[380px] h-[240px] bg-[radial-gradient(circle,rgba(0,200,255,0.2)_0%,rgba(100,200,255,0.1)_40%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform" aria-hidden />
      
      {/* Cyberpunk Neon Accents */}
      <div className="absolute top-20 left-10 w-2 h-32 bg-gradient-to-b from-green-400 to-transparent opacity-60 blur-sm animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-60 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-20">
        <Breadcrumb pageName="Privacy Policy" description="Your privacy is important. This page explains what information may be collected while using my portfolio website and how it is used." />

        <div
          ref={containerRef}
          className="particles-bg overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 
                     bg-gradient-to-b bg-gray-900/30 from-gray-950/80 via-mygreen/5 to-mygreen/5 max-w-4xl mx-auto rounded-3xl border border-green-500/10 shadow-[0_0_40px_rgba(0,255,128,0.1)] backdrop-blur-sm"
        >
        <h1 className="text-3xl font-bold tracking-tight mb-6 underline underline-offset-[12px] decoration-mygreen">
          Privacy Policy
        </h1>

        <p className="text-body-color mb-8">
          Your privacy is important. This page explains what information may be collected while using
          my portfolio website and how it is used.
        </p>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">
            Information Collection
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              <span className="font-medium text-body-color">Personal Data</span> – Collected only if you voluntarily
              provide it via the contact form (name, email, message).
            </li>
            <li>
              <span className="font-medium text-body-color">Automatic Data</span> – Like most websites, this portfolio
              may use basic analytics tools (e.g., Google Analytics) that collect anonymous information
              such as IP address, browser type, and time of visit.
            </li>
          </ul>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Use of Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-body-color">
            <li>To respond to messages sent through the contact form.</li>
            <li>To understand how visitors use the site and improve its content and functionality.</li>
          </ul>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Data Sharing</h2>
          <p className="text-body-color">
            Your personal data is <span className="font-medium">not shared</span> with third parties and
            is not used for marketing purposes.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Cookies</h2>
          <p className="text-body-color">
            This website may use cookies for basic functionality and analytics. You can disable cookies
            in your browser settings at any time.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Security</h2>
          <p className="text-body-color">
            Reasonable measures are taken to protect your data, but please note that no internet
            transmission is 100% secure.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Your Rights</h2>
          <p className="text-body-color">
            You may request the deletion of any personal information you submitted via the contact
            form at any time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold underline underline-offset-8 decoration-mygreen">Contact</h2>
          <p className="text-body-color">
            For any privacy-related questions, feel free to contact me via the email address provided
            on this website.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
