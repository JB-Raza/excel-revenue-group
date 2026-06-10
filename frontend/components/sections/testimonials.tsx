import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

// NOTE: Representative testimonials — replace with real client quotes when provided.
type Testimonial = { quote: string; name: string; role: string };

const testimonials: Testimonial[] = [
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
  {
    quote:
      "We recovered aged A/R we had written off as lost. The old-claim recovery project alone paid for itself many times over.",
    name: "Billing Manager",
    role: "Orthopedic Practice",
  },
  {
    quote:
      "Switching to ERG was seamless — no disruption, no migration headaches. Within a quarter our days in A/R were way down.",
    name: "Practice Manager",
    role: "Internal Medicine",
  },
  {
    quote:
      "The transparency is what won us over. We always know exactly where every claim stands and where our revenue is coming from.",
    name: "Physician & Founder",
    role: "Pain Management Clinic",
  },
  {
    quote:
      "Their denial management is relentless. Claims that would have been written off are now consistently overturned and paid.",
    name: "Revenue Cycle Lead",
    role: "Cardiology Group",
  },
  {
    quote:
      "Eligibility checks before every visit cut our front-end denials enormously. Patients also get accurate estimates upfront.",
    name: "Front Office Director",
    role: "Pediatric Practice",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="mx-3 flex h-full w-[280px] shrink-0 flex-col gap-5 rounded-[var(--radius-card)] border border-border/60 bg-white p-6 shadow-[var(--shadow-card)] sm:w-[400px] sm:p-8">
      <div className="flex items-center justify-between">
        <Quote className="h-8 w-8 text-gold-soft" />
        <div className="flex gap-0.5" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
          ))}
        </div>
      </div>
      <blockquote className="line-clamp-4 min-h-[6.25rem] flex-1 text-[0.95rem] leading-relaxed text-charcoal">
        “{t.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-border/60 pt-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-gold font-heading text-sm font-bold text-white">
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
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: Testimonial[];
  duration: string;
  reverse?: boolean;
}) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div
        className="marquee-track py-2"
        style={{
          ["--marquee-duration" as string]: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${t.role}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4);

  return (
    <Section variant="white" id="testimonials">
      <SectionHeading
        eyebrow="Client Voices"
        title="Trusted by Healthcare Providers"
        description="Practices of every size rely on Excel Revenue Group to protect and grow their revenue."
      />

      <div className="mt-14 flex flex-col gap-6">
        <MarqueeRow items={firstRow} duration="55s" />
        <MarqueeRow items={secondRow} duration="65s" reverse />
      </div>
    </Section>
  );
}
