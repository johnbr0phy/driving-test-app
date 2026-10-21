import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// GED (GED Testing Service): four subject tests, each taken and scored on its
// own, 100 to 200 with 145 passing (165 college ready, 175 college ready plus
// credit). Subject weights below are the assessment targets in the GED Testing
// Service Assessment Guide for Educators (October 2020 edition). The real test: Reasoning Through Language Arts 150 min including a
// 45-minute extended response essay (not modeled here; 75% informational,
// 25% literary passages), Mathematical Reasoning 115 min (45% quantitative
// problem solving, 55% algebraic problem solving; TI-30XS calculator allowed
// on all but the first five items), Science 90 min (life 40%, physical 40%,
// earth and space 20%; calculator allowed), Social Studies 70 min (civics and
// government 50%, US history 20%, economics 15%, geography and the world 15%).
// Here each subject is one shorter module sized for a sitting, and a full
// practice test is all four with the exam's break between them. Test 2 is
// held out of the drills so it measures readiness rather than memory. Scores
// are percent correct; 145 on the real scale is not a fixed percent.
const minutes = (n: number) => n * 60;

export const GED: ExamV2Config = {
  id: "ged",
  slug: "/ged",
  landingPath: "/ged-practice-test",
  name: "GED Practice Test",
  shortName: "GED",
  fullName: "GED high school equivalency test",
  tagline: "All four GED subjects, timed like the real test, with the basics taught first.",
  icon: "graduation",
  theme: { brand: "265 55% 44%", brandDark: "265 55% 32%", brandLight: "265 100% 96%" },
  breakSeconds: 600,
  sections: [
    {
      key: "rla",
      name: "Reasoning Through Language Arts",
      shortName: "RLA",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(55) }],
      directions:
        "Reading passages with questions on main idea, detail, inference, word meaning and how an author builds an argument, then short drafts to edit for grammar, punctuation and clear wording. Some items ask you to choose two answers or pick the best word from a dropdown. The real test's essay (extended response) is not part of this practice test.",
      scale: percentScale(25),
      domains: ["gedReading", "gedLanguage"],
    },
    {
      key: "math",
      name: "Mathematical Reasoning",
      shortName: "Math",
      calculator: true,
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(60) }],
      directions:
        "Quantitative problem solving (numbers, fractions, percents, ratios, measurement, data) and algebraic problem solving (expressions, equations, inequalities, functions, graphs described in words). A calculator is available on every question, as the TI-30XS is on all but five items of the real test. For fill-in questions, type a number, a decimal or a fraction such as 3/4, with no units or commas.",
      scale: percentScale(25),
      domains: ["gedQuant", "gedAlgebra"],
    },
    {
      key: "science",
      name: "Science",
      shortName: "Science",
      calculator: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(45) }],
      directions:
        "Life science, physical science, and earth and space science, mostly from a short reading, a described experiment or a data table. The questions test reading data, designing experiments, drawing conclusions and scientific vocabulary more than memorized facts. A calculator is available, as on the real test.",
      scale: percentScale(20),
      domains: ["gedScience"],
    },
    {
      key: "social",
      name: "Social Studies",
      shortName: "Social Studies",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(40) }],
      directions:
        "Civics and government first, then US history, economics, and geography and the world. Most questions come with a short excerpt, a described map or chart, or a short reading. No calculator.",
      scale: percentScale(20),
      domains: ["gedSocial"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    gedReading: "Reading Comprehension",
    gedLanguage: "Language and Editing",
    gedQuant: "Quantitative Problem Solving",
    gedAlgebra: "Algebraic Problem Solving",
    gedScience: "Science",
    gedSocial: "Social Studies",
  },
  // Six drills, one per domain. Reading, language and both math drills open
  // with Basics (one shared library with SAT, ACT, TEAS and the rest); the
  // science and social studies drills have no Basics yet. Each drill is 20
  // exam-level items, one sitting after the basics.
  drillSize: 20,
  drills: [
    { key: "reading", name: "Reading Comprehension", section: "rla", domains: ["gedReading"], blurb: "Workplace documents, speeches, science and history texts, and some literature: main idea, detail, inference and how evidence supports a claim.", basics: ["mainIdea", "findingDetail", "inference", "wordsInContext", "authorPurpose", "claimSupport", "factOpinion"] },
    { key: "language", name: "Language and Editing", section: "rla", domains: ["gedLanguage"], blurb: "Edit short drafts for commas, agreement, apostrophes, pronouns, verb tense, transitions and commonly confused words.", basics: ["commaSplices", "subjectVerb", "apostrophes", "transitions", "commonlyConfused", "verbTense", "pronounCase", "listIntroCommas"] },
    { key: "quant", name: "Quantitative Problem Solving", section: "math", domains: ["gedQuant"], blurb: "Fractions, decimals, percents, ratios, unit conversions, area and volume, mean and median, probability and reading data. 45% of Math.", basics: ["fractionOps", "decimals", "percents", "ratios", "unitConversion", "meanMedian", "orderOfOperations"] },
    { key: "algebra", name: "Algebraic Problem Solving", section: "math", domains: ["gedAlgebra"], blurb: "Expressions, linear equations and inequalities, systems, slope, functions, quadratics and exponents. 55% of Math.", basics: ["solveX", "slope", "distributing", "substitution", "inequalities", "factoring", "systems"] },
    { key: "science", name: "Science", section: "science", domains: ["gedScience"], blurb: "Life, physical, and earth and space science: read data, design experiments, draw conclusions." },
    { key: "social", name: "Social Studies", section: "social", domains: ["gedSocial"], blurb: "Civics and government, US history, economics, and geography, from excerpts, charts and maps." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 65,
  goalChoices: [55, 60, 65, 70, 75, 80],
  goalNotes: {
    55: "55% practice score target",
    60: "60% practice score target",
    65: "65% practice score target, a safe margin over passing",
    70: "70% practice score target",
    75: "75% practice score target, college-ready territory",
    80: "80% practice score target",
  },
  testLength: "3 hr 20 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each subject.",
      "Master each drill first.",
      "Halfway there. Try the full test.",
      "Hit your goal on the full test.",
      "Goal hit. Go schedule your GED.",
    ],
    sourceLine: "Based on the assessment targets in the GED Testing Service Assessment Guide for Educators (October 2020 edition). Original questions; not affiliated with GED Testing Service.",
    scoreNote: "Scores here are percent correct per subject. The real GED scores each subject 100 to 200 and 145 passes; that cutoff is not a fixed percent, so aim for a comfortable margin.",
  },
};
