import { Icons } from "./icons";

export interface Feature {
    id: number;
    icon: React.ElementType;
    title: string;
    paragraph: string;
}

export const featuresData: Feature[] = [
    {
        id: 1,
        icon: Icons.Design,
        title: "Premium UI/UX Design",
        paragraph:
            "Crafting pixel-perfect, accessible, and engaging interfaces that not only look stunning but feel intuitive to use.",
    },
    {
        id: 2,
        icon: Icons.NextJs,
        title: "Next.js Architecture",
        paragraph:
            "Leveraging the full power of Next.js 14+ with Server Components, Streaming, and Edge functions for blazingly fast performance.",
    },
    {
        id: 3,
        icon: Icons.SEO,
        title: "Performance First",
        paragraph:
            "Optimized Core Web Vitals, intelligent caching, and specialized SEO strategies to ensure top ranking and instant loads.",
    },
    {
        id: 4,
        icon: Icons.Security,
        title: "Enterprise Security",
        paragraph:
            "Bank-grade security implementation including CSRF protection, secure headers, and advanced data validation patterns.",
    },
    {
        id: 5,
        icon: Icons.Mobile,
        title: "Mobile-First approach",
        paragraph:
            "Responsive by default. Your application will provide a native-like experience on every device, from mobile to desktop.",
    },
    {
        id: 6,
        icon: Icons.Code,
        title: "Clean Architecture",
        paragraph:
            "Scalable codebases built with SOLID principles, TypeScript, and strict linting to ensure long-term maintainability.",
    },
];
