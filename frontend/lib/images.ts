import { isPortraitStock, stockImages } from "./stock-images";

export type HeroImage = {
  src: string;
  alt: string;
  /** cover = landscape photo fill; contain = show full image (portrait / maps). */
  fit?: "cover" | "contain";
  position?: string;
};

export function isPortraitPhoto(src: string): boolean {
  return isPortraitStock(src);
}

export function photoObjectPosition(src: string): string {
  if (isPortraitStock(src)) return "object-top";
  return "object-center";
}

/** Hero banners for inner pages — landscape stock photos. */
export const pageHeroImages = {
  home: {
    src: stockImages.homeHero,
    alt: "Physician and patient in a positive consultation",
    fit: "cover",
  },
  about: {
    src: stockImages.aboutHero,
    alt: "Medical professionals in a collaborative clinical setting",
    fit: "cover",
  },
  services: {
    src: stockImages.servicesHero,
    alt: "Diverse team of doctors and nurses in a hospital",
    fit: "cover",
  },
  contact: {
    src: stockImages.contactHero,
    alt: "Patient consultation in a modern medical office",
    fit: "cover",
  },
  specialties: {
    src: stockImages.specialtiesHero,
    alt: "Hospital clinical environment serving multiple medical specialties",
    fit: "cover",
  },
  states: {
    src: "/images/about/usa-map.png",
    alt: "Map of the United States showing nationwide service coverage",
    fit: "contain",
    position: "object-right object-center",
  },
} as const satisfies Record<string, HeroImage>;

/** Branded social share image — replace with a custom asset when ready. */
export const ogImagePath = stockImages.ogDefault;

/** Provider trust strip — portrait stock photos (correct aspect for 3:4 cards). */
export const teamMembers = [
  { src: stockImages.portraitLeadership, alt: "Healthcare leadership executive", label: "Leadership" },
  { src: stockImages.portraitPhysician, alt: "Board-certified physician partner", label: "Physician Partner" },
  { src: stockImages.portraitSpecialist, alt: "Specialist physician consultant", label: "Specialist" },
  { src: stockImages.portraitPrimaryCare, alt: "Primary care physician advisor", label: "Primary Care" },
  { src: stockImages.portraitHospital, alt: "Hospital medicine physician advisor", label: "Hospital Medicine" },
  { src: stockImages.portraitSurgery, alt: "Surgical specialist physician advisor", label: "Surgery" },
] as const;

/** Service inline photos — landscape stock; PNG icons kept where noted. */
export const serviceImages: Record<string, string> = {
  "medical-billing": stockImages.billingOffice,
  credentialing: stockImages.credentialing,
  "virtual-assistance": stockImages.virtualAssistance,
  "eligibility-verification": stockImages.eligibility,
  "claims-submission": stockImages.claimsSubmission,
  "ar-management": stockImages.arManagement,
  "denial-management": stockImages.denialManagement,
  "provider-enrollment": stockImages.providerEnrollment,
};

const serviceHeroImages: Record<string, HeroImage> = {
  "medical-billing": {
    src: stockImages.billingOffice,
    alt: "Medical billing and revenue cycle management",
    fit: "cover",
  },
  credentialing: {
    src: stockImages.credentialing,
    alt: "Provider credentialing and enrollment documentation",
    fit: "cover",
  },
  "virtual-assistance": {
    src: stockImages.virtualAssistance,
    alt: "Remote medical billing support specialist",
    fit: "cover",
  },
  "eligibility-verification": {
    src: stockImages.eligibility,
    alt: "Insurance eligibility verification",
    fit: "cover",
  },
  "claims-submission": {
    src: stockImages.claimsSubmission,
    alt: "Electronic claims submission workflow",
    fit: "cover",
  },
  "ar-management": {
    src: stockImages.arManagement,
    alt: "Accounts receivable analysis and follow-up",
    fit: "cover",
  },
  "denial-management": {
    src: stockImages.denialManagement,
    alt: "Denial review and appeals workflow",
    fit: "cover",
  },
  "provider-enrollment": {
    src: stockImages.providerEnrollment,
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
