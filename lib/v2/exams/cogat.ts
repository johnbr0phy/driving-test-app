import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// CogAT (Cognitive Abilities Test, Riverside Insights), Forms 7 and 8, Levels 9 to 12
// (grades 3 to 6). Riverside's CogAT Overview Brochure lists three batteries and nine
// tests; at Level 9 and up the Verbal Battery is Verbal Analogies, Sentence Completion and
// Verbal Classification, the Quantitative Battery is Number Analogies, Number Puzzles and
// Number Series, each about 10 minutes, and the Nonverbal Battery is Figure Matrices, Paper
// Folding and Figure Classification. The Verbal and Quantitative items at Level 9 and up are
// text, so both batteries are modelled here: one section each, its three tests in order,
// 12 questions a test (Riverside publishes times, not counts; 12 is ours), 30 minutes a
// battery. The Nonverbal Battery is pictures at every level and is not modelled. Percent
// correct only, never age scores, stanines or percentiles. Test 2 is held out of the
// drills. Bank built by tools/next100/cogat/build.py.

/** Each battery counts equally. */
function averageOfSections(sections: SectionResult[]): number {
  const scored = sections.filter((s) => s.total > 0);
  if (!scored.length) return 0;
  return Math.round(scored.reduce((a, s) => a + (s.raw / s.total) * 100, 0) / scored.length);
}

export const COGAT: ExamV2Config = {
  id: "cogat",
  slug: "/cogat",
  landingPath: "/cogat-practice-test",
  name: "CogAT Practice Test",
  shortName: "CogAT",
  fullName: "CogAT Levels 9-12 (Grades 3-6)",
  tagline: "Verbal and Quantitative practice for the CogAT test in grades 3 to 6.",
  icon: "graduation",
  theme: { brand: "174 40% 18%", brandDark: "174 40% 12%", brandLight: "174 35% 95%" },
  breakSeconds: 300,
  breakNote: "Take a short break before the Quantitative Battery.",
  sections: [
    {
      key: "verbal",
      name: "Verbal Battery",
      shortName: "Verbal",
      modules: [{ module: 1, questionCount: 36, timeLimit: 1800 }],
      directions:
        "36 word questions in 30 minutes, in three parts like the real Verbal Battery: Verbal Analogies (find how two words go together, then finish another pair the same way), Sentence Completion (pick the word that best fills the blank) and Verbal Classification (pick the word that belongs with three others). On the real test each part has its own 10-minute clock.",
      scale: percentScale(36),
      domains: ["cogatVerbalAnalogies", "cogatSentenceCompletion", "cogatVerbalClassification"],
    },
    {
      key: "quant",
      name: "Quantitative Battery",
      shortName: "Quantitative",
      modules: [{ module: 1, questionCount: 36, timeLimit: 1800 }],
      calculator: false,
      directions:
        "36 number questions in 30 minutes, in three parts like the real Quantitative Battery: Number Analogies (find the rule that turns each number into the next, then use it), Number Puzzles (find the number that makes the equation true) and Number Series (find the pattern and the next number). Use scrap paper, no calculator. On the real test each part has its own 10-minute clock.",
      scale: percentScale(36),
      domains: ["cogatNumberAnalogies", "cogatNumberPuzzles", "cogatNumberSeries"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cogatVerbalAnalogies: "Verbal Analogies",
    cogatSentenceCompletion: "Sentence Completion",
    cogatVerbalClassification: "Verbal Classification",
    cogatNumberAnalogies: "Number Analogies",
    cogatNumberPuzzles: "Number Puzzles",
    cogatNumberSeries: "Number Series",
  },
  // One drill per CogAT test, 20 exam-level items each, no Basics.
  drillSize: 20,
  drills: [
    { key: "verbalAnalogies", name: "Verbal Analogies", section: "verbal", domains: ["cogatVerbalAnalogies"], blurb: "Find how two words are related, then finish another pair the same way." },
    { key: "sentenceCompletion", name: "Sentence Completion", section: "verbal", domains: ["cogatSentenceCompletion"], blurb: "Read a sentence with a blank and pick the word that fits it best." },
    { key: "verbalClassification", name: "Verbal Classification", section: "verbal", domains: ["cogatVerbalClassification"], blurb: "See what three words have in common and pick the word that belongs with them." },
    { key: "numberAnalogies", name: "Number Analogies", section: "quant", domains: ["cogatNumberAnalogies"], blurb: "Find the rule that turns one number into another, then use it on a new number." },
    { key: "numberPuzzles", name: "Number Puzzles", section: "quant", domains: ["cogatNumberPuzzles"], blurb: "Find the missing number that makes both sides of an equation equal." },
    { key: "numberSeries", name: "Number Series", section: "quant", domains: ["cogatNumberSeries"], blurb: "Spot the pattern in a row of numbers and find the number that comes next." },
  ],
  composite: { name: "Average score", min: 0, max: 100, combine: averageOfSections },
  defaultGoal: 80,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target",
    80: "80% practice score target, solid on both batteries",
    85: "85% practice score target",
    90: "90% practice score target, ready for the hardest questions",
  },
  testLength: "1 hr 5 min",
  copy: {
    heroSubs: [
      "Six drills, one for each CogAT test, then two practice tests.",
      "Master each drill first.",
      "Take a full practice test to see your score.",
      "Hit your goal on a full practice test.",
      "Goal hit. You're ready for test day.",
    ],
    sourceLine: "Built on Riverside Insights' published descriptions of the CogAT Form 7 and 8 tests (checked November 2026). Original questions; not affiliated with Riverside Insights.",
    scoreNote: "Scores here are percent correct per battery, not CogAT scores. The real CogAT compares your child with others of the same age (Standard Age Score, age percentile rank and stanine) and also has a Nonverbal Battery of picture puzzles, which this practice test does not include. Use it to find strong and weak areas, not to predict a CogAT score.",
  },
};
