'use client'

import Breadcrumb from '../components/Common/Breadcrumb';
import { Blog } from '@/types/blog';
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../components/Loader';
import gsap from 'gsap';

const SingleBlog = dynamic(() => import("../components/Blog/SingleBlog"), {
  ssr: false,
  loading: () => <Loader />,
});

const ProjectsClient = () => {
  const [projects, setProjects] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/data/projects.json");
        if (!res.ok) throw new Error('Failed to load projects');
        const data = await res.json();
        setProjects(data);
      } catch (e: any) {
        setError(e.message || 'Could not load projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || loading || error) return;
    const cards = sectionRef.current.querySelectorAll('.project-card');
    if (cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 32, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.13, duration: 0.7, ease: 'power3.out', delay: 0.15 }
    );
  }, [projects, loading, error]);

  return (
    <>
      <Breadcrumb
        pageName="Projects"
        description="A showcase of my featured web & mobile projects, open-source work, and experiments. Click to learn more about each."
      />
      <section
        ref={sectionRef}
        className={
          "relative z-10 isolate px-2 py-16 sm:py-20 md:py-32 lg:px-4 min-h-screen bg-gray-900/50 overflow-hidden particles-bg bg-gradient-to-b from-gray-950 via-mygreen/5 to-mygreen/5 flex flex-col items-center"
        }
      >
        {/* BG layers */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(36rem_38rem_at_top,var(--color-mygreen),transparent)] opacity-5"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-10 w-[200%] origin-bottom-left skew-x-[-28deg] bg-gray-900/60 shadow-xl ring-1 shadow-mygreen/80 ring-mygreen/50 sm:mr-16 lg:mr-0 xl:mr-10 xl:origin-center"></div>

        {/* Cyber grid background */}
        <div
          className="absolute inset-0 opacity-[0.05] -z-20"
          style={{
            backgroundImage:
              'linear-gradient(90deg,#00ff99 1px,transparent 1px),linear-gradient(#00ff99 1px,transparent 1px)',
            backgroundSize: "38px 38px"
          }}
        />

        {/* Neon radial glows */}
        <div className="absolute -inset-32 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.10),_transparent_60%)] blur-3xl animate-pulse-slow" />
        <div className="absolute -inset-64 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.045),_transparent_70%)] blur-[90px]" />

        {/* Section Heading */}
        <header className="mb-7 flex flex-col items-center text-center w-full px-2">
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-[95vw] font-bold underline underline-offset-4 decoration-mygreen">
            Projects Portfolio
          </h1>
          <p className="mt-2 text-sm xs:text-base sm:text-md md:text-lg text-gray-300 max-w-xl mx-auto">
            Explore my web/mobile projects, client work, and experiments – using React, Next.js, Node.js, TypeScript, and more.
          </p>
        </header>
        
        {/* Projects grid/states */}
        <div
          data-animate="scale-in-center"
          className={[
            "grid gap-5",
            "grid-cols-1",
            "xs:grid-cols-2",
            "md:grid-cols-3",
            "lg:grid-cols-4",
            "w-full",
            "max-w-7xl",
            "mx-auto",
            "justify-center"
          ].join(" ")}
        >
          {loading ? (
            <div className="col-span-full flex items-center justify-center h-[140px] md:h-[180px]">
              <Loader />
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-400 py-8 font-semibold text-base md:text-lg">
              {error}
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-full text-center text-white/70 py-8 text-base md:text-xl font-bold">
              No projects found. Try again later!
            </div>
          ) : (
            projects.map((blog, index) => (
              <div
                key={index}
                className="project-card flex items-center justify-center"
                style={{
                  minHeight: "240px",
                  // ensure grid scaling down
                  margin: "auto",
                  maxWidth: "100%",
                }}>
                <SingleBlog blog={blog} />
              </div>
            ))
          )}
        </div>
      </section>
      <style jsx global>{`
        .project-card {
          transition: 
            background 0.24s cubic-bezier(.65,.08,.46,1),
            transform 0.18s cubic-bezier(.65,.08,.46,1), 
            box-shadow 0.22s;
          background: linear-gradient(120deg,rgba(0,255,153,0.08) 1%,rgba(0,0,0,0.16) 96%);
          border-radius: 1rem;
          box-shadow: 0 1px 8px #0c1a10a0;
          padding: 1.15rem 0.8rem;
        }
        .project-card:hover,
        .project-card:focus-within {
          background: linear-gradient(120deg,rgba(0,255,153,0.18) 8%,rgba(0,0,0,0.24) 92%);
          transform: translateY(-7px) scale(1.04);
          box-shadow: 0 0 38px #00ff9972, 0 8px 24px #191a;
          outline: none;
        }
        @media (max-width: 470px) {
          .project-card {
            padding: 0.8rem 0.1rem;
            border-radius: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectsClient;
