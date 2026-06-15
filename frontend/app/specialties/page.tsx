import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { FadeUp } from "@/components/animations/motion-primitives";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SpecialtyGrid } from "@/components/sections/specialty-card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import { specialties } from "@/lib/specialties";
import { pageHeroImages } from "@/lib/images";

export const metadata: Metadata = buildPageMetadata({
  title: "Medical Specialties We Serve",
  description:
    "Excel Revenue Group provides specialty-specific medical billing for cardiology, orthopedics, behavioral health, pediatrics, surgery, labs, and more.",
  path: "/specialties",
});

export default function SpecialtiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Specialties", path: "/specialties" },
        ])}
      />

      <PageHeader
        eyebrow="Specialties"
        title="Billing Expertise for Every Discipline"
        description="Specialty-specific coders, modifiers, and payer rules — matched to your practice, never one-size-fits-all."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Specialties" }]}
        image={pageHeroImages.specialties}
      />

      <Section variant="white">
        <FadeUp className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-gray-medium">
            Select your specialty to see how ERG handles your codes, denials, and
            payer rules — with dedicated billing teams who know your field.
          </p>
        </FadeUp>
        <SpecialtyGrid items={specialties} />
      </Section>

      <Section variant="surface">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-base text-gray-medium">
            Don&apos;t see your specialty?{" "}
            <Link href="/contact" className="font-semibold text-gold hover:underline">
              Talk to us
            </Link>{" "}
            — we bill across many disciplines and can tailor a team to your practice.
          </p>
        </FadeUp>
      </Section>

      <ContactCTA />
    </>
  );
}
