import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// PMI Project Management Professional (PMP), on the Examination Content
// Outline effective July 2026 (the outline live in October 2026): 180 items
// (170 scored, 10 pretest) in 240 minutes, opening with a case-study section,
// two 10-minute breaks, multiple choice, multiple response, matching, hotspot,
// pull-down and graphic-based items. Domains: People 33%, Process 41%,
// Business Environment 26%; about 40% of items predictive and 60% adaptive or
// hybrid. Practice tests are half length at the real pace: 90 items in 120
// minutes, each opening with a 5-item case study. Drills split the 26 ECO
// tasks into 7 clusters (per test 15/15/13/14/10/14/9 = People 30, Process 37,
// Business Environment 23). Matching is modelled as matrix items and calculations
// (EVM, PERT, channels) as typed numeric items, which the real exam does not
// have (its calculations are multiple choice); hotspots are not modelled. PMI publishes no pass mark, so the goal line is a readiness line.
// Sources: tools/pmp/sources.md.
const minutes = (n: number) => n * 60;

export const PMP: ExamV2Config = {
  id: "pmp",
  slug: "/pmp",
  landingPath: "/pmp-practice-test",
  name: "PMP Practice Test",
  shortName: "PMP",
  fullName: "PMI Project Management Professional (PMP) exam",
  tagline: "90 situational questions in 120 minutes, on the July 2026 PMP outline, opening with a case study like the real exam.",
  icon: "target",
  theme: { brand: "305 90% 44%", brandDark: "305 90% 34%", brandLight: "305 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "pmp",
      name: "PMP practice exam",
      shortName: "PMP",
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(120) }],
      directions: "90 questions in 120 minutes, the real exam's pace. The test opens with a five-question case study, then mixes the People, Process and Business Environment domains across predictive, agile and hybrid projects. Some items ask you to choose two, match items in a grid, or type a calculated number. Flag questions and come back to them.",
      scale: percentScale(90),
      domains: ["pmpTeam", "pmpStakeholders", "pmpPlanning", "pmpScheduleCost", "pmpDelivery", "pmpGovernance", "pmpRisk"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    pmpTeam: "People: Vision, Conflict and Team Leadership",
    pmpStakeholders: "People: Stakeholders and Communication",
    pmpPlanning: "Process: Planning, Scope and Value",
    pmpScheduleCost: "Process: Schedule, Finance and Status",
    pmpDelivery: "Process: Resources, Procurement, Quality and Closure",
    pmpGovernance: "Business Environment: Governance, Compliance and Change",
    pmpRisk: "Business Environment: Risk, Issues and Impediments",
  },
  drills: [
    { key: "team", name: "Leading the Team", section: "pmp", domains: ["pmpTeam"], blurb: "Shared vision, conflict, ground rules, leadership styles and self-organizing teams." },
    { key: "stakeholders", name: "Stakeholders and Communication", section: "pmp", domains: ["pmpStakeholders"], blurb: "Engagement, expectations, knowledge transfer and tailored reporting." },
    { key: "planning", name: "Planning, Scope and Value", section: "pmp", domains: ["pmpPlanning"], blurb: "Choosing the approach, the integrated plan, scope, backlogs and value delivery." },
    { key: "schedule", name: "Schedule, Finance and Status", section: "pmp", domains: ["pmpScheduleCost"], blurb: "Critical path, estimating, reserves, earned value math and agile metrics." },
    { key: "delivery", name: "Resources, Procurement and Quality", section: "pmp", domains: ["pmpDelivery"], blurb: "Contract types, vendors, resources, quality tools and project closure." },
    { key: "governance", name: "Governance and Change", section: "pmp", domains: ["pmpGovernance"], blurb: "Change control, compliance, ethics, organizational change and the outside world." },
    { key: "risk", name: "Risk and Impediments", section: "pmp", domains: ["pmpRisk"], blurb: "Risk responses, EMV, issues, escalation and removing blockers." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [65, 70, 75, 80, 85],
  goalNotes: {
    65: "Below the readiness line",
    70: "The readiness line",
    75: "A margin over the readiness line",
    80: "Strong: ready to book",
    85: "Well above the readiness line",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each task area, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your PMP exam.",
    ],
    sourceLine: "Original situational questions on the PMI PMP Examination Content Outline effective July 2026. Not affiliated with or endorsed by PMI.",
    scoreNote: "Percent correct. PMI does not publish a pass mark: it reports pass or fail plus a rating for each domain (Above Target, Target, Below Target or Needs Improvement). Treat 70 percent here as a readiness line and aim higher.",
  },
};
