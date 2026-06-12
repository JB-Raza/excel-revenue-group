import { siteConfig } from "@/lib/site";

/** Embedded map for the contact page (Google Maps iframe). */
export function ContactMap() {
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
      </div>
    </div>
  );
}
