import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// NREMT Emergency Medical Responder (EMR) cognitive exam, new version since
// April 7, 2025, built from the 2023 BLS Practice Analysis. Per the NREMT EMR
// Examination Specifications it is computer adaptive: at least 90 and at most
// 110 items, 30 of them unscored pilot items, in 1 hour 45 minutes at Pearson
// VUE or by OnVUE remote proctoring. Item types: multiple choice (one of
// four), multiple response (two or three of five or six), build list (order),
// drag and drop and options table (matrix here). Scored on a 100 to 1500
// scale with 950 to pass.
//
// Content domains: Scene Size-up and Safety 19-23%, Primary Assessment
// 37-41%, Secondary Assessment 4-8%, Patient Treatment and Transport 20-24%,
// Operations 10-14%; pediatric care is integrated throughout. A practice test
// here is 60 items in 70 minutes, the real pace (90 in 105), at 13/23/4/13/7
// per test. Primary Assessment is split by Tigertest into two drills:
// responsiveness, airway and breathing (12) and circulation, vital signs and
// priorities (11). Fixed linear forms stand in for the adaptive exam.
const minutes = (n: number) => n * 60;

export const EMR: ExamV2Config = {
  id: "emr",
  slug: "/emr",
  landingPath: "/emr-practice-test",
  name: "EMR Practice Test",
  shortName: "EMR",
  fullName: "National Registry Emergency Medical Responder exam",
  tagline: "60 questions in order, no going back, with build-list and options-table items like the NREMT EMR exam.",
  icon: "siren",
  theme: { brand: "196 10% 40%", brandDark: "196 10% 33%", brandLight: "196 20% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "emr",
      name: "NREMT EMR",
      shortName: "EMR",
      linear: true,
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(70) }],
      directions: "60 questions across the five NREMT EMR domains. Answer each one before moving on; like the real exam, you cannot go back. Select-two and select-three items need that many answers, build-list items need every step in order, and options-table items need every row.",
      scale: percentScale(60),
      domains: ["emrScene", "emrAirway", "emrCirc", "emrSecondary", "emrTreatment", "emrOps"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    emrScene: "Scene Size-up and Safety",
    emrAirway: "Primary Assessment: Airway and Breathing",
    emrCirc: "Primary Assessment: Circulation and Priorities",
    emrSecondary: "Secondary Assessment",
    emrTreatment: "Patient Treatment and Transport",
    emrOps: "Operations",
  },
  drills: [
    { key: "scene", name: "Scene Size-up and Safety", section: "emr", domains: ["emrScene"], blurb: "Hazards, PPE, finding every patient, SALT triage and calling for help." },
    { key: "airway", name: "Airway and Breathing", section: "emr", domains: ["emrAirway"], blurb: "AVPU, opening the airway, oral airways, suction, choking and rescue breaths." },
    { key: "circulation", name: "Circulation and Priorities", section: "emr", domains: ["emrCirc"], blurb: "Pulses, skin signs, bleeding control, shock and manual blood pressure." },
    { key: "secondary", name: "Secondary Assessment", section: "emr", domains: ["emrSecondary"], blurb: "SAMPLE and OPQRST, the focused exam, stroke signs and reassessment." },
    { key: "treatment", name: "Treatment and Transport", section: "emr", domains: ["emrTreatment"], blurb: "CPR and the AED, oxygen, naloxone, splinting, childbirth and EMR scope." },
    { key: "operations", name: "Operations", section: "emr", domains: ["emrOps"], blurb: "Equipment checks, documentation, consent, privacy, ICS and responder well-being." },
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
  testLength: "1 hr 10 min",
  copy: {
    heroSubs: [
      "Drill each NREMT EMR domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the NREMT EMR examination specifications (2025). Scope follows the National EMS Scope of Practice Model; states and protocols vary, so follow local medical direction. Not affiliated with the NREMT.",
    scoreNote: "Percent correct on 60 practice items. The real NREMT EMR exam is adaptive, 90 to 110 items scored on a 100 to 1500 scale, with 950 to pass; it is not a percent.",
  },
};
