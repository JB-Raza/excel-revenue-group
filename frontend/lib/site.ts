/**
 * Central site configuration — single source of truth.
 *
 * PLACEHOLDERS to update before launch:
 *  - url:            final production domain (currently placeholder)
 *  - contact.*:      real phone / email / WhatsApp / address
 *  - NEXT_PUBLIC_WEB3FORMS_KEY in .env — Web3Forms access key (https://web3forms.com)
 *  - social.*:       real social profile URLs (or remove)
 */

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
    // TODO: replace with real values.
    phone: "+1 (555) 123-4567",
    phoneHref: "tel:+15551234567",
    email: "info@excelrevenuegroup.com",
    // WhatsApp number in international format, digits only, for wa.me links.
    whatsapp: "15551234567",
    whatsappMessage:
      "Hello Excel Revenue Group, I'd like to learn more about your medical billing services.",
    // TODO: replace with your full street address.
    address: "United States",
    city: "",
    state: "",
    zip: "",
    // TODO: replace with your Google Maps embed URL for the pin above.
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=United+States&hl=en&z=4&output=embed",
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
