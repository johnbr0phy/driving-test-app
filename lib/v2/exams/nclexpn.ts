import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// NCLEX-PN: the licensure exam for practical and vocational nurses (LPN/LVN).
// Computerized adaptive, 85 to 150 items in up to five hours, answered in
// order with no going back. A practice test here is the 85-item minimum
// length at about two minutes an item, weighted by the NCSBN 2026 NCLEX-PN
// Test Plan Client Needs ranges (effective April 1, 2026):
// Coordinated Care 18-24%, Safety and Infection Prevention and Control
// 10-16%, Health Promotion and Maintenance 6-12%, Psychosocial Integrity
// 9-15%, Basic Care and Comfort 7-13%, Pharmacological Therapies 10-16%,
// Reduction of Risk Potential 9-15%, Physiological Adaptation 7-13%.
// Every item is written for the PN scope: collecting data, reinforcing
// teaching, contributing to the plan of care, assigning tasks to assistive
// personnel and reporting changes to the RN or provider. Includes select all
// that apply, matrix, bowtie and other NGN-style items. Fixed practice items
// use all-or-nothing scoring, not adaptive ability estimation or partial
// credit. Scores do not predict NCLEX results.
const minutes = (n: number) => n * 60;

const DOMAINS = ["pnCare", "pnSafety", "pnHealth", "pnPsych", "pnComfort", "pnPharm", "pnRisk", "pnPhys"];

export const NCLEXPN: ExamV2Config = {
  id: "nclexpn",
  slug: "/nclex-pn",
  landingPath: "/nclex-pn-practice-test",
  name: "NCLEX-PN Practice Test",
  shortName: "NCLEX-PN",
  fullName: "NCLEX-PN licensure exam (LPN/LVN)",
  tagline: "85 practical nursing questions in order, no going back, weighted like the real test plan.",
  icon: "stethoscope",
  theme: { brand: "185 70% 34%", brandDark: "185 70% 24%", brandLight: "185 70% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "nclexpn",
      name: "NCLEX-PN",
      shortName: "NCLEX-PN",
      linear: true,
      modules: [{ module: 1, questionCount: 85, timeLimit: minutes(170) }],
      directions: "85 questions across all eight Client Needs categories, written for the practical nurse's scope. Answer each one before moving on; like the real NCLEX, you cannot go back. Select all that apply items count only when every correct option is chosen and no wrong one is.",
      scale: percentScale(85),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    pnCare: "Coordinated Care",
    pnSafety: "Safety and Infection Prevention",
    pnHealth: "Health Promotion and Maintenance",
    pnPsych: "Psychosocial Integrity",
    pnComfort: "Basic Care and Comfort",
    pnPharm: "Pharmacological Therapies",
    pnRisk: "Reduction of Risk Potential",
    pnPhys: "Physiological Adaptation",
  },
  drills: [
    { key: "care", name: "Coordinated Care", section: "nclexpn", domains: ["pnCare"], blurb: "Assigning tasks to AP, when to notify the RN, client rights, confidentiality, advance directives and ethics." },
    { key: "safety", name: "Safety and Infection Prevention", section: "nclexpn", domains: ["pnSafety"], blurb: "Isolation precautions, falls, restraints, incident reports and error prevention." },
    { key: "health", name: "Health Promotion", section: "nclexpn", domains: ["pnHealth"], blurb: "Pregnancy, newborns, growth and development, screening, immunizations and aging." },
    { key: "psych", name: "Psychosocial Integrity", section: "nclexpn", domains: ["pnPsych"], blurb: "Therapeutic communication, coping, abuse, substance use, grief and end of life." },
    { key: "comfort", name: "Basic Care and Comfort", section: "nclexpn", domains: ["pnComfort"], blurb: "Mobility, elimination, nutrition, hygiene, sleep and pressure injury care." },
    { key: "pharm", name: "Pharmacological Therapies", section: "nclexpn", domains: ["pnPharm"], blurb: "Expected effects, side effects, PO and IM dosage math and what to report before giving a dose." },
    { key: "risk", name: "Reduction of Risk Potential", section: "nclexpn", domains: ["pnRisk"], blurb: "Vital signs and labs to report, procedure prep and post-procedure complications." },
    { key: "phys", name: "Physiological Adaptation", section: "nclexpn", domains: ["pnPhys"], blurb: "Changes in condition, fluid and electrolytes, chronic illness and emergencies." },
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
  testLength: "2 hr 50 min",
  copy: {
    completedTitle: "Practice steps complete",
    progressNote: "Your goal tracks practice progress only. Practice percentages do not predict your NCLEX-PN result or tell you when to schedule the exam.",
    scoreLabel: "Practice percent correct",
    heroSubs: [
      "Drill each Client Needs area, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Practice goal hit. Review your missed questions and rationales.",
    ],
    sourceLine: "Based on the NCSBN 2026 NCLEX-PN Test Plan Client Needs categories. Original questions, not affiliated with NCSBN.",
    scoreNote: "Percent correct on these 85 practice items, scored all or nothing per item. Practice percentages do not predict your NCLEX-PN result or tell you when to schedule the exam. The real NCLEX-PN is adaptive and reports pass or fail against an ability standard, not a percentage.",
  },
};
