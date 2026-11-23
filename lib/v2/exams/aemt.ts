import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// NREMT Advanced EMT (AEMT) Certification Examination, given since July 1,
// 2024 as one exam (the ALS psychomotor exam ended June 30, 2024). Per the
// NREMT AEMT Examination Specifications it is a fixed-length linear test:
// 135 items, 35 of them unscored pilot items, in 3 hours at Pearson VUE,
// answered in order with no going back. Item types: multiple choice (one of
// four), multiple response (two or three of five or six), build list (order),
// drag and drop and options box (matrix here), graphical and scenario-based
// items. Scored on a 100 to 1500 scale with 950 to pass.
//
// Content domains (2019 National EMS Practice Analysis and its 2021
// addendum): Airway, Respiration and Ventilation 9-13%, Cardiology and
// Resuscitation 11-15%, Trauma 7-11%, Medical, Obstetrics and Gynecology
// 25-29%, EMS Operations 6-10%, Clinical Judgment 31-35%. Pediatric care is
// integrated throughout. A practice test here is 75 items in 100 minutes, the
// real pace (135 in 180), at the same weighting (8/10/7/20/6/24 per test).
// Clinical Judgment items come in scenarios that run en route, on scene and
// post scene, as on the real exam.
const minutes = (n: number) => n * 60;

export const AEMT: ExamV2Config = {
  id: "aemt",
  slug: "/aemt",
  landingPath: "/aemt-practice-test",
  name: "AEMT Practice Test",
  shortName: "AEMT",
  fullName: "National Registry Advanced EMT certification exam",
  tagline: "75 questions in order, no going back, with scenarios, build-list and options-box items like the NREMT AEMT exam.",
  icon: "siren",
  theme: { brand: "280 15% 28%", brandDark: "280 15% 21%", brandLight: "280 25% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "aemt",
      name: "NREMT AEMT",
      shortName: "AEMT",
      linear: true,
      modules: [{ module: 1, questionCount: 75, timeLimit: minutes(100) }],
      directions: "75 questions across the six NREMT AEMT domains, including scenarios that follow one call from start to finish. Answer each one before moving on; like the real exam, you cannot go back. Select-two and select-three items need that many answers, build-list items need every step in order, and options-box items need every row.",
      scale: percentScale(75),
      domains: ["aemtAirway", "aemtCardio", "aemtTrauma", "aemtMedical", "aemtOps", "aemtJudgment"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    aemtAirway: "Airway, Respiration and Ventilation",
    aemtCardio: "Cardiology and Resuscitation",
    aemtTrauma: "Trauma",
    aemtMedical: "Medical, Obstetrics and Gynecology",
    aemtOps: "EMS Operations",
    aemtJudgment: "Clinical Judgment",
  },
  drills: [
    { key: "airway", name: "Airway, Respiration and Ventilation", section: "aemt", domains: ["aemtAirway"], blurb: "Supraglottic airways, CPAP, capnography, oxygen and ventilation." },
    { key: "cardio", name: "Cardiology and Resuscitation", section: "aemt", domains: ["aemtCardio"], blurb: "Chest pain, aspirin and nitroglycerin, 12-lead acquisition, CPR and the AED." },
    { key: "trauma", name: "Trauma", section: "aemt", domains: ["aemtTrauma"], blurb: "Bleeding control, shock fluids, chest and head injury, burns and spine care." },
    { key: "medical", name: "Medical, Obstetrics and Gynecology", section: "aemt", domains: ["aemtMedical"], blurb: "Glucose, overdose, anaphylaxis, stroke, sepsis, IV and IO access, childbirth." },
    { key: "operations", name: "EMS Operations", section: "aemt", domains: ["aemtOps"], blurb: "Medical direction, scope, privacy, documentation, vehicles and incident command." },
    { key: "judgment", name: "Clinical Judgment", section: "aemt", domains: ["aemtJudgment"], blurb: "Scenarios from dispatch to handoff: read the cues, act, reassess, communicate and lead." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [65, 70, 75, 80, 85, 90],
  goalNotes: {
    65: "A starting target",
    70: "A modest margin",
    75: "A solid target on practice items",
    80: "A strong margin",
    85: "Very strong",
    90: "Top band",
  },
  testLength: "1 hr 40 min",
  copy: {
    heroSubs: [
      "Drill each NREMT AEMT domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the NREMT AEMT examination specifications (July 2024). Scope follows the National EMS Scope of Practice Model; protocols vary, so follow local medical direction. Not affiliated with the NREMT.",
    scoreNote: "Percent correct on 75 practice items. The real NREMT AEMT exam is 135 items scored on a 100 to 1500 scale, with 950 to pass; it is not a percent.",
  },
};
