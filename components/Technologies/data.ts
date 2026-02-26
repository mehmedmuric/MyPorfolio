import { Technology, CategoryOption } from "./types";

export const technologies: Technology[] = [
    // Frontend
    { name: "HTML", src: "/images/models/html5.svg", category: "frontend", proficiency: "Advanced" },
    { name: "CSS", src: "/images/models/css3.svg", category: "frontend", proficiency: "Advanced" },
    { name: "JavaScript", src: "/images/models/javascript.svg", category: "frontend", proficiency: "Advanced" },
    { name: "TypeScript", src: "/images/models/typescript.svg", category: "frontend", proficiency: "Advanced" },
    { name: "React", src: "/images/models/react.svg", category: "frontend", proficiency: "Advanced" },
    { name: "NextJS", src: "/images/models/nextjs.svg", category: "frontend", proficiency: "Advanced" },
    { name: "ReduxJS", src: "/images/models/reduxjs.svg", category: "frontend", proficiency: "Intermediate" },
    { name: "TailwindCSS", src: "/images/models/tailwindcss.svg", category: "frontend", proficiency: "Advanced" },
    { name: "SASS", src: "/images/models/sass.svg", category: "frontend", proficiency: "Intermediate" },
    { name: "Bootstrap", src: "/images/models/bootstrap.svg", category: "frontend", proficiency: "Intermediate" },
    { name: "MaterialUI", src: "/images/models/materialui.svg", category: "frontend", proficiency: "Intermediate" },

    // Backend
    { name: "NodeJS", src: "/images/models/nodejs.svg", category: "backend", proficiency: "Advanced" },
    { name: "ExpressJS", src: "/images/models/expressjs.svg", category: "backend", proficiency: "Intermediate" },

    // Database
    { name: "MongoDB", src: "/images/models/mongodb.svg", category: "database", proficiency: "Intermediate" },
    { name: "MySQL", src: "/images/models/mysql.svg", category: "database", proficiency: "Intermediate" },

    // Cloud
    { name: "AWS", src: "/images/models/amazonAWS.svg", category: "cloud", proficiency: "Novice" },

    // Tools
    { name: "Linux", src: "/images/models/kalilinux.svg", category: "tools", proficiency: "Intermediate" }
];

export const categories: CategoryOption[] = [
    { key: 'all', label: 'All' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'database', label: 'Database' },
    { key: 'cloud', label: 'Cloud' },
    { key: 'tools', label: 'Tools' },
];
