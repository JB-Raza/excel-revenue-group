"use client";

import Image from "next/image";
import { PlugZap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeUp, Stagger, StaggerItem } from "@/components/animations/motion-primitives";
import { emrSystems } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function EmrStrip() {
  return (
    <section className="border-y border-border/60 bg-white py-16">
      <Container>
        <FadeUp className="flex flex-col items-center gap-10">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <PlugZap className="h-4 w-4" />
            Works Inside Your Existing EMR
          </span>

          <Stagger
            className="grid w-full grid-cols-2 place-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            step={0.04}
          >
            {emrSystems.map((emr) => (
              <StaggerItem key={emr.name} className="w-full">
                <div className="group flex h-20 w-full items-center justify-center px-2 sm:h-24">
                  <Image
                    src={emr.logo}
                    alt={`${siteConfig.name} integrates with ${emr.name}`}
                    width={160}
                    height={64}
                    className="h-12 w-auto max-w-[9.5rem] object-contain opacity-80 mix-blend-multiply transition-all duration-500 ease-[var(--ease-premium)] group-hover:scale-110 group-hover:opacity-100 sm:h-14 sm:max-w-[11rem] md:h-16"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="max-w-2xl text-center text-sm text-gray-medium">
            No costly migration, no workflow disruption — our team is trained on
            your current systems and {emrSystems.length}+ leading platforms.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
