/**
 * Local stock photos (downloaded from Pexels, royalty-free).
 * Stored in /public/images/stock and served locally — no external CDN.
 * Every image is content-verified against the screen/section it appears on:
 *   - Landscape photos for heroes, specialty cards, and service sections.
 *   - Portrait photos only where the layout expects them (provider trust strip).
 * Each photo is used in exactly one place — no image is reused across the site.
 */

const STOCK = "/images/stock";

/** Verified local stock paths — landscape unless noted as portrait. */
export const stockImages = {
  // — Page heroes (wide / 16:9) —
  homeHero: `${STOCK}/home.jpg`, // doctor & patient in a positive consultation
  aboutHero: `${STOCK}/about.jpg`, // female doctor consulting two patients at a desk
  servicesHero: `${STOCK}/services.jpg`, // diverse team of doctors and nurses smiling
  contactHero: `${STOCK}/contact.jpg`, // doctor explaining treatment to a patient
  specialtiesHero: `${STOCK}/specialties.jpg`, // diverse healthcare professionals in a hospital hallway
  ogDefault: `${STOCK}/og-default.jpg`, // doctors and nurses in a hospital (social share)

  // — Specialty heroes / cards —
  cardiology: `${STOCK}/cardiology.jpg`, // clinician reviewing ECG / cardiac monitoring
  orthopedics: `${STOCK}/orthopedics.jpg`, // doctor examining an X-ray
  behavioralHealth: `${STOCK}/behavioral-health.jpg`, // psychologist with a patient in session
  internalMedicine: `${STOCK}/internal-medicine.jpg`, // nurse measuring a patient's blood pressure
  pediatrics: `${STOCK}/pediatrics.jpg`, // young girl having a checkup with a doctor
  ophthalmology: `${STOCK}/ophthalmology.jpg`, // patient having an eye examination
  familyMedicine: `${STOCK}/family-medicine.jpg`, // child being examined by a medical professional
  painManagement: `${STOCK}/pain-management.jpg`, // clinician preparing injections / medicine
  generalSurgery: `${STOCK}/general-surgery.jpg`, // surgeons operating in an OR
  laboratory: `${STOCK}/laboratory.jpg`, // lab specialist at a microscope
  pharmacy: `${STOCK}/pharmacy.jpg`, // pharmacist assisting a customer at the counter
  chiropractic: `${STOCK}/chiropractic.jpg`, // chiropractor examining a patient's joint

  // — Service heroes & inline photos —
  billingOffice: `${STOCK}/billing-office.jpg`, // clinical paperwork: clipboard & stethoscope
  credentialing: `${STOCK}/credentialing.jpg`, // professional signing documents at a desk
  virtualAssistance: `${STOCK}/virtual-assistance.jpg`, // support agents with headsets on laptops
  eligibility: `${STOCK}/eligibility.jpg`, // healthcare professional checking info on a tablet
  claimsSubmission: `${STOCK}/claims-submission.jpg`, // clinician on a laptop & phone (electronic claims)
  arManagement: `${STOCK}/ar-management.jpg`, // accountant reviewing figures in a ledger
  denialManagement: `${STOCK}/denial-management.jpg`, // doctor reviewing notes on a clipboard (appeals)
  providerEnrollment: `${STOCK}/provider-enrollment.jpg`, // clinician reviewing enrollment documents

  // — Provider trust strip portraits (3:4 layouts only) —
  portraitLeadership: `${STOCK}/portrait-leadership.jpg`, // male doctor portrait with stethoscope
  portraitPhysician: `${STOCK}/portrait-physician.jpg`, // female doctor portrait in white coat
  portraitSpecialist: `${STOCK}/portrait-specialist.jpg`, // smiling doctor in white coat
  portraitPrimaryCare: `${STOCK}/portrait-primary-care.jpg`, // female healthcare worker portrait
  portraitHospital: `${STOCK}/portrait-hospital.jpg`, // doctor in scrubs portrait
  portraitSurgery: `${STOCK}/portrait-surgery.jpg`, // surgeon in gown and mask
} as const;

/** Portrait images — anchor crop to faces (top) in 3:4 layouts. */
const PORTRAIT_PATHS = new Set<string>([
  stockImages.portraitLeadership,
  stockImages.portraitPhysician,
  stockImages.portraitSpecialist,
  stockImages.portraitPrimaryCare,
  stockImages.portraitHospital,
  stockImages.portraitSurgery,
]);

export function isPortraitStock(src: string): boolean {
  return PORTRAIT_PATHS.has(src);
}
