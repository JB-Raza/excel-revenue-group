import type { Metadata } from "next";
import { siteConfig } from "./site";
import type { Service } from "./services";
import { servedStates } from "./states";
import { stockImages } from "./stock-images";

/** Default social share image. */
export const defaultOgImage = {
  url: stockImages.ogDefault,
  width: 1920,
  height: 1080,
  alt: `${siteConfig.name} — medical billing and revenue cycle management`,
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
};

/** Consistent page metadata with Open Graph and Twitter cards. */
export function buildPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage.url,
  imageAlt = defaultOgImage.alt,
  keywords,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [{ url: image, width: defaultOgImage.width, height: defaultOgImage.height, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Absolute URL helper. */
export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Organization schema — used site-wide. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.city || undefined,
      addressRegion: siteConfig.contact.state || undefined,
      postalCode: siteConfig.contact.zip || undefined,
    },
    areaServed: servedStates.map((s) => ({
      "@type": "State",
      name: s.name,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  };
}

/** WebSite schema. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

/** Service schema for a service page. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "US",
    url: absoluteUrl(`/services/${service.slug}`),
  };
}

/** FAQPage schema from a list of Q&As. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** BreadcrumbList schema. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Renders a JSON-LD <script> payload as a string for dangerouslySetInnerHTML. */
export function jsonLd(data: object | object[]): string {
  return JSON.stringify(data);
}
