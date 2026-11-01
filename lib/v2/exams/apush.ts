import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AP United States History (College Board). AP U.S. History Course and
// Exam Description, effective fall 2026, and the AP Central exam page
// (checked 1 November 2026): a fully digital exam of 3 hours 15 minutes.
// Section I Part A is 55 multiple-choice questions in 55 minutes, 40% of
// the score, "typically appearing in sets of three to four questions, each
// with one or more stimuli" (primary and secondary texts, images, charts,
// maps), with at least one set of paired texts in the multiple choice or a
// short-answer question; four answer choices (A to D). Part B is 3
// short-answer questions in 40 minutes (20%); Section II is the
// document-based question (60 minutes, 25%) and the long essay (40
// minutes, 15%). The short-answer and long-essay questions are updated for
// the May 2027 exam; the multiple choice is not. Unit weights: Period 1
// 4-6%, Period 2 6-8%, Periods 3 to 8 10-17% each, Period 9 4-6%.
// Modelled: Part A only, at full length and pace (55 in 55 minutes), one
// module per test, in chronological order. Per test: Periods 1 and 2 7
// (3 + 4), Period 3 7, Period 4 8, Period 5 8, Period 6 7, Period 7 8,
// Periods 8 and 9 10 (7 + 3), every question in a stimulus set of 3 or 4,
// one paired-historians set per test. Every source is an original practice
// text written in the style of its time; its label describes the kind of
// writer, not a real person. Percent score; the College Board converts a
// weighted composite to 1 to 5 each year and publishes no fixed cut.
// Sources: tools/next100/apush/sources.md.
export const APUSH: ExamV2Config = {
  id: "apush",
  slug: "/ap-us-history",
  landingPath: "/ap-us-history-practice-test",
  icon: "graduation",
  name: "AP US History Practice Test",
  shortName: "AP US History",
  fullName: "AP United States History Exam",
  tagline: "The AP U.S. History multiple-choice section: 55 source-based questions in 55 minutes, Period 1 to Period 9.",
  theme: { brand: "0 25% 38%", brandDark: "0 25% 30%", brandLight: "0 25% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "mcq",
      name: "Multiple Choice",
      shortName: "Multiple Choice",
      modules: [{ module: 1, questionCount: 55, timeLimit: 55 * 60 }],
      directions:
        "55 multiple-choice questions in 55 minutes, like Part A of Section I of the AP U.S. History Exam. Questions come in sets of three or four that share a source shown beside them: an excerpt, a historian's interpretation or a small table. Every source is an original practice text written in the style of its time; its label describes the kind of writer, not a real person. Each question has four choices and one best answer, and there is no penalty for a wrong answer, so answer every question.",
      scale: percentScale(55),
      domains: ["apushP12", "apushP3", "apushP4", "apushP5", "apushP6", "apushP7", "apushP89"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    apushP12: "Periods 1 and 2: 1491-1754",
    apushP3: "Period 3: 1754-1800",
    apushP4: "Period 4: 1800-1848",
    apushP5: "Period 5: 1844-1877",
    apushP6: "Period 6: 1865-1898",
    apushP7: "Period 7: 1890-1945",
    apushP89: "Periods 8 and 9: 1945-present",
  },
  drills: [
    { key: "p12", name: "Periods 1 and 2: 1491-1754", section: "mcq", domains: ["apushP12"], blurb: "Native societies, contact and the Columbian Exchange, Spanish, French and English colonies, and slavery." },
    { key: "p3", name: "Period 3: 1754-1800", section: "mcq", domains: ["apushP3"], blurb: "The Seven Years' War, the road to revolution, the Constitution and the first parties." },
    { key: "p4", name: "Period 4: 1800-1848", section: "mcq", domains: ["apushP4"], blurb: "The market revolution, Jacksonian democracy, Indian removal, reform and the spread of slavery." },
    { key: "p5", name: "Period 5: 1844-1877", section: "mcq", domains: ["apushP5"], blurb: "Manifest destiny, the sectional crisis, the Civil War and Reconstruction." },
    { key: "p6", name: "Period 6: 1865-1898", section: "mcq", domains: ["apushP6"], blurb: "Industry and labor, immigration and cities, the West, Populists and Jim Crow." },
    { key: "p7", name: "Period 7: 1890-1945", section: "mcq", domains: ["apushP7"], blurb: "Empire, the Progressives, World War I, the 1920s, the New Deal and World War II." },
    { key: "p89", name: "Periods 8 and 9: 1945-present", section: "mcq", domains: ["apushP89"], blurb: "The Cold War, civil rights, the Great Society, Vietnam, the new right and globalization." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [55, 60, 65, 70, 75, 80, 85],
  goalNotes: {
    55: "A starting target",
    60: "Building a solid base",
    65: "Getting there",
    70: "A strong multiple-choice section",
    75: "Strong with room to spare",
    80: "Aiming high",
    85: "Aiming for the top score",
  },
  testLength: "55 min",
  copy: {
    heroSubs: [
      "Drill each period, then take a full multiple-choice section.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the multiple-choice section.",
    ],
    sourceLine: "Original practice questions and sources written to the College Board AP U.S. History course framework. AP is a trademark of the College Board, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full multiple-choice section, which is 40% of the real AP score. The short-answer questions (20%), the document-based question (25%) and the long essay (15%) are not included. The College Board combines all four parts into a composite and converts it to an AP score of 1 to 5 each year, with no fixed percent for each score, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
