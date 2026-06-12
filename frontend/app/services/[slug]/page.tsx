import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { services, getService, getRelatedServices } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { getServiceHeroImage } from "@/lib/images";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(slug);
  const Icon = service.icon;
  const heroImage = getServiceHeroImage(slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Service"
        title={service.heroHeadline}
        description={service.shortDescription}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title },
        ]}
        image={
          heroImage
            ? { ...heroImage, alt: `${service.title} — ${siteConfig.name}` }
            : undefined
        }
      />

      {/* Overview + what's included */}
      <Section variant="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <FadeUp className="flex flex-col gap-6">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
              <Icon className="h-7 w-7" />
            </span>
            <h2 className="font-heading text-3xl font-bold text-charcoal">
              Overview
            </h2>
            <p className="text-base leading-relaxed text-gray-medium">
              {service.overview}
            </p>

            <h3 className="mt-2 font-heading text-xl font-bold text-charcoal">
              Key Benefits
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-charcoal">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-soft/40 text-gold-deep">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* What's included card */}
          <FadeUp delay={0.1}>
            <div className="sticky top-28 rounded-[var(--radius-card)] border border-border/60 bg-surface p-8 shadow-[var(--shadow-soft)]">
              <h3 className="font-heading text-lg font-bold text-charcoal">
                What&apos;s Included
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href="/contact" className="mt-7 w-full">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* Process */}
      <Section variant="surface">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-charcoal">
            How We Deliver
          </h2>
          <p className="mt-3 text-gray-medium">
            A clear, proven process built around accuracy and accountability.
          </p>
        </FadeUp>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="flex h-full flex-col gap-3 rounded-[var(--radius-card)] border border-border/60 bg-white p-6 shadow-[var(--shadow-soft)]">
                <span className="font-heading text-3xl font-extrabold text-gradient-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-base font-bold text-charcoal">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-medium">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* FAQ */}
      {service.faqs.length > 0 ? (
        <Section variant="white">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <FadeUp>
              <h2 className="font-heading text-3xl font-bold text-charcoal">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-gray-medium">
                Have a different question?{" "}
                <Link href="/contact" className="font-semibold text-gold hover:underline">
                  Get in touch
                </Link>
                .
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Accordion items={service.faqs} />
            </FadeUp>
          </div>
        </Section>
      ) : null}

      {/* Related services */}
      {related.length > 0 ? (
        <Section variant="surface">
          <FadeUp className="mb-10">
            <h2 className="font-heading text-3xl font-bold text-charcoal">
              Related Services
            </h2>
          </FadeUp>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group flex flex-col gap-3 rounded-[var(--radius-card)] border border-border/60 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft/30 text-gold-deep">
                    <RIcon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-base font-bold text-charcoal">
                    {r.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>
      ) : null}

      <ContactCTA />
    </>
  );
}
