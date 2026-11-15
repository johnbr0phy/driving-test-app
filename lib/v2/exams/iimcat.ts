import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CAT 2026, the IIMs' Common Admission Test (convening institute IIM Indore;
// test on Sunday 29 November 2026 in three sessions). Official format, from
// the CAT 2026 press release (26 July 2026) and the FAQs on iimcat.ac.in: a
// 120-minute computer-based test in three sections in a fixed order, Verbal
// Ability and Reading Comprehension, Data Interpretation and Logical
// Reasoning, and Quantitative Ability, with exactly 40 minutes for each and
// no switching between sections; an on-screen calculator throughout; MCQs
// score +3 and -1, non-MCQ (typed, "TITA") answers +3 and no penalty. The
// IIMs publish no syllabus and no question count, so the 24/20/22 split here
// is Tigertest's model: VARC as four reading passages of four questions plus
// eight verbal ability items (para-jumbles and odd sentence out typed, para
// summaries as MCQs), DILR as five sets of four, QA as 8 arithmetic, 7
// algebra, 4 geometry and 3 number system items. MCQs have four options
// (not stated officially). Each section is one 40-minute module, so a closed
// section cannot be reopened. The score is a percent with no negative
// marking; the real marking and the scaled score and percentile are explained
// in scoreNote and on the landing.
// Sources: tools/next100/iimcat/sources.md.
const minutes = (n: number) => n * 60;

export const IIMCAT: ExamV2Config = {
  id: "iimcat",
  slug: "/iim-cat",
  landingPath: "/cat-exam-practice-test",
  name: "CAT Mock Test",
  shortName: "CAT",
  fullName: "CAT (IIM Common Admission Test)",
  tagline: "Three sections of 40 minutes each in a fixed order: Verbal Ability and Reading Comprehension, Data Interpretation and Logical Reasoning, and Quantitative Ability.",
  icon: "graduation",
  theme: { brand: "296 30% 26%", brandDark: "296 30% 19%", brandLight: "296 70% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "varc",
      name: "Verbal Ability and Reading Comprehension",
      shortName: "VARC",
      calculator: true,
      modules: [{ module: 1, questionCount: 24, timeLimit: minutes(40) }],
      directions:
        "24 questions in 40 minutes: four reading passages with four questions each, then para-jumbles, odd sentence out and para summaries. Para-jumbles and odd sentence out are typed answers (TITA). You can move between questions and flag them inside this section, but once it closes you cannot come back to it. The real CAT takes a mark off for each wrong multiple-choice answer; this mock test does not.",
      scale: percentScale(24),
      domains: ["catRC", "catVA"],
    },
    {
      key: "dilr",
      name: "Data Interpretation and Logical Reasoning",
      shortName: "DILR",
      calculator: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(40) }],
      directions:
        "20 questions in 40 minutes: five sets of four questions, two of data interpretation (tables and survey data) and three of logical reasoning (arrangements, schedules and tournaments). Read a set's data once and answer all four of its questions. Some answers are typed. The on-screen calculator is available. You cannot return to VARC.",
      scale: percentScale(20),
      domains: ["catDI", "catLR"],
    },
    {
      key: "qa",
      name: "Quantitative Ability",
      shortName: "QA",
      calculator: true,
      modules: [{ module: 1, questionCount: 22, timeLimit: minutes(40) }],
      directions:
        "22 questions in 40 minutes: arithmetic, algebra, geometry and mensuration, and number system questions. Some answers are typed (TITA); type the number only. The on-screen calculator is available, as on the real CAT.",
      scale: percentScale(22),
      domains: ["catArith", "catAlgebra", "catGeometry", "catNumbers"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    catRC: "VARC: Reading Comprehension",
    catVA: "VARC: Para-jumbles, Odd Sentence and Summaries",
    catDI: "DILR: Data Interpretation",
    catLR: "DILR: Logical Reasoning",
    catArith: "QA: Arithmetic",
    catAlgebra: "QA: Algebra",
    catGeometry: "QA: Geometry and Mensuration",
    catNumbers: "QA: Number System and Modern Maths",
  },
  drills: [
    { key: "rc", name: "Reading Comprehension", section: "varc", domains: ["catRC"], blurb: "Main idea, detail, inference, tone and the author's view on essays about economics, science, culture and cities." },
    { key: "va", name: "Para-jumbles and Summaries", section: "varc", domains: ["catVA"], blurb: "Put four sentences in order, find the sentence that does not belong, and pick the summary that keeps the passage's point." },
    { key: "di", name: "Data Interpretation", section: "dilr", domains: ["catDI"], blurb: "Tables and survey data: totals, percentage change, shares, averages and three-set Venn counts." },
    { key: "lr", name: "Logical Reasoning", section: "dilr", domains: ["catLR"], blurb: "Seating, scheduling, floors, matching, tournaments and working backwards, each set with one solution." },
    { key: "arithmetic", name: "Arithmetic", section: "qa", domains: ["catArith"], blurb: "Percentages, profit and discount, interest, ratios and mixtures, time and work, and speed and distance." },
    { key: "algebra", name: "Algebra", section: "qa", domains: ["catAlgebra"], blurb: "Equations, quadratics, functions, progressions, inequalities, logarithms and exponents." },
    { key: "geometry", name: "Geometry and Mensuration", section: "qa", domains: ["catGeometry"], blurb: "Triangles, circles, polygons, areas and volumes, and coordinate geometry." },
    { key: "numbers", name: "Number System", section: "qa", domains: ["catNumbers"], blurb: "Remainders, factors, HCF and LCM, unit digits, permutations, combinations and probability." },
  ],
  drillSize: 12,
  composite: { name: "Score (percent)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "A first target while you learn the question types",
    50: "Building up: steady in every section",
    60: "Solid across all three sections",
    70: "Strong in every section",
    80: "Excellent",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each question type, then sit a full mock test.",
      "Master each drill first.",
      "Take Mock Test 1 to see your score.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for the CAT.",
    ],
    sourceLine: "Original practice questions on the CAT pattern (VARC, DILR and QA). Not affiliated with or endorsed by the Indian Institutes of Management.",
    scoreNote: "Your score here is the percentage of questions you got right, with no negative marking and every section weighted by its number of questions. The real CAT gives 3 marks for a correct answer, takes 1 mark off for a wrong multiple-choice answer and nothing for a wrong typed (TITA) answer, and publishes a scorecard; guides describe it as a scaled score and a percentile for each section and overall. A percentile compares you with that year's candidates, so a percent score here cannot be turned into a CAT percentile, and each IIM sets its own cut-offs. Skip multiple-choice questions you would only be guessing at; always attempt typed ones.",
  },
};
