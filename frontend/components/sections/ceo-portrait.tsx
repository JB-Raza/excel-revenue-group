"use client";

import Image from "next/image";
import { useState } from "react";

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

  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
      {/* Soft gold glow behind the portrait */}
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[var(--radius-xl)] bg-gradient-gold opacity-20 blur-2xl"
        aria-hidden
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-border/60 bg-surface shadow-[var(--shadow-card)]">
        {ok ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 1024px) 24rem, 28rem"
            className="object-cover"
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
    </div>
  );
}
