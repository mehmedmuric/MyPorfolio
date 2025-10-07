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
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m12.5 3.5l-4 14m-2-5l-4-4l4-4m8 12l4-4l-4-4"/>
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
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3l-8 3v7c0 6 8 10 8 10z"/><path d="m9 12l2 2l4-4"/></g>
      </svg>
    ),
    title: "Security",
    paragraph:
      "I prioritize application security through data protection, validation, and implementation of industry-standard practices.",
  },
  {
    id: 5,
    icon: (
      <svg width="120" height="120" viewBox="-3 0 30 25" className="fill-current text-green-500">
        <path fill="currentColor" d="M9.75 19a.5.5 0 0 1 .5-.5h3.5a.5.5 0 0 1 0 1h-3.5a.5.5 0 0 1-.5-.5"/><path fill="currentColor" d="M10.17 2.25h3.66c.535 0 .98 0 1.345.03c.38.03.736.098 1.073.27a2.75 2.75 0 0 1 1.202 1.202c.172.337.24.693.27 1.073c.03.365.03.81.03 1.345v11.66c0 .535 0 .98-.03 1.345c-.03.38-.098.736-.27 1.073a2.75 2.75 0 0 1-1.201 1.202c-.338.172-.694.24-1.074.27c-.365.03-.81.03-1.344.03H10.17c-.535 0-.98 0-1.345-.03c-.38-.03-.736-.098-1.073-.27a2.75 2.75 0 0 1-1.202-1.2c-.172-.338-.24-.694-.27-1.074c-.03-.365-.03-.81-.03-1.345V6.17c0-.535 0-.98.03-1.345c.03-.38.098-.736.27-1.073A2.75 2.75 0 0 1 7.752 2.55c.337-.172.693-.24 1.073-.27c.365-.03.81-.03 1.345-.03M8.947 3.775c-.287.023-.424.065-.514.111a1.25 1.25 0 0 0-.547.547c-.046.09-.088.227-.111.514c-.024.296-.025.68-.025 1.253v11.6c0 .572 0 .957.025 1.252c.023.288.065.425.111.515c.12.236.311.427.547.547c.09.046.227.088.514.111c.296.024.68.025 1.253.025h3.6c.572 0 .957 0 1.252-.025c.288-.023.425-.065.516-.111a1.25 1.25 0 0 0 .546-.547c.046-.09.088-.227.111-.515c.024-.295.025-.68.025-1.252V6.2c0-.572 0-.957-.025-1.253c-.023-.287-.065-.424-.111-.514a1.25 1.25 0 0 0-.546-.547c-.091-.046-.228-.088-.515-.111a9 9 0 0 0-.637-.023l-.124.373c-.105.314-.158.472-.255.588a.8.8 0 0 1-.32.231c-.142.056-.308.056-.64.056h-2.154c-.332 0-.498 0-.64-.056a.8.8 0 0 1-.32-.23c-.097-.117-.15-.275-.255-.59l-.124-.372a9 9 0 0 0-.637.023"/>
      </svg>
    ),
    title: "Optimized for Mobile Devices",
    paragraph:
      "All my projects are fully responsive and tailored for mobile devices, providing seamless user experiences across all screen sizes.",
  },
  {
    id: 6,
    icon: (
      <svg width="120" height="120" viewBox="-5 0 35 25" className="fill-current text-green-500">
        <path fill="currentColor" d="M3.001 1h12.414l5.586 5.587V13h-2V9h-6V3h-8v18h6v2h-8V1Zm12 2.415V7h3.586L15 3.415Zm8.663 11.841l-2.776 2.748l2.776 2.749l-1.407 1.421l-4.212-4.17l4.212-4.17l1.407 1.422ZM13 21h4.5v2H13v-2Z"/>
      </svg>
    ),
    title: "Clean & Maintainable Code",
    paragraph:
      "I write clean, well-structured, and maintainable code, making it easy to extend features and reduce long-term maintenance costs.",
  }
];

export default featuresData;

