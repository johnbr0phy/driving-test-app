import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// NAPLEX (North American Pharmacist Licensure Examination), NABP. Format from
// the NAPLEX/MPJE Candidate Application Bulletin (March 2026): 225 questions
// in a computerized fixed form in 6 hours, 200 scored and 25 unscored pretest
// items; most are scenario-based with a patient profile, the rest stand alone;
// questions are answered in order with no skipping and no going back; an
// on-screen scientific calculator; two optional 10-minute breaks. Results are
// reported as pass or fail; NABP's help center gives the 0 to 150 scale with
// 75 passing. Formats (NABP sample items): multiple choice, multiple response,
// constructed response (numeric), ordered response and hot spot (not modelled:
// no images). Blueprint: the NAPLEX Content Outline effective May 1, 2025,
// domains 1 to 5 at 25/25/40/5/5% of the 200 scored items. A practice test
// here is 100 items at the real pace (225 in 360 minutes, 1.6 minutes each),
// one linear section: Domain 1 as foundations 13 + calculations 12, Domain 2
// as orders 15 + immunization and handling 10, Domain 3 as therapy 20 +
// monitoring 10 + counseling 10, Domain 4 5, Domain 5 5. Generic drug names,
// US practice, no state law. Sources: tools/next100/naplex/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = ["napFoundations", "napCalc", "napOrders", "napHandling", "napTherapy", "napMonitor", "napCounsel", "napPractice", "napManage"];

export const NAPLEX: ExamV2Config = {
  id: "naplex",
  slug: "/naplex",
  landingPath: "/naplex-practice-test",
  name: "NAPLEX Practice Test",
  shortName: "NAPLEX",
  fullName: "North American Pharmacist Licensure Examination (NAPLEX)",
  tagline: "100 pharmacist licensure questions in order, no going back, weighted like NABP's 2025 content outline.",
  icon: "pill",
  theme: { brand: "132 55% 22%", brandDark: "132 55% 15%", brandLight: "132 45% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "naplex",
      name: "NAPLEX",
      shortName: "NAPLEX",
      linear: true,
      calculator: true,
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(160) }],
      directions: "100 questions in 2 hours 40 minutes, the real NAPLEX pace of about 1.6 minutes each, across all five content domains. Answer each question before moving on; like the real exam, you cannot go back. Some questions ask you to select all that apply, type a number or put steps in order, and the calculator is on. Select all that apply and ordered questions count only when fully right.",
      scale: percentScale(100),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    napFoundations: "Pharmaceutical science and research",
    napCalc: "Pharmaceutical calculations",
    napOrders: "Prescriptions and medication orders",
    napHandling: "Immunization, handling and storage",
    napTherapy: "Appropriate and safe therapy",
    napMonitor: "Assessment and monitoring",
    napCounsel: "Patient education, OTC and devices",
    napPractice: "Professional practice",
    napManage: "Pharmacy management and leadership",
  },
  drills: [
    { key: "foundations", name: "Pharmaceutical science", section: "naplex", domains: ["napFoundations"], blurb: "Pharmacology, pharmacokinetics, pharmacogenomics, compounding, drug development, biostatistics and drug information." },
    { key: "calc", name: "Calculations", section: "naplex", domains: ["napCalc"], blurb: "Creatinine clearance, infusion rates, dose conversions, concentrations, compounding, nutrition, NNT and PK parameters, typed as numbers." },
    { key: "orders", name: "Prescriptions and orders", section: "naplex", domains: ["napOrders"], blurb: "Drug classes, dosing regimens, dosage forms, boxed warnings, REMS, controlled substances and biosimilars." },
    { key: "handling", name: "Immunization and handling", section: "naplex", domains: ["napHandling"], blurb: "Vaccine storage and administration, hazardous drugs, DEA forms, stability and disposal." },
    { key: "therapy", name: "Appropriate therapy", section: "naplex", domains: ["napTherapy"], blurb: "Drug interactions, contraindications, special populations, errors and omissions, adverse reactions and toxicology." },
    { key: "monitor", name: "Assessment and monitoring", section: "naplex", domains: ["napMonitor"], blurb: "Therapeutic goals, drug levels, safety and effectiveness monitoring, histories, reconciliation and screening tools." },
    { key: "counsel", name: "Counseling, OTC and devices", section: "naplex", domains: ["napCounsel"], blurb: "Patient education, self-care and supplements, inhalers, pens and home monitoring." },
    { key: "practice", name: "Practice and management", section: "naplex", domains: ["napPractice", "napManage"], blurb: "MedWatch and VAERS, stewardship, ethics, recalls, error prevention, quality improvement and precepting." },
  ],
  composite: { name: "Practice percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [65, 70, 75, 80, 85],
  goalNotes: {
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target",
    80: "80% practice score target",
    85: "85% practice score target",
  },
  testLength: "2 hr 40 min",
  copy: {
    completedTitle: "Practice steps complete",
    progressNote: "Your goal tracks practice progress only. Practice percentages do not predict your NAPLEX result or tell you when to schedule the exam.",
    scoreLabel: "Practice percent correct",
    heroSubs: [
      "Drill each content area, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Practice goal hit. Review your missed questions and rationales.",
    ],
    sourceLine: "Weighted by the NABP NAPLEX Content Outline effective May 1, 2025. Original questions, not affiliated with NABP.",
    scoreNote: "Percent correct on these 100 practice items, scored all or nothing per item. The real NAPLEX is scored on a scale of 0 to 150 with 75 needed to pass, and a scaled 75 is not the same as 75% correct; NABP now reports only pass or fail. Practice percentages do not predict your result.",
  },
};
