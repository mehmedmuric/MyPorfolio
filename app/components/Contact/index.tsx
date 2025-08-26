"use client";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const Contact = () => {
  useScrollAnimations();
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
      <SectionTitle
          title="Contact"
          paragraph="-----------------"
          center
          mb="80px"
        />
        <div className="-mx-4 flex flex-wrap opacity-0" data-animate="slide-in-left">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp shadow-three bg-gray-dark border border-mygreen mb-12 rounded-lg px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Contact Me 
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                I’ll reach out to you via email as soon as possible.
              </p>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="border-stroke text-body-color-dark dark:shadow-two w-full rounded-sm border px-6 py-3 text-base  outline-none focus:border-[#4CAF50] border-transparent bg-[#2C303B] focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="border-stroke text-body-color-dark dark:shadow-two w-full rounded-sm border px-6 py-3 text-base  outline-none focus:border-[#4CAF50] border-transparent bg-[#2C303B] focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        className="border-stroke text-body-color-dark dark:shadow-two w-full overflow-hidden rounded-sm border px-6 py-3 text-base  outline-none focus:border-[#4CAF50] border-transparent bg-[#2C303B] focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4 text-center">
                    <button className="shadow-submit dark:shadow-submit-dark rounded-lg bg-mygreen px-16 py-4 text-base font-medium text-white duration-300 hover:bg-transparent border border-mygreen hover:text-mygreen">
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-6 lg:w-5/12 xl:w-4/12">
          <Image
            src="/images/contactus.svg"
            alt="contact img"
            width={700}
            height={550}
            className="mt-24 ml-6"
          />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

