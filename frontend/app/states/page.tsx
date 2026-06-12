import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, organizationSchema } from "@/lib/seo";
import { servedStates } from "@/lib/states";
import { pageHeroImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "States We Serve",
  description:
    "Excel Revenue Group provides nationwide medical billing and revenue cycle management services to healthcare practices across the United States.",
  alternates: { canonical: "/states" },
};

export default function StatesPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "States", path: "/states" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Service Areas"
        title="Nationwide Medical Billing Support"
        description={`${siteConfig.name} partners with practices across the United States — delivering specialty-specific billing wherever you operate.`}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "States" }]}
        image={pageHeroImages.states}
      />

      <Section variant="white">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <MapPin className="h-4 w-4" />
            {servedStates.length} States Served
          </div>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-medium">
            Whether you operate a single-location practice or a multi-state group,
            our remote billing teams integrate with your EMR and support your revenue
            cycle with the same accuracy and transparency in every state.
          </p>

          <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {servedStates.map((state) => (
              <StaggerItem key={state.abbr}>
                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface px-3 py-2.5 text-sm">
                  <span className="font-heading text-xs font-bold text-gold">{state.abbr}</span>
                  <span className="truncate font-medium text-charcoal">{state.name}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
