import { Brand } from "@/types/brand";

const brandsData: Brand[] = [
  {
    id: 1,
    name: "Python",
    href: "https://centarnit.rs/wp-content/uploads/2021/12/2021-12-11_16-34-43.jpg",
    image: "/images/certificates/python.png",
    issued: "Dec 2021",
    platform: "Centar NIT",
    description: "Comprehensive course covering Python fundamentals and advanced topics."
  },
  {
    id: 2,
    name: "JavaScript",
    href: "https://www.udemy.com/certificate/UC-18b028ea-63fa-4628-b33b-86568e7ed0a7/",
    image: "/images/certificates/JavaScript.png",
    issued: "Oct 2025",
    platform: "Udemy",
    description: "Learned modern JavaScript, ES6+, and practical web development skills."
  },
  {
    id: 3,
    name: "React",
    href: "https://www.udemy.com/certificate/UC-0d799ecd-66d1-4ae2-8f07-2bca1798a4b6/",
    image: "/images/certificates/react.png",
    issued: "Oct 2025",
    platform: "Udemy",
    description: "Built modern web apps using React with reusable components and hooks."
  },
];

export default brandsData;
