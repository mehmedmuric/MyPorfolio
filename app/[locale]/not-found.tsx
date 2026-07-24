"use client";

import Link from "@/lib/i18n/link";
import { useTranslations } from "@/lib/i18n/dictionary-context";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations().common;

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-display mb-3 text-3xl text-foreground sm:text-4xl">
        {t.notFound}
      </h1>
      <p className="mb-8 max-w-md text-body">{t.notFoundDescription}</p>
      <Button variant="premium" className="rounded-full" asChild>
        <Link href="/">{t.backHome}</Link>
      </Button>
    </section>
  );
}
