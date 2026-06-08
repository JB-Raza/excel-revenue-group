import { TrendingUp, ShieldCheck, Users, LineChart, Clock, HeartHandshake } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";

const reasons = [
  {
    icon: TrendingUp,
    title: "Revenue-First Approach",
    description:
      "Every process is engineered to capture more revenue and shorten your payment cycle — not just push paper.",
  },
  {
    icon: ShieldCheck,
    title: "Accuracy & Compliance",
    description:
      "HIPAA-compliant workflows and specialty-specific coding keep your claims clean and your practice protected.",
  },
  {
    icon: Clock,
    title: "Faster Reimbursements",
    description:
      "Proactive eligibility checks and clean claim submission mean fewer delays and faster payments.",
  },
  {
    icon: Users,
    title: "Dedicated Experts",
    description:
      "A dedicated team that learns your practice and works inside your existing EMR and PM systems.",
  },
  {
    icon: LineChart,
    title: "Full Transparency",
    description:
      "Clear, regular reporting gives you complete visibility into your revenue cycle performance.",
  },
  {
    icon: HeartHandshake,
    title: "True Partnership",
    description:
      "We act as an extension of your team — responsive, accountable, and invested in your growth.",
  },
];

export function WhyERG() {
  return (
    <Section variant="surface" id="why-erg">
      <SectionHeading
        eyebrow="Why Excel Revenue Group"
        title="Built to Earn a Provider's Trust"
        description="We combine billing expertise with a partnership mindset, so your revenue is always in capable, accountable hands."
      />

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ icon: Icon, title, description }) => (
          <StaggerItem key={title}>
            <div className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-border/60 bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-soft/30 text-gold-deep">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-lg font-bold text-charcoal">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-medium">
                {description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
