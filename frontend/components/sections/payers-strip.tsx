"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { payers } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function PayersStrip() {
  return (
    <section className="border-y border-border/60 bg-surface py-16">
      <Container>
        <FadeUp className="flex flex-col items-center gap-10">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <ShieldCheck className="h-4 w-4" />
            Payers We Work With
          </span>

          <Stagger
            className="grid w-full grid-cols-2 place-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            step={0.04}
          >
            {payers.map((payer) => (
              <StaggerItem key={payer.name} className="w-full">
                <div className="group flex h-20 w-full items-center justify-center px-2 sm:h-24">
                  <Image
                    src={payer.logo}
                    alt={`${siteConfig.name} bills ${payer.name}`}
                    width={160}
                    height={64}
                    className="h-12 w-auto max-w-[9.5rem] object-contain opacity-80 mix-blend-multiply transition-all duration-500 ease-[var(--ease-premium)] group-hover:scale-110 group-hover:opacity-100 sm:h-14 sm:max-w-[11rem]"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="max-w-2xl text-center text-sm text-gray-medium">
            Commercial, Medicare, Medicaid, and regional plans — experienced with
            payer-specific rules, edits, and appeal workflows across{" "}
            {payers.length}+ major carriers.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
