import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Google Cloud Digital Leader. Exam guide "launched on August 12, 2026"
// (services.google.com/fh/files/misc/cloud_digital_leader_exam_guide_english.pdf,
// checked 2026-10-30): 50 to 60 multiple choice and multiple select items in
// 90 minutes, pass/fail with no published passing score, 99 USD. Sections:
// Digital Transformation 18%, Data Transformation 18%, Innovating with AI 18%,
// Modernize Infrastructure and Applications 18%, Trust and Security 18%,
// Scaling with Google Cloud Operations 10%. The 2026 guide adds agentic and
// generative AI, Gemini Enterprise Agent Platform (formerly Vertex AI), the AI
// Hypercomputer and Google's security portfolio. Each practice test is 60
// items (the real maximum), 11/11/11/10/11/6 per section, with 5 "Choose two"
// items. One drill per section, so the dashboard has 8 steps.
const minutes = (n: number) => n * 60;

export const GCDL: ExamV2Config = {
  id: "gcdl",
  slug: "/google-cloud-digital-leader",
  landingPath: "/google-cloud-digital-leader-practice-test",
  name: "Google Cloud Digital Leader Practice Test",
  shortName: "Google CDL",
  fullName: "Google Cloud Digital Leader exam",
  tagline: "60 questions in 90 minutes with choose-two items, weighted to the 2026 exam guide.",
  icon: "cloud",
  theme: { brand: "224 90% 34%", brandDark: "224 90% 25%", brandLight: "224 80% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "gcdl",
      name: "Cloud Digital Leader",
      shortName: "CDL",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(90) }],
      directions: "60 questions across the six Cloud Digital Leader sections in 90 minutes. Multiple select items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(60),
      domains: ["gcdlTransform", "gcdlData", "gcdlAI", "gcdlModernize", "gcdlSecurity", "gcdlOps"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    gcdlTransform: "Digital Transformation",
    gcdlData: "Data Transformation",
    gcdlAI: "Innovating with AI",
    gcdlModernize: "Infrastructure and Applications",
    gcdlSecurity: "Trust and Security",
    gcdlOps: "Scaling with Operations",
  },
  drills: [
    { key: "transform", name: "Digital Transformation", section: "gcdl", domains: ["gcdlTransform"], blurb: "Cloud benefits, agentic AI, hybrid and multicloud, regions and zones, IaaS, PaaS and SaaS." },
    { key: "data", name: "Data Transformation", section: "gcdl", domains: ["gcdlData"], blurb: "Data types, BigQuery, Spanner, Cloud SQL, AlloyDB, storage classes, Looker and pipelines." },
    { key: "ai", name: "Innovating with AI", section: "gcdl", domains: ["gcdlAI"], blurb: "AI, ML and gen AI, data quality, responsible AI, Agent Platform, APIs and BigQuery ML." },
    { key: "modernize", name: "Infrastructure and Apps", section: "gcdl", domains: ["gcdlModernize"], blurb: "Migration paths, VMs and containers, GKE, Cloud Run, hybrid products and Apigee." },
    { key: "security", name: "Trust and Security", section: "gcdl", domains: ["gcdlSecurity"], blurb: "Threats, encryption, IAM and zero trust, Security Command Center, SecOps and Model Armor." },
    { key: "ops", name: "Scaling with Operations", section: "gcdl", domains: ["gcdlOps"], blurb: "CapEx and OpEx, the resource hierarchy, budgets and quotas, observability and SRE." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Around the likely passing line",
    75: "Passing with a little room",
    80: "A safe margin",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each section, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your Cloud Digital Leader exam.",
    ],
    sourceLine: "Weighted to the Google Cloud Digital Leader exam guide launched August 12, 2026. Product names as of 2026. Not affiliated with Google.",
    scoreNote: "Percent correct. Google reports only pass or fail and does not publish a passing score; aim for 80 percent here.",
  },
};
