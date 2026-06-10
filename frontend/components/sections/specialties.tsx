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
        {specialties.map(({ name, icon: Icon }) => (
          <StaggerItem key={name}>
            <div className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-white p-4 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-card)]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-soft/30 text-gold-deep transition-colors group-hover:bg-gradient-gold group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-charcoal">{name}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <p className="mt-10 text-center text-sm text-gray-medium">
        Don&apos;t see your specialty?{" "}
        <a href="/contact" className="font-semibold text-gold hover:underline">
          Talk to us
        </a>{" "}
        — we bill across many more.
      </p>
    </Section>
  );
}
