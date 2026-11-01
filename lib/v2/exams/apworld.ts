import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AP World History: Modern (College Board). AP World History: Modern
// Course and Exam Description, effective fall 2026, and the AP Central exam
// page (checked 1 November 2026): a fully digital exam of 3 hours 15
// minutes. Section I Part A is 55 multiple-choice questions in 55 minutes,
// 40% of the score, "typically appearing in sets of three to four
// questions, each with one or more stimuli" (primary and secondary texts,
// images, charts, maps), with at least one set of paired text-based
// stimuli. Part B is 3 short-answer questions in 40 minutes (20%); Section
// II is the document-based question (60 minutes, 25%) and the long essay
// (40 minutes, 15%). The short-answer and long-essay questions are updated
// for the May 2027 exam; course content is unchanged. Unit weights: Units
// 1, 2, 7, 8 and 9 8-10% each, Units 3 to 6 12-15% each.
// Modelled: Part A only, at full length and pace (55 in 55 minutes), one
// module per test, in chronological order. Per test: Units 1 and 2 10
// (5 + 5), Unit 3 8, Unit 4 7, Unit 5 8, Unit 6 7, Units 7 to 9 15
// (5 + 5 + 5), every question in a stimulus set of 3 or 4, one
// paired-historians set and one table per test. Every source is an
// original practice text written in the style of its time; its label
// describes the kind of writer, not a real person. Four answer choices, as
// in the CED's sample questions. Percent score; the College Board converts
// a weighted composite to 1 to 5 each year and publishes no fixed cut.
// Sources: tools/next100/apworld/sources.md.
export const APWORLD: ExamV2Config = {
  id: "apworld",
  slug: "/ap-world-history",
  landingPath: "/ap-world-history-practice-test",
  icon: "graduation",
  name: "AP World History Practice Test",
  shortName: "AP World History",
  fullName: "AP World History: Modern Exam",
  tagline: "The AP World History: Modern multiple-choice section: 55 source-based questions in 55 minutes, c. 1200 to the present.",
  theme: { brand: "30 25% 36%", brandDark: "30 25% 28%", brandLight: "30 25% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "mcq",
      name: "Multiple Choice",
      shortName: "Multiple Choice",
      modules: [{ module: 1, questionCount: 55, timeLimit: 55 * 60 }],
      directions:
        "55 multiple-choice questions in 55 minutes, like Part A of Section I of the AP World History: Modern Exam. Questions come in sets of three or four that share a source shown beside them: an excerpt, a historian's interpretation or a small table. Every source is an original practice text written in the style of its time; its label describes the kind of writer, not a real person. Each question has four choices and one best answer, and there is no penalty for a wrong answer, so answer every question.",
      scale: percentScale(55),
      domains: ["apworldU12", "apworldU3", "apworldU4", "apworldU5", "apworldU6", "apworldU789"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    apworldU12: "Units 1 and 2: c. 1200 to c. 1450",
    apworldU3: "Unit 3: Land-Based Empires",
    apworldU4: "Unit 4: Transoceanic Interconnections",
    apworldU5: "Unit 5: Revolutions",
    apworldU6: "Unit 6: Consequences of Industrialization",
    apworldU789: "Units 7 to 9: c. 1900 to the present",
  },
  drills: [
    { key: "u12", name: "Units 1 and 2: c. 1200 to c. 1450", section: "mcq", domains: ["apworldU12"], blurb: "Song China, Dar al-Islam, South and Southeast Asia, the Americas and Africa, the Mongols, the Silk Roads, the Indian Ocean and the trans-Saharan trade." },
    { key: "u3", name: "Unit 3: Land-Based Empires", section: "mcq", domains: ["apworldU3"], blurb: "The Ottoman, Safavid, Mughal and Qing empires, gunpowder and bureaucracy, and the Reformation." },
    { key: "u4", name: "Unit 4: Transoceanic Interconnections", section: "mcq", domains: ["apworldU4"], blurb: "Maritime empires, the Columbian Exchange, silver, the Atlantic slave trade and resistance." },
    { key: "u5", name: "Unit 5: Revolutions", section: "mcq", domains: ["apworldU5"], blurb: "The Enlightenment, the Atlantic revolutions, nationalism, the Industrial Revolution and its reformers." },
    { key: "u6", name: "Unit 6: Consequences of Industrialization", section: "mcq", domains: ["apworldU6"], blurb: "Imperialism in Asia and Africa, settler colonies, economic imperialism and global migration." },
    { key: "u789", name: "Units 7 to 9: c. 1900 to the present", section: "mcq", domains: ["apworldU789"], blurb: "The world wars, the Depression, the Cold War, decolonization and globalization." },
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
      "Drill each unit, then take a full multiple-choice section.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the multiple-choice section.",
    ],
    sourceLine: "Original practice questions and sources written to the College Board AP World History: Modern course framework. AP is a trademark of the College Board, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full multiple-choice section, which is 40% of the real AP score. The short-answer questions (20%), the document-based question (25%) and the long essay (15%) are not included. The College Board combines all four parts into a composite and converts it to an AP score of 1 to 5 each year, with no fixed percent for each score, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
