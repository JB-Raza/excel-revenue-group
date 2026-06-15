import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { services } from "@/lib/services";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import { pageHeroImages } from "@/lib/images";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description:
    "Explore Excel Revenue Group's full range of medical billing and revenue cycle management services — from credentialing and eligibility to denial management and A/R recovery.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHeader
        eyebrow="Our Services"
        title="Complete Revenue Cycle Management"
        description="A full suite of services designed to maximize your revenue, reduce denials, and free your team to focus on patient care."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        image={pageHeroImages.services}
      />

      <Section variant="white">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-border/60 bg-white p-8 shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="font-heading text-xl font-bold text-charcoal">
                    {service.title}
                  </h2>
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
      </Section>

      <ContactCTA />
    </>
  );
}
