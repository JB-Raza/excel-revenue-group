"use client";

import { motion, useReducedMotion } from "motion/react";
import { TrendingUp, ArrowUpRight, CircleDollarSign } from "lucide-react";
import { Counter } from "@/components/animations/counter";

const EASE = [0.22, 1, 0.36, 1] as const;

const bars = [42, 58, 50, 70, 64, 82, 95];

/** Stylized revenue-dashboard visual for the hero (no photo dependency). */
export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Gold glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-8 h-48 w-48 rounded-full bg-gold-soft/30 blur-3xl"
        aria-hidden
      />

      {/* Main dashboard card */}
      <div className="relative rounded-[var(--radius-card)] border border-border/70 bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-medium">Monthly Collections</p>
            <p className="mt-1 font-heading text-3xl font-extrabold text-charcoal">
              <Counter value={1.28} prefix="$" suffix="M" decimals={2} />
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft/30 px-2.5 py-1 text-xs font-semibold text-gold-deep">
            <TrendingUp className="h-3.5 w-3.5" />
            +32%
          </span>
        </div>

        {/* Bar chart */}
        <div className="mt-6 flex h-32 items-end justify-between gap-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-full rounded-t-md bg-gradient-gold"
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={reduce ? undefined : { scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-gray-medium">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="w-full text-center">
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Floating KPI card: clean claim rate */}
      <motion.div
        className="absolute -left-4 top-24 hidden rounded-2xl border border-border/70 bg-white p-4 shadow-[var(--shadow-card)] sm:block"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-gold text-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
          <div>
            <p className="font-heading text-xl font-extrabold text-charcoal">
              <Counter value={98} suffix="%" />
            </p>
            <p className="text-[11px] text-gray-medium">Clean Claim Rate</p>
          </div>
        </div>
      </motion.div>

      {/* Floating KPI card: days in A/R */}
      <motion.div
        className="absolute -right-4 -bottom-6 hidden rounded-2xl border border-border/70 bg-white p-4 shadow-[var(--shadow-card)] sm:block"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-charcoal text-gold">
            <CircleDollarSign className="h-5 w-5" />
          </span>
          <div>
            <p className="font-heading text-xl font-extrabold text-charcoal">
              <Counter value={14} suffix=" days" />
            </p>
            <p className="text-[11px] text-gray-medium">Avg. A/R Turnaround</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
