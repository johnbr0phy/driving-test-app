import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Rajasthan Police Constable written examination (Rajasthan Police, Police
// Headquarters Jaipur), as held for the 2025 recruitment: notification of
// 9 April 2025, applications 28 April to 25 May 2025, written exam 13 and 14
// September 2025 (OMR). Pattern, per the 2025 notification as summarised by
// exam guides (checked 2026-11-01; the department's own site did not load):
// 150 objective questions, 150 marks, 2 hours, three parts: logical ability,
// reasoning and basic computer knowledge 60; general knowledge, general science,
// social science, current affairs, laws on crimes against women and children,
// and Rajasthan government schemes and institutions 45; Rajasthan's history,
// culture, art, geography, economy and polity 45. A quarter of a question's
// marks off per wrong answer, explained, not scored. There is no Hindi language
// section (the paper is set in Hindi and English). Modelled at two thirds
// length and the real pace (0.8 minute a question): 100 questions in 80
// minutes, 40/30/30 by part, grouped in the paper's order. GK is static facts
// only, no current affairs, schemes or office-holders.
// Sources: tools/next100/rajpolice/sources.md.
const minutes = (n: number) => n * 60;

export const RAJPOLICE: ExamV2Config = {
  id: "rajpolice",
  slug: "/rajasthan-police-constable",
  landingPath: "/rajasthan-police-constable-practice-test",
  name: "Rajasthan Police Constable Practice Test",
  shortName: "Rajasthan Police",
  fullName: "Rajasthan Police Constable Written Exam",
  tagline: "Rajasthan Police Constable mock tests on the written exam pattern: reasoning and computer, general knowledge with laws on women and children, and Rajasthan GK.",
  icon: "siren",
  theme: { brand: "35 62% 38%", brandDark: "35 62% 28%", brandLight: "35 62% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "paper",
      name: "Written Exam",
      shortName: "Written",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(80) }],
      directions: "100 questions in 80 minutes, the real exam's pace of 0.8 minute a question, grouped by part: reasoning and basic computer knowledge (1 to 40), general knowledge with laws on women and children (41 to 70), then Rajasthan GK (71 to 100). The real paper has 150 questions in 2 hours. You can move between questions and flag them. Guides report that the real exam takes off a quarter of a question's marks for each wrong answer; this practice test scores percent correct, so note how many you would have guessed.",
      scale: percentScale(100),
      domains: ["rajVerbal", "rajLogical", "rajComputer", "rajIndia", "rajLaw", "rajHistory", "rajCulture", "rajGeo"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    rajVerbal: "Reasoning: Verbal and Series",
    rajLogical: "Reasoning: Logical",
    rajComputer: "Basic Computer Knowledge",
    rajIndia: "General Knowledge: India and Science",
    rajLaw: "Laws on Crimes Against Women and Children",
    rajHistory: "Rajasthan GK: History",
    rajCulture: "Rajasthan GK: Art and Culture",
    rajGeo: "Rajasthan GK: Geography, Economy and Polity",
  },
  drills: [
    { key: "verbal", name: "Verbal Reasoning", section: "paper", domains: ["rajVerbal"], blurb: "Analogies, odd one out, number and letter series, coding-decoding and alphabet tests." },
    { key: "logical", name: "Logical Reasoning", section: "paper", domains: ["rajLogical"], blurb: "Blood relations, directions, ranking, syllogisms, calendar, clock and arrangements." },
    { key: "computer", name: "Basic Computer", section: "paper", domains: ["rajComputer"], blurb: "Hardware and memory, MS Word, Excel and PowerPoint, internet, email and cyber safety." },
    { key: "india", name: "India GK and Science", section: "paper", domains: ["rajIndia"], blurb: "History, the national movement, the Constitution, geography, general science and economy." },
    { key: "law", name: "Women and Children: the Law", section: "paper", domains: ["rajLaw"], blurb: "POCSO, domestic violence, dowry, child marriage, juvenile justice, helplines and rights." },
    { key: "history", name: "Rajasthan History", section: "paper", domains: ["rajHistory"], blurb: "Harappan sites, Mewar and Marwar, 1857, peasant and tribal movements and integration." },
    { key: "culture", name: "Rajasthan Art and Culture", section: "paper", domains: ["rajCulture"], blurb: "Folk dances and music, painting schools, crafts, fairs, folk deities and monuments." },
    { key: "geography", name: "Rajasthan Geography and Polity", section: "paper", domains: ["rajGeo"], blurb: "Rivers, lakes, minerals, energy, wildlife, state symbols and the state's institutions." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [40, 50, 60, 70, 80, 90],
  goalNotes: {
    40: "Near the general minimum that guides report",
    50: "A starting target",
    60: "A solid score",
    70: "A competitive score",
    80: "A strong, safe score",
    90: "An excellent score",
  },
  testLength: "1 hr 20 min",
  copy: {
    heroSubs: [
      "Drill each part, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the written exam.",
    ],
    sourceLine: "Original practice questions on the Rajasthan Police Constable written exam syllabus (2025 recruitment). Not affiliated with or endorsed by Rajasthan Police or the Government of Rajasthan.",
    scoreNote: "Percent correct, with no negative marking. The real written exam has 150 questions in 2 hours (1 mark each, guides report); these mock tests have 100 at the same pace, in the same 60/45/45 balance of parts. Guides report a deduction of a quarter of a mark for each wrong answer, so a blind guess among four options still gains a little on average (a sixteenth of a mark), and ruling out even one option makes a guess clearly worth taking. Recent notifications set minimum qualifying marks (guides give 40% for the general category and 36% for SC and ST), but merit for the posts goes far above that. Check the rules in your own notification.",
  },
};
