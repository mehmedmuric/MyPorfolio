import type { ReactNode } from "react";

/**
 * Pass-through root layout. The real `<html>` / `<body>` live in
 * `app/[locale]/layout.tsx` so `lang` can be set per locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
