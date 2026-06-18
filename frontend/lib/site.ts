/**
 * Central site configuration — single source of truth.
 *
 * Environment variables (.env):
 *  - NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_CONTACT_PHONE, etc. — shown on site
 *  - NEXT_PUBLIC_WEB3FORMS_KEY — contact form (https://web3forms.com)
 *    Form submissions are emailed to the address verified in your Web3Forms dashboard
 *    when the access key was created (not controlled by CONTACT_EMAIL here).
 *  - social.* below — real social profile URLs (or remove)
 */

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@excelrevenuegroup.com";
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "";
const contactWhatsapp = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "";
const contactAddress =
  process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "United States";

/** Ensures tel: links work — bare +923… becomes tel:+923… */
function normalizeTelHref(href: string, phone: string): string {
  let raw = (href.trim() || phone.replace(/\s/g, "")).replace(/^tel:/i, "");
  if (!raw) return "";
  return `tel:${raw}`;
}

const contactPhoneHref = normalizeTelHref(
  process.env.NEXT_PUBLIC_CONTACT_PHONE_HREF ?? "",
  contactPhone,
);

const mapsEmbedUrl =
  process.env.NEXT_PUBLIC_CONTACT_MAP_EMBED_URL ??
  `https://maps.google.com/maps?q=${encodeURIComponent(contactAddress)}&hl=en&z=15&output=embed`;

function parseMapPinPercent(value: string | undefined, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(100, Math.max(0, n));
}

const mapPinX = parseMapPinPercent(process.env.NEXT_PUBLIC_CONTACT_MAP_PIN_X, 50);
const mapPinY = parseMapPinPercent(process.env.NEXT_PUBLIC_CONTACT_MAP_PIN_Y, 50);

export const siteConfig = {
  name: "Excel Revenue Group",
  shortName: "ERG",
  tagline: "Excel Your Revenue",
  description:
    "Excel Revenue Group is a premium medical billing and revenue cycle management partner helping healthcare providers maximize revenue, minimize billing errors, and get reimbursed faster.",

  // TODO: replace with the real domain once live on Hostinger.
  url: "https://www.excelrevenuegroup.com",

  keywords: [
    "medical billing",
    "revenue cycle management",
    "RCM services",
    "medical credentialing",
    "denial management",
    "accounts receivable management",
    "claims submission",
    "provider enrollment",
    "eligibility verification",
    "healthcare billing company",
  ],

  contact: {
    phone: contactPhone,
    phoneHref: contactPhoneHref,
    email: contactEmail,
    whatsapp: contactWhatsapp,
    whatsappMessage:
      "Hello Excel Revenue Group, I'd like to learn more about your medical billing services.",
    address: contactAddress,
    city: "",
    state: "",
    zip: "",
    mapsEmbedUrl,
    /** Pin overlay position on the contact map (%). Tune via env if needed. */
    mapPinX,
    mapPinY,
  },

  social: {
    // TODO: replace or set to "" to hide.
    linkedin: "",
    facebook: "",
    instagram: "",
    twitter: "",
  },

  // Contact form — set NEXT_PUBLIC_WEB3FORMS_KEY in .env (client-safe public key).
  web3FormsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",

  /** Web3Forms bundled hCaptcha site key (free plan). Do not use custom keys. */
  web3FormsHcaptchaSiteKey: "50b2fe65-b00b-4b9e-ad62-3ba471098be2",
} as const;

export type NavItem = {
  label: string;
  href: string;
  dropdown?: "services" | "specialties";
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", dropdown: "services" },
  { label: "Specialties", href: "/specialties", dropdown: "specialties" },
  { label: "States", href: "/states" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Helper: full WhatsApp click-to-chat URL. */
export function whatsappUrl(): string {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  const text = siteConfig.contact.whatsappMessage;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Helper: mailto link with optional subject. */
export function mailtoUrl(subject?: string): string {
  const base = `mailto:${siteConfig.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
