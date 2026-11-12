import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AP Italian Language and Culture (College Board). AP Italian Language and
// Culture Course and Exam Description, effective fall 2026 (the revised world
// language course, first exam May 3, 2027, fully digital in Bluebook), and
// the AP Central exam page (checked 12 November 2026). Section I is free
// response (project presentation, project Q&A, argumentative essay; 50%).
// Section II is 55 multiple-choice questions in 80 minutes (50%) in 11 sets
// of five questions: Part A Listening, 25 questions in 40 minutes (25%), and
// Part B Reading, 30 questions in 40 minutes (25%), six sets across four
// task types (Article, Article and Chart, Literary Text, Promotional
// Material, 1 to 2 sets each). Questions are in Italian with four choices
// (A to D); no penalty for wrong answers. Six thematic units: Families and
// Communities, Language and Culture, Art and Creativity, Science and
// Technology, Contemporary Life, Global Contexts.
// Modelled: Part B (Reading) only, at full length and pace (30 in 40
// minutes), one module per test, six sets of five in unit order (one set
// per unit), every task type in each test. Every text is an original
// practice text in Italian; places, people and data are invented and say
// so. Listening and the free-response section are not modelled. Percent
// score; the College Board converts a weighted composite to 1 to 5 each
// year and publishes no fixed cut.
// Sources: tools/next100/apitalian/sources.md.
export const APITALIAN: ExamV2Config = {
  id: "apitalian",
  slug: "/ap-italian",
  landingPath: "/ap-italian-practice-test",
  icon: "graduation",
  name: "AP Italian Practice Test",
  shortName: "AP Italian",
  fullName: "AP Italian Language and Culture Exam",
  tagline: "The AP Italian reading section: 30 questions in Italian in 40 minutes, six sets on articles, charts, stories and ads.",
  theme: { brand: "320 70% 32%", brandDark: "320 70% 24%", brandLight: "320 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "read",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 30, timeLimit: 40 * 60 }],
      directions:
        "30 multiple-choice questions in 40 minutes, like Part B (Reading) of Section II of the AP Italian Language and Culture Exam. The questions come in six sets of five, each on one text shown beside it: an article, an article with a chart, a literary excerpt or promotional material. Questions and texts are in Italian. Every text is an original practice text; its places, people and data are invented. Each question has four choices and one best answer, and there is no penalty for a wrong answer, so answer every question.",
      scale: percentScale(30),
      domains: ["apitalianFamilies", "apitalianLanguage", "apitalianArt", "apitalianScience", "apitalianContemporary", "apitalianGlobal"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    apitalianFamilies: "Families and Communities",
    apitalianLanguage: "Language and Culture",
    apitalianArt: "Art and Creativity",
    apitalianScience: "Science and Technology",
    apitalianContemporary: "Contemporary Life",
    apitalianGlobal: "Global Contexts",
  },
  drills: [
    { key: "families", name: "Families and Communities", section: "read", domains: ["apitalianFamilies"], blurb: "Grandparents and grandchildren, neighborhoods, village life and volunteering." },
    { key: "language", name: "Language and Culture", section: "read", domains: ["apitalianLanguage"], blurb: "Dialects, Italian words abroad, translation, language courses and traditions like the Befana." },
    { key: "art", name: "Art and Creativity", section: "read", domains: ["apitalianArt"], blurb: "Street art, theater, crafts, restoration, design and museums." },
    { key: "science", name: "Science and Technology", section: "read", domains: ["apitalianScience"], blurb: "Phones and sleep, citizen science, solar energy, coding and telemedicine." },
    { key: "contemporary", name: "Contemporary Life", section: "read", domains: ["apitalianContemporary"], blurb: "Summer jobs, sport, free time, studying away from home, food and the maturità." },
    { key: "global", name: "Global Contexts", section: "read", domains: ["apitalianGlobal"], blurb: "Climate and the sea, water, waste, travel by train and a town's memory of a flood." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [55, 60, 65, 70, 75, 80, 85],
  goalNotes: {
    55: "A starting target",
    60: "Building a solid base",
    65: "Getting there",
    70: "A strong reading section",
    75: "Strong with room to spare",
    80: "Aiming high",
    85: "Aiming for the top score",
  },
  testLength: "40 min",
  copy: {
    heroSubs: [
      "Drill each unit, then take a full reading section.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the reading section.",
    ],
    sourceLine: "Original practice texts and questions written to the College Board AP Italian Language and Culture course framework. AP is a trademark of the College Board, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full reading part (Part B of Section II), which is 25% of the real AP score. The listening part (25%) and the free-response section (the project presentation, project Q&A and argumentative essay, 50%) are not included. The College Board combines all parts into a composite and converts it to an AP score of 1 to 5 each year, with no fixed percent for each score, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
