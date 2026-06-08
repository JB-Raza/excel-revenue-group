import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";

export function ServicesOverview() {
  return (
    <Section variant="white" id="services">
      <SectionHeading
        eyebrow="What We Do"
        title="End-to-End Revenue Cycle Services"
        description="From the first eligibility check to the final payment, we handle every step of your revenue cycle so you can focus on patient care."
      />

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-border/60 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-medium">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div className="mt-12 flex justify-center">
        <Button href="/services" variant="secondary">
          View All Services
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
