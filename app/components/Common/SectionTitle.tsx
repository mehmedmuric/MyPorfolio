'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Naslov ulazak + glow pulse
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, textShadow: "0 0 0px #00ff99" },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          textShadow: "0 0 20px #00ff99, 0 0 40px #00ff99",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      // Blagi flicker/glow loop na naslov
      gsap.to(titleRef.current, {
        textShadow: "0 0 10px #00ff99, 0 0 25px #00ff99",
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        repeatDelay: 3,
      });

      // Paragraf ulazak sa malim delay
      gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full ${center ? "mx-auto text-center" : ""}`}
      style={{ maxWidth: width, marginBottom: mb }}
    >
      <h2
        ref={titleRef}
        className="mb-4 text-3xl font-bold !leading-tight text-white sm:text-4xl md:text-[45px]"
      >
        {title}
      </h2>
      <p
        ref={paragraphRef}
        className="text-base !leading-relaxed text-body-color md:text-lg"
      >
        {paragraph}
      </p>
    </div>
  );
};

export default SectionTitle;
