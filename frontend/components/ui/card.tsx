import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds interactive hover lift (for clickable cards). */
  interactive?: boolean;
};

/** Premium content card: 20px radius, soft shadow, optional hover lift. */
export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-card)] border border-border/60",
        interactive &&
          "transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
