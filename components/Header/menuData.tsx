import type { Messages } from "@/messages/types";

export type MenuItem = {
  id: number;
  titleKey: keyof Messages["navigation"];
  path: string;
  newTab: boolean;
};

const menuData: MenuItem[] = [
  { id: 1, titleKey: "home", path: "/", newTab: false },
  { id: 2, titleKey: "projects", path: "/projects", newTab: false },
  { id: 3, titleKey: "about", path: "/about", newTab: false },
  { id: 4, titleKey: "contact", path: "/contact", newTab: false },
  { id: 5, titleKey: "testimonials", path: "/testimonials", newTab: false },
];

export default menuData;
