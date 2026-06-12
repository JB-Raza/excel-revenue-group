"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  UserPlus,
  ClipboardList,
  FileCode2,
  Send,
  CreditCard,
  FileX2,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    icon: UserPlus,
    title: "Patient Registration",
    description:
      "Accurate demographic and insurance capture at intake — the foundation of a clean claim.",
  },
  {
    icon: ClipboardList,
    title: "Charge Capture",
    description:
      "Every billable service is recorded completely so no revenue slips through.",
  },
  {
    icon: FileCode2,
    title: "Medical Coding",
    description:
      "Specialty-specific, compliant coding that reflects the care delivered.",
  },
  {
    icon: Send,
    title: "Claims Submission",
    description:
      "Scrubbed, clean claims submitted electronically for a high first-pass rate.",
  },
  {
    icon: CreditCard,
    title: "Payment Posting",
    description:
      "Payments are posted and reconciled promptly with full transparency.",
  },
  {
    icon: FileX2,
    title: "Denial Management",
    description:
      "Denied and underpaid claims are corrected, appealed, and prevented at the root.",
  },
  {
    icon: Wallet,
    title: "A/R Management",
    description:
      "Relentless follow-up keeps A/R days low and recovers aging revenue.",
  },
];

export function RevenueCycle() {
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-charcoal py-[var(--section-y)] text-white"
      id="process"
    >
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="The Excel Revenue Cycle"
          description="A proven, end-to-end process that turns every patient encounter into captured, collected revenue."
          invert
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch">
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="sticky top-[calc(7rem+10px)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-white/5 shadow-[var(--shadow-card)]">
                <motion.div
                  className="absolute inset-0"
                  initial={
                    reduce ? false : { opacity: 0, rotate: -360, scale: 0.72 }
                  }
                  whileInView={
                    reduce ? undefined : { opacity: 1, rotate: 0, scale: 1 }
                  }
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 1.05, ease: EASE }}
                >
                  <Image
                    src="/images/sections/rcm-process.png"
                    alt="Revenue cycle management process overview"
                    fill
                    sizes="28rem"
                    className="object-contain p-4"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-[27px] top-0 hidden h-full w-px bg-white/10 md:block"
            aria-hidden
          />
          <motion.div
            className="absolute left-[27px] top-0 hidden w-px origin-top bg-gradient-to-b from-gold-light via-gold to-gold-deep md:block"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={reduce ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: EASE }}
            style={{ height: "100%" }}
            aria-hidden
          />

          <ol className="flex flex-col gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  className="relative flex gap-5 md:gap-8"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="flex-1 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-sm font-bold text-gold">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-1 font-heading text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
