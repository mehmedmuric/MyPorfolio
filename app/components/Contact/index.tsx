"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

const Contact = () => {
  useScrollAnimations();
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
    <section id="contact" className="overflow-hidden py-24 md:py-20 lg:py-28 isolate bg-gray-900 px-6 sm:py-32 lg:px-8">

      
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Contact"
          paragraph="Feel free to reach out via the form below."
          center
          mb="50px"
        />
        <div className="-mx-4 flex flex-wrap opacity-0" data-animate="slide-in-left">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="wow fadeInUp shadow-three bg-gray-900 border border-green-600 mb-12 rounded-lg px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Contact Me
              </h2>
              <p className="mb-12 text-base font-medium text-gray-300">
                I’ll reach out to you via email as soon as possible.
              </p>
              <form ref={form} onSubmit={sendEmail}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="name" className="mb-3 block text-sm font-medium text-white">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        required
                        defaultValue=""
                        placeholder="Enter your name"
                        className="w-full rounded-sm border border-gray-700 bg-gray-800 px-6 py-3 text-base text-white outline-none focus:border-green-600"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="email" className="mb-3 block text-sm font-medium text-white">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        required
                        defaultValue=""
                        placeholder="Enter your email"
                        className="w-full rounded-sm border border-gray-700 bg-gray-800 px-6 py-3 text-base text-white outline-none focus:border-green-600"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label htmlFor="message" className="mb-3 block text-sm font-medium text-white">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        defaultValue=""
                        placeholder="Enter your message"
                        className="w-full rounded-sm border border-gray-700 bg-gray-800 px-6 py-3 text-base text-white outline-none focus:border-green-600"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4 text-center">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="rounded-lg bg-green-600 px-16 py-4 text-base font-medium text-white duration-300 hover:bg-transparent border border-green-600 hover:text-green-600"
                    >
                      {isSending ? "Sending..." : "Send"}
                    </button>
                  </div>
                  {message && (
                    <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-8 lg:w-5/12 xl:w-4/12">
            <Image
              src="/images/contactus.svg"
              alt="contact img"
              width={700}
              height={550}
              className="mt-12 sm:mt-16 md:mt-24 mx-auto max-w-[250px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-full"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
