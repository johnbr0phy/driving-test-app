import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// ISTQB Certified Tester Foundation Level (CTFL) v4.0, syllabus v4.0.1:
// 40 multiple-choice questions worth one point each in 60 minutes (75 in a
// non-native language), 26 points (65%) to pass. Weighted to the ISTQB Exam
// Structure Tables v1.21 (November 2026): chapter 1 8 (here 1.1-1.3 and 1.5
// as 5, 1.4 test process as 3), chapter 2 6, chapter 3 4, chapter 4 11 (4.1-4.2
// black-box 5, 4.3-4.5 white-box, experience and collaboration 6), chapter 5
// 9 (5.1 planning 4, 5.2-5.5 risk, monitoring, CM and defects 5) and
// chapter 6 2 (with 5.2-5.5 in one domain). 8 drills + 2 tests = 10 steps.
// Practice tests are full length at the real pace. Sources:
// tools/build-run-2026-11-18/istqb/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "istqbFundamentals", "istqbTestProcess", "istqbLifecycle", "istqbStatic",
  "istqbBlackBox", "istqbTechniques", "istqbPlanning", "istqbManaging",
];

export const ISTQB: ExamV2Config = {
  id: "istqb",
  slug: "/istqb-ctfl",
  landingPath: "/istqb-ctfl-practice-test",
  name: "ISTQB CTFL Practice Test",
  shortName: "ISTQB CTFL",
  fullName: "ISTQB Certified Tester Foundation Level (CTFL v4.0) exam",
  tagline: "40 questions in 60 minutes with the 26-point pass line, like the real ISTQB Foundation Level exam.",
  icon: "badge",
  theme: { brand: "276 95% 38%", brandDark: "276 95% 28%", brandLight: "276 80% 97%" },
  breakSeconds: 0,
  sections: [
    {
      key: "ctfl",
      name: "ISTQB Foundation Level",
      shortName: "CTFL",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(60) }],
      directions: "40 multiple-choice questions in 60 minutes, like the real CTFL v4.0 exam. Each question has one correct answer and is worth one point. You need 26 points (65 percent) to pass. Flag questions and come back to them.",
      scale: percentScale(40),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    istqbFundamentals: "Fundamentals and Principles",
    istqbTestProcess: "Test Activities, Testware and Roles",
    istqbLifecycle: "Testing Throughout the SDLC",
    istqbStatic: "Static Testing and Reviews",
    istqbBlackBox: "Black-Box Test Techniques",
    istqbTechniques: "White-Box, Experience and Collaboration",
    istqbPlanning: "Test Planning and Estimation",
    istqbManaging: "Risk, Monitoring, Defects and Tools",
  },
  drills: [
    { key: "fundamentals", name: "Fundamentals and Principles", section: "ctfl", domains: ["istqbFundamentals"], blurb: "Test objectives, error, defect and failure, the seven principles, skills and independence." },
    { key: "process", name: "Test Activities and Roles", section: "ctfl", domains: ["istqbTestProcess"], blurb: "Planning to completion, the testware each activity produces, traceability and the two roles." },
    { key: "lifecycle", name: "Testing in the SDLC", section: "ctfl", domains: ["istqbLifecycle"], blurb: "TDD, ATDD and BDD, DevOps, shift left, test levels and types, regression and maintenance." },
    { key: "static", name: "Static Testing and Reviews", section: "ctfl", domains: ["istqbStatic"], blurb: "Static versus dynamic testing, the review process, review roles and review types." },
    { key: "blackbox", name: "Black-Box Techniques", section: "ctfl", domains: ["istqbBlackBox"], blurb: "Equivalence partitioning, boundary values, decision tables and state transitions, worked out." },
    { key: "techniques", name: "White-Box and Experience", section: "ctfl", domains: ["istqbTechniques"], blurb: "Statement and branch coverage, error guessing, exploratory testing, user stories and ATDD." },
    { key: "planning", name: "Planning and Estimation", section: "ctfl", domains: ["istqbPlanning"], blurb: "Test plans, entry and exit criteria, estimation sums, prioritization, the pyramid and quadrants." },
    { key: "managing", name: "Risk, Defects and Tools", section: "ctfl", domains: ["istqbManaging"], blurb: "Risk level, product and project risks, metrics and reports, defect reports and test automation." },
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
      "Drill each syllabus chapter, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your ISTQB Foundation Level exam.",
    ],
    sourceLine: "Original practice questions written to the ISTQB Certified Tester Foundation Level syllabus v4.0.1. ISTQB is a registered trademark of the International Software Testing Qualifications Board. Not affiliated with or endorsed by ISTQB or any ISTQB member board or exam provider.",
    scoreNote: "Percent correct. The real CTFL exam is 40 one-point questions and passes at 26 points (65 percent), with no negative marking. Aim for 75 percent here so a few unfamiliar questions on the day do not matter.",
  },
};
