import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";

const RIPPLE_DELAYS = ["0s", "0.95s", "1.9s"] as const;

/** Embedded map with a pulsing pin overlay (Google Maps iframe + radar rings). */
export function ContactMap() {
  const { mapPinX, mapPinY } = siteConfig.contact;

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-border/60 bg-white shadow-[var(--shadow-card)]">
      <div className="relative aspect-[16/10] w-full">
        <iframe
          title={`${siteConfig.name} location map`}
          src={siteConfig.contact.mapsEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        {/* Radar-style pin overlay — pointer-events-none keeps the map interactive */}
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full"
          style={{ left: `${mapPinX}%`, top: `${mapPinY}%` }}
          aria-hidden
        >
          <div className="relative flex h-16 w-16 items-center justify-center">
            {RIPPLE_DELAYS.map((delay) => (
              <span
                key={delay}
                className="erg-map-ripple absolute inset-0 rounded-full border-2 border-gold/45 bg-gold/10"
                style={{ animationDelay: delay }}
              />
            ))}
            <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-gradient-gold text-white shadow-[var(--shadow-gold)] ring-[3px] ring-white">
              <MapPin className="h-4 w-4" strokeWidth={2.25} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
