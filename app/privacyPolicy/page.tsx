
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
    <>
      <Breadcrumb pageName="Privacy Policy" description="" />

      <div
        ref={containerRef}
        className="particles-bg overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 
                   bg-gradient-to-b bg-gray-900/20 from-gray-950 via-mygreen/5 to-mygreen/5"
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
    </>
  );
};

export default PrivacyPolicy;
