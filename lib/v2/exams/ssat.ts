import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// SSAT Middle Level (Secondary School Admission Test), for students in grades
// 5 to 7 applying to independent schools for grades 6 to 8, run by E3n
// (admission.org; ssat.org redirects there). The real test, per E3n's
// "What's on the Middle Level SSAT?" and the 2026-2027 Candidate Handbook:
// an unscored 25-minute Writing Sample, then Quantitative (25 questions, 30
// min), Reading (40, 40 min), Verbal (60: 30 synonyms and 30 analogies, 30
// min), Quantitative (25, 30 min) and an unscored 15-minute Experimental
// section; two 10-minute breaks; five answer choices; no calculators; 1 point
// for a right answer, a quarter point off for a wrong one, nothing for a
// blank. Each practice test here keeps the four scored sections in that order
// at about half length and the real pace: Quantitative 13 in 16 min, Reading
// 20 (four 5-question passages) in 20 min, Verbal 30 (15 synonyms, then 15
// analogies) in 15 min, Quantitative 12 in 14 min, with one break after
// Reading. The Writing Sample and Experimental section are not modelled.
// Scores here are percent correct, never SSAT scaled scores or percentiles,
// and the guessing penalty is explained, not applied. Test 2 is held out of
// the drills. Bank built by tools/next100/ssat/build.py.
const minutes = (n: number) => n * 60;

export const SSAT: ExamV2Config = {
  id: "ssat",
  slug: "/ssat",
  landingPath: "/ssat-practice-test",
  name: "SSAT Practice Test",
  shortName: "SSAT",
  fullName: "SSAT Middle Level (Secondary School Admission Test)",
  tagline: "Quantitative, Reading and Verbal practice for the Middle Level SSAT, for grades 5 to 7.",
  icon: "graduation",
  theme: { brand: "331 95% 26%", brandDark: "331 95% 19%", brandLight: "331 70% 95%" },
  breakSeconds: 600,
  sections: [
    {
      key: "quant1",
      name: "Quantitative 1",
      shortName: "Quant 1",
      modules: [{ module: 1, questionCount: 13, timeLimit: minutes(16) }],
      calculator: false,
      directions:
        "13 math questions in 16 minutes: arithmetic, simple algebra, geometry and data. No calculator, just like the real SSAT, so use scrap paper. Each question has five answer choices.",
      scale: percentScale(13),
      domains: ["ssatArith", "ssatAlgebra", "ssatGeometry"],
    },
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      breakAfter: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(20) }],
      directions:
        "Four passages with five questions each, 20 minutes in all. Two tell a story, a memory or a poem, and two argue for a point of view. The passage stays beside the questions, so look back at it whenever you need to.",
      scale: percentScale(20),
      domains: ["ssatNarrative", "ssatArgument"],
    },
    {
      key: "verbal",
      name: "Verbal",
      shortName: "Verbal",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(15) }],
      directions:
        "30 questions in 15 minutes: 15 synonyms, then 15 analogies. For a synonym, pick the word closest in meaning to the word in capitals. For an analogy, work out how the first two words are related, then find the choice that is related the same way.",
      scale: percentScale(30),
      domains: ["ssatSynonyms", "ssatAnalogies"],
    },
    {
      key: "quant2",
      name: "Quantitative 2",
      shortName: "Quant 2",
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(14) }],
      calculator: false,
      directions:
        "12 more math questions in 14 minutes, the same kinds as Quantitative 1. No calculator.",
      scale: percentScale(12),
      domains: ["ssatArith", "ssatAlgebra", "ssatGeometry"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ssatArith: "Arithmetic",
    ssatAlgebra: "Elementary Algebra",
    ssatGeometry: "Geometry, Measurement and Data",
    ssatNarrative: "Reading: Narrative Passages",
    ssatArgument: "Reading: Argument Passages",
    ssatSynonyms: "Synonyms",
    ssatAnalogies: "Analogies",
  },
  // Seven drills, one per domain; three open with Basics (twelve dashboard
  // steps with the two tests). Quantitative drill-only items sit in quant1.
  drillSize: 20,
  drills: [
    { key: "arithmetic", name: "Arithmetic", section: "quant1", domains: ["ssatArith"], blurb: "Fractions, decimals, percents, order of operations, primes, factors and negative numbers.", basics: ["fractionOps", "decimals", "percents", "orderOfOperations"] },
    { key: "algebra", name: "Elementary Algebra", section: "quant1", domains: ["ssatAlgebra"], blurb: "Equations, expressions, ratios, rates and number patterns.", basics: ["solveX", "substitution", "ratios", "rateProblems"] },
    { key: "geometry", name: "Geometry and Data", section: "quant1", domains: ["ssatGeometry"], blurb: "Perimeter, area, volume, angles, units, the coordinate grid, averages and probability." },
    { key: "narrative", name: "Reading: Stories and Poems", section: "reading", domains: ["ssatNarrative"], blurb: "Stories, a poem and a personal essay: main idea, details, inference, tone and word meaning." },
    { key: "argument", name: "Reading: Arguments", section: "reading", domains: ["ssatArgument"], blurb: "Passages that argue a point: the main idea, the evidence, the author's purpose and attitude.", basics: ["mainIdea", "findingDetail", "authorPurpose", "claimSupport"] },
    { key: "synonyms", name: "Synonyms", section: "verbal", domains: ["ssatSynonyms"], blurb: "Pick the word closest in meaning, and learn the look-alike traps." },
    { key: "analogies", name: "Analogies", section: "verbal", domains: ["ssatAnalogies"], blurb: "Name the relationship between two words, then find the pair that matches it." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score: a solid start",
    65: "65% practice score",
    70: "70% practice score",
    75: "75% practice score, a good all-round target",
    80: "80% practice score",
    85: "85% practice score, for very selective schools",
    90: "90% practice score",
  },
  testLength: "1 hr 5 min plus a break",
  copy: {
    scoreLabel: "Your score",
    heroSubs: [
      "Start with Arithmetic basics, then the drill.",
      "One drill at a time. Keep going!",
      "Take a practice test to see your score.",
      "Nearly there. Hit your goal on a full test.",
      "Goal hit. You're ready for the SSAT!",
    ],
    sourceLine: "Built on E3n's published Middle Level SSAT sections, question counts and timing (checked November 2026). Original questions; not affiliated with E3n or the SSAT.",
    scoreNote: "Scores here are percent correct. The real SSAT reports a scaled score and a percentile for each section, compared with other students in the same grade, and schools read them in their own way. On the real Middle Level test a wrong answer also costs a quarter of a point and a blank costs nothing, so skip a question you cannot narrow down, but guess once you can rule out two or more choices.",
  },
};
