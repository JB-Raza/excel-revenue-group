import { PhoneCall, Search, Plug, LineChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { onboardingSteps } from "@/lib/content";

const icons: LucideIcon[] = [PhoneCall, Search, Plug, LineChart];

export function GettingStarted() {
  return (
    <Section variant="surface" id="getting-started">
      <SectionHeading
        eyebrow="Getting Started"
        title="Onboarding in Four Simple Steps"
        description="Switching billing partners is easier than you think. We handle the heavy lifting so your cash flow never skips a beat."
      />

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {onboardingSteps.map((step, i) => {
          const Icon = icons[i];
          return (
            <StaggerItem key={step.title}>
              <div className="relative flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-border/60 bg-white p-7 shadow-[var(--shadow-soft)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-heading text-4xl font-extrabold text-gold-soft/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-medium">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <FadeUp className="mt-12 flex justify-center">
        <Button href="/contact" size="lg">
          Start With a Free Consultation
        </Button>
      </FadeUp>
    </Section>
  );
}
