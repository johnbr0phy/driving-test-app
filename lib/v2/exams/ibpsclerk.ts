import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// IBPS Clerk Preliminary Examination (Institute of Banking Personnel
// Selection, Common Recruitment Process for Customer Service Associates,
// CRP CSA). Pattern per the official CRP CSA-XVI notification (1 August 2026,
// prelims October 2026; guides report 10 and 11 October), the same as
// CRP CSA-XV (2025): one online objective paper of 100
// questions in 60 minutes with sectional timing, English Language 30
// questions (20 min), Numerical Ability 35 (20 min) and Reasoning Ability 35
// (20 min), 1 mark each, a quarter of a mark deducted per wrong answer, and
// a cutoff in each test set by IBPS each year. Prelims is qualifying for the
// Mains, whose marks alone make the merit list. Each section here is its own
// timed module in the paper's order, so there is no going back to a closed
// section, as on the real paper. Every item is five-option single answer.
// Puzzles are text stimuli shared by five questions; data interpretation uses
// pipe tables. Drills: three per section (per test 12/10/8 English, 15/8/12
// Numerical Ability, 8/15/12 Reasoning), so the dashboard is 11 steps. The
// score is out of 100 with no negative marking; the quarter-mark penalty is
// explained in scoreNote and on the landing, not applied.
// Sources: tools/next100/ibpsclerk/sources.md.
const minutes = (n: number) => n * 60;

export const IBPSCLERK: ExamV2Config = {
  id: "ibpsclerk",
  slug: "/ibps-clerk",
  landingPath: "/ibps-clerk-prelims-practice-test",
  name: "IBPS Clerk Prelims Mock Test",
  shortName: "IBPS Clerk",
  fullName: "IBPS Clerk Preliminary Examination",
  tagline: "100 questions in 60 minutes with sectional timing: English 30, Numerical Ability 35 and Reasoning Ability 35, 20 minutes each.",
  icon: "building",
  theme: { brand: "336 55% 34%", brandDark: "336 55% 26%", brandLight: "336 55% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "eng",
      name: "English Language",
      shortName: "English",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(20) }],
      directions:
        "30 questions in 20 minutes: a reading comprehension passage, a para jumble, a cloze test, fillers, error spotting and sentence improvement. You can move between questions and flag them inside this section, but once the section closes you cannot come back to it. The real exam takes a quarter mark off for each wrong answer; this mock test does not.",
      scale: percentScale(30),
      domains: ["ibpsclerkReading", "ibpsclerkCloze", "ibpsclerkGrammar"],
    },
    {
      key: "quant",
      name: "Numerical Ability",
      shortName: "Numerical",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(20) }],
      directions:
        "35 questions in 20 minutes: simplification and approximation, missing number series, two data interpretation tables and arithmetic word problems. No calculator, as on the real exam. You cannot return to English, and once this section closes you cannot come back to it.",
      scale: percentScale(35),
      domains: ["ibpsclerkNumber", "ibpsclerkDI", "ibpsclerkArith"],
    },
    {
      key: "reason",
      name: "Reasoning Ability",
      shortName: "Reasoning",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(20) }],
      directions:
        "35 questions in 20 minutes: inequalities and syllogisms, three puzzles with five questions each, then coding-decoding, blood relations, directions, letter series and ranking. Solve each puzzle once on rough paper and answer all five of its questions from your grid.",
      scale: percentScale(35),
      domains: ["ibpsclerkLogic", "ibpsclerkPuzzle", "ibpsclerkVerbal"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    ibpsclerkReading: "English: Reading Comprehension and Para Jumbles",
    ibpsclerkCloze: "English: Cloze Test and Fillers",
    ibpsclerkGrammar: "English: Error Spotting and Sentence Improvement",
    ibpsclerkNumber: "Numerical: Simplification, Approximation and Series",
    ibpsclerkDI: "Numerical: Data Interpretation",
    ibpsclerkArith: "Numerical: Arithmetic",
    ibpsclerkLogic: "Reasoning: Inequalities and Syllogisms",
    ibpsclerkPuzzle: "Reasoning: Puzzles and Seating Arrangements",
    ibpsclerkVerbal: "Reasoning: Coding, Relations, Directions and Series",
  },
  drills: [
    { key: "reading", name: "Reading and Para Jumbles", section: "eng", domains: ["ibpsclerkReading"], blurb: "Main idea, detail, inference, word meaning and putting six sentences in order." },
    { key: "cloze", name: "Cloze Test and Fillers", section: "eng", domains: ["ibpsclerkCloze"], blurb: "The word that fits a passage blank, single fillers and double fillers." },
    { key: "grammar", name: "Error Spotting", section: "eng", domains: ["ibpsclerkGrammar"], blurb: "Subject-verb agreement, tenses, conditionals, prepositions and sentence improvement." },
    { key: "number", name: "Simplification and Series", section: "quant", domains: ["ibpsclerkNumber"], blurb: "Exact and approximate simplification and missing number series, the biggest block of Numerical Ability." },
    { key: "di", name: "Data Interpretation", section: "quant", domains: ["ibpsclerkDI"], blurb: "Tables of sales, students, stock and prices: totals, ratios, percentage change and averages." },
    { key: "arithmetic", name: "Arithmetic", section: "quant", domains: ["ibpsclerkArith"], blurb: "Profit and loss, interest, averages, ratio, time and work, speed, ages, mixtures and probability." },
    { key: "logic", name: "Inequalities and Syllogisms", section: "reason", domains: ["ibpsclerkLogic"], blurb: "Chained inequalities, two-statement syllogisms and either-or conclusions." },
    { key: "puzzles", name: "Puzzles and Seating", section: "reason", domains: ["ibpsclerkPuzzle"], blurb: "Floors, circular and linear seating, days, months and comparison puzzles, five questions each." },
    { key: "verbal", name: "Coding, Relations and Directions", section: "reason", domains: ["ibpsclerkVerbal"], blurb: "Coding-decoding, blood relations, direction sense, letter series, the alphabet and ranking." },
  ],
  composite: { name: "Score out of 100", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [55, 60, 70, 80, 90],
  goalNotes: {
    55: "A first target while you learn the question types",
    60: "Building up: aim higher for a safety margin",
    70: "A safe margin, with every section solid",
    80: "Strong: ready for the Mains",
    90: "Excellent",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each question type, then sit a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for the Prelims.",
    ],
    sourceLine: "Original practice questions on the IBPS Clerk Preliminary Examination pattern (English, Numerical Ability and Reasoning Ability). Not affiliated with or endorsed by IBPS.",
    scoreNote: "Score out of 100, one mark per correct answer, with no negative marking. The real Prelims deducts a quarter mark for each wrong answer, and IBPS sets a qualifying cutoff in each section every year (past cutoffs have differed by state and category), so skip questions you would only be guessing at and keep every section above its cutoff.",
  },
};
