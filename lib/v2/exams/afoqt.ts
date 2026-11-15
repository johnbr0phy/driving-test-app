import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// U.S. Air Force Officer Qualifying Test, Form T, as the Air Force describes it
// on its Pearson VUE test page and AFROTC Detachment 485's AFOQT page (both
// fetched November 2026): 12 timed multiple-choice subtests, 516 questions in
// about five hours with breaks, every question answered. In order: Verbal
// Analogies 25 in 8 min, Arithmetic Reasoning 25 in 29, Word Knowledge 25 in 5,
// Math Knowledge 25 in 22, Reading Comprehension 25 in 24, Situational Judgment
// 16 in 35, a 15-minute break, Self-Description Inventory 240 in 45 (not
// graded), Physical Science 20 in 10, Table Reading 40 in 7, Instrument
// Comprehension 25 in 5, Block Counting 30 in 5, Aviation Information 20 in 8.
// Scores are 1 to 99 composite percentiles (Verbal, Quantitative, Academic
// Aptitude, Pilot, Combat Systems Officer, Air Battle Manager, Situational
// Judgment); DAFMAN 36-2664 sets minimums of Verbal 15 and Quantitative 10.
//
// Modelled: the eight subtests that can be written as text, at about half
// length and the real pace, in Form T order, five answer choices. Situational
// Judgment (panel-keyed), Instrument Comprehension and Block Counting (figures)
// and the Self-Description Inventory are left out. Each section shows percent
// correct and the composite is overall percent correct: Tigertest never
// estimates an AFOQT percentile, since the Air Force publishes no conversion.
// Sources: tools/next100/afoqt/sources.md.
const minutes = (n: number) => n * 60;

export const AFOQT: ExamV2Config = {
  id: "afoqt",
  slug: "/afoqt",
  landingPath: "/afoqt-practice-test",
  name: "AFOQT Practice Test",
  shortName: "AFOQT",
  fullName: "Air Force Officer Qualifying Test (AFOQT)",
  tagline: "Eight AFOQT subtests in Form T order at the real pace: verbal, math, reading, physical science, table reading and aviation.",
  icon: "plane",
  theme: { brand: "84 30% 38%", brandDark: "84 30% 26%", brandLight: "84 30% 96%" },
  breakSeconds: minutes(15),
  breakNote: "The real AFOQT has a 15-minute break in the middle of the test, after Situational Judgment.",
  sections: [
    {
      key: "va", name: "Verbal Analogies", shortName: "VA",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(4) }],
      directions: "Choose the option that best completes each analogy. Work out how the first pair is related, then find the pair or word related the same way. Under 20 seconds a question, like the real subtest.",
      scale: percentScale(12), domains: ["afoqtVerbal"],
    },
    {
      key: "ar", name: "Arithmetic Reasoning", shortName: "AR",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(14) }],
      directions: "Word problems: rates, ratios, percents, mixtures, work and time. Work on scratch paper; there is no calculator. Pick the answer that is most nearly correct.",
      scale: percentScale(12), domains: ["afoqtArithmetic"],
    },
    {
      key: "wk", name: "Word Knowledge", shortName: "WK",
      modules: [{ module: 1, questionCount: 12, timeLimit: 150 }],
      directions: "Choose the word closest in meaning to the word in capital letters. The real subtest gives you about 12 seconds a word, so answer what you know first.",
      scale: percentScale(12), domains: ["afoqtWord"],
    },
    {
      key: "mk", name: "Math Knowledge", shortName: "MK",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(11) }],
      directions: "Algebra, geometry, exponents, inequalities, absolute value and number facts. No calculator.",
      scale: percentScale(12), domains: ["afoqtMath"],
    },
    {
      key: "rc", name: "Reading Comprehension", shortName: "RC", breakAfter: true,
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(12) }],
      directions: "Four short passages with three questions each: the main idea, a stated detail, what the passage implies and why the author includes something. Answer from the passage only.",
      scale: percentScale(12), domains: ["afoqtReading"],
    },
    {
      key: "ps", name: "Physical Science", shortName: "PS",
      modules: [{ module: 1, questionCount: 10, timeLimit: minutes(5) }],
      directions: "High school physical science: forces and motion, energy, simple machines, waves, heat, electricity and units.",
      scale: percentScale(10), domains: ["afoqtScience"],
    },
    {
      key: "tr", name: "Table Reading", shortName: "TR",
      modules: [{ module: 1, questionCount: 20, timeLimit: 210 }],
      directions: "Each question gives an X value and a Y value. Find the entry where that X column and that Y row meet. About 10 seconds a question, so keep a finger on the row and column.",
      scale: percentScale(20), domains: ["afoqtTable"],
    },
    {
      key: "ai", name: "Aviation Information", shortName: "AI",
      modules: [{ module: 1, questionCount: 10, timeLimit: minutes(4) }],
      directions: "Flight physics and aircraft: the four forces, the three axes and the controls that move the aircraft about them, wing devices, drag, lift, engines and the atmosphere.",
      scale: percentScale(10), domains: ["afoqtAviation"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    afoqtVerbal: "Verbal Analogies",
    afoqtArithmetic: "Arithmetic Reasoning",
    afoqtWord: "Word Knowledge",
    afoqtMath: "Math Knowledge",
    afoqtReading: "Reading Comprehension",
    afoqtScience: "Physical Science",
    afoqtTable: "Table Reading",
    afoqtAviation: "Aviation Information",
  },
  // One drill per subtest. Arithmetic Reasoning and Math Knowledge open with Basics from the shared library; no
  // skill opens two drills (tests/no-repeats.test.cjs).
  drills: [
    { key: "va", name: "Verbal Analogies", section: "va", domains: ["afoqtVerbal"], blurb: "Find the relationship in the first pair: opposites, part and whole, tool and worker, cause and result." },
    { key: "ar", name: "Arithmetic Reasoning", section: "ar", domains: ["afoqtArithmetic"], blurb: "Word problems by hand: rate and time, ratios, percents, mixtures and work.", basics: ["wordProblems", "percents", "ratios", "rateProblems"] },
    { key: "wk", name: "Word Knowledge", section: "wk", domains: ["afoqtWord"], blurb: "Closest-meaning vocabulary at the AFOQT's quick pace." },
    { key: "mk", name: "Math Knowledge", section: "mk", domains: ["afoqtMath"], blurb: "Algebra, exponents, inequalities, factoring and geometry without a calculator.", basics: ["solveX", "exponentRules", "factoring", "pythagorean", "inequalities"] },
    { key: "rc", name: "Reading Comprehension", section: "rc", domains: ["afoqtReading"], blurb: "Short passages: main idea, detail, inference and the author's purpose." },
    { key: "ps", name: "Physical Science", section: "ps", domains: ["afoqtScience"], blurb: "Forces, energy, simple machines, waves, heat and electricity." },
    { key: "tr", name: "Table Reading", section: "tr", domains: ["afoqtTable"], blurb: "Find the entry at an X and Y value, fast and without slipping a row." },
    { key: "ai", name: "Aviation Information", section: "ai", domains: ["afoqtAviation"], blurb: "The four forces, flight controls, wing devices, drag and engines." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first benchmark across all eight subtests",
    60: "Solid ground on most subtests",
    70: "A strong all-round result",
    80: "Strong enough to aim at rated composites",
    90: "Near the top on every subtest",
  },
  testLength: "56 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each subtest.",
      "Master each drill first.",
      "Take Practice Test 1 to see where you stand.",
      "Hit your goal on both practice tests.",
      "Goal hit. Ask your recruiter or detachment about a test date.",
    ],
    sourceLine: "Original questions written to the U.S. Air Force's description of the AFOQT Form T subtests. Not affiliated with or endorsed by the U.S. Air Force or the Department of the Air Force.",
    scoreNote: "Scores here are percent correct on the eight subtests modelled, not AFOQT scores. The real AFOQT reports 1 to 99 percentiles on composites (Verbal, Quantitative, Academic Aptitude, Pilot, Combat Systems Officer, Air Battle Manager and Situational Judgment), and the Air Force publishes no conversion from questions right. Per DAFMAN 36-2664 the minimums are the 15th percentile on Verbal and the 10th on Quantitative; rated programs need more. Situational Judgment, Instrument Comprehension, Block Counting and the Self-Description Inventory are not included.",
  },
};
