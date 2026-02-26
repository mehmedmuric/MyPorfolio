"use client";

import { Blog } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
    blog: Blog;
    index: number;
}

const BlogCard = ({ blog, index }: BlogCardProps) => {
    const { id, title, paragraph, image, coverImage, author, tags, publishDate, excerpt, description } = blog;

    // Fallback logic for content
    const displayImage = image || coverImage || "/images/blog/blog-01.jpg";
    const displayExcerpt = paragraph || excerpt || description || "";
    const displayDate = publishDate || new Date().getFullYear().toString();

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            className="group h-full"
        >
            <Card className="h-full border-0 bg-transparent shadow-none">
                <article className="flex flex-col h-full bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl overflow-hidden hover:border-primary/30 hover:bg-slate-900/60 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.05)] transition-all duration-500 will-change-transform group-hover:-translate-y-2">
                    {/* Image Container */}
                    <Link href={`/blog/${id}`} className="relative block h-64 overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 bg-slate-800/50 animate-pulse" />
                        <Image
                            src={displayImage}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                        {/* Overlay Badge */}
                        <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                            <span className="flex items-center gap-1 text-xs font-semibold bg-white/90 text-slate-900 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                                View Case Study <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </Link>

                    {/* Content */}
                    <CardContent className="flex flex-col flex-grow p-6 sm:p-8 relative">
                        {/* Tags - Floated slightly over image area visually or just nicely spaced */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags && tags.slice(0, 3).map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-md bg-primary/10 text-primary border border-primary/20"
                                >
                                    {tag.replace(/ - /g, '')}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${id}`} className="group-hover:text-primary transition-colors duration-300 block mb-3">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 leading-tight line-clamp-2">
                                {title}
                            </h3>
                        </Link>

                        {/* Excerpt */}
                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-grow font-light">
                            {displayExcerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-5 border-t border-slate-800/60 mt-auto">
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{displayDate}</span>
                            </div>

                            <Link
                                href={`/blog/${id}`}
                                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                            >
                                Read More <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </CardContent>
                </article>
            </Card>
        </motion.div>
    );
};

export default BlogCard;
