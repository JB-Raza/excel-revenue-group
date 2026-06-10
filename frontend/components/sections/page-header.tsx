import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/animations/motion-primitives";
import { cn } from "@/lib/utils";

type Crumb = { name: string; href?: string };

type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  align?: "left" | "center";
};

/** Consistent banner for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  align = "center",
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-surface">
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-gold-soft/20 blur-3xl"
        aria-hidden
      />
      <Container className="py-16 md:py-20">
        <FadeUp
          className={cn(
            "flex flex-col gap-4",
            align === "center"
              ? "mx-auto max-w-3xl items-center text-center"
              : "max-w-3xl items-start text-left",
          )}
        >
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-gray-medium"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.name} className="flex items-center gap-1.5">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-gold">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-charcoal">{crumb.name}</span>
                  )}
                  {i < breadcrumbs.length - 1 ? (
                    <ChevronRight className="h-3.5 w-3.5" />
                  ) : null}
                </span>
              ))}
            </nav>
          ) : null}

          {eyebrow ? (
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              {eyebrow}
            </span>
          ) : null}

          <h1 className="font-heading text-5xl font-extrabold leading-tight text-charcoal">
            {title}
          </h1>

          {description ? (
            <p className="text-lg leading-relaxed text-gray-medium">{description}</p>
          ) : null}
        </FadeUp>
      </Container>
    </section>
  );
}
