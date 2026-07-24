"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { useMediaQuery } from "@/lib/media";
import { useTranslations } from "@/lib/i18n/dictionary-context";

export default function HeroVisual() {
  const t = useTranslations().hero;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 280, damping: 36 });
  const mouseY = useSpring(y, { stiffness: 280, damping: 36 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isTouch = useMediaQuery("(pointer: coarse)", false);

  return (
    <div className="relative flex h-full w-full items-center justify-center py-2 sm:py-4 lg:py-0">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 h-[240px] w-[200px] xs:h-[280px] xs:w-[230px] sm:h-[340px] sm:w-[270px] md:h-[400px] md:w-[310px] lg:h-[500px] lg:w-[380px]"
        style={
          !isTouch
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
        onMouseMove={!isTouch ? handleMouseMove : undefined}
        onMouseLeave={!isTouch ? handleMouseLeave : undefined}
      >
        <div
          className="absolute -inset-6 -z-20 rounded-[40px] bg-primary/15 opacity-50 blur-3xl sm:-inset-8 sm:opacity-60"
          aria-hidden="true"
        />

        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[24px] border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md sm:rounded-[28px]" />

        <div className="group relative h-full w-full overflow-hidden rounded-[22px] border border-white/[0.06] bg-black/50 sm:rounded-[26px]">
          <Image
            src="/images/logo/mehmed.jpg"
            alt={t.imageAlt}
            fill
            priority
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 475px) 220px, (max-width: 640px) 250px, (max-width: 1024px) 340px, 380px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 p-4 sm:p-6"
            style={!isTouch ? { transform: "translateZ(24px)" } : undefined}
          >
            <p className="text-sm font-medium text-white">{t.name}</p>
            <p className="mt-0.5 text-xs text-white/55">{t.role}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.55 }}
          className="absolute -right-2 top-10 z-20 hidden select-none sm:-right-3 sm:top-14 sm:block lg:-right-6"
          style={!isTouch ? { translateZ: 40 } : undefined}
        >
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.1] bg-background/80 px-3.5 py-2.5 shadow-xl backdrop-blur-xl">
            <div className="rounded-lg bg-primary/15 p-1.5 text-primary">
              <Briefcase className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {t.focusBadgeLabel}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {t.focusBadgeValue}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.55 }}
          className="absolute -left-2 bottom-16 z-20 hidden select-none sm:-left-3 sm:bottom-20 sm:block lg:-left-6"
          style={!isTouch ? { translateZ: 32 } : undefined}
        >
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.1] bg-background/80 px-3.5 py-2.5 shadow-xl backdrop-blur-xl">
            <div className="rounded-lg bg-white/5 p-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {t.basedInLabel}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {t.basedInValue}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
