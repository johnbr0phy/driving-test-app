import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// JKSSB Junior Assistant written test, Jammu and Kashmir Services Selection
// Board. Syllabus notice of 23.12.2025 for Advertisement Notification No. 08
// of 2025 (27.09.2025), Annexure "A": one objective written test of 80 marks
// in 80 minutes in four units of 20 marks: General English; General
// Awareness with special reference to J&K UT; Numerical and Reasoning
// Ability; Basic Concepts of Computers. The 2026 test was OMR based (notice
// of 24.03.2026: held 19.04.2026). Selection is the written test (80 points)
// plus a type test at 35 words a minute (20 points), per the advertisement.
// JKSSB's Junior Assistant CBT instructions of 19.01.2022 give 80 MCQs in 80
// minutes with 0.25 marks off each wrong answer; that is explained in
// scoreNote and on the landing, not applied. Modelled at full length: 80
// questions in 80 minutes in the syllabus's unit order, two drills per unit
// (10 each per test). GA is static facts only (current events not modelled);
// J&K facts are as a Union Territory since 31 October 2019. Reasoning is text
// only. Sources: tools/next100/jkssbja/sources.md.
const minutes = (n: number) => n * 60;

export const JKSSBJA: ExamV2Config = {
  id: "jkssbja",
  slug: "/jkssb-junior-assistant",
  landingPath: "/jkssb-junior-assistant-practice-test",
  name: "JKSSB Junior Assistant Practice Test",
  shortName: "JKSSB JA",
  fullName: "JKSSB Junior Assistant Written Test",
  tagline: "JKSSB Junior Assistant mock tests on the official syllabus: General English, General Awareness with J&K, Numerical and Reasoning Ability, and Computers.",
  icon: "building",
  theme: { brand: "285 85% 30%", brandDark: "285 85% 22%", brandLight: "285 85% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "paper",
      name: "Written Test",
      shortName: "Written",
      modules: [{ module: 1, questionCount: 80, timeLimit: minutes(80) }],
      directions: "80 questions in 80 minutes, the same marks and time as the real written test, in its four units of 20: General English (1 to 20), General Awareness with special reference to J&K (21 to 40), Numerical and Reasoning Ability (41 to 60) and Basic Concepts of Computers (61 to 80). You can move between questions and flag them. JKSSB has deducted 0.25 marks for each wrong answer in its Junior Assistant tests; this mock scores percent correct, so note which answers were guesses.",
      scale: percentScale(80),
      domains: ["jkjaGrammar", "jkjaVocab", "jkjaIndia", "jkjaJK", "jkjaArith", "jkjaReason", "jkjaComputer", "jkjaOffice"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    jkjaGrammar: "English: Grammar and Usage",
    jkjaVocab: "English: Vocabulary and Comprehension",
    jkjaIndia: "General Awareness: India",
    jkjaJK: "General Awareness: Jammu and Kashmir",
    jkjaArith: "Numerical Ability: Arithmetic",
    jkjaReason: "Reasoning Ability",
    jkjaComputer: "Computers: Fundamentals and Operating System",
    jkjaOffice: "Computers: MS Office, E-mail and Internet",
  },
  drills: [
    { key: "grammar", name: "Grammar and Usage", section: "paper", domains: ["jkjaGrammar"], blurb: "Articles, modals, prepositions, narration, voice, clauses, punctuation, error spotting and jumbled sentences." },
    { key: "vocab", name: "Vocabulary and Comprehension", section: "paper", domains: ["jkjaVocab"], blurb: "Synonyms, antonyms, idioms, homophones, phrases and pronouns in blanks, and a reading passage." },
    { key: "india", name: "India GK", section: "paper", domains: ["jkjaIndia"], blurb: "Political and physical divisions, culture and the freedom struggle, Census, rivers, lakes, climate, crops and transport." },
    { key: "jk", name: "Jammu and Kashmir GK", section: "paper", domains: ["jkjaJK"], blurb: "J&K's history, the 2019 Reorganisation Act, geography, economy, culture, heritage and tourist places." },
    { key: "arithmetic", name: "Arithmetic", section: "paper", domains: ["jkjaArith"], blurb: "Number system, percentage, average, profit and loss, ratio and proportion, and time and work." },
    { key: "reasoning", name: "Reasoning", section: "paper", domains: ["jkjaReason"], blurb: "Number and letter series, coding, directions, blood relations, sign rules, speed and distance, and conclusions." },
    { key: "computer", name: "Computer Fundamentals", section: "paper", domains: ["jkjaComputer"], blurb: "CPU and memory, number systems, hardware and software, input and output devices, and the operating system." },
    { key: "office", name: "MS Office and Internet", section: "paper", domains: ["jkjaOffice"], blurb: "MS Word, Excel, Access and PowerPoint, e-mail, the internet and e-governance." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A starting target",
    60: "A solid score",
    70: "A competitive score",
    80: "A strong, safe score",
    90: "An excellent score",
  },
  testLength: "1 hr 20 min",
  copy: {
    heroSubs: [
      "Drill each unit, then take a full mock test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the written test.",
    ],
    sourceLine: "Original practice questions on the JKSSB Junior Assistant syllabus (notice of 23.12.2025). Not affiliated with or endorsed by the Jammu and Kashmir Services Selection Board.",
    scoreNote: "Percent correct. The real written test has 80 objective questions for 80 marks in 80 minutes, and JKSSB's Junior Assistant instructions take away 0.25 marks for each wrong answer, so four wrong guesses cost one mark: answer what you can rule down, and skip blind guesses. The written test gives 80 of the 100 selection points; a type test at 35 words a minute gives the other 20. Cut-offs depend on the category and the post, so treat your goal as a readiness line and check your admit card for the marking rules.",
  },
};
