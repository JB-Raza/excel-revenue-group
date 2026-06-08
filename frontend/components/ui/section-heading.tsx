import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { FadeUp } from "@/components/animations/motion-primitives";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  invert?: boolean;
};

/** Standardized eyebrow + title + description block for sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  invert = false,
}: SectionHeadingProps) {
  return (
    <FadeUp
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
          <span className="h-px w-6 bg-gold" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]",
          invert ? "text-white" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed sm:text-lg",
            invert ? "text-white/70" : "text-gray-medium",
          )}
        >
          {description}
        </p>
      ) : null}
    </FadeUp>
  );
}
