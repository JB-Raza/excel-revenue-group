import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RoundedVisual } from "@/components/ui/rounded-visual";
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
              <RoundedVisual
                src={member.src}
                alt={member.alt}
                aspect="3/4"
                fit="cover"
                className="max-w-[10.5rem] sm:max-w-[12rem] lg:max-w-[13.5rem]"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 13.5rem"
                imageClassName="group-hover:scale-[1.02]"
              />
              <span className="text-sm font-semibold text-charcoal">{member.label}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
