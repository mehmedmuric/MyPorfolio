import * as React from "react";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  containerClassName?: string;
  contained?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Comp = "section",
      className,
      containerClassName,
      contained = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Comp
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn("relative section-y overflow-hidden", className)}
        {...props}
      >
        {contained ? (
          <Container className={cn("relative z-10", containerClassName)}>
            {children}
          </Container>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Section.displayName = "Section";

export { Section };
