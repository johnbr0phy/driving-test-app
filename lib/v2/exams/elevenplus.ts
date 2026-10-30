import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// 11+ (eleven plus) grammar school entrance test, multiple-choice style, for
// Year 5 and Year 6 pupils in England and Northern Ireland. Local areas set
// their own papers: most multiple-choice 11+ tests are drawn from English
// (comprehension, spelling, punctuation, grammar), maths (Key Stage 2 number,
// measures, geometry, statistics and simple algebra), verbal reasoning and
// non-verbal reasoning, usually about 50 minutes for English or maths (around
// 50 questions) and about an hour for verbal reasoning (around 80). Non-verbal
// reasoning is all figures and is not modelled here. Each practice test is a
// shorter sitting of the three written papers: English 25 in 25 min, Maths 25
// in 25 min, Verbal Reasoning 40 in 30 min, with a short break between. Five
// options in maths and letter sums, four or five elsewhere, as on the real
// answer sheets. Scores here are percent correct; the real 11+ reports a
// standardised (age-adjusted) score and every area sets its own qualifying
// mark. Test 2 is held out of the drills.
const minutes = (n: number) => n * 60;

export const ELEVENPLUS: ExamV2Config = {
  id: "elevenplus",
  slug: "/eleven-plus",
  landingPath: "/11-plus-practice-test",
  name: "11+ Practice Test",
  shortName: "11+",
  fullName: "11+ grammar school entrance test",
  tagline: "English, maths and verbal reasoning for the 11+, with a short lesson before each drill.",
  icon: "graduation",
  theme: { brand: "245 70% 36%", brandDark: "245 70% 26%", brandLight: "245 90% 96%" },
  breakSeconds: 300,
  sections: [
    {
      key: "english",
      name: "English",
      shortName: "English",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(25) }],
      directions:
        "Two reading passages, one story and one information text, with questions on what they say, what they suggest and what words mean. Then spelling, punctuation and grammar: find the part of a sentence with a mistake (or choose No mistake) and choose the right word to complete a sentence. Every question is multiple choice.",
      scale: percentScale(25),
      domains: ["elevenplusReading", "elevenplusSpag"],
    },
    {
      key: "maths",
      name: "Maths",
      shortName: "Maths",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(25) }],
      directions:
        "Key Stage 2 maths: number, calculation, fractions, decimals and percentages, then measures, money, time, shape, data and simple algebra. No calculator. Each question has five answers to choose from; use scrap paper for working, as you would in the real test.",
      scale: percentScale(25),
      domains: ["elevenplusNumber", "elevenplusProblem"],
    },
    {
      key: "vr",
      name: "Verbal Reasoning",
      shortName: "Verbal Reasoning",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(30) }],
      directions:
        "Word puzzles and code puzzles, grouped by type like the real paper: closest and opposite meanings, hidden words, moving a letter, compound words, missing letters and odd ones out, then letter series, letter and number codes, number series, letter sums and logic. Read each question's instructions carefully: they change from type to type.",
      scale: percentScale(40),
      domains: ["elevenplusVrWords", "elevenplusVrCodes"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    elevenplusReading: "Comprehension",
    elevenplusSpag: "Spelling, Punctuation and Grammar",
    elevenplusNumber: "Number and Calculation",
    elevenplusProblem: "Problem Solving, Measures, Shape and Data",
    elevenplusVrWords: "Verbal Reasoning: Words",
    elevenplusVrCodes: "Verbal Reasoning: Codes and Sequences",
  },
  // Six drills, one per domain; four open with Basics (twelve dashboard
  // steps with the two tests). Each drill is 20 exam-level items.
  drillSize: 20,
  drills: [
    { key: "reading", name: "Comprehension", section: "english", domains: ["elevenplusReading"], blurb: "Stories, a poem and information texts: find the answer, read between the lines and work out what words mean.", basics: ["elevenplusFindIt", "elevenplusReadBetween", "elevenplusWordMeaning"] },
    { key: "spag", name: "Spelling, Punctuation and Grammar", section: "english", domains: ["elevenplusSpag"], blurb: "Spot the mistake or choose No mistake, then pick the right word: tricky spellings, apostrophes, speech marks, word classes." },
    { key: "number", name: "Number and Calculation", section: "maths", domains: ["elevenplusNumber"], blurb: "Written methods, place value, fractions, decimals, percentages, ratio, primes and negative numbers.", basics: ["elevenplusFractionOf", "elevenplusPercentOf", "elevenplusBidmas"] },
    { key: "problem", name: "Problem Solving", section: "maths", domains: ["elevenplusProblem"], blurb: "Money, time, measures, area and perimeter, angles, coordinates, tables, pie charts and simple algebra." },
    { key: "vrWords", name: "Verbal Reasoning: Words", section: "vr", domains: ["elevenplusVrWords"], blurb: "Synonyms, opposites, hidden words, move a letter, compound words, missing letters, odd ones out and analogies.", basics: ["elevenplusHiddenWords", "elevenplusMoveLetter", "elevenplusMissingLetters"] },
    { key: "vrCodes", name: "Verbal Reasoning: Codes", section: "vr", domains: ["elevenplusVrCodes"], blurb: "Letter series, letter and number codes, number series, letter sums, related numbers and logic puzzles.", basics: ["elevenplusAlphabetSteps", "elevenplusLetterCodes", "elevenplusNumberSeries", "elevenplusLetterSums"] },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [60, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score: a solid start",
    70: "70% practice score",
    75: "75% practice score",
    80: "80% practice score, a good target for most grammar schools",
    85: "85% practice score",
    90: "90% practice score, for the most competitive schools",
  },
  testLength: "1 hr 20 min",
  copy: {
    scoreLabel: "Your score",
    heroSubs: [
      "Start with a lesson, then a drill.",
      "One drill at a time. Keep going!",
      "Halfway there. Try a practice test.",
      "Nearly there. Hit your goal on a full test.",
      "Goal hit. You're ready for the 11+!",
    ],
    sourceLine: "Covers the English, maths and verbal reasoning found in multiple-choice 11+ tests, with maths and English from the national curriculum for Key Stage 2. Original questions; not affiliated with any test provider, local authority or grammar school.",
    scoreNote: "Scores here are percent correct. The real 11+ gives an age-standardised score, and each area or school sets its own qualifying mark, so aim for a comfortable margin.",
  },
};
