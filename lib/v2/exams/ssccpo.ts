import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// SSC CPO: Sub-Inspector in Delhi Police and Central Armed Police Forces
// Examination, Staff Selection Commission, India. Pattern per the 2026 notice
// (published 10 September 2026, para 12): Paper-I is one computer-based paper
// of 100 multiple-choice questions, 1 mark each, in 1 hour, four parts of 25
// questions (General Intelligence and Reasoning, General Knowledge and General
// Awareness, Quantitative Aptitude, English Comprehension) with a sectional
// timer of 15 minutes for each part; 0.25 marks deducted per wrong answer.
// The 2026 notice cut Paper-I from the earlier 200 questions in 2 hours, so
// the mocks here are full length. Paper-I shortlists for PST/PET (minimum
// qualifying marks UR 30%, OBC/EWS 25%, others 20%); final merit comes from
// Paper-II, which is not modelled. Each part is its own timed section of 25
// in 15 minutes, in the notice's order, so a closed part cannot be reopened.
// Drills split each part in two (per test 13/12 in every part), so the
// dashboard is 10 steps. GK is static only: no current affairs or
// office-holders. Reasoning is text only (the figural item types are not
// modelled). The score is percent correct; negative marking is explained in
// scoreNote and on the landing, not applied.
// Sources: tools/next100/ssccpo/sources.md.
const minutes = (n: number) => n * 60;

export const SSCCPO: ExamV2Config = {
  id: "ssccpo",
  slug: "/ssc-cpo",
  landingPath: "/ssc-cpo-practice-test",
  name: "SSC CPO Mock Test",
  shortName: "SSC CPO",
  fullName: "SSC CPO Paper-I (Sub-Inspector in Delhi Police and CAPFs) exam",
  tagline: "100 questions in 60 minutes with a 15-minute timer on each part: reasoning, general knowledge, quantitative aptitude and English.",
  icon: "building",
  theme: { brand: "262 40% 38%", brandDark: "262 40% 29%", brandLight: "262 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "gi",
      name: "General Intelligence and Reasoning",
      shortName: "Reasoning",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(15) }],
      directions:
        "25 questions in 15 minutes: analogy, classification, series, coding-decoding, word building, operations, blood relations, directions, syllogisms, statement and conclusion, calendars, clocks and judgement questions. Figure-based questions on the real paper are not included here. You can move and flag questions inside this part, but once its timer ends you cannot come back to it. The real Paper-I takes 0.25 marks off for each wrong answer; this practice test scores percent correct.",
      scale: percentScale(25),
      domains: ["ssccpoVerbal", "ssccpoLogic"],
    },
    {
      key: "ga",
      name: "General Knowledge and General Awareness",
      shortName: "GK",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(15) }],
      directions:
        "25 questions in 15 minutes on Indian history, culture, polity and the Constitution, India's neighbours, geography, the economy and everyday science. Current affairs are not included: study them from a recent source. Once this part's timer ends you cannot come back to it.",
      scale: percentScale(25),
      domains: ["ssccpoHistory", "ssccpoScience"],
    },
    {
      key: "qa",
      name: "Quantitative Aptitude",
      shortName: "Quant",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(15) }],
      directions:
        "25 questions in 15 minutes: percentage, profit and discount, ratio, average, interest, partnership, mixtures, work and distance, then algebra, geometry, mensuration, trigonometry and charts. No calculator, as on the real exam. Once this part's timer ends you cannot come back to it.",
      scale: percentScale(25),
      domains: ["ssccpoArith", "ssccpoAdvanced"],
    },
    {
      key: "eng",
      name: "English Comprehension",
      shortName: "English",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(15) }],
      directions:
        "25 questions in 15 minutes: spot the error, fill in the blanks, improvement, voice, narration, vocabulary, idioms, spelling, a cloze passage and a reading passage. Once this part's timer ends the test is over.",
      scale: percentScale(25),
      domains: ["ssccpoGrammar", "ssccpoVocab"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    ssccpoVerbal: "Reasoning: Analogy, Series and Coding",
    ssccpoLogic: "Reasoning: Relations, Logic and Judgement",
    ssccpoHistory: "General Knowledge: History, Culture, Polity and Neighbours",
    ssccpoScience: "General Knowledge: Geography, Economy and Science",
    ssccpoArith: "Quantitative Aptitude: Arithmetic",
    ssccpoAdvanced: "Quantitative Aptitude: Algebra, Geometry, Mensuration and Trigonometry",
    ssccpoGrammar: "English: Grammar and Cloze",
    ssccpoVocab: "English: Vocabulary and Comprehension",
  },
  drills: [
    { key: "verbal", name: "Analogy, Series and Coding", section: "gi", domains: ["ssccpoVerbal"], blurb: "Number and word analogies, odd one out, series, coding-decoding, word building and operations." },
    { key: "logic", name: "Relations, Logic and Judgement", section: "gi", domains: ["ssccpoLogic"], blurb: "Blood relations, directions, ranking, syllogisms, calendars, clocks, seating and judgement on duty." },
    { key: "history", name: "History, Culture, Polity and Neighbours", section: "ga", domains: ["ssccpoHistory"], blurb: "Ancient, medieval and modern India, culture, the Constitution and Parliament, and India's neighbours." },
    { key: "science", name: "Geography, Economy and Science", section: "ga", domains: ["ssccpoScience"], blurb: "Rivers, dams and passes, banking and the economy, and everyday physics, chemistry and biology." },
    { key: "arithmetic", name: "Arithmetic", section: "qa", domains: ["ssccpoArith"], blurb: "Percentage, profit and discount, ratio, average, interest, partnership, mixtures, work and speed." },
    { key: "advanced", name: "Algebra, Geometry and Trigonometry", section: "qa", domains: ["ssccpoAdvanced"], blurb: "Identities, triangles and circles, mensuration, trigonometric values, heights and distances, and charts." },
    { key: "grammar", name: "Grammar and Cloze", section: "eng", domains: ["ssccpoGrammar"], blurb: "Spot the error, fill in the blanks, improvement, voice, narration and cloze passages." },
    { key: "vocab", name: "Vocabulary and Comprehension", section: "eng", domains: ["ssccpoVocab"], blurb: "Synonyms, antonyms, idioms, one-word substitution, spelling and reading passages." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [60, 70, 75, 80, 90],
  goalNotes: {
    60: "A first target while you build speed",
    70: "A solid target for clearing Paper-I",
    75: "A safer margin for most categories",
    80: "Strong: aiming high for the PET shortlist",
    90: "Topper territory",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for Paper-I.",
    ],
    sourceLine: "Original practice questions on the SSC CPO Paper-I syllabus and pattern. Not affiliated with or endorsed by the Staff Selection Commission.",
    scoreNote: "Percent correct. The real Paper-I gives 1 mark for each right answer and takes away 0.25 marks for each wrong one, out of 100; unanswered questions score zero. The 2026 notice sets minimum qualifying marks of 30% (UR), 25% (OBC and EWS) and 20% (other categories), but the cut-off that decides who goes on to the physical tests changes every year by category and may be set part by part, so treat your goal as a readiness line and guess only when you can rule out at least one option.",
  },
};
