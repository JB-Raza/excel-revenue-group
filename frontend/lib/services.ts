import type { LucideIcon } from "lucide-react";
import {
  FileText,
  BadgeCheck,
  Headset,
  ShieldCheck,
  Send,
  Wallet,
  FileX2,
  ClipboardList,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  /** One-line summary for cards and lists. */
  shortDescription: string;
  /** Hero headline on the service page. */
  heroHeadline: string;
  /** Intro paragraph on the service page. */
  overview: string;
  icon: LucideIcon;
  benefits: string[];
  included: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Related service slugs for internal linking. */
  related: string[];
};

export const services: Service[] = [
  {
    slug: "medical-billing",
    title: "Medical Billing Services",
    shortDescription:
      "End-to-end billing that captures every dollar and shortens your payment cycle.",
    heroHeadline: "Accurate Medical Billing That Protects Every Dollar",
    overview:
      "Our medical billing services handle the full lifecycle of your claims — from accurate charge entry and clean claim submission to payment posting and follow-up. We reduce errors at the source so you get paid faster, with fewer rejections and less administrative burden on your staff.",
    icon: FileText,
    benefits: [
      "Higher clean-claim rate and faster reimbursements",
      "Fewer denials through front-end accuracy",
      "Transparent reporting on every claim",
      "Specialty-specific coding expertise",
    ],
    included: [
      "Charge entry for all specialties",
      "Clean claim creation and submission",
      "Insurance and patient payment posting",
      "Patient statement processing",
      "Extensive insurance follow-up",
      "Monthly performance reporting",
    ],
    process: [
      { title: "Charge Capture", description: "We accurately record every billable service." },
      { title: "Claim Scrubbing", description: "Claims are validated before submission to catch errors." },
      { title: "Submission", description: "Clean claims are submitted electronically to payers." },
      { title: "Payment Posting", description: "Payments are posted and reconciled promptly." },
    ],
    faqs: [
      {
        question: "Do you work with our existing EMR/PM system?",
        answer:
          "Yes. Our team is trained to work within your existing EMR and practice management software, so there is no disruption to your current workflow.",
      },
      {
        question: "Which specialties do you support?",
        answer:
          "We provide charge entry and billing across all major specialties, with coders experienced in specialty-specific rules and modifiers.",
      },
      {
        question: "How do you keep our data secure?",
        answer:
          "We follow strict HIPAA-compliant processes and secure access controls to protect patient and practice data at every step.",
      },
    ],
    metaTitle: "Medical Billing Services | Excel Revenue Group",
    metaDescription:
      "End-to-end medical billing services that increase clean-claim rates, reduce denials, and accelerate reimbursements for healthcare providers.",
    keywords: ["medical billing services", "medical billing company", "charge entry", "claims billing"],
    related: ["claims-submission", "denial-management", "ar-management"],
  },
  {
    slug: "credentialing",
    title: "Credentialing Services",
    shortDescription:
      "Get providers enrolled and in-network faster, without the paperwork headaches.",
    heroHeadline: "Provider Credentialing Done Right, On Time",
    overview:
      "Credentialing delays cost you revenue. We manage the entire credentialing and re-credentialing process — payer applications, CAQH maintenance, and follow-up — so your providers can start seeing patients and getting paid sooner.",
    icon: BadgeCheck,
    benefits: [
      "Faster time-to-network for new providers",
      "Reduced application errors and rejections",
      "Proactive re-credentialing reminders",
      "Dedicated credentialing specialist",
    ],
    included: [
      "Payer application preparation and submission",
      "CAQH registration and maintenance",
      "Primary source verification support",
      "Re-credentialing and revalidation tracking",
      "Status follow-up with payers",
    ],
    process: [
      { title: "Document Collection", description: "We gather and verify all required provider documentation." },
      { title: "Application Submission", description: "Applications are submitted accurately to each payer." },
      { title: "Follow-Up", description: "We track status and respond to payer requests promptly." },
      { title: "Approval & Maintenance", description: "We maintain records and manage re-credentialing." },
    ],
    faqs: [
      {
        question: "How long does credentialing take?",
        answer:
          "Timelines vary by payer, typically 60–120 days. We minimize delays by submitting complete, accurate applications and following up consistently.",
      },
      {
        question: "Do you manage CAQH?",
        answer:
          "Yes. We handle CAQH registration, attestation, and ongoing maintenance to keep your profiles current.",
      },
    ],
    metaTitle: "Medical Credentialing Services",
    metaDescription:
      "Provider credentialing and re-credentialing services. Get in-network faster with accurate payer enrollment, CAQH maintenance, and proactive follow-up.",
    keywords: ["medical credentialing", "provider credentialing", "CAQH", "payer enrollment"],
    related: ["provider-enrollment", "eligibility-verification", "medical-billing"],
  },
  {
    slug: "virtual-assistance",
    title: "Virtual Assistance",
    shortDescription:
      "Trained healthcare virtual assistants for front-office and administrative tasks.",
    heroHeadline: "Healthcare Virtual Assistants That Lighten Your Load",
    overview:
      "Our trained virtual assistants handle the time-consuming administrative work that pulls your staff away from patients — appointment scheduling, inbound calls, data entry, and more — at a fraction of the cost of in-house hires.",
    icon: Headset,
    benefits: [
      "Reduce administrative overhead",
      "Free up staff to focus on patient care",
      "Trained on your existing systems",
      "Flexible, scalable support",
    ],
    included: [
      "Appointment scheduling and reminders",
      "Inbound and outbound patient calls",
      "Data entry and records management",
      "Front-office coordination",
      "Insurance verification support",
    ],
    process: [
      { title: "Needs Assessment", description: "We map the tasks you want to offload." },
      { title: "Matching & Training", description: "We assign and train an assistant on your workflow." },
      { title: "Onboarding", description: "Your VA integrates with your tools and team." },
      { title: "Ongoing Support", description: "We monitor quality and scale as you grow." },
    ],
    faqs: [
      {
        question: "Are your virtual assistants HIPAA trained?",
        answer:
          "Yes. All assistants are trained on HIPAA compliance and follow strict data-handling protocols.",
      },
      {
        question: "Can a VA work within our software?",
        answer:
          "Absolutely. Assistants are trained on your existing EMR, PM, and communication tools.",
      },
    ],
    metaTitle: "Healthcare Virtual Assistance",
    metaDescription:
      "Trained healthcare virtual assistants for scheduling, patient calls, data entry, and front-office support — reduce overhead without sacrificing quality.",
    keywords: ["healthcare virtual assistant", "medical virtual assistant", "front office support"],
    related: ["eligibility-verification", "medical-billing", "credentialing"],
  },
  {
    slug: "eligibility-verification",
    title: "Eligibility & Benefits Verification",
    shortDescription:
      "Verify coverage before the visit to prevent denials and surprise balances.",
    heroHeadline: "Stop Denials Before They Start With Accurate Eligibility Checks",
    overview:
      "Eligibility errors are a leading cause of denials. We verify patient coverage and benefits before the visit — including co-pays, deductibles, and prior-authorization requirements — so claims go out clean and patients know what to expect.",
    icon: ShieldCheck,
    benefits: [
      "Fewer eligibility-related denials",
      "Accurate patient cost estimates",
      "Smoother front-desk check-in",
      "Faster, cleaner claims",
    ],
    included: [
      "Real-time eligibility verification",
      "Benefit and coverage detail checks",
      "Co-pay, deductible, and co-insurance confirmation",
      "Prior-authorization requirement flags",
      "Secondary insurance verification",
    ],
    process: [
      { title: "Schedule Review", description: "We review upcoming appointments daily." },
      { title: "Verification", description: "Coverage and benefits are verified with payers." },
      { title: "Flagging", description: "Issues and auth requirements are flagged to staff." },
      { title: "Documentation", description: "Verified details are recorded for clean billing." },
    ],
    faqs: [
      {
        question: "How far in advance do you verify?",
        answer:
          "We typically verify eligibility 24–72 hours before the appointment, with same-day checks for add-ons.",
      },
    ],
    metaTitle: "Eligibility & Benefits Verification",
    metaDescription:
      "Insurance eligibility and benefits verification services that reduce denials, confirm patient responsibility, and keep your claims clean.",
    keywords: ["eligibility verification", "benefits verification", "insurance verification"],
    related: ["medical-billing", "claims-submission", "credentialing"],
  },
  {
    slug: "claims-submission",
    title: "Claims Submission",
    shortDescription:
      "Clean, timely electronic and paper claim submission to every payer.",
    heroHeadline: "Clean Claims, Submitted Right the First Time",
    overview:
      "We prepare, scrub, and submit your claims — electronic and paper — to commercial and government payers. By validating claims before they go out, we maximize first-pass acceptance and shorten your revenue cycle.",
    icon: Send,
    benefits: [
      "High first-pass acceptance rate",
      "Pre-submission claim scrubbing",
      "Electronic and paper submission",
      "Faster payer turnaround",
    ],
    included: [
      "Electronic claims submission (EDI)",
      "Paper claims for non-electronic payers",
      "Pre-submission claim scrubbing",
      "Clearinghouse rejection management",
      "Secondary insurance billing",
    ],
    process: [
      { title: "Claim Build", description: "Claims are built from accurate charge data." },
      { title: "Scrubbing", description: "Each claim is validated against payer rules." },
      { title: "Submission", description: "Claims are transmitted to payers and clearinghouses." },
      { title: "Rejection Handling", description: "Rejections are corrected and resubmitted fast." },
    ],
    faqs: [
      {
        question: "How quickly are claims submitted?",
        answer:
          "We target same-day or next-business-day submission once charges are received and validated.",
      },
    ],
    metaTitle: "Claims Submission Services",
    metaDescription:
      "Electronic and paper medical claims submission with pre-submission scrubbing for a high first-pass acceptance rate and faster payments.",
    keywords: ["claims submission", "electronic claims", "EDI billing", "clean claims"],
    related: ["medical-billing", "denial-management", "ar-management"],
  },
  {
    slug: "ar-management",
    title: "Accounts Receivable Management",
    shortDescription:
      "Aggressive, organized A/R follow-up that recovers aging revenue.",
    heroHeadline: "Recover Aging Revenue With Relentless A/R Follow-Up",
    overview:
      "Unworked A/R is lost revenue. Our A/R management team systematically follows up on outstanding claims, resolves underpayments, and recovers old receivables — keeping your A/R days low and your cash flow healthy.",
    icon: Wallet,
    benefits: [
      "Lower A/R days and aging buckets",
      "Recovery of old, unpaid claims",
      "Underpayment identification",
      "Clear A/R reporting and trends",
    ],
    included: [
      "Insurance A/R follow-up",
      "Old A/R recovery projects",
      "Underpayment and low-pay review",
      "Appeals on low-paid claims",
      "Aging and trend reporting",
    ],
    process: [
      { title: "A/R Analysis", description: "We analyze aging and prioritize high-value claims." },
      { title: "Follow-Up", description: "Our team works claims with payers persistently." },
      { title: "Resolution", description: "Underpayments and denials are appealed and resolved." },
      { title: "Reporting", description: "You get clear visibility into recovery progress." },
    ],
    faqs: [
      {
        question: "Can you work our old, aged A/R?",
        answer:
          "Yes. We run dedicated old-A/R recovery projects to recapture revenue from aged, unworked claims.",
      },
    ],
    metaTitle: "Accounts Receivable (A/R) Management",
    metaDescription:
      "Medical accounts receivable management and A/R recovery services that lower A/R days, resolve underpayments, and improve cash flow.",
    keywords: ["accounts receivable management", "A/R recovery", "medical AR follow up"],
    related: ["denial-management", "claims-submission", "medical-billing"],
  },
  {
    slug: "denial-management",
    title: "Denial Management",
    shortDescription:
      "Root-cause denial resolution and appeals that win back revenue.",
    heroHeadline: "Turn Denials Into Paid Claims",
    overview:
      "Every denial is recoverable revenue and a lesson. We review, correct, and appeal denied and low-paid claims, then fix the root causes so the same denials stop happening — protecting your bottom line long term.",
    icon: FileX2,
    benefits: [
      "Higher overturn rate on appeals",
      "Root-cause prevention of future denials",
      "Faster denial turnaround",
      "Denial trend analytics",
    ],
    included: [
      "Denial review and categorization",
      "Corrected claim resubmission",
      "Appeals for denied and low-paid claims",
      "Root-cause analysis and prevention",
      "Denial trend reporting",
    ],
    process: [
      { title: "Triage", description: "Denials are categorized by reason and value." },
      { title: "Correction", description: "Claims are corrected or documentation gathered." },
      { title: "Appeal", description: "Strong, timely appeals are filed with payers." },
      { title: "Prevention", description: "Root causes are addressed to stop repeat denials." },
    ],
    faqs: [
      {
        question: "Do you handle appeals?",
        answer:
          "Yes. We prepare and submit appeals for denied and underpaid claims, including supporting documentation.",
      },
    ],
    metaTitle: "Denial Management Services",
    metaDescription:
      "Medical denial management and appeals services that overturn denials, recover underpayments, and prevent future denials through root-cause analysis.",
    keywords: ["denial management", "claim appeals", "denied claims recovery"],
    related: ["ar-management", "claims-submission", "medical-billing"],
  },
  {
    slug: "provider-enrollment",
    title: "Provider Enrollment",
    shortDescription:
      "Complete payer enrollment so your providers can bill without delay.",
    heroHeadline: "Seamless Provider Enrollment With Every Payer",
    overview:
      "We manage provider enrollment with commercial and government payers end to end — from application to approval — ensuring your providers are properly set up to bill and get reimbursed without costly delays.",
    icon: ClipboardList,
    benefits: [
      "Faster enrollment approvals",
      "Accurate, complete applications",
      "Government and commercial payers",
      "Ongoing revalidation management",
    ],
    included: [
      "Medicare and Medicaid enrollment",
      "Commercial payer enrollment",
      "Group and individual enrollment",
      "Revalidation and updates",
      "Enrollment status tracking",
    ],
    process: [
      { title: "Assessment", description: "We confirm enrollment needs per payer and provider." },
      { title: "Preparation", description: "Applications are completed accurately and fully." },
      { title: "Submission", description: "Enrollments are submitted and tracked." },
      { title: "Maintenance", description: "We manage revalidations and ongoing updates." },
    ],
    faqs: [
      {
        question: "Do you handle Medicare and Medicaid enrollment?",
        answer:
          "Yes. We manage Medicare, Medicaid, and commercial payer enrollments, including group and individual setups.",
      },
    ],
    metaTitle: "Provider Enrollment Services",
    metaDescription:
      "Provider enrollment services for Medicare, Medicaid, and commercial payers — accurate applications and revalidation management to prevent billing delays.",
    keywords: ["provider enrollment", "payer enrollment", "Medicare enrollment", "Medicaid enrollment"],
    related: ["credentialing", "eligibility-verification", "medical-billing"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Catch-all option for the contact form when no specific service fits. */
export const GENERAL_INQUIRY_OPTION = "General inquiry / Not sure yet";

/** Options for the contact form's "Service of interest" dropdown.
 *  Derived from `services` so it stays in sync, plus a general catch-all. */
export const serviceOptions: string[] = [
  ...services.map((s) => s.title),
  GENERAL_INQUIRY_OPTION,
];

export function getRelatedServices(slug: string): Service[] {
  const svc = getService(slug);
  if (!svc) return [];
  return svc.related
    .map((s) => getService(s))
    .filter((s): s is Service => Boolean(s));
}
