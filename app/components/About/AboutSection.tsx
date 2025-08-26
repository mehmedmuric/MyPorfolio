'use client'

import Image from "next/image";
import useScrollAnimations from "@/app/hooks/useScrollAnimations";

const AboutSection = () => {
  useScrollAnimations();
  return (
    <section className="py-16 md:py-24 lg:py-28 opacity-0" data-animate="text-focus-in">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/aboutsection.svg"
                alt="about image"
                fill
                className="drop-shadow-none"
              />
              
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-4">
                <h3 className=" mb-4 text-xl underline underline-offset-8 decoration-mygreen font-bold text-gray-400 sm:text-2xl lg:text-xl xl:text-2xl">
                  Customer Support for All Clients
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  I approach every project with a long-term vision, which includes full technical support even after delivery. Whether it’s a web or mobile application, clients can rely on me for troubleshooting, regular updates, and feature improvements.
                </p>
              </div>
              <div className="mb-9">
                <h3 className=" mb-4 text-xl underline underline-offset-8 decoration-mygreen font-bold text-gray-400 sm:text-2xl lg:text-xl xl:text-2xl">
                  Building Modern and Fast Applications
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  I focus on developing applications that are not only visually appealing but also optimized for speed and performance. Every line of code is carefully written to provide the best user experience without compromising quality.
                </p>
              </div>
              <div className="mb-1">
                <h3 className=" mb-4 text-xl underline underline-offset-8 decoration-mygreen font-bold text-gray-400 sm:text-2xl lg:text-xl xl:text-2xl">
                  Flexible, Custom Solutions
                </h3>
                <p className="text-base font-light leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Every client has unique needs, which is why I develop each project in a tailored way—from design to functionality. My goal is to ensure that each solution fully aligns with the client’s business objectives while allowing for easy future scalability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
