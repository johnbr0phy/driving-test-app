import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CBEST, the California Basic Educational Skills Test, owned by the
// California Commission on Teacher Credentialing and run by Pearson
// (Evaluation Systems). Content from the CBEST Test Specifications (CTC,
// linked from the CBEST preparation page) and format from the CBEST test page
// on ctcexams.nesinc.com (checked November 2026): three separately
// registered sections in English.
// - Reading (095): 50 multiple-choice questions in 1 hour 30 minutes; about
//   40% Critical Analysis and Evaluation and 60% Comprehension and Research
//   Skills (A. Comprehension and Context, B. Research and Reference Skills).
// - Mathematics (096): 50 multiple-choice questions in 2 hours, no
//   calculator; about 30% Estimation, Measurement, and Statistical
//   Principles, 35% Computation and Problem Solving, 35% Numerical and
//   Graphic Relationships.
// - Writing (097): two essays in 1 hour 30 minutes. Not modelled.
// Each section is scaled 20 to 80; passing is 41 on each section, or a total
// of 123 with no section below 37.
// Here each practice test is Reading and Math at half length and the real
// pace: Reading 25 in 45 minutes (10 critical, 11 comprehension, 4 research;
// the outline does not split its 60%, so that split is Tigertest's) and Math
// 25 in 60 minutes (8/9/8). Test 2 is held out of the drills. Scores are
// percent correct; Pearson publishes no raw-to-scaled table. Sources:
// tools/next100/cbest/sources.md.
const minutes = (n: number) => n * 60;

export const CBEST: ExamV2Config = {
  id: "cbest",
  slug: "/cbest",
  landingPath: "/cbest-practice-test",
  name: "CBEST Practice Test",
  shortName: "CBEST",
  fullName: "California Basic Educational Skills Test (CBEST): Reading and Mathematics",
  tagline: "CBEST Reading and Math for California teachers and substitutes, timed at the real pace, with the basics taught first.",
  icon: "graduation",
  theme: { brand: "21 25% 42%", brandDark: "21 25% 30%", brandLight: "21 25% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(45) }],
      directions:
        "Questions go with passages, letters and notices, pairs of short passages, one-paragraph statements, a table of contents or index, and tables of data. Answer from what the material states or implies. This is half the length of the real 90-minute Reading section, at the same pace.",
      scale: percentScale(25),
      domains: ["cbestCritical", "cbestComprehension", "cbestResearch"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Math",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(60) }],
      directions:
        "Estimation, measurement and statistics; computation and problem solving; and numerical and graphic relationships, mostly as everyday school problems. No calculator, as on the real CBEST, and units are U.S. customary. This is half the length of the real 2-hour Mathematics section, at the same pace.",
      scale: percentScale(25),
      domains: ["cbestMeasurement", "cbestComputation", "cbestRelationships"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cbestCritical: "Reading: Critical Analysis and Evaluation",
    cbestComprehension: "Reading: Comprehension and Context",
    cbestResearch: "Reading: Research and Reference Skills",
    cbestMeasurement: "Math: Estimation, Measurement, and Statistical Principles",
    cbestComputation: "Math: Computation and Problem Solving",
    cbestRelationships: "Math: Numerical and Graphic Relationships",
  },
  // Six drills, one per area of the test specifications. Four open with
  // Basics from the shared library, no skill in two drills; Research and
  // Measurement have none. 6 drills + 4 Basics steps + 2 tests = 12 steps.
  drillSize: 20,
  drills: [
    { key: "critical", name: "Critical Analysis and Evaluation", section: "reading", domains: ["cbestCritical"], blurb: "Fact versus opinion, the author's attitude, assumptions, arguments that are strengthened or weakened, persuasive techniques and audience. About 40% of Reading.", basics: ["factOpinion", "authorPurpose", "claimSupport", "toneWords"] },
    { key: "comprehension", name: "Comprehension and Context", section: "reading", domains: ["cbestComprehension"], blurb: "Main idea, details, sequence, inferences, summaries, word meaning from context and word parts, and transition words.", basics: ["mainIdea", "findingDetail", "inference", "wordsInContext", "sequenceEvents"] },
    { key: "research", name: "Research and Reference Skills", section: "reading", domains: ["cbestResearch"], blurb: "Tables of contents, indexes, how a book is organized, and conclusions from tables and graphs." },
    { key: "measurement", name: "Estimation, Measurement and Statistics", section: "math", domains: ["cbestMeasurement"], blurb: "U.S. units, perimeter, planning time, estimating, averages, percentiles, stanines and probability. About 30% of Math." },
    { key: "computation", name: "Computation and Problem Solving", section: "math", domains: ["cbestComputation"], blurb: "Whole numbers, negatives, fractions, decimals and percents, order totals, one-step and two-step equations, and whether a problem gives enough information. About 35% of Math.", basics: ["fractionOps", "decimals", "negativeNumbers", "solveX", "wordProblems"] },
    { key: "relationships", name: "Numerical and Graphic Relationships", section: "math", domains: ["cbestRelationships"], blurb: "Percent change, ordering numbers, equivalent forms, rounding, and, or and if-then reasoning, and reading tables and graphs. About 35% of Math.", basics: ["percentChange", "fractionConvert", "rounding", "readingTable"] },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80, 85],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target, a sensible readiness line",
    75: "75% practice score target, a safe margin",
    80: "80% practice score target",
    85: "85% practice score target",
  },
  testLength: "1 hr 45 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each skill.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Go book your CBEST.",
    ],
    sourceLine: "Original questions written to the CBEST Test Specifications for Reading and Mathematics. Not affiliated with or endorsed by the California Commission on Teacher Credentialing or Pearson.",
    scoreNote: "Scores here are percent correct per section. The real CBEST reports each section on a scale of 20 to 80: you pass with 41 on every section, or with a total of 123 across Reading, Mathematics and Writing as long as no section is below 37. Pearson publishes no conversion from percent correct, and the Writing essays are not part of this practice, so aim for a comfortable margin.",
  },
};
