import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// STAAR Algebra I end-of-course assessment (Texas Education Agency). Blueprint
// effective as of 2022-23 (TEA, Fall 2022): 50 questions, 59 points (41 one-point
// questions, multiple choice and non-multiple choice, and 9 two-point
// non-multiple-choice questions) in five reporting categories: 1 Number and
// Algebraic Methods 9-11 questions, 2 Describing and Graphing Linear Functions,
// Equations and Inequalities 10-12, 3 Writing and Solving Linear Functions,
// Equations and Inequalities 12-14, 4 Quadratic Functions and Equations 9-11,
// 5 Exponential Functions and Equations 5-7. Assessed TEKS from TEA's "STAAR
// Algebra I Assessment, Eligible TEKS". The redesign caps multiple choice at 75%;
// other types are equation editor, text entry, graphing, number line, inline
// choice, hot spot, drag and drop, match table grid and multiselect. A graphing
// calculator must be available throughout, and the STAAR Algebra I reference
// materials are provided. Students are expected to finish in three to four hours
// (same school day, up to seven hours). HB 8 (2025) replaces STAAR with the
// Student Success Tool from 2027-28.
// Here each practice test is the 50 questions, one point each, untimed: RC1 10
// (polynomials 5, exponents and functions 5), RC2 11, RC3 13 (writing 6,
// solving 7), RC4 10, RC5 6, no more than 75% single choice. Graphs are given in
// words or tables. Test 2 is held out of the drills. Percent correct, not a
// scale score. Bank built by tools/next100/staaralg1/build.py.
const DOMAINS = ["staaralg1Poly", "staaralg1Expr", "staaralg1Graph", "staaralg1Write", "staaralg1Solve", "staaralg1Quad", "staaralg1Exp"];

const REFERENCE = `**Algebra I reference sheet**

| Factoring | |
|---|---|
| Perfect square trinomials | a² + 2ab + b² = (a + b)² and a² − 2ab + b² = (a − b)² |
| Difference of squares | a² − b² = (a + b)(a − b) |

| Properties of exponents | |
|---|---|
| Product of powers | aᵐ · aⁿ = aᵐ⁺ⁿ |
| Quotient of powers | aᵐ ÷ aⁿ = aᵐ⁻ⁿ |
| Power of a power | (aᵐ)ⁿ = aᵐⁿ |
| Rational exponent | a to the m/n power is the nth root of aᵐ |
| Negative exponent | a⁻ⁿ = 1/aⁿ |

| Linear equations | |
|---|---|
| Standard form | Ax + By = C |
| Slope-intercept form | y = mx + b |
| Point-slope form | y − y₁ = m(x − x₁) |
| Slope of a line | m = (y₂ − y₁)/(x₂ − x₁) |

| Quadratic equations | |
|---|---|
| Standard form | f(x) = ax² + bx + c |
| Vertex form | f(x) = a(x − h)² + k |
| Quadratic formula | x = (−b ± √(b² − 4ac))/(2a) |
| Axis of symmetry | x = −b/(2a) |

The real test's reference materials hold the same formulas.`;

export const STAARALG1: ExamV2Config = {
  id: "staaralg1",
  slug: "/staar-algebra-1",
  landingPath: "/staar-algebra-1-practice-test",
  name: "STAAR Algebra I Practice Test",
  shortName: "STAAR Algebra I",
  fullName: "STAAR Algebra I End-of-Course (Texas)",
  tagline: "Full-length STAAR Algebra I EOC practice tests on TEA's blueprint, with a drill for every topic.",
  icon: "calculator",
  theme: { brand: "70 25% 30%", brandDark: "70 25% 21%", brandLight: "70 30% 94%" },
  breakSeconds: 0,
  sections: [
    {
      key: "alg",
      name: "Algebra I",
      shortName: "Algebra I",
      calculator: true,
      reference: REFERENCE,
      modules: [{ module: 1, questionCount: 50, timeLimit: 0 }],
      directions:
        "50 questions from all five STAAR reporting categories: number and algebraic methods, graphing linear functions, writing and solving linear equations, quadratics and exponentials. There is no clock. A calculator and the reference sheet are on every question. For typed answers, enter a number only (a decimal such as 2.5, a fraction such as 3/4 or a negative such as -7), with no units or commas.",
      scale: percentScale(50),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    staaralg1Poly: "Polynomials and Factoring",
    staaralg1Expr: "Exponents, Radicals and Functions",
    staaralg1Graph: "Graphing Linear Functions",
    staaralg1Write: "Writing Linear Equations",
    staaralg1Solve: "Solving Equations and Systems",
    staaralg1Quad: "Quadratic Functions and Equations",
    staaralg1Exp: "Exponential Functions",
  },
  // One drill per topic, 20 exam-level items each (Test 1 plus drill-only).
  // No Basics skill opens two drills: 3 Basics steps + 7 drills + 2 tests = 12.
  drillSize: 20,
  drills: [
    { key: "polynomials", name: "Polynomials and Factoring", section: "alg", domains: ["staaralg1Poly"], blurb: "Adding, subtracting, multiplying and dividing polynomials, the distributive property, factoring trinomials and the difference of two squares.", basics: ["distributing", "factoring", "gcfLcm", "negativeNumbers"] },
    { key: "functions", name: "Exponents, Radicals and Functions", section: "alg", domains: ["staaralg1Expr"], blurb: "Laws of exponents, square roots, function notation, sequences and literal equations.", basics: ["exponentRules", "squareRoots", "functionNotation", "substitution"] },
    { key: "graphing", name: "Graphing Linear Functions", section: "alg", domains: ["staaralg1Graph"], blurb: "Slope, rate of change, intercepts, graphs of inequalities and systems, transformations of f(x) = x, correlation and lines of fit." },
    { key: "writing", name: "Writing Linear Equations", section: "alg", domains: ["staaralg1Write"], blurb: "Domain and range, equations in every form, direct variation, parallel and perpendicular lines, inequalities and systems from tables, graphs and words." },
    { key: "solving", name: "Solving Equations and Systems", section: "alg", domains: ["staaralg1Solve"], blurb: "Linear equations and inequalities with the distributive property and variables on both sides, and systems of two equations.", basics: ["solveX", "inequalities", "systems", "fractionOps"] },
    { key: "quadratics", name: "Quadratic Functions", section: "alg", domains: ["staaralg1Quad"], blurb: "Vertex and standard form, domain and range, key features, transformations of f(x) = x², and solving by factoring, square roots, completing the square and the quadratic formula." },
    { key: "exponentials", name: "Exponential Functions", section: "alg", domains: ["staaralg1Exp"], blurb: "Growth and decay, the meaning of a and b in f(x) = abˣ, y-intercepts and asymptotes, domain and range and exponential models." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [40, 50, 55, 60, 70, 80, 90],
  goalNotes: {
    40: "Past the Approaches (passing) line, as an estimate",
    50: "Comfortably past the passing line",
    55: "Around the Meets Grade Level line, as an estimate",
    60: "Solid across all five reporting categories",
    70: "Around the Masters Grade Level line, as an estimate",
    80: "Strong on the harder questions too",
    90: "Ready for a top score",
  },
  testLength: "Untimed (the real test usually takes 3 to 4 hours)",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each topic.",
      "Master each drill first.",
      "Take a full practice test to see your score.",
      "Hit your goal on a full practice test.",
      "Goal hit. You're ready for the STAAR Algebra I EOC.",
    ],
    sourceLine: "Follows TEA's STAAR Algebra I blueprint (effective 2022-23) and assessed TEKS, checked November 2026. Original questions; not affiliated with the Texas Education Agency.",
    scoreNote:
      "Scores here are percent correct, one point a question. The real test has 50 questions worth 59 points (nine are worth 2) and reports a scale score and a performance level. On the Spring 2026 test, Approaches Grade Level (passing) began at 19 of 59 points, Meets at 31 and Masters at 41, about 32%, 53% and 69%; the cuts move a little with each test, so treat any match as an estimate. The real test requires a graphing calculator; questions here need only the scientific calculator on screen, and graphs are described in words or tables.",
  },
};
