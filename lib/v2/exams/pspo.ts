import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Scrum.org Professional Scrum Product Owner I (PSPO I), as Scrum.org describes
// it in November 2026: 80 questions in 60 minutes, multiple choice, multiple
// answer and true/false, 85% to pass, English and Japanese, online. Focus areas:
// Understanding and Applying the Scrum Framework, Developing People and Teams,
// and Managing Products with Agility (Forecasting & Release Planning, Product
// Vision, Product Value, Product Backlog Management, Business Strategy,
// Stakeholders & Customers). Every item is original, written from the 2020 Scrum
// Guide (CC BY-SA 4.0), Scrum.org's focus area pages and the Evidence-Based
// Management Guide (2024, CC BY-SA 4.0), never from Scrum.org's Open
// Assessments, and checked against the psm bank. True/false items are
// single-answer items with two options. Practice tests are full length at the
// real pace. Scrum.org publishes no weighting, so the per-test split
// (14/12/14/18/12/10) is ours; 40 drill-only items.
// Sources: tools/next100/pspo/sources.md.
const minutes = (n: number) => n * 60;

export const PSPO: ExamV2Config = {
  id: "pspo",
  slug: "/pspo-1",
  landingPath: "/pspo-1-practice-test",
  name: "PSPO I Product Owner Practice Test",
  shortName: "PSPO I",
  fullName: "Professional Scrum Product Owner I (PSPO I) assessment",
  tagline: "80 questions in 60 minutes on product value, backlog management, stakeholders and Evidence-Based Management, with multiple answer and true/false items like the real PSPO I.",
  icon: "badge",
  theme: { brand: "286 30% 20%", brandDark: "286 30% 14%", brandLight: "286 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "pspo",
      name: "PSPO I practice assessment",
      shortName: "PSPO I",
      modules: [{ module: 1, questionCount: 80, timeLimit: minutes(60) }],
      directions: "80 questions in 60 minutes, the real assessment's pace. Questions are multiple choice, multiple answer (the question says how many to choose) and true or false, on the 2020 Scrum Guide, product management and Evidence-Based Management. Flag questions and come back to them.",
      scale: percentScale(80),
      domains: ["pspoFramework", "pspoVision", "pspoValue", "pspoBacklog", "pspoStakeholders", "pspoRelease"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    pspoFramework: "Scrum Framework for Product Owners",
    pspoVision: "Product Vision, Strategy and Goals",
    pspoValue: "Product Value and Evidence-Based Management",
    pspoBacklog: "Product Backlog Management",
    pspoStakeholders: "Stakeholders and Customers",
    pspoRelease: "Forecasting and Release Planning",
  },
  drills: [
    { key: "framework", name: "Scrum for Product Owners", section: "pspo", domains: ["pspoFramework"], blurb: "Sprint Planning, the Sprint Review, Done, empiricism and several teams on one product." },
    { key: "vision", name: "Vision, Strategy and Goals", section: "pspo", domains: ["pspoVision"], blurb: "Product Vision, business strategy, the Product Goal and EBM goals and experiments." },
    { key: "value", name: "Product Value and EBM", section: "pspo", domains: ["pspoValue"], blurb: "Outcomes over output, the four Key Value Areas and their example measures." },
    { key: "backlog", name: "Product Backlog Management", section: "pspo", domains: ["pspoBacklog"], blurb: "Ordering by value, risk and dependencies, refinement and splitting items." },
    { key: "stakeholders", name: "Stakeholders and Customers", section: "pspo", domains: ["pspoStakeholders"], blurb: "Collaboration, conflicting requests, saying no and the Sprint Review." },
    { key: "release", name: "Forecasting and Releases", section: "pspo", domains: ["pspoRelease"], blurb: "Frequent releases, forecasts from real progress, burn-ups and fixed dates." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 90,
  goalChoices: [80, 85, 90, 95],
  goalNotes: {
    80: "Below the 85% pass mark",
    85: "The PSPO I pass mark",
    90: "A safe margin over the pass mark",
    95: "Ready to book with confidence",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each product skill, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your PSPO I assessment.",
    ],
    sourceLine: "Original questions written from the 2020 Scrum Guide, Scrum.org's product focus areas and the Evidence-Based Management Guide. Not affiliated with or endorsed by Scrum.org.",
    scoreNote: "Percent correct. The real PSPO I needs 85 percent (68 of 80). Here every item is all or nothing: a multiple answer item counts only when every choice is right.",
  },
};
