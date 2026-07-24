"use client";

import { Brand } from "@/types/brand";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Award } from "lucide-react";
import { useTranslations } from "@/lib/i18n/dictionary-context";

const CertificationCard = ({
  brand,
  index,
}: {
  brand: Brand;
  index: number;
}) => {
  const t = useTranslations().certifications;
  const { name, href, image, issued, platform, description, id } = brand;

  const itemKey = String(id) as "1" | "2" | "3";
  const localizedDescription =
    t.items?.[itemKey]?.description ?? description ?? "";

  const issuedText = (t.issued ?? "Issued {date}").replace(
    "{date}",
    issued ?? ""
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/10 active:border-primary/40 active:bg-white/[0.08] md:hover:-translate-y-1">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex h-full flex-col p-5 sm:p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between">
            <div className="relative h-16 w-16 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors group-hover:border-primary/20">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              ) : (
                <Award className="h-full w-full text-primary" aria-hidden="true" />
              )}
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {platform}
            </div>
          </div>

          <div className="flex-grow">
            <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
              {name}
            </h3>

            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary/70" aria-hidden="true" />
              <span suppressHydrationWarning>{issuedText}</span>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground/80">
              {localizedDescription}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-primary transition-colors hover:text-primary/80 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {t.viewCertificate}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <span className="cursor-not-allowed font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
                {t.comingSoon}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
