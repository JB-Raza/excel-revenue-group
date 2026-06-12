import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { teamMembers } from "@/lib/images";

/** Doctor / provider trust strip for homepage and about. */
export function ProviderTrust() {
  return (
    <Section variant="surface">
      <SectionHeading
        eyebrow="Trusted by Providers"
        title="Healthcare Professionals Choose ERG"
        description="Dedicated billing specialists who understand your specialty, your payers, and your revenue goals."
      />

      <Stagger
        className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6"
        step={0.06}
      >
        {teamMembers.map((member) => (
          <StaggerItem key={member.label}>
            <div className="group flex flex-col items-center gap-4 text-center">
              <div className="relative aspect-[3/4] w-full max-w-[10.5rem] overflow-hidden rounded-[var(--radius-xl)] border border-border/60 bg-white shadow-[var(--shadow-soft)] transition-all duration-500 ease-[var(--ease-premium)] group-hover:-translate-y-1.5 group-hover:shadow-[var(--shadow-card)] sm:max-w-[12rem] lg:max-w-[13.5rem]">
                <Image
                  src={member.src}
                  alt={member.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 13.5rem"
                  className="object-cover object-top transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-semibold text-charcoal">{member.label}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
