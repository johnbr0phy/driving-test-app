import { ExamV2Config } from "../types";
import { curve } from "../scales";

// Next-Generation ACCUPLACER: untimed, computer adaptive, 20 questions per
// test (Writing 25), each scored 200 to 300. Colleges set their own cut
// scores. Two practice tests at 20 questions per section (Advanced Algebra
// and Functions at 10, limited by the bank); the rest of the bank is in the
// drills.
const acc = (n: number) => curve(n, [[0, 200], [Math.round(n * 0.35), 232], [Math.round(n * 0.6), 252], [Math.round(n * 0.8), 272], [n, 300]], 8, 1);

export const ACCUPLACER: ExamV2Config = {
  id: "accuplacer",
  slug: "/accuplacer",
  landingPath: "/accuplacer-practice-test",
  name: "ACCUPLACER Practice Test",
  shortName: "ACCUPLACER",
  fullName: "Next-Generation ACCUPLACER placement test",
  tagline: "Untimed sections scored 200 to 300, like the real placement test.",
  icon: "pencil",
  theme: { brand: "175 55% 32%", brandDark: "175 55% 20%", brandLight: "175 65% 95%" },
  breakSeconds: 0,
  sections: [
    { key: "reading", name: "Reading", shortName: "Reading", modules: [{ module: 1, questionCount: 20, timeLimit: 0 }], directions: "Each question comes with its own passage. Information and ideas, rhetoric, synthesis and vocabulary in context. The real test is untimed, and so is this.", scale: acc(20), domains: ["accReading"] },
    { key: "writing", name: "Writing", shortName: "Writing", modules: [{ module: 1, questionCount: 20, timeLimit: 0 }], directions: "Revise sentences and paragraphs: expression of ideas and standard English conventions. Untimed.", scale: acc(20), domains: ["accConventions", "accExpression"] },
    { key: "arithmetic", name: "Arithmetic", shortName: "Arith", modules: [{ module: 1, questionCount: 20, timeLimit: 0 }], directions: "Whole numbers, fractions, decimals, percents and number comparisons. The real test provides a calculator only on specific items, so work by hand. Untimed.", scale: acc(20), domains: ["accArithmetic"] },
    { key: "qas", name: "Quantitative Reasoning, Algebra and Statistics", shortName: "QAS", modules: [{ module: 1, questionCount: 20, timeLimit: 0 }], directions: "Rational numbers, ratios, exponents, linear equations and inequalities, graphs, probability and descriptive statistics. Untimed.", scale: acc(20), domains: ["accQAS"] },
    { key: "aaf", name: "Advanced Algebra and Functions", shortName: "AAF", modules: [{ module: 1, questionCount: 10, timeLimit: 0 }], directions: "Linear, quadratic, exponential and other functions, systems, factoring and geometry concepts. Untimed.", scale: acc(10), domains: ["accAAF"] },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2" },
  ],
  domainLabels: {
    accReading: "Reading",
    accConventions: "Standard English Conventions",
    accExpression: "Expression of Ideas",
    accArithmetic: "Arithmetic",
    accQAS: "Quantitative Reasoning, Algebra and Statistics",
    accAAF: "Advanced Algebra and Functions",
    // Results saved before Writing was split into two drills.
    accWriting: "Writing",
  },
  // Writing is split by its two outline areas so each drill opens with a
  // short Basics list; legacyKey carries progress from the old Writing drill.
  drills: [
    { key: "reading", name: "Reading", section: "reading", domains: ["accReading"], blurb: "Passages with main idea, purpose, tone, inference and vocabulary questions.", basics: ["mainIdea", "findingDetail", "inference", "wordsInContext", "authorPurpose", "toneWords", "textStructure", "crossText"] },
    { key: "conventions", legacyKey: "writing", name: "Standard English Conventions", section: "writing", domains: ["accConventions"], blurb: "Agreement, tense, pronouns, apostrophes, confused words and sentence boundaries.", basics: ["subjectVerb", "verbTense", "pronounCase", "apostrophes", "itsIts", "commonlyConfused", "commaSplices", "semicolons", "listIntroCommas", "danglingModifiers"] },
    { key: "expression", legacyKey: "writing", name: "Expression of Ideas", section: "writing", domains: ["accExpression"], blurb: "Transitions, concise wording, tone, and keeping the paragraph on topic.", basics: ["transitions", "concision", "matchingTone", "deletingSentence", "addingSentence", "topicSentences"] },
    { key: "arithmetic", name: "Arithmetic", section: "arithmetic", domains: ["accArithmetic"], blurb: "Fractions, decimals, percents and estimation by hand.", basics: ["fractionOps", "fractionConvert", "decimals", "percents", "percentChange", "ratios", "orderOfOperations", "rounding", "negativeNumbers", "gcfLcm"] },
    { key: "qas", name: "Quantitative Reasoning, Algebra and Statistics", section: "qas", domains: ["accQAS"], blurb: "Ratios, linear equations, graphs, probability and statistics.", basics: ["solveX", "inequalities", "distributing", "exponentRules", "scientificNotation", "slope", "meanMedian", "probabilityTable", "areaPerimeter", "pythagorean"] },
    { key: "aaf", name: "Advanced Algebra and Functions", section: "aaf", domains: ["accAAF"], blurb: "Functions, quadratics, exponentials and systems.", basics: ["factoring", "vertexForm", "functionNotation", "exponentialGrowth", "squareRoots", "sohcahtoa"] },
  ],
  composite: {
    name: "Average section score",
    min: 200,
    max: 300,
    combine: (sections) => Math.round(sections.reduce((a, s) => a + s.scaled, 0) / Math.max(1, sections.length)),
  },
  defaultGoal: 250,
  goalChoices: [237, 250, 263, 276, 285],
  goalNotes: {
    237: "A common cut for college-level English",
    250: "A common cut for college-level math",
    263: "Clears placement at most colleges",
    276: "Skips most prerequisites",
    285: "Top band",
  },
  testLength: "Untimed, about 2 hours",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each section.",
      "Master each drill first.",
      "Halfway there. Try the full test.",
      "Hit your goal on a practice test.",
      "Goal hit. Ask your college about scheduling.",
    ],
    sourceLine: "Based on the College Board Next-Generation ACCUPLACER section outlines. Cut scores are set by each college. The WritePlacer essay is not included. Not affiliated with the College Board.",
    scoreNote: "Section scores are estimates on the 200 to 300 ACCUPLACER scale from a typical conversion; the real test is adaptive. Your college publishes the cut scores that matter.",
  },
};
