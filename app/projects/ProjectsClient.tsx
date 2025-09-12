'use client'

import SingleBlog from '../components/Blog/SingleBlog';
import Breadcrumb from '../components/Common/Breadcrumb';
import { Blog } from '@/types/blog';
import React, { useEffect, useState } from 'react'

import useScrollAnimations from "@/app/hooks/useScrollAnimations";



const ProjectsClient  = () => {
  useScrollAnimations();
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

      <div className="grid gap-4 ml-3 mr-3 mb-8 mt-6
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4" 
                      data-animate="scale-in-center">
        {projects.map((blog, index) => (
          <SingleBlog blog={blog} key={index}/>
        ))}
      </div>
    </>
  );
}

export default ProjectsClient ;