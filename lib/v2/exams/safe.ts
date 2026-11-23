import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// SAFe Agilist, the exam for the Leading SAFe class (Scaled Agile). Built to
// the Exam Study Guide for the AI-Empowered SA - SAFe Agilist exam (October
// 20, 2026): 1 Adapt and Thrive with SAFe 7-9%, 2 Build a Foundation with
// Mindset, Value, and Principles 21-23%, 3 Establish Team and Technical
// Agility 10-12%, 4 Product Development Flow 25-28%, 5 Explore Lean Portfolio
// Management 21-23%, 6 Lead the Change 7-9%. Scaled Agile gives 45
// single-select questions in 90 minutes, closed book, 80% to pass. Each
// practice test is the real length and pace: 45 questions in 90 minutes with
// free navigation. Per test: adapt and thrive 4; mindset, values and AI 5,
// principles 5 (10); team and technical agility 5; customer-centricity and
// the ART backlog 6, PI Planning and execution 6 (12); Lean Portfolio
// Management 10; lead the change 4. Sources: tools/next100/safe/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "safeAdapt",
  "safeMindset", "safePrinciples",
  "safeTeam",
  "safeCustomer", "safePI",
  "safeLPM",
  "safeLead",
];

export const SAFE: ExamV2Config = {
  id: "safe",
  slug: "/safe-agilist",
  landingPath: "/safe-agilist-practice-test",
  name: "SAFe Agilist Practice Test",
  shortName: "SAFe Agilist",
  fullName: "SAFe Agilist (SA) exam for Leading SAFe",
  tagline: "45 questions in 90 minutes on SAFe's mindset, principles, ARTs, PI Planning and Lean Portfolio Management, weighted to the SAFe Agilist exam study guide.",
  icon: "badge",
  theme: { brand: "290 15% 32%", brandDark: "290 15% 24%", brandLight: "290 15% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "safe",
      name: "SAFe Agilist",
      shortName: "SAFe Agilist",
      modules: [{ module: 1, questionCount: 45, timeLimit: minutes(90) }],
      directions: "45 questions across the six exam domains in 90 minutes, the real exam's length and pace. Each question has one answer. Flag questions and come back to them.",
      scale: percentScale(45),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    safeAdapt: "Adapt and Thrive with SAFe",
    safeMindset: "Mindset, Core Values and AI",
    safePrinciples: "SAFe Lean-Agile Principles",
    safeTeam: "Team and Technical Agility",
    safeCustomer: "Customer-Centricity and the ART Backlog",
    safePI: "PI Planning and Executing the PI",
    safeLPM: "Lean Portfolio Management",
    safeLead: "Lead the Change",
  },
  drills: [
    { key: "adapt", name: "Adapt and Thrive", section: "safe", domains: ["safeAdapt"], blurb: "Business agility in the age of software and digital, the dual operating system, value streams and measure and grow." },
    { key: "mindset", name: "Mindset, Values and AI", section: "safe", domains: ["safeMindset"], blurb: "The four core values, the Lean-Agile mindset, the Agile Manifesto and using AI in a human-centric way." },
    { key: "principles", name: "Lean-Agile Principles", section: "safe", domains: ["safePrinciples"], blurb: "The ten principles: economics, systems thinking, set-based design, flow and Little's Law, cadence, motivation and decisions." },
    { key: "team", name: "Teams and Technical Agility", section: "safe", domains: ["safeTeam"], blurb: "Agile teams and ARTs, team roles, built-in quality, the continuous delivery pipeline, DevOps and architectural runway." },
    { key: "customer", name: "Customer-Centricity and WSJF", section: "safe", domains: ["safeCustomer"], blurb: "Customer-centricity, design thinking, features, stories and enablers, and ranking the ART backlog with WSJF." },
    { key: "pi", name: "PI Planning and Execution", section: "safe", domains: ["safePI"], blurb: "The Planning Interval, PI Planning, PI objectives, the IP iteration, ART Sync, the System Demo, Inspect and Adapt and release on demand." },
    { key: "lpm", name: "Lean Portfolio Management", section: "safe", domains: ["safeLPM"], blurb: "Lean budgets and guardrails, epics and the portfolio Kanban, strategic themes, portfolio vision and Strategic Investment Planning." },
    { key: "lead", name: "Lead the Change", section: "safe", domains: ["safeLead"], blurb: "Leading by example, the Implementation Roadmap, the LACE and change agents, and leading with AI." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 85,
  goalChoices: [75, 80, 85, 90],
  goalNotes: {
    75: "Below the 80% pass mark",
    80: "The SAFe Agilist pass mark",
    85: "A safe margin over the pass mark",
    90: "A strong margin",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each exam domain, then take a full 45-question test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to Scaled Agile's SAFe Agilist exam study guide. Not affiliated with or endorsed by Scaled Agile, Inc.",
    scoreNote: "Percent correct. Scaled Agile's pass mark is 80 percent, 36 of 45 questions.",
  },
};
