import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// NCLEX-RN: computerized adaptive, 85 to 150 items in up to five hours,
// answered in order with no going back. A practice test here is the
// 85-item minimum length at about two minutes an item, weighted by the
// NCSBN 2026 NCLEX-RN Test Plan Client Needs ranges (effective April 2026):
// Management of Care 15-21%, Safety and Infection Prevention and Control
// 10-16%, Health Promotion 6-12%, Psychosocial 6-12%, Basic Care 6-12%,
// Pharmacological 13-19%, Reduction of Risk 9-15%, Physiological Adaptation
// 11-17%. About a quarter of items are select all that apply. Bowtie,
// matrix and drag-and-drop NGN formats are not modelled.
const minutes = (n: number) => n * 60;

const DOMAINS = ["nclexCare", "nclexSafety", "nclexHealth", "nclexPsych", "nclexComfort", "nclexPharm", "nclexRisk", "nclexPhys"];

export const NCLEX: ExamV2Config = {
  id: "nclex",
  slug: "/nclex",
  landingPath: "/nclex-rn-practice-test",
  name: "NCLEX-RN Practice Test",
  shortName: "NCLEX-RN",
  fullName: "NCLEX-RN licensure exam",
  tagline: "85 clinical judgment questions in order, no going back, weighted like the real test plan.",
  icon: "stethoscope",
  theme: { brand: "200 80% 36%", brandDark: "200 80% 26%", brandLight: "200 80% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "nclex",
      name: "NCLEX-RN",
      shortName: "NCLEX",
      linear: true,
      modules: [{ module: 1, questionCount: 85, timeLimit: minutes(170) }],
      directions: "85 questions across all eight Client Needs categories. Answer each one before moving on; like the real NCLEX, you cannot go back. Select all that apply items count only when every correct option is chosen and no wrong one is.",
      scale: percentScale(85),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    nclexCare: "Management of Care",
    nclexSafety: "Safety and Infection Prevention",
    nclexHealth: "Health Promotion and Maintenance",
    nclexPsych: "Psychosocial Integrity",
    nclexComfort: "Basic Care and Comfort",
    nclexPharm: "Pharmacological and Parenteral Therapies",
    nclexRisk: "Reduction of Risk Potential",
    nclexPhys: "Physiological Adaptation",
  },
  drills: [
    { key: "care", name: "Management of Care", section: "nclex", domains: ["nclexCare"], blurb: "Prioritizing, delegating to AP and LPNs, consent, ethics and handoff." },
    { key: "safety", name: "Safety and Infection Prevention", section: "nclex", domains: ["nclexSafety"], blurb: "Isolation precautions, falls, restraints, triage and error prevention." },
    { key: "health", name: "Health Promotion", section: "nclex", domains: ["nclexHealth"], blurb: "Pregnancy, newborns, growth and development, screening and aging." },
    { key: "psych", name: "Psychosocial Integrity", section: "nclex", domains: ["nclexPsych"], blurb: "Therapeutic communication, crisis, suicide risk, withdrawal and grief." },
    { key: "comfort", name: "Basic Care and Comfort", section: "nclex", domains: ["nclexComfort"], blurb: "Mobility, elimination, nutrition, sleep, hygiene and pressure injuries." },
    { key: "pharm", name: "Pharmacology", section: "nclex", domains: ["nclexPharm"], blurb: "High-alert drugs, IV therapy, blood products and dosage math." },
    { key: "risk", name: "Reduction of Risk Potential", section: "nclex", domains: ["nclexRisk"], blurb: "Labs to report, procedure prep and post-op complications." },
    { key: "phys", name: "Physiological Adaptation", section: "nclex", domains: ["nclexPhys"], blurb: "Shock, sepsis, DKA, heart failure, ABGs and emergencies." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80, 85],
  goalNotes: {
    60: "Borderline: keep drilling",
    65: "Close to the passing line",
    70: "Comfortably passing on practice items",
    75: "Strong: ready to schedule",
    80: "Very strong",
    85: "Top band",
  },
  testLength: "2 hr 50 min",
  copy: {
    heroSubs: [
      "Drill each Client Needs area, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Schedule your NCLEX.",
    ],
    sourceLine: "Based on the NCSBN 2026 NCLEX-RN Test Plan Client Needs categories. Original questions, not affiliated with NCSBN.",
    scoreNote: "Percent correct on 85 practice items. The real NCLEX is pass or fail against an ability standard, not a percent; 70 percent here is a solid sign.",
  },
};
