import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// NREMT Paramedic Certification Examination: one computer adaptive exam
// (the separate psychomotor exam ended July 1, 2024), 110 to 150 items
// including 20 unscored pilot items, 3.5 hours, answered in order with no
// going back, at Pearson VUE centers. Item types since the 2024 redesign:
// multiple choice, multiple response (two or three of five or six), build
// list (order), drag and drop and options box (matrix here), and graphical
// items (ECG strips, described in words here). Items with exactly three
// correct options use Choose three. Each technology-enhanced item stands
// alone; shared scenario sets are not in this bank.
//
// The test plan administered from July 1, 2024 is still the current one
// (verified October 2026 at nremt.org, "Paramedic-Test-Plan_1July2024"). It
// was built from the 2019 National EMS Practice Analysis and its 2021
// addendum: Airway, Respiration and Ventilation 8-12%, Cardiology and
// Resuscitation 10-14%, Trauma 6-10%, Medical, Obstetrics and Gynecology
// 24-28%, EMS Operations 8-12%, Clinical Judgment 34-38%. Pediatric care is
// integrated throughout. A practice test here is 80 items in 150 minutes at
// the same weighting (8/10/6/21/8/27 per test).
const minutes = (n: number) => n * 60;

export const PARAMEDIC: ExamV2Config = {
  id: "paramedic",
  slug: "/paramedic",
  landingPath: "/paramedic-practice-test",
  name: "Paramedic Practice Test",
  shortName: "Paramedic",
  fullName: "National Registry Paramedic cognitive exam",
  tagline: "80 questions in order, no going back, with build-list, options-box and drug-math items like the NREMT.",
  icon: "siren",
  theme: { brand: "10 65% 42%", brandDark: "10 65% 31%", brandLight: "10 75% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "paramedic",
      name: "NREMT Paramedic",
      shortName: "Paramedic",
      linear: true,
      modules: [{ module: 1, questionCount: 80, timeLimit: minutes(150) }],
      directions: "80 questions across the six NREMT Paramedic domains. Answer each one before moving on; like the real exam, you cannot go back. Choose-three items need three answers, build-list items need every step in order, options-box items need every row, and dose items take a number.",
      scale: percentScale(80),
      domains: ["pmdAirway", "pmdCardio", "pmdTrauma", "pmdMedical", "pmdOps", "pmdJudgment"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    pmdAirway: "Airway, Respiration and Ventilation",
    pmdCardio: "Cardiology and Resuscitation",
    pmdTrauma: "Trauma",
    pmdMedical: "Medical, Obstetrics and Gynecology",
    pmdOps: "EMS Operations",
    pmdJudgment: "Clinical Judgment",
  },
  drills: [
    { key: "airway", name: "Airway, Respiration and Ventilation", section: "paramedic", domains: ["pmdAirway"], blurb: "Advanced airways, RSI, CPAP, capnography and ventilation." },
    { key: "cardio", name: "Cardiology and Resuscitation", section: "paramedic", domains: ["pmdCardio"], blurb: "Rhythms in words, ACLS drugs and doses, 12-lead STEMI criteria and post-arrest care." },
    { key: "trauma", name: "Trauma", section: "paramedic", domains: ["pmdTrauma"], blurb: "Hemorrhage, shock, chest and head injury, burns and trauma triage." },
    { key: "medical", name: "Medical, Obstetrics and Gynecology", section: "paramedic", domains: ["pmdMedical"], blurb: "Respiratory, neuro, endocrine, toxicology, OB and pediatric emergencies." },
    { key: "operations", name: "EMS Operations", section: "paramedic", domains: ["pmdOps"], blurb: "Vehicle and equipment safety, leadership, documentation, legal standards and the environment of care." },
    { key: "judgment", name: "Clinical Judgment", section: "paramedic", domains: ["pmdJudgment"], blurb: "Scenario items: recognize and analyze cues, pick the priority, act and reassess." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [65, 70, 75, 80, 85, 90],
  goalNotes: {
    65: "Borderline: keep drilling",
    70: "Close to the passing line",
    75: "Comfortably passing on practice items",
    80: "Strong: ready to schedule",
    85: "Very strong",
    90: "Top band",
  },
  testLength: "2 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each NREMT Paramedic domain, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Schedule your NREMT exam.",
    ],
    sourceLine: "Weighted to the NREMT Paramedic certification examination test plan (2024). Protocols vary; follow local medical direction. Not affiliated with the NREMT.",
    scoreNote: "Percent correct on 80 practice items. The real NREMT is pass or fail against an ability standard, not a percent.",
  },
};
