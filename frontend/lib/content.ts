export type { Specialty } from "./specialties";
export { specialties, getSpecialty, getRelatedSpecialties } from "./specialties";

export type EmrSystem = {
  name: string;
  logo: string;
};

/** EMR / practice-management systems ERG integrates with. */
export const emrSystems: EmrSystem[] = [
  { name: "AdvancedMD", logo: "/images/emr/advancedmd.jpg" },
  { name: "Athena Health", logo: "/images/emr/athenahealth.jpg" },
  { name: "Care Cloud", logo: "/images/emr/carecloud.jpg" },
  { name: "Collaborate MD", logo: "/images/emr/collaboratemd.jpg" },
  { name: "Cure MD", logo: "/images/emr/curemd.jpg" },
  { name: "Dr Chrono", logo: "/images/emr/drchrono.jpg" },
  { name: "eClinical Works", logo: "/images/emr/eclinicalworks.jpg" },
  { name: "Epic", logo: "/images/emr/epic.jpg" },
  { name: "EZ Claim", logo: "/images/emr/ezclaim.jpg" },
  { name: "GE Centricity", logo: "/images/emr/ge-centricity.jpg" },
  { name: "Green Way", logo: "/images/emr/greenway.jpg" },
  { name: "Medi Soft", logo: "/images/emr/medisoft.jpg" },
  { name: "Medi Tech", logo: "/images/emr/meditech.jpg" },
  { name: "Mod Med", logo: "/images/emr/modmed.jpg" },
  { name: "Nextech", logo: "/images/emr/nextech.jpg" },
  { name: "Next Gen", logo: "/images/emr/nextgen.jpg" },
  { name: "Nue MD", logo: "/images/emr/nuemd.jpg" },
  { name: "Office Ally", logo: "/images/emr/office-ally.jpg" },
  { name: "Practice Fusion", logo: "/images/emr/practice-fusion.jpg" },
  { name: "Practice Suite", logo: "/images/emr/practice-suite.jpg" },
  { name: "Tebra", logo: "/images/emr/tebra.png" },
  { name: "Telcor", logo: "/images/emr/telcor.jpg" },
  { name: "Web PT", logo: "/images/emr/webpt.jpg" },
  { name: "Xifin", logo: "/images/emr/xifin.jpg" },
];

export type Payer = {
  name: string;
  logo: string;
};

/** Insurance payers ERG bills and collects from. */
export const payers: Payer[] = [
  { name: "Medicare", logo: "/images/payers/medicare.jpg" },
  { name: "United Healthcare", logo: "/images/payers/united-healthcare.jpg" },
  { name: "Blue Cross Blue Shield", logo: "/images/payers/blue-cross-blue-shield.jpg" },
  { name: "Aetna", logo: "/images/payers/aetna.jpg" },
  { name: "Cigna", logo: "/images/payers/cigna.jpg" },
  { name: "Humana", logo: "/images/payers/humana.jpg" },
  { name: "Anthem", logo: "/images/payers/anthem.jpg" },
  { name: "Kaiser Permanente", logo: "/images/payers/kaiser.jpg" },
  { name: "Highmark", logo: "/images/payers/highmark.jpg" },
  { name: "CVS Aetna", logo: "/images/payers/cvs-aetna.jpg" },
  { name: "Centene", logo: "/images/payers/centene.jpg" },
  { name: "Molina Healthcare", logo: "/images/payers/molina.jpg" },
  { name: "Ambetter", logo: "/images/payers/ambetter.jpg" },
  { name: "CareSource", logo: "/images/payers/caresource.jpg" },
  { name: "CareFirst", logo: "/images/payers/carefirst.jpg" },
  { name: "HCSC", logo: "/images/payers/hcsc.jpg" },
  { name: "Independence Blue Cross", logo: "/images/payers/independence.jpg" },
  { name: "Allied Benefit", logo: "/images/payers/allied.jpg" },
  { name: "AARP", logo: "/images/payers/aarp.jpg" },
  { name: "NALC Health Benefit Plan", logo: "/images/payers/nalc.jpg" },
];

/**
 * Industry vs ERG comparison. Benchmarks reflect widely cited MGMA / HFMA
 * ranges (first-pass denial 9–12%, clean-claim 85–90% average, A/R ~40 days).
 */
export const comparison: {
  metric: string;
  industry: string;
  erg: string;
}[] = [
  { metric: "First-Pass Clean Claim Rate", industry: "85–90%", erg: "98%+" },
  { metric: "Claim Denial Rate", industry: "9–12%", erg: "Under 5%" },
  { metric: "Days in A/R", industry: "~40 days", erg: "Under 30 days" },
  { metric: "Denials Worked & Appealed", industry: "~65% never reworked", erg: "Every denial pursued" },
  { metric: "Reporting Transparency", industry: "Limited / monthly", erg: "Real-time & on-demand" },
];

/** Onboarding steps for new clients. */
export const onboardingSteps: { title: string; description: string }[] = [
  {
    title: "Discovery Call",
    description:
      "We learn your specialty, payer mix, current systems, and revenue goals in a free consultation.",
  },
  {
    title: "Practice Audit",
    description:
      "We review your billing, A/R, and denial trends to pinpoint exactly where revenue is leaking.",
  },
  {
    title: "Seamless Onboarding",
    description:
      "We integrate with your existing EMR and PM software, with zero disruption to your workflow.",
  },
  {
    title: "Optimize & Grow",
    description:
      "We run your revenue cycle, report transparently, and continually improve your collections.",
  },
];

/** Homepage FAQs (also emitted as FAQ schema). */
export const homepageFaqs: { question: string; answer: string }[] = [
  {
    question: "How much does outsourced medical billing cost?",
    answer:
      "Most billing partners charge a percentage of monthly collections, so our incentives are aligned with yours — we only do well when you collect more. We'll quote a transparent rate based on your specialty, volume, and the services you need.",
  },
  {
    question: "Do you work inside our existing EMR and software?",
    answer:
      "Yes. Our team is trained to work within your current EMR and practice-management system, so there is no costly migration and no disruption to your existing workflow.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "After a discovery call and a short practice audit, onboarding typically takes a few weeks depending on your systems and payer enrollments. We manage the transition so your cash flow stays steady.",
  },
  {
    question: "Is my patient data secure and HIPAA compliant?",
    answer:
      "Absolutely. We follow strict HIPAA-compliant processes, secure access controls, and audited workflows to protect patient and practice data at every step.",
  },
  {
    question: "What specialties do you support?",
    answer:
      "We bill across a wide range of specialties — from cardiology and orthopedics to behavioral health, pediatrics, labs, pharmacy, and more — with coders experienced in each specialty's unique rules and modifiers.",
  },
  {
    question: "Can you recover our old, aged accounts receivable?",
    answer:
      "Yes. We run dedicated old-A/R recovery projects to recapture revenue from aged, unworked claims that in-house teams often don't have time to pursue.",
  },
];
