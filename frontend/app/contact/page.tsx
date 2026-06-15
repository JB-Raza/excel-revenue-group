import type { Metadata } from "next";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { FadeUp } from "@/components/animations/motion-primitives";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactMap } from "@/components/sections/contact-map";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, breadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import { pageHeroImages } from "@/lib/images";
import { siteConfig, whatsappUrl, mailtoUrl } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Excel Revenue Group. Call, email, or message us on WhatsApp, or request a free consultation to learn how we can grow your revenue.",
  path: "/contact",
});

const channels = [
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
    external: false,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: siteConfig.contact.email,
    href: mailtoUrl("Consultation request"),
    external: false,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us instantly",
    href: whatsappUrl(),
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Contact"
        title="Let's Talk About Your Revenue"
        description="Book a free, no-obligation consultation. Tell us about your practice and we'll show you where you could be capturing more revenue."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        image={pageHeroImages.contact}
      />

      <Section variant="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <FadeUp className="flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-charcoal">
                Get in Touch
              </h2>
              <p className="mt-2 text-gray-medium">
                Prefer to reach out directly? We&apos;re here to help.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {channels.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-border/60 bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-charcoal">
                      {label}
                    </span>
                    <span className="block break-words text-sm text-gray-medium group-hover:text-gold">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-border/60 bg-surface p-6">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span className="min-w-0 break-words text-sm text-charcoal">
                {siteConfig.contact.address}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-[var(--radius-card)] border border-border/60 bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
              <h2 className="font-heading text-2xl font-bold text-charcoal">
                Request a Consultation
              </h2>
              <p className="mt-2 mb-6 text-gray-medium">
                Fill out the form and we&apos;ll get back to you promptly.
              </p>
              <ContactForm />
            </div>
          </FadeUp>
        </div>
      </Section>

      <Section variant="surface">
        <FadeUp className="flex flex-col gap-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-charcoal">Find Us</h2>
            <p className="mt-2 text-gray-medium">
              Our team serves practices nationwide from the United States.
            </p>
          </div>
          <ContactMap />
        </FadeUp>
      </Section>
    </>
  );
}
