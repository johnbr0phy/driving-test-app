import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// UPSC Civil Services (Preliminary) Examination, General Studies Paper I, on
// the scheme in Examination Notice No. 05/2026-CSE (4 February 2026;
// preliminary held 24 May 2026; the 2027 calendar puts the next one on
// 23 May 2027). The preliminary is a screening test of two compulsory
// objective papers of 200 marks and two hours each, set in Hindi and
// English. Paper I (General Studies) decides who goes to the Main
// examination; Paper II (CSAT) is qualifying, with 33% needed. Four options
// per question and one-third of a question's marks deducted for each wrong
// answer (a blank costs nothing; more than one answer counts as wrong).
// Paper I has 100 questions of 2 marks each and Paper II 80 of 2.5 marks
// each (question counts from guides; the notice gives marks and time only).
// Practice tests are full-length Paper I mocks: 100 questions in 120
// minutes, with the subjects mixed as on the real paper. Tigertest's split
// per test (UPSC publishes no subject weights): ancient and medieval history
// and culture 14, modern history 14, geography 16, polity 16, economy 14,
// environment 14, science 12. CSAT is offered as one drill-only domain
// (comprehension, reasoning, basic numeracy), never in a test. Static
// syllabus only: no current affairs and no office-holders. Negative marking
// is explained in the copy, not scored. Sources:
// tools/next100/upscse/sources.md.
const minutes = (n: number) => n * 60;

export const UPSCSE: ExamV2Config = {
  id: "upscse",
  slug: "/upsc-prelims",
  landingPath: "/upsc-prelims-practice-test",
  name: "UPSC Prelims Practice Test",
  shortName: "UPSC Prelims",
  fullName: "UPSC Civil Services (Preliminary) Examination, General Studies Paper I",
  tagline: "Full 100-question GS Paper I mocks in 2 hours, subject drills and a CSAT drill, on the static UPSC Prelims syllabus.",
  icon: "building",
  theme: { brand: "28 65% 30%", brandDark: "28 65% 22%", brandLight: "28 65% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "gs",
      name: "General Studies Paper I",
      shortName: "GS Paper I",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(120) }],
      directions: "100 questions in 2 hours, the real GS Paper I length, with history, geography, polity, economy, environment and science mixed as on the real paper. Many questions use the UPSC statement format: read every statement before choosing. You can move between questions and flag them. The real paper takes away one-third of a question's marks for each wrong answer; this practice test scores percent correct, so note how many you guessed.",
      scale: percentScale(100),
      domains: ["upscseAncient", "upscseModern", "upscseGeography", "upscsePolity", "upscseEconomy", "upscseEnvironment", "upscseScience", "upscseCsat"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    upscseAncient: "Ancient and Medieval India, Art and Culture",
    upscseModern: "Modern India and the National Movement",
    upscseGeography: "Indian and World Geography",
    upscsePolity: "Indian Polity and Governance",
    upscseEconomy: "Economic and Social Development",
    upscseEnvironment: "Environment, Ecology and Climate Change",
    upscseScience: "General Science and Technology",
    upscseCsat: "CSAT (Paper II)",
  },
  drills: [
    { key: "ancient", name: "Ancient, Medieval and Culture", section: "gs", domains: ["upscseAncient"], blurb: "Harappa to the Mughals and Marathas, with temple architecture, art, music, dance and the bhakti and Sufi movements." },
    { key: "modern", name: "Modern History", section: "gs", domains: ["upscseModern"], blurb: "Company rule, reform movements, constitutional acts and the national movement to 1947." },
    { key: "geography", name: "Geography", section: "gs", domains: ["upscseGeography"], blurb: "Physiography, rivers, soils, the monsoon, climatology, oceans and world places." },
    { key: "polity", name: "Polity", section: "gs", domains: ["upscsePolity"], blurb: "The Constitution, Parliament, the executive, the judiciary, constitutional bodies and Panchayati Raj." },
    { key: "economy", name: "Economy", section: "gs", domains: ["upscseEconomy"], blurb: "National income, money and banking, public finance, inflation, the external sector and institutions." },
    { key: "environment", name: "Environment", section: "gs", domains: ["upscseEnvironment"], blurb: "Ecology, biodiversity, protected areas, pollution, conventions and climate change." },
    { key: "science", name: "Science and Technology", section: "gs", domains: ["upscseScience"], blurb: "Biology and health, physics, chemistry, space, biotechnology and digital technology." },
    { key: "csat", name: "CSAT", section: "gs", domains: ["upscseCsat"], blurb: "Paper II practice: reading comprehension, reasoning and Class X numeracy. Qualifying at 33%." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "A starting point",
    50: "Getting there",
    60: "A solid score",
    70: "A strong score",
    80: "Very strong, with room for the penalty",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each subject, then sit a full GS paper.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for GS Paper I.",
    ],
    sourceLine: "Original practice questions on the static syllabus of the UPSC Civil Services (Preliminary) Examination, General Studies Paper I, with a CSAT drill. Not affiliated with or endorsed by the Union Public Service Commission.",
    scoreNote: "Percent correct, with no negative marking. The real GS Paper I takes away one-third of a question's marks for each wrong answer, so a blind guess among four options breaks even on average, while ruling out even one option makes a guess worth taking. UPSC sets the GS Paper I cut-off each year, and you must also score 33% in the CSAT paper. These mocks cover static topics only; current events are a large part of the real paper.",
  },
};
