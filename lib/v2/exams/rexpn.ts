import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// REx-PN: the Regulatory Exam - Practical Nurse, the entry-to-practice exam for
// Registered Practical Nurses in Ontario (CNO) and Licensed Practical Nurses in
// British Columbia (BCCNM). Built by NCSBN for Canadian regulators.
// Computerized adaptive, 90 to 150 items (30 unscored pretest items) in up to
// four hours, answered in order with no going back. A practice test here is
// the 90-item minimum length at about two minutes an item, weighted by the
// REx-PN Test Plan (effective January 2022, revised 2025) Client Needs
// ranges: Management of Care 18-24% (21% target), Safety and Infection
// Control 10-16% (13%), Health Promotion and Maintenance 6-12% (9%),
// Psychosocial Integrity 8-14% (11%), Basic Care and Comfort 6-12% (9%),
// Pharmacological and Parenteral Therapies 14-20% (17%), Reduction of Risk
// Potential 8-14% (11%), Physiological Adaptation 6-12% (9%).
// Per test 19/12/8/10/8/15/10/8. Formats are the REx-PN's own: multiple
// choice, multiple response (select all that apply), fill-in-the-blank
// calculation and exhibit items (a chart or table in the passage). No NGN
// case studies: the REx-PN does not use them. Canadian practice throughout:
// SI units (mmol/L, g/L, x 10^9/L, kg, degrees Celsius), Canadian drug names,
// unregulated care providers (UCPs, e.g. PSWs), and consent, privacy and
// scope rules stated as varying by province. Fixed practice items scored all
// or nothing; the real exam gives partial credit on SATA items from January
// 2026 and reports pass or fail. Scores do not predict REx-PN results.
const minutes = (n: number) => n * 60;

const DOMAINS = ["rexpnCare", "rexpnSafety", "rexpnHealth", "rexpnPsych", "rexpnComfort", "rexpnPharm", "rexpnRisk", "rexpnPhys"];

export const REXPN: ExamV2Config = {
  id: "rexpn",
  slug: "/rex-pn",
  landingPath: "/rex-pn-practice-test",
  name: "REx-PN Practice Test",
  shortName: "REx-PN",
  fullName: "REx-PN practical nurse exam (RPN/LPN, Canada)",
  tagline: "90 practical nursing questions in order, no going back, weighted like the REx-PN test plan.",
  icon: "stethoscope",
  theme: { brand: "276 60% 32%", brandDark: "276 60% 23%", brandLight: "276 60% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "rexpn",
      name: "REx-PN",
      shortName: "REx-PN",
      linear: true,
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(180) }],
      directions: "90 questions across all eight Client Needs categories, written for the practical nurse in Canada. Answer each one before moving on; like the real REx-PN, you cannot go back. Select all that apply items count only when every correct option is chosen and no wrong one is.",
      scale: percentScale(90),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    rexpnCare: "Management of Care",
    rexpnSafety: "Safety and Infection Control",
    rexpnHealth: "Health Promotion and Maintenance",
    rexpnPsych: "Psychosocial Integrity",
    rexpnComfort: "Basic Care and Comfort",
    rexpnPharm: "Pharmacological and Parenteral Therapies",
    rexpnRisk: "Reduction of Risk Potential",
    rexpnPhys: "Physiological Adaptation",
  },
  drills: [
    { key: "care", name: "Management of Care", section: "rexpn", domains: ["rexpnCare"], blurb: "Priorities, assigning tasks to UCPs, consent, privacy, substitute decision-makers, reporting duties and working with the RN." },
    { key: "safety", name: "Safety and Infection Control", section: "rexpn", domains: ["rexpnSafety"], blurb: "Routine and additional precautions, PPE, falls, least restraint, WHMIS and incident reporting." },
    { key: "health", name: "Health Promotion", section: "rexpn", domains: ["rexpnHealth"], blurb: "Pregnancy, newborns, growth and development, screening, immunization and healthy aging." },
    { key: "psych", name: "Psychosocial Integrity", section: "rexpn", domains: ["rexpnPsych"], blurb: "Therapeutic communication, suicide risk, dementia and delirium, substance use, grief and culturally safe care." },
    { key: "comfort", name: "Basic Care and Comfort", section: "rexpn", domains: ["rexpnComfort"], blurb: "Mobility, elimination, intake and output, enteral feeding, skin care, sleep and comfort measures." },
    { key: "pharm", name: "Pharmacology and IV Therapy", section: "rexpn", domains: ["rexpnPharm"], blurb: "Dosage and IV flow rate math, high-alert drugs, transfusions, central lines and what to hold or report." },
    { key: "risk", name: "Reduction of Risk Potential", section: "rexpn", domains: ["rexpnRisk"], blurb: "SI lab values, vital sign trends, procedure prep and complications after tests and surgery." },
    { key: "phys", name: "Physiological Adaptation", section: "rexpn", domains: ["rexpnPhys"], blurb: "Emergencies, fluid and electrolytes, heart failure, diabetes crises, shock and changes in condition." },
  ],
  composite: { name: "Practice percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80, 85],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target",
    80: "80% practice score target",
    85: "85% practice score target",
  },
  testLength: "3 hr",
  copy: {
    completedTitle: "Practice steps complete",
    progressNote: "Your goal tracks practice progress only. Practice percentages do not predict your REx-PN result or tell you when to write the exam.",
    scoreLabel: "Practice percent correct",
    heroSubs: [
      "Drill each Client Needs area, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Practice goal hit. Review your missed questions and rationales.",
    ],
    sourceLine: "Based on the REx-PN Test Plan Client Needs categories. Original questions, not affiliated with NCSBN, CNO or BCCNM.",
    scoreNote: "Percent correct on these 90 practice items, scored all or nothing per item. Practice percentages do not predict your REx-PN result or tell you when to write the exam. The real REx-PN is adaptive, gives partial credit on select all that apply items, and reports pass or fail against an ability standard, not a percentage.",
  },
};
