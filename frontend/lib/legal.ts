import { siteConfig } from "./site";

const company = siteConfig.name;
const email = siteConfig.contact.email;

export const privacyPolicy = {
  title: "Privacy Policy",
  description: `How ${company} collects, uses, and protects information when you visit our website or contact us about medical billing services.`,
  lastUpdated: "June 11, 2026",
  sections: [
    {
      title: "Overview",
      paragraphs: [
        `${company} ("ERG," "we," "us") respects your privacy. This policy describes the information we collect through our website, contact forms, and related communications, and how we use it.`,
        "This website provides general information about our medical billing and revenue cycle management services. It is not a patient portal and is not intended for submitting protected health information (PHI) unless explicitly requested during a business engagement.",
      ],
    },
    {
      title: "Information We Collect",
      paragraphs: ["We may collect the following when you interact with us:"],
      list: [
        "Contact details you submit (name, email, phone, practice name, message content).",
        "Service interest selections from our contact form.",
        "Basic usage data such as browser type, pages visited, and referring URLs (via standard analytics if enabled).",
        "Communications you send us by email, phone, or WhatsApp.",
      ],
    },
    {
      title: "How We Use Information",
      paragraphs: ["We use collected information to:"],
      list: [
        "Respond to consultation requests and provide customer support.",
        "Evaluate whether our services fit your practice needs.",
        "Improve our website, content, and user experience.",
        "Comply with legal obligations and protect against fraud or misuse.",
      ],
    },
    {
      title: "HIPAA & Protected Health Information",
      paragraphs: [
        "If you become a client, PHI handled on your behalf is governed by a separate Business Associate Agreement (BAA) and applicable HIPAA requirements — not solely by this website privacy policy.",
        "Please do not submit patient names, dates of birth, insurance member IDs, or clinical details through our general contact form unless we have provided a secure channel for that purpose.",
      ],
    },
    {
      title: "Sharing & Third Parties",
      paragraphs: [
        "We do not sell your personal information. We may share data with trusted service providers that help us operate our website or deliver services (for example, form delivery or hosting), subject to appropriate confidentiality obligations.",
        "We may disclose information if required by law or to protect the rights, safety, and security of ERG, our clients, or others.",
      ],
    },
    {
      title: "Data Retention & Security",
      paragraphs: [
        "We retain contact inquiries for as long as needed to respond, maintain business records, and meet legal requirements.",
        "We apply reasonable administrative, technical, and organizational safeguards. No method of transmission over the internet is 100% secure.",
      ],
    },
    {
      title: "Your Choices",
      paragraphs: [
        `You may request access to, correction of, or deletion of personal information we hold about you by contacting ${email}. We will respond within a reasonable timeframe subject to legal and contractual limits.`,
      ],
    },
    {
      title: "Changes",
      paragraphs: [
        "We may update this policy from time to time. The \"Last updated\" date at the top reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.",
      ],
    },
  ],
};

export const termsOfUse = {
  title: "Terms of Use",
  description: `Terms governing your use of the ${company} website and online materials.`,
  lastUpdated: "June 11, 2026",
  sections: [
    {
      title: "Acceptance",
      paragraphs: [
        `By accessing or using the ${company} website ("Site"), you agree to these Terms of Use. If you do not agree, please do not use the Site.`,
      ],
    },
    {
      title: "Website Purpose",
      paragraphs: [
        "The Site provides general information about medical billing, revenue cycle management, credentialing, and related services offered by ERG.",
        "Content is for informational purposes only and does not constitute medical, legal, or financial advice. Specific outcomes depend on your practice, payer mix, documentation, and compliance environment.",
      ],
    },
    {
      title: "No Client Relationship",
      paragraphs: [
        "Submitting a contact form or communicating with us does not create a client, billing, or Business Associate relationship until a formal agreement is executed by authorized parties.",
      ],
    },
    {
      title: "Acceptable Use",
      paragraphs: ["You agree not to:"],
      list: [
        "Use the Site for unlawful purposes or in violation of applicable regulations.",
        "Attempt to gain unauthorized access to our systems or data.",
        "Scrape, copy, or redistribute Site content for commercial use without written permission.",
        "Submit false, misleading, or malicious information through our forms.",
      ],
    },
    {
      title: "Intellectual Property",
      paragraphs: [
        `All Site content — including text, branding, layout, graphics, and logos — is owned by or licensed to ${company} and protected by applicable intellectual property laws. You may view and print pages for personal, non-commercial reference.`,
      ],
    },
    {
      title: "Third-Party Links",
      paragraphs: [
        "The Site may link to third-party websites or tools (for example, maps or social profiles). We are not responsible for the content or privacy practices of those external sites.",
      ],
    },
    {
      title: "Disclaimer of Warranties",
      paragraphs: [
        'The Site is provided "as is" and "as available" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, or non-infringement.',
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        `To the fullest extent permitted by law, ${company} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site.`,
      ],
    },
    {
      title: "Governing Law",
      paragraphs: [
        "These Terms are governed by the laws of the United States and the state in which ERG operates, without regard to conflict-of-law principles.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        `For questions about these Terms, contact us at ${email}.`,
      ],
    },
  ],
};
