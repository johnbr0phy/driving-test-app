import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// NSW Opportunity Class Placement Test (NSW Department of Education), sat in
// Year 4 for a Year 5 place in an opportunity class. Computer-based, three
// multiple-choice tests in one sitting, each weighted one third: Reading (14
// questions with 33 answers, 3 questions having several parts, 40 min),
// Mathematical Reasoning (35 questions, five options, 40 min, no calculator)
// and Thinking Skills (30 questions, four options, 30 min). There is no
// Writing test. Reading here is 33 items, one per answer: a story extract (5),
// a poem (3) and an article (3) with single questions, then three multi-part
// sets: a factual text with six sentences removed (6, one per gap), four short
// extracts A to D to match to statements (8) and two texts to compare, each
// statement true of Text A, Text B, both or neither (8). Results on the real
// test are scaled and combined with no pass mark, so scores here are percent
// correct per section and the overall is their plain average (each real test
// carries equal weight). Test 2 is held out of the drills so it measures
// readiness rather than memory. Bank built by tools/ocnsw/build.py.
const minutes = (n: number) => n * 60;

/** Each section counts equally, like the real test's one-third weightings. */
function averageOfSections(sections: SectionResult[]): number {
  const scored = sections.filter((s) => s.total > 0);
  if (!scored.length) return 0;
  return Math.round(scored.reduce((a, s) => a + (s.raw / s.total) * 100, 0) / scored.length);
}

export const OCNSW: ExamV2Config = {
  id: "ocnsw",
  slug: "/oc-test",
  landingPath: "/oc-test-practice-test",
  name: "OC Test Practice",
  shortName: "OC Test",
  fullName: "NSW Opportunity Class Placement Test",
  tagline: "Reading, Mathematical Reasoning and Thinking Skills, timed like the real Year 4 OC test.",
  icon: "graduation",
  theme: { brand: "325 90% 44%", brandDark: "325 90% 33%", brandLight: "325 70% 96%" },
  breakSeconds: 300,
  sections: [
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 33, timeLimit: minutes(40) }],
      directions:
        "33 answers in 40 minutes, like the real test's 14 questions with 33 answers. A story, a poem and an article with single questions, then three sets with several parts: a factual text with six sentences taken out (choose the sentence for each gap), four short extracts to match to statements, and two texts to compare. The sets take longer, so keep an eye on the clock.",
      scale: percentScale(33),
      domains: ["ocComprehension", "ocCohesion", "ocCompare"],
    },
    {
      key: "maths",
      name: "Mathematical Reasoning",
      shortName: "Maths",
      modules: [{ module: 1, questionCount: 35, timeLimit: minutes(40) }],
      directions:
        "35 questions in 40 minutes, each with five options, as on the real test. No calculator: use paper for working. Number and patterns, measurement and space, and data and chance, mostly as worded problems. A little over a minute a question, so skip a slow one and come back.",
      scale: percentScale(35),
      domains: ["ocNumber", "ocMeasure", "ocData"],
    },
    {
      key: "thinking",
      name: "Thinking Skills",
      shortName: "Thinking",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(30) }],
      directions:
        "30 questions in 30 minutes, each with four options, as on the real test. Critical thinking (what makes an argument stronger or weaker, the mistake in someone's thinking, what must be true, whose reasoning is right) and problem solving (ordering clues, codes, time, counting and number puzzles). One minute a question. No figures here; the real test also has some shape and pattern puzzles.",
      scale: percentScale(30),
      domains: ["ocCritical", "ocProblem"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ocComprehension: "Reading Texts",
    ocCohesion: "Sentences Removed",
    ocCompare: "Comparing Texts",
    ocNumber: "Number and Patterns",
    ocMeasure: "Measurement and Space",
    ocData: "Data and Chance",
    ocCritical: "Critical Thinking",
    ocProblem: "Problem Solving",
  },
  // Five drills of 20 exam-level items. Reading, both maths drills and
  // critical thinking open with shared Basics, so the dashboard is
  // 4 x 2 + 1 + 2 tests = 11 steps.
  drillSize: 20,
  drills: [
    { key: "reading", name: "Reading", section: "reading", domains: ["ocComprehension", "ocCohesion", "ocCompare"], blurb: "Stories, poems and articles, sentences taken out of a text, and short texts to match and compare.", basics: ["mainIdea", "findingDetail", "inference", "wordsInContext", "toneWords", "authorPurpose", "logicalCompletion", "crossText"] },
    { key: "number", name: "Number and Patterns", section: "maths", domains: ["ocNumber"], blurb: "Place value, the four operations, fractions, money, patterns and number puzzles, without a calculator.", basics: ["orderOfOperations", "fractionConvert", "fractionOps", "decimals", "wordProblems"] },
    { key: "measure", name: "Measurement, Space and Data", section: "maths", domains: ["ocMeasure", "ocData"], blurb: "Length, area, time, mass, angles and shapes, then tables, graphs and chance.", basics: ["unitConversion", "areaPerimeter", "volume", "readingTable", "probabilityTable"] },
    { key: "critical", name: "Critical Thinking", section: "thinking", domains: ["ocCritical"], blurb: "Make arguments stronger or weaker, spot the mistake, and decide what must be true.", basics: ["claimSupport", "inference"] },
    { key: "problem", name: "Problem Solving", section: "thinking", domains: ["ocProblem"], blurb: "Ordering clues, truth and lies, codes, timetables, counting and number puzzles." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: averageOfSections },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target, a solid base for most OC schools",
    80: "80% practice score target",
    85: "85% practice score target, aiming for the most competitive OC schools",
    90: "90% practice score target",
  },
  testLength: "1 hr 50 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each test.",
      "Master each drill first.",
      "Halfway there. Try a full practice test.",
      "Hit your goal on a full practice test.",
      "Goal hit. You're ready for test day.",
    ],
    sourceLine: "Based on the NSW Department of Education's published test format for the Opportunity Class Placement Test (checked October 2026). Original questions; not affiliated with the NSW Department of Education.",
    scoreNote: "Scores here are percent correct, with the overall the average of the three sections. Results on the real test are scaled, and there is no pass mark: places go in order of merit and each school's entry score changes every year, so treat this as a readiness check, not a prediction.",
  },
};
