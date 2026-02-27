'use client';

import Breadcrumb from '@/components/Common/Breadcrumb';
import { useProjects } from '@/hooks/useProjects';
import ProjectsHeader from '@/components/Projects/ProjectsHeader';
import FilterBar from '@/components/Projects/FilterBar';
import ProjectGrid from '@/components/Projects/ProjectGrid';
import Link from 'next/link';
import { Mail, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import heavy canvas/particle backgrounds to unblock main thread rendering on load
const ParticlesBackground = dynamic(() => import('@/components/Common/ParticlesBackground'), { ssr: false });

const ProjectsClient = () => {
  const {
    filteredProjects,
    categories,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useProjects();

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPastThreshold = window.scrollY > 400;
          setShowScrollTop(prev => (prev !== isPastThreshold ? isPastThreshold : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    // Passive listener is essential for mobile scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="Projects"
        description="A showcase of my featured web & mobile projects."
      />

      <main className="min-h-screen bg-background relative z-10 pb-20 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Interactive Particles - Lazy loaded to prevent main thread blocking */}
        <ParticlesBackground />

        {/* Ambient Green Light - Using CSS radial gradient instead of layout-thrashing blur-[120px] */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)' }} />

        <ProjectsHeader />

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <ProjectGrid
          projects={filteredProjects}
          loading={loading}
          error={error}
        />

        {/* Footer CTA */}
        {!loading && !error && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto px-4 py-20 text-center relative z-10"
          >
            {/* Glowing Orb Behind CTA - Replaced expensive blur with performance-friendly radial gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none -z-10" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)' }} />

            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-card/80 via-card/50 to-primary/5 border border-primary/20 shadow-xl sm:shadow-2xl backdrop-blur-sm sm:backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 relative z-10">Have a project in mind?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto relative z-10">
                I'm always open to discussing new opportunities, creative ideas, or how I can help bring your vision to life.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:-translate-y-1 relative z-10"
              >
                <Mail className="w-4 h-4 mr-2" />
                Let's Talk
              </Link>
            </div>
          </motion.section>
        )}

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default ProjectsClient;
