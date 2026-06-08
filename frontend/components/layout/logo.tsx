import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Brand lockup. Text-based for now (matches the gold "ERG" + charcoal wordmark).
 * When the transparent logo asset is provided, drop it in /public/logo and
 * replace the markup below with a <next/image>.
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
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-gold text-base font-extrabold tracking-tight text-white shadow-[var(--shadow-gold)]"
        aria-hidden
      >
        ERG
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[0.95rem] font-extrabold uppercase tracking-[0.08em]",
            invert ? "text-white" : "text-charcoal",
          )}
        >
          Excel Revenue
        </span>
        <span
          className={cn(
            "font-heading text-[0.95rem] font-extrabold uppercase tracking-[0.08em]",
            invert ? "text-white" : "text-charcoal",
          )}
        >
          Group
        </span>
      </span>
    </Link>
  );
}
