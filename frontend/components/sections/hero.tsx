import { ArrowRight, ShieldCheck, Star, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/animations/motion-primitives";
import { HeroVisual } from "./hero-visual";

const trustSignals = [
  { icon: ShieldCheck, label: "HIPAA Compliant" },
  { icon: Zap, label: "Faster Reimbursements" },
  { icon: Star, label: "98% Clean Claim Rate" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Decorative gradient shapes */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-gold-soft/20 blur-3xl"
        aria-hidden
      />
      <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-8 lg:py-28">
        {/* Left: content */}
        <SlideIn from="left" className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white px-4 py-1.5 text-sm font-semibold text-gold-deep shadow-[var(--shadow-soft)]">
            <span className="h-2 w-2 rounded-full bg-gradient-gold" />
            Premium Medical Billing & RCM
          </span>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl">
            Maximize{" "}
            <span className="text-gradient-gold">Revenue.</span>
            <br />
            Minimize Billing Errors.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-gray-medium">
            Excel Revenue Group helps healthcare providers get paid faster with
            expert revenue cycle management — fewer denials, cleaner claims, and
            transparent reporting at every step.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Schedule Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Services
            </Button>
          </div>

          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
            {trustSignals.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-charcoal"
              >
                <Icon className="h-4 w-4 text-gold" />
                {label}
              </li>
            ))}
          </ul>
        </SlideIn>

        {/* Right: visual */}
        <SlideIn from="right" delay={0.15} className="w-full">
          <HeroVisual />
        </SlideIn>
      </Container>
    </section>
  );
}
