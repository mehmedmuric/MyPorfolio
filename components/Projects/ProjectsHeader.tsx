
import { memo } from "react";
import { motion } from "framer-motion";

const ProjectsHeader = memo(() => {
    return (
        <header className="relative w-full overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[90px]"
                    animate={{
                        x: [0, 60, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.span
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                    >
                        Portfolio
                    </motion.span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
                        Curated Work & <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-green-500 animate-gradient-x bg-[length:200%_auto]">
                            Digital Experiments.
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        A selection of projects that showcase my passion for clean code,
                        thoughtful design, and user-centric experiences.
                    </p>
                </motion.div>
            </div>
        </header>
    );
});

ProjectsHeader.displayName = "ProjectsHeader";

export default ProjectsHeader;
