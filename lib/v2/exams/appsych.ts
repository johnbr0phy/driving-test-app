import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AP Psychology (College Board), the course and exam redesigned for
// 2024-25 (AP Central exam page and AP Psychology Course Overview, checked
// October 2026): a fully digital exam of 2 hours 40 minutes. Section I is
// 75 multiple-choice questions with four answer choices in 90 minutes,
// 66.7% of the exam score; Section II is two free-response questions in
// 70 minutes, 33.3% (the Article Analysis Question and the Evidence-Based
// Question). Each of the five units is 15 to 25% of the multiple-choice
// section; by science practice, Concept Application is 65%, Research
// Methods and Design 25% and Data Interpretation 10% (Argumentation is
// free-response only).
// Modelled: Section I only, at full length and pace (75 in 90 minutes), one
// module per test. Per test: 11 concept items from each unit (55) and 20
// research-methods and data items (27% of the test; practices 2 and 3 are
// 35% of the real section, and many unit items also apply study findings)
// written about studies from every unit, three of them shared-stimulus sets
// of three (a study summary or a data table). Percent score; the College
// Board converts a weighted composite to 1 to 5 each year and publishes no
// fixed cut. The free-response section is not modelled.
// Sources: tools/next100/appsych/sources.md.
const minutes = (n: number) => n * 60;

export const APPSYCH: ExamV2Config = {
  id: "appsych",
  slug: "/ap-psychology",
  landingPath: "/ap-psychology-practice-test",
  icon: "graduation",
  name: "AP Psychology Practice Test",
  shortName: "AP Psychology",
  fullName: "AP Psychology Exam",
  tagline: "The redesigned AP Psychology multiple-choice section: 75 questions in 90 minutes across all five units.",
  theme: { brand: "271 35% 42%", brandDark: "271 35% 34%", brandLight: "271 35% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "mcq",
      name: "Multiple Choice",
      shortName: "Multiple Choice",
      modules: [{ module: 1, questionCount: 75, timeLimit: minutes(90) }],
      directions:
        "75 multiple-choice questions in 90 minutes, like Section I of the AP Psychology Exam. Each question has four choices and one best answer, and there is no penalty for a wrong answer, so answer every question. Some questions share a short study summary or data table shown beside them. Flag questions and come back to them before time runs out.",
      scale: percentScale(75),
      domains: ["appsychBio", "appsychCognition", "appsychDevLearning", "appsychSocial", "appsychHealth", "appsychResearch"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    appsychBio: "Biological Bases of Behavior",
    appsychCognition: "Cognition",
    appsychDevLearning: "Development and Learning",
    appsychSocial: "Social Psychology and Personality",
    appsychHealth: "Mental and Physical Health",
    appsychResearch: "Research Methods and Data",
  },
  drills: [
    { key: "bio", name: "Biological Bases of Behavior", section: "mcq", domains: ["appsychBio"], blurb: "Neurons, drugs, the brain, sleep and sensation." },
    { key: "cognition", name: "Cognition", section: "mcq", domains: ["appsychCognition"], blurb: "Perception, thinking and decisions, memory and intelligence." },
    { key: "devLearning", name: "Development and Learning", section: "mcq", domains: ["appsychDevLearning"], blurb: "Piaget, attachment, language, and classical, operant and observational learning." },
    { key: "social", name: "Social Psychology and Personality", section: "mcq", domains: ["appsychSocial"], blurb: "Attribution, persuasion, conformity, personality theories, motivation and emotion." },
    { key: "health", name: "Mental and Physical Health", section: "mcq", domains: ["appsychHealth"], blurb: "Stress and coping, positive psychology, disorders and their treatment." },
    { key: "research", name: "Research Methods and Data", section: "mcq", domains: ["appsychResearch"], blurb: "Variables, design, ethics, statistics and reading study summaries and tables." },
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
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each unit, then take a full multiple-choice section.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the multiple-choice section.",
    ],
    sourceLine: "Original practice questions written to the College Board AP Psychology course framework (2024 redesign). AP is a trademark of the College Board, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full multiple-choice section, which is 66.7% of the real AP score. The free-response section (two questions, 33.3%) is not included. The College Board combines both sections into a composite and converts it to an AP score of 1 to 5 each year, with no fixed percent for each score, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
