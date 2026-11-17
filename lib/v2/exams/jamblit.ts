import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// JAMB's current IBASS Literature syllabus, fetched 17 November 2026.
// Literary-skills practice only: prescribed-book knowledge is not modelled.
// Equal domain weights and 30-minute timer are Tigertest practice choices.
// 120 unique items: two tests of 40 plus 40 drill-only items. Test 2 held out.
export const JAMBLIT: ExamV2Config = {
  id: "jamblit", slug: "/jamb-literature", landingPath: "/jamb-literature-practice-test",
  name: "JAMB Literature in English Practice Test", shortName: "JAMB Literature",
  fullName: "JAMB UTME Literature in English",
  tagline: "Practise literary techniques and interpret original extracts. Read the prescribed books separately.",
  icon: "book",
  theme: { brand: "316 15% 42%", brandDark: "316 15% 32%", brandLight: "316 15% 96%" },
  breakSeconds: 0,
  sections: [{ key: "lit", name: "Literature in English", shortName: "Literature",
    modules: [{ module: 1, questionCount: 40, timeLimit: 30 * 60 }],
    directions: "40 original questions on drama, prose, poetry and literary appreciation. The 30-minute timer and equal topic split are Tigertest practice choices, not an official JAMB blueprint. Prescribed-book knowledge is not covered: read the current JAMB texts separately. You may move between questions and flag items. Wrong answers receive no points and no penalty in this practice.",
    scale: percentScale(40), domains: ["jamblitDrama", "jamblitProse", "jamblitPoetry", "jamblitAppreciation"] }],
  tests: [{ number: 1, name: "Practice Test 1" }, { number: 2, name: "Practice Test 2", heldOut: true }],
  domainLabels: { jamblitDrama: "Drama", jamblitProse: "Prose", jamblitPoetry: "Poetry", jamblitAppreciation: "Literary Appreciation" },
  drills: [
    { key: "drama", name: "Drama", section: "lit", domains: ["jamblitDrama"], blurb: "Dramatic forms, stage techniques, character, conflict and irony." },
    { key: "prose", name: "Prose", section: "lit", domains: ["jamblitProse"], blurb: "Narrative viewpoints, character, plot, setting and theme." },
    { key: "poetry", name: "Poetry", section: "lit", domains: ["jamblitPoetry"], blurb: "Poetic forms, sound patterns, figurative language and the speaking voice." },
    { key: "appreciation", name: "Literary Appreciation", section: "lit", domains: ["jamblitAppreciation"], blurb: "Interpret original short extracts using textual evidence." },
  ],
  composite: { name: "Practice score (%)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70, goalChoices: [50, 60, 70, 80, 90],
  goalNotes: { 50: "Build a foundation in the literary skills", 60: "Strengthen interpretation and terminology", 70: "A practice target, not a JAMB pass mark", 80: "Consistent evidence-based reading", 90: "Strong command of these practice skills" },
  testLength: "30 min",
  copy: {
    heroSubs: ["Four literary-skills drills, then two practice tests. Read the prescribed books separately.", "Work through the four literary-skills drills.", "Take Practice Test 1 to check these skills.", "Use the second test for a fresh skills check.", "Skills goal reached. Continue studying the prescribed books."],
    sourceLine: "Original literary-skills questions on JAMB's Literature in English syllabus. Prescribed-book knowledge is not covered. Not affiliated with JAMB.",
    scoreNote: "A percentage on these literary-skills questions, not a prediction of your UTME score. The practice uses equal topic weights and a chosen 30-minute timer. Study the prescribed books separately; there is no universal admission pass mark here.",
  },
};
