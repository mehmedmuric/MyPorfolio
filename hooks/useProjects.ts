
import { useState, useEffect, useMemo } from 'react';
import { Blog } from '@/types/blog';

export const useProjects = () => {
    const [projects, setProjects] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch("/data/projects.json");

                if (!res.ok) {
                    throw new Error(`Failed to load projects: ${res.status} ${res.statusText}`);
                }

                const contentType = res.headers.get("content-type");
                if (!contentType?.includes("application/json")) {
                    throw new Error("Invalid response content type: expected JSON");
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format: expected array");
                }

                setProjects(data);
            } catch (e: any) {
                console.error("Error fetching projects:", e);
                setError(e.message || 'Could not load projects.');
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Extract unique first tags from projects to use as categories
    const categories = useMemo(() => {
        const firstTags = projects
            .map(project => project.tags && project.tags.length > 0 ? project.tags[0].trim() : null)
            .filter((tag): tag is string => tag !== null && tag !== '');

        // Sort logically or alphabetically
        return Array.from(new Set(firstTags)).sort();
    }, [projects]);

    // Filter projects based on selection and search query
    const filteredProjects = useMemo(() => {
        let filtered = projects;

        if (selectedCategory) {
            filtered = filtered.filter(project => {
                const firstTag = project.tags && project.tags.length > 0 ? project.tags[0].trim() : '';
                return firstTag === selectedCategory;
            });
        }

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(lowerQuery) ||
                project.paragraph.toLowerCase().includes(lowerQuery) ||
                project.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
        }

        return filtered;
    }, [projects, selectedCategory, searchQuery]);

    return {
        projects,
        filteredProjects,
        categories,
        loading,
        error,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery
    };
};
