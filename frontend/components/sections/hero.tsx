import Image from "next/image";
import { ArrowRight, ShieldCheck, Star, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/animations/motion-primitives";
import { HeroVisual } from "./hero-visual";
import { pageHeroImages } from "@/lib/images";

const trustSignals = [
  { icon: ShieldCheck, label: "HIPAA Compliant" },
  { icon: Zap, label: "Faster Reimbursements" },
  { icon: Star, label: "98% Clean Claim Rate" },
];

export function Hero() {
  const homeHero = pageHeroImages.home;

  return (
    <section className="relative min-h-[28rem] overflow-hidden bg-surface md:min-h-[36rem] lg:min-h-[42rem]">
      {/* Hero background photo — visible but softened for text legibility */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={homeHero.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/62 from-0% via-charcoal/45 via-40% to-charcoal/25 to-100%" />
      </div>
      {/* Decorative gradient shapes */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-gold-soft/20 blur-3xl"
        aria-hidden
      />
      <Container className="relative z-10 grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-8 lg:py-28">
        {/* Left: content */}
        <SlideIn
          from="left"
          className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white px-4 py-1.5 text-sm font-semibold text-gold-deep shadow-[var(--shadow-soft)]">
            <span className="h-2 w-2 rounded-full bg-gradient-gold" />
            Premium Medical Billing &amp; RCM
          </span>

          <h1 className="font-heading text-6xl font-extrabold leading-[1.1] text-white">
            Maximize{" "}
            <span className="text-gradient-gold">Revenue.</span>
            <br />
            Minimize Billing Errors.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/85">
            Excel Revenue Group helps healthcare providers get paid faster with
            expert revenue cycle management — fewer denials, cleaner claims, and
            transparent reporting at every step.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/contact" size="lg">
              Schedule Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Services
            </Button>
          </div>

          <ul className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
            {trustSignals.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-white/90"
              >
                <Icon className="h-4 w-4 text-gold-light" />
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
