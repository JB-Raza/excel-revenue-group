import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "./container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Alternating background to create visual rhythm. */
  variant?: "white" | "surface" | "charcoal";
  /** Render without the inner Container (for full-bleed sections). */
  bleed?: boolean;
  id?: string;
};

const bg: Record<NonNullable<SectionProps["variant"]>, string> = {
  white: "bg-white",
  surface: "bg-surface",
  charcoal: "bg-charcoal text-white",
};

/** Full-width section with consistent vertical rhythm (72px mobile / 120px desktop). */
export function Section({
  children,
  className,
  variant = "white",
  bleed = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-[var(--section-y)]", bg[variant], className)}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
