import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/motion-primitives";
import { whatsappUrl } from "@/lib/site";

type ContactCTAProps = {
  title?: string;
  description?: string;
};

/** Reusable consultation conversion band. */
export function ContactCTA({
  title = "Ready to Excel Your Revenue?",
  description = "Book a free consultation and discover how much revenue your practice could be recovering.",
}: ContactCTAProps) {
  return (
    <section className="py-[var(--section-y)]">
      <Container>
        <FadeUp className="relative overflow-hidden rounded-[var(--radius-xl)] bg-gradient-charcoal px-6 py-14 text-center sm:px-12 md:py-20">
          {/* Decorative gold glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={whatsappUrl()} external variant="light" size="lg">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
