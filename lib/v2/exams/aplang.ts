import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AP English Language and Composition (College Board). AP Central exam page
// and the Course and Exam Description (effective fall 2024, the current
// edition; checked 1 November 2026): a fully digital exam of 3 hours 15
// minutes. Section I is 45 multiple-choice questions in 60 minutes, 45% of
// the score: 23 to 25 reading questions on nonfiction passages and 20 to 22
// writing questions that ask students to read like writers and consider
// revisions to drafts, in five sets (two reading sets of 11 to 14, writing
// sets of 7 to 9, 7 to 9 and 4 to 6), four answer choices (A to D), and
// revision items that keep "(as it is now)" as choice A. Section II is three
// essays (synthesis, rhetorical analysis, argument) in 2 hours 15 minutes
// including a 15-minute reading period, 55%. Multiple-choice skill
// categories: Rhetorical Situation reading 11-14%, writing 11-14%; Claims
// and Evidence reading 13-16%, writing 11-14%; Reasoning and Organization
// reading 13-16%, writing 11-14%; Style reading 11-14%, writing 11-14%.
// Modelled: Section I only, at full length and pace (45 in 60 minutes), one
// module per test in the CED set order: reading sets of 12 and 12, writing
// sets of 8, 8 and 5. Per test by category: reading 5/7/6/6, writing
// 5/6/5/5. Every passage and draft is original, written for Tigertest; a
// passage's label describes the kind of writer, not a real person. Percent
// score; the College Board converts a weighted composite to 1 to 5 each
// year and publishes no fixed cut. Sources: tools/next100/aplang/sources.md.
export const APLANG: ExamV2Config = {
  id: "aplang",
  slug: "/ap-english-language",
  landingPath: "/ap-english-language-practice-test",
  icon: "book",
  name: "AP English Language Practice Test",
  shortName: "AP English Language",
  fullName: "AP English Language and Composition Exam",
  tagline: "The AP English Language multiple-choice section: 45 reading and revision questions in 60 minutes.",
  theme: { brand: "222 18% 34%", brandDark: "222 18% 26%", brandLight: "222 18% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "mcq",
      name: "Multiple Choice",
      shortName: "Multiple Choice",
      modules: [{ module: 1, questionCount: 45, timeLimit: 60 * 60 }],
      directions:
        "45 multiple-choice questions in 60 minutes, like Section I of the AP English Language and Composition Exam. Two reading sets ask about nonfiction passages; three writing sets ask how a student could revise a draft whose sentences are numbered. Every passage and draft is original, written for Tigertest; a passage's label describes the kind of writer, not a real person. Each question has four choices and one best answer, and there is no penalty for a wrong answer, so answer every question.",
      scale: percentScale(45),
      domains: [
        "aplangRhetRead",
        "aplangClaimsRead",
        "aplangReasonRead",
        "aplangStyleRead",
        "aplangRhetWrite",
        "aplangClaimsWrite",
        "aplangReasonWrite",
        "aplangStyleWrite",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    aplangRhetRead: "Rhetorical situation: reading",
    aplangClaimsRead: "Claims and evidence: reading",
    aplangReasonRead: "Reasoning and organization: reading",
    aplangStyleRead: "Style: reading",
    aplangRhetWrite: "Rhetorical situation: writing",
    aplangClaimsWrite: "Claims and evidence: writing",
    aplangReasonWrite: "Reasoning and organization: writing",
    aplangStyleWrite: "Style: writing",
  },
  drills: [
    { key: "situationRead", name: "Reading: Rhetorical Situation", section: "mcq", domains: ["aplangRhetRead"], blurb: "A writer's purpose, exigence and audience, and the choices made for them." },
    { key: "claimsRead", name: "Reading: Claims and Evidence", section: "mcq", domains: ["aplangClaimsRead"], blurb: "What a writer claims, the evidence behind it, and how the claim is qualified." },
    { key: "reasoningRead", name: "Reading: Reasoning and Organization", section: "mcq", domains: ["aplangReasonRead"], blurb: "Line of reasoning, analogies and how each paragraph serves the argument." },
    { key: "styleRead", name: "Reading: Style", section: "mcq", domains: ["aplangStyleRead"], blurb: "Word choice, sentence structure, figurative language and tone." },
    { key: "situationWrite", name: "Writing: Rhetorical Situation", section: "mcq", domains: ["aplangRhetWrite"], blurb: "Revising a draft for its purpose and audience: what to add, keep or cut." },
    { key: "claimsWrite", name: "Writing: Claims and Evidence", section: "mcq", domains: ["aplangClaimsWrite"], blurb: "Sharpening a thesis and choosing evidence that supports the claim." },
    { key: "reasoningWrite", name: "Writing: Reasoning and Organization", section: "mcq", domains: ["aplangReasonWrite"], blurb: "Transitions, where a sentence belongs, and how paragraphs connect." },
    { key: "styleWrite", name: "Writing: Style", section: "mcq", domains: ["aplangStyleWrite"], blurb: "Precise words, combining sentences, punctuation for meaning and a fitting tone." },
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
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each skill, then take a full multiple-choice section.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the multiple-choice section.",
    ],
    sourceLine: "Original practice passages, drafts and questions written to the College Board AP English Language and Composition course framework. AP is a trademark of the College Board, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full multiple-choice section, which is 45% of the real AP score. The three essays (synthesis, rhetorical analysis and argument, 55%) are not included. The College Board combines both sections into a composite and converts it to an AP score of 1 to 5 each year, with no fixed percent for each score, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
