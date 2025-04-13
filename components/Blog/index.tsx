"use client";

import { useEffect, useState } from "react";
import SingleBlog from "./SingleBlog";
import { Blog } from "@/types/blog";

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/json/projects.json");
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-16">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <SingleBlog key={index} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;