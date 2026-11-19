import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// ISACA COBIT 2019 Foundation certificate exam: 75 multiple-choice questions
// in 2 hours, online and remotely proctored, 65% or higher to pass (ISACA's
// COBIT Foundation page, checked 2026-11-19). ISACA replaced it with the
// COBIT 7 Foundation certificate on 19 November 2026; the COBIT 2019 exam can
// still be bought until 30 June 2027 (see lib/examFreshness.json). COBIT 7
// framework content was not public, so this bank is COBIT 2019 only.
// Weighted to ISACA's COBIT 2019 Foundation domains: Governance System and
// Components 30% (components 13 + goals cascade, focus areas and design factor
// concepts 10), Governance and Management Objectives 23% (17), Principles 13%
// (10), Framework Introduction 12% (9), Implementation 8% (6), Designing a
// Tailored Governance System 7% (5), Performance Management 4% (3), Business
// Case 3% (2) = 75. Practice tests are full length at the real pace.
// 7 drills + 2 tests = 9 steps. Sources: tools/next100/cobit/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "cobitIntro", "cobitPrinciples", "cobitComponents", "cobitCascade", "cobitObjectives",
  "cobitPerformance", "cobitDesign", "cobitImplementation", "cobitBusinessCase",
];

export const COBIT: ExamV2Config = {
  id: "cobit",
  slug: "/cobit-2019-foundation",
  landingPath: "/cobit-2019-foundation-practice-test",
  name: "COBIT 2019 Foundation Practice Test",
  shortName: "COBIT 2019",
  fullName: "ISACA COBIT 2019 Foundation exam",
  tagline: "75 questions in 2 hours with a 65 percent pass line, like the real COBIT 2019 Foundation exam.",
  icon: "badge",
  theme: { brand: "324 100% 34%", brandDark: "324 100% 25%", brandLight: "324 80% 97%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cobit",
      name: "COBIT 2019 Foundation",
      shortName: "COBIT 2019",
      modules: [{ module: 1, questionCount: 75, timeLimit: minutes(120) }],
      directions: "75 multiple-choice questions in 2 hours, like the real exam. Each question has one correct answer. You need 65 percent, 49 of 75, to pass. Flag questions and come back to them.",
      scale: percentScale(75),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cobitIntro: "Framework Introduction",
    cobitPrinciples: "Principles",
    cobitComponents: "Governance Components",
    cobitCascade: "Goals Cascade, Focus Areas and Design Factors",
    cobitObjectives: "Governance and Management Objectives",
    cobitPerformance: "Performance Management",
    cobitDesign: "Designing a Tailored Governance System",
    cobitImplementation: "Implementation",
    cobitBusinessCase: "Business Case",
  },
  drills: [
    { key: "intro", name: "Framework Introduction", section: "cobit", domains: ["cobitIntro"], blurb: "What COBIT is and is not, governance versus management, history and publications." },
    { key: "principles", name: "Principles", section: "cobit", domains: ["cobitPrinciples"], blurb: "The six governance system principles and the three governance framework principles." },
    { key: "components", name: "Governance Components", section: "cobit", domains: ["cobitComponents"], blurb: "The seven component types, what each holds, and generic components versus variants." },
    { key: "cascade", name: "Goals Cascade and Focus Areas", section: "cobit", domains: ["cobitCascade"], blurb: "Stakeholder drivers, enterprise and alignment goals, focus areas and design factors." },
    { key: "objectives", name: "Objectives and Domains", section: "cobit", domains: ["cobitObjectives"], blurb: "The core model: EDM, APO, BAI, DSS and MEA and their 40 objectives." },
    { key: "design", name: "Design and Performance", section: "cobit", domains: ["cobitDesign", "cobitPerformance"], blurb: "The design workflow, strategy archetypes, capability levels and ratings." },
    { key: "implementation", name: "Implementation and Business Case", section: "cobit", domains: ["cobitImplementation", "cobitBusinessCase"], blurb: "The seven implementation phases and making the case for change." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [65, 70, 75, 80, 90],
  goalNotes: {
    65: "The pass mark: 49 of 75",
    70: "Passing with a little room",
    75: "A safe margin over 65",
    80: "Strong: ready to book",
    90: "Top band",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each exam domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your COBIT 2019 Foundation exam.",
    ],
    sourceLine: "Original practice questions written to ISACA's COBIT 2019 Foundation exam domains. COBIT is a registered trademark of ISACA. Not affiliated with or endorsed by ISACA.",
    scoreNote: "Percent correct. The real exam passes at 65 percent, 49 of 75. Aim for 75 percent here so a few unfamiliar questions on the day do not matter. ISACA replaced this exam with COBIT 7 Foundation on 19 November 2026; the COBIT 2019 exam can still be bought until 30 June 2027.",
  },
};
