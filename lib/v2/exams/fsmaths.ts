import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Functional Skills Maths Level 2 (England), on the DfE subject content
// (February 2018, first teaching September 2019) and Ofqual's conditions:
// one assessment with a calculator-free part worth 25% of the marks, 25% of
// marks on underpinning skills and 75% on problem solving in real-life
// contexts, across three content areas (using numbers and the number system;
// using common measures, shape and space; handling information and data).
// Each awarding body sets its own paper, length and pass mark; Pearson's
// Level 2, for example, is Section A non-calculator (25 minutes) then
// Section B calculator (1 hour 30 minutes), 64 marks in all. Here a practice
// test is 40 one-mark questions in the same 1 : 3 split, timed in proportion.
// Content splits into four drills: number, then fractions, percentages, ratio
// and money, then measures and shape, then data and probability. Test 2 is
// held out of the drills so it measures readiness rather than memory.
// Drill-only items are all calculator items (section b), since a drill draws
// from one section. Bank built by tools/fsmaths/build.py.
const minutes = (n: number) => n * 60;

const FORMULAS = `**Formulas you may need**

Area of a rectangle = length × width

Area of a triangle = ½ × base × height

Circle: area = π × r², circumference = π × diameter (r is the radius, half the diameter)

Volume of a cuboid = length × width × height

Volume of a prism or cylinder = area of the end × length; cylinder: π × r² × h

Speed = distance ÷ time. Density = mass ÷ volume

Angles: on a straight line 180°, in a triangle 180°, in a quadrilateral 360°

1 m = 100 cm, 1 km = 1,000 m, 1 litre = 1,000 cm³, 1 m³ = 1,000 litres`;

export const FSMATHS: ExamV2Config = {
  id: "fsmaths",
  slug: "/functional-skills-maths",
  landingPath: "/functional-skills-maths-level-2-practice-test",
  name: "Functional Skills Maths Level 2 Practice Test",
  shortName: "FS Maths L2",
  fullName: "Functional Skills Maths Level 2",
  tagline: "Real-life maths for Functional Skills Level 2: a short lesson first, then drills and two full practice papers.",
  icon: "calculator",
  theme: { brand: "15 45% 34%", brandDark: "15 45% 24%", brandLight: "15 65% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "a",
      name: "Section A: Non-calculator",
      shortName: "Non-calculator",
      modules: [{ module: 1, questionCount: 10, timeLimit: minutes(20) }],
      reference: FORMULAS,
      directions:
        "No calculator for this section, as on the real exam. Number work, percentages, ratio, measures and data with numbers you can work out on paper. Write your working on scrap paper. For typed answers, type the number only (no £, % or units), as a whole number or a decimal, not a mixed number.",
      scale: percentScale(10),
      domains: ["fsmNumber", "fsmPercent", "fsmMeasure", "fsmData"],
    },
    {
      key: "b",
      name: "Section B: Calculator",
      shortName: "Calculator",
      calculator: true,
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(70) }],
      reference: FORMULAS,
      directions:
        "A calculator is allowed. Problems from work and everyday life: money, percentages and interest, ratio and best buys, area and volume, scale, speed and rates of pay, averages, probability and scatter graphs. Read each question twice and check your answer makes sense. For typed answers, type the number only (no £, % or units), as a whole number or a decimal, not a mixed number.",
      scale: percentScale(30),
      domains: ["fsmNumber", "fsmPercent", "fsmMeasure", "fsmData"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Paper 1" },
    { number: 2, name: "Practice Paper 2", heldOut: true },
  ],
  domainLabels: {
    fsmNumber: "Number and calculation",
    fsmPercent: "Fractions, percentages and ratio",
    fsmMeasure: "Measures, shape and space",
    fsmData: "Handling data and probability",
  },
  // Four drills of 20 questions, each opening with four click-through
  // lessons (data/v2/basics/fsmaths.json): 4 Basics steps + 4 drills + 2
  // papers = 10 dashboard steps.
  drillSize: 20,
  drills: [
    { key: "number", name: "Number and calculation", section: "b", domains: ["fsmNumber"], blurb: "Negative numbers, BIDMAS, formulas in words, decimals, rounding and estimating, and large numbers.", basics: ["fsmOrderOps", "fsmNegatives", "fsmFormula", "fsmEstimate"] },
    { key: "percent", name: "Fractions, percentages and ratio", section: "b", domains: ["fsmPercent"], blurb: "Fractions, decimals and percentages, VAT, interest, discounts, budgets, ratio, best buys and proportion.", basics: ["fsmFdp", "fsmPercentOf", "fsmPercentChange", "fsmRatio"] },
    { key: "measure", name: "Measures, shape and space", section: "b", domains: ["fsmMeasure"], blurb: "Area, perimeter and volume, scale drawings and maps, speed, density and pay rates, conversions, angles, coordinates and 3-D views.", basics: ["fsmArea", "fsmVolume", "fsmScale", "fsmSpeed"] },
    { key: "data", name: "Handling data and probability", section: "b", domains: ["fsmData"], blurb: "Mean, median, mode and range, frequency tables, comparing data, probability with two-way tables, and scatter graphs.", basics: ["fsmAverages", "fsmGroupedMean", "fsmProbability", "fsmScatter"] },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80, 90],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target, a safe margin",
    75: "75% practice score target",
    80: "80% practice score target",
    90: "90% practice score target",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Start with a short lesson, then drill each topic.",
      "Master each drill first.",
      "Halfway there. Try a practice paper.",
      "Hit your goal on a full paper.",
      "Goal hit. You're ready to book your exam.",
    ],
    sourceLine: "Based on the Department for Education's Functional Skills mathematics subject content (Level 2) and Ofqual's assessment rules. Original questions; not affiliated with the DfE, Ofqual or any awarding body.",
    scoreNote: "Scores here are percent correct. Each awarding body sets its own pass mark for each paper, so aim for a comfortable margin rather than a fixed number.",
  },
};
