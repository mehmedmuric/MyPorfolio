"use client";

import { motion } from "framer-motion";

const timelineData = [
    {
        period: "2019–2023",
        title: "Technical HS, Information Technology",
        colorClass: "bg-primary",
        textClass: "text-primary",
        highlights: [
            "Hardware, networks, and base concepts",
            "Arduino and Raspberry Pi robotics",
            "Organized school's primary hackathon",
        ],
        body: "Graduated as an Information Technology Technician, blending hardware and software with strong foundations in networking and early scripting.",
    },
    {
        period: "2023–Present",
        title: "University of Novi Pazar",
        colorClass: "bg-blue-400",
        textClass: "text-blue-400",
        highlights: [
            "Advanced Web Tech and Distributed Systems",
            "C++, Java, Python, SQL/NoSQL",
            "Hackathons & faculty leadership",
        ],
        body: "Computer Science student focused on algorithms, system architecture, and modern web engineering. Deeply passionate about applying theoretical knowledge to production-grade applications.",
    },
    {
        period: "2023–2024",
        title: "Freelancer & Tech Consultant",
        colorClass: "bg-yellow-400",
        textClass: "text-yellow-400",
        highlights: [
            "Clear communication and scalable architecture",
            "Mentality of MVP to full scale",
            "International startups and early-stage SaaS",
        ],
        body: "Delivered tailored solutions for startups globally. Gained strong experience in project life-cycles, documentation, and maintainable hand-offs.",
    },
    {
        period: "2024–Present",
        title: "Full-Stack Software Engineer",
        colorClass: "bg-emerald-400",
        textClass: "text-emerald-400",
        highlights: [
            "Mentored junior engineers",
            "Open-source active contributor",
            "Shipped mobile and web SaaS platforms",
        ],
        body: "Currently building and shipping production web and mobile products using React, Next.js, Node.js, and TypeScript with a relentless focus on quality, automated testing, and web performance.",
    },
];

const Timeline = () => {
    return (
        <section className="w-full max-w-4xl mx-auto py-12">
            <div className="flex flex-col mb-12">
                <h2 className="text-2xl font-bold text-white mb-2">Journey</h2>
                <p className="text-gray-400">My path of continuous learning and shipping software.</p>
            </div>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-[2.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent z-0" />

                <div className="space-y-8 md:space-y-12">
                    {timelineData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex flex-col md:flex-row gap-6 md:gap-8 group"
                        >
                            {/* Dot Indicator */}
                            <div className="hidden md:flex absolute left-[-1.3rem] top-6 w-12 h-12 items-center justify-center z-10 translate-x-[2.25rem]">
                                <div className={`w-3 h-3 rounded-full ${item.colorClass} ring-4 ring-[#050505] shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-125`} />
                            </div>

                            {/* Mobile Dot */}
                            <div className="md:hidden absolute left-4 top-6 w-3 h-3 -translate-x-1.5 rounded-full ring-4 ring-[#050505] z-10" style={{ backgroundColor: "var(--primary)" }} />

                            {/* Card */}
                            <div className="ml-10 md:ml-[5.5rem] flex-1 bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                    <h3 className="text-xl font-semibold text-white">
                                        {item.title}
                                    </h3>
                                    <span className={`text-sm font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 ${item.textClass}`}>
                                        {item.period}
                                    </span>
                                </div>

                                <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
                                    {item.body}
                                </p>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/5">
                                    {item.highlights.map((highlight, hIndex) => (
                                        <li key={hIndex} className="flex items-start gap-2 text-sm text-gray-400 group/item">
                                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mt-0.5 text-primary/50 group-hover/item:text-primary transition-colors flex-shrink-0">
                                                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="group-hover/item:text-gray-300 transition-colors">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
