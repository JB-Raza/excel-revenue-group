import { PlugZap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/animations/motion-primitives";
import { emrSystems } from "@/lib/content";

export function EmrStrip() {
  return (
    <section className="border-y border-border/60 bg-white py-12">
      <Container>
        <FadeUp className="flex flex-col items-center gap-7">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <PlugZap className="h-4 w-4" />
            Works Inside Your Existing EMR
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {emrSystems.map((emr) => (
              <span
                key={emr}
                className="rounded-full border border-border/70 bg-surface px-5 py-2 font-heading text-sm font-bold text-charcoal/80"
              >
                {emr}
              </span>
            ))}
          </div>
          <p className="max-w-xl text-center text-sm text-gray-medium">
            No costly migration, no workflow disruption — our team is trained on
            your current systems, plus many more.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
