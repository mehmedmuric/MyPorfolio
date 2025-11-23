'use client'

import Breadcrumb from '../components/Common/Breadcrumb';
import { Blog } from '@/types/blog';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../components/Loader';


const SingleBlog = dynamic(() => import("../components/Blog/SingleBlog"), {
  ssr: false,
  loading: () => <Loader />,
});

const ProjectsClient = () => {
  const [projects, setProjects] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/data/projects.json");
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);



  return (
    <>
      <Breadcrumb
        pageName="Projects"
        description="All Projects"
      />

        {/* ✅ Sadržaj sekcije */}
        <section className="relative z-10 isolate px-6 py-24 sm:py-32 lg:px-8 min-h-screen bg-gray-900/50 overflow-hidden particles-bg bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5">
          {/* Dekorativni slojevi */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-mygreen),transparent)] opacity-10"></div>
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900/50 shadow-xl ring-1 shadow-mygreen/80 ring-mygreen/50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
 
         {/* Cyber grid background */}
      <div className="absolute inset-0 opacity-[0.06] 
        bg-[linear-gradient(90deg,#00ff99_1px,transparent_1px),
             linear-gradient(#00ff99_1px,transparent_1px)] 
        bg-[size:50px_50px] " />

      {/* Neon radial glows */}
      <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.12),_transparent_60%)] blur-3xl animate-pulse-slow " />
      <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.06),_transparent_70%)] blur-[120px] " />
          {/* Projekti */}
          <div
            className="grid gap-4 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-2 
                        lg:grid-cols-5"
            data-animate="scale-in-center"
          >
            {projects.map((blog, index) => (
              <SingleBlog blog={blog} key={index} />
            ))}
          </div>
        </section>
    </>
  );
};

export default ProjectsClient;
