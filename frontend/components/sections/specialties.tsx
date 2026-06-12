import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { specialties } from "@/lib/content";

export function Specialties() {
  return (
    <Section variant="white" id="specialties">
      <SectionHeading
        eyebrow="Specialties We Serve"
        title="Specialty-Specific Billing Expertise"
        description="Every specialty has its own codes, modifiers, payer rules, and denial patterns. Our coders are matched to your discipline — never generalists."
      />

      <Stagger
        className="mt-14 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        step={0.05}
      >
        {specialties.map(({ name, icon: Icon, image }) => (
          <StaggerItem key={name}>
            <div className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-white p-4 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-card)]">
              <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-gold-soft/45 transition-all duration-300 ease-[var(--ease-premium)] group-hover:bg-charcoal">
                {image ? (
                  <Image
                    src={image}
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
              <span className="text-sm font-semibold text-charcoal">{name}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <p className="mt-10 text-center text-sm text-gray-medium">
        Don&apos;t see your specialty?{" "}
        <Link href="/contact" className="font-semibold text-gold hover:underline">
          Talk to us
        </Link>{" "}
        — or{" "}
        <Link href="/specialties" className="font-semibold text-gold hover:underline">
          view all specialties
        </Link>
        .
      </p>
    </Section>
  );
}
