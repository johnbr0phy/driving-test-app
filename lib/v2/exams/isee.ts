import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// ISEE (Independent School Entrance Exam), Middle Level, for students applying
// to Grades 7 and 8. The test is run by E3n, the nonprofit formed by the
// merger of ERB and EMA. Real format (ISEE Quick Facts Guide 2026-2027): Verbal
// Reasoning 40 questions in 20 min, Quantitative Reasoning 37 in 35, a 10-minute
// break, Reading Comprehension 36 in 35, Mathematics Achievement 47 in 40, a
// 10-minute break and an unscored essay (30 min, not modelled). No calculator;
// scores count right answers only and are reported as scaled scores,
// percentiles and stanines against same-grade applicants. Question types and
// categories from ERB's "What to Expect on the ISEE" Middle Level guide:
// synonyms and one-word sentence completions; word problems and quantitative
// comparisons; six passages with six questions each (main idea, supporting
// ideas, inference, vocabulary, organization and logic, tone and style); math
// on the NCTM strands. Here each section is about half its real length at the
// real pace, scored as percent correct (never stanines). Test 2 is held out of
// the drills. Bank built by tools/next100/isee/build.py.
const minutes = (n: number) => n * 60;

/** Each section counts equally. */
function averageOfSections(sections: SectionResult[]): number {
  const scored = sections.filter((s) => s.total > 0);
  if (!scored.length) return 0;
  return Math.round(scored.reduce((a, s) => a + (s.raw / s.total) * 100, 0) / scored.length);
}

export const ISEE: ExamV2Config = {
  id: "isee",
  slug: "/isee",
  landingPath: "/isee-practice-test",
  name: "ISEE Middle Level Practice Test",
  shortName: "ISEE",
  fullName: "ISEE Middle Level (Independent School Entrance Exam)",
  tagline: "Verbal, Quantitative, Reading and Math practice for the ISEE Middle Level, timed like the real test.",
  icon: "graduation",
  theme: { brand: "136 55% 22%", brandDark: "136 55% 15%", brandLight: "136 45% 95%" },
  breakSeconds: minutes(10),
  sections: [
    {
      key: "verbal",
      name: "Verbal Reasoning",
      shortName: "Verbal",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(10) }],
      directions:
        "20 questions in 10 minutes, the real test's pace. First, synonyms: choose the word closest in meaning to the word in capitals (the choices are in alphabetical order). Then sentence completions: choose the word that best fits the blank. There is no penalty for a wrong answer, so answer every question.",
      scale: percentScale(20),
      domains: ["iseeSynonyms", "iseeSentence"],
    },
    {
      key: "quant",
      name: "Quantitative Reasoning",
      shortName: "Quantitative",
      modules: [{ module: 1, questionCount: 19, timeLimit: minutes(18) }],
      calculator: false,
      breakAfter: true,
      directions:
        "19 questions in 18 minutes, no calculator. Word problems first, then quantitative comparisons: compare the quantity in Column A with the quantity in Column B. Most need little or no calculation; look for the relationship. Use scrap paper for working.",
      scale: percentScale(19),
      domains: ["iseeQrWord", "iseeQrCompare"],
    },
    {
      key: "reading",
      name: "Reading Comprehension",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 18, timeLimit: minutes(18) }],
      directions:
        "Three passages with six questions each, 18 minutes. The passage stays beside the questions, so look back whenever you need to. Questions ask about the main idea, details, inferences, word meanings, how the passage is organized and the author's tone.",
      scale: percentScale(18),
      domains: ["iseeRcMain", "iseeRcSupport", "iseeRcInference", "iseeRcVocab", "iseeRcOrg", "iseeRcTone"],
    },
    {
      key: "math",
      name: "Mathematics Achievement",
      shortName: "Math",
      modules: [{ module: 1, questionCount: 24, timeLimit: minutes(20) }],
      calculator: false,
      directions:
        "24 questions in 20 minutes, no calculator. Numbers and operations, algebra, geometry and measurement, and data and probability, with more calculation than the Quantitative section. Know your metric conversions; customary ones are given when needed.",
      scale: percentScale(24),
      domains: ["iseeMaNumber", "iseeMaAlgebra", "iseeMaGeometry", "iseeMaData"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    iseeSynonyms: "Synonyms",
    iseeSentence: "Sentence Completion",
    iseeQrWord: "Word Problems",
    iseeQrCompare: "Quantitative Comparison",
    iseeRcMain: "Main Idea",
    iseeRcSupport: "Supporting Ideas",
    iseeRcInference: "Inference",
    iseeRcVocab: "Vocabulary in Context",
    iseeRcOrg: "Organization and Logic",
    iseeRcTone: "Tone, Style and Figurative Language",
    iseeMaNumber: "Numbers and Operations",
    iseeMaAlgebra: "Algebra",
    iseeMaGeometry: "Geometry and Measurement",
    iseeMaData: "Data Analysis and Probability",
  },
  // Eight drills of 20 exam-level items. Two open with Basics (no skill opens
  // two drills), so the dashboard is 8 + 2 Basics + 2 tests = 12 steps.
  drillSize: 20,
  drills: [
    { key: "synonyms", name: "Synonyms", section: "verbal", domains: ["iseeSynonyms"], blurb: "Pick the word closest in meaning to a word in capitals, with the choices in alphabetical order." },
    { key: "sentences", name: "Sentence Completion", section: "verbal", domains: ["iseeSentence"], blurb: "Use clue words like because, although and unlike to find the word that fits the blank." },
    { key: "wordProblems", name: "Word Problems", section: "quant", domains: ["iseeQrWord"], blurb: "Reasoning problems on number, ratio, patterns, probability and measurement that need little calculation." },
    { key: "comparisons", name: "Quantitative Comparison", section: "quant", domains: ["iseeQrCompare"], blurb: "Compare Column A with Column B, and spot when the relationship cannot be determined." },
    { key: "readingIdeas", name: "Reading: Ideas and Details", section: "reading", domains: ["iseeRcMain", "iseeRcSupport", "iseeRcVocab"], blurb: "Main idea, supporting details and word meaning in context.", basics: ["mainIdea", "findingDetail", "wordsInContext", "claimSupport"] },
    { key: "readingCraft", name: "Reading: Inference and Craft", section: "reading", domains: ["iseeRcInference", "iseeRcOrg", "iseeRcTone"], blurb: "Inferences, how a passage is organized, and the author's tone and figurative language." },
    { key: "numberAlgebra", name: "Numbers and Algebra", section: "math", domains: ["iseeMaNumber", "iseeMaAlgebra"], blurb: "Fractions, decimals, percents, integers, ratios, expressions, equations and patterns.", basics: ["fractionOps", "percents", "ratios", "solveX"] },
    { key: "geometryData", name: "Geometry, Measurement and Data", section: "math", domains: ["iseeMaGeometry", "iseeMaData"], blurb: "Angles, area, volume, circles, conversions, averages and probability." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: averageOfSections },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target, solid across all four sections",
    80: "80% practice score target",
    85: "85% practice score target, aiming for a competitive school",
    90: "90% practice score target",
  },
  testLength: "1 hr 6 min",
  copy: {
    heroSubs: [
      "Drill each section, then take a timed practice test.",
      "Master each drill first.",
      "Take a full practice test to see your score.",
      "Hit your goal on a full practice test.",
      "Goal hit. You're ready for test day.",
    ],
    sourceLine: "Built on the published ISEE Middle Level format and question types from E3n (ERB) (checked November 2026). Original questions; not affiliated with E3n, ERB or the ISEE. The essay is not included.",
    scoreNote: "Scores here are percent correct per section, with the overall the average of the four. The real ISEE reports scaled scores, percentile ranks and stanines that compare a student only with other applicants to the same grade, which a practice test cannot do, so use this to find strong and weak areas, not to predict a stanine. Schools set their own expectations; there is no pass mark.",
  },
};
