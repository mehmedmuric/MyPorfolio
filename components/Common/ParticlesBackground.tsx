"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/media";

type ParticlesBackgroundProps = {
  className?: string;
  density?: number;
  /** Hover grab interactions — disable on dense pages like /projects */
  interactive?: boolean;
  /** Defer engine init until the main thread is idle (ms fallback) */
  idleDelay?: number;
};

const ParticlesBackground = ({
  className,
  density = 28,
  interactive = true,
  idleDelay = 0,
}: ParticlesBackgroundProps) => {
  const [init, setInit] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)", true);
  const reducedMotion = usePrefersReducedMotion();
  const reactId = useId().replace(/:/g, "");
  const particleId = `tsparticles-${reactId}`;

  useEffect(() => {
    if (reducedMotion || isMobile) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if (cancelled) return;
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        if (!cancelled) setInit(true);
      });
    };

    const schedule = () => {
      if (idleDelay <= 0) {
        start();
        return;
      }

      const ric = (
        window as Window & {
          requestIdleCallback?: (
            cb: () => void,
            opts?: { timeout: number }
          ) => number;
        }
      ).requestIdleCallback;

      if (typeof ric === "function") {
        idleId = ric(start, { timeout: idleDelay + 800 });
      } else {
        timeoutId = setTimeout(start, idleDelay);
      }
    };

    schedule();

    return () => {
      cancelled = true;
      if (idleId !== undefined) {
        const cic = (
          window as Window & {
            cancelIdleCallback?: (id: number) => void;
          }
        ).cancelIdleCallback;
        cic?.(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [reducedMotion, isMobile, idleDelay]);

  const particleCount = useMemo(() => density, [density]);

  if (reducedMotion || isMobile || !init) return null;

  return (
    <div
      className={
        className ??
        "absolute inset-0 -z-0 overflow-hidden pointer-events-none"
      }
      aria-hidden="true"
    >
      <Particles
        id={particleId}
        className="absolute inset-0 h-full w-full"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 40,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          interactivity: {
            events: {
              onClick: { enable: false, mode: "push" },
              onHover: { enable: interactive, mode: "grab" },
            },
            modes: {
              grab: {
                distance: 110,
                links: { opacity: 0.3 },
              },
            },
          },
          particles: {
            color: { value: "#00FF88" },
            links: {
              color: "#00FF88",
              distance: 130,
              enable: true,
              opacity: 0.12,
              width: 1,
            },
            move: {
              enable: true,
              outModes: { default: "bounce" },
              speed: 0.45,
            },
            number: {
              density: { enable: true, width: 1000, height: 1000 },
              value: particleCount,
            },
            opacity: { value: 0.24 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2.2 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
