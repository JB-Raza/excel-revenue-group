export type HeroImage = {
  src: string;
  alt: string;
  /** cover = landscape photo fill; contain = show full image (portrait / maps). */
  fit?: "cover" | "contain";
  position?: string;
};

/** Hero banner paths for inner pages. */
export const pageHeroImages = {
  home: {
    src: "/images/hero/doctors-group.jpg",
    alt: "Healthcare professionals collaborating with secure medical systems",
    fit: "cover",
  },
  about: {
    src: "/images/hero/healthcare-administrator-office.jpg",
    alt: "Healthcare administrators and physicians in compliance review",
    fit: "cover",
  },
  services: {
    src: "/images/hero/billing-landscape-2.jpg",
    alt: "Clinical laboratory and diagnostic billing environment",
    fit: "cover",
  },
  contact: {
    // TODO: replace — needs a wide landscape photo (see heroImageGuide.contact)
    src: "/images/hero/doc-looking-on-screen.jpg",
    alt: "Physician reviewing patient records on screen",
    fit: "cover",
  },
  // TODO: add when provided — vertical PNG/infographic assets are not suitable for hero banners
  // specialties: see heroImageGuide.specialties
  states: {
    src: "/images/about/usa-map.png",
    alt: "Map of the United States showing nationwide service coverage",
    fit: "contain",
    position: "object-right object-center",
  },
} as const satisfies Record<string, HeroImage>;

/** Recommended hero assets — drop files in public/images/hero/ and wire in pageHeroImages. */
export const heroImageGuide = {
  specialties: {
    path: "/images/hero/specialties.jpg",
    specs: "1920×1080 minimum, 16:9 landscape, JPG",
    description:
      "Diverse medical team or multi-specialty clinical setting — not icons, infographics, or portrait crops.",
    keywords: [
      "diverse medical team hospital",
      "multi specialty doctors group",
      "healthcare professionals collaboration wide",
      "hospital doctors different specialties",
      "medical team meeting clinical",
    ],
  },
  contact: {
    path: "/images/hero/contact.jpg",
    specs: "1920×1080 minimum, 16:9 landscape, JPG",
    description:
      "Warm, approachable consultation scene — phone, desk, or front-desk welcome. Avoid tight face close-ups.",
    keywords: [
      "medical office reception desk",
      "healthcare consultation phone call",
      "doctor patient consultation office wide",
      "medical practice front desk professional",
      "healthcare customer service desk",
    ],
  },
} as const;

/** Team / provider portraits for trust sections. */
export const teamMembers = [
  { src: "/images/ceo.jpg", alt: "Healthcare leadership executive", label: "Leadership" },
  { src: "/images/team/doctor-1.jpg", alt: "Board-certified physician partner", label: "Physician Partner" },
  { src: "/images/team/doctor-2.jpg", alt: "Specialist physician consultant", label: "Specialist" },
  { src: "/images/team/doctor-3.jpg", alt: "Primary care physician advisor", label: "Primary Care" },
  { src: "/images/team/doctor-4.jpg", alt: "Hospital medicine physician advisor", label: "Hospital Medicine" },
  { src: "/images/team/doctor-5.jpg", alt: "Surgical specialist physician advisor", label: "Surgery" },
] as const;

/** Service detail images keyed by slug. */
export const serviceImages: Record<string, string> = {
  "medical-billing": "/images/hero/billing-landscape-1.jpg",
  credentialing: "/images/services/credentialing.png",
  "virtual-assistance": "/images/services/virtual-assistance.jpg",
  "eligibility-verification": "/images/services/eligibility-verification.jpg",
  "claims-submission": "/images/services/claims-submission.png",
  "ar-management": "/images/services/ar-management.png",
  "denial-management": "/images/services/denial-management.png",
  "provider-enrollment": "/images/services/provider-enrollment.jpg",
};

/** Services with landscape assets suitable for a full-width hero background. */
const serviceHeroImages: Record<string, HeroImage> = {
  "medical-billing": {
    src: "/images/hero/billing-landscape-1.jpg",
    alt: "Medical billing and revenue cycle management",
    fit: "cover",
  },
  "eligibility-verification": {
    src: "/images/services/eligibility-verification.jpg",
    alt: "Insurance eligibility verification",
    fit: "cover",
  },
  "provider-enrollment": {
    src: "/images/services/provider-enrollment.jpg",
    alt: "Provider enrollment and payer credentialing",
    fit: "cover",
  },
};

export function getServiceImage(slug: string): string | undefined {
  return serviceImages[slug];
}

export function getServiceHeroImage(slug: string): HeroImage | undefined {
  return serviceHeroImages[slug];
}
