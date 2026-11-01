import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AP Calculus AB (College Board), AP Central exam page and the AP Calculus
// AB and BC Course and Exam Description (July 2026 edition, with the
// clarifications effective fall 2026), checked 1 November 2026. From the
// May 2027 exam: 3 hours 10 minutes, hybrid digital (multiple choice in
// Bluebook, free responses handwritten). Section I is 42 multiple-choice
// questions with four choices in 1 hour 40 minutes, 50% of the score: Part A
// 29 questions in 62 minutes with no calculator (35%), Part B 13 questions
// in 38 minutes with a graphing calculator required (15%). Until May 2026
// it was 30 in 60 minutes and 15 in 45. Section II is 6 free-response
// questions in 90 minutes (50%). Unit weightings on the multiple choice
// (AB): Limits and Continuity 10-15%, Differentiation: Definition and Basic
// Derivative Rules 10-15%, Composite, Implicit and Inverse Functions 5-10%,
// Contextual Applications of Differentiation 10-15%, Applying Derivatives
// to Analyze Functions 15-20%, Integration and Accumulation of Change
// 15-20%, Differential Equations 5-10%, Applications of Integration 10-15%.
// Modelled: Section I only, at full length and pace, as two sections (Part A
// 29 in 62 minutes without a calculator, Part B 13 in 38 minutes with one),
// 5/5/3/5/7/8/3/6 questions by unit per test (Part A 4/4/3/3/5/6/2/2, Part B
// 1/1/0/2/2/2/1/4). Tigertest's calculator is scientific, not graphing, so
// Part B items are written to be solvable with it (no radian trigonometry,
// no numerical integration). Drills draw from Part A only (drills have no
// calculator), 20 questions per unit. Percent score; the College Board
// converts a composite to 1 to 5 each year with no fixed cut.
// Sources: tools/next100/apcalcab/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "apcalcabLimits",
  "apcalcabDerivatives",
  "apcalcabComposite",
  "apcalcabContextual",
  "apcalcabAnalytical",
  "apcalcabIntegration",
  "apcalcabDiffEq",
  "apcalcabApplications",
];

export const APCALCAB: ExamV2Config = {
  id: "apcalcab",
  slug: "/ap-calculus-ab",
  landingPath: "/ap-calculus-ab-practice-test",
  icon: "calculator",
  name: "AP Calculus AB Practice Test",
  shortName: "AP Calculus AB",
  fullName: "AP Calculus AB Exam",
  tagline: "The AP Calculus AB multiple-choice section: 42 questions in 100 minutes, with and without a calculator.",
  theme: { brand: "211 40% 42%", brandDark: "211 40% 32%", brandLight: "211 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "nocalc",
      name: "Part A (no calculator)",
      shortName: "Part A",
      modules: [{ module: 1, questionCount: 29, timeLimit: minutes(62) }],
      directions:
        "29 multiple-choice questions in 62 minutes with no calculator, like Part A of Section I of the AP Calculus AB Exam. Each question has four choices and one best answer, and there is no penalty for a wrong answer, so answer every question. Unless a question says otherwise, the domain of a function is all real numbers for which it is defined, and angles are in radians. Flag questions and come back to them before time runs out.",
      scale: percentScale(29),
      domains: DOMAINS,
    },
    {
      key: "calc",
      name: "Part B (calculator)",
      shortName: "Part B",
      calculator: true,
      modules: [{ module: 1, questionCount: 13, timeLimit: minutes(38) }],
      directions:
        "13 multiple-choice questions in 38 minutes with a calculator, like Part B of Section I. The real exam requires a graphing calculator (the Desmos calculator built into Bluebook, or an approved handheld). The calculator here is scientific, so these questions are written to be solved with one: use it for exponentials, logarithms and arithmetic, and round only your final answer. If the exact value is not one of the choices, pick the choice that best approximates it.",
      scale: percentScale(13),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    apcalcabLimits: "Limits and Continuity",
    apcalcabDerivatives: "Differentiation: Definition and Fundamental Properties",
    apcalcabComposite: "Composite, Implicit and Inverse Functions",
    apcalcabContextual: "Contextual Applications of Differentiation",
    apcalcabAnalytical: "Analytical Applications of Differentiation",
    apcalcabIntegration: "Integration and Accumulation of Change",
    apcalcabDiffEq: "Differential Equations",
    apcalcabApplications: "Applications of Integration",
  },
  // One drill per unit, no calculator (drills draw from Part A only), 20
  // questions each: Practice Test 1's Part A items plus drill-only items.
  drills: [
    { key: "limits", name: "Limits and Continuity", section: "nocalc", domains: ["apcalcabLimits"], blurb: "Limits from tables and algebra, one-sided and infinite limits, asymptotes, continuity and the Intermediate Value Theorem." },
    { key: "derivatives", name: "Differentiation: Definition and Fundamental Properties", section: "nocalc", domains: ["apcalcabDerivatives"], blurb: "The derivative as a limit, tangent lines, differentiability, and the power, product and quotient rules." },
    { key: "composite", name: "Composite, Implicit and Inverse Functions", section: "nocalc", domains: ["apcalcabComposite"], blurb: "The chain rule, implicit differentiation, inverse and inverse trigonometric functions, and higher-order derivatives." },
    { key: "contextual", name: "Contextual Applications of Differentiation", section: "nocalc", domains: ["apcalcabContextual"], blurb: "Derivatives in context, straight-line motion, related rates, linear approximation and L'Hospital's rule." },
    { key: "analytical", name: "Analytical Applications of Differentiation", section: "nocalc", domains: ["apcalcabAnalytical"], blurb: "The Mean Value and Extreme Value Theorems, extrema, concavity, curve sketching and optimization." },
    { key: "integration", name: "Integration and Accumulation of Change", section: "nocalc", domains: ["apcalcabIntegration"], blurb: "Riemann sums, the Fundamental Theorem of Calculus, accumulation functions, antiderivatives and substitution." },
    { key: "diffeq", name: "Differential Equations", section: "nocalc", domains: ["apcalcabDiffEq"], blurb: "Modelling with differential equations, slope fields, separation of variables and exponential models." },
    { key: "applications", name: "Applications of Integration", section: "nocalc", domains: ["apcalcabApplications"], blurb: "Average value, motion, accumulation in context, area between curves and volumes." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 55, 60, 65, 70, 75, 80, 85],
  goalNotes: {
    50: "A starting target",
    55: "Building a solid base",
    60: "Getting there",
    65: "A solid multiple-choice section",
    70: "A strong multiple-choice section",
    75: "Strong with room to spare",
    80: "Aiming high",
    85: "Aiming for the top score",
  },
  testLength: "1 hr 40 min",
  copy: {
    heroSubs: [
      "Drill each unit, then take a full multiple-choice section.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the multiple-choice section.",
    ],
    sourceLine: "Original practice questions written to the College Board AP Calculus AB course framework (Course and Exam Description, July 2026 edition, for the May 2027 exam). AP is a trademark of the College Board, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full multiple-choice section (Parts A and B), which is 50% of the real AP score. The free-response section (six questions, 50%) is not included. The real Part B requires a graphing calculator; Tigertest's calculator is scientific, so Part B questions here are written to work with one. The College Board combines both sections into a composite and converts it to an AP score of 1 to 5 each year, with no fixed percent for each score, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
