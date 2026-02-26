"use client";

import { cn } from "@/lib/utils";

const SectionTitle = ({
  title,
  paragraph,
  align = "center",
  mb = "4rem",
}: {
  title: string;
  paragraph?: string;
  align?: "left" | "center" | "right";
  mb?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-700",
        align === "center" ? "mx-auto text-center" : "",
        align === "right" ? "ml-auto text-right" : ""
      )}
      style={{ marginBottom: mb }}
    >
      <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
          {title}
        </span>
        <span className="text-primary">.</span>
      </h2>
      {paragraph && (
        <p className="text-base leading-relaxed text-muted-foreground/80 sm:text-lg">
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
