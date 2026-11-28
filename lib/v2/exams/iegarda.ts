import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Garda Trainee, Stage 1 online assessments (publicjobs for An Garda
// Síochána, Ireland). An Garda Síochána's selection flowchart (fetched
// 2026-11-23) names Stage 1 as online verbal and numerical reasoning tests and
// a written exercise; the 2024 candidate booklet says Stage 1 is remotely
// proctored, scored and ranked on an order of merit; the 2026 FAQ says the
// aptitude tests are in English only. publicjobs describes its verbal
// reasoning test as judging statements against written passages and its
// numerical reasoning test as drawing conclusions from numerical information,
// both multiple choice. No question counts, times, provider or pass mark are
// published, so the split here is Tigertest's: verbal 30 questions in 25
// minutes (five passages, four True / False / Cannot say statements and two
// single-answer questions each) and numerical 20 in 25 minutes (four tables of
// five questions, calculator on). The written exercise and Stage 2 interview
// and roleplay are not modelled. Two practice tests, Test 2 held out; four
// drills. Score is percent correct, never a rank.
// Sources: tools/next100/iegarda/sources.md.
const minutes = (n: number) => n * 60;

export const IEGARDA: ExamV2Config = {
  id: "iegarda",
  slug: "/garda-trainee",
  landingPath: "/garda-trainee-assessment-practice-test",
  name: "Garda Trainee Assessment Practice Test",
  shortName: "Garda Trainee",
  fullName: "Garda Trainee Stage 1 assessments (verbal and numerical reasoning)",
  tagline: "Stage 1 reasoning practice: True, False or Cannot say passages, single-answer reading questions and numerical reasoning on tables.",
  icon: "shield",
  theme: { brand: "192 20% 14%", brandDark: "192 20% 10%", brandLight: "192 30% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "verbal",
      name: "Verbal Reasoning",
      shortName: "Verbal",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(25) }],
      directions:
        "30 questions in 25 minutes on five short passages. For each statement, answer True if the passage shows it is true, False if the passage shows it is false, and Cannot say if the passage does not give enough to decide. Use only what the passage says, not what you know. Move freely and flag questions to come back to.",
      scale: percentScale(30),
      domains: ["gardaVerbalTfc", "gardaVerbalInfer"],
    },
    {
      key: "numerical",
      name: "Numerical Reasoning",
      shortName: "Numerical",
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(25) }],
      calculator: true,
      directions:
        "20 questions in 25 minutes on four tables of figures. Find the numbers each question needs, then work out percentages, changes, totals, averages and ratios. The calculator is on. Move freely and flag questions to come back to.",
      scale: percentScale(20),
      domains: ["gardaNumPct", "gardaNumCalc"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    gardaVerbalTfc: "True, False or Cannot Say",
    gardaVerbalInfer: "Reading for Meaning",
    gardaNumPct: "Percentages and Change",
    gardaNumCalc: "Totals, Averages and Ratios",
  },
  drills: [
    { key: "tfc", name: "True, False or Cannot Say", section: "verbal", domains: ["gardaVerbalTfc"], blurb: "Judge statements against a passage, using only what it says.", basics: ["findingDetail", "inference", "mustBeTrue", "drawConclusions"] },
    { key: "pct", name: "Percentages and Change", section: "numerical", domains: ["gardaNumPct"], blurb: "Shares of a total, rates and percentage rises and falls from tables.", basics: ["fsmFdp", "percents", "percentChange", "readingTable"] },
    { key: "meaning", name: "Reading for Meaning", section: "verbal", domains: ["gardaVerbalInfer"], blurb: "Main points, best supported conclusions, assumptions and words in context." },
    { key: "calc", name: "Totals, Averages and Ratios", section: "numerical", domains: ["gardaNumCalc"], blurb: "Totals, differences, averages, rates, ratios and costs from tables." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 70, 80, 90],
  goalNotes: {
    60: "30 out of 50",
    70: "35 out of 50",
    80: "40 out of 50",
    90: "45 out of 50",
  },
  testLength: "50 min",
  copy: {
    heroSubs: [
      "Start with the Basics for True, False or Cannot Say. Practise the four drills and take both timed tests.",
      "Master each drill first.",
      "Take Practice Test 1 against the clock.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Original practice questions on the verbal and numerical reasoning tests An Garda Síochána names for Stage 1. Not affiliated with or endorsed by publicjobs or An Garda Síochána.",
    scoreNote: "Percent correct. The real Stage 1 tests have no published pass mark: publicjobs ranks candidates on their scores and invites those highest on the order of merit to interview. Tigertest does not estimate a rank.",
  },
};
