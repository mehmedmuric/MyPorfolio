"use client";

import { Brand } from "@/types/brand";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Award } from "lucide-react";

const CertificationCard = ({ brand, index }: { brand: Brand; index: number }) => {
    const { name, href, image, issued, platform, description } = brand;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full"
        >
            <div className="relative h-full flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                    {/* Header: Logo & Platform */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="relative w-16 h-16 bg-white/5 rounded-xl p-3 border border-white/10 group-hover:border-primary/20 transition-colors">
                            {image ? (
                                <Image
                                    src={image}
                                    alt={name}
                                    fill
                                    className="object-contain p-2"
                                />
                            ) : (
                                <Award className="w-full h-full text-primary" />
                            )}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {platform}
                        </div>
                    </div>

                    {/* Body: content */}
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {name}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Calendar className="w-4 h-4 text-primary/70" />
                            <span>Issued {issued}</span>
                        </div>

                        <p className="text-sm text-muted-foreground/80 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Footer: Action */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        {href ? (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                View Certificate
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        ) : (
                            <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest cursor-not-allowed">
                                Coming Soon
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CertificationCard;
