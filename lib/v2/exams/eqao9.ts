import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// EQAO Grade 9 Assessment of Mathematics (Ontario), written at the end of the
// de-streamed MTH1W course on EQAO's online platform. Framework (EQAO, 2025):
// two sessions, A and B, each about 60 minutes in one sitting; 54 questions,
// 50 operational plus 4 field test; a multi-stage computer adaptive design in
// which each session's stage 1 is a medium module and stage 2 is a low/medium
// or medium/high module chosen from stage 1. Question types are single and
// multiple selection, drag and drop, drop-down menu and key entry; a built-in
// calculator and the EQAO formula sheet are available throughout. Blueprint:
// Number 10, Algebra 18 (coding included), Data 8, Geometry and Measurement 8,
// Financial Literacy 6. From 2026-2027 the result is 20% of the MTH1W final
// mark. Here each session is 25 scored items, 13 in stage 1 and 12 in an
// adaptive stage 2 (threshold 60%), the real operational count; field-test
// items are left out. Scores are percent correct, not EQAO levels (levels
// come from IRT scaling of item difficulty). Test 2 is held out of the
// drills. Drill-only items sit in session A because a drill draws from one
// section. Bank built by tools/eqao9/build.py.
const minutes = (n: number) => n * 60;
const DOMAINS = ["eqao9Number", "eqao9Algebra", "eqao9Data", "eqao9Geometry", "eqao9Financial"];

const FORMULAS = `**Formula sheet**

| Shape | Perimeter | Area |
|---|---|---|
| Circle | C = πd or C = 2πr | A = πr² |
| Parallelogram | P = 2(b + c) | A = bh |
| Rectangle | P = 2(l + w) | A = lw |
| Trapezoid | P = a + b + c + d | A = (a + b)h ÷ 2 |
| Triangle | P = a + b + c | A = bh ÷ 2 |

Right triangle: a² + b² = c²

| Object | Surface area | Volume |
|---|---|---|
| Cone | A = πr² + πrs | V = πr²h ÷ 3 |
| Cube | A = 6b² | V = b³ |
| Cylinder | A = 2πr² + 2πrh | V = πr²h |
| Rectangle-based prism | A = 2(wh + lw + lh) | V = lwh |
| Square-based pyramid | A = b² + 2bs | V = b²h ÷ 3 |
| Triangle-based prism | A = bl + ah + bh + ch | V = blh ÷ 2 |

s is the slant height. Volume of a prism or cylinder = (area of base)(height); a pyramid or cone is one third of that.`;

const DIRECTIONS =
  "About an hour of questions from all five strands: number, algebra (including reading and changing code), data, geometry and measurement, and financial literacy. The first 13 questions are at a medium level; how you do on them picks an easier or a harder set for the last 12, as on the real assessment. A calculator and the EQAO-style formula sheet are available on every question. For typed answers, enter a number only (a decimal, a fraction such as 3/4, or a negative such as -7), with no units.";

export const EQAO9: ExamV2Config = {
  id: "eqao9",
  slug: "/eqao-grade-9-math",
  landingPath: "/eqao-grade-9-math-practice-test",
  name: "EQAO Grade 9 Math Practice Test",
  shortName: "EQAO Grade 9 Math",
  fullName: "EQAO Grade 9 Assessment of Mathematics",
  tagline: "Two-session, adaptive EQAO Grade 9 Math practice tests, with a drill and the basics for every strand.",
  icon: "calculator",
  theme: { brand: "255 70% 32%", brandDark: "255 70% 23%", brandLight: "255 70% 95%" },
  breakSeconds: 600,
  breakNote: "The real assessment is two sessions, which your school may run on different days.",
  sections: [
    {
      key: "a",
      name: "Session A",
      shortName: "Session A",
      calculator: true,
      reference: FORMULAS,
      modules: [
        { module: 1, questionCount: 13, timeLimit: minutes(31) },
        { module: 2, questionCount: 12, timeLimit: minutes(29), adaptive: { threshold: 0.6 } },
      ],
      directions: DIRECTIONS,
      scale: percentScale(25),
      domains: DOMAINS,
    },
    {
      key: "b",
      name: "Session B",
      shortName: "Session B",
      calculator: true,
      reference: FORMULAS,
      modules: [
        { module: 1, questionCount: 13, timeLimit: minutes(31) },
        { module: 2, questionCount: 12, timeLimit: minutes(29), adaptive: { threshold: 0.6 } },
      ],
      directions: DIRECTIONS,
      scale: percentScale(25),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    eqao9Number: "Number",
    eqao9Algebra: "Algebra",
    eqao9Data: "Data",
    eqao9Geometry: "Geometry and Measurement",
    eqao9Financial: "Financial Literacy",
  },
  // One drill per strand, 16 to 22 items each (the whole pool), every one
  // opening with shared Basics: 5 Basics steps + 5 drills + 2 tests = 12.
  drills: [
    { key: "number", name: "Number", section: "a", domains: ["eqao9Number"], blurb: "Number sets, powers and exponent laws, scientific notation, fractions and integers, rates, percents and proportions. 20% of the assessment.", basics: ["exponentRules", "scientificNotation", "fractionOps", "negativeNumbers", "ratios"] },
    { key: "algebra", name: "Algebra", section: "a", domains: ["eqao9Algebra"], blurb: "Expressions and equations, reading and changing code, linear and non-linear relations, slope, intersections and inequalities. 36% of the assessment.", basics: ["distributing", "solveX", "substitution", "slope", "inequalities"] },
    { key: "data", name: "Data", section: "a", domains: ["eqao9Data"], blurb: "Quartiles and box plots, scatter plots and correlation, lines of best fit, choosing a model and the modelling process.", basics: ["meanMedian", "readingTable", "trends"] },
    { key: "geometry", name: "Geometry and Measurement", section: "a", domains: ["eqao9Geometry"], blurb: "Pythagorean relationship, circle and triangle properties, unit conversions, surface area and volume, and changing dimensions.", basics: ["pythagorean", "circleBasics", "triangleAngles"] },
    { key: "financial", name: "Financial Literacy", section: "a", domains: ["eqao9Financial"], blurb: "Simple and compound interest, appreciation and depreciation, the cost of borrowing, down payments and budgets.", basics: ["percents", "percentChange", "exponentialGrowth"] },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 75, 80, 90],
  goalNotes: {
    50: "A first target while the course is still going",
    60: "Getting comfortable with every strand",
    70: "Solid across all five strands",
    75: "A safe margin for a strong course mark",
    80: "Consistently strong, harder questions included",
    90: "Ready for the medium/high modules",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each strand.",
      "Master each drill first.",
      "Halfway there. Try a full practice test.",
      "Hit your goal on a full test.",
      "Goal hit. You're ready for the EQAO.",
    ],
    sourceLine: "Follows EQAO's Grade 9 Assessment of Mathematics framework and blueprint and the Ontario MTH1W curriculum (2021). Original questions; not affiliated with EQAO or the Ontario Ministry of Education.",
    scoreNote: "Scores here are percent correct. The real assessment reports a level from 1 to 4 (Level 3 is the provincial standard), worked out from which questions you got right and how hard they were, so a percentage here is a guide, not a level.",
  },
};
