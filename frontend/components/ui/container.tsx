import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Centered content wrapper: max-width 1280px. 16px inline padding on the
 * smallest screens, 24px from `sm` up (per theme). */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6", className)}>
      {children}
    </Tag>
  );
}
