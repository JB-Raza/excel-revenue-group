import { isPortraitStock, stockImages } from "./stock-images";

export type HeroImage = {
  src: string;
  alt: string;
  /** cover = landscape photo fill; contain = show full image (portrait / maps). */
  fit?: "cover" | "contain";
  /** Tailwind object-position classes, e.g. object-[center_25%]. Overrides focus map. */
  position?: string;
  /** Preset vertical crop — use when the same stock path needs a shared default. */
  focus?: HeroFocus;
};

/**
 * Vertical crop presets for object-cover heroes.
 * Tune per image in heroFocusBySrc — "upper" / "top" show more faces when torsos are centered.
 */
export type HeroFocus = "top" | "upper" | "center" | "lower" | "bottom";

export const heroFocusClass: Record<HeroFocus, string> = {
  top: "object-[center_12%]",
  upper: "object-[center_28%]",
  center: "object-center",
  lower: "object-[center_72%]",
  bottom: "object-bottom",
};

/** Default vertical focus keyed by stock image path — single place to tune all heroes. */
export const heroFocusBySrc: Record<string, HeroFocus> = {
  // Page heroes
  [stockImages.aboutHero]: "upper",
  [stockImages.servicesHero]: "top",
  [stockImages.contactHero]: "upper",
  [stockImages.specialtiesHero]: "upper",
  [stockImages.homeHero]: "upper",

  // Service heroes
  [stockImages.billingOffice]: "center",
  [stockImages.credentialing]: "upper",
  [stockImages.virtualAssistance]: "top",
  [stockImages.eligibility]: "upper",
  [stockImages.claimsSubmission]: "center",
  [stockImages.arManagement]: "upper",
  [stockImages.denialManagement]: "center",
  [stockImages.providerEnrollment]: "upper",

  // Specialty heroes
  [stockImages.cardiology]: "upper",
  [stockImages.orthopedics]: "upper",
  [stockImages.behavioralHealth]: "upper",
  [stockImages.internalMedicine]: "upper",
  [stockImages.pediatrics]: "upper",
  [stockImages.ophthalmology]: "center",
  [stockImages.familyMedicine]: "upper",
  [stockImages.painManagement]: "center",
  [stockImages.generalSurgery]: "upper",
  [stockImages.laboratory]: "center",
  [stockImages.pharmacy]: "upper",
  [stockImages.chiropractic]: "upper",
};

export function resolveHeroPosition(image: HeroImage): string {
  if (image.position) return image.position;
  if (image.fit === "contain") return "object-center";
  const focus = image.focus ?? heroFocusBySrc[image.src] ?? "center";
  return heroFocusClass[focus];
}

export function withHeroFocus(image: HeroImage): HeroImage {
  return { ...image, position: resolveHeroPosition(image) };
}

export function isPortraitPhoto(src: string): boolean {
  return isPortraitStock(src);
}

export function photoObjectPosition(src: string): string {
  if (isPortraitStock(src)) return "object-top";
  return resolveHeroPosition({ src, alt: "" });
}

/** Hero banners for inner pages — landscape stock photos. */
export const pageHeroImages = {
  home: withHeroFocus({
    src: stockImages.homeHero,
    alt: "Physician and patient in a positive consultation",
    fit: "cover",
  }),
  about: withHeroFocus({
    src: stockImages.aboutHero,
    alt: "Medical professionals in a collaborative clinical setting",
    fit: "cover",
  }),
  services: withHeroFocus({
    src: stockImages.servicesHero,
    alt: "Diverse team of doctors and nurses in a hospital",
    fit: "cover",
  }),
  contact: withHeroFocus({
    src: stockImages.contactHero,
    alt: "Patient consultation in a modern medical office",
    fit: "cover",
  }),
  specialties: withHeroFocus({
    src: stockImages.specialtiesHero,
    alt: "Hospital clinical environment serving multiple medical specialties",
    fit: "cover",
  }),
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
  { src: stockImages.portraitHospital, alt: "Family medicine physician advisor", label: "Family Medicine" },
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

const serviceHeroImagesRaw: Record<string, HeroImage> = {
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

const serviceHeroImages = Object.fromEntries(
  Object.entries(serviceHeroImagesRaw).map(([slug, image]) => [
    slug,
    withHeroFocus(image),
  ]),
) as Record<string, HeroImage>;

export function getServiceImage(slug: string): string | undefined {
  return serviceImages[slug];
}

export function getServiceHeroImage(slug: string): HeroImage | undefined {
  return serviceHeroImages[slug];
}

/** Specialty detail page hero with per-image crop from heroFocusBySrc. */
export function getSpecialtyHeroImage(
  src: string,
  alt: string,
): HeroImage {
  return withHeroFocus({ src, alt, fit: "cover" });
}
