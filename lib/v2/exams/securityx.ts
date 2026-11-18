import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA CAS-005 V5 objectives document v7.0, checked 2026-11-17.
// Official20/27/31/22% rounded to18/24/28/20 of90. MCQ-only practice:
// interactive performance-based tasks are omitted, not simulated by these items.
const domains = ["securityxGrc", "securityxArchitecture", "securityxEngineering", "securityxOperations"];
export const SECURITYX: ExamV2Config = {
  id: "securityx", slug: "/comptia-securityx", landingPath: "/comptia-securityx-practice-test",
  name: "CompTIA SecurityX Practice Test", shortName: "SecurityX",
  fullName: "CompTIA SecurityX (CAS-005, formerly CASP+)",
  tagline: "Enterprise security decisions across four domains. MCQ practice; interactive performance tasks are not included.",
  icon: "shield", theme: { brand: "8 15% 38%", brandDark: "8 15% 29%", brandLight: "8 15% 96%" },
  breakSeconds: 0,
  sections: [{ key: "securityx", name: "SecurityX CAS-005 concepts", shortName: "SecurityX",
    modules: [{ module: 1, questionCount: 90, timeLimit: 165 * 60 }],
    directions: "90 original multiple-choice questions in 165 minutes. Choose one answer, flag questions and return to them. This is conceptual practice across the four CAS-005 domains. The real exam includes interactive performance-based questions that are not included here. Practice percentages do not predict CompTIA’s pass/fail result.",
    scale: percentScale(90), domains }],
  tests: [{ number: 1, name: "Practice Test 1" }, { number: 2, name: "Practice Test 2", heldOut: true }],
  domainLabels: { securityxGrc: "Governance, Risk and Compliance", securityxArchitecture: "Security Architecture", securityxEngineering: "Security Engineering", securityxOperations: "Security Operations" },
  drills: [
    { key: "governance", name: "Governance, Risk and Compliance", section: "securityx", domains: ["securityxGrc"], blurb: "Risk decisions, supplier obligations, threat modeling and AI governance." },
    { key: "architecture", name: "Security Architecture", section: "securityx", domains: ["securityxArchitecture"], blurb: "Zero trust, resilient design, software assurance, cloud and identity boundaries." },
    { key: "engineering", name: "Security Engineering", section: "securityx", domains: ["securityxEngineering"], blurb: "Identity and network troubleshooting, endpoints, OT, automation and cryptography." },
    { key: "operations", name: "Security Operations", section: "securityx", domains: ["securityxOperations"], blurb: "Monitoring evidence, defensive fixes, threat hunting and incident analysis." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80, goalChoices: [70, 75, 80, 85, 90],
  goalNotes: { 70: "Practice target", 75: "Practice target", 80: "Practice target", 85: "Practice target", 90: "Practice target" },
  testLength: "2 hr 45 min",
  copy: {
    heroSubs: ["Four drills and two practice tests. Start with Governance, Risk and Compliance.", "Work through the domain drills and explanations.", "Use Practice Test 1 to check your understanding.", "Review missed concepts before Practice Test 2.", "Practice goals complete. Continue hands-on preparation for performance tasks."],
    sourceLine: "Original CAS-005 conceptual practice aligned to CompTIA’s four-domain outline. MCQ-only; interactive performance tasks and exhaustive technology coverage are omitted. Not affiliated with CompTIA.",
    scoreNote: "Percentage correct for study. CompTIA reports pass/fail only, with no scaled score or published percentage threshold. The 80% goal is editorial and is not a pass prediction.",
  },
};
