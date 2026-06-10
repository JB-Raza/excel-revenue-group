import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-btn)] transition-all duration-300 ease-[var(--ease-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-gold text-white shadow-[var(--shadow-gold)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(200,155,60,0.35)]",
  secondary:
    "border border-gold text-gold bg-transparent hover:bg-gold hover:text-white hover:-translate-y-0.5",
  ghost: "text-charcoal hover:text-gold",
  light:
    "bg-white text-charcoal shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]",
};

const sizes: Record<Size, string> = {
  sm: "h-[clamp(2.25rem,2.13rem+0.54vw,2.5rem)] px-[clamp(0.875rem,0.79rem+0.41vw,1.125rem)] text-sm",
  md: "h-[clamp(2.75rem,2.63rem+0.54vw,3rem)] px-[clamp(1.25rem,1.08rem+0.76vw,1.625rem)] text-[clamp(0.9rem,0.86rem+0.16vw,0.975rem)]",
  lg: "h-[clamp(3.25rem,3.05rem+0.87vw,3.5rem)] px-[clamp(1.75rem,1.5rem+1.09vw,2.25rem)] text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...rest
  } = props as ButtonAsButton;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
