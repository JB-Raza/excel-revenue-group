"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type CeoPortraitProps = {
  src: string;
  name: string;
  /** Shown as initials if the image is missing or fails to load. */
  fallbackInitials: string;
};

/** CEO photo with a graceful gradient-initials fallback so the layout
 *  always looks intentional, even before a real photo is added. */
export function CeoPortrait({ src, name, fallbackInitials }: CeoPortraitProps) {
  const [ok, setOk] = useState(true);
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-sm lg:max-w-md"
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-gold opacity-20 blur-2xl"
        aria-hidden
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-gold-soft/45 via-surface to-gold-soft/20 ring-1 ring-gold/15 shadow-[var(--shadow-card)]">
        {ok ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 1024px) 24rem, 28rem"
            className="object-cover object-top"
            onError={() => setOk(false)}
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-charcoal">
            <span className="font-heading text-6xl font-extrabold text-gradient-gold">
              {fallbackInitials}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
