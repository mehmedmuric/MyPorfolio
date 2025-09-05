"use client";
import { useState } from "react";
import Breadcrumb from "../components/Common/Breadcrumb";
import Image from "next/image";

const initialTestimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, TechCorp",
    comment:
      "Working with Mehmed was an amazing experience. He delivered high-quality work on time and exceeded our expectations.",
    image:
      "/images/testimonials/testimonials.png",
  }

];

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    comment: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;

    const newTestimonial = {
      id: testimonials.length + 1,
      name: formData.name,
      role: formData.role || "Client",
      comment: formData.comment,
      image:
        formData.image ||
        "/images/testimonials/testimonials.png", // default placeholder
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFormData({ name: "", role: "", comment: "", image: "" });
  };

  return (
    <>
      <Breadcrumb pageName="Testimonials" description="--------" />

      <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-mygreen),transparent)] opacity-10"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-mygreen/80 ring-mygreen/50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>

        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-16">
            What Clients Say
          </h2>

          {/* Forma za novi komentar */}
          <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-transparent/25 p-8 rounded-2xl shadow-lg border border-mygreen flex flex-col items-center gap-6 mb-10"
                >
                <div className="w-full">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-white text-center">
                    Your Name
                    </label>
                    <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-stroke text-body-color-dark dark:shadow-two w-full rounded-sm border px-6 py-3 text-base  outline-none focus:border-[#4CAF50] border-transparent bg-[#2C303B] focus:shadow-none"
                    required
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="role" className="mb-2 block text-sm font-medium text-white text-center">
                    Role / Company
                    </label>
                    <input
                    type="text"
                    name="role"
                    placeholder="Enter your role or company"
                    value={formData.role}
                    onChange={handleChange}
                    className="border-stroke text-body-color-dark dark:shadow-two w-full rounded-sm border px-6 py-3 text-base  outline-none focus:border-[#4CAF50] border-transparent bg-[#2C303B] focus:shadow-none"
                    />
                </div>

                <div className="w-full">
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-white text-center"
              >
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-mygreen 
                        border border-mygreen rounded-sm 
                        cursor-pointer 
                        bg-transparent 
                        file:mr-4 file:py-2 file:px-4 
                        file:rounded-lg file:border-0 
                        file:text-sm file:font-semibold 
                        file:bg-transparent file:text-mygreen 
                        hover:file:bg-mygreen hover:file:text-white px-6 py-3 file:duration-500"
              />
            </div>

                <div className="w-full">
                    <label htmlFor="comment" className="mb-2 block text-sm font-medium text-white text-center">
                    Your Comment
                    </label>
                    <textarea
                    name="comment"
                    rows={5}
                    placeholder="Enter your comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="border-stroke text-body-color-dark dark:shadow-two w-full rounded-sm border px-6 py-3 text-base  outline-none focus:border-[#4CAF50] border-transparent bg-[#2C303B] focus:shadow-none"
                    required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="mt-4 rounded-lg bg-mygreen px-16 py-4 text-base font-medium text-white duration-300 hover:bg-transparent border border-mygreen hover:text-mygreen"
                >
                    Submit
                </button>
                </form> 

          {/* Testimonial kartice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center border-2 border-mygreen"
              >
                <blockquote className="mb-6">
                  <p className="text-gray-300 text-sm sm:text-base">“{t.comment}”</p>
                </blockquote>
                <figcaption className="flex flex-col items-center">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={64}
                    height={64}
                    className="rounded-full mb-3 border-2 border-mygreen"
                    
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

export default TestimonialsPage;
