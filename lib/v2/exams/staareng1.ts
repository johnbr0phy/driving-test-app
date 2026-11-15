import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// STAAR English I end-of-course test (Texas Education Agency). TEA "STAAR
// English I Blueprint, Effective as of Spring 2023" and "STAAR English I Test
// Design" (August 2022; fetched 14 November 2026): Reading 29 to 31 questions
// and 32 to 34 points, Writing 21 to 23 questions and 30 to 32 points; 48
// one-point questions, 3 two-point questions and one 10-point extended
// constructed response, 52 questions and 64 points. The reading section is two
// single passages and one paired passage; the writing section is two revising
// passages, two editing passages and the extended constructed response. Eligible
// standards from 19 TAC §110.36 and TEA's English I assessed curriculum.
// Modelled: the reading and the revising and editing questions only, at the
// blueprint's mix: per practice test 30 reading items (3 vocabulary, 9
// comprehension and synthesis, 7 literary elements and genres, 5 informational
// and argumentative structure, 6 author's purpose and craft) and 21 revising and
// editing items (5 organization and development, 6 clarity and sentence
// effectiveness, 5 sentence boundaries and usage, 5 capitalization, punctuation
// and spelling). The extended constructed response is not modelled, and every
// item is worth one point. Formats: multiple choice, inline choice (dropdown),
// choose two and select a sentence. Times are Tigertest's own pace; TEA's test
// administrator manual sets the real limit. Every passage and draft is original.
// Sources: tools/next100/staareng1/sources.md.
export const STAARENG1: ExamV2Config = {
  id: "staareng1",
  slug: "/staar-english-1",
  landingPath: "/staar-english-1-practice-test",
  icon: "book",
  name: "STAAR English I Practice Test",
  shortName: "STAAR English I",
  fullName: "STAAR English I End-of-Course Test",
  tagline: "STAAR English I reading and revising and editing: original passages and student drafts, like the Texas end-of-course test.",
  theme: { brand: "308 85% 30%", brandDark: "308 85% 21%", brandLight: "308 80% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "read",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 30, timeLimit: 60 * 60 }],
      directions:
        "30 questions on two single passages and one pair of passages, like the reading section of STAAR English I. Read each passage, then answer the questions about it. Some questions ask you to choose two answers or to select a sentence. Every passage is original, written for Tigertest. The time limit is Tigertest's practice pace, not TEA's.",
      scale: percentScale(30),
      domains: ["staareng1Vocab", "staareng1Comp", "staareng1Literary", "staareng1Info", "staareng1Craft"],
    },
    {
      key: "write",
      name: "Revising and Editing",
      shortName: "Revising and Editing",
      modules: [{ module: 1, questionCount: 21, timeLimit: 35 * 60 }],
      directions:
        "21 questions on four student drafts whose sentences are numbered, like the revising and editing questions on STAAR English I. Revising questions ask how to improve a draft's organization, development and sentences; editing questions ask you to fix grammar, capitalization, punctuation and spelling. Some questions are dropdowns: choose the option that belongs in the blank. The written composition is not included.",
      scale: percentScale(21),
      domains: ["staareng1Organize", "staareng1Clarity", "staareng1Sentences", "staareng1Mechanics"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    staareng1Vocab: "Vocabulary",
    staareng1Comp: "Comprehension and synthesis",
    staareng1Literary: "Literary elements and genres",
    staareng1Info: "Informational and argumentative texts",
    staareng1Craft: "Author's purpose and craft",
    staareng1Organize: "Revising: organization and development",
    staareng1Clarity: "Revising: clarity and sentences",
    staareng1Sentences: "Editing: sentences and usage",
    staareng1Mechanics: "Editing: capitalization, punctuation and spelling",
  },
  drills: [
    { key: "vocabulary", name: "Vocabulary", section: "read", domains: ["staareng1Vocab"], blurb: "Words in context, connotation and the foreign phrases English borrows." },
    { key: "comprehension", name: "Comprehension and Paired Texts", section: "read", domains: ["staareng1Comp"], blurb: "Inferences, key ideas, summaries and what two texts say together." },
    { key: "literary", name: "Fiction, Poetry and Drama", section: "read", domains: ["staareng1Literary"], blurb: "Theme, characters, plot structure, setting, poems and plays." },
    { key: "informational", name: "Informational and Argumentative Texts", section: "read", domains: ["staareng1Info"], blurb: "Thesis, claims and appeals, counterarguments and how the text is organized." },
    { key: "craft", name: "Author's Purpose and Craft", section: "read", domains: ["staareng1Craft"], blurb: "Why the author wrote it this way: structure, features, word choice and devices." },
    { key: "organize", name: "Revising: Organization and Development", section: "write", domains: ["staareng1Organize"], blurb: "Thesis and topic sentences, transitions, and details that belong or do not." },
    { key: "clarity", name: "Revising: Clarity and Sentences", section: "write", domains: ["staareng1Clarity"], blurb: "Precise words, combining sentences, parallel structure and misplaced phrases." },
    { key: "sentences", name: "Editing: Sentences and Usage", section: "write", domains: ["staareng1Sentences"], blurb: "Fragments, run-ons, comma splices, verb tense and voice, and pronouns." },
    { key: "mechanics", name: "Editing: Capitalization, Punctuation and Spelling", section: "write", domains: ["staareng1Mechanics"], blurb: "Commas, semicolons, colons and apostrophes, capital letters and spelling." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [45, 55, 60, 70, 85],
  goalNotes: {
    45: "Near Approaches Grade Level (about 42% of the points on a recent form)",
    55: "Near Meets Grade Level (about 55% of the points)",
    60: "A safe margin above Meets",
    70: "Strong, with room to spare",
    85: "Near Masters Grade Level (about 83% of the points)",
  },
  testLength: "1 hr 35 min",
  copy: {
    heroSubs: [
      "Nine drills, two practice tests. Start with Vocabulary.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for STAAR English I.",
    ],
    sourceLine: "Original passages, drafts and questions written to the TEA STAAR English I blueprint and the English I TEKS. STAAR is a registered trademark of the Texas Education Agency, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on the reading and revising and editing questions. The real test also has a 10-point essay (the extended constructed response) and a few 2-point questions, 64 points in all, and TEA turns the raw score into a scale score: Approaches Grade Level is 3775, Meets 4000 and Masters 4606. On the summer 2026 form those took 27, 35 and 53 of 64 points, and the raw cuts change from form to form, so the goals here are estimates, not official cutoffs.",
  },
};
