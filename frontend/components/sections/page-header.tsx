import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/animations/motion-primitives";
import type { HeroImage } from "@/lib/images";
import { cn } from "@/lib/utils";

type Crumb = { name: string; href?: string };

type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  align?: "left" | "center";
  image?: HeroImage;
};

/** Inner-page hero with optional full-width background image. */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  align = "center",
  image,
}: PageHeaderProps) {
  const useCenterText = align === "center" && !image;

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60 bg-surface",
        image && "min-h-[24rem] md:min-h-[32rem] lg:min-h-[38rem]",
      )}
    >
      {image ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            className={cn(
              image.fit === "contain"
                ? "object-contain object-right object-center scale-110 md:scale-125"
                : "object-cover object-center scale-105",
              image.position,
            )}
            priority
          />
          <div className="absolute inset-0 bg-surface/10" />
          <div
            className={cn(
              "absolute inset-0",
              image.fit === "contain"
                ? "bg-gradient-to-r from-surface/88 from-0% via-surface/45 via-32% to-transparent to-100%"
                : "bg-gradient-to-r from-surface/85 from-0% via-surface/35 via-38% to-surface/5 to-100%",
            )}
          />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-gold-soft/20 blur-3xl"
          aria-hidden
        />
      )}

      <Container className="relative z-10 flex min-h-[inherit] items-center py-20 md:py-28 lg:py-32">
        <FadeUp
          className={cn(
            "flex flex-col gap-4",
            useCenterText
              ? "mx-auto max-w-3xl items-center text-center"
              : "max-w-xl items-start text-left",
          )}
        >
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav
              aria-label="Breadcrumb"
              className={cn(
                "flex items-center gap-1.5 text-sm text-gray-medium",
                useCenterText ? "justify-center" : "",
              )}
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
            <span
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold",
                useCenterText ? "justify-center" : "",
              )}
            >
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
