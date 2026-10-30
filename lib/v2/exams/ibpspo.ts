import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// IBPS PO Preliminary Examination (Institute of Banking Personnel Selection,
// Probationary Officers / Management Trainees, CRP PO/MT). Pattern per the
// IBPS CRP PO/MT notification (unchanged for the 2025 cycle, prelims held
// August 2025): one online objective paper of 100 questions in 60 minutes with
// sectional timing, English Language 30 questions (20 min), Quantitative
// Aptitude 35 (20 min) and Reasoning Ability 35 (20 min), 1 mark each, a
// quarter of a mark deducted per wrong answer, and sectional plus overall
// cutoffs set each year. Prelims is qualifying for the Mains. Here each section
// is its own timed module in the paper's order, so a candidate cannot go back
// to a closed section, and moves freely inside the open one, as on the real
// paper. Every item is five-option single answer like the real paper.
// Reasoning puzzles and seating arrangements are text stimuli shared by five
// questions; Quant data interpretation uses pipe tables. Drills: three per
// section (per test 13/10/7 English, 15/10/10 Quant, 8/15/12 Reasoning), so the
// dashboard is 11 steps. The score is out of 100 with no negative marking; the
// quarter-mark penalty is explained in scoreNote and on the landing, not applied.
// Sources: tools/ibpspo/sources.md.
const minutes = (n: number) => n * 60;

export const IBPSPO: ExamV2Config = {
  id: "ibpspo",
  slug: "/ibps-po",
  landingPath: "/ibps-po-prelims-practice-test",
  name: "IBPS PO Prelims Mock Test",
  shortName: "IBPS PO",
  fullName: "IBPS PO Preliminary Examination",
  tagline: "100 questions in 60 minutes with sectional timing: English 30, Quantitative Aptitude 35 and Reasoning Ability 35, 20 minutes each.",
  icon: "building",
  theme: { brand: "332 70% 46%", brandDark: "332 70% 37%", brandLight: "332 70% 96%" },
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
      domains: ["engReading", "engCloze", "engGrammar"],
    },
    {
      key: "quant",
      name: "Quantitative Aptitude",
      shortName: "Quant",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(20) }],
      directions:
        "35 questions in 20 minutes: simplification and approximation, missing number series, quadratic equations, two data interpretation tables and arithmetic word problems. No calculator, as on the real exam. You cannot return to English, and once this section closes you cannot come back to it.",
      scale: percentScale(35),
      domains: ["qtNumber", "qtDI", "qtArith"],
    },
    {
      key: "reason",
      name: "Reasoning Ability",
      shortName: "Reasoning",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(20) }],
      directions:
        "35 questions in 20 minutes: inequalities and syllogisms, three puzzles or seating arrangements with five questions each, then coding-decoding, blood relations, directions and ranking. Solve each puzzle once on rough paper and answer all five of its questions from your grid.",
      scale: percentScale(35),
      domains: ["rsLogic", "rsPuzzle", "rsVerbal"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    engReading: "English: Reading Comprehension and Para Jumbles",
    engCloze: "English: Cloze Test and Fillers",
    engGrammar: "English: Error Spotting and Sentence Improvement",
    qtNumber: "Quant: Simplification, Series and Quadratics",
    qtDI: "Quant: Data Interpretation",
    qtArith: "Quant: Arithmetic",
    rsLogic: "Reasoning: Inequalities and Syllogisms",
    rsPuzzle: "Reasoning: Puzzles and Seating Arrangements",
    rsVerbal: "Reasoning: Coding, Relations, Directions and Ranking",
  },
  drills: [
    { key: "reading", name: "Reading and Para Jumbles", section: "eng", domains: ["engReading"], blurb: "Main idea, detail, inference, vocabulary in context, and putting six sentences in order." },
    { key: "cloze", name: "Cloze Test and Fillers", section: "eng", domains: ["engCloze"], blurb: "Choosing the word that fits a passage blank, single fillers and double fillers." },
    { key: "grammar", name: "Error Spotting", section: "eng", domains: ["engGrammar"], blurb: "Subject-verb agreement, tenses, conditionals, prepositions and sentence improvement." },
    { key: "number", name: "Simplification, Series and Quadratics", section: "quant", domains: ["qtNumber"], blurb: "Exact and approximate simplification, missing number series and comparing the roots of two quadratics." },
    { key: "di", name: "Data Interpretation", section: "quant", domains: ["qtDI"], blurb: "Tables of loans, staff, passengers and budgets: totals, ratios, percentage change and averages." },
    { key: "arithmetic", name: "Arithmetic", section: "quant", domains: ["qtArith"], blurb: "Profit and loss, interest, time and work, speed, ages, mixtures, partnership and probability." },
    { key: "logic", name: "Inequalities and Syllogisms", section: "reason", domains: ["rsLogic"], blurb: "Chained inequalities, two- and three-statement syllogisms and either-or conclusions." },
    { key: "puzzles", name: "Puzzles and Seating", section: "reason", domains: ["rsPuzzle"], blurb: "Linear and circular seating, floors, boxes, schedules and ranking puzzles, five questions each." },
    { key: "verbal", name: "Coding, Relations and Directions", section: "reason", domains: ["rsVerbal"], blurb: "Coding-decoding, blood relations, direction sense, order and ranking, and the alphabet." },
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
    sourceLine: "Original practice questions on the IBPS PO Preliminary Examination pattern (English, Quantitative Aptitude and Reasoning Ability). Not affiliated with or endorsed by IBPS.",
    scoreNote: "Score out of 100, one mark per correct answer, with no negative marking. The real Prelims deducts a quarter mark for each wrong answer and sets a cutoff for each section and for the total every year, so skip questions you would only be guessing at and keep every section above its cutoff.",
  },
};
