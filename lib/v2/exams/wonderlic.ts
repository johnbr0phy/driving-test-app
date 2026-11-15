import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Wonderlic cognitive ability test: the 12-minute cognitive section of the
// Wonderlic Personnel Test (WPT-R) and of Wonderlic Select / WonScore, the
// pre-employment assessment. Wonderlic's own pages (fetched 2026-11-14): 50
// questions in 12 minutes, on "simple math, basic logic, language
// comprehension, spatial reasoning, pattern identification", getting harder
// as it goes; the test-taker hub names word problems, number series, logic
// puzzles, vocabulary and analogies. Scored from the whole response pattern
// (each item weighted by difficulty and guessing), with no universal pass
// mark: employers compare a score with the profile for the role; the classic
// 50-question test averages about 20. Wonderlic publishes no per-area counts,
// so Tigertest's split is its own: per test vocabulary 8, verbal reasoning 7,
// arithmetic 8, word problems 8, series 7, logic 7, spatial 5. A test is one
// 50-item, 12-minute section ordered easy to hard; two practice tests, Test 2
// held out. Seven drills, one per domain, so the dashboard is 9 steps. Spatial
// items are written in words. Score is percent correct, never a Wonderlic
// score. Sources: tools/next100/wonderlic/sources.md.
const minutes = (n: number) => n * 60;

export const WONDERLIC: ExamV2Config = {
  id: "wonderlic",
  slug: "/wonderlic",
  landingPath: "/wonderlic-practice-test",
  name: "Wonderlic Practice Test",
  shortName: "Wonderlic",
  fullName: "Wonderlic Cognitive Ability Test",
  tagline: "50 questions in 12 minutes: vocabulary, verbal reasoning, arithmetic, word problems, number series, logic and spatial reasoning.",
  icon: "brain",
  theme: { brand: "90 90% 26%", brandDark: "90 90% 19%", brandLight: "90 70% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "wpt",
      name: "Cognitive Ability",
      shortName: "Cognitive",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(12) }],
      directions:
        "50 questions in 12 minutes, about 14 seconds each, getting harder as you go. Do not get stuck: if a question takes too long, make your best guess and move on. Work without a calculator. Move freely and flag questions to come back to.",
      scale: percentScale(50),
      domains: ["wonderVocab", "wonderVerbal", "wonderArith", "wonderWord", "wonderSeries", "wonderLogic", "wonderSpatial"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    wonderVocab: "Vocabulary",
    wonderVerbal: "Verbal Reasoning",
    wonderArith: "Arithmetic",
    wonderWord: "Word Problems",
    wonderSeries: "Number and Letter Series",
    wonderLogic: "Logic",
    wonderSpatial: "Spatial Reasoning",
  },
  drills: [
    { key: "vocab", name: "Vocabulary", section: "wpt", domains: ["wonderVocab"], blurb: "Closest meaning, opposite meaning and the word that fits a sentence." },
    { key: "verbal", name: "Verbal Reasoning", section: "wpt", domains: ["wonderVerbal"], blurb: "Word analogies, odd one out, comparing the meaning of two sayings and reading carefully." },
    { key: "arith", name: "Arithmetic", section: "wpt", domains: ["wonderArith"], blurb: "Whole numbers, fractions, decimals and percents, done fast without a calculator." },
    { key: "word", name: "Word Problems", section: "wpt", domains: ["wonderWord"], blurb: "Money, time, rates, ratios, averages and shared work set in everyday jobs." },
    { key: "series", name: "Number and Letter Series", section: "wpt", domains: ["wonderSeries"], blurb: "Spot the rule in number, letter and mixed series and find what comes next." },
    { key: "logic", name: "Logic", section: "wpt", domains: ["wonderLogic"], blurb: "True, false or uncertain arguments, ordering puzzles and if-then reasoning." },
    { key: "spatial", name: "Spatial Reasoning", section: "wpt", domains: ["wonderSpatial"], blurb: "Directions and turns, clock hands, mirror images, folded paper and cubes, all in words." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 50,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "About the classic test's average of 20 out of 50",
    50: "Above average: 25 out of 50",
    60: "Well above the classic test's average: 30 out of 50",
    70: "35 out of 50",
    80: "40 out of 50",
  },
  testLength: "12 min",
  copy: {
    heroSubs: [
      "Drill each question type, then take a timed test.",
      "Master each drill first.",
      "Take Practice Test 1 against the 12-minute clock.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the Wonderlic.",
    ],
    sourceLine: "Original practice questions on the question types Wonderlic describes for its cognitive ability test. Not affiliated with or endorsed by Wonderlic. Wonderlic is a trademark of Wonderlic, Inc.",
    scoreNote: "Percent correct. Wonderlic does not score a plain count of right answers: it weights each question by its difficulty and the effect of guessing, and there is no universal pass mark, since each employer compares results with the profile for the role. Wonderlic says the classic 50-question test averages a score of about 20, so 40% here is roughly average. This is not a Wonderlic score.",
  },
};
