import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// NSW Selective High School Placement Test (NSW Department of Education),
// sat in Year 6 for entry to Year 7 at a selective high school. Computer-based,
// four tests in one sitting, each weighted 25%: Reading (17 questions with 38
// answers, 3 questions having several parts, 45 min), Mathematical Reasoning
// (35 questions, five options, 40 min, no calculator), Thinking Skills (40
// questions, four options, 40 min) and Writing (one typed response, 30 min).
// Writing is not modelled. Reading here is 38 items, one per answer: a
// narrative extract (6), a poem (5), an article (5 plus an inline-cloze item),
// a factual text with six sentences removed (6, one per gap) and two
// comparison sets (four extracts A to D, 10; two texts, 5). Results on the
// real test are scaled and combined with no pass mark, so scores here are
// percent correct per section and the overall is their plain average (each
// real test carries equal weight). Test 2 is held out of the drills so it
// measures readiness rather than memory. Bank built by tools/nswsel/build.py.
const minutes = (n: number) => n * 60;

/** Each section counts equally, like the real test's 25% weightings. */
function averageOfSections(sections: SectionResult[]): number {
  const scored = sections.filter((s) => s.total > 0);
  if (!scored.length) return 0;
  return Math.round(scored.reduce((a, s) => a + (s.raw / s.total) * 100, 0) / scored.length);
}

export const NSWSEL: ExamV2Config = {
  id: "nswsel",
  slug: "/nsw-selective",
  landingPath: "/nsw-selective-test-practice-test",
  name: "NSW Selective Test Practice",
  shortName: "NSW Selective",
  fullName: "NSW Selective High School Placement Test",
  tagline: "Reading, Mathematical Reasoning and Thinking Skills, timed like the real Year 6 test.",
  icon: "graduation",
  theme: { brand: "250 50% 42%", brandDark: "250 50% 30%", brandLight: "250 100% 96%" },
  breakSeconds: 300,
  sections: [
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 38, timeLimit: minutes(45) }],
      directions:
        "38 answers in 45 minutes, like the real test's 17 questions with 38 answers. A story extract, a poem and an article with single questions, then three sets with several parts: a factual text with six sentences taken out (choose the sentence for each gap), four short extracts to match to statements, and two texts to compare. Keep an eye on the clock: the multi-part sets take longer.",
      scale: percentScale(38),
      domains: ["nswsComprehension", "nswsCohesion", "nswsCompare"],
    },
    {
      key: "maths",
      name: "Mathematical Reasoning",
      shortName: "Maths",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(40) }],
      directions:
        "35 questions in 40 minutes, each with five options, as on the real test. No calculator: use paper for working. Number and algebra, measurement and space, and statistics and probability, mostly as worded problems. A little over a minute a question, so skip a slow one and come back.",
      scale: percentScale(35),
      domains: ["nswsNumber", "nswsMeasure", "nswsData"],
    },
    {
      key: "thinking",
      name: "Thinking Skills",
      shortName: "Thinking",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(40) }],
      directions:
        "40 questions in 40 minutes, each with four options, as on the real test. Critical thinking (strengthen or weaken an argument, spot the mistake or the assumption, decide what must be true, judge whose reasoning is right) and problem solving (ordering clues, codes, time, counting and number puzzles). No figures here; the real test also has some shape and pattern puzzles.",
      scale: percentScale(40),
      domains: ["nswsCritical", "nswsProblem"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    nswsComprehension: "Reading Texts",
    nswsCohesion: "Sentences Removed",
    nswsCompare: "Comparing Extracts",
    nswsNumber: "Number and Algebra",
    nswsMeasure: "Measurement and Space",
    nswsData: "Statistics and Probability",
    nswsCritical: "Critical Thinking",
    nswsProblem: "Problem Solving",
  },
  // Five drills of 20 exam-level items. Reading, both maths drills and
  // critical thinking open with shared Basics, so the dashboard is
  // 4 x 2 + 1 + 2 tests = 11 steps.
  drillSize: 20,
  drills: [
    { key: "reading", name: "Reading", section: "reading", domains: ["nswsComprehension", "nswsCohesion", "nswsCompare"], blurb: "Stories, poems and articles, sentences taken out of a text, and extracts to match and compare.", basics: ["mainIdea", "findingDetail", "inference", "wordsInContext", "toneWords", "authorPurpose", "logicalCompletion", "crossText"] },
    { key: "number", name: "Number and Algebra", section: "maths", domains: ["nswsNumber"], blurb: "Fractions, decimals, percentages, ratio, factors and multiples, patterns and number sentences, without a calculator.", basics: ["decimals", "orderOfOperations", "fractionConvert", "fractionOps", "percents", "ratios", "gcfLcm", "wordProblems"] },
    { key: "measure", name: "Measurement, Space and Data", section: "maths", domains: ["nswsMeasure", "nswsData"], blurb: "Area, volume, units, time, angles and speed, then averages, tables and chance.", basics: ["unitConversion", "areaPerimeter", "volume", "triangleAngles", "rateProblems", "meanMedian", "probabilityTable", "readingTable"] },
    { key: "critical", name: "Critical Thinking", section: "thinking", domains: ["nswsCritical"], blurb: "Strengthen and weaken arguments, find the flaw or the assumption, and decide what must be true.", basics: ["claimSupport", "inference"] },
    { key: "problem", name: "Problem Solving", section: "thinking", domains: ["nswsProblem"], blurb: "Ordering clues, truth and lies, codes, timetables, counting and number puzzles." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: averageOfSections },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target, a solid base for most selective schools",
    80: "80% practice score target",
    85: "85% practice score target, aiming for the most competitive schools",
    90: "90% practice score target",
  },
  testLength: "2 hr 15 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each test.",
      "Master each drill first.",
      "Halfway there. Try a full practice test.",
      "Hit your goal on a full practice test.",
      "Goal hit. You're ready for test day.",
    ],
    sourceLine: "Based on the NSW Department of Education's published test format for the Selective High School Placement Test (checked October 2026). Original questions; not affiliated with the NSW Department of Education. The Writing test is not included.",
    scoreNote: "Scores here are percent correct, with the overall the average of the three sections. The real test is scaled and combined with Writing, and there is no pass mark: places go in order of merit and each school's entry score changes every year, so treat this as a readiness check, not a prediction.",
  },
};
