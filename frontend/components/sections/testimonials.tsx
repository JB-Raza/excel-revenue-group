import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/motion-primitives";

// NOTE: Representative testimonials — replace with real client quotes when provided.
const testimonials = [
  {
    quote:
      "Excel Revenue Group transformed our billing. Our denials dropped dramatically and collections are the highest they've ever been.",
    name: "Practice Administrator",
    role: "Multi-Specialty Clinic",
  },
  {
    quote:
      "Their team works inside our EMR like an extension of our staff. Reimbursements are faster and the reporting is crystal clear.",
    name: "Practice Owner",
    role: "Family Medicine",
  },
  {
    quote:
      "Credentialing used to take months and constant follow-up. ERG handled everything and got our providers in-network quickly.",
    name: "Operations Manager",
    role: "Behavioral Health Group",
  },
];

export function Testimonials() {
  return (
    <Section variant="surface" id="testimonials">
      <SectionHeading
        eyebrow="Client Voices"
        title="Trusted by Healthcare Providers"
        description="Practices of every size rely on Excel Revenue Group to protect and grow their revenue."
      />

      <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.name + t.role}>
            <figure className="flex h-full flex-col gap-5 rounded-[var(--radius-card)] border border-border/60 bg-white p-8 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between">
                <Quote className="h-8 w-8 text-gold-soft" />
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-charcoal">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border/60 pt-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-gold font-heading text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-heading text-sm font-bold text-charcoal">
                    {t.name}
                  </span>
                  <span className="block text-xs text-gray-medium">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
