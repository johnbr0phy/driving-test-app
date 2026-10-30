import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// GCSE (9-1) Mathematics, Higher tier, England. Every exam board (AQA,
// Pearson Edexcel, OCR) sets three papers of 1 hour 30 minutes and 80 marks
// each, Paper 1 without a calculator and Papers 2 and 3 with one, on the
// DfE GCSE mathematics subject content (November 2013). Higher tier awards
// grades 4 to 9 (an allowed grade 3 below that) and weights the content
// number 15%, algebra 30%, ratio, proportion and rates of change 20%,
// geometry and measures 20%, probability and statistics 15% (each plus or
// minus 3%). Here each practice paper is 20 questions in 45 minutes in those
// proportions (3/6/4/4/3), so a practice test is all three papers with a
// break between. Answers are all or nothing, so scores are percent correct,
// not grades. Test 2 is held out of the drills. Drill-only items live in
// Paper 1 because a drill draws from one section and runs without a
// calculator. Bank built by tools/gcsehigher/build.py.
const minutes = (n: number) => n * 60;
const DOMAINS = ["gcsehigherNumber", "gcsehigherAlgebra", "gcsehigherRatio", "gcsehigherGeometry", "gcsehigherStats"];

export const GCSEHIGHER: ExamV2Config = {
  id: "gcsehigher",
  slug: "/gcse-maths-higher",
  landingPath: "/gcse-maths-higher-practice-test",
  name: "GCSE Maths Higher Practice Test",
  shortName: "GCSE Maths Higher",
  fullName: "GCSE Mathematics, Higher tier",
  tagline: "Three-paper GCSE Maths Higher practice tests, with drills for every topic area and the basics first.",
  icon: "calculator",
  theme: { brand: "286 60% 36%", brandDark: "286 60% 26%", brandLight: "286 80% 96%" },
  breakSeconds: 600,
  sections: [
    {
      key: "p1",
      name: "Paper 1 (non-calculator)",
      shortName: "Paper 1",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(45) }],
      directions:
        "No calculator, like Paper 1 of the real exam. Questions cover number, algebra, ratio and proportion, geometry, and probability and statistics, with more algebra than anything else. Leave answers as exact values (fractions, surds, multiples of π) where the options do. For typed answers, enter a number, a decimal or a fraction such as 13/5, with no units.",
      scale: percentScale(20),
      domains: DOMAINS,
    },
    {
      key: "p2",
      name: "Paper 2 (calculator)",
      shortName: "Paper 2",
      calculator: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(45) }],
      directions:
        "A calculator is allowed, as on Papers 2 and 3 of the real exam. Round only at the end and give typed answers to the accuracy the question asks for, with no units. Formulae you need beyond the ones you are expected to know, such as the volume of a cone or sphere, are given in the question.",
      scale: percentScale(20),
      domains: DOMAINS,
    },
    {
      key: "p3",
      name: "Paper 3 (calculator)",
      shortName: "Paper 3",
      calculator: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(45) }],
      directions:
        "A calculator is allowed. The same mix of topics as Paper 2, with different questions. Round only at the end and give typed answers to the accuracy the question asks for, with no units.",
      scale: percentScale(20),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    gcsehigherNumber: "Number",
    gcsehigherAlgebra: "Algebra",
    gcsehigherRatio: "Ratio, proportion and rates of change",
    gcsehigherGeometry: "Geometry and measures",
    gcsehigherStats: "Probability and statistics",
  },
  // One drill per DfE content area, no calculator, 20 questions each from a
  // pool of 24. Four open with Basics from the shared library (11 steps in
  // all); probability and statistics goes straight to the questions.
  drillSize: 20,
  drills: [
    { key: "number", name: "Number", section: "p1", domains: ["gcsehigherNumber"], blurb: "Fractional and negative indices, surds, standard form, recurring decimals, bounds and error intervals, HCF and LCM, and counting.", basics: ["exponentRules", "scientificNotation", "squareRoots", "fractionOps"] },
    { key: "algebra", name: "Algebra", section: "p1", domains: ["gcsehigherAlgebra"], blurb: "Expanding, factorising, quadratics, simultaneous equations, inequalities, functions, sequences, gradients and changing the subject. 30% of Higher.", basics: ["distributing", "factoring", "solveX", "systems", "inequalities", "functionNotation", "slope"] },
    { key: "ratio", name: "Ratio and proportion", section: "p1", domains: ["gcsehigherRatio"], blurb: "Ratio, percentage change and reverse percentages, compound interest and depreciation, direct and inverse proportion, speed and density.", basics: ["ratios", "percentChange", "exponentialGrowth", "rateProblems"] },
    { key: "geometry", name: "Geometry and measures", section: "p1", domains: ["gcsehigherGeometry"], blurb: "Pythagoras, trigonometry and exact values, circle theorems, vectors, similarity, angles, area and volume.", basics: ["pythagorean", "sohcahtoa", "circleBasics", "triangleAngles"] },
    { key: "stats", name: "Probability and statistics", section: "p1", domains: ["gcsehigherStats"], blurb: "Tree diagrams without replacement, Venn diagrams, conditional probability, histograms, quartiles, sampling and correlation." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [40, 50, 60, 70, 80, 90],
  goalNotes: {
    40: "A first target while topics are new",
    50: "Working towards a strong pass",
    60: "Solid across every topic area",
    70: "Aiming for the top grades",
    80: "Consistently strong on every topic",
    90: "Ready for the hardest questions",
  },
  testLength: "2 hr 15 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each topic.",
      "Master each drill first.",
      "Halfway there. Try a full practice test.",
      "Hit your goal on a full test.",
      "Goal hit. You're ready for the papers.",
    ],
    sourceLine: "Follows the DfE GCSE mathematics subject content (2013) and the Higher tier weightings every exam board uses. Original questions; not affiliated with AQA, Pearson Edexcel, OCR or the Department for Education.",
    scoreNote: "Scores here are percent correct across three shorter papers. The real GCSE gives part marks for working and sets grade boundaries each year, so a percentage here is a guide, not a grade.",
  },
};
