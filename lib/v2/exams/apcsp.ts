import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// College Board CSP CED effective Fall 2023, current exam page checked 2026-11-17.
// MCQ only: 57 standalone single, 5 passage single, 8 choose-two; 70 in 120 min.
// Big Idea counts 8/14/23/9/16 fall within official weighting ranges.
// 200 originals: 2x70 tests +60 drill-only. Create and written response omitted.
export const APCSP: ExamV2Config = {
  id: "apcsp", slug: "/ap-computer-science-principles", landingPath: "/ap-computer-science-principles-practice-test",
  name: "AP Computer Science Principles Practice Test", shortName: "AP Computer Science Principles",
  fullName: "AP Computer Science Principles Exam", icon: "graduation",
  tagline: "Original computing problems across all five big ideas. Practise the multiple-choice section; study Create separately.",
  theme: { brand: "18 15% 32%", brandDark: "18 15% 22%", brandLight: "18 15% 96%" },
  breakSeconds: 0,
  sections: [{ key: "mcq", name: "Multiple Choice", shortName: "Multiple Choice",
    modules: [{ module: 1, questionCount: 70, timeLimit: 120 * 60 }],
    directions: "70 questions in 120 minutes: 57 standalone single-answer questions, five single-answer questions sharing an original reading passage and eight questions requiring exactly two answers. Each item has four options. Pseudocode uses one-based list indices and <- for assignment; RANDOM(a,b) includes both integer endpoints. Select both correct choices on choose-two items to earn the point. You may navigate and flag questions. The Create performance task and written responses are not included. This is Principles, not AP Computer Science A.",
    scale: percentScale(70), domains: ["apcspCreative", "apcspData", "apcspAlgorithms", "apcspNetworks", "apcspImpact"] }],
  tests: [{ number: 1, name: "Practice Test 1" }, { number: 2, name: "Practice Test 2", heldOut: true }],
  domainLabels: { apcspCreative: "Creative Development", apcspData: "Data", apcspAlgorithms: "Algorithms and Programming", apcspNetworks: "Computer Systems and Networks", apcspImpact: "Impact of Computing" },
  drills: [
    { key: "creative", name: "Creative Development", section: "mcq", domains: ["apcspCreative"], blurb: "User needs, collaboration, input/output, testing and debugging." },
    { key: "data", name: "Data", section: "mcq", domains: ["apcspData"], blurb: "Binary representation, compression, data cleaning and interpretation." },
    { key: "algorithms", name: "Algorithms and Programming", section: "mcq", domains: ["apcspAlgorithms"], blurb: "Trace original pseudocode, lists, loops, procedures, searches and simulations.", basics: ["apcspAssignment", "apcspConditions", "apcspArithmetic", "apcspLoops", "apcspListIndices"] },
    { key: "networks", name: "Computer Systems and Networks", section: "mcq", domains: ["apcspNetworks"], blurb: "Protocols, packets, routing, redundancy and parallel computing." },
    { key: "impact", name: "Impact of Computing", section: "mcq", domains: ["apcspImpact"], blurb: "Access, bias, crowdsourcing, privacy, security and responsible reuse." },
  ],
  composite: { name: "MCQ practice score (%)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70, goalChoices: [50, 60, 70, 80, 90],
  goalNotes: { 50: "Build a foundation", 60: "Strengthen the five big ideas", 70: "A practice target, not an AP cutoff", 80: "Consistent multiple-choice performance", 90: "Strong command of these computing skills" },
  testLength: "120 min",
  copy: {
    heroSubs: ["Practise tracing code in Algorithms Basics, then work through the five topics and two tests. Prepare Create separately.", "Work through the five big ideas.", "Take the first multiple-choice practice test.", "Use the held-out second test for a fresh check.", "MCQ goal reached. Continue preparing your Create task and written responses."],
    sourceLine: "200 original questions based on the current College Board CSP framework. AP is a College Board trademark; College Board does not endorse or affiliate with Tigertest.",
    scoreNote: "Percentage of MCQ items fully correct, not an AP score prediction. The real MCQ section contributes 70%; Create and its written responses contribute the other 30% and are not modelled here. No AP 1–5 conversion or official pass threshold is implied. Diagrams are described in text; this is not an executable programming environment.",
  },
};
