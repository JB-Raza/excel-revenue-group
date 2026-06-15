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

import { stockImages } from "./stock-images";

export type Specialty = {
  name: string;
  slug: string;
  icon: LucideIcon;
  /** Small PNG icon for nav / lists. */
  image?: string;
  description: string;
  /** Wide landscape hero photo (stock). */
  heroImage: string;
  heroImageAlt: string;
  tagline: string;
  overview: string;
  highlights: string[];
  billingFocus: string[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
};

/** Landscape stock hero — unique image per specialty. */
const stockHero = (src: string, alt: string) => ({
  heroImage: src,
  heroImageAlt: alt,
});

export const specialties: Specialty[] = [
  {
    name: "Cardiology",
    slug: "cardiology",
    icon: Heart,
    image: "/images/specialties/cardiology.png",
    description:
      "Complex cardiac coding, cath lab billing, and payer-specific cardiology rules.",
    ...stockHero(
      stockImages.cardiology,
      "Cardiac monitoring and cardiology clinical environment",
    ),
    tagline: "Precision billing for every rhythm of cardiac care.",
    overview:
      "Cardiology billing demands deep knowledge of cath lab procedures, nuclear studies, device implants, and global surgical packages. Our coders understand modifier 26/TC splits, bilateral rules, and payer edits that routinely trigger cardiology denials.",
    highlights: [
      "Cath lab & interventional cardiology",
      "Echocardiography and nuclear cardiology",
      "Device implants and follow-up care",
      "High-volume E/M with chronic care management",
    ],
    billingFocus: [
      "Correct use of cardiac-specific CPT codes and add-on codes",
      "Modifier accuracy for bilateral and multiple vessel procedures",
      "Prior authorization for advanced imaging and devices",
      "Denial appeals for medical necessity and LCD/NCD mismatches",
    ],
    faqs: [
      {
        question: "Do you handle both office and hospital cardiology billing?",
        answer:
          "Yes. We bill professional and facility claims across office, ASC, and hospital settings with coders trained on cardiology-specific workflows.",
      },
      {
        question: "Can you improve our cath lab denial rate?",
        answer:
          "We scrub claims against payer-specific cardiology edits before submission and rework denials with clinical documentation support.",
      },
    ],
    metaTitle: "Cardiology Medical Billing Services",
    metaDescription:
      "Specialty cardiology billing for cath lab, imaging, devices, and chronic care — fewer denials and faster reimbursements with ERG.",
  },
  {
    name: "Orthopedics",
    slug: "orthopedics",
    icon: Bone,
    image: "/images/specialties/orthopedics.png",
    description:
      "Surgical and non-surgical ortho billing with modifier accuracy and global period tracking.",
    ...stockHero(
      stockImages.orthopedics,
      "Orthopedic imaging and musculoskeletal care",
    ),
    tagline: "Surgical precision meets revenue cycle accuracy.",
    overview:
      "Orthopedic practices juggle global surgical periods, implants, assist surgeons, and high-cost injections. We track global days, apply the right modifiers, and keep your ASC and office claims clean from intake to collections.",
    highlights: [
      "Joint replacement and sports medicine",
      "Spine and pain-related ortho procedures",
      "ASC and hospital surgical billing",
      "Injection and biologic coding",
    ],
    billingFocus: [
      "Global period tracking and post-op visit billing",
      "Implant and supply charge capture",
      "Modifier 50, 59, and RT/LT accuracy",
      "Workers' comp and auto liability workflows",
    ],
    faqs: [
      {
        question: "How do you handle global surgical packages?",
        answer:
          "We monitor global periods per procedure and ensure post-op visits, physical therapy referrals, and related services are billed correctly without duplicate charges.",
      },
    ],
    metaTitle: "Orthopedic Medical Billing Services",
    metaDescription:
      "Expert orthopedic billing for surgery, injections, and global periods — maximize collections with specialty-trained ERG coders.",
  },
  {
    name: "Behavioral Health",
    slug: "behavioral-health",
    icon: Brain,
    image: "/images/specialties/behavioral-health.png",
    description:
      "Mental health, psychiatry, and substance-use billing with session-level precision.",
    ...stockHero(
      stockImages.behavioralHealth,
      "Behavioral health consultation in a calm clinical setting",
    ),
    tagline: "Compassionate care deserves meticulous billing.",
    overview:
      "Behavioral health billing is session-driven and payer-sensitive — telehealth rules, time-based coding, and medical necessity documentation all matter. We help psychiatry, psychology, and substance-use programs get paid for the care they deliver.",
    highlights: [
      "Psychiatry and psychotherapy",
      "Substance-use and IOP/PHP programs",
      "Telehealth and hybrid visit models",
      "Group therapy and care coordination",
    ],
    billingFocus: [
      "Time-based psychotherapy and E/M coding",
      "Telehealth POS and modifier compliance",
      "Authorization tracking for ongoing treatment",
      "Denial management for medical necessity reviews",
    ],
    faqs: [
      {
        question: "Do you support telehealth behavioral health billing?",
        answer:
          "Yes. We stay current on telehealth coding, place-of-service rules, and payer-specific behavioral health policies.",
      },
    ],
    metaTitle: "Behavioral Health Medical Billing",
    metaDescription:
      "Behavioral health and psychiatry billing with session-level accuracy, telehealth expertise, and proactive denial prevention.",
  },
  {
    name: "Internal Medicine",
    slug: "internal-medicine",
    icon: Stethoscope,
    image: "/images/specialties/internal-medicine.png",
    description:
      "High-volume primary and internal medicine with chronic care and E/M optimization.",
    ...stockHero(
      stockImages.internalMedicine,
      "Internal medicine clinician checking a patient's blood pressure",
    ),
    tagline: "High-volume care, high-accuracy collections.",
    overview:
      "Internal medicine practices run on volume — annual wellness visits, chronic disease management, and complex E/M levels. We optimize documentation alignment, capture every billable service, and keep your revenue steady as patient panels grow.",
    highlights: [
      "Chronic care management (CCM)",
      "Annual wellness and preventive visits",
      "Complex multi-morbidity E/M coding",
      "Lab and referral coordination",
    ],
    billingFocus: [
      "E/M level accuracy and audit readiness",
      "CCM, TCM, and preventive service billing",
      "High-volume claim scrubbing and batch submission",
      "Underpayment detection across major payers",
    ],
    faqs: [
      {
        question: "Can you help us optimize E/M coding?",
        answer:
          "We review documentation patterns, train on compliant level selection, and reduce downcoding that leaves revenue on the table.",
      },
    ],
    metaTitle: "Internal Medicine Billing Services",
    metaDescription:
      "Internal medicine billing optimized for chronic care, wellness visits, and high-volume E/M — accurate coding that protects revenue.",
  },
  {
    name: "Pediatrics",
    slug: "pediatrics",
    icon: Baby,
    image: "/images/specialties/pediatrics.png",
    description:
      "Well-child visits, immunizations, and pediatric-specific payer requirements.",
    ...stockHero(
      stockImages.pediatrics,
      "Pediatrician caring for a young patient",
    ),
    tagline: "From well-child visits to complex pediatric care.",
    overview:
      "Pediatric billing blends preventive schedules, vaccine administration, and age-specific coding rules. We understand bundling for well visits, vaccine codes with counseling, and Medicaid-heavy payer mixes common in pediatrics.",
    highlights: [
      "Well-child and immunization schedules",
      "Medicaid and CHIP expertise",
      "Developmental screening and preventive codes",
      "Adolescent and sports medicine visits",
    ],
    billingFocus: [
      "Vaccine administration with counseling codes",
      "Preventive vs. problem-oriented visit bundling",
      "State Medicaid pediatric policies",
      "School and sports physical billing",
    ],
    faqs: [
      {
        question: "Do you handle vaccine billing and inventory?",
        answer:
          "We code vaccine products and administration accurately, including multi-component vaccines and payer-specific bundling rules.",
      },
    ],
    metaTitle: "Pediatric Medical Billing Services",
    metaDescription:
      "Pediatric billing for well-child visits, vaccines, and Medicaid — specialty coders who understand young patient care.",
  },
  {
    name: "Ophthalmology",
    slug: "ophthalmology",
    icon: Eye,
    image: "/images/specialties/ophthalmology.png",
    description:
      "Surgical and medical eye care billing including injectables and ASC claims.",
    ...stockHero(
      stockImages.ophthalmology,
      "Ophthalmology eye examination in a clinical setting",
    ),
    tagline: "Clear vision for your revenue cycle.",
    overview:
      "Ophthalmology spans office visits, advanced imaging, in-office injections, and ASC surgical procedures — each with distinct coding rules. We manage retina injectables, cataract global periods, and optical vs. medical billing boundaries.",
    highlights: [
      "Retina injections and serial treatments",
      "Cataract and refractive surgery",
      "OCT and diagnostic ophthalmic imaging",
      "ASC facility and professional claims",
    ],
    billingFocus: [
      "Anti-VEGF and specialty drug billing",
      "Global surgical packages for cataract surgery",
      "Laterality and bilateral procedure rules",
      "Prior auth for retina and surgical procedures",
    ],
    faqs: [
      {
        question: "Do you bill both professional and ASC facility claims?",
        answer:
          "Yes. We handle split claims, modifier usage, and facility fee schedules for ophthalmic ASC procedures.",
      },
    ],
    metaTitle: "Ophthalmology Medical Billing",
    metaDescription:
      "Ophthalmology billing for retina, cataract, imaging, and ASC — expert coding for medical and surgical eye care.",
  },
  {
    name: "Family Medicine",
    slug: "family-medicine",
    icon: Activity,
    image: "/images/specialties/family-medicine.png",
    description:
      "Full-scope family practice billing from preventive care to minor procedures.",
    ...stockHero(
      stockImages.familyMedicine,
      "Family medicine consultation with a patient",
    ),
    tagline: "Full-scope family care, full-scope billing support.",
    overview:
      "Family medicine touches every age group and visit type — from newborns to seniors, preventive to procedural. We capture the full scope of services your clinicians provide without leaving revenue in incomplete documentation.",
    highlights: [
      "All-ages preventive and sick visits",
      "Minor in-office procedures",
      "Women's health and maternity coordination",
      "Chronic disease management at scale",
    ],
    billingFocus: [
      "Preventive and problem visit differentiation",
      "Procedure coding with correct bundling",
      "Care management and transitional care",
      "Payer-specific family practice edits",
    ],
    faqs: [
      {
        question: "We do procedures in-office — can you handle that?",
        answer:
          "Absolutely. We code biopsies, lesion removals, joint injections, and other common office procedures with correct bundling.",
      },
    ],
    metaTitle: "Family Medicine Billing Services",
    metaDescription:
      "Family medicine billing from preventive care to in-office procedures — accurate, full-scope revenue cycle support.",
  },
  {
    name: "Pain Management",
    slug: "pain-management",
    icon: Syringe,
    image: "/images/specialties/pain-management.png",
    description:
      "Interventional pain procedures, injections, and prior-authorization workflows.",
    ...stockHero(
      stockImages.painManagement,
      "Pain management and rehabilitative care session",
    ),
    tagline: "Interventional billing without the administrative pain.",
    overview:
      "Pain management combines high-volume injections, fluoroscopy-guided procedures, and strict prior authorization requirements. We track auth expirations, code multi-level procedures correctly, and fight denials tied to medical necessity.",
    highlights: [
      "Epidural and facet joint injections",
      "Fluoroscopy and imaging guidance",
      "Implantable pain devices",
      "Medication management visits",
    ],
    billingFocus: [
      "Multi-level injection coding and units",
      "Prior authorization tracking and renewals",
      "Modifier 50, 59, and guidance rules",
      "Appeals for frequency-limit denials",
    ],
    faqs: [
      {
        question: "How do you manage prior authorizations?",
        answer:
          "We track auth requirements per payer and procedure, flag expirations before appointments, and document medical necessity for renewals.",
      },
    ],
    metaTitle: "Pain Management Medical Billing",
    metaDescription:
      "Pain management billing for injections, fluoroscopy, and devices — prior auth tracking and specialty procedure coding.",
  },
  {
    name: "General Surgery",
    slug: "general-surgery",
    icon: Scissors,
    image: "/images/specialties/general-surgery.png",
    description:
      "Surgical billing with correct global periods, implants, and assistant surgeon rules.",
    ...stockHero(
      stockImages.generalSurgery,
      "Surgical team in an operating room",
    ),
    tagline: "Every incision accounted for, every claim defended.",
    overview:
      "General surgery billing requires mastery of global packages, co-surgery rules, trauma activation, and implant pass-through. We work with your surgeons and ASC teams to capture the full surgical episode — not just the index procedure.",
    highlights: [
      "Open and minimally invasive procedures",
      "Trauma and emergency surgery",
      "ASC and hospital OR billing",
      "Assistant surgeon and co-surgeon claims",
    ],
    billingFocus: [
      "Global period management and post-op billing",
      "Implant and supply charge capture",
      "Co-surgery and team surgery modifiers",
      "Unlisted procedure code support with documentation",
    ],
    faqs: [
      {
        question: "Do you support ASC and hospital billing together?",
        answer:
          "Yes. We bill professional and facility components across settings with consistent coding standards.",
      },
    ],
    metaTitle: "General Surgery Medical Billing",
    metaDescription:
      "General surgery billing with global period expertise, implant capture, and co-surgery rules — fewer denials, faster payment.",
  },
  {
    name: "Laboratory & Pathology",
    slug: "laboratory-pathology",
    icon: Microscope,
    image: "/images/specialties/laboratory-pathology.png",
    description:
      "Lab requisitions, panel coding, and pathology with compliance-focused claim scrubbing.",
    ...stockHero(
      stockImages.laboratory,
      "Clinical laboratory and diagnostic testing environment",
    ),
    tagline: "Clean claims from the lab bench to the payer.",
    overview:
      "Lab and pathology billing faces unique challenges — panel coding, CLIA compliance, standing orders, and payer medical policy edits. We scrub every claim against frequency limits and LCD requirements before submission.",
    highlights: [
      "Clinical and anatomical pathology",
      "Molecular and genetic testing",
      "Reference lab and outreach billing",
      "Compliance-focused claim validation",
    ],
    billingFocus: [
      "Panel vs. individual test coding",
      "Modifier usage for repeat and reflex testing",
      "LCD/NCD medical necessity alignment",
      "Denial rework for medical policy edits",
    ],
    faqs: [
      {
        question: "Can you handle molecular and genetic test billing?",
        answer:
          "Yes. We code advanced diagnostics with payer-specific prior auth and medical policy requirements in mind.",
      },
    ],
    metaTitle: "Laboratory & Pathology Billing",
    metaDescription:
      "Lab and pathology billing with panel coding, CLIA awareness, and compliance-focused claim scrubbing.",
  },
  {
    name: "Pharmacy",
    slug: "pharmacy",
    icon: Pill,
    description: "Pharmacy billing, dispensing fees, and specialty drug claim management.",
    ...stockHero(
      stockImages.pharmacy,
      "Pharmacist dispensing medication in a pharmacy",
    ),
    tagline: "Specialty drugs deserve specialty billing.",
    overview:
      "Pharmacy billing spans dispensing fees, specialty medications, compounding, and medical benefit vs. pharmacy benefit routing. We help pharmacies and clinic-based dispensaries navigate complex payer rules and reimbursement models.",
    highlights: [
      "Specialty and high-cost drug billing",
      "Dispensing fee optimization",
      "340B and contract pharmacy awareness",
      "Prior authorization for specialty meds",
    ],
    billingFocus: [
      "NDC reporting and unit/billing accuracy",
      "Medical vs. pharmacy benefit routing",
      "Prior auth and step-therapy workflows",
      "Rejection and reversal management",
    ],
    faqs: [
      {
        question: "Do you support specialty pharmacy billing?",
        answer:
          "Yes. We handle high-cost specialty drugs with NDC accuracy, prior auth tracking, and payer-specific submission requirements.",
      },
    ],
    metaTitle: "Pharmacy Billing Services",
    metaDescription:
      "Pharmacy and specialty drug billing — dispensing fees, NDC accuracy, and prior authorization support.",
  },
  {
    name: "Chiropractic",
    slug: "chiropractic",
    icon: Hand,
    image: "/images/specialties/chiropractic.png",
    description:
      "Chiropractic care plans, visit limits, and payer-specific chiropractic policies.",
    ...stockHero(
      stockImages.chiropractic,
      "Chiropractic and manual therapy treatment",
    ),
    tagline: "Aligned coding for aligned patient outcomes.",
    overview:
      "Chiropractic billing is governed by visit limits, care plan documentation, and payer-specific coverage policies. We track authorized visits, code modalities correctly, and appeal denials tied to medical necessity and frequency caps.",
    highlights: [
      "Spinal manipulation and adjunct therapies",
      "Care plan and treatment episode tracking",
      "Personal injury and workers' comp",
      "X-ray and diagnostic billing",
    ],
    billingFocus: [
      "Visit limit tracking per payer and plan",
      "AT modifier and active treatment rules",
      "Care plan documentation alignment",
      "Appeals for exhausted benefit denials",
    ],
    faqs: [
      {
        question: "How do you handle visit limit denials?",
        answer:
          "We track authorized visits in real time, flag approaching limits, and appeal with documentation when medical necessity supports continued care.",
      },
    ],
    metaTitle: "Chiropractic Medical Billing",
    metaDescription:
      "Chiropractic billing with care plan tracking, visit limits, and payer-specific policy expertise.",
  },
];

export function getSpecialty(slug: string): Specialty | undefined {
  return specialties.find((s) => s.slug === slug);
}

export function getRelatedSpecialties(slug: string, count = 3): Specialty[] {
  const index = specialties.findIndex((s) => s.slug === slug);
  const others = specialties.filter((s) => s.slug !== slug);
  if (index < 0) return others.slice(0, count);
  const start = index % Math.max(others.length, 1);
  return [...others.slice(start), ...others.slice(0, start)].slice(0, count);
}
