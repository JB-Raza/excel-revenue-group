import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

/** Small pill used for trust signals / labels. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft/20 px-3 py-1 text-xs font-semibold text-gold-deep",
        className,
      )}
    >
      {children}
    </span>
  );
}
