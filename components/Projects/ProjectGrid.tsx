
import { Blog } from "@/types/blog";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectGridProps {
    projects: Blog[];
    loading: boolean;
    error: string | null;
}

const ProjectGrid = ({ projects, loading, error }: ProjectGridProps) => {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">

            {/* Loading State - Skeletons */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="w-full">
                            <ProjectSkeleton />
                        </div>
                    ))}
                </div>
            )}

            {/* Error State */}
            {!loading && error && (
                <div className="flex items-center justify-center min-h-[200px]">
                    <div className="p-4 border border-destructive/20 bg-destructive/10 rounded-lg text-destructive text-sm flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                        {error}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && projects.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
                    <p className="text-lg font-medium">No projects found.</p>
                    <p className="text-sm opacity-80 mt-2">Try adjusting your filters or check back later.</p>
                </div>
            )}

            {/* Projects Grid */}
            {!loading && !error && projects.length > 0 && (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default ProjectGrid;
