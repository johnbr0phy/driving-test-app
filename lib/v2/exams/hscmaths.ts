import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// HSC Mathematics Standard 2 (NSW Education Standards Authority). The 2027
// HSC is the first examination of the Mathematics Standard 11-12 Syllabus
// (2024), which replaces the 2017 Stage 6 syllabus (Year 11 from 2026, Year
// 12 from Term 4 2026). The real paper is 100 marks in 2 hours 30 minutes
// plus 10 minutes reading time, with NESA-approved calculators and a
// reference sheet: Section I is objective-response questions worth 15 marks,
// Section II is 35 to 40 items worth 85 marks (questions may have parts, at
// least two worth 4 or 5 marks). It examines the Year 12 Standard 2 focus
// areas (algebraic relationships, investment and loans, annuities,
// trigonometry, ratios and rates, network flow, critical path analysis,
// bivariate data analysis, relative frequency and probability, the normal
// distribution), with the Year 11 course as assumed knowledge.
// Here Section I is 15 one-mark multiple-choice items and Section II is 25
// short-answer items (typed numbers, plus some multiple choice), one mark each
// and marked all or nothing, so scores are percent correct, not bands. The
// ten focus areas are grouped into six drills. Drill-only items (test 0) live
// in Section II because a drill draws from one section. Test 2 is held out of
// the drills. Bank built by tools/hscmaths/build.py.
const minutes = (n: number) => n * 60;
const DOMAINS = ["hscmathsAlgebra", "hscmathsFinance", "hscmathsMeasure", "hscmathsNetworks", "hscmathsBivariate", "hscmathsProbability"];

// A summary of the formulas a Standard 2 candidate is given, in Tigertest's
// own layout (not a copy of the NESA sheet).
const REFERENCE = `**Reference sheet** (Tigertest's own summary of the formulas you are given, not the official NESA sheet)

**Financial mathematics**

Compound interest: $FV = PV(1 + r)^n$

Straight-line depreciation: $S = V_0 - Dn$

Declining-balance depreciation: $S = V_0(1 - r)^n$

**Measurement**

Limits of accuracy: measurement ± ½ × precision

Arc length $l = \\frac{\\theta}{360} \\times 2\\pi r$; sector area $A = \\frac{\\theta}{360} \\times \\pi r^2$

Trapezoidal rule: $A \\approx \\frac{h}{2}(d_f + d_l)$

Sine rule: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$

Cosine rule: $c^2 = a^2 + b^2 - 2ab\\cos C$, or $\\cos C = \\frac{a^2 + b^2 - c^2}{2ab}$

Area of a triangle: $A = \\frac{1}{2}ab\\sin C$

Volume of a cone $V = \\frac{1}{3}\\pi r^2 h$; sphere $V = \\frac{4}{3}\\pi r^3$

**Statistics and probability**

z-score: $z = \\frac{x - \\mu}{\\sigma}$

Normal distribution: about 68% of scores lie within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3

Expected frequency = number of trials × probability

Outliers: below $Q_1 - 1.5 \\times IQR$ or above $Q_3 + 1.5 \\times IQR$`;

export const HSCMATHS: ExamV2Config = {
  id: "hscmaths",
  slug: "/hsc-maths-standard",
  landingPath: "/hsc-maths-standard-2-practice-test",
  name: "HSC Maths Standard 2 Practice Test",
  shortName: "HSC Maths Std 2",
  fullName: "HSC Mathematics Standard 2",
  tagline: "HSC Maths Standard 2 practice papers with a reference sheet, drills for every Year 12 topic and the basics first.",
  icon: "calculator",
  theme: { brand: "168 38% 30%", brandDark: "168 38% 19%", brandLight: "168 48% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "s1",
      name: "Section I (multiple choice)",
      shortName: "Section I",
      calculator: true,
      modules: [{ module: 1, questionCount: 15, timeLimit: minutes(25) }],
      reference: REFERENCE,
      directions:
        "15 multiple-choice questions, one mark each, like the objective-response Section I of the real paper. A calculator and the reference sheet are available on every question.",
      scale: percentScale(15),
      domains: DOMAINS,
    },
    {
      key: "s2",
      name: "Section II (short answer)",
      shortName: "Section II",
      calculator: true,
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(60) }],
      reference: REFERENCE,
      directions:
        "25 questions across every Year 12 topic, most of them typed answers like the parts of a real Section II question. Round only at the end, to the accuracy the question asks for. Type the number only: no units, and you can leave out the dollar sign. A calculator and the reference sheet are available.",
      scale: percentScale(25),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    hscmathsAlgebra: "Algebraic relationships",
    hscmathsFinance: "Investment, loans and annuities",
    hscmathsMeasure: "Trigonometry, ratios and rates",
    hscmathsNetworks: "Networks and critical paths",
    hscmathsBivariate: "Bivariate data analysis",
    hscmathsProbability: "Probability and the normal distribution",
  },
  // Six drills grouping the ten Year 12 focus areas, 20 questions each from a
  // pool of 23 to 25. Algebra, finance and measurement open with shared
  // Basics: 6 drills + 3 Basics steps + 2 tests = 11 dashboard steps.
  drillSize: 20,
  drills: [
    { key: "algebra", name: "Algebraic relationships", section: "s2", domains: ["hscmathsAlgebra"], blurb: "Linear models and break-even points, simultaneous equations, exponential growth and decay, quadratic and reciprocal models.", basics: ["substitution", "solveX", "slope", "systems", "exponentialGrowth"] },
    { key: "finance", name: "Investment, loans and annuities", section: "s2", domains: ["hscmathsFinance"], blurb: "Compound interest, declining-balance depreciation, shares and dividends, reducing-balance loans, credit cards, and annuity tables and recurrence relations.", basics: ["percents", "percentChange", "exponentialGrowth"] },
    { key: "measure", name: "Trigonometry, ratios and rates", section: "s2", domains: ["hscmathsMeasure"], blurb: "Sine and cosine rules, area of a triangle, bearings and radial surveys, scale, energy and fuel rates, and the trapezoidal rule.", basics: ["sohcahtoa", "ratios", "rateProblems", "unitConversion"] },
    { key: "networks", name: "Networks and critical paths", section: "s2", domains: ["hscmathsNetworks"], blurb: "Network flow and the maximum-flow minimum-cut theorem, critical path analysis with earliest and latest start times and float, spanning trees and shortest paths." },
    { key: "bivariate", name: "Bivariate data analysis", section: "s2", domains: ["hscmathsBivariate"], blurb: "Scatterplots, Pearson's correlation coefficient, the least-squares regression line, predictions, interpolation and extrapolation." },
    { key: "probability", name: "Probability and the normal distribution", section: "s2", domains: ["hscmathsProbability"], blurb: "Relative frequency, expected frequency, two-way tables, z-scores and the 68-95-99.7 rule." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while topics are new",
    60: "Solid across every topic",
    70: "Strong across every topic",
    80: "Consistently strong, aiming high",
    90: "Ready for the hardest questions",
  },
  testLength: "1 hr 25 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each topic.",
      "Master each drill first.",
      "Halfway there. Try a full practice paper.",
      "Hit your goal on a full paper.",
      "Goal hit. You're ready for the HSC.",
    ],
    sourceLine: "Follows the NESA Mathematics Standard 11-12 Syllabus (2024), first examined in the 2027 HSC, and its HSC examination specifications. Original questions; not affiliated with NESA.",
    scoreNote: "Scores here are percent correct, one mark per question. The real HSC paper gives part marks for working and reports Bands 1 to 6 after moderation, so a percentage here is a guide, not a band.",
  },
};
