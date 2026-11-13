import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// NWEA MAP Growth, grades 2 to 5: the Common Core-aligned Math 2-5, Reading 2-5
// and Language Usage 2+ tests (instructional areas from NWEA's "MAP Growth:
// Instructional Areas CCSS", April 2025). The real tests are computer adaptive,
// untimed (about 45 to 60 minutes a subject), at most 43 items including up to
// 3 or 4 field-test items, scored on the RIT scale and given up to four times
// a year (MAP Growth Technical Report for 2024-2025, April 2026). Blueprint per
// test from that report's Table 3.2: Math 2-5 Number and Operations 13,
// Measurement and Data 11, Operations and Algebraic Thinking 10, Geometry 6;
// Reading 2-5 and Language Usage 2+ 13 items per instructional area.
// Here each subject is a fixed form at that blueprint, untimed, spanning
// grade 3 to grade 5 standards (not adaptive), scored as percent correct, not
// RIT. Test 2 is held out of the drills. Bank built by
// tools/next100/mapgrowth/build.py.

/** Each subject counts equally. */
function averageOfSections(sections: SectionResult[]): number {
  const scored = sections.filter((s) => s.total > 0);
  if (!scored.length) return 0;
  return Math.round(scored.reduce((a, s) => a + (s.raw / s.total) * 100, 0) / scored.length);
}

export const MAPGROWTH: ExamV2Config = {
  id: "mapgrowth",
  slug: "/map-growth",
  landingPath: "/map-growth-practice-test",
  name: "MAP Growth Practice Test",
  shortName: "MAP Growth",
  fullName: "NWEA MAP Growth (Grades 2-5)",
  tagline: "Math, Reading and Language Usage practice for the MAP Growth test in grades 2 to 5.",
  icon: "graduation",
  theme: { brand: "159 95% 30%", brandDark: "159 95% 21%", brandLight: "159 70% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "math",
      name: "Math",
      shortName: "Math",
      modules: [{ module: 1, questionCount: 40, timeLimit: 0 }],
      calculator: false,
      directions:
        "40 math questions on numbers, fractions, word problems, measurement, graphs and shapes. There is no clock, just like the real MAP Growth test, so take your time. Use scrap paper for working. Some questions ask you to choose two answers or type a number.",
      scale: percentScale(40),
      domains: ["mapMathNBT", "mapMathMD", "mapMathOA", "mapMathGeo"],
    },
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 39, timeLimit: 0 }],
      directions:
        "39 reading questions on stories, poems and articles, plus word meanings. Read each passage carefully; it stays beside the questions. There is no clock, so go back and check the passage whenever you need to.",
      scale: percentScale(39),
      domains: ["mapReadLit", "mapReadInfo", "mapReadVocab"],
    },
    {
      key: "language",
      name: "Language Usage",
      shortName: "Language",
      modules: [{ module: 1, questionCount: 39, timeLimit: 0 }],
      directions:
        "39 language questions on grammar, capital letters, punctuation, spelling and making writing better. There is no clock. Read each sentence or draft slowly, maybe twice, before you choose.",
      scale: percentScale(39),
      domains: ["mapLangWriting", "mapLangGrammar", "mapLangMechanics"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    mapMathNBT: "Number and Operations",
    mapMathMD: "Measurement and Data",
    mapMathOA: "Operations and Algebraic Thinking",
    mapMathGeo: "Geometry",
    mapReadLit: "Literary Text",
    mapReadInfo: "Informational Text",
    mapReadVocab: "Vocabulary",
    mapLangWriting: "Writing: Purpose and Audience",
    mapLangGrammar: "Grammar and Usage",
    mapLangMechanics: "Mechanics",
  },
  // One drill per NWEA instructional area, 20 exam-level items each.
  drillSize: 20,
  drills: [
    { key: "numbers", name: "Number and Operations", section: "math", domains: ["mapMathNBT"], blurb: "Place value, adding, subtracting, multiplying and dividing, decimals and fractions.", basics: ["rounding", "fractionConvert", "fractionOps", "decimals"] },
    { key: "algebra", name: "Operations and Algebraic Thinking", section: "math", domains: ["mapMathOA"], blurb: "Word problems, missing numbers, factors and multiples, patterns and expressions." },
    { key: "measurement", name: "Measurement and Data", section: "math", domains: ["mapMathMD"], blurb: "Time, money, units, area, perimeter, volume, angles and reading graphs.", basics: ["areaPerimeter", "readingTable", "unitConversion", "volume"] },
    { key: "geometry", name: "Geometry", section: "math", domains: ["mapMathGeo"], blurb: "Shapes and their sides and angles, lines, symmetry and the coordinate plane." },
    { key: "literary", name: "Literary Text", section: "reading", domains: ["mapReadLit"], blurb: "Stories, fables, poems and plays: theme, characters, plot and point of view.", basics: ["inference", "sequenceEvents", "mainIdea", "toneWords"] },
    { key: "informational", name: "Informational Text", section: "reading", domains: ["mapReadInfo"], blurb: "Articles and how-to texts: main idea, details, text features and structure.", basics: ["mainIdea", "findingDetail", "authorPurpose", "textStructure"] },
    { key: "vocabulary", name: "Vocabulary", section: "reading", domains: ["mapReadVocab"], blurb: "Context clues, prefixes, suffixes and roots, synonyms and figurative language.", basics: ["wordsInContext", "wordParts", "synonyms", "toneWords"] },
    { key: "writing", name: "Writing", section: "language", domains: ["mapLangWriting"], blurb: "Topic sentences, order, transitions, details that fit and precise words.", basics: ["topicSentences", "transitions", "preciseWords", "concision"] },
    { key: "grammar", name: "Grammar and Usage", section: "language", domains: ["mapLangGrammar"], blurb: "Nouns, pronouns, verb tenses, agreement and complete sentences.", basics: ["subjectVerb", "pronounCase", "verbTense", "commaSplices"] },
    { key: "mechanics", name: "Capitals, Punctuation and Spelling", section: "language", domains: ["mapLangMechanics"], blurb: "Capital letters, commas, apostrophes, quotation marks and tricky spellings.", basics: ["apostrophes", "itsIts", "commonlyConfused", "listIntroCommas"] },
  ],
  composite: { name: "Average score", min: 0, max: 100, combine: averageOfSections },
  defaultGoal: 75,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target, solid across grades 3 to 5",
    80: "80% practice score target",
    85: "85% practice score target, ready for harder questions",
    90: "90% practice score target",
  },
  testLength: "Untimed, about 45 to 60 minutes a subject",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each area.",
      "Master each drill first.",
      "Take a full practice test to see your score.",
      "Hit your goal on a full practice test.",
      "Goal hit. You're ready for test day.",
    ],
    sourceLine: "Built on NWEA's published MAP Growth instructional areas and test blueprint (checked November 2026). Original questions; not affiliated with NWEA or HMH.",
    scoreNote: "Scores here are percent correct per subject, not RIT scores. The real MAP Growth test is adaptive: questions get harder or easier as your child answers, and the result is a RIT score compared with national norms. This practice test is a fixed set of grade 3 to grade 5 questions, so use it to find strong and weak areas, not to predict a RIT score.",
  },
};
