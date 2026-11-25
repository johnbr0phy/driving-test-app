import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Qudurat, the General Aptitude Test (GAT) of Qiyas, the National Center for
// Assessment at ETEC (Education and Training Evaluation Commission), Saudi
// Arabia, for university admission. ETEC's GAT page and English Test-Taker's
// Guide (fetched 2026-11-25): five sections of 24 questions, 120 in all, in
// 2 hours 5 minutes; every item multiple choice with four choices; no
// calculator; a time limit per section and no going back; offered in Arabic
// and English, on paper and on computer. Verbal domains weigh 17 / 7 / 10 / 21
// (analogies, sentence completion, contextual error, reading) and the Science
// Tracks quantitative domains 23 / 10 / 4 / 8 (arithmetic, geometry, algebra,
// data analysis). Scored by norm (no pass or fail; 65 average, 81 and above
// the top 5%). Modelled: the English version for Science Tracks, two practice
// tests of the real 120 questions in the real 125 minutes, regrouped by
// section since the split of the five sections is not published (verbal 66 in
// three parts of 22 at 23 minutes, quantitative 54 in two of 27 at 28
// minutes), Test 2 held out, eight drills with Basics on seven. Quantitative
// comparison keeps ETEC's four fixed choices, locked. Score is percent
// correct, never a GAT score. Free (college entrance). The Arabic GAT and the
// Humanities Tracks version are not modelled. Sources:
// tools/next100/qudurat/sources.md.
const minutes = (n: number) => n * 60;

export const QUDURAT: ExamV2Config = {
  id: "qudurat",
  slug: "/qudurat",
  landingPath: "/qudurat-practice-test",
  name: "Qudurat Practice Test (GAT, English)",
  shortName: "Qudurat GAT",
  fullName: "Qudurat, the General Aptitude Test (GAT) of Qiyas, English version",
  tagline: "The GAT in English: 120 verbal and quantitative questions in 2 hours 5 minutes, with analogies, contextual error, reading, arithmetic, geometry and data.",
  icon: "graduation",
  theme: { brand: "280 70% 48%", brandDark: "280 70% 34%", brandLight: "280 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "verbal",
      name: "Verbal Section",
      shortName: "Verbal",
      modules: [
        { module: 1, questionCount: 22, timeLimit: minutes(23) },
        { module: 2, questionCount: 22, timeLimit: minutes(23) },
        { module: 3, questionCount: 22, timeLimit: minutes(23) },
      ],
      directions:
        "Three timed parts of 22 questions, 23 minutes each. Once a part ends you cannot go back to it. **Verbal analogies:** choose the pair of words with the same relationship as the pair in capitals. **Odd one out:** choose the word that does not belong with the other three. **Sentence completion:** choose the word or words that best complete the sentence. **Contextual error:** choose the underlined word that does not fit the meaning of the sentence. **Reading comprehension:** answer from what the passage says.",
      scale: percentScale(66),
      domains: ["qdAnalogy", "qdCompletion", "qdContext", "qdReading"],
    },
    {
      key: "quant",
      name: "Quantitative Section",
      shortName: "Quantitative",
      modules: [
        { module: 1, questionCount: 27, timeLimit: minutes(28) },
        { module: 2, questionCount: 27, timeLimit: minutes(28) },
      ],
      directions:
        "Two timed parts of 27 questions, 28 minutes each, with no calculator, as on the real test. Questions cover arithmetic, geometry, algebra and data from tables, charts and Venn diagrams (shown here as tables). **Comparison questions** give a first value and a second value: choose whether the first is greater, the second is greater, the two are equal, or the information given is insufficient. Choose insufficient only when values that fit the facts give different answers.",
      scale: percentScale(54),
      domains: ["qdArith", "qdGeometry", "qdAlgebra", "qdData"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    qdAnalogy: "Verbal Analogies and Odd One Out",
    qdCompletion: "Sentence Completion",
    qdContext: "Contextual Error",
    qdReading: "Reading Comprehension",
    qdArith: "Arithmetic",
    qdGeometry: "Geometry",
    qdAlgebra: "Algebra",
    qdData: "Data Analysis",
  },
  drills: [
    { key: "analogy", name: "Verbal Analogies", section: "verbal", domains: ["qdAnalogy"], blurb: "Name the relationship in the first pair (part and whole, cause and effect, opposites), then find the pair that matches it. Odd one out too." },
    {
      key: "completion",
      name: "Sentence Completion",
      section: "verbal",
      domains: ["qdCompletion"],
      blurb: "Find the signal word (although, because, but, so) before you read the choices, then pick the word that fits it.",
      basics: ["sentenceCompletion", "logicalCompletion", "transitions", "toneWords"],
    },
    {
      key: "context",
      name: "Contextual Error",
      section: "verbal",
      domains: ["qdContext"],
      blurb: "Four underlined words, one of which breaks the sentence's meaning. Look for the clash with cause, result, contrast or time.",
      basics: ["causeEffect", "sequenceEvents", "preciseWords", "commonlyConfused"],
    },
    {
      key: "reading",
      name: "Reading Comprehension",
      section: "verbal",
      domains: ["qdReading"],
      blurb: "Short passages with questions on the main idea, details, inferences, words in context and what a pronoun refers to.",
      basics: ["mainIdea", "findingDetail", "inference", "wordsInContext"],
    },
    {
      key: "arithmetic",
      name: "Arithmetic",
      section: "quant",
      domains: ["qdArith"],
      blurb: "Fractions, percentages, ratios, powers, sequences, rates, time, averages and probability, without a calculator.",
      basics: ["fractionOps", "percents", "ratios", "rateProblems"],
    },
    {
      key: "geometry",
      name: "Geometry",
      section: "quant",
      domains: ["qdGeometry"],
      blurb: "Angles, triangles and the Pythagorean theorem, areas, perimeters, circles, volumes and the coordinate plane.",
      basics: ["areaPerimeter", "circleBasics", "pythagorean", "triangleAngles", "volume"],
    },
    {
      key: "algebra",
      name: "Algebra",
      section: "quant",
      domains: ["qdAlgebra"],
      blurb: "Equations, inequalities, simplifying expressions and the basic identities, as in GAT for Science Tracks.",
      basics: ["solveX", "inequalities", "distributing", "factoring"],
    },
    {
      key: "data",
      name: "Data Analysis",
      section: "quant",
      domains: ["qdData"],
      blurb: "Read tables, bar charts, pie charts, line graphs and Venn diagrams, then work out totals, shares, changes and averages.",
      basics: ["readingTable", "trends", "percentChange", "meanMedian"],
    },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 70, 80, 90],
  goalNotes: {
    60: "72 out of 120",
    70: "84 out of 120",
    80: "96 out of 120",
    90: "108 out of 120",
  },
  testLength: "2 hr 5 min",
  copy: {
    heroSubs: [
      "Eight drills and two full practice tests. Start with Verbal Analogies.",
      "Master each drill first.",
      "Take Practice Test 1 against the clock.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests. Register for the GAT with ETEC.",
    ],
    sourceLine: "Original practice questions written to ETEC's description of the General Aptitude Test, English version. Not affiliated with or endorsed by ETEC or Qiyas.",
    scoreNote: "Percent correct across 120 questions. The real GAT is norm-referenced: ETEC reports a score that places you among everyone who took it (65 is average and 81 and above is the top 5%), so a percent correct cannot be turned into a GAT score.",
  },
};
