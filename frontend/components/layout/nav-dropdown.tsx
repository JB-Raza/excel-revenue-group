import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

const iconBoxClass =
  "grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-gold-soft/45 transition-all duration-300 ease-[var(--ease-premium)] group-hover:bg-charcoal";

const iconImageClass =
  "h-5 w-5 object-contain brightness-0 opacity-80 transition-all duration-300 ease-[var(--ease-premium)] group-hover:opacity-100 group-hover:invert";

const iconLucideClass =
  "h-5 w-5 text-gold-deep transition-colors duration-300 group-hover:text-white";

type NavDropdownItemProps = {
  href: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  image?: string;
};

export function NavDropdownItem({
  href,
  label,
  description,
  icon: Icon,
  image,
}: NavDropdownItemProps) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
    >
      <span className={iconBoxClass}>
        {image ? (
          <Image
            src={image}
            alt=""
            width={40}
            height={40}
            className={iconImageClass}
            aria-hidden
          />
        ) : Icon ? (
          <Icon className={iconLucideClass} />
        ) : null}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-semibold text-charcoal group-hover:text-gold">
          {label}
        </span>
        {description ? (
          <span className="line-clamp-1 text-xs text-gray-medium">{description}</span>
        ) : null}
      </span>
    </Link>
  );
}

type NavDropdownPanelProps = {
  children: ReactNode;
  footerHref: string;
  footerLabel: string;
};

export function NavDropdownPanel({
  children,
  footerHref,
  footerLabel,
}: NavDropdownPanelProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-border/70 bg-white shadow-[var(--shadow-card)]">
      <div className="grid grid-cols-2 gap-1 p-3">{children}</div>
      <Link
        href={footerHref}
        className="flex items-center justify-between border-t border-border/60 bg-surface px-6 py-4 text-sm font-semibold text-charcoal transition-colors hover:text-gold"
      >
        {footerLabel}
        <ArrowUpRight className="h-4 w-4 text-gold" />
      </Link>
    </div>
  );
}

export const navDropdownWidthClass = "w-[min(640px,calc(100vw-2rem))]";
