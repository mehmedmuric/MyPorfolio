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
  const [filteredProjects, setFilteredProjects] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/data/projects.json");
        if (!res.ok) throw new Error('Failed to load projects');
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Invalid response content type");
        }
        const data = await res.json();
        const projectsArray = Array.isArray(data) ? data : [];
        setProjects(projectsArray);
        setFilteredProjects(projectsArray);
      } catch (e: any) {
        setError(e.message || 'Could not load projects.');
        setProjects([]);
        setFilteredProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Extract unique tags from projects
  const allTags = React.useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach(project => {
      const tags = typeof project.tags === 'string' 
        ? project.tags.split(/[,\s-]+/).filter(Boolean)
        : Array.isArray(project.tags) 
          ? project.tags 
          : [];
      tags.forEach(tag => tagsSet.add(tag.trim()));
    });
    return Array.from(tagsSet);
  }, [projects]);

  // Filter projects based on search and tag
  React.useEffect(() => {
    let filtered = [...projects];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.paragraph.toLowerCase().includes(query) ||
        (typeof project.tags === 'string' && project.tags.toLowerCase().includes(query)) ||
        (Array.isArray(project.tags) && project.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(project => {
        const tags = typeof project.tags === 'string'
          ? project.tags.split(/[,\s-]+/).filter(Boolean).map(t => t.trim().toLowerCase())
          : Array.isArray(project.tags)
            ? project.tags.map(t => String(t).toLowerCase())
            : [];
        return tags.includes(selectedTag.toLowerCase());
      });
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedTag]);

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
    <div className="relative min-h-screen bg-[#0a0a0a] bg-gradient-to-b from-[#0f1419] via-[#000000] to-[#051912] overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Animated Scan Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scanLine" />
      </div>

      {/* Enhanced Parallax Background with Cyberpunk Glow */}
      <div className="absolute left-[5%] top-[14%] w-96 h-96 bg-[radial-gradient(circle,rgba(0,255,140,0.3)_0%,rgba(0,255,200,0.15)_40%,transparent_75%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform animate-pulse" aria-hidden />
      <div className="absolute right-[10%] bottom-[5%] w-[380px] h-[240px] bg-[radial-gradient(circle,rgba(0,200,255,0.2)_0%,rgba(100,200,255,0.1)_40%,transparent_80%)] rounded-full pointer-events-none blur-3xl z-10 will-change-transform" aria-hidden />
      
      {/* Cyberpunk Neon Accents */}
      <div className="absolute top-20 left-10 w-2 h-32 bg-gradient-to-b from-green-400 to-transparent opacity-60 blur-sm animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-2 bg-gradient-to-r from-cyan-400 to-transparent opacity-60 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-20">
        <Breadcrumb
          pageName="Projects"
          description="A showcase of my featured web & mobile projects, open-source work, and experiments. Click to learn more about each."
        />
        <section
          ref={sectionRef}
          className={
            "relative z-10 isolate px-2 py-16 sm:py-20 md:py-32 lg:px-4 min-h-screen bg-gray-900/30 overflow-hidden particles-bg bg-gradient-to-b from-gray-950/80 via-mygreen/5 to-mygreen/5 flex flex-col items-center"
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

        {/* Search and Filter */}
        <div className="w-full max-w-4xl mx-auto mb-8 px-4">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedTag === 'all'
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-black shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
            >
              All
            </button>
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-green-400 to-green-600 text-black shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="mt-4 text-center text-sm text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
        
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
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full text-center text-white/70 py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-semibold mb-2">No projects found</p>
              <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredProjects.map((blog, index) => (
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
        </div>
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
    </div>
  );
};

export default ProjectsClient;
