import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// IBPS RRB Office Assistant (Multipurpose) Preliminary Examination, the
// "IBPS RRB Clerk" exam (Institute of Banking Personnel Selection, Common
// Recruitment Process for Regional Rural Banks). Pattern per the official
// CRP RRBs-XV notification (1 September 2026; Preliminary in November or
// December 2026): one online objective paper of 80 questions in 45 minutes,
// Reasoning 40 questions in 25 minutes and Numerical Ability 40 in
// 20 minutes, 1 mark each, a quarter of a mark deducted per wrong answer,
// and a cutoff in both tests set by IBPS. Prelims is qualifying for the
// Mains, whose marks alone make the merit list. There is no English section;
// both tests are offered in English, Hindi and the state's own language.
// Each section here is its own timed module in the notification's order, so
// there is no going back to a closed section. Every item is five-option
// single answer. Puzzles are text stimuli shared by five questions; data
// interpretation uses pipe tables. Drills: four in Reasoning (per test
// 8/15/8/9) and three in Numerical Ability (16/10/14), so the dashboard is
// 9 steps. The score is out of 80 shown as a percent with no negative
// marking; the quarter-mark penalty is explained in scoreNote and on the
// landing, not applied. Sources: tools/next100/ibpsrrb/sources.md.
const minutes = (n: number) => n * 60;

export const IBPSRRB: ExamV2Config = {
  id: "ibpsrrb",
  slug: "/ibps-rrb-clerk",
  landingPath: "/ibps-rrb-office-assistant-practice-test",
  name: "IBPS RRB Office Assistant Prelims Mock Test",
  shortName: "IBPS RRB Clerk",
  fullName: "IBPS RRB Office Assistant (Multipurpose) Preliminary Examination",
  tagline: "80 questions in 45 minutes with sectional timing: Reasoning 40 in 25 minutes and Numerical Ability 40 in 20 minutes.",
  icon: "building",
  theme: { brand: "105 75% 30%", brandDark: "105 75% 22%", brandLight: "105 60% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "reason",
      name: "Reasoning",
      shortName: "Reasoning",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(25) }],
      directions:
        "40 questions in 25 minutes: inequalities and syllogisms, three puzzles with five questions each, then coding-decoding, letter series, blood relations, directions and ranking. You can move between questions and flag them inside this section, but once the section closes you cannot come back to it. The real exam takes a quarter mark off for each wrong answer; this mock test does not.",
      scale: percentScale(40),
      domains: ["ibpsrrbLogic", "ibpsrrbPuzzle", "ibpsrrbCoding", "ibpsrrbRelations"],
    },
    {
      key: "quant",
      name: "Numerical Ability",
      shortName: "Numerical",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(20) }],
      directions:
        "40 questions in 20 minutes: simplification and approximation, missing number series, two data interpretation tables and arithmetic word problems. No calculator, as on the real exam. You cannot return to Reasoning, and once this section closes you cannot come back to it.",
      scale: percentScale(40),
      domains: ["ibpsrrbNumber", "ibpsrrbDI", "ibpsrrbArith"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    ibpsrrbLogic: "Reasoning: Inequalities and Syllogisms",
    ibpsrrbPuzzle: "Reasoning: Puzzles and Seating Arrangements",
    ibpsrrbCoding: "Reasoning: Coding-Decoding and Alphabet",
    ibpsrrbRelations: "Reasoning: Blood Relations, Directions and Ranking",
    ibpsrrbNumber: "Numerical: Simplification, Approximation and Series",
    ibpsrrbDI: "Numerical: Data Interpretation",
    ibpsrrbArith: "Numerical: Arithmetic",
  },
  drills: [
    { key: "logic", name: "Inequalities and Syllogisms", section: "reason", domains: ["ibpsrrbLogic"], blurb: "Chained inequalities and two-statement syllogisms, including either-or conclusions." },
    { key: "puzzles", name: "Puzzles and Seating", section: "reason", domains: ["ibpsrrbPuzzle"], blurb: "Box stacks, linear and circular seating, days, floors and comparison puzzles, five questions each." },
    { key: "coding", name: "Coding and Alphabet", section: "reason", domains: ["ibpsrrbCoding"], blurb: "Letter shifts, word codes, number codes, letter series and alphabet position questions." },
    { key: "relations", name: "Relations, Directions and Ranking", section: "reason", domains: ["ibpsrrbRelations"], blurb: "Blood relations, direction sense, turns and distances, and positions in a row or queue." },
    { key: "number", name: "Simplification and Series", section: "quant", domains: ["ibpsrrbNumber"], blurb: "Exact and approximate simplification and missing number series, the biggest block of Numerical Ability." },
    { key: "di", name: "Data Interpretation", section: "quant", domains: ["ibpsrrbDI"], blurb: "Tables of loans, milk collection, crop output and applications: totals, ratios, percentages and averages." },
    { key: "arithmetic", name: "Arithmetic", section: "quant", domains: ["ibpsrrbArith"], blurb: "Profit and loss, interest, averages, ratio, time and work, speed, ages, mixtures and probability." },
  ],
  composite: { name: "Score out of 100", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [55, 60, 70, 80, 90],
  goalNotes: {
    55: "A first target while you learn the question types",
    60: "Building up: aim higher for a safety margin",
    70: "A safe margin, with both sections solid",
    80: "Strong: ready for the Mains",
    90: "Excellent",
  },
  testLength: "45 min",
  copy: {
    heroSubs: [
      "Drill each question type, then sit a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for the Prelims.",
    ],
    sourceLine: "Original practice questions on the IBPS RRB Office Assistant Preliminary Examination pattern (Reasoning and Numerical Ability). Not affiliated with or endorsed by IBPS.",
    scoreNote: "Score as a percentage of the 80 questions, one mark per correct answer, with no negative marking. The real Prelims deducts a quarter mark for each wrong answer, and IBPS sets a qualifying cutoff in both tests each year (past cutoffs have differed by state and category), so skip questions you would only be guessing at and keep both sections above their cutoff.",
  },
};
