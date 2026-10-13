import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// NREMT EMT cognitive exam: computer adaptive, 70 to 120 items in 2 hours,
// answered in order with no going back. Since April 2025 it includes
// technology-enhanced items: build list (order), options box and drag and
// drop sorting (matrix here), and multiple select. A practice test is the
// 70-item minimum weighted to the NREMT EMT examination specifications
// (April 2025): Scene Size-up and Safety 15-19%, Primary Assessment 39-43%,
// Secondary Assessment 5-9%, Patient Treatment and Transport 20-24%,
// Operations 10-14% (13/28/6/15/8 per test).
const minutes = (n: number) => n * 60;

export const EMT: ExamV2Config = {
  id: "emt",
  slug: "/emt",
  landingPath: "/emt-practice-test",
  name: "EMT Practice Test",
  shortName: "EMT",
  fullName: "National Registry EMT cognitive exam",
  tagline: "70 questions in order, no going back, with build-list and options-box items like the NREMT.",
  icon: "siren",
  theme: { brand: "240 55% 48%", brandDark: "240 55% 36%", brandLight: "240 65% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "emt",
      name: "NREMT EMT",
      shortName: "EMT",
      linear: true,
      modules: [{ module: 1, questionCount: 70, timeLimit: minutes(120) }],
      directions: "70 questions across the five NREMT domains. Answer each one before moving on; like the real exam, you cannot go back. Build-list items need every step in order, and options-box items need every row.",
      scale: percentScale(70),
      domains: ["sceneSizeUp", "primaryAssessment", "secondaryAssessment", "treatmentTransport", "emsOperations"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    sceneSizeUp: "Scene Size-up and Safety",
    primaryAssessment: "Primary Assessment",
    secondaryAssessment: "Secondary Assessment",
    treatmentTransport: "Patient Treatment and Transport",
    emsOperations: "Operations",
  },
  drills: [
    { key: "scene", name: "Scene Size-up and Safety", section: "emt", domains: ["sceneSizeUp"], blurb: "Scene safety, mechanism of injury, resources and triage." },
    { key: "primary", name: "Primary Assessment", section: "emt", domains: ["primaryAssessment"], blurb: "Airway, breathing, circulation and the life threats that weigh most." },
    { key: "secondary", name: "Secondary Assessment", section: "emt", domains: ["secondaryAssessment"], blurb: "History, vital signs and the focused and full-body exam." },
    { key: "treatment", name: "Treatment and Transport", section: "emt", domains: ["treatmentTransport"], blurb: "Interventions, medications EMTs give and transport decisions." },
    { key: "operations", name: "Operations", section: "emt", domains: ["emsOperations"], blurb: "Documentation, communication, ambulance ops and incident command." },
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
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each NREMT domain, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Schedule your NREMT exam.",
    ],
    sourceLine: "Weighted to the NREMT EMT examination specifications (April 2025). Protocols vary; follow local medical direction. Not affiliated with the NREMT.",
    scoreNote: "Percent correct on 70 practice items. The real NREMT is pass or fail against an ability standard, not a percent.",
  },
};
