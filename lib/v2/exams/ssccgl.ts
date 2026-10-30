import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// SSC Combined Graduate Level (CGL) Tier 1, Staff Selection Commission, India.
// Pattern per the SSC CGL notice (unchanged for the 2025 and 2026 cycles):
// one computer-based paper of 100 multiple-choice questions in 60 minutes
// (80 for scribe-eligible candidates), four parts of 25 questions:
// General Intelligence and Reasoning, General Awareness, Quantitative Aptitude
// and English Comprehension. 2 marks per correct answer (200 in all) and 0.50
// marks deducted per wrong answer. Tier 1 has no sectional timing, so a test
// is one 100-item, 60-minute section in the paper's order. Drills split each
// part in two (per test 13/12 reasoning, 13/12 GA, 13/12 quant, 12/13 English),
// so the dashboard is 10 steps. GA is static only (polity, history, geography,
// economy, science): no current affairs or office-holders. Reasoning is
// text-only (no figure series). The score is percent correct; negative
// marking is explained in scoreNote and on the landing, not applied.
// Sources: tools/ssccgl/sources.md.
const minutes = (n: number) => n * 60;

export const SSCCGL: ExamV2Config = {
  id: "ssccgl",
  slug: "/ssc-cgl",
  landingPath: "/ssc-cgl-practice-test",
  name: "SSC CGL Mock Test",
  shortName: "SSC CGL",
  fullName: "SSC CGL Tier 1 (Combined Graduate Level) exam",
  tagline: "100 questions in 60 minutes in the Tier 1 order: reasoning, general awareness, quantitative aptitude and English.",
  icon: "building",
  theme: { brand: "268 80% 37%", brandDark: "268 80% 28%", brandLight: "268 80% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cgl",
      name: "SSC CGL Tier 1",
      shortName: "Tier 1",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(60) }],
      directions: "100 questions in 60 minutes, in the Tier 1 order: 25 General Intelligence and Reasoning, 25 General Awareness, 25 Quantitative Aptitude and 25 English Comprehension. There is no sectional timing, so move freely and flag questions to come back to. The real exam takes 0.50 marks off for each wrong answer; this practice test scores percent correct.",
      scale: percentScale(100),
      domains: ["cglVerbal", "cglLogical", "cglPolity", "cglScience", "cglArithmetic", "cglAdvanced", "cglGrammar", "cglVocab"],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    cglVerbal: "Reasoning: Analogy, Series and Coding",
    cglLogical: "Reasoning: Relations, Directions and Logic",
    cglPolity: "General Awareness: Polity and History",
    cglScience: "General Awareness: Geography, Economy and Science",
    cglArithmetic: "Quantitative Aptitude: Arithmetic",
    cglAdvanced: "Quantitative Aptitude: Algebra, Geometry and Trigonometry",
    cglGrammar: "English: Grammar and Cloze",
    cglVocab: "English: Vocabulary and Comprehension",
  },
  drills: [
    { key: "verbal", name: "Analogy, Series and Coding", section: "cgl", domains: ["cglVerbal"], blurb: "Number and letter analogies, odd one out, series, coding-decoding and dictionary order." },
    { key: "logical", name: "Relations, Directions and Logic", section: "cgl", domains: ["cglLogical"], blurb: "Blood relations, directions, ranking, syllogisms, calendars, clocks and seating." },
    { key: "polity", name: "Polity and History", section: "cgl", domains: ["cglPolity"], blurb: "The Constitution, Parliament, writs and amendments, and ancient, medieval and modern India." },
    { key: "science", name: "Geography, Economy and Science", section: "cgl", domains: ["cglScience"], blurb: "Rivers, soils and states, the RBI and GST, and everyday physics, chemistry and biology." },
    { key: "arithmetic", name: "Arithmetic", section: "cgl", domains: ["cglArithmetic"], blurb: "Percentage, profit and discount, ratio, average, interest, work, speed and trains." },
    { key: "advanced", name: "Algebra, Geometry and Trigonometry", section: "cgl", domains: ["cglAdvanced"], blurb: "Identities, angles and circles, trigonometric values, mensuration and data tables." },
    { key: "grammar", name: "Grammar and Cloze", section: "cgl", domains: ["cglGrammar"], blurb: "Spotting errors, fill in the blanks, improvement, voice, narration and cloze passages." },
    { key: "vocab", name: "Vocabulary and Comprehension", section: "cgl", domains: ["cglVocab"], blurb: "Synonyms, antonyms, idioms, one-word substitution, spelling and reading passages." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [60, 70, 75, 80, 90],
  goalNotes: {
    60: "A first target while you build speed",
    70: "A solid target for qualifying",
    75: "A safer margin for most posts",
    80: "Strong: aiming for a top post",
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
    sourceLine: "Original practice questions on the SSC CGL Tier 1 syllabus and pattern. Not affiliated with or endorsed by the Staff Selection Commission.",
    scoreNote: "Percent correct. The real Tier 1 gives 2 marks for each right answer and takes away 0.50 marks for each wrong one, out of 200; unanswered questions score zero. Cut-offs change every year and by category and post, so treat your goal as a readiness line and guess only when you can rule out at least one option.",
  },
};
