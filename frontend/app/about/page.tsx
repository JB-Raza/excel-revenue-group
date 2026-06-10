import type { Metadata } from "next";
import { Target, Eye, TrendingUp, ShieldCheck, Users, HeartHandshake, Award, Quote } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/animations/counter";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { PageHeader } from "@/components/sections/page-header";
import { CeoPortrait } from "@/components/sections/ceo-portrait";
import { ContactCTA } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// TODO: replace with the real CEO details, and add the photo at
// public/images/ceo.jpg (a 4:5 portrait works best).
const ceo = {
  name: "[CEO Name]",
  role: "Founder & Chief Executive Officer",
  initials: "EC",
  photo: "/images/ceo.jpg",
  bio: [
    "With years of hands-on experience in medical billing and revenue cycle management, our CEO founded Excel Revenue Group on a simple belief: providers deserve a billing partner that treats their revenue as carefully as they treat their patients.",
    "Under this leadership, the team has built a practice rooted in accuracy, transparency, and accountability — helping practices of every size reduce denials, accelerate reimbursements, and gain full visibility into their financial health.",
  ],
  quote:
    "Our success is measured by one thing — the revenue we help our clients capture and keep.",
};

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Excel Revenue Group is a premium medical billing and revenue cycle management partner focused on increasing provider revenue through accuracy, transparency, and true partnership.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: ShieldCheck, title: "Integrity", description: "We protect your revenue and your reputation with compliant, ethical practices." },
  { icon: TrendingUp, title: "Results", description: "We measure our success by the revenue we recover and grow for you." },
  { icon: Users, title: "Partnership", description: "We work as an extension of your team, fully invested in your outcomes." },
  { icon: Award, title: "Excellence", description: "We hold every claim, call, and report to a premium standard." },
];

const stats = [
  { value: 98, suffix: "%", label: "Clean Claim Rate" },
  { value: 30, suffix: "%", label: "Avg. Revenue Lift" },
  { value: 24, suffix: "/7", label: "Support Availability" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="About Us"
        title="Your Partner in Revenue Growth"
        description="Excel Revenue Group helps healthcare providers excel their revenue through expert billing, transparent reporting, and a relentless focus on results."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
      />

      {/* Overview */}
      <Section variant="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <FadeUp className="flex flex-col gap-5">
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="Built Around Your Bottom Line"
            />
            <p className="text-base leading-relaxed text-gray-medium">
              {siteConfig.name} is a medical billing and revenue cycle management
              company dedicated to helping healthcare providers get paid faster
              and more completely. We combine deep billing expertise with a
              partnership mindset — handling the complex, time-consuming work of
              claims, denials, and follow-up so you can focus on patient care.
            </p>
            <p className="text-base leading-relaxed text-gray-medium">
              From small practices to multi-specialty groups, we tailor our
              approach to each client, working inside your existing systems and
              giving you full transparency into every step of your revenue cycle.
            </p>
          </FadeUp>

          <Stagger className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-border/60 bg-surface p-6 text-center">
                  <p className="font-heading text-4xl font-extrabold text-gradient-gold">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs font-medium text-charcoal">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section variant="surface">
        <div className="grid gap-6 md:grid-cols-2">
          <FadeUp>
            <div className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-border/60 bg-white p-8 shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
                <Target className="h-6 w-6" />
              </span>
              <h2 className="font-heading text-xl font-bold text-charcoal">Our Mission</h2>
              <p className="text-sm leading-relaxed text-gray-medium">
                To deliver meaningful financial outcomes for healthcare providers
                by streamlining the billing process — increasing revenue through
                effective handling of claims, denials, and resubmissions, and
                preventing future challenges before they happen.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-border/60 bg-white p-8 shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-charcoal text-gold">
                <Eye className="h-6 w-6" />
              </span>
              <h2 className="font-heading text-xl font-bold text-charcoal">Our Vision</h2>
              <p className="text-sm leading-relaxed text-gray-medium">
                To be the most trusted revenue cycle partner in healthcare — known
                for accuracy, transparency, and a genuine commitment to the growth
                and stability of every practice we serve.
              </p>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* Core values */}
      <Section variant="white">
        <SectionHeading
          eyebrow="Our Values"
          title="What Guides Our Work"
          description="The principles behind every claim we file and every relationship we build."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-border/60 bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-soft/30 text-gold-deep">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-heading text-lg font-bold text-charcoal">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-medium">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* CEO / Leadership */}
      <Section variant="surface">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <FadeUp>
            <CeoPortrait
              src={ceo.photo}
              name={ceo.name}
              fallbackInitials={ceo.initials}
            />
          </FadeUp>

          <FadeUp delay={0.1} className="flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              <span className="h-px w-6 bg-gold" aria-hidden />
              Leadership
            </span>
            <div>
              <h2 className="font-heading text-4xl font-bold text-charcoal">
                {ceo.name}
              </h2>
              <p className="mt-1 text-base font-medium text-gold-deep">{ceo.role}</p>
            </div>

            {ceo.bio.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-gray-medium">
                {paragraph}
              </p>
            ))}

            <blockquote className="relative mt-2 rounded-[var(--radius-card)] border border-border/60 bg-white p-6 shadow-[var(--shadow-soft)]">
              <Quote className="absolute -top-3 left-6 h-7 w-7 text-gold" aria-hidden />
              <p className="font-heading text-lg font-medium italic text-charcoal">
                {ceo.quote}
              </p>
            </blockquote>
          </FadeUp>
        </div>
      </Section>

      {/* Why ERG strip */}
      <Section variant="white">
        <div className="rounded-[var(--radius-xl)] border border-border/60 bg-surface p-8 shadow-[var(--shadow-card)] sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2">
                <HeartHandshake className="h-6 w-6 text-gold" />
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                  Why ERG
                </span>
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal">
                Revenue expertise, delivered like a partner — not a vendor.
              </h2>
              <p className="mt-3 text-gray-medium">
                We pair specialized billing knowledge with responsiveness and
                accountability, so your revenue is always in capable hands.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
