import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// SSC GD Constable: the Computer Based Examination (CBE) of the Staff
// Selection Commission's Constable (GD) in CAPFs and SSF, and Rifleman (GD)
// in Assam Rifles Examination. Pattern per the 2026 notice (1 December 2025;
// CBE held 27 April to end of May 2026), unchanged from earlier cycles: 80
// multiple-choice questions in 60 minutes, four parts of 20 (Part A General
// Intelligence and Reasoning, Part B General Knowledge and General
// Awareness, Part C Elementary Mathematics, Part D English or Hindi), 2 marks
// each (160 in all) and 0.25 marks deducted per wrong answer, matriculation
// level. Minimum qualifying marks (2026 notice, para 14.2): UR 30%, OBC and
// EWS 25%, all other categories 20%. Checked against the notice PDF 2026-11-01. The CBE has no sectional timing, so a test is
// one 80-item, 60-minute section in the paper's order: two full-length mock
// tests, Test 2 held out. Drills split each part in two (10 + 10 per test),
// so the dashboard is 10 steps. Part D is modelled in English only (Hindi is
// not offered here); Part A is text only (no figure or spatial items); GK is
// static (no current affairs or office-holders). The score is percent
// correct; negative marking is explained in scoreNote and on the landing, not
// applied. Sources: tools/next100/sscgd/sources.md.
const minutes = (n: number) => n * 60;

export const SSCGD: ExamV2Config = {
  id: "sscgd",
  slug: "/ssc-gd-constable",
  landingPath: "/ssc-gd-constable-practice-test",
  name: "SSC GD Constable Mock Test",
  shortName: "SSC GD",
  fullName: "SSC GD Constable Computer Based Examination (CBE)",
  tagline: "80 questions in 60 minutes in the CBE order: reasoning, general knowledge, elementary mathematics and English.",
  icon: "building",
  theme: { brand: "132 30% 30%", brandDark: "132 30% 22%", brandLight: "132 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cbe",
      name: "SSC GD Constable CBE",
      shortName: "CBE",
      modules: [{ module: 1, questionCount: 80, timeLimit: minutes(60) }],
      directions: "80 questions in 60 minutes, in the CBE order: 20 General Intelligence and Reasoning, 20 General Knowledge and General Awareness, 20 Elementary Mathematics and 20 English. There is no sectional timing, so move freely and flag questions to come back to. The real exam takes 0.25 marks off for each wrong answer; this practice test scores percent correct.",
      scale: percentScale(100),
      domains: ["sscgdVerbal", "sscgdLogical", "sscgdHistory", "sscgdScience", "sscgdNumber", "sscgdArith", "sscgdGrammar", "sscgdVocab"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    sscgdVerbal: "Reasoning: Analogy, Series and Coding",
    sscgdLogical: "Reasoning: Relations, Directions and Puzzles",
    sscgdHistory: "General Knowledge: History, Culture and Polity",
    sscgdScience: "General Knowledge: Geography, Science and Sports",
    sscgdNumber: "Mathematics: Numbers, Percentage and Ratio",
    sscgdArith: "Mathematics: Profit, Interest, Work, Speed and Mensuration",
    sscgdGrammar: "English: Grammar and Cloze",
    sscgdVocab: "English: Vocabulary and Comprehension",
  },
  drills: [
    { key: "verbal", name: "Analogy, Series and Coding", section: "cbe", domains: ["sscgdVerbal"], blurb: "Number and word analogies, odd one out, number and letter series, coding-decoding and dictionary order." },
    { key: "logical", name: "Relations, Directions and Puzzles", section: "cbe", domains: ["sscgdLogical"], blurb: "Blood relations, directions, ranking, calendars, clocks, statements and conclusions, and arithmetical reasoning." },
    { key: "history", name: "History, Culture and Polity", section: "cbe", domains: ["sscgdHistory"], blurb: "Ancient, medieval and modern India, the freedom struggle, art and culture, and the Constitution." },
    { key: "science", name: "Geography, Science and Sports", section: "cbe", domains: ["sscgdScience"], blurb: "India and its neighbours, world geography, everyday science, the economy and sports." },
    { key: "number", name: "Numbers, Percentage and Ratio", section: "cbe", domains: ["sscgdNumber"], blurb: "HCF and LCM, fractions and decimals, BODMAS, squares and roots, percentage, ratio and averages." },
    { key: "arith", name: "Profit, Interest, Work and Mensuration", section: "cbe", domains: ["sscgdArith"], blurb: "Profit and loss, discount, simple and compound interest, time and work, speed and distance, and area and volume." },
    { key: "grammar", name: "Grammar and Cloze", section: "cbe", domains: ["sscgdGrammar"], blurb: "Spotting errors, fill in the blanks, sentence improvement, voice, narration and cloze passages." },
    { key: "vocab", name: "Vocabulary and Comprehension", section: "cbe", domains: ["sscgdVocab"], blurb: "Synonyms, antonyms, idioms, one-word substitution, spelling and reading passages." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you build speed",
    60: "Comfortably past the qualifying marks",
    70: "A solid target for a good merit rank",
    80: "Strong: aiming for a top rank",
    90: "Topper territory",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for the CBE.",
    ],
    sourceLine: "Original practice questions on the SSC GD Constable CBE syllabus and pattern. Not affiliated with or endorsed by the Staff Selection Commission.",
    scoreNote: "Percent correct. The real CBE gives 2 marks for each right answer and takes away 0.25 marks for each wrong one, out of 160; unanswered questions score zero. The 2026 notice sets minimum qualifying marks of 30 percent for UR, 25 percent for OBC and EWS and 20 percent for all other categories, but candidates are then shortlisted for the PET and PST on merit, state-wise, area-wise and category-wise, so treat your goal as a readiness line.",
  },
};
