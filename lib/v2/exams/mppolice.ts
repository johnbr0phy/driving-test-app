import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// MP Police Constable written examination (Police Constable Recruitment Test,
// conducted by the Madhya Pradesh Employees Selection Board, MPESB, formerly
// Vyapam). Latest recruitment: 7,500 constable posts, applications from
// 15 September 2025, written exam from 30 October 2025, online (CBT), two
// shifts a day; first-phase result 25 January 2026 and physical tests from
// 23 February to 13 March 2026, per news reports (checked 2026-11-01).
// Pattern, per the MPESB rule book as summarised by exam guides (the rule book
// PDF on esb.mp.gov.in could not be loaded, checked 2026-11-01): 100 objective
// questions, 1 mark each, 100 marks, 2 hours, no negative marking, in three
// parts: General Knowledge and Reasoning 40, Intellectual Ability and Mental
// Ability 30, Science and Simple Arithmetic 30. No General Hindi section is
// listed. Modelled at full length: 100 questions in 120 minutes, grouped in
// the paper's three parts. Guides say the questions are at about class 8 to 10
// level. GK is static facts only (India, Madhya Pradesh, computer basics), no
// current affairs, no office-holders. Physical tests are not modelled.
// Sources: tools/next100/mppolice/sources.md.
const minutes = (n: number) => n * 60;

export const MPPOLICE: ExamV2Config = {
  id: "mppolice",
  slug: "/mp-police-constable",
  landingPath: "/mp-police-constable-practice-test",
  name: "MP Police Constable Practice Test",
  shortName: "MP Police",
  fullName: "MP Police Constable Written Exam (MPESB)",
  tagline: "MP Police Constable mock tests on the MPESB written exam pattern: General Knowledge and Reasoning, Intellectual and Mental Ability, Science and Simple Arithmetic.",
  icon: "siren",
  theme: { brand: "191 46% 38%", brandDark: "191 46% 28%", brandLight: "191 46% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "paper",
      name: "Written Exam",
      shortName: "Written",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(120) }],
      directions: "100 questions in 2 hours, the same length and time as the real paper, in its three parts: General Knowledge and Reasoning (1 to 40), Intellectual and Mental Ability (41 to 70), then Science and Simple Arithmetic (71 to 100). You can move between questions and flag them. There is no negative marking, so answer every question.",
      scale: percentScale(100),
      domains: ["mppIndia", "mppState", "mppComputer", "mppVerbal", "mppLogical", "mppMental", "mppScience", "mppArith"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    mppIndia: "General Knowledge: India",
    mppState: "General Knowledge: Madhya Pradesh",
    mppComputer: "General Knowledge: Computer Awareness",
    mppVerbal: "Reasoning: Analogies, Classification and Series",
    mppLogical: "Intellectual Ability: Logical Reasoning",
    mppMental: "Mental Ability: Coding, Calendar, Clock and Puzzles",
    mppScience: "General Science",
    mppArith: "Simple Arithmetic",
  },
  drills: [
    { key: "india", name: "India GK", section: "paper", domains: ["mppIndia"], blurb: "History, the freedom struggle, geography, the Constitution, economy, culture, books and sports." },
    { key: "state", name: "Madhya Pradesh GK", section: "paper", domains: ["mppState"], blurb: "MP's history, rivers, national parks, heritage sites, crafts, tribes and state symbols." },
    { key: "computer", name: "Computer Awareness", section: "paper", domains: ["mppComputer"], blurb: "Hardware, memory, MS Office shortcuts, the internet and email." },
    { key: "verbal", name: "Analogies and Series", section: "paper", domains: ["mppVerbal"], blurb: "Word and number analogies, odd one out, and number and letter series." },
    { key: "logical", name: "Logical Reasoning", section: "paper", domains: ["mppLogical"], blurb: "Blood relations, directions, ranking, syllogisms, arrangements and simple sets." },
    { key: "mental", name: "Mental Ability", section: "paper", domains: ["mppMental"], blurb: "Coding-decoding, alphabet tests, calendar, clock, symbol operations and missing numbers." },
    { key: "science", name: "General Science", section: "paper", domains: ["mppScience"], blurb: "Physics, chemistry and biology to class 10, with health and diseases." },
    { key: "arithmetic", name: "Simple Arithmetic", section: "paper", domains: ["mppArith"], blurb: "Percentages, profit and discount, interest, averages, work, speed, mensuration and probability." },
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
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each subject, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the written exam.",
    ],
    sourceLine: "Original practice questions on the MP Police Constable written exam syllabus (MPESB Police Constable Recruitment Test). Not affiliated with or endorsed by the Madhya Pradesh Employees Selection Board or Madhya Pradesh Police.",
    scoreNote: "Percent correct. Like the real written exam as guides describe it, each question is worth one mark and there is no negative marking, so this score is your mark out of 100. The real paper has 100 questions in 2 hours, the same as these mock tests. Shortlisting for the physical tests goes by written exam marks within each category (guides say about seven times the posts), and the final merit list adds the physical test marks, so aim well above any minimum.",
  },
};
