import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// SSC Combined Higher Secondary (10+2) Level (CHSL) Tier 1, Staff Selection
// Commission, India (posts: LDC/JSA and Data Entry Operator). Pattern per the
// CHSL 2026 notice (published 7 September 2026, para 13.8): one computer-based
// paper of 100 multiple-choice questions in 60 minutes, four parts of 25
// questions and 50 marks each, English Language (Basic Knowledge), General
// Intelligence, Quantitative Aptitude (Basic Arithmetic Skill) and General
// Awareness, with a sectional timer of 15 minutes for each part (20 minutes
// for scribe-eligible candidates). 0.50 marks deducted per wrong answer.
// Tier 1 qualifies candidates for Tier 2 (minimum marks UR 30%, OBC/EWS 25%,
// others 20%); final merit comes from Tier 2 only. Here each part is its own
// timed section of 25 in 15 minutes, in the notice's listing order (the
// notice says the parts are "not in sequence"), so a closed part cannot be
// reopened. Drills split each part in two (per test 13/12 in every part), so
// the dashboard is 10 steps. GA is static only: no current affairs or
// office-holders. Reasoning is text-only (the figural item types are not
// modelled). The score is percent correct; negative marking is explained in
// scoreNote and on the landing, not applied.
// Sources: tools/next100/sscchsl/sources.md.
const minutes = (n: number) => n * 60;

export const SSCCHSL: ExamV2Config = {
  id: "sscchsl",
  slug: "/ssc-chsl",
  landingPath: "/ssc-chsl-practice-test",
  name: "SSC CHSL Mock Test",
  shortName: "SSC CHSL",
  fullName: "SSC CHSL Tier 1 (Combined Higher Secondary Level) exam",
  tagline: "100 questions in 60 minutes with a 15-minute timer on each part: English, General Intelligence, Quantitative Aptitude and General Awareness.",
  icon: "building",
  theme: { brand: "196 30% 34%", brandDark: "196 30% 26%", brandLight: "196 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "eng",
      name: "English Language",
      shortName: "English",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(15) }],
      directions:
        "25 questions in 15 minutes: spot the error, fill in the blanks, improvement, voice, narration, vocabulary, idioms, sentence order, a cloze passage and a reading passage. You can move and flag questions inside this part, but once its timer ends you cannot come back to it. The real exam takes 0.50 marks off for each wrong answer; this practice test scores percent correct.",
      scale: percentScale(25),
      domains: ["sscchslGrammar", "sscchslVocab"],
    },
    {
      key: "gi",
      name: "General Intelligence",
      shortName: "Reasoning",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(15) }],
      directions:
        "25 questions in 15 minutes: analogy, classification, series, coding-decoding, symbolic operations, blood relations, directions, syllogisms, calendars and clocks, and judgement questions. Figure-based questions on the real paper are not included here. Once this part's timer ends you cannot come back to it.",
      scale: percentScale(25),
      domains: ["sscchslVerbal", "sscchslLogic"],
    },
    {
      key: "qa",
      name: "Quantitative Aptitude",
      shortName: "Quant",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(15) }],
      directions:
        "25 questions in 15 minutes: number system, percentage, profit and discount, ratio, average, interest, mixtures, work and distance, then algebra, geometry, mensuration, trigonometry and tables. No calculator, as on the real exam. Once this part's timer ends you cannot come back to it.",
      scale: percentScale(25),
      domains: ["sscchslArith", "sscchslAdvanced"],
    },
    {
      key: "ga",
      name: "General Awareness",
      shortName: "GA",
      modules: [{ module: 1, questionCount: 25, timeLimit: minutes(15) }],
      directions:
        "25 questions in 15 minutes on Indian history, culture, polity, geography, economy and everyday science. Current affairs are not included: study them from a recent source. Answer what you know quickly and move on.",
      scale: percentScale(25),
      domains: ["sscchslHistory", "sscchslScience"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    sscchslGrammar: "English: Grammar and Cloze",
    sscchslVocab: "English: Vocabulary, Sentence Order and Comprehension",
    sscchslVerbal: "General Intelligence: Analogy, Series and Coding",
    sscchslLogic: "General Intelligence: Relations, Logic and Judgement",
    sscchslArith: "Quantitative Aptitude: Arithmetic",
    sscchslAdvanced: "Quantitative Aptitude: Algebra, Geometry, Mensuration and Trigonometry",
    sscchslHistory: "General Awareness: History, Culture and Polity",
    sscchslScience: "General Awareness: Geography, Economy and Science",
  },
  drills: [
    { key: "grammar", name: "Grammar and Cloze", section: "eng", domains: ["sscchslGrammar"], blurb: "Spot the error, fill in the blanks, improvement, voice, narration and cloze passages." },
    { key: "vocab", name: "Vocabulary and Comprehension", section: "eng", domains: ["sscchslVocab"], blurb: "Synonyms, antonyms, spellings, idioms, one-word substitution, sentence order and reading passages." },
    { key: "verbal", name: "Analogy, Series and Coding", section: "gi", domains: ["sscchslVerbal"], blurb: "Number and word analogies, odd one out, series, coding-decoding and symbolic operations." },
    { key: "logic", name: "Relations, Logic and Judgement", section: "gi", domains: ["sscchslLogic"], blurb: "Blood relations, directions, ranking, syllogisms, calendars, clocks and emotional and social intelligence." },
    { key: "arithmetic", name: "Arithmetic", section: "qa", domains: ["sscchslArith"], blurb: "Number system, percentage, profit and discount, ratio, average, interest, mixtures, work and speed." },
    { key: "advanced", name: "Algebra, Geometry and Trigonometry", section: "qa", domains: ["sscchslAdvanced"], blurb: "Identities, triangles and circles, mensuration, trigonometric values, heights and distances, and charts." },
    { key: "history", name: "History, Culture and Polity", section: "ga", domains: ["sscchslHistory"], blurb: "Ancient, medieval and modern India, dance and heritage, and the Constitution and Parliament." },
    { key: "science", name: "Geography, Economy and Science", section: "ga", domains: ["sscchslScience"], blurb: "Rivers, soils and states, banking and the economy, and everyday physics, chemistry and biology." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [60, 70, 75, 80, 90],
  goalNotes: {
    60: "A first target while you build speed",
    70: "A solid target for clearing Tier 1",
    75: "A safer margin for most categories",
    80: "Strong: aiming high on the merit list",
    90: "Topper territory",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for Tier 1.",
    ],
    sourceLine: "Original practice questions on the SSC CHSL Tier 1 syllabus and pattern. Not affiliated with or endorsed by the Staff Selection Commission.",
    scoreNote: "Percent correct. The real Tier 1 gives 2 marks for each right answer and takes away 0.50 marks for each wrong one, out of 200; unanswered questions score zero. The 2026 notice sets minimum qualifying marks of 30% (UR), 25% (OBC and EWS) and 20% (other categories), but the cut-off that decides who goes to Tier 2 changes every year by category and post, so treat your goal as a readiness line and guess only when you can rule out at least one option.",
  },
};
