import type { Locale } from "./config";
import type { Messages } from "@/messages/types";

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  en: () => import("@/messages/en.json").then((m) => m.default as unknown as Messages),
  sr: () => import("@/messages/sr.json").then((m) => m.default as unknown as Messages),
  de: () => import("@/messages/de.json").then((m) => m.default as unknown as Messages),
  fr: () => import("@/messages/fr.json").then((m) => m.default as unknown as Messages),
  tr: () => import("@/messages/tr.json").then((m) => m.default as unknown as Messages),
};

export async function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaries[locale]();
}
