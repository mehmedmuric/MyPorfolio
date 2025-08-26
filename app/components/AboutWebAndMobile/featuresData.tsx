import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="41" viewBox="0 0 30 30" className="fill-current text-green-500 ">
       <path fill="currentColor" d="M15.653 7.25c-3.417 0-8.577.983-8.577 3.282c0 1.91 2.704 3.23 1.69 3.89c-1.02.665-2.683-1.85-4.047-1.85c-1.654 0-2.816 1.435-2.816 2.927c0 4.557 6.326 8.25 13.75 8.25c7.423 0 13.442-3.693 13.442-8.25c0-4.556-6.02-8.25-13.443-8.25zm-5.345 6.27c0-.644.887-1.165 1.98-1.165s1.98.52 1.98 1.166c0 .645-.887 1.167-1.98 1.167s-1.98-.523-1.98-1.166zm3.98 8.78c-1.057 0-1.913-.68-1.913-1.52s.856-1.517 1.914-1.517c1.056 0 1.913.68 1.913 1.518s-.857 1.52-1.914 1.52zm5.323-.53c-1.056 0-1.912-.68-1.912-1.518c0-.84.856-1.52 1.913-1.52c1.06 0 1.915.68 1.915 1.52s-.855 1.52-1.914 1.52zm.465-11.11c0-.838.856-1.518 1.914-1.518s1.912.68 1.912 1.518c0 .84-.855 1.518-1.913 1.518c-1.056 0-1.915-.68-1.915-1.518zm4.2 8.822c-1.057 0-1.914-.68-1.914-1.52s.858-1.517 1.915-1.517c1.06 0 1.914.68 1.914 1.518s-.856 1.52-1.915 1.52zm1.01-4.007c-1.057 0-1.913-.68-1.913-1.52c0-.837.856-1.517 1.914-1.517c1.057 0 1.913.68 1.913 1.518c0 .84-.857 1.52-1.914 1.52z"/>
      </svg>
    ),
    title: "High-quality Design",
    paragraph:
      "I focus on creating modern, clean, and intuitive designs that combine aesthetics with functionality, ensuring every application is enjoyable to use.",
  },
  {
    id: 2,
    icon: (
      <svg width="120" height="120" viewBox="1 -9 20 40" className="fill-current text-green-500">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m12.5 3.5l-4 14m-2-5l-4-4l4-4m8 12l4-4l-4-4"/>
      </svg>
    ),
    title: "Next.js (Latest)",
    paragraph:
      "I work with the latest version of Next.js and leverage its advanced features to build scalable, fast, and SEO-friendly applications.",
  },
  {
    id: 3,
    icon: (
      <svg width="120" height="120" viewBox="2 -13 20 50" className="fill-current text-green-500">
        <path fill="currentColor" d="M4.5 3.75a.75.75 0 0 0-1.5 0v14A3.25 3.25 0 0 0 6.25 21h14a.75.75 0 0 0 0-1.5h-14a1.75 1.75 0 0 1-1.75-1.75v-14ZM14.75 6a.75.75 0 0 0 0 1.5h3.19l-4.69 4.69l-1.97-1.97a.75.75 0 0 0-1.06 0l-3.75 3.75a.75.75 0 1 0 1.06 1.06l3.22-3.22l1.97 1.97a.75.75 0 0 0 1.06 0l5.222-5.22v3.195a.75.75 0 0 0 1.5 0V6.75a.75.75 0 0 0-.75-.75H14.75Z"/>
      </svg>
    ),
    title: "SEO & Speed Optimized",
    paragraph:
      "Every project I build is optimized for speed and search engines, using best practices for performance and visibility.",
  },
  {
    id: 4,
    icon: (
      <svg width="120" height="120" viewBox="2 -12 20 50" className="fill-current text-green-500">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3l-8 3v7c0 6 8 10 8 10z"/><path d="m9 12l2 2l4-4"/></g>
      </svg>
    ),
    title: "Security",
    paragraph:
      "I prioritize application security through data protection, validation, and implementation of industry-standard practices.",
  },
  {
    id: 5,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current text-green-500">
        <path
          opacity="0.5"
          d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0Z"
        />
        <path d="M28 12H12C10.8954 12 10 12.8954 10 14V26C10 27.1046 10.8954 28 12 28H28C29.1046 28 30 27.1046 30 26V14C30 12.8954 29.1046 12 28 12ZM20 24C18.3431 24 17 22.6569 17 21C17 19.3431 18.3431 18 20 18C21.6569 18 23 19.3431 23 21C23 22.6569 21.6569 24 20 24Z" />
      </svg>
    ),
    title: "Optimized for Mobile Devices",
    paragraph:
      "All my projects are fully responsive and tailored for mobile devices, providing seamless user experiences across all screen sizes.",
  },
  {
    id: 6,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current text-green-500">
        <path
          opacity="0.5"
          d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0Z"
        />
        <path d="M14 10H26C27.1046 10 28 10.8954 28 12V28C28 29.1046 27.1046 30 26 30H14C12.8954 30 12 29.1046 12 28V12C12 10.8954 12.8954 10 14 10ZM20 27C21.1046 27 22 26.1046 22 25C22 23.8954 21.1046 23 20 23C18.8954 23 18 23.8954 18 25C18 26.1046 18.8954 27 20 27Z" />
      </svg>
    ),
    title: "Clean & Maintainable Code",
    paragraph:
      "I write clean, well-structured, and maintainable code, making it easy to extend features and reduce long-term maintenance costs.",
  }
];

export default featuresData;

