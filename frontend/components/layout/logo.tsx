import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/** Horizontal gold ERG lockup — navbar & footer. */
const LOGO_LOCKUP = "/excel_revenue_group_logo.png";

/**
 * Primary brand logo (gold ERG lockup with wordmark).
 * On the charcoal footer (invert), the dark wordmark sits on a white badge.
 */
export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("inline-flex items-center", className)}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center",
          invert ? "rounded-xl bg-white p-2.5 shadow-[var(--shadow-soft)]" : "",
        )}
      >
        <Image
          src={LOGO_LOCKUP}
          alt={`${siteConfig.name} logo`}
          width={500}
          height={500}
          priority={!invert}
          className={cn("w-auto object-contain", invert ? "h-16" : "h-20")}
        />
      </span>
    </Link>
  );
}
