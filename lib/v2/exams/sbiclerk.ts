import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// SBI Clerk Preliminary Examination (State Bank of India, Recruitment of
// Junior Associates (Customer Support & Sales), Advertisement No.
// CRPD/CR/2026-27/17, registration 11 to 31 August 2026, Prelims
// tentatively September 2026). Phase I per the advertisement: one online
// objective test of 100 questions, 100 marks, 1 hour, with each test
// separately timed: English Language 30 questions (20 min), Numerical
// Ability 35 (20 min) and Reasoning Ability 35 (20 min); 1/4 of a
// question's marks deducted for each wrong answer; no minimum qualifying
// marks for any test or for the aggregate, and about ten times the
// vacancies in each category shortlisted for the Main exam by aggregate
// marks. Prelims marks are not counted in the final merit list. Each
// section here is its own timed module in the paper's order, so there is no
// going back to a closed section. Every item is five-option single answer
// (five options is past-paper practice, not stated in the advertisement).
// Drills: three per section (per test 10/10/10 English, 15/10/10 Numerical
// Ability, 8/15/12 Reasoning), so the dashboard is 11 steps. The score is
// out of 100 with no negative marking; the quarter-mark penalty is
// explained in scoreNote and on the landing, not applied.
// Sources: tools/next100/sbiclerk/sources.md.
const minutes = (n: number) => n * 60;

export const SBICLERK: ExamV2Config = {
  id: "sbiclerk",
  slug: "/sbi-clerk",
  landingPath: "/sbi-clerk-prelims-practice-test",
  name: "SBI Clerk Prelims Mock Test",
  shortName: "SBI Clerk",
  fullName: "SBI Clerk (Junior Associates) Preliminary Examination",
  tagline: "100 questions in 60 minutes with sectional timing: English 30, Numerical Ability 35 and Reasoning Ability 35, 20 minutes each.",
  icon: "building",
  theme: { brand: "209 40% 34%", brandDark: "209 40% 26%", brandLight: "209 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "eng",
      name: "English Language",
      shortName: "English",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(20) }],
      directions:
        "30 questions in 20 minutes: a reading comprehension passage, a cloze test, fillers, error spotting, sentence improvement and phrase rearrangement. You can move between questions and flag them inside this section, but once the section closes you cannot come back to it. The real exam takes a quarter mark off for each wrong answer; this mock test does not.",
      scale: percentScale(30),
      domains: ["sbiclerkReading", "sbiclerkCloze", "sbiclerkGrammar"],
    },
    {
      key: "quant",
      name: "Numerical Ability",
      shortName: "Numerical",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(20) }],
      directions:
        "35 questions in 20 minutes: simplification, approximation, missing number series, two data interpretation tables and arithmetic word problems. No calculator, as on the real exam. You cannot return to English, and once this section closes you cannot come back to it.",
      scale: percentScale(35),
      domains: ["sbiclerkNumber", "sbiclerkDI", "sbiclerkArith"],
    },
    {
      key: "reason",
      name: "Reasoning Ability",
      shortName: "Reasoning",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(20) }],
      directions:
        "35 questions in 20 minutes: inequalities and syllogisms, three puzzles with five questions each, then coding-decoding, blood relations, directions, ranking and alphabet questions. Solve each puzzle once on rough paper and answer all five of its questions from your grid.",
      scale: percentScale(35),
      domains: ["sbiclerkLogic", "sbiclerkPuzzle", "sbiclerkVerbal"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    sbiclerkReading: "English: Reading Comprehension",
    sbiclerkCloze: "English: Cloze Test and Fillers",
    sbiclerkGrammar: "English: Error Spotting, Sentence Improvement and Rearrangement",
    sbiclerkNumber: "Numerical: Simplification, Approximation and Series",
    sbiclerkDI: "Numerical: Data Interpretation",
    sbiclerkArith: "Numerical: Arithmetic",
    sbiclerkLogic: "Reasoning: Inequalities and Syllogisms",
    sbiclerkPuzzle: "Reasoning: Puzzles and Seating Arrangements",
    sbiclerkVerbal: "Reasoning: Coding, Relations, Directions and Alphabet",
  },
  drills: [
    { key: "reading", name: "Reading Comprehension", section: "eng", domains: ["sbiclerkReading"], blurb: "Main idea, detail, inference, tone, title, and the meaning of words in the passage." },
    { key: "cloze", name: "Cloze Test and Fillers", section: "eng", domains: ["sbiclerkCloze"], blurb: "The word that fits a passage blank, single fillers and double fillers." },
    { key: "grammar", name: "Error Spotting and Rearrangement", section: "eng", domains: ["sbiclerkGrammar"], blurb: "Agreement, prepositions, conditionals and comparisons, sentence improvement and putting the parts of a sentence in order." },
    { key: "number", name: "Simplification and Series", section: "quant", domains: ["sbiclerkNumber"], blurb: "Exact and approximate simplification and missing number series, the biggest block of Numerical Ability." },
    { key: "di", name: "Data Interpretation", section: "quant", domains: ["sbiclerkDI"], blurb: "Tables of new accounts, loan applications, bus passengers and household budgets: totals, ratios, percentages and averages." },
    { key: "arithmetic", name: "Arithmetic", section: "quant", domains: ["sbiclerkArith"], blurb: "Profit and loss, interest, averages, partnership, pipes, speed, ages, mixtures, boats, trains and probability." },
    { key: "logic", name: "Inequalities and Syllogisms", section: "reason", domains: ["sbiclerkLogic"], blurb: "Chained inequalities, two-statement syllogisms and either-or conclusions." },
    { key: "puzzles", name: "Puzzles and Seating", section: "reason", domains: ["sbiclerkPuzzle"], blurb: "Linear and circular seating, months, days, floors and comparison puzzles, five questions each." },
    { key: "verbal", name: "Coding, Relations and Directions", section: "reason", domains: ["sbiclerkVerbal"], blurb: "Coding-decoding, blood relations, direction sense, ranking, the alphabet, letter series and odd one out." },
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
    sourceLine: "Original practice questions on the SBI Clerk (Junior Associates) Preliminary Examination pattern (English, Numerical Ability and Reasoning Ability). Not affiliated with or endorsed by State Bank of India.",
    scoreNote: "Score out of 100, one mark per correct answer, with no negative marking. The real Prelims deducts a quarter mark for each wrong answer. SBI sets no sectional or minimum qualifying marks for the Prelims; it shortlists about ten times the vacancies in each category for the Mains by total marks, so the score you need depends on your state and category each year. Skip questions you would only be guessing at.",
  },
};
