import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import type { Specialty } from "@/lib/specialties";

type SpecialtyCardProps = {
  specialty: Specialty;
  variant?: "grid" | "compact";
};

function SpecialtyIcon({ specialty }: { specialty: Specialty }) {
  const Icon = specialty.icon;
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-gold-soft/45 transition-all duration-300 ease-[var(--ease-premium)] group-hover:bg-charcoal">
      {specialty.image ? (
        <Image
          src={specialty.image}
          alt=""
          width={44}
          height={44}
          className="h-7 w-7 object-contain brightness-0 opacity-80 transition-all duration-300 ease-[var(--ease-premium)] group-hover:opacity-100 group-hover:invert"
          aria-hidden
        />
      ) : (
        <Icon className="h-5 w-5 text-gold-deep transition-colors duration-300 group-hover:text-white" />
      )}
    </span>
  );
}

/** Visual card linking to a specialty detail page. */
export function SpecialtyCard({ specialty, variant = "grid" }: SpecialtyCardProps) {
  const Icon = specialty.icon;

  if (variant === "compact") {
    return (
      <Link
        href={`/specialties/${specialty.slug}`}
        className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-white p-4 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-card)]"
      >
        <SpecialtyIcon specialty={specialty} />
        <span className="text-sm font-semibold text-charcoal group-hover:text-gold-deep">
          {specialty.name}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/specialties/${specialty.slug}`}
      className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] transition-all duration-500 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)]"
    >
      <Image
        src={specialty.heroImage}
        alt={specialty.heroImageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/86 via-charcoal/52 to-charcoal/22 transition-opacity duration-500 group-hover:via-charcoal/58" />
      <div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-gold-deep shadow-[var(--shadow-soft)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-gradient-gold group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="relative z-10 flex flex-col gap-2 p-6">
        <h2 className="font-heading text-xl font-bold text-white">{specialty.name}</h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-white/75">
          {specialty.description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-gold-light">
          Explore billing
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

type SpecialtyGridProps = {
  items: Specialty[];
  variant?: "grid" | "compact";
  className?: string;
  step?: number;
};

export function SpecialtyGrid({
  items,
  variant = "grid",
  className,
  step = 0.06,
}: SpecialtyGridProps) {
  const gridClass =
    variant === "compact"
      ? "grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Stagger className={className ?? gridClass} step={step}>
      {items.map((specialty) => (
        <StaggerItem key={specialty.slug}>
          <SpecialtyCard specialty={specialty} variant={variant} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
