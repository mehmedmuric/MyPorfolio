"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { Locale } from "./config";
import type { Messages } from "@/messages/types";

type DictionaryContextValue = {
  locale: Locale;
  messages: Messages;
  t: Messages;
};

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function DictionaryProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, messages, t: messages }),
    [locale, messages]
  );

  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): DictionaryContextValue {
  const ctx = useContext(DictionaryContext);
  if (!ctx) {
    throw new Error("useDictionary must be used within DictionaryProvider");
  }
  return ctx;
}

export function useLocale(): Locale {
  return useDictionary().locale;
}

export function useTranslations(): Messages {
  return useDictionary().t;
}
