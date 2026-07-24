import { cn } from "@/lib/utils";

export default function SectionSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "section-y w-full",
        "flex items-center justify-center",
        className
      )}
      aria-hidden="true"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 h-8 w-48 animate-pulse rounded-full bg-white/5" />
        <div className="mx-auto mb-16 h-4 max-w-md animate-pulse rounded-full bg-white/[0.04]" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
