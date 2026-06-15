import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpecialtyGrid } from "@/components/sections/specialty-card";
import { specialties } from "@/lib/specialties";

export function Specialties() {
  return (
    <Section variant="white" id="specialties">
      <SectionHeading
        eyebrow="Specialties We Serve"
        title="Specialty-Specific Billing Expertise"
        description="Every specialty has its own codes, modifiers, payer rules, and denial patterns. Our coders are matched to your discipline — never generalists."
      />

      <SpecialtyGrid
        items={specialties}
        variant="compact"
        className="mt-14 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        step={0.05}
      />

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
