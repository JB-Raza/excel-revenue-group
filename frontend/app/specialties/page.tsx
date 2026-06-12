import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { specialties } from "@/lib/content";

export const metadata: Metadata = {
  title: "Medical Specialties We Serve",
  description:
    "Excel Revenue Group provides specialty-specific medical billing for cardiology, orthopedics, behavioral health, pediatrics, surgery, labs, and more.",
  alternates: { canonical: "/specialties" },
};

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
      />

      <Section variant="white">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map(({ name, slug, icon: Icon, image, description }) => (
            <StaggerItem key={slug}>
              <article
                id={slug}
                className="group flex h-full scroll-mt-28 flex-col gap-4 rounded-[var(--radius-card)] border border-border/60 bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl bg-gold-soft/45 transition-all duration-300 ease-[var(--ease-premium)] group-hover:bg-charcoal">
                  {image ? (
                    <Image
                      src={image}
                      alt=""
                      width={56}
                      height={56}
                      className="h-9 w-9 object-contain brightness-0 opacity-80 transition-all duration-300 ease-[var(--ease-premium)] group-hover:opacity-100 group-hover:invert"
                      aria-hidden
                    />
                  ) : (
                    <Icon className="h-7 w-7 text-gold-deep transition-colors duration-300 group-hover:text-white" />
                  )}
                </span>
                <h2 className="font-heading text-xl font-bold text-charcoal">{name}</h2>
                <p className="text-sm leading-relaxed text-gray-medium">{description}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <ContactCTA />
    </>
  );
}
