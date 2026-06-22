import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { RoundedVisual } from "@/components/ui/rounded-visual";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SpecialtyCard } from "@/components/sections/specialty-card";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  absoluteUrl,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getSpecialtyHeroImage } from "@/lib/images";
import {
  specialties,
  getSpecialty,
  getRelatedSpecialties,
} from "@/lib/specialties";

export function generateStaticParams() {
  return specialties.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/specialties/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const specialty = getSpecialty(slug);
  if (!specialty) return {};
  return buildPageMetadata({
    title: specialty.metaTitle,
    description: specialty.metaDescription,
    path: `/specialties/${specialty.slug}`,
    image: specialty.heroImage,
    imageAlt: specialty.heroImageAlt,
  });
}

export default async function SpecialtyPage(props: PageProps<"/specialties/[slug]">) {
  const { slug } = await props.params;
  const specialty = getSpecialty(slug);
  if (!specialty) notFound();

  const related = getRelatedSpecialties(slug);
  const Icon = specialty.icon;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: `${specialty.name} Billing — ${siteConfig.name}`,
            description: specialty.metaDescription,
            url: absoluteUrl(`/specialties/${specialty.slug}`),
            image: specialty.heroImage,
            provider: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            areaServed: "US",
          },
          faqSchema(specialty.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Specialties", path: "/specialties" },
            { name: specialty.name, path: `/specialties/${specialty.slug}` },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Specialty Billing"
        title={specialty.name}
        description={specialty.tagline}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Specialties", href: "/specialties" },
          { name: specialty.name },
        ]}
        image={getSpecialtyHeroImage(specialty.heroImage, specialty.heroImageAlt)}
      />

      <Section variant="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
          <FadeUp className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/25 bg-gold-soft/25 px-4 py-1.5 text-sm font-semibold text-gold-deep">
              <Sparkles className="h-4 w-4" />
              Specialty-trained coders
            </span>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
              <Icon className="h-7 w-7" />
            </span>
            <h2 className="font-heading text-3xl font-bold text-charcoal">
              Why {specialty.name} Billing Is Different
            </h2>
            <p className="text-base leading-relaxed text-gray-medium">
              {specialty.overview}
            </p>
          </FadeUp>

          {specialty.image ? (
            <RoundedVisual
              src={specialty.image}
              alt={`${specialty.name} billing specialty`}
              aspect="square"
              fit="contain"
              className="mx-auto max-w-sm lg:mx-0 lg:max-w-none"
            />
          ) : (
            <div className="mx-auto grid aspect-square max-w-sm place-items-center rounded-3xl bg-gradient-to-br from-gold-soft/45 via-surface to-gold-soft/20 ring-1 ring-gold/15 shadow-[var(--shadow-soft)] lg:mx-0 lg:max-w-none">
              <Icon className="h-24 w-24 text-gold-deep" />
            </div>
          )}
        </div>
      </Section>

      <Section variant="surface">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-charcoal">
            What We Bill For
          </h2>
          <p className="mt-3 text-gray-medium">
            Coders matched to your discipline — not generalists learning on your claims.
          </p>
        </FadeUp>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {specialty.highlights.map((item) => (
            <StaggerItem key={item}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-gold/15 bg-gradient-to-br from-white via-white to-gold-soft/20 p-6 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-[var(--shadow-card)]">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-sm font-medium leading-relaxed text-charcoal">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section variant="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <FadeUp>
            <h2 className="font-heading text-3xl font-bold text-charcoal">
              Our Billing Focus
            </h2>
            <p className="mt-3 text-gray-medium">
              The details that protect your revenue in {specialty.name.toLowerCase()}.
            </p>
            <Button href="/contact" className="mt-8">
              Get a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </FadeUp>
          <FadeUp delay={0.1}>
            <ul className="flex flex-col gap-4">
              {specialty.billingFocus.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface px-5 py-4 text-sm leading-relaxed text-charcoal"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </Section>

      {specialty.faqs.length > 0 ? (
        <Section variant="surface">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <FadeUp>
              <h2 className="font-heading text-3xl font-bold text-charcoal">
                Common Questions
              </h2>
              <p className="mt-3 text-gray-medium">
                Considering ERG for {specialty.name.toLowerCase()} billing?{" "}
                <Link href="/contact" className="font-semibold text-gold hover:underline">
                  Talk to our team
                </Link>
                .
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Accordion items={specialty.faqs} />
            </FadeUp>
          </div>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section variant="white">
          <FadeUp className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold text-charcoal">
                Related Specialties
              </h2>
              <p className="mt-2 text-gray-medium">
                Explore more disciplines we bill for.
              </p>
            </div>
            <Link
              href="/specialties"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline"
            >
              View all specialties
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </FadeUp>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <SpecialtyCard key={item.slug} specialty={item} variant="grid" />
            ))}
          </div>
        </Section>
      ) : null}

      <ContactCTA />
    </>
  );
}
