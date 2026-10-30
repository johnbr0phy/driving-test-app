import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// GCSE Mathematics, Foundation tier, England. Every board (AQA, Pearson
// Edexcel, OCR) teaches the DfE subject content (November 2013, first taught
// 2015) with the same shape: three papers of 1 hour 30 minutes and 80 marks
// each, Paper 1 non-calculator, Papers 2 and 3 calculator, Foundation grades
// 1 to 5. Ofqual's Foundation weightings: number 22-28%, algebra 17-23%,
// ratio, proportion and rates of change 22-28%, geometry and measures
// 12-18%, probability and statistics 12-18%. Each practice test here is the
// three papers cut to 20 auto-marked items each, weighted 5 number, 4
// algebra, 5 ratio, 3 geometry, 3 statistics per paper (25/20/25/15/15).
// Multi-mark questions become one final answer, so a score is percent
// correct, not marks. Test 2 is held out of the drills. Bank built by
// tools/gcsemaths/build.py from tools/gcsemaths/q_*.py.
const minutes = (n: number) => n * 60;

const paperDomains = ["gcseNumber", "gcseAlgebra", "gcseRatio", "gcseGeometry", "gcseStats"];

export const GCSEMATHS: ExamV2Config = {
  id: "gcsemaths",
  slug: "/gcse-maths",
  landingPath: "/gcse-maths-foundation-practice-test",
  name: "GCSE Maths Foundation Practice Test",
  shortName: "GCSE Maths",
  fullName: "GCSE Mathematics, Foundation tier",
  tagline: "GCSE Maths Foundation practice papers, non-calculator and calculator, with the basics taught first.",
  icon: "calculator",
  theme: { brand: "82 65% 28%", brandDark: "82 65% 20%", brandLight: "82 70% 95%" },
  breakSeconds: 300,
  breakNote: "The real papers are sat on different days.",
  sections: [
    {
      key: "p1",
      name: "Paper 1 (non-calculator)",
      shortName: "Paper 1",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(35) }],
      directions:
        "20 questions across number, algebra, ratio, geometry and statistics, getting harder as you go, like the real Paper 1. No calculator. Type your final answer: a whole number, a decimal or a fraction such as 3/4, with no units or £ sign. Have paper and a pencil ready for working.",
      scale: percentScale(20),
      domains: paperDomains,
    },
    {
      key: "p2",
      name: "Paper 2 (calculator)",
      shortName: "Paper 2",
      calculator: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(35) }],
      directions:
        "20 questions, easiest first, like the real Paper 2. A calculator is allowed: use your own or the one in the tools drawer. Round only at the end, to the accuracy the question asks for, and type numbers without units or £ signs.",
      scale: percentScale(20),
      domains: paperDomains,
    },
    {
      key: "p3",
      name: "Paper 3 (calculator)",
      shortName: "Paper 3",
      calculator: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(35) }],
      directions:
        "20 questions, easiest first, like the real Paper 3. A calculator is allowed. On the real day each paper is sat separately; here a short break follows each paper.",
      scale: percentScale(20),
      domains: paperDomains,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    gcseNumber: "Number",
    gcseAlgebra: "Algebra",
    gcseRatio: "Ratio, proportion and rates of change",
    gcseGeometry: "Geometry and measures",
    gcseStats: "Probability and statistics",
  },
  // Five drills, one per content area, each opening with Basics: 5 x 2 steps
  // plus the two practice tests is a 12-step dashboard. Number and algebra
  // drill the non-calculator paper; the others draw on the calculator papers
  // but keep their drill-only numbers friendly, since drills have no
  // calculator.
  drillSize: 20,
  drills: [
    { key: "number", name: "Number", section: "p1", domains: ["gcseNumber"], blurb: "Negative numbers, BIDMAS, fractions and decimals without a calculator, HCF and LCM, prime factors, powers and roots, standard form, rounding and estimating. About 25% of the marks.", basics: ["negativeNumbers", "orderOfOperations", "decimals", "fractionOps", "gcfLcm", "rounding", "squareRoots"] },
    { key: "algebra", name: "Algebra", section: "p1", domains: ["gcseAlgebra"], blurb: "Substitution, simplifying, expanding and factorising, linear equations and inequalities, simultaneous equations, indices, gradient and sequences. About 20% of the marks.", basics: ["substitution", "distributing", "solveX", "inequalities", "factoring", "exponentRules", "slope", "systems"] },
    { key: "ratio", name: "Ratio, Proportion and Rates", section: "p2", domains: ["gcseRatio"], blurb: "Sharing in a ratio, percentages and percentage change, reverse percentages, interest, best buys, direct and inverse proportion, speed and unit conversions. About 25% of the marks.", basics: ["fractionConvert", "percents", "percentChange", "ratios", "unitConversion", "rateProblems"] },
    { key: "geometry", name: "Geometry and Measures", section: "p3", domains: ["gcseGeometry"], blurb: "Angles and polygons, area and perimeter, circles, volume and surface area, Pythagoras, SOH CAH TOA, bearings and transformations. About 15% of the marks.", basics: ["triangleAngles", "areaPerimeter", "circleBasics", "volume", "pythagorean", "sohcahtoa"] },
    { key: "stats", name: "Probability and Statistics", section: "p3", domains: ["gcseStats"], blurb: "Mean, median, mode and range, frequency tables, pie charts, scatter graphs, probability, two-way tables and Venn diagrams. About 15% of the marks.", basics: ["meanMedian", "readingTable", "probabilityTable"] },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  // Recent Foundation boundaries (out of 240): grade 4 about 142 to 160
  // (59-67%), grade 5 about 175 to 188 (73-78%), varying by board and year.
  defaultGoal: 65,
  goalChoices: [50, 60, 65, 75, 80],
  goalNotes: {
    50: "50% practice score target, a first step up",
    60: "60% practice score target, near a grade 4 on some recent papers",
    65: "65% practice score target, around a grade 4 on recent papers",
    75: "75% practice score target, around a grade 5, the top Foundation grade",
    80: "80% practice score target, a safe margin over a grade 5",
  },
  testLength: "1 hr 45 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each topic.",
      "Master each drill first.",
      "Halfway there. Try a full practice test.",
      "Hit your goal on the full test.",
      "Goal hit. You're ready for the real papers.",
    ],
    sourceLine: "Based on the DfE GCSE mathematics subject content (2013) and Ofqual's Foundation tier weightings, used by AQA, Pearson Edexcel and OCR. Original questions; not affiliated with any exam board.",
    scoreNote: "Scores here are percent correct. The real papers award marks for working and grade boundaries change by board and year, so treat about 65% as a rough grade 4 and 75% as a rough grade 5. Multi-mark questions here are one final answer.",
  },
};
