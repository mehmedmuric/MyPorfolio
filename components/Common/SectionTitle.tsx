import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  paragraph?: string;
  align?: "left" | "center" | "right";
  mb?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

const SectionTitle = ({
  title,
  paragraph,
  align = "center",
  mb = "3.5rem",
  className,
  as: Heading = "h2",
}: SectionTitleProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-2xl",
        align === "center" && "mx-auto text-center",
        align === "right" && "ml-auto text-right",
        className
      )}
      style={{ marginBottom: mb }}
    >
      <Heading className="text-display mb-3 text-[1.75rem] leading-tight text-foreground sm:mb-5 sm:text-4xl md:text-[2.75rem]">
        <span className="bg-gradient-to-b from-foreground to-foreground/65 bg-clip-text text-transparent">
          {title}
        </span>
        <span className="text-primary" aria-hidden="true">
          .
        </span>
      </Heading>
      {paragraph && (
        <p className="mx-auto max-w-md text-[15px] leading-relaxed text-muted-foreground sm:max-w-xl sm:text-base">
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
