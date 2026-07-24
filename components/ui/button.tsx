"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_20px_hsla(var(--primary),0.12)] hover:bg-primary/90 hover:shadow-[0_0_28px_hsla(var(--primary),0.2)] active:bg-primary/85",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        outline:
          "border border-white/10 bg-transparent text-foreground hover:bg-white/5 hover:border-white/20 active:bg-white/[0.07]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        ghost: "hover:bg-white/5 hover:text-foreground active:bg-white/[0.08]",
        link: "text-primary underline-offset-4 hover:underline active:opacity-80",
        premium:
          "rounded-full bg-primary text-primary-foreground font-semibold shadow-[0_0_24px_hsla(var(--primary),0.16)] border border-primary/15 hover:shadow-[0_0_32px_hsla(var(--primary),0.24)] hover:bg-primary/90 active:bg-primary/85",
        glass:
          "rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 active:bg-white/[0.12]",
      },
      size: {
        default: "h-11 min-h-[44px] px-4 py-2",
        sm: "h-10 min-h-[40px] rounded-md px-3",
        lg: "h-12 min-h-[48px] rounded-md px-8",
        xl: "h-[52px] min-h-[52px] px-8 text-base",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
