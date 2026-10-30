import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// PMI Certified Associate in Project Management (CAPM), on the CAPM
// Examination Content Outline that took effect in 2023 (still the current
// outline in October 2026; PMI's July 2026 update changed the PMP, not the
// CAPM). The real exam is 150 items (135 scored, 15 unscored pretest) in 3
// hours, with multiple choice, multiple response, matching, hotspot and
// limited fill-in-the-blank items. Domains: Project Management Fundamentals
// and Core Concepts 36%, Predictive Plan-Based Methodologies 17%, Agile
// Frameworks/Methodologies 20%, Business Analysis Frameworks 27% (19 tasks).
// Practice tests are half length at the real pace: 75 items in 90 minutes,
// 27/13/15/20 per test by domain. Drills split Fundamentals (tasks 1.1-1.2 and
// 1.3-1.5) and Business Analysis (4.1-4.3 and 4.4-4.6) so there are 6 drills
// (14/13/13/15/11/9 per test) and 8 dashboard steps. Matching is modelled as
// matrix items and fill-in-the-blank as typed numeric items (earned value,
// critical path, velocity, communication channels); hotspots are not
// modelled. PMI publishes no pass mark, so the goal line is a readiness line.
// Sources: tools/capm/sources.md.
const minutes = (n: number) => n * 60;

export const CAPM: ExamV2Config = {
  id: "capm",
  slug: "/capm",
  landingPath: "/capm-practice-test",
  name: "CAPM Practice Test",
  shortName: "CAPM",
  fullName: "PMI Certified Associate in Project Management (CAPM) exam",
  tagline: "75 questions in 90 minutes on the CAPM outline: fundamentals, predictive, agile and business analysis.",
  icon: "target",
  theme: { brand: "256 60% 28%", brandDark: "256 60% 19%", brandLight: "256 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "capm",
      name: "CAPM practice exam",
      shortName: "CAPM",
      modules: [{ module: 1, questionCount: 75, timeLimit: minutes(90) }],
      directions: "75 questions in 90 minutes, the real exam's pace. Questions mix project management fundamentals, predictive and agile methods, and business analysis. Some items ask you to choose two, match items in a grid, or type a calculated number. Flag questions and come back to them.",
      scale: percentScale(75),
      domains: ["capmLifecycle", "capmRoles", "capmPredictive", "capmAgile", "capmBaRequirements", "capmBaDelivery"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    capmLifecycle: "Fundamentals: Life Cycles, Ethics and Planning",
    capmRoles: "Fundamentals: Roles, Communication and Problem Solving",
    capmPredictive: "Predictive, Plan-Based Methodologies",
    capmAgile: "Agile Frameworks and Methodologies",
    capmBaRequirements: "Business Analysis: Roles and Requirements",
    capmBaDelivery: "Business Analysis: Roadmaps and Validation",
  },
  drills: [
    { key: "lifecycle", name: "Life Cycles, Ethics and Planning", section: "capm", domains: ["capmLifecycle"], blurb: "Projects, programs and portfolios, life cycles, risks and issues, the code of ethics and the core plans." },
    { key: "roles", name: "Roles and Problem Solving", section: "capm", domains: ["capmRoles"], blurb: "Sponsor, PMO and team roles, leadership, communication and common problem-solving tools." },
    { key: "predictive", name: "Predictive Methods", section: "capm", domains: ["capmPredictive"], blurb: "WBS, critical path, schedule compression, baselines, change control and earned value." },
    { key: "agile", name: "Agile Frameworks", section: "capm", domains: ["capmAgile"], blurb: "Scrum roles and events, Kanban, XP, user stories, velocity and burn charts." },
    { key: "requirements", name: "Business Analysis and Requirements", section: "capm", domains: ["capmBaRequirements"], blurb: "The analyst's role, requirement types, elicitation techniques and stakeholder communication." },
    { key: "validation", name: "Roadmaps and Validation", section: "capm", domains: ["capmBaDelivery"], blurb: "Product roadmaps, how the approach shapes analysis, acceptance criteria and validation." },
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
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your CAPM exam.",
    ],
    sourceLine: "Original practice questions on the PMI CAPM Examination Content Outline (2023, current in 2026). Not affiliated with or endorsed by PMI.",
    scoreNote: "Percent correct. PMI does not publish a pass mark for the CAPM: it reports pass or fail plus a rating for each domain (Above Target, Target, Below Target or Needs Improvement). Treat 70 percent here as a readiness line and aim higher.",
  },
};
