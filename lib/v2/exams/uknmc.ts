import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// NMC Test of Competence Part 1, the computer-based test (CBT) taken by nurses
// trained outside the UK to join the NMC register (adult nursing field).
// Format from the NMC "Test of Competence 2021 (nursing) test specification
// for candidates" and the CBT candidate information booklet (V3, April 2025):
// one sitting of 115 questions in 3 hours, Part A Numeracy 15 typed one-number
// answers in 30 minutes, Part B Clinical 100 four-option single-answer items in
// 2 hours 30 minutes, an on-screen calculator, free navigation with review, no
// negative marking, each part passed or failed on its own. Part A pass mark
// 13 of 15 (87%); Part B pass marks "generally 60% to 70%" by field.
// Part A blueprint per test: measuring the dose 2, metric units 2, oral 4,
// injections 3, IV infusions 3, fluid balance 1. Part B per test, by the
// seven platforms of the Future Nurse standards (2018) plus annexes:
// P1 accountable professional 17, P2 promoting health 10, P3 assessing needs
// 14, P4 providing and evaluating care 15, P5 leading and managing 10, P6
// safety and quality 10, P7 coordinating care 10, Annexe A communication 7,
// Annexe B procedures 7. UK practice throughout: the NMC Code, NEWS2, NICE,
// Mental Capacity Act 2005, UK drug units (micrograms written in full,
// 20 drops/mL giving sets). Original questions; scores do not predict results.
const minutes = (n: number) => n * 60;

export const UKNMC: ExamV2Config = {
  id: "uknmc",
  slug: "/nmc-cbt",
  landingPath: "/nmc-cbt-practice-test",
  name: "NMC CBT Practice Test",
  shortName: "NMC CBT",
  fullName: "NMC Test of Competence Part 1 (CBT), adult nursing",
  tagline: "Part A numeracy and Part B clinical in one sitting: 115 questions in 3 hours, weighted like the NMC blueprint.",
  icon: "stethoscope",
  theme: { brand: "289 90% 44%", brandDark: "289 90% 34%", brandLight: "289 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "nmcA",
      name: "Part A: Numeracy",
      shortName: "Part A",
      calculator: true,
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(30) }],
      directions: "15 drug and fluid calculations in 30 minutes. Type a single number for each answer: the question gives the unit and how to round. Use the calculator and scrap paper, and flag any question to come back to. The real pass mark is 13 out of 15.",
      scale: percentScale(15),
      domains: ["nmcNumeracy"],
    },
    {
      key: "nmcB",
      name: "Part B: Clinical",
      shortName: "Part B",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(150) }],
      directions: "100 multiple-choice questions in 2 hours 30 minutes, about 1.5 minutes each. Choose the one best answer for safe UK practice under the NMC Code. Flag any question to come back to before time runs out.",
      scale: percentScale(100),
      domains: ["nmcAccountable", "nmcHealth", "nmcAssess", "nmcProvide", "nmcLead", "nmcSafety", "nmcCoord", "nmcComms", "nmcProcedures"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    nmcNumeracy: "Numeracy",
    nmcAccountable: "Being an accountable professional",
    nmcHealth: "Promoting health and preventing ill health",
    nmcAssess: "Assessing needs and planning care",
    nmcProvide: "Providing and evaluating care",
    nmcLead: "Leading and managing care and working in teams",
    nmcSafety: "Improving safety and quality of care",
    nmcCoord: "Coordinating care",
    nmcComms: "Communication and relationship skills",
    nmcProcedures: "Nursing procedures",
  },
  drills: [
    { key: "numeracy", name: "Part A: Numeracy", section: "nmcA", domains: ["nmcNumeracy"], blurb: "Doses by weight, unit conversions, tablets and liquids, injections, drip and pump rates, and fluid balance." },
    { key: "accountable", name: "Accountable professional", section: "nmcB", domains: ["nmcAccountable"], blurb: "The NMC Code, revalidation, consent, the Mental Capacity Act, confidentiality, candour and raising concerns." },
    { key: "health", name: "Promoting health", section: "nmcB", domains: ["nmcHealth"], blurb: "Alcohol units, smoking, screening programmes, BMI, immunisation and Making Every Contact Count." },
    { key: "assess", name: "Assessing needs", section: "nmcB", domains: ["nmcAssess"], blurb: "NEWS2 scoring and escalation, MUST, pressure ulcers, sepsis, delirium, pain and care planning." },
    { key: "provide", name: "Providing care", section: "nmcB", domains: ["nmcProvide"], blurb: "Hypoglycaemia, anaphylaxis, oxygen, transfusion, seizures, stroke, end of life care and evaluating care." },
    { key: "lead", name: "Leading and coordinating care", section: "nmcB", domains: ["nmcLead", "nmcCoord"], blurb: "Delegation, prioritising, SBAR, students, discharge planning, the Care Act and working with other services." },
    { key: "safety", name: "Safety and quality", section: "nmcB", domains: ["nmcSafety"], blurb: "Infection control, sharps and waste, NG tubes, medicines safety, incident reporting and quality improvement." },
    { key: "skills", name: "Communication and procedures", section: "nmcB", domains: ["nmcComms", "nmcProcedures"], blurb: "Interpreters, difficult conversations, de-escalation, aseptic technique, injections, ECGs and moving and handling." },
  ],
  composite: { name: "Practice percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "70% practice score target",
    75: "75% practice score target",
    80: "80% practice score target",
    85: "85% practice score target",
    90: "90% practice score target",
  },
  testLength: "3 hr",
  copy: {
    completedTitle: "Practice steps complete",
    progressNote: "Your goal tracks practice progress only. Practice percentages do not predict your NMC CBT result.",
    scoreLabel: "Practice percent correct",
    heroSubs: [
      "Drill numeracy and each platform, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Practice goal hit. Review your missed questions and rationales.",
    ],
    sourceLine: "Weighted by the NMC Test of Competence 2021 nursing test specification. Original questions, not affiliated with the NMC or Pearson VUE.",
    scoreNote: "Percent correct across both parts. On the real CBT each part is passed or failed on its own: Part A needs 13 out of 15 (87%), and Part B pass marks are generally set between 60% and 70%. Check your Part A score on its own, as it needs the higher mark. Practice percentages do not predict your result.",
  },
};
