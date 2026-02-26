
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = memo(({ project, index }: { project: Blog; index: number }) => {
    const { id, title, paragraph, image, tags, publishDate } = project;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            layout
            className="h-full"
        >
            <Link
                href={`/blog-details/${id}`}
                className="group block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
            >
                <article className="flex flex-col h-full overflow-hidden bg-card/60 backdrop-blur-sm hover:bg-card/90 border border-border/40 hover:border-primary/50 rounded-2xl transition-all duration-500 shadow-sm hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] group-hover:-translate-y-1.5">

                    {/* Image Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/20">
                        <Image
                            src={image}
                            alt={`Cover for ${title}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                            loading="lazy"
                            quality={90}
                        />

                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 group-hover:from-black/60 transition-colors duration-500" />

                        {/* Main Badge (First Tag) */}
                        {tags && tags.length > 0 && (
                            <div className="absolute top-3 left-3 z-10 transition-transform duration-300 group-hover:scale-105">
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xl">
                                    {tags[0]}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-col flex-1 p-4 xs:p-5 space-y-3">

                        {/* Header (Date) */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground/80">
                            <time dateTime={publishDate} className="font-medium tracking-wide">
                                {publishDate}
                            </time>
                        </div>

                        {/* Title & Excerpt */}
                        <div className="space-y-2 flex-1">
                            <h3 className="text-lg xs:text-xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                                {title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {paragraph}
                            </p>
                        </div>

                        {/* Tech Stack (All Tags) */}
                        {tags && tags.length > 1 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {tags.slice(1, 4).map((tag, i) => (
                                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-secondary/30 text-secondary-foreground border border-secondary/50">
                                        {tag}
                                    </span>
                                ))}
                                {tags.length > 4 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-muted text-muted-foreground border border-muted-foreground/20">
                                        +{tags.length - 4}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="pt-3 flex items-center justify-between border-t border-border/30 mt-auto">
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                Read Case Study
                            </span>
                            <motion.div
                                className="text-primary"
                                initial={{ x: 0, y: 0 }}
                                whileHover={{ x: 2, y: -2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.div>
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
