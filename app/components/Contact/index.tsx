"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_jt0dhte",
        "template_i0djgfp",
        form.current,
        "e3HwtEEiXF4PsfjEl"
      )
      .then(
        () => {
          setMessage("✅ Your message has been sent!");
          setIsSending(false);
          form.current?.reset();
        },
        (error) => {
          console.error("EmailJS error:", error);
          setMessage("❌ Failed to send message. Please try again.");
          setIsSending(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-20 lg:py-28 isolate px-6 sm:py-32 lg:px-8 
      bg-[#050505] bg-[radial-gradient(ellipse_at_top,_#0f3d2e_0%,_#020202_80%)]"
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0 opacity-[0.06] 
        bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
             linear-gradient(#00ff99_1px,transparent_1px)] 
        bg-[size:50px_50px]" />

      {/* Neon radial glows */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow" />
      <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.06),_transparent_70%)] blur-[120px]" />

      <div className="container mx-auto relative z-10">
        <SectionTitle
          title="Contact"
          paragraph="Let’s get in touch — I’ll respond as soon as possible."
          center
          mb="50px"
        />

        <div className="-mx-4 flex flex-wrap items-center justify-center">
          {/* Forma */}
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="relative bg-black/60 border border-green-500/40 backdrop-blur-md 
              rounded-2xl p-8 sm:p-12 shadow-[0_0_25px_2px_rgba(0,255,128,0.15)] 
              transition-all duration-300 hover:shadow-[0_0_40px_4px_rgba(0,255,128,0.25)]"
            >
              <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Send Me a Message
              </h2>
              <p className="mb-10 text-base font-light text-gray-300">
                Fill in your details and I’ll reply as soon as possible.
              </p>

              <form ref={form} onSubmit={sendEmail}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="user_name"
                      className="block mb-2 text-sm font-medium text-green-400"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-md border border-green-700/50 bg-[#0a0f0a] px-5 py-3 text-base text-gray-100 
                      outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="user_email"
                      className="block mb-2 text-sm font-medium text-green-400"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      placeholder="Enter your email"
                      className="w-full rounded-md border border-green-700/50 bg-[#0a0f0a] px-5 py-3 text-base text-gray-100 
                      outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500 transition"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-green-400"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Type your message..."
                    className="w-full rounded-md border border-green-700/50 bg-[#0a0f0a] px-5 py-3 text-base text-gray-100 
                    outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500 transition"
                  ></textarea>
                </div>

                <div className="mt-8 text-center">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="rounded-lg  px-12 py-4 font-semibold 
                     transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,128,0.45)]
                    bg-green-500 border border-green-500 text-black 
                    ease-in-out hover:bg-transparent
                    hover:text-green-500 shadow-[0_0_15px_rgba(0,255,128,0.4)]"
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>

                  {message && (
                    <p className="mt-4 text-sm text-gray-300">{message}</p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Slika */}
          <div className="w-full px-8 lg:w-5/12 xl:w-4/12 flex justify-center mt-10 lg:mt-0">
            <Image
              src="/images/contactus.svg"
              alt="contact illustration"
              width={600}
              height={480}
              className="drop-shadow-[0_0_25px_rgba(0,255,128,0.25)] animate-pulse-slow"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
