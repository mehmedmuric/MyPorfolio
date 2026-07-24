"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface SocialButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> {
  href: string;
  icon: LucideIcon;
  label: string;
  size?: "sm" | "md";
}

const SocialButton = React.forwardRef<HTMLAnchorElement, SocialButtonProps>(
  ({ href, icon: Icon, label, size = "md", className, ...props }, ref) => {
    const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
    const boxSize = size === "sm" ? "h-11 w-11" : "h-12 w-12";

    return (
      <Link
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cn(
          boxSize,
          "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300",
          "hover:border-primary/40 hover:bg-primary/10 hover:text-primary",
          "active:scale-95 active:border-primary/40 active:bg-primary/10 active:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
        {...props}
      >
        <Icon className={iconSize} aria-hidden="true" />
      </Link>
    );
  }
);
SocialButton.displayName = "SocialButton";

export { SocialButton };
