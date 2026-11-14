import { ExamV2Config, ScaleSpec } from "../types";

// IELTS Academic Reading (British Council, IDP IELTS and Cambridge University
// Press & Assessment). IELTS.org "IELTS Academic format: Reading" (fetched
// 14 November 2026): 60 minutes, 3 sections, 40 questions, 2,150 to 2,750
// words in all, one mark per correct answer, a band from 1 to 9 in whole or
// half bands, eleven question types (multiple choice, True/False/Not Given,
// Yes/No/Not Given, matching information, headings, features and sentence
// endings, sentence, summary, note, table and flow-chart completion, diagram
// labels, short answers). On computer (paper IELTS ended from mid-2026,
// IELTS.org, 5 March 2026) answers are typed on screen and there is no extra
// transfer time.
// Modelled: Academic Reading only, two full tests of three original passages
// and 40 one-mark questions in 60 minutes (every statement and gap is its own
// item, so the raw score is out of 40 like the real test). Completion items
// are dropdowns of words rather than typed answers. General Training Reading,
// Listening, Writing and Speaking are not modelled. The band comes from the
// Academic raw-score table IDP publishes (average marks per band; it varies
// slightly between test versions): an estimate, labelled as one.
// Sources: tools/next100/ieltsread/sources.md.

// Index = raw score out of 40. 4 and above from IDP's table; 0 to 3 are Tigertest's.
const ACADEMIC_BAND: ScaleSpec = {
  min: 0,
  max: 9,
  band: 0,
  table: [
    0, 1, 1.5, 2, 2.5, 2.5, 3, 3, 3.5, 3.5,
    4, 4, 4, 4.5, 4.5, 5, 5, 5, 5, 5.5,
    5.5, 5.5, 5.5, 6, 6, 6, 6, 6.5, 6.5, 6.5,
    7, 7, 7, 7.5, 7.5, 8, 8, 8.5, 8.5, 9,
    9,
  ],
};

export const IELTSREAD: ExamV2Config = {
  id: "ieltsread",
  slug: "/ielts-reading",
  landingPath: "/ielts-reading-practice-test",
  icon: "book",
  name: "IELTS Reading Practice Test",
  shortName: "IELTS Reading",
  fullName: "IELTS Academic Reading",
  tagline: "IELTS Academic Reading: three long passages and 40 questions in 60 minutes, with a band score estimate.",
  theme: { brand: "356 85% 22%", brandDark: "356 85% 16%", brandLight: "356 85% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "read",
      name: "Academic Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 40, timeLimit: 60 * 60 }],
      directions:
        "Three passages and 40 questions in 60 minutes, like IELTS Academic Reading. Each question is worth one mark and there is no penalty for a wrong answer. **True, False or Not Given:** True if the statement agrees with the passage, False if it contradicts it, Not Given if the passage does not say. **Yes, No or Not Given:** the same for the writer's views or claims. **Headings and matching:** choose the heading, paragraph, person or ending that fits. **Completion:** choose the word from the list that fills the gap; on the real test you type words from the passage, within a word limit. Every passage is original practice material.",
      scale: ACADEMIC_BAND,
      domains: ["ieltsTfng", "ieltsYnng", "ieltsMcq", "ieltsHeadings", "ieltsMatchInfo", "ieltsMatchFeatures", "ieltsCompletion"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ieltsTfng: "True, False or Not Given",
    ieltsYnng: "Yes, No or Not Given",
    ieltsMcq: "Multiple choice",
    ieltsHeadings: "Matching headings",
    ieltsMatchInfo: "Matching information",
    ieltsMatchFeatures: "Matching features and sentence endings",
    ieltsCompletion: "Completion and short answers",
  },
  drills: [
    { key: "tfng", name: "True, False or Not Given", section: "read", domains: ["ieltsTfng"], blurb: "Tell a statement the passage contradicts from one it never mentions." },
    { key: "ynng", name: "Yes, No or Not Given", section: "read", domains: ["ieltsYnng"], blurb: "Opinion pieces: does the writer agree, disagree, or say nothing at all?" },
    { key: "mcq", name: "Multiple choice", section: "read", domains: ["ieltsMcq"], blurb: "Main ideas, purpose and detail, with distractors that use the passage's own words." },
    { key: "headings", name: "Matching headings", section: "read", domains: ["ieltsHeadings"], blurb: "Pick the heading that sums up a whole paragraph, not one detail in it." },
    { key: "matchInfo", name: "Matching information", section: "read", domains: ["ieltsMatchInfo"], blurb: "Find the paragraph that holds a reason, an example or a comparison." },
    { key: "matchFeatures", name: "Matching features and endings", section: "read", domains: ["ieltsMatchFeatures"], blurb: "Link a claim to the person who made it, and finish sentences with the ending the passage supports." },
    { key: "completion", name: "Completion and short answers", section: "read", domains: ["ieltsCompletion"], blurb: "Summaries, notes, tables, flow charts, diagram labels and short answers." },
  ],
  composite: { name: "Estimated Reading band", min: 0, max: 9, combine: (sections) => sections[0]?.scaled ?? 0 },
  defaultGoal: 6.5,
  goalChoices: [5.5, 6, 6.5, 7, 7.5, 8],
  goalNotes: {
    5.5: "About 19 of 40 correct",
    6: "About 23 of 40 correct",
    6.5: "About 27 of 40 correct",
    7: "About 30 of 40 correct",
    7.5: "About 33 of 40 correct",
    8: "About 35 of 40 correct",
  },
  testLength: "60 min",
  copy: {
    heroSubs: [
      "Drill each question type, then take a full reading test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your band.",
      "Hit your band on both practice tests.",
      "Goal hit. You are ready for IELTS Reading.",
    ],
    sourceLine: "Original passages and questions written to the IELTS Academic Reading format. IELTS is owned by the British Council, IDP IELTS and Cambridge University Press & Assessment, which are not affiliated with and do not endorse Tigertest. Band estimates are unofficial.",
    scoreNote: "The band is estimated from your raw score out of 40 with the Academic Reading conversion IDP publishes, which gives the average marks needed for each band; the real figure varies slightly from test to test. Here completion questions are word lists, while the real test asks you to type words from the passage, so expect to score a little lower on the day. Only Reading is covered: Listening, Writing and Speaking make up the rest of your overall IELTS band. General Training Reading uses different texts and needs more correct answers for the same band.",
  },
};
