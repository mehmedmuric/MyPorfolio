'use client'

import SingleBlog from '../components/Blog/SingleBlog';
import Breadcrumb from '../components/Common/Breadcrumb';
import { Blog } from '@/types/blog';
import React, { useEffect, useState } from 'react'

const Projects = () => {
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

      <div className="flex gap-5 ml-8 mb-6 mt-6">
        {projects.map((blog, index) => (
            <SingleBlog blog={blog} key={index}/>
        ))}
      </div>
      
    </>
  );
}

export default Projects