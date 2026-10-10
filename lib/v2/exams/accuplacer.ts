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
    { key: "writing", name: "Writing", shortName: "Writing", modules: [{ module: 1, questionCount: 20, timeLimit: 0 }], directions: "Revise sentences and paragraphs: expression of ideas and standard English conventions. Untimed.", scale: acc(20), domains: ["accWriting"] },
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
    accWriting: "Writing",
    accArithmetic: "Arithmetic",
    accQAS: "Quantitative Reasoning, Algebra and Statistics",
    accAAF: "Advanced Algebra and Functions",
  },
  drills: [
    { key: "reading", name: "Reading", section: "reading", domains: ["accReading"], blurb: "Passages with main idea, purpose, tone, inference and vocabulary questions.", weight: "20 questions on the real test" },
    { key: "writing", name: "Writing", section: "writing", domains: ["accWriting"], blurb: "Fix the bracketed part, pick the best revision, keep the paragraph on topic.", weight: "25 questions on the real test" },
    { key: "arithmetic", name: "Arithmetic", section: "arithmetic", domains: ["accArithmetic"], blurb: "Fractions, decimals, percents and estimation by hand.", weight: "20 questions on the real test" },
    { key: "qas", name: "Quantitative Reasoning, Algebra and Statistics", section: "qas", domains: ["accQAS"], blurb: "Ratios, linear equations, graphs, probability and statistics.", weight: "20 questions on the real test" },
    { key: "aaf", name: "Advanced Algebra and Functions", section: "aaf", domains: ["accAAF"], blurb: "Functions, quadratics, exponentials and systems.", weight: "20 questions on the real test" },
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
      "Five section drills on your phone, then two untimed placement tests on a desktop.",
      "Mastery first. Each drill is one ACCUPLACER section.",
      "Halfway through the sections. The practice tests will show your placement band.",
      "Hit your goal on a practice test to finish the plan.",
      "Goal hit. Ask your college how to schedule the ACCUPLACER.",
    ],
    sourceLine: "Based on the College Board Next-Generation ACCUPLACER section outlines. Cut scores are set by each college. The WritePlacer essay is not included. Not affiliated with the College Board.",
    scoreNote: "Section scores are estimates on the 200 to 300 ACCUPLACER scale from a typical conversion; the real test is adaptive. Your college publishes the cut scores that matter.",
  },
};
