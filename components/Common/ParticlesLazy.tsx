"use client";

import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(
  () => import("@/components/Common/ParticlesBackground"),
  { ssr: false }
);

type ParticlesLazyProps = {
  className?: string;
  density?: number;
  interactive?: boolean;
  idleDelay?: number;
};

/** Client boundary for server pages that want deferred particles. */
export default function ParticlesLazy({
  density = 16,
  interactive = false,
  idleDelay = 500,
  className,
}: ParticlesLazyProps) {
  return (
    <ParticlesBackground
      className={className}
      density={density}
      interactive={interactive}
      idleDelay={idleDelay}
    />
  );
}
