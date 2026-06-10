import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/animations/counter";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";

const stats = [
  { value: 98, suffix: "%", label: "Clean Claim Rate", sub: "on first submission" },
  { value: 3, prefix: "<", suffix: "%", label: "A/R Over 90 Days", sub: "kept consistently low" },
  { value: 14, suffix: " days", label: "Avg. Turnaround", sub: "faster reimbursements" },
  { value: 30, suffix: "%", label: "Revenue Increase", sub: "typical improvement" },
];

export function Stats() {
  return (
    <Section variant="white" id="results">
      <SectionHeading
        eyebrow="Proven Results"
        title="Numbers That Move Your Bottom Line"
        description="Our clients see measurable improvements across every key revenue cycle metric."
      />

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-border/60 bg-surface p-8 text-center">
              <p className="font-heading text-5xl font-extrabold text-gradient-gold">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="font-heading text-base font-bold text-charcoal">
                {s.label}
              </p>
              <p className="text-sm text-gray-medium">{s.sub}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
