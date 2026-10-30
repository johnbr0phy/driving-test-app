import { ExamV2Config } from "../types";
import { curve } from "../scales";

// KS2 SATs: the Year 6 national curriculum tests in England (Standards and
// Testing Agency), taken in May. Real format, from the STA 2016 KS2 test
// frameworks (still current for the 2026 tests): English reading, one
// booklet of three texts, 50 marks in 60 minutes; grammar, punctuation and
// spelling Paper 1, 50 marks in 45 minutes (Paper 2 is a 20-word spelling
// test read aloud, not modelled); maths Paper 1 arithmetic, 40 marks in 30
// minutes, and Papers 2 and 3 reasoning, 35 marks in 40 minutes each, no
// calculator. Each subject is reported as a scaled score from 80 to 120, and
// 100 is the expected standard; maths is one score from all three papers.
//
// Here each practice test is about 60% of the real length with the time cut
// in proportion (reading 24 questions on three texts in 40 min, GPS 30 in 27
// min, arithmetic 20 in 17 min, reasoning 12 in 20 min per paper), so both
// tests share one scale per subject. Every item is worth one mark, unlike
// the real 1 to 3 mark items. The curves below put the 2026 STA conversion
// tables' raw-score thresholds (reading 25/50 for 100, GPS 34/70, maths
// 56/110) at the same fraction of our item counts: an estimate, not an
// official conversion. The composite is the lowest of the three scaled
// scores, so a goal of 100 means the expected standard in every subject.
// Test 2 is held out of the drills.
const minutes = (n: number) => n * 60;

export const KS2: ExamV2Config = {
  id: "ks2",
  slug: "/ks2-sats",
  landingPath: "/ks2-sats-practice-test",
  name: "KS2 SATs Practice Test",
  shortName: "KS2 SATs",
  fullName: "Key stage 2 national curriculum tests (Year 6 SATs)",
  tagline: "Reading, grammar and maths SATs practice for Year 6, with a short lesson before each drill.",
  icon: "graduation",
  theme: { brand: "280 55% 44%", brandDark: "280 55% 32%", brandLight: "280 100% 96%" },
  breakSeconds: 300,
  sections: [
    {
      key: "reading",
      name: "English reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 24, timeLimit: minutes(40) }],
      directions:
        "Three texts: a story, an information text and a poem, with 8 questions on each. Read each text, then answer its questions. You can look back at the text as often as you like. The real test has 50 marks in 60 minutes; this one is shorter.",
      scale: curve(24, [[0, 80], [5, 90], [12, 100], [15, 105], [19, 110], [23, 120], [24, 120]], 3, 1),
      domains: ["ks2Words", "ks2Retrieve", "ks2Infer"],
    },
    {
      key: "gps",
      name: "Grammar, punctuation and spelling",
      shortName: "GPS",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(27) }],
      directions:
        "Questions on grammar, punctuation and vocabulary, like Paper 1 of the real test. Tick, choose a word, highlight words or sort sentences. The spelling test (Paper 2), which your teacher reads aloud, is not part of this practice.",
      scale: curve(30, [[0, 80], [6, 90], [15, 100], [19, 105], [24, 110], [26, 115], [28, 120], [30, 120]], 3, 1),
      domains: ["ks2Grammar", "ks2Punctuation", "ks2Vocabulary"],
    },
    {
      key: "maths",
      name: "Mathematics",
      shortName: "Maths",
      modules: [
        { module: 1, questionCount: 20, timeLimit: minutes(17) },
        { module: 2, questionCount: 12, timeLimit: minutes(20) },
        { module: 3, questionCount: 12, timeLimit: minutes(20) },
      ],
      directions:
        "Three papers, like the real test: Paper 1 arithmetic (written methods, no calculator), then Papers 2 and 3 reasoning (problems on number, measures, shape and data). Type each answer; fractions can be typed like 3/4. No calculator. Use scrap paper for working out.",
      scale: curve(44, [[0, 80], [9, 90], [22, 100], [31, 105], [38, 110], [42, 115], [44, 120]], 3, 1),
      domains: ["ks2Arithmetic", "ks2Number", "ks2Measure"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ks2Words: "Word meanings",
    ks2Retrieve: "Finding and summarising",
    ks2Infer: "Inference and language",
    ks2Grammar: "Grammar",
    ks2Punctuation: "Punctuation",
    ks2Vocabulary: "Vocabulary",
    ks2Arithmetic: "Arithmetic",
    ks2Number: "Number, ratio and algebra",
    ks2Measure: "Measures, shape and statistics",
  },
  // Five drills, each opening with short Basics lessons, plus the two tests:
  // 12 dashboard steps. 20 questions a drill.
  drillSize: 20,
  drills: [
    { key: "reading", name: "Reading", section: "reading", domains: ["ks2Words", "ks2Retrieve", "ks2Infer"], blurb: "Stories, information texts, poems and instructions: find it, work it out, and explain word choices.", basics: ["ks2Retrieval", "ks2Inference", "ks2WordMeaning"] },
    { key: "grammar", name: "Grammar and vocabulary", section: "gps", domains: ["ks2Grammar", "ks2Vocabulary"], blurb: "Word classes, clauses, tenses, active and passive, the subjunctive, prefixes and suffixes.", basics: ["ks2WordClasses", "ks2RelativeClauses", "ks2ActivePassive", "ks2Subjunctive"] },
    { key: "punctuation", name: "Punctuation", section: "gps", domains: ["ks2Punctuation"], blurb: "Commas, apostrophes, inverted commas, brackets, colons, semi-colons and hyphens.", basics: ["ks2FrontedAdverbials", "apostrophes", "ks2InvertedCommas", "ks2Parenthesis"] },
    { key: "arithmetic", name: "Arithmetic", section: "maths", domains: ["ks2Arithmetic"], blurb: "Column methods, long multiplication, short and long division, fractions, decimals and percentages.", basics: ["ks2OrderOps", "ks2LongMultiplication", "ks2ShortDivision", "ks2AddFractions", "ks2PercentOf"] },
    { key: "reasoning", name: "Reasoning", section: "maths", domains: ["ks2Number", "ks2Measure"], blurb: "Word problems on number, fractions, ratio, time, angles, area and averages.", basics: ["ks2FractionsOfAmounts", "ks2Ratio", "ks2Angles", "ks2Time"] },
  ],
  composite: {
    name: "Lowest subject score",
    min: 80,
    max: 120,
    combine: (sections) => (sections.length ? Math.min(...sections.map((s) => s.scaled)) : 80),
  },
  defaultGoal: 100,
  goalChoices: [100, 105, 110],
  goalNotes: {
    100: "The expected standard in reading, GPS and maths",
    105: "Comfortably above the expected standard",
    110: "A high score in every subject",
  },
  testLength: "2 hr 4 min",
  copy: {
    scoreLabel: "Lowest subject score",
    heroSubs: [
      "Start with a short lesson, then a drill.",
      "One drill at a time. You're doing brilliantly!",
      "Halfway there. Try a practice test.",
      "Nearly there. Keep practising.",
      "SATs ready. Well done!",
    ],
    sourceLine: "Follows the Standards and Testing Agency's key stage 2 test frameworks for English reading, grammar, punctuation and spelling, and mathematics. Original questions; not affiliated with the Department for Education or the Standards and Testing Agency.",
    scoreNote: "Each subject is shown as an estimated scaled score from 80 to 120, where 100 is the expected standard. These practice tests are shorter than the real papers and the conversion is our estimate from published STA tables, not an official result. The score shown is your lowest subject.",
  },
};
