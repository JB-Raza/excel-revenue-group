import { Check, X, TrendingDown } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeUp } from "@/components/animations/motion-primitives";
import { comparison } from "@/lib/content";

export function WhyOutsource() {
  return (
    <Section variant="white" id="why-outsource">
      <SectionHeading
        eyebrow="The ERG Difference"
        title="What Revenue Leakage Is Costing You"
        description="Industry-wide, 9–12% of claims are denied on first submission and up to 65% of denials are never reworked. We close that gap."
      />

      <FadeUp className="mx-auto mt-14 max-w-3xl overflow-x-auto rounded-[var(--radius-card)] border border-border/60 bg-white shadow-[var(--shadow-card)]">
        <div className="min-w-[480px]">
          {/* Header row */}
          <div className="grid grid-cols-[1.6fr_1fr_1fr] bg-charcoal text-white">
            <div className="flex items-center gap-2 px-5 py-4 text-sm font-semibold">
              <TrendingDown className="h-4 w-4 text-gold" />
              Metric
            </div>
            <div className="px-4 py-4 text-center text-sm font-semibold text-white/70">
              Industry Avg.
            </div>
            <div className="bg-gradient-gold px-4 py-4 text-center text-sm font-bold text-white">
              With ERG
            </div>
          </div>

          {/* Rows */}
          {comparison.map((row, i) => (
            <div
              key={row.metric}
              className={`grid grid-cols-[1.6fr_1fr_1fr] items-center ${
                i % 2 === 1 ? "bg-surface" : "bg-white"
              }`}
            >
              <div className="px-5 py-4 text-sm font-medium text-charcoal">
                {row.metric}
              </div>
              <div className="flex items-center justify-center gap-1.5 px-4 py-4 text-center text-sm text-gray-medium">
                <X className="h-3.5 w-3.5 shrink-0 text-red-400" />
                {row.industry}
              </div>
              <div className="flex items-center justify-center gap-1.5 border-l border-border/60 px-4 py-4 text-center text-sm font-semibold text-charcoal">
                <Check className="h-3.5 w-3.5 shrink-0 text-gold" />
                {row.erg}
              </div>
            </div>
          ))}
        </div>
      </FadeUp>

      <p className="mt-6 text-center text-xs text-gray-medium">
        <span className="lg:hidden">Swipe the table horizontally to compare. </span>
        Industry benchmarks based on widely cited MGMA and HFMA revenue cycle data.
      </p>
    </Section>
  );
}
