import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { buildPageMetadata } from "@/lib/seo";
import { termsOfUse } from "@/lib/legal";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description: termsOfUse.description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title={termsOfUse.title}
      description={termsOfUse.description}
      lastUpdated={termsOfUse.lastUpdated}
      sections={termsOfUse.sections}
    />
  );
}
