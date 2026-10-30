import { ExamV2Config, ScaleSpec, SectionResult } from "../types";
import { curve } from "../scales";

// NAPLAN Year 7 (ACARA, Australia). Online since 2022, held in March, in a
// fixed order: Writing, Reading, Conventions of Language, Numeracy. Year 7
// times match Year 9: Reading 65 min, Conventions 45 min (spelling first,
// then grammar and punctuation, the spelling section locked once left),
// Numeracy 65 min (a short non-calculator section, locked once left, then an
// online calculator; Years 7 and 9 only), Writing 42 min (not modelled). The
// real tests use tailored test design: three stages of testlets with two
// branching points, and the scale score depends on both the number right and
// the difficulty of the path. Here each domain has two stages: module 1 is
// everyone's testlet, and module 2 is the harder ("upper") or easier
// ("lower") testlet picked from module 1 accuracy, like SAT module 2. Test 2
// is a fixed form held out of the drills.
//
// Scores are an estimate on a NAPLAN-style scale, read against ACARA's Year 7
// proficiency cut points on the scales reset in 2023 (Needs additional
// support / Developing / Strong / Exceeding): Reading 430 / 500 / 603,
// Spelling 430 / 497 / 595, Grammar and Punctuation 444 / 513 / 620,
// Numeracy 431 / 500 / 632. The curves below are our own, not ACARA's.
// The Year 9 sibling is lib/v2/exams/naplan.ts (id "naplan").
const minutes = (n: number) => n * 60;

/** Harder path: the full range of the scale. */
const upper = (n: number): ScaleSpec =>
  curve(n, [[0, 260], [Math.round(n * 0.25), 390], [Math.round(n * 0.4), 440], [Math.round(n * 0.55), 500], [Math.round(n * 0.7), 560], [Math.round(n * 0.85), 630], [n, 740]], 30);

/** Easier path: tops out near the top of Strong, as the easier testlets carry less weight. */
const lower = (n: number): ScaleSpec =>
  curve(n, [[0, 260], [Math.round(n * 0.25), 380], [Math.round(n * 0.4), 430], [Math.round(n * 0.55), 470], [Math.round(n * 0.75), 520], [n, 560]], 30);

/** Reading, Conventions and Numeracy averaged; the two Numeracy sections count as one domain, weighted by length. */
function overall(sections: SectionResult[]): number {
  const by = (k: string) => sections.find((s) => s.section === k);
  const parts: number[] = [];
  for (const k of ["reading", "conventions"]) {
    const s = by(k);
    if (s) parts.push(s.scaled);
  }
  const nc = by("numeracyNC");
  const calc = by("numeracy");
  const num = [nc, calc].filter(Boolean) as SectionResult[];
  const items = num.reduce((a, s) => a + s.total, 0);
  if (items) parts.push(num.reduce((a, s) => a + s.scaled * s.total, 0) / items);
  if (!parts.length) return 0;
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length / 10) * 10;
}

export const NAPLAN7: ExamV2Config = {
  id: "naplan7",
  slug: "/naplan-year-7",
  landingPath: "/naplan-year-7-practice-test",
  name: "NAPLAN Year 7 Practice Test",
  shortName: "NAPLAN Year 7",
  fullName: "NAPLAN Year 7 (National Assessment Program, Literacy and Numeracy)",
  tagline: "Reading, spelling, grammar and numeracy for Year 7, with tailored testlets like the real online NAPLAN.",
  icon: "graduation",
  theme: { brand: "240 90% 44%", brandDark: "240 90% 33%", brandLight: "240 70% 96%" },
  breakSeconds: 600,
  sections: [
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      breakAfter: true,
      modules: [
        { module: 1, questionCount: 10, timeLimit: minutes(20) },
        { module: 2, questionCount: 10, timeLimit: minutes(20), adaptive: { threshold: 0.6 } },
      ],
      directions:
        "Read each text, then answer the questions about it. Texts include information texts, stories, poems, instructions and opinion pieces. Some questions ask you to choose two answers, put events in order or pick a word from a list. The second part is harder or easier depending on how the first part went, like the tailored tests in the real online NAPLAN.",
      scale: upper(20),
      lowerScale: lower(20),
      domains: ["nap7Reading"],
    },
    {
      key: "conventions",
      name: "Conventions of Language",
      shortName: "Conventions",
      breakAfter: true,
      modules: [
        { module: 1, questionCount: 12, timeLimit: minutes(15) },
        { module: 2, questionCount: 12, timeLimit: minutes(15), adaptive: { threshold: 0.6 } },
      ],
      directions:
        "Spelling, then grammar and punctuation. For spelling, choose the correct spelling, pick the right word for the sentence or tap the word that is spelled wrongly. For grammar and punctuation, choose the word or punctuation that makes the sentence correct. Australian spelling is used throughout. The real test's spelling dictation (listening to a word) is not modelled.",
      scale: upper(24),
      lowerScale: lower(24),
      domains: ["nap7Spelling", "nap7Grammar"],
    },
    {
      key: "numeracyNC",
      name: "Numeracy: non-calculator",
      shortName: "Non-calculator",
      modules: [{ module: 1, questionCount: 6, timeLimit: minutes(8) }],
      directions:
        "A short section without a calculator, like the start of the real Year 7 numeracy test. Work it out on paper. For fill-in questions, type a whole number, a decimal or a fraction such as 3/4, with no units. You cannot come back to this section once you move on.",
      scale: curve(6, [[0, 260], [1, 360], [2, 410], [3, 460], [4, 520], [5, 580], [6, 660]], 50),
      domains: ["nap7NonCalc"],
    },
    {
      key: "numeracy",
      name: "Numeracy: calculator allowed",
      shortName: "Numeracy",
      calculator: true,
      modules: [
        { module: 1, questionCount: 12, timeLimit: minutes(25) },
        { module: 2, questionCount: 12, timeLimit: minutes(25), adaptive: { threshold: 0.6 } },
      ],
      directions:
        "Number and algebra, measurement and space, and statistics and probability. The calculator is available on every question. For fill-in questions, type a number, a decimal or a fraction such as 3/4, with no units, commas or dollar signs. The second part is harder or easier depending on how the first part went.",
      scale: upper(24),
      lowerScale: lower(24),
      domains: ["nap7Number", "nap7Measure", "nap7Stats"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    nap7Reading: "Reading",
    nap7Spelling: "Spelling",
    nap7Grammar: "Grammar and Punctuation",
    nap7NonCalc: "Non-calculator Numeracy",
    nap7Number: "Number and Algebra",
    nap7Measure: "Measurement and Space",
    nap7Stats: "Statistics and Probability",
  },
  // Six drills, parallel to Year 9: one per reported domain, with Numeracy
  // split the way the Australian Curriculum strands are and measurement
  // shared with statistics so the dashboard stays at 11 steps (3 Basics,
  // 6 drills, 2 tests).
  drillSize: 20,
  drills: [
    { key: "reading", name: "Reading", section: "reading", domains: ["nap7Reading"], blurb: "Main idea, details, inference, word meaning, sequence and the writer's purpose, from information texts, stories, poems and opinion pieces.", basics: ["mainIdea", "findingDetail", "inference", "wordsInContext", "authorPurpose", "sequenceEvents"] },
    { key: "spelling", name: "Spelling", section: "conventions", domains: ["nap7Spelling"], blurb: "Tricky words, doubled letters, plurals, suffixes and homophones, in Australian spelling." },
    { key: "grammar", name: "Grammar and Punctuation", section: "conventions", domains: ["nap7Grammar"], blurb: "Agreement, verb tense, pronouns, apostrophes, its and it's, commas, direct speech and word classes.", basics: ["subjectVerb", "verbTense", "pronounCase", "apostrophes", "itsIts", "commaSplices", "commonlyConfused"] },
    { key: "noncalc", name: "Non-calculator", section: "numeracyNC", domains: ["nap7NonCalc"], blurb: "Mental and written arithmetic: fractions, decimals, percentages, negative numbers and order of operations, without a calculator." },
    { key: "number", name: "Number and Algebra", section: "numeracy", domains: ["nap7Number"], blurb: "Fractions and percentages, ratios and rates, integers, powers, patterns, substitution and simple equations.", basics: ["fractionOps", "decimals", "percents", "ratios", "negativeNumbers", "orderOfOperations", "solveX"] },
    { key: "measure", name: "Measurement, Space and Statistics", section: "numeracy", domains: ["nap7Measure", "nap7Stats"], blurb: "Area, volume, angles, units, time and maps, then mean, median, mode, data displays and chance." },
  ],
  composite: { name: "Overall scale score", min: 260, max: 740, combine: overall },
  defaultGoal: 500,
  goalChoices: [440, 500, 560, 610, 640],
  goalNotes: {
    440: "Developing in every domain",
    500: "At the Strong line in every domain",
    560: "Solidly Strong",
    610: "Exceeding in reading and spelling",
    640: "Exceeding in every domain",
  },
  testLength: "2 hr 8 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each domain.",
      "Master each drill first.",
      "Halfway there. Try the full test.",
      "Reach your goal on the full test.",
      "Goal reached. You are ready for NAPLAN.",
    ],
    sourceLine: "Written to the Australian Curriculum (Version 9.0) and ACARA's published NAPLAN test design for Year 7. Original questions; not affiliated with ACARA.",
    scoreNote:
      "Estimated on a NAPLAN-style scale, not an official result. ACARA's Year 7 proficiency cut points: Developing from about 430 to 445, Strong from about 497 to 513, Exceeding from about 595 (spelling) to 632 (numeracy). Writing is not included.",
  },
};
