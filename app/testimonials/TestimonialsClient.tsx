"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "../components/Common/Breadcrumb";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  comment: string;
  image?: string;
}

const TestimonialsClient = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    comment: "",
    image: "",
  });

  // Fetch testimonials
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          console.error("API nije vratio niz:", data);
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Greška pri fetchovanju:", error);
        setTestimonials([]);
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
    if (!formData.name || !formData.comment) return;

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: formData.image || "/images/testimonials/testimonials.png",
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        console.error("API nije vratio JSON:", await res.text());
        return;
      }

      if (res.ok) {
        setTestimonials([data, ...testimonials]);
        setFormData({ name: "", role: "", comment: "", image: "" });
      } else {
        console.error("Greška sa API-jem:", data);
      }
    } catch (error) {
      console.error("Failed to submit testimonial:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Testimonials" description="" />

      <section className="relative isolate overflow-hidden bg-gray-900/50 px-6 py-12 sm:py-16 lg:px-8 particles-bg bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5">
        {/* Cyber grid background */}
        <div className="absolute inset-0 opacity-[0.06] 
          bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
               linear-gradient(#00ff99_1px,transparent_1px)] 
          bg-[size:50px_50px]" />

        {/* Neon radial glows */}
        <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow" />
        <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.06),_transparent_70%)] blur-[120px]" />

        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-10">
            What Clients Say
          </h2>

          {/* Forma */}
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-6 flex flex-col items-center gap-6 mb-12
            bg-black/60 border border-green-500/40 backdrop-blur-md 
            rounded-2xl  sm:p-12 shadow-[0_0_25px_2px_rgba(0,255,128,0.15)] 
            transition-all duration-300 hover:shadow-[0_0_40px_4px_rgba(0,255,128,0.25)]"
          >
            <div className="w-full grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-center sm:text-left text-green-400">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-green-700/50 bg-[#0a0f0a] px-5 py-3 text-base text-gray-100 
                      outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500 transition"
                  required
                  maxLength={22}
                />
              </div>

              <div>
                <label htmlFor="role" className="mb-2 block text-sm font-medium text-green-400 text-center sm:text-left">
                  Role / Company
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Enter your role or company"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-md border border-green-700/50 bg-[#0a0f0a] px-5 py-3 text-base text-gray-100 
                      outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500 transition"
                  maxLength={22}
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="image" className="mb-2 block text-sm font-medium text-green-400 text-center">
                Upload Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageChange}
                className="block w-full text-sm text-mygreen border border-mygreen/50 rounded-md cursor-pointer bg-[#0a0f0a] 
                           file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                           file:text-sm file:font-semibold file:bg-transparent file:text-mygreen 
                           hover:file:bg-mygreen hover:file:text-white px-4 py-2 transition "
              />
            </div>

            <div className="w-full">
              <label htmlFor="comment" className="mb-2 block text-sm font-medium text-green-400 text-center">
                Your Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                placeholder="Enter your comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full rounded-md border border-green-700/50 bg-[#0a0f0a] px-5 py-3 text-base text-gray-100 
                      outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500 transition"
                required
                maxLength={250}
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-lg bg-mygreen px-10 py-3 text-base font-semibold text-black transition
              duration-300 ease-in-out hover:bg-transparent border border-green-500 hover:text-green-500 shadow-[0_0_15px_rgba(0,255,128,0.4)]"
            >
              Submit
            </button>
          </form>

          {/* Testimonial kartice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(testimonials) &&
              testimonials.map((t) => (
                <figure
                  key={t.id}
                  className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-mygreen/40 transition duration-300 flex flex-col items-center text-center border border-mygreen/50 hover:border-mygreen"
                >
                  <blockquote className="mb-6">
                    <p className="text-gray-300 text-sm sm:text-base">“{t.comment}”</p>
                  </blockquote>
                  <figcaption className="flex flex-col items-center">
                    <Image
                      src={t.image || "/images/testimonials/testimonials.png"}
                      alt={t.name}
                      width={64}
                      height={64}
                      className="rounded-full mb-3 border-2 border-mygreen/70"
                    />
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-gray-400 text-sm">{t.role}</div>
                  </figcaption>
                </figure>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsClient;