import { ExamV2Config, ScaleSpec } from "../types";
import { percentScale } from "../scales";

// TOEFL iBT Reading (ETS), the format given from 21 January 2026. ETS "TOEFL
// iBT Test: 2026 Update Test Blueprint and Specifications Document" and the
// "Updated TOEFL iBT Test Overview" (fetched 14 November 2026): the Reading
// section comes first, 50 items in about 30 minutes (a router stage of 18 to
// 21 minutes, then a lower or upper module of about 9 minutes: two-stage
// adaptive, no going back between stages), 1 point per scored item (35 raw
// points; the 50 include unscored pretest items). Three task types: Complete
// the Words (30 items: paragraphs of about 70 to 100 words where, after an
// intact first sentence, the second half of every second word is deleted, 10
// words a paragraph), Read in Daily Life (5 to 15 items: notices, menus,
// emails, text messages, posts and forms of 15 to 150 words, 2 or 3 questions
// each) and Read an Academic Passage (5 to 15 items: about 200 words, 5
// questions on facts, vocabulary in context, inference, relationships between
// ideas and purpose). Section and overall scores are reported on a 1 to 6
// scale in half bands; ETS publishes no raw-score-to-band table.
// Modelled: two practice tests of 50 items in 30 minutes. Module 1 (router):
// two Complete the Words paragraphs, four daily-life sets (3, 3, 2, 2
// questions) and one academic passage, 35 items in 21 minutes. Module 2: one
// paragraph and one academic passage, 15 items in 9 minutes, easier or harder
// by router accuracy (60%); ETS does not publish the split of tasks between
// stages, so it is Tigertest's. Complete the Words gaps are answered by
// choosing the whole word (same letters, same length) rather than typing the
// letters. Every item is scored. The score is percent correct, capped at 80
// on the easier second module (Tigertest's rule for an adaptive section that
// counts difficulty), not a 1 to 6 band. Listening, Writing and Speaking are
// not modelled. Sources: tools/next100/toeflread/sources.md.

// Easier second module: the raw score converts at 80% of its percent value.
function cappedPercent(total: number, cap: number): ScaleSpec {
  const table: number[] = [];
  for (let raw = 0; raw <= total; raw++) table.push(Math.round((raw / total) * cap));
  return { min: 0, max: cap, table, band: 0 };
}

export const TOEFLREAD: ExamV2Config = {
  id: "toeflread",
  slug: "/toefl-reading",
  landingPath: "/toefl-reading-practice-test",
  icon: "book",
  name: "TOEFL Reading Practice Test",
  shortName: "TOEFL Reading",
  fullName: "TOEFL iBT Reading",
  tagline: "The 2026 TOEFL iBT Reading section: Complete the Words, Read in Daily Life and Read an Academic Passage, two-stage adaptive.",
  theme: { brand: "84 25% 38%", brandDark: "84 25% 28%", brandLight: "84 25% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "read",
      name: "Reading",
      shortName: "Reading",
      modules: [
        { module: 1, questionCount: 35, timeLimit: 21 * 60 },
        { module: 2, questionCount: 15, timeLimit: 9 * 60, adaptive: { threshold: 0.6 } },
      ],
      directions:
        "Two stages, like the TOEFL iBT Reading section: 35 questions in 21 minutes, then 15 in 9 minutes. The second stage is easier or harder depending on how you do in the first, and you cannot go back to the first stage. **Complete the Words:** after the first sentence, the second half of every second word is missing; each underscore is one missing letter. Choose the word that completes each gap (on the real test you type the letters). **Read in Daily Life:** short notices, emails, messages and menus, with two or three questions each. **Read an Academic Passage:** about 200 words and five questions. Everything you need is in the text. Every text is original practice material.",
      scale: percentScale(50),
      lowerScale: cappedPercent(50, 80),
      domains: ["toeflCtwGrammar", "toeflCtwContent", "toeflDailyDetail", "toeflDailyInfer", "toeflAcadDetail", "toeflAcadVocab", "toeflAcadReason"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    toeflCtwGrammar: "Complete the Words: grammar words",
    toeflCtwContent: "Complete the Words: content words",
    toeflDailyDetail: "Daily life: details and scanning",
    toeflDailyInfer: "Daily life: purpose and implied meaning",
    toeflAcadDetail: "Academic passage: facts and details",
    toeflAcadVocab: "Academic passage: vocabulary in context",
    toeflAcadReason: "Academic passage: inference and purpose",
  },
  drillSize: 20,
  drills: [
    { key: "ctwGrammar", name: "Complete the Words: grammar words", section: "read", domains: ["toeflCtwGrammar"], blurb: "Articles, pronouns, prepositions and helping verbs: the small words the sentence cannot do without." },
    { key: "ctwContent", name: "Complete the Words: content words", section: "read", domains: ["toeflCtwContent"], blurb: "Nouns, verbs and adjectives: finish each word from its first letters and the meaning around it." },
    { key: "dailyDetail", name: "Daily life: details", section: "read", domains: ["toeflDailyDetail"], blurb: "Scan notices, schedules, menus and emails for the time, place or price a question asks about." },
    { key: "dailyInfer", name: "Daily life: purpose and meaning", section: "read", domains: ["toeflDailyInfer"], blurb: "Why a message was sent, what an informal phrase means, and what the text implies." },
    { key: "acadDetail", name: "Academic passage: facts", section: "read", domains: ["toeflAcadDetail"], blurb: "Find what the passage states, and spot the choice it never says." },
    { key: "acadVocab", name: "Academic passage: vocabulary", section: "read", domains: ["toeflAcadVocab"], blurb: "Work out what a word means from the sentence it sits in." },
    { key: "acadReason", name: "Academic passage: inference and purpose", section: "read", domains: ["toeflAcadReason"], blurb: "What the passage implies, how its parts connect, and why the author includes a detail." },
  ],
  composite: { name: "Reading percent", min: 0, max: 100, combine: (sections) => sections[0]?.scaled ?? 0 },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "About 30 of 50 correct",
    65: "About 33 of 50 correct",
    70: "35 of 50 correct",
    75: "About 38 of 50 correct",
    80: "40 of 50 correct, the most the easier second stage allows",
    85: "About 43 of 50: needs the harder second stage",
    90: "45 of 50: needs the harder second stage",
  },
  testLength: "30 min",
  copy: {
    heroSubs: [
      "Drill each task type, then take a full reading section.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for TOEFL Reading.",
    ],
    sourceLine: "Original texts and questions written to the ETS description of the TOEFL iBT Reading section from January 2026. TOEFL and TOEFL iBT are trademarks of ETS, which is not affiliated with and does not endorse Tigertest. Scores are unofficial.",
    scoreNote: "This is your percent correct on Tigertest's practice section, not a TOEFL score. The real Reading section is reported on a 1 to 6 band that ETS works out from the questions you answer correctly in both stages and how hard they are, and ETS publishes no table to convert a raw count. As on the real test, the easier second stage limits how high you can go: here it caps the score at 80. Complete the Words asks you to type the missing letters on the real test; here you choose the word. Only Reading is covered: Listening, Writing and Speaking make up the rest of your overall TOEFL score.",
  },
};
