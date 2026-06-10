import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { FadeUp } from "@/components/animations/motion-primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo";
import { homepageFaqs } from "@/lib/content";

export function Faq() {
  return (
    <Section variant="surface" id="faq">
      <JsonLd data={faqSchema(homepageFaqs)} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <FadeUp>
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <span className="h-px w-6 bg-gold" aria-hidden />
            FAQ
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-charcoal">
            Common Questions, Answered
          </h2>
          <p className="mt-4 text-gray-medium">
            Everything you need to know about working with Excel Revenue Group.
            Still curious?{" "}
            <Link href="/contact" className="font-semibold text-gold hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Accordion items={homepageFaqs} />
        </FadeUp>
      </div>
    </Section>
  );
}
