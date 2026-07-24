import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

const Container: React.FC<ContainerProps> = ({
    children,
    className,
    as: Component = "div",
    ...props
}) => {
    return (
        <Component
            className={cn(
                "mx-auto w-full max-w-7xl pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))] lg:pl-[max(2rem,env(safe-area-inset-left))] lg:pr-[max(2rem,env(safe-area-inset-right))]",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Container;
