import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// SBI PO Preliminary Examination (State Bank of India, Probationary Officers).
// Pattern per the SBI advertisement CRPD/PO/2026-27/09 (18 June 2026, 1,500
// vacancies, prelims August 2026): one online objective test of 100 marks in
// one hour with separate timing for each section, English Language 40
// questions (20 min), Quantitative Aptitude 30 (20 min) and Reasoning Ability
// 30 (20 min). This replaced the 30/35/35 split of earlier cycles. A quarter
// of the marks of a question is deducted for each wrong answer; there is no
// sectional cut-off in the prelims, and about ten times the vacancies in each
// category are shortlisted for the Mains on aggregate marks. Prelims marks do
// not count in the final merit list. Here each section is its own timed module
// in the paper's order, so a candidate cannot go back to a closed section, and
// moves freely inside the open one. Every item is five-option single answer
// like past papers. Puzzles are text stimuli shared by five questions; data
// interpretation uses pipe tables. Drills: three per section (per test 16/12/12
// English, 12/8/10 Quant, 6/15/9 Reasoning), so the dashboard is 11 steps. The
// score is out of 100 with no negative marking; the penalty is explained in
// scoreNote and on the landing, not applied. Sources: tools/next100/sbipo/sources.md.
const minutes = (n: number) => n * 60;

export const SBIPO: ExamV2Config = {
  id: "sbipo",
  slug: "/sbi-po",
  landingPath: "/sbi-po-prelims-practice-test",
  name: "SBI PO Prelims Mock Test",
  shortName: "SBI PO",
  fullName: "SBI PO Preliminary Examination",
  tagline: "100 questions in 60 minutes with sectional timing: English 40, Quantitative Aptitude 30 and Reasoning Ability 30, 20 minutes each.",
  icon: "building",
  theme: { brand: "212 70% 46%", brandDark: "212 70% 36%", brandLight: "212 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "eng",
      name: "English Language",
      shortName: "English",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(20) }],
      directions:
        "40 questions in 20 minutes: two reading passages, a para jumble, a cloze test, single and double fillers, error spotting and sentence improvement. You can move between questions and flag them inside this section, but once the section closes you cannot come back to it. The real exam takes a quarter mark off for each wrong answer; this mock test does not.",
      scale: percentScale(40),
      domains: ["sbipoReading", "sbipoCloze", "sbipoGrammar"],
    },
    {
      key: "quant",
      name: "Quantitative Aptitude",
      shortName: "Quant",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(20) }],
      directions:
        "30 questions in 20 minutes: simplification and approximation, missing number series, quadratic equations, two data interpretation tables and arithmetic word problems. No calculator, as on the real exam. You cannot return to English, and once this section closes you cannot come back to it.",
      scale: percentScale(30),
      domains: ["sbipoNumber", "sbipoDI", "sbipoArith"],
    },
    {
      key: "reason",
      name: "Reasoning Ability",
      shortName: "Reasoning",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(20) }],
      directions:
        "30 questions in 20 minutes: inequalities and syllogisms, three puzzles or seating arrangements with five questions each, then coding-decoding, blood relations, directions, ranking and the alphabet. Solve each puzzle once on rough paper and answer all five of its questions from your grid.",
      scale: percentScale(30),
      domains: ["sbipoLogic", "sbipoPuzzle", "sbipoVerbal"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    sbipoReading: "English: Reading Comprehension and Para Jumbles",
    sbipoCloze: "English: Cloze Test and Fillers",
    sbipoGrammar: "English: Error Spotting and Sentence Improvement",
    sbipoNumber: "Quant: Simplification, Series and Quadratics",
    sbipoDI: "Quant: Data Interpretation",
    sbipoArith: "Quant: Arithmetic",
    sbipoLogic: "Reasoning: Inequalities and Syllogisms",
    sbipoPuzzle: "Reasoning: Puzzles and Seating Arrangements",
    sbipoVerbal: "Reasoning: Coding, Relations, Directions and Ranking",
  },
  drills: [
    { key: "reading", name: "Reading and Para Jumbles", section: "eng", domains: ["sbipoReading"], blurb: "Main idea, detail, inference, vocabulary in context, titles, and putting six sentences in order." },
    { key: "cloze", name: "Cloze Test and Fillers", section: "eng", domains: ["sbipoCloze"], blurb: "Choosing the word that fits a passage blank, single fillers and double fillers." },
    { key: "grammar", name: "Error Spotting", section: "eng", domains: ["sbipoGrammar"], blurb: "Agreement, tenses, pronouns, gerunds and infinitives, and sentence improvement." },
    { key: "number", name: "Simplification, Series and Quadratics", section: "quant", domains: ["sbipoNumber"], blurb: "Exact and approximate simplification, missing number series and comparing the roots of two quadratics." },
    { key: "di", name: "Data Interpretation", section: "quant", domains: ["sbipoDI"], blurb: "Tables of deposits, sales, visitors and factory output: totals, ratios, percentage change and averages." },
    { key: "arithmetic", name: "Arithmetic", section: "quant", domains: ["sbipoArith"], blurb: "Profit and loss, interest, time and work, pipes, trains, boats, ages, mixtures, partnership and probability." },
    { key: "logic", name: "Inequalities and Syllogisms", section: "reason", domains: ["sbipoLogic"], blurb: "Chained inequalities, two-statement syllogisms and either-or conclusions." },
    { key: "puzzles", name: "Puzzles and Seating", section: "reason", domains: ["sbipoPuzzle"], blurb: "Floor, circular and linear seating, scheduling and comparison puzzles, five questions each." },
    { key: "verbal", name: "Coding, Relations and Directions", section: "reason", domains: ["sbipoVerbal"], blurb: "Coding-decoding, blood relations, direction sense, order and ranking, and the alphabet." },
  ],
  composite: { name: "Score out of 100", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [55, 60, 70, 80, 90],
  goalNotes: {
    55: "A first target while you learn the question types",
    60: "Building up: aim higher for a safety margin",
    70: "A safe margin across all three sections",
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
    sourceLine: "Original practice questions on the SBI PO Preliminary Examination pattern (English Language, Quantitative Aptitude and Reasoning Ability). Not affiliated with or endorsed by the State Bank of India.",
    scoreNote: "Score out of 100, one mark per correct answer, with no negative marking. The real Prelims deducts a quarter of a question's marks for each wrong answer. There is no sectional cut-off in the SBI PO Prelims: candidates are shortlisted for the Mains on their total, about ten times the vacancies in each category, so the cut-off moves each year. Skip questions you would only be guessing at.",
  },
};
