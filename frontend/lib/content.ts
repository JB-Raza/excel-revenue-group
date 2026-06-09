import type { LucideIcon } from "lucide-react";
import {
  Heart,
  Bone,
  Brain,
  Stethoscope,
  Baby,
  Eye,
  Activity,
  Syringe,
  Scissors,
  Microscope,
  Pill,
  Hand,
} from "lucide-react";

/** Specialties ERG provides billing for. */
export const specialties: { name: string; icon: LucideIcon }[] = [
  { name: "Cardiology", icon: Heart },
  { name: "Orthopedics", icon: Bone },
  { name: "Behavioral Health", icon: Brain },
  { name: "Internal Medicine", icon: Stethoscope },
  { name: "Pediatrics", icon: Baby },
  { name: "Ophthalmology", icon: Eye },
  { name: "Family Medicine", icon: Activity },
  { name: "Pain Management", icon: Syringe },
  { name: "General Surgery", icon: Scissors },
  { name: "Laboratory & Pathology", icon: Microscope },
  { name: "Pharmacy", icon: Pill },
  { name: "Chiropractic", icon: Hand },
];

/** EMR / practice-management systems ERG works inside. */
export const emrSystems: string[] = [
  "Epic",
  "Athenahealth",
  "eClinicalWorks",
  "AdvancedMD",
  "Kareo",
  "NextGen",
  "DrChrono",
  "Practice Fusion",
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
