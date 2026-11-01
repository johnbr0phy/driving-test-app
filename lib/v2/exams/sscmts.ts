import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// SSC Multi-Tasking (Non-Technical) Staff and Havaldar (CBIC and CBN)
// Examination, Staff Selection Commission, India. Pattern per the SSC MTS and
// Havaldar 2025 notice (June 2025; the 2026 cycle is expected to keep it):
// one computer-based exam of 90 multiple-choice questions, 270 marks, in two
// sessions of 45 minutes each, both compulsory. Session 1: Numerical and
// Mathematical Ability 20 and Reasoning Ability and Problem Solving 20
// (3 marks each, no negative marking). Session 2: General Awareness 25 and
// English Language and Comprehension 25 (3 marks each, 1 mark deducted per
// wrong answer). The notice sets minimum qualifying marks of 30/25/20 percent
// (UR / OBC and EWS / others) in each session, evaluates Session 2 only for
// those who qualify in Session 1, and draws merit solely from Session 2. Havaldar
// candidates also take a walking test and physical measurements, not modelled.
// Here each session is its own timed section, so a closed session cannot be
// reopened, with free navigation inside it. Drills split each part in two
// (per test 10/10 maths, 10/10 reasoning, 13/12 GA, 13/12 English), so the
// dashboard is 10 steps. GA is static only (history, polity, culture,
// geography, economy, science): no current affairs or office-holders.
// Reasoning is text only (no figure, mirror-image or paper-folding items).
// The score is percent correct; negative marking is explained in scoreNote and
// on the landing, not applied. Sources: tools/next100/sscmts/sources.md.
const minutes = (n: number) => n * 60;

export const SSCMTS: ExamV2Config = {
  id: "sscmts",
  slug: "/ssc-mts",
  landingPath: "/ssc-mts-practice-test",
  name: "SSC MTS Mock Test",
  shortName: "SSC MTS",
  fullName: "SSC MTS and Havaldar exam",
  tagline: "90 questions in two 45-minute sessions: maths and reasoning, then general awareness and English.",
  icon: "building",
  theme: { brand: "26 70% 38%", brandDark: "26 70% 30%", brandLight: "26 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "s1",
      name: "Session 1: Maths and Reasoning",
      shortName: "Session 1",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(45) }],
      directions:
        "40 questions in 45 minutes: 20 Numerical and Mathematical Ability, then 20 Reasoning Ability and Problem Solving. Move freely and flag questions inside this session. Once it closes you go straight on to Session 2 and cannot come back. The real Session 1 has no negative marking, so answer every question.",
      scale: percentScale(40),
      domains: ["mtsArith", "mtsNumber", "mtsVerbal", "mtsLogical"],
    },
    {
      key: "s2",
      name: "Session 2: General Awareness and English",
      shortName: "Session 2",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(45) }],
      directions:
        "50 questions in 45 minutes: 25 General Awareness, then 25 English Language and Comprehension, ending with a cloze passage and a reading passage. The real Session 2 takes 1 mark off for each wrong answer out of 3 for a right one; this mock test scores percent correct, so note which answers were guesses.",
      scale: percentScale(50),
      domains: ["mtsHistory", "mtsScience", "mtsGrammar", "mtsVocab"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    mtsArith: "Maths: Arithmetic",
    mtsNumber: "Maths: Numbers, Mensuration and Data",
    mtsVerbal: "Reasoning: Analogy, Series and Coding",
    mtsLogical: "Reasoning: Relations, Directions and Logic",
    mtsHistory: "General Awareness: History, Polity and Culture",
    mtsScience: "General Awareness: Geography, Economy and Science",
    mtsGrammar: "English: Grammar and Cloze",
    mtsVocab: "English: Vocabulary and Comprehension",
  },
  drills: [
    { key: "arithmetic", name: "Arithmetic", section: "s1", domains: ["mtsArith"], blurb: "Percentage, profit and discount, ratio, average, interest, time and work, speed and ages." },
    { key: "numbers", name: "Numbers, Mensuration and Data", section: "s1", domains: ["mtsNumber"], blurb: "HCF and LCM, simplification, fractions, roots, area, perimeter, volume and simple data." },
    { key: "verbal", name: "Analogy, Series and Coding", section: "s1", domains: ["mtsVerbal"], blurb: "Word and number analogies, number and letter series, odd one out and coding-decoding." },
    { key: "logical", name: "Relations, Directions and Logic", section: "s1", domains: ["mtsLogical"], blurb: "Blood relations, directions, ranking, calendars, clocks, dictionary order and syllogisms." },
    { key: "history", name: "History, Polity and Culture", section: "s2", domains: ["mtsHistory"], blurb: "Ancient, medieval and modern India, the Constitution and Parliament, and dance and monuments." },
    { key: "science", name: "Geography, Economy and Science", section: "s2", domains: ["mtsScience"], blurb: "Rivers, states, parks and crops, basic economy, and everyday physics, chemistry and biology." },
    { key: "grammar", name: "Grammar and Cloze", section: "s2", domains: ["mtsGrammar"], blurb: "Spotting errors, fill in the blanks, improvement, voice, narration and cloze passages." },
    { key: "vocab", name: "Vocabulary and Comprehension", section: "s2", domains: ["mtsVocab"], blurb: "Synonyms, antonyms, idioms, one-word substitution, spelling and reading passages." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you learn the question types",
    60: "Building up: aim higher for a safety margin",
    70: "A solid target with a margin to spare",
    80: "Strong: ready for a good merit position",
    90: "Topper territory",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for the SSC MTS exam.",
    ],
    sourceLine: "Original practice questions on the SSC MTS and Havaldar syllabus and pattern. Not affiliated with or endorsed by the Staff Selection Commission.",
    scoreNote:
      "Percent correct across both sessions. The real exam gives 3 marks for each right answer, out of 270. Session 1 has no negative marking; Session 2 takes away 1 mark for each wrong answer. Each session has a minimum qualifying mark (30 percent for unreserved, 25 for OBC and EWS, 20 for others), merit comes from Session 2 alone, and cut-offs change every year by state, category and age group, so treat your goal as a readiness line, answer everything in Session 1, and in Session 2 guess only when you can rule out at least one option.",
  },
};
