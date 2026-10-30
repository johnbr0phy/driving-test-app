import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// Victorian Selective Entry High Schools exam (Victorian Department of
// Education; applications, the exam and offers are managed by ACER), sat in
// June of Year 8 for Year 9 entry to Nossal, Suzanne Cory, Mac.Robertson
// Girls' and Melbourne High. Paper-based, no calculator, knowledge never past
// the Year 8 curriculum. In order: Mathematics and Quantitative Reasoning
// (60 min, multiple choice), a 20-minute break, Reading and Verbal Reasoning
// (55 min, multiple choice), a short break, and Writing (two tasks, 40 min).
// Writing is not modelled. Question counts are not published, so each
// section here is 40 four-option items (20 per strand), a full-time load
// rather than a copy of the real count. Standard merit places (85%) are
// ranked on exam performance and there is no pass mark, so scores are percent
// correct per section and the overall is their plain average. Test 2 is held
// out of the drills so it measures readiness rather than memory. Bank built
// by tools/vicsel/build.py.
const minutes = (n: number) => n * 60;

/** Each section counts equally. */
function averageOfSections(sections: SectionResult[]): number {
  const scored = sections.filter((s) => s.total > 0);
  if (!scored.length) return 0;
  return Math.round(scored.reduce((a, s) => a + (s.raw / s.total) * 100, 0) / scored.length);
}

export const VICSEL: ExamV2Config = {
  id: "vicsel",
  slug: "/victorian-selective",
  landingPath: "/victorian-selective-entry-practice-test",
  name: "Victorian Selective Entry Practice",
  shortName: "Vic Selective",
  fullName: "Victorian Selective Entry High Schools Exam",
  tagline: "Mathematics, Quantitative Reasoning, Reading and Verbal Reasoning, timed like the real Year 9 entry exam.",
  icon: "graduation",
  theme: { brand: "256 90% 37%", brandDark: "256 90% 26%", brandLight: "256 70% 96%" },
  breakSeconds: minutes(20),
  sections: [
    {
      key: "mathsqr",
      name: "Mathematics and Quantitative Reasoning",
      shortName: "Maths and QR",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(60) }],
      calculator: false,
      breakAfter: true,
      directions:
        "40 questions in 60 minutes, the same time as the real exam's first section. Mathematics first (Year 8 number, algebra, measurement, geometry, statistics and probability, often in real-world settings), then Quantitative Reasoning (number patterns, rules, codes and puzzles). No calculator: use paper for working. The real exam does not publish its question count and does not expect everyone to finish, so skip a slow question and come back.",
      scale: percentScale(40),
      domains: ["vicselMaths", "vicselQuant"],
    },
    {
      key: "readingvr",
      name: "Reading and Verbal Reasoning",
      shortName: "Reading and VR",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(55) }],
      directions:
        "40 questions in 55 minutes, the same time as the real exam's second section. Reading first (a story, an article, a poem and an opinion piece, five questions each, with the text beside the questions), then Verbal Reasoning (analogies, word meanings, odd one out, letter series and codes, and short logic problems). Every question has four options.",
      scale: percentScale(40),
      domains: ["vicselReading", "vicselVerbal"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    vicselMaths: "Mathematics",
    vicselQuant: "Quantitative Reasoning",
    vicselReading: "Reading",
    vicselVerbal: "Verbal Reasoning",
  },
  // Four drills of 20 exam-level items, each opening with shared Basics, so
  // the dashboard is 4 x 2 + 2 tests = 10 steps.
  drillSize: 20,
  drills: [
    { key: "maths", name: "Mathematics", section: "mathsqr", domains: ["vicselMaths"], blurb: "Integers, fractions, percentages, ratio, equations, area, angles and data, without a calculator.", basics: ["negativeNumbers", "fractionOps", "percents", "ratios", "solveX", "areaPerimeter", "triangleAngles", "meanMedian"] },
    { key: "quant", name: "Quantitative Reasoning", section: "mathsqr", domains: ["vicselQuant"], blurb: "Number series, number machines, symbol rules, balances, ages, coins and counting puzzles.", basics: ["orderOfOperations", "wordProblems"] },
    { key: "reading", name: "Reading", section: "readingvr", domains: ["vicselReading"], blurb: "Stories, articles, poems and opinion pieces: main idea, detail, inference, word meaning and the writer's purpose.", basics: ["mainIdea", "findingDetail", "inference", "wordsInContext", "toneWords", "authorPurpose", "textStructure"] },
    { key: "verbal", name: "Verbal Reasoning", section: "readingvr", domains: ["vicselVerbal"], blurb: "Analogies, word meanings and opposites, odd one out, letter series, codes and short logic problems.", basics: ["synonyms", "logicalCompletion", "inference"] },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: averageOfSections },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target, a solid base for a selective entry place",
    80: "80% practice score target",
    85: "85% practice score target, aiming high in a competitive year",
    90: "90% practice score target",
  },
  testLength: "1 hr 55 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each strand.",
      "Master each drill first.",
      "Halfway there. Try a full practice test.",
      "Hit your goal on a full practice test.",
      "Goal hit. You're ready for exam day.",
    ],
    sourceLine: "Based on the published format of the Victorian Selective Entry High Schools exam (checked October 2026). Original questions; not affiliated with the Victorian Department of Education. The Writing tasks are not included.",
    scoreNote: "Scores here are percent correct, with the overall the average of the two sections. The real exam does not publish question counts or a pass mark: standard merit places are offered in rank order of exam performance, and the score needed changes every year, so treat this as a readiness check, not a prediction.",
  },
};
