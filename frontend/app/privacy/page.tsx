import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { buildPageMetadata } from "@/lib/seo";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: privacyPolicy.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title={privacyPolicy.title}
      description={privacyPolicy.description}
      lastUpdated={privacyPolicy.lastUpdated}
      sections={privacyPolicy.sections}
    />
  );
}
