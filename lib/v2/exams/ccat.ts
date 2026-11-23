import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Criteria Cognitive Aptitude Test (CCAT), Criteria Corp's pre-employment
// cognitive aptitude test. Criteria's own pages (fetched 2026-11-22): 50
// multiple-choice questions in 15 minutes, most candidates do not finish;
// three abilities, verbal ability (sentence completion, vocabulary, word
// comparison), math and logic (arithmetic, proportions, word problems,
// logic) and spatial reasoning (rotating or flipping shapes, patterns, the
// odd one out); no calculator; no penalty for wrong answers; the report gives
// the raw score out of 50, a percentile and three sub-percentiles; no pass
// mark, employers compare the raw score with a suggested range for the role;
// norm median 24. Example items have five choices. Criteria publishes no
// per-area counts, so Tigertest's split is its own: per test vocabulary 6,
// analogies 6, sentence completion 6, arithmetic 6, word problems 8, series
// 5, logic 5, spatial 8. One 50-item, 15-minute section, five options each,
// difficulty mixed; two practice tests, Test 2 held out. Eight drills, one per
// domain, so the dashboard is 10 steps. Spatial items are written in words.
// Score is percent correct, never a CCAT percentile.
// Sources: tools/next100/ccat/sources.md.
const minutes = (n: number) => n * 60;

export const CCAT: ExamV2Config = {
  id: "ccat",
  slug: "/ccat",
  landingPath: "/ccat-practice-test",
  name: "CCAT Practice Test",
  shortName: "CCAT",
  fullName: "Criteria Cognitive Aptitude Test (CCAT)",
  tagline: "50 questions in 15 minutes: vocabulary, analogies, sentence completion, arithmetic, word problems, series, logic and spatial reasoning.",
  icon: "brain",
  theme: { brand: "300 100% 20%", brandDark: "300 100% 14%", brandLight: "300 70% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "ccat",
      name: "Cognitive Aptitude",
      shortName: "Aptitude",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(15) }],
      directions:
        "50 questions in 15 minutes, about 18 seconds each. Most people do not finish, and a wrong answer costs nothing, so never leave a question blank: guess and move on. Work without a calculator. Move freely and flag questions to come back to.",
      scale: percentScale(50),
      domains: ["ccatVocab", "ccatAnalogy", "ccatSentence", "ccatArith", "ccatWord", "ccatSeries", "ccatLogic", "ccatSpatial"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ccatVocab: "Vocabulary",
    ccatAnalogy: "Analogies",
    ccatSentence: "Sentence Completion",
    ccatArith: "Arithmetic",
    ccatWord: "Word Problems",
    ccatSeries: "Number and Letter Series",
    ccatLogic: "Logic",
    ccatSpatial: "Spatial Reasoning",
  },
  drills: [
    { key: "vocab", name: "Vocabulary", section: "ccat", domains: ["ccatVocab"], blurb: "Closest meaning and most nearly opposite meaning, five choices each." },
    { key: "analogy", name: "Analogies", section: "ccat", domains: ["ccatAnalogy"], blurb: "Word comparisons: tool and user, part and whole, degree, cause and effect." },
    { key: "sentence", name: "Sentence Completion", section: "ccat", domains: ["ccatSentence"], blurb: "Pick the word or pair of words that fits the sentence's meaning." },
    { key: "arith", name: "Arithmetic", section: "ccat", domains: ["ccatArith"], blurb: "Order of operations, fractions, decimals, percents and simple equations, no calculator." },
    { key: "word", name: "Word Problems", section: "ccat", domains: ["ccatWord"], blurb: "Averages, proportions, rates, ratios and percents set in everyday work." },
    { key: "series", name: "Number and Letter Series", section: "ccat", domains: ["ccatSeries"], blurb: "Find the rule in number, letter and mixed series and what comes next." },
    { key: "logic", name: "Logic", section: "ccat", domains: ["ccatLogic"], blurb: "True, false or uncertain conclusions, orderings and what must be true." },
    { key: "spatial", name: "Spatial Reasoning", section: "ccat", domains: ["ccatSpatial"], blurb: "Shape series, the odd one out, turns and flips, all described in words." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "20 out of 50",
    50: "25 out of 50, just above the median of 24 that Criteria reports",
    60: "30 out of 50",
    70: "35 out of 50",
    80: "40 out of 50",
  },
  testLength: "15 min",
  copy: {
    heroSubs: [
      "Eight drills and two timed tests. Start with Vocabulary.",
      "Master each drill first.",
      "Take Practice Test 1 against the 15-minute clock.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Original practice questions on the question types Criteria Corp describes for the CCAT. Not affiliated with or endorsed by Criteria Corp. CCAT is a trademark of Criteria Corp.",
    scoreNote: "Percent correct. The real CCAT reports a raw score (the number right out of 50) and a percentile against Criteria's norm group, whose median is 24 out of 50. There is no pass mark: each employer compares the raw score with a range for the role. Tigertest does not estimate a percentile.",
  },
};
