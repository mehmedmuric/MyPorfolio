"use client";

import NextLink, { type LinkProps } from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useLocale } from "./dictionary-context";
import { localizePath } from "./utils";

type Props = Omit<LinkProps, "href"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    href: string;
    children?: ReactNode;
    locale?: string;
  };

/**
 * Locale-aware Link. Internal paths are automatically prefixed with the active locale.
 * External URLs, mailto:, tel:, and hash-only hrefs are left unchanged.
 */
const Link = forwardRef<HTMLAnchorElement, Props>(function LocaleLink(
  { href, locale: localeOverride, ...props },
  ref
) {
  const activeLocale = useLocale();
  const locale = (localeOverride as typeof activeLocale) || activeLocale;

  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#") ||
      href.startsWith("/MehmedMuricCv"));

  const localizedHref = isExternal
    ? href
    : localizePath(href, locale);

  return <NextLink ref={ref} href={localizedHref} {...props} />;
});

export default Link;
