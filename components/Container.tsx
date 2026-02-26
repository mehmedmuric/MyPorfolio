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
                "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Container;
