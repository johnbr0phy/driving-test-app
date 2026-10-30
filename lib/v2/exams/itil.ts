import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// ITIL 4 Foundation (PeopleCert, on behalf of AXELOS): 40 multiple-choice
// items in 60 minutes, closed book, 65% (26 of 40) to pass. Still sold by
// PeopleCert in October 2026, in parallel with ITIL (Version 5) Foundation
// (released early 2026); PeopleCert's ITIL FAQ gives a current plan to
// sunset all ITIL 4 modules on 31 December 2027.
// Weighted to the ITIL 4 Foundation candidate syllabus learning outcomes:
// key concepts 5, guiding principles 6, four dimensions 2 + service value
// system 1 + value chain 2, purpose and terms of 15 practices 7, and 7
// practices in detail 17. The detail outcome is split into two drills
// (continual improvement, change enablement and service level management 8;
// incident, problem, service request management and service desk 9), so the
// dashboard is 6 drills + 2 tests = 8 steps. Practice tests are full length
// at the real pace. Sources: tools/itil/sources.md.
const minutes = (n: number) => n * 60;

export const ITIL: ExamV2Config = {
  id: "itil",
  slug: "/itil-4-foundation",
  landingPath: "/itil-4-foundation-practice-test",
  name: "ITIL 4 Foundation Practice Test",
  shortName: "ITIL 4",
  fullName: "ITIL 4 Foundation exam",
  tagline: "40 questions in 60 minutes with a 65 percent pass line, like the real ITIL 4 Foundation exam.",
  icon: "badge",
  theme: { brand: "28 90% 31%", brandDark: "28 90% 22%", brandLight: "28 80% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "itil",
      name: "ITIL 4 Foundation",
      shortName: "ITIL 4",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(60) }],
      directions: "40 multiple-choice questions in 60 minutes, closed book, like the real exam. Each question has one correct answer. You need 26 correct (65 percent) to pass. Flag questions and come back to them.",
      scale: percentScale(40),
      domains: ["itilConcepts", "itilPrinciples", "itilSystem", "itilPracticePurpose", "itilChangeImprove", "itilSupport"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    itilConcepts: "Key Concepts of Service Management",
    itilPrinciples: "Guiding Principles",
    itilSystem: "Four Dimensions and Service Value System",
    itilPracticePurpose: "Purpose of ITIL Practices",
    itilChangeImprove: "Improvement, Change and Service Levels",
    itilSupport: "Incidents, Problems, Requests and Service Desk",
  },
  drills: [
    { key: "concepts", name: "Key Concepts", section: "itil", domains: ["itilConcepts"], blurb: "Service, value, outcomes, utility and warranty, and the consumer roles." },
    { key: "principles", name: "Guiding Principles", section: "itil", domains: ["itilPrinciples"], blurb: "The seven guiding principles and how to apply them together." },
    { key: "system", name: "Dimensions and Value Chain", section: "itil", domains: ["itilSystem"], blurb: "The four dimensions, the service value system and the six value chain activities." },
    { key: "purposes", name: "Practice Purposes", section: "itil", domains: ["itilPracticePurpose"], blurb: "The purpose of 15 practices, plus IT asset, event, CI, change, incident, problem and known error." },
    { key: "changeImprove", name: "Improvement, Change and SLM", section: "itil", domains: ["itilChangeImprove"], blurb: "The continual improvement model, standard, normal and emergency changes, and SLAs." },
    { key: "support", name: "Incidents, Problems and Requests", section: "itil", domains: ["itilSupport"], blurb: "Incident and problem management, service requests and the service desk." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [65, 70, 75, 80, 90],
  goalNotes: {
    65: "The pass mark: 26 of 40",
    70: "Passing with a little room",
    75: "A safe margin over 65",
    80: "Strong: ready to book",
    90: "Top band",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each syllabus area, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your ITIL 4 Foundation exam.",
    ],
    sourceLine: "Original practice questions written to the ITIL 4 Foundation candidate syllabus. ITIL is a registered trademark of AXELOS Limited. Not affiliated with or endorsed by PeopleCert or AXELOS.",
    scoreNote: "Percent correct. The real exam passes at 65 percent, 26 of 40, with no negative marking. Aim for 75 percent here so a few unfamiliar questions on the day do not matter.",
  },
};
