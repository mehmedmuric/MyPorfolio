import { Icons } from "./icons";
import type { Messages } from "@/messages/types";

export interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  paragraph: string;
}

const featureIcons = [
  Icons.Code,
  Icons.NextJs,
  Icons.Design,
  Icons.Security,
  Icons.SEO,
  Icons.Mobile,
] as const;

export function getFeatures(items: Messages["capabilities"]["items"]): Feature[] {
  return items.map((item, index) => ({
    id: index + 1,
    icon: featureIcons[index] ?? Icons.Code,
    title: item.title,
    paragraph: item.paragraph,
  }));
}
