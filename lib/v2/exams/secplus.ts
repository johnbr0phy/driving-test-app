import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA Security+ SY0-701: up to 90 items in 90 minutes, multiple choice
// (some "Choose two"), multiple response and performance-based items, with
// free navigation and review. PBQs are approximated with order and matrix
// items. Weighted to the objectives: General Security Concepts 12%, Threats,
// Vulnerabilities and Mitigations 22%, Security Architecture 18%, Security
// Operations 28%, Program Management and Oversight 20% (11/20/16/25/18 per test).
const minutes = (n: number) => n * 60;

export const SECPLUS: ExamV2Config = {
  id: "secplus",
  slug: "/comptia-security-plus",
  landingPath: "/comptia-security-plus-practice-test",
  name: "CompTIA Security+ Practice Test",
  shortName: "Security+",
  fullName: "CompTIA Security+ (SY0-701) exam",
  tagline: "90 questions in 90 minutes, with choose-two, matching and ordering items like the real SY0-701.",
  icon: "lock",
  theme: { brand: "260 55% 48%", brandDark: "260 55% 36%", brandLight: "260 65% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "secplus",
      name: "Security+ SY0-701",
      shortName: "Security+",
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(90) }],
      directions: "90 questions across the five SY0-701 domains in 90 minutes. Flag questions and come back to them. Matching and ordering items stand in for the performance-based questions.",
      scale: percentScale(90),
      domains: ["secConcepts", "secThreats", "secArchitecture", "secOperations", "secGovernance"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    secConcepts: "General Security Concepts",
    secThreats: "Threats, Vulnerabilities and Mitigations",
    secArchitecture: "Security Architecture",
    secOperations: "Security Operations",
    secGovernance: "Program Management and Oversight",
  },
  drills: [
    { key: "concepts", name: "General Security Concepts", section: "secplus", domains: ["secConcepts"], blurb: "Controls, CIA, zero trust, change management and cryptography basics." },
    { key: "threats", name: "Threats and Mitigations", section: "secplus", domains: ["secThreats"], blurb: "Threat actors, attack types, indicators and how to mitigate them." },
    { key: "architecture", name: "Security Architecture", section: "secplus", domains: ["secArchitecture"], blurb: "Cloud, network design, data protection and resilience." },
    { key: "operations", name: "Security Operations", section: "secplus", domains: ["secOperations"], blurb: "Hardening, IAM, monitoring, incident response and forensics." },
    { key: "governance", name: "Program Management", section: "secplus", domains: ["secGovernance"], blurb: "Governance, risk, third parties, compliance and audits." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 85,
  goalChoices: [75, 80, 85, 90, 95],
  goalNotes: {
    75: "Below the safe line",
    80: "Close to passing",
    85: "A safe margin over 750",
    90: "Strong: ready to schedule",
    95: "Top band",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your Security+ exam.",
    ],
    sourceLine: "Weighted to the CompTIA Security+ SY0-701 objectives. Matching and ordering items approximate the performance-based questions. Not affiliated with CompTIA.",
    scoreNote: "Percent correct. CompTIA reports a scaled score from 100 to 900 with 750 to pass, which is not a fixed percent; aim for 85 percent here.",
  },
};
